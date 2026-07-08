<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Proyek;
use App\Models\AnggotaTim;
use App\Models\PeerEvaluasi;
use App\Models\Mahasiswa;
use App\Models\RekamKontribusi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class PeerEvaluasiController extends Controller
{
    public function getProjectEvaluations($proyekId)
    {
        $proyek = Proyek::find($proyekId);
        if (!$proyek) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        $evaluations = PeerEvaluasi::where('proyek_id', $proyekId)
            ->with(['pemberi.mahasiswa.user', 'penerima.mahasiswa.user'])
            ->get();

        return response()->json($evaluations);
    }

    public function submitEvaluation(Request $request, $proyekId)
    {
        $proyek = Proyek::find($proyekId);
        if (!$proyek) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        // Gate: Peer evaluation can only be submitted after project is completed
        if ($proyek->status !== 'selesai') {
            return response()->json(['message' => 'Peer evaluation can only be filled after the project status is finished ("selesai")'], 400);
        }

        $user = $request->user();
        $isProjectOwner = $user->id === $proyek->pembuat_id;

        if ($user->role !== 'mahasiswa' && !$isProjectOwner) {
            return response()->json(['message' => 'Only student team members or project owners can submit peer evaluations'], 403);
        }

        $pemberi = null;
        if ($user->role === 'mahasiswa') {
            $mahasiswa = Mahasiswa::where('user_id', $user->id)->firstOrFail();
            $pemberi = AnggotaTim::where('proyek_id', $proyekId)
                ->where('mahasiswa_id', $mahasiswa->id)
                ->first();
                
            if (!$pemberi && !$isProjectOwner) {
                return response()->json(['message' => 'You are not a member of this project team'], 403);
            }
        }

        $validator = Validator::make($request->all(), [
            'penerima_anggota_id' => 'required_without:dievaluasi_id|exists:anggota_tims,id',
            'dievaluasi_id' => 'required_without:penerima_anggota_id|exists:anggota_tims,id',
            'skor_kontribusi' => 'required_without:skor|integer|min:1|max:5',
            'skor' => 'required_without:skor_kontribusi|integer|min:1|max:5',
            'komentar' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $penerimaId = $request->penerima_anggota_id ?? $request->dievaluasi_id;
        $skorKontribusi = $request->skor_kontribusi ?? $request->skor;

        // Check if evaluating self
        if ($pemberi && $pemberi->id == $penerimaId) {
            return response()->json(['message' => 'You cannot evaluate yourself'], 400);
        }

        // Validate receiver is in the same project
        $penerima = AnggotaTim::where('proyek_id', $proyekId)
            ->where('id', $penerimaId)
            ->first();

        if (!$penerima) {
            return response()->json(['message' => 'Recipient is not in the same project team'], 400);
        }

        DB::beginTransaction();
        try {
            $evaluasi = PeerEvaluasi::updateOrCreate(
                [
                    'proyek_id' => $proyekId,
                    'pemberi_id' => $pemberi ? $pemberi->id : null,
                    'user_pemberi_id' => !$pemberi ? $user->id : null,
                    'penerima_id' => $penerimaId,
                ],
                [
                    'skor_kontribusi' => $skorKontribusi,
                    'komentar' => $request->komentar,
                    'waktu_evaluasi' => now(),
                ]
            );

            // Trigger re-calculation of Rekam Kontribusi if all members have completed evaluations
            $this->checkAndGenerateRekamKontribusi($proyek);

            DB::commit();

            return response()->json([
                'message' => 'Peer evaluation submitted successfully',
                'evaluasi' => $evaluasi
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to submit evaluation',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    private function checkAndGenerateRekamKontribusi(Proyek $proyek)
    {
        $members = AnggotaTim::where('proyek_id', $proyek->id)->get();
        $totalMembers = $members->count();
        if ($totalMembers <= 1) {
            return; // No need for peer evaluation in single member teams
        }

        // Expected number of evaluations: N * (N - 1)
        $expectedEvaluations = $totalMembers * ($totalMembers - 1);
        $actualEvaluations = PeerEvaluasi::where('proyek_id', $proyek->id)->count();

        if ($actualEvaluations >= $expectedEvaluations) {
            // All evaluations submitted! Let's compute average and variance for each member.
            foreach ($members as $member) {
                // Get all evaluations received by this member
                $evals = PeerEvaluasi::where('proyek_id', $proyek->id)
                    ->where('penerima_id', $member->id)
                    ->get();

                $scores = $evals->pluck('skor_kontribusi')->toArray();
                $avgScore = count($scores) > 0 ? array_sum($scores) / count($scores) : 5.0;

                // Check Variance & Standard Deviation:
                $varianceFlag = false;
                $flagAlasan = null;
                if (count($scores) > 1) {
                    $mean = array_sum($scores) / count($scores);
                    $sumSquareDiff = 0;
                    foreach ($scores as $s) {
                        $sumSquareDiff += pow($s - $mean, 2);
                    }
                    $stdDev = sqrt($sumSquareDiff / count($scores));

                    // If stdDev < 0.5 and mean > 4.0 -> kongkalikong
                    if ($stdDev < 0.5 && $mean > 4.0) {
                        $varianceFlag = true;
                        $flagAlasan = 'kongkalikong';
                    } elseif ($stdDev > 2.0) { // If stdDev > 2.0 -> outlier
                        $varianceFlag = true;
                        $flagAlasan = 'outlier';
                    }
                }

                // Calculate persentase_ketepatan_waktu:
                $checkpoints = \App\Models\Checkpoint::where('proyek_id', $proyek->id)->get();
                $totalCheckpoints = $checkpoints->count();
                $onTimeSubmissions = 0;

                foreach ($checkpoints as $cp) {
                    $submission = \App\Models\SubmisiCheckpoint::where('checkpoint_id', $cp->id)
                        ->where('anggota_tim_id', $member->id)
                        ->first();
                    if ($submission) {
                        $deadlineTime = \Carbon\Carbon::parse($cp->deadline)->endOfDay();
                        $submitTime = \Carbon\Carbon::parse($submission->waktu_submit);
                        if ($submitTime->lte($deadlineTime)) {
                            $onTimeSubmissions++;
                        }
                    }
                }
                $persentaseKetepatan = $totalCheckpoints > 0 ? ($onTimeSubmissions / $totalCheckpoints) * 100 : 100.0;

                // If flagged, status is 'menunggu_acc_dosen', otherwise 'final'
                $statusValidasi = $varianceFlag ? 'menunggu_acc_dosen' : 'final';
                $ringkasan = "Evaluasi kontribusi tim untuk peran {$member->peran}.";
                if ($flagAlasan === 'kongkalikong') {
                    $ringkasan .= " [FLAGGED: Evaluasi terdeteksi memiliki variasi sangat rendah (kongkalikong), memerlukan peninjauan dosen/PIC]";
                } elseif ($flagAlasan === 'outlier') {
                    $ringkasan .= " [FLAGGED: Evaluasi terdeteksi memiliki variasi sangat tinggi (outlier), memerlukan peninjauan dosen/PIC]";
                }

                RekamKontribusi::updateOrCreate(
                    ['anggota_tim_id' => $member->id],
                    [
                        'skor_rata_rata' => $avgScore,
                        'persentase_ketepatan_waktu' => $persentaseKetepatan,
                        'ringkasan_kontribusi' => $ringkasan,
                        'status_validasi' => $statusValidasi,
                        'flag_alasan' => $flagAlasan,
                        'dibuat_pada' => now(),
                        'hash_data' => hash('sha256', $member->id . '|' . $avgScore . '|' . $statusValidasi . '|' . now()->toDateTimeString()), // Phase 2 setup
                    ]
                );
            }
        }
    }
}
