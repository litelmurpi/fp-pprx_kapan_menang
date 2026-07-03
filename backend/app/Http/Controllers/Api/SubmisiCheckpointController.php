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
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $submisi = SubmisiCheckpoint::updateOrCreate(
            [
                'checkpoint_id' => $checkpointId,
                'anggota_tim_id' => $anggotaTim->id,
            ],
            [
                'catatan_progres' => $request->catatan_progres,
                'waktu_submit' => now(),
            ]
        );

        return response()->json([
            'message' => 'Progress submitted successfully',
            'submisi' => $submisi
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

        return response()->json($submissions);
    }
}
