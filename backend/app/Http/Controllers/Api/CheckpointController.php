<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Proyek;
use App\Models\Checkpoint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CheckpointController extends Controller
{
    public function getProjectCheckpoints($proyekId)
    {
        $proyek = Proyek::find($proyekId);
        if (!$proyek) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        $checkpoints = Checkpoint::where('proyek_id', $proyekId)
            ->orderBy('deadline', 'asc')
            ->get();

        return response()->json($checkpoints);
    }

    public function store(Request $request, $proyekId)
    {
        $proyek = Proyek::find($proyekId);
        if (!$proyek) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        if (auth()->user()->id !== $proyek->pembuat_id && auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'judul_milestone' => 'required|string|max:255',
            'deadline' => 'required|date',
            'status' => 'string|in:pending,completed,missed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $checkpoint = Checkpoint::create([
            'proyek_id' => $proyekId,
            'judul_milestone' => $request->judul_milestone,
            'deadline' => $request->deadline,
            'status' => $request->status ?? 'pending',
        ]);

        return response()->json([
            'message' => 'Checkpoint created successfully',
            'checkpoint' => $checkpoint
        ], 201);
    }

    public function show($id)
    {
        $checkpoint = Checkpoint::with('submisiCheckpoints.anggotaTim.mahasiswa.user')->find($id);
        if (!$checkpoint) {
            return response()->json(['message' => 'Checkpoint not found'], 404);
        }

        return response()->json($checkpoint);
    }

    public function update(Request $request, $id)
    {
        $checkpoint = Checkpoint::find($id);
        if (!$checkpoint) {
            return response()->json(['message' => 'Checkpoint not found'], 404);
        }

        $proyek = Proyek::find($checkpoint->proyek_id);
        if (auth()->user()->id !== $proyek->pembuat_id && auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'judul_milestone' => 'string|max:255',
            'deadline' => 'date',
            'status' => 'string|in:pending,completed,missed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $checkpoint->update($request->only(['judul_milestone', 'deadline', 'status']));

        return response()->json([
            'message' => 'Checkpoint updated successfully',
            'checkpoint' => $checkpoint
        ]);
    }

    public function destroy($id)
    {
        $checkpoint = Checkpoint::find($id);
        if (!$checkpoint) {
            return response()->json(['message' => 'Checkpoint not found'], 404);
        }

        $proyek = Proyek::find($checkpoint->proyek_id);
        if (auth()->user()->id !== $proyek->pembuat_id && auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $checkpoint->delete();
        return response()->json(['message' => 'Checkpoint deleted successfully']);
    }
}
