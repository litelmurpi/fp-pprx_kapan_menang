<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Checkpoint;
use App\Models\SubmisiCheckpoint;
use App\Models\AnggotaTim;
use App\Models\Mahasiswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SubmisiCheckpointController extends Controller
{
    public function submitProgress(Request $request, $checkpointId)
    {
        $checkpoint = Checkpoint::find($checkpointId);
        if (!$checkpoint) {
            return response()->json(['message' => 'Checkpoint not found'], 404);
        }

        $user = $request->user();
        if ($user->role !== 'mahasiswa') {
            return response()->json(['message' => 'Only student team members can submit progress'], 403);
        }

        $mahasiswa = Mahasiswa::where('user_id', $user->id)->firstOrFail();

        // Check if student is a team member for this project
        $anggotaTim = AnggotaTim::where('proyek_id', $checkpoint->proyek_id)
            ->where('mahasiswa_id', $mahasiswa->id)
            ->first();

        if (!$anggotaTim) {
            return response()->json(['message' => 'You are not a member of this project team'], 403);
        }

        $validator = Validator::make($request->all(), [
            'catatan_progres' => 'required|string',
            'tautan_tugas' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $serialized = json_encode([
            'catatan' => $request->catatan_progres,
            'tautan' => $request->tautan_tugas ?? ''
        ]);

        $submisi = SubmisiCheckpoint::updateOrCreate(
            [
                'checkpoint_id' => $checkpointId,
                'anggota_tim_id' => $anggotaTim->id,
            ],
            [
                'catatan_progres' => $serialized,
                'waktu_submit' => now(),
            ]
        );

        // Decode for response
        $submisiArray = $submisi->toArray();
        $submisiArray['catatan_progres'] = $request->catatan_progres;
        $submisiArray['tautan_tugas'] = $request->tautan_tugas ?? '';

        return response()->json([
            'message' => 'Progress submitted successfully',
            'submisi' => $submisiArray
        ]);
    }

    public function getSubmissions($checkpointId)
    {
        $checkpoint = Checkpoint::find($checkpointId);
        if (!$checkpoint) {
            return response()->json(['message' => 'Checkpoint not found'], 404);
        }

        $submissions = SubmisiCheckpoint::where('checkpoint_id', $checkpointId)
            ->with('anggotaTim.mahasiswa.user')
            ->get();

        $formatted = [];
        foreach ($submissions as $sub) {
            $subArray = $sub->toArray();
            $catatanText = $sub->catatan_progres;
            $tautan = '';
            
            if (is_string($catatanText) && str_starts_with($catatanText, '{') && str_ends_with($catatanText, '}')) {
                $decoded = json_decode($catatanText, true);
                if (isset($decoded['catatan'])) {
                    $catatanText = $decoded['catatan'];
                    $tautan = $decoded['tautan'] ?? '';
                }
            }
            
            $subArray['catatan_progres'] = $catatanText;
            $subArray['tautan_tugas'] = $tautan;
            $formatted[] = $subArray;
        }

        return response()->json($formatted);
    }
}
