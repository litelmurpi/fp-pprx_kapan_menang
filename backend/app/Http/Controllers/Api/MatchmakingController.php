<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Proyek;
use App\Models\Mahasiswa;
use App\Models\AnggotaTim;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MatchmakingController extends Controller
{
    public function getCandidates($id)
    {
        $proyek = Proyek::with(['kategoriProyek', 'kebutuhanSkills'])->find($id);
        if (!$proyek) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        $kebutuhanSkills = $proyek->kebutuhanSkills;
        $totalKebutuhan = $kebutuhanSkills->count();

        // If no skills are defined, return all students with 0 skill score
        $mahasiswas = Mahasiswa::with(['user', 'profilSkills.skill', 'anggotaTims'])->get();

        $candidates = [];

        foreach ($mahasiswas as $mhs) {
            // Check if student is already in the project team
            $isAlreadyMember = AnggotaTim::where('proyek_id', $id)
                ->where('mahasiswa_id', $mhs->id)
                ->whereIn('status', ['aktif', 'diundang', 'mengajukan'])
                ->exists();

            if ($isAlreadyMember) {
                continue; // Skip existing members
            }

            // 1. Calculate skill_score (80%)
            $skillScore = 0;
            if ($totalKebutuhan > 0) {
                $matchedPoints = 0;
                foreach ($kebutuhanSkills as $kebutuhan) {
                    $profilSkill = $mhs->profilSkills->firstWhere('skill_id', $kebutuhan->skill_id);
                    if ($profilSkill) {
                        $matchedPoints += ($profilSkill->level_keahlian / 5.0);
                    }
                }
                $skillScore = $matchedPoints / $totalKebutuhan;
            }

            // 2. Calculate minat_bonus (10%)
            $minatBonus = 0;
            if ($mhs->minat_bidang) {
                $categoryName = strtolower($proyek->kategoriProyek->nama);
                $minat = strtolower($mhs->minat_bidang);
                if (str_contains($categoryName, $minat) || str_contains($minat, $categoryName)) {
                    $minatBonus = 1.0;
                }
            }

            // 3. Calculate onboarding_bonus (10%)
            $onboardingBonus = 0;
            if ($mhs->anggotaTims->where('status', 'aktif')->count() === 0) {
                $onboardingBonus = 1.0;
            }

            // Skor akhir
            $skorAkhir = ($skillScore * 0.80) + ($minatBonus * 0.10) + ($onboardingBonus * 0.10);

            // Jam luang label
            $jamLuang = $mhs->jam_luang_per_minggu;
            $jamLuangLabel = '🔴 Waktu Terbatas';
            $jamLuangColor = 'red';
            if ($jamLuang > 15) {
                $jamLuangLabel = '🟢 Tersedia Penuh';
                $jamLuangColor = 'green';
            } elseif ($jamLuang >= 5) {
                $jamLuangLabel = '🟡 Ketersediaan Sedang';
                $jamLuangColor = 'yellow';
            }

            $candidates[] = [
                'mahasiswa_id' => $mhs->id,
                'name' => $mhs->user->name,
                'email' => $mhs->user->email,
                'nim' => $mhs->nim,
                'prodi' => $mhs->prodi,
                'minat_bidang' => $mhs->minat_bidang,
                'jam_luang_per_minggu' => $jamLuang,
                'jam_luang_label' => $jamLuangLabel,
                'jam_luang_color' => $jamLuangColor,
                'skills' => $mhs->profilSkills->map(function ($ps) {
                    return [
                        'nama' => $ps->skill->nama,
                        'level' => $ps->level_keahlian
                    ];
                }),
                'metrics' => [
                    'skill_score' => round($skillScore, 4),
                    'minat_bonus' => $minatBonus,
                    'onboarding_bonus' => $onboardingBonus,
                    'total_projects' => $mhs->anggotaTims->where('status', 'aktif')->count()
                ],
                'skor_akhir' => round($skorAkhir, 4)
            ];
        }

        // Sort descending by score, then name
        usort($candidates, function ($a, $b) {
            if ($b['skor_akhir'] == $a['skor_akhir']) {
                return strcmp($a['name'], $b['name']);
            }
            return ($b['skor_akhir'] < $a['skor_akhir']) ? -1 : 1;
        });

        return response()->json($candidates);
    }

    public function joinTeam(Request $request, $id)
    {
        $proyek = Proyek::find($id);
        if (!$proyek) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        if ($proyek->status !== 'open') {
            return response()->json(['message' => 'Project is not open for registration'], 400);
        }

        $user = $request->user();
        if ($user->role !== 'mahasiswa') {
            return response()->json(['message' => 'Only students can join project teams'], 403);
        }

        $mahasiswa = Mahasiswa::where('user_id', $user->id)->firstOrFail();

        // Check if already a member
        $isMember = AnggotaTim::where('proyek_id', $proyek->id)
            ->where('mahasiswa_id', $mahasiswa->id)
            ->whereIn('status', ['aktif', 'diundang', 'mengajukan'])
            ->exists();

        if ($isMember) {
            return response()->json(['message' => 'You are already a member or have a pending request/invitation for this team'], 400);
        }

        $anggota = AnggotaTim::create([
            'proyek_id' => $proyek->id,
            'mahasiswa_id' => $mahasiswa->id,
            'peran' => $request->peran ?? 'Team Member',
            'status' => 'mengajukan',
            'tanggal_join' => null,
        ]);

        return response()->json([
            'message' => 'Successfully requested to join project team',
            'anggota' => $anggota
        ]);
    }

    public function addMember(Request $request, $id)
    {
        $proyek = Proyek::find($id);
        if (!$proyek) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        // Only project owner/creator can invite/add
        if (auth()->user()->id !== $proyek->pembuat_id && auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'mahasiswa_id' => 'required|exists:mahasiswas,id',
            'peran' => 'required|string|max:255',
        ]);

        // Check if already a member
        $isMember = AnggotaTim::where('proyek_id', $proyek->id)
            ->where('mahasiswa_id', $request->mahasiswa_id)
            ->whereIn('status', ['aktif', 'diundang', 'mengajukan'])
            ->exists();

        if ($isMember) {
            return response()->json(['message' => 'Candidate is already a member or has a pending request/invitation for this team'], 400);
        }

        $anggota = AnggotaTim::create([
            'proyek_id' => $proyek->id,
            'mahasiswa_id' => $request->mahasiswa_id,
            'peran' => $request->peran,
            'status' => 'diundang',
            'tanggal_join' => null,
        ]);

        return response()->json([
            'message' => 'Member invited successfully to team',
            'anggota' => $anggota
        ]);
    }

    public function removeMember(Request $request, $id, $memberId)
    {
        $proyek = Proyek::find($id);
        if (!$proyek) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        if (auth()->user()->id !== $proyek->pembuat_id && auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $anggota = AnggotaTim::where('proyek_id', $id)
            ->where('id', $memberId)
            ->first();

        if (!$anggota) {
            return response()->json(['message' => 'Team member not found'], 404);
        }

        $anggota->delete();
        return response()->json(['message' => 'Team member removed successfully']);
    }

    public function respondMembership(Request $request, $id, $memberId)
    {
        $proyek = Proyek::find($id);
        if (!$proyek) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        $anggota = AnggotaTim::where('proyek_id', $id)
            ->where('id', $memberId)
            ->first();

        if (!$anggota) {
            return response()->json(['message' => 'Team member request/invitation not found'], 404);
        }

        $request->validate([
            'action' => 'required|in:accept,reject',
        ]);

        $user = $request->user();
        $action = $request->action;

        if ($anggota->status === 'mengajukan') {
            // Student applied, only project leader/owner or admin can decide
            if ($user->id !== $proyek->pembuat_id && $user->role !== 'admin') {
                return response()->json(['message' => 'Only the project leader can approve this request'], 403);
            }
        } elseif ($anggota->status === 'diundang') {
            // Student was invited, only the student themselves can decide
            $mahasiswa = Mahasiswa::where('user_id', $user->id)->first();
            if (!$mahasiswa || $mahasiswa->id !== $anggota->mahasiswa_id) {
                return response()->json(['message' => 'Only the invited student can respond to this invitation'], 403);
            }
        } else {
            return response()->json(['message' => 'This request or invitation is already processed or active. Current status: ' . $anggota->status], 400);
        }

        if ($action === 'accept') {
            $anggota->update([
                'status' => 'aktif',
                'tanggal_join' => now(),
            ]);
            $msg = 'Successfully joined the team';
        } else {
            $anggota->update([
                'status' => 'ditolak',
            ]);
            $msg = 'Successfully declined/rejected';
        }

        return response()->json([
            'message' => $msg,
            'anggota' => $anggota
        ]);
    }
}
