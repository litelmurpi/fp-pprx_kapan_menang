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

        $user = $request->user();
        if ($user->role !== 'mahasiswa') {
            return response()->json(['message' => 'Only student team members can submit peer evaluations'], 403);
        }

        $mahasiswa = Mahasiswa::where('user_id', $user->id)->firstOrFail();

        // Get evaluator's member record
        $pemberi = AnggotaTim::where('proyek_id', $proyekId)
            ->where('mahasiswa_id', $mahasiswa->id)
            ->first();

        if (!$pemberi) {
            return response()->json(['message' => 'You are not a member of this project team'], 403);
        }

        $validator = Validator::make($request->all(), [
            'penerima_anggota_id' => 'required|exists:anggota_tims,id',
            'skor_kontribusi' => 'required|integer|min:1|max:5',
            'komentar' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $penerimaId = $request->penerima_anggota_id;

        // Check if evaluating self
        if ($pemberi->id == $penerimaId) {
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
                    'pemberi_id' => $pemberi->id,
                    'penerima_id' => $penerimaId,
                ],
                [
                    'skor_kontribusi' => $request->skor_kontribusi,
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

                // Check Variance:
                // Standard Deviation calculation:
                $varianceFlag = false;
                if (count($scores) > 1) {
                    $mean = array_sum($scores) / count($scores);
                    $sumSquareDiff = 0;
                    foreach ($scores as $s) {
                        $sumSquareDiff += pow($s - $mean, 2);
                    }
                    $stdDev = sqrt($sumSquareDiff / count($scores));

                    // If standard deviation is extremely low (e.g. < 0.5) and average is high (e.g. >= 4.5),
                    // it indicates potential collusion ("saling puji / kongkalikong").
                    if ($stdDev < 0.5 && $mean >= 4.5) {
                        $varianceFlag = true;
                    }
                }

                // If flagged, status is 'menunggu_acc_dosen', otherwise 'final'
                $statusValidasi = $varianceFlag ? 'menunggu_acc_dosen' : 'final';
                $ringkasan = "Evaluasi kontribusi tim untuk peran {$member->peran}.";
                if ($varianceFlag) {
                    $ringkasan .= " [FLAGGED: Evaluasi terdeteksi memiliki variasi sangat rendah, memerlukan peninjauan dosen/PIC]";
                }

                RekamKontribusi::updateOrCreate(
                    ['anggota_tim_id' => $member->id],
                    [
                        'skor_rata_rata' => $avgScore,
                        'ringkasan_kontribusi' => $ringkasan,
                        'status_validasi' => $statusValidasi,
                        'dibuat_pada' => now(),
                        'hash_data' => hash('sha256', $member->id . '|' . $avgScore . '|' . $statusValidasi . '|' . now()->toDateTimeString()), // Phase 2 setup
                    ]
                );
            }
        }
    }
}
