<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\RekamKontribusi;
use App\Models\Mahasiswa;
use App\Models\AnggotaTim;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RekamKontribusiController extends Controller
{
    public function getStudentPortfolio(Request $request)
    {
        $user = $request->user();
        if ($user->role !== 'mahasiswa') {
            return response()->json(['message' => 'User is not a student'], 403);
        }

        $mahasiswa = Mahasiswa::where('user_id', $user->id)->firstOrFail();

        // Get all members records for this student and load their RekamKontribusi
        $anggotaTims = AnggotaTim::where('mahasiswa_id', $mahasiswa->id)
            ->with(['proyek.kategoriProyek', 'rekamKontribusi'])
            ->get();

        $portfolio = [];
        foreach ($anggotaTims as $at) {
            if ($at->rekamKontribusi) {
                $portfolio[] = [
                    'proyek_id' => $at->proyek->id,
                    'judul_proyek' => $at->proyek->judul,
                    'kategori' => $at->proyek->kategoriProyek->nama,
                    'label_simulasi' => $at->proyek->label_simulasi,
                    'peran' => $at->peran,
                    'tanggal_join' => $at->tanggal_join,
                    'skor_rata_rata' => $at->rekamKontribusi->skor_rata_rata,
                    'persentase_ketepatan_waktu' => $at->rekamKontribusi->persentase_ketepatan_waktu,
                    'ringkasan_kontribusi' => $at->rekamKontribusi->ringkasan_kontribusi,
                    'status_validasi' => $at->rekamKontribusi->status_validasi,
                    'flag_alasan' => $at->rekamKontribusi->flag_alasan,
                    'hash_data' => $at->rekamKontribusi->hash_data,
                    'dibuat_pada' => $at->rekamKontribusi->dibuat_pada,
                ];
            }
        }

        return response()->json($portfolio);
    }

    public function getFlaggedReports()
    {
        // Only dosen, pic_ukm, or admin can see flagged reports
        if (!in_array(auth()->user()->role, ['dosen', 'pic_ukm', 'admin'])) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $reports = RekamKontribusi::where('status_validasi', 'menunggu_acc_dosen')
            ->with(['anggotaTim.mahasiswa.user', 'anggotaTim.proyek'])
            ->get();

        return response()->json($reports);
    }

    public function validateReport(Request $request, $id)
    {
        if (!in_array(auth()->user()->role, ['dosen', 'pic_ukm', 'admin'])) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $report = RekamKontribusi::find($id);
        if (!$report) {
            return response()->json(['message' => 'Report not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'status_validasi' => 'required|in:final,draft',
            'catatan' => 'required_if:status_validasi,draft|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $newStatus = $request->status_validasi;
        $catatan = $request->catatan ? " (Catatan validator " . auth()->user()->name . ": " . $request->catatan . ")" : "";

        $report->update([
            'status_validasi' => $newStatus,
            'ringkasan_kontribusi' => $report->ringkasan_kontribusi . $catatan,
            'hash_data' => hash('sha256', $report->anggota_tim_id . '|' . $report->skor_rata_rata . '|' . $newStatus . '|' . now()->toDateTimeString()),
        ]);

        return response()->json([
            'message' => 'Report validated successfully',
            'report' => $report
        ]);
    }

    public function getPublicPortfolio($nim)
    {
        $mahasiswa = Mahasiswa::where('nim', $nim)->with('user')->first();
        if (!$mahasiswa) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        $anggotaTims = AnggotaTim::where('mahasiswa_id', $mahasiswa->id)
            ->where('status', 'aktif')
            ->with(['proyek.kategoriProyek', 'rekamKontribusi'])
            ->get();

        $portfolio = [];
        foreach ($anggotaTims as $at) {
            if ($at->rekamKontribusi && $at->rekamKontribusi->status_validasi === 'final') {
                $portfolio[] = [
                    'proyek_id' => $at->proyek->id,
                    'judul_proyek' => $at->proyek->judul,
                    'kategori' => $at->proyek->kategoriProyek->nama,
                    'label_simulasi' => $at->proyek->label_simulasi,
                    'peran' => $at->peran,
                    'tanggal_join' => $at->tanggal_join,
                    'skor_rata_rata' => $at->rekamKontribusi->skor_rata_rata,
                    'persentase_ketepatan_waktu' => $at->rekamKontribusi->persentase_ketepatan_waktu,
                    'ringkasan_kontribusi' => $at->rekamKontribusi->ringkasan_kontribusi,
                    'status_validasi' => $at->rekamKontribusi->status_validasi,
                    'flag_alasan' => $at->rekamKontribusi->flag_alasan,
                    'hash_data' => $at->rekamKontribusi->hash_data,
                    'dibuat_pada' => $at->rekamKontribusi->dibuat_pada,
                ];
            }
        }

        return response()->json([
            'student' => [
                'user' => [
                    'name' => $mahasiswa->user->name,
                ],
                'nim' => $mahasiswa->nim,
                'prodi' => $mahasiswa->prodi,
                'minat_bidang' => $mahasiswa->minat_bidang,
            ],
            'portfolio' => $portfolio
        ]);
    }
}
