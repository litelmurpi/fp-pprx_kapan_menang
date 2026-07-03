<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Mahasiswa;
use App\Models\Skill;
use App\Models\ProfilSkill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MahasiswaController extends Controller
{
    public function profile(Request $request)
    {
        $user = $request->user();
        if ($user->role !== 'mahasiswa') {
            return response()->json(['message' => 'User is not a student'], 403);
        }

        $mahasiswa = Mahasiswa::where('user_id', $user->id)
            ->with(['user', 'profilSkills.skill', 'anggotaTims.proyek'])
            ->first();

        return response()->json($mahasiswa);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();
        if ($user->role !== 'mahasiswa') {
            return response()->json(['message' => 'User is not a student'], 403);
        }

        $mahasiswa = Mahasiswa::where('user_id', $user->id)->firstOrFail();

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'nim' => 'required|string|max:50|unique:mahasiswas,nim,' . $mahasiswa->id,
            'prodi' => 'required|string|max:255',
            'minat_bidang' => 'nullable|string|max:255',
            'jam_luang_per_minggu' => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        // Update User Name
        $user->update([
            'name' => $request->name
        ]);

        // Update Mahasiswa
        $mahasiswa->update([
            'nim' => $request->nim,
            'prodi' => $request->prodi,
            'minat_bidang' => $request->minat_bidang,
            'jam_luang_per_minggu' => $request->jam_luang_per_minggu,
        ]);

        return response()->json([
            'message' => 'Profile updated successfully',
            'mahasiswa' => $mahasiswa->load('user')
        ]);
    }

    public function getSkills(Request $request)
    {
        $user = $request->user();
        if ($user->role !== 'mahasiswa') {
            return response()->json(['message' => 'User is not a student'], 403);
        }

        $mahasiswa = Mahasiswa::where('user_id', $user->id)->firstOrFail();
        $profilSkills = ProfilSkill::where('mahasiswa_id', $mahasiswa->id)
            ->with('skill')
            ->get();

        return response()->json($profilSkills);
    }

    public function addOrUpdateSkill(Request $request)
    {
        $user = $request->user();
        if ($user->role !== 'mahasiswa') {
            return response()->json(['message' => 'User is not a student'], 403);
        }

        $mahasiswa = Mahasiswa::where('user_id', $user->id)->firstOrFail();

        $validator = Validator::make($request->all(), [
            'skill_id' => 'required|exists:skills,id',
            'level_keahlian' => 'required|integer|min:1|max:5',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $profilSkill = ProfilSkill::updateOrCreate(
            [
                'mahasiswa_id' => $mahasiswa->id,
                'skill_id' => $request->skill_id,
            ],
            [
                'level_keahlian' => $request->level_keahlian,
            ]
        );

        return response()->json([
            'message' => 'Skill added/updated successfully',
            'profil_skill' => $profilSkill->load('skill')
        ]);
    }

    public function removeSkill($id)
    {
        $user = auth()->user();
        if ($user->role !== 'mahasiswa') {
            return response()->json(['message' => 'User is not a student'], 403);
        }

        $mahasiswa = Mahasiswa::where('user_id', $user->id)->firstOrFail();
        
        $profilSkill = ProfilSkill::where('mahasiswa_id', $mahasiswa->id)
            ->where('id', $id)
            ->first();

        if (!$profilSkill) {
            return response()->json(['message' => 'Skill profile not found'], 404);
        }

        $profilSkill->delete();

        return response()->json([
            'message' => 'Skill removed successfully'
        ]);
    }

    public function masterSkills()
    {
        $skills = Skill::orderBy('kategori')->orderBy('nama')->get();
        return response()->json($skills);
    }
}
