<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Proyek;
use App\Models\KategoriProyek;
use App\Models\KebutuhanSkill;
use App\Models\ApprovalPic;
use App\Models\AnggotaTim;
use App\Models\Mahasiswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ProyekController extends Controller
{
    public function index(Request $request)
    {
        $query = Proyek::with(['pembuat', 'kategoriProyek', 'kebutuhanSkills.skill', 'anggotaTims.mahasiswa.user']);

        if ($request->has('kategori_id')) {
            $query->where('kategori_proyek_id', $request->kategori_id);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        } else {
            // Default exclude draft or rejected unless requested
            $query->whereIn('status', ['open', 'in_progress', 'selesai']);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('judul', 'like', "%{$search}%")
                  ->orWhere('deskripsi', 'like', "%{$search}%");
            });
        }

        $proyek = $query->orderBy('created_at', 'desc')->get();
        
        $formattedProjects = [];
        foreach ($proyek as $p) {
            $pArray = $p->toArray();
            $pArray['kategori'] = $p->kategoriProyek->nama;
            $pArray['max_anggota'] = $p->kebutuhanSkills->sum('jumlah_dibutuhkan');
            $pArray['tenggat_waktu'] = $p->tanggal_selesai ? $p->tanggal_selesai->toDateString() : null;
            $pArray['dibuat_oleh_id'] = $p->pembuat_id;

            $members = [];
            $pendingMembers = [];
            foreach ($p->anggotaTims as $at) {
                if ($at->status === 'aktif') {
                    $members[] = [
                        'id' => $at->mahasiswa_id,
                        'anggota_tim_id' => $at->id,
                        'user_id' => $at->mahasiswa->user_id,
                        'user' => [
                            'name' => $at->mahasiswa->user->name,
                            'email' => $at->mahasiswa->user->email,
                        ],
                        'nim' => $at->mahasiswa->nim,
                        'prodi' => $at->mahasiswa->prodi,
                        'peran' => $at->peran,
                    ];
                } elseif ($at->status === 'mengajukan') {
                    $pendingMembers[] = [
                        'id' => $at->mahasiswa_id,
                        'anggota_tim_id' => $at->id,
                        'user_id' => $at->mahasiswa->user_id,
                        'user' => [
                            'name' => $at->mahasiswa->user->name,
                            'email' => $at->mahasiswa->user->email,
                        ],
                        'nim' => $at->mahasiswa->nim,
                        'prodi' => $at->mahasiswa->prodi,
                        'peran' => $at->peran,
                    ];
                }
            }
            $pArray['members'] = $members;
            $pArray['pending_members'] = $pendingMembers;

            $skillsNeeded = [];
            foreach ($p->kebutuhanSkills as $ks) {
                $skillsNeeded[] = [
                    'id' => $ks->skill->id,
                    'name' => $ks->skill->nama,
                    'kategori' => $ks->skill->kategori,
                    'jumlah_dibutuhkan' => $ks->jumlah_dibutuhkan,
                ];
            }
            $pArray['skills_needed'] = $skillsNeeded;

            $formattedProjects[] = $pArray;
        }

        return response()->json([
            'data' => $formattedProjects
        ]);
    }

    public function show($id)
    {
        $proyek = Proyek::with([
            'pembuat', 
            'kategoriProyek', 
            'kebutuhanSkills.skill', 
            'anggotaTims.mahasiswa.user', 
            'checkpoints.submisiCheckpoints.anggotaTim.mahasiswa.user',
            'approvalPics.pic'
        ])->find($id);

        if (!$proyek) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        $proyekArray = $proyek->toArray();
        $proyekArray['dibuat_oleh_id'] = $proyek->pembuat_id;
        $proyekArray['kategori'] = $proyek->kategoriProyek->nama;
        $proyekArray['max_anggota'] = $proyek->kebutuhanSkills->sum('jumlah_dibutuhkan');
        $proyekArray['tenggat_waktu'] = $proyek->tanggal_selesai ? $proyek->tanggal_selesai->toDateString() : null;

        $members = [];
        $pendingMembers = [];
        foreach ($proyek->anggotaTims as $at) {
            if ($at->status === 'aktif') {
                $members[] = [
                    'id' => $at->mahasiswa_id,
                    'anggota_tim_id' => $at->id,
                    'user_id' => $at->mahasiswa->user_id,
                    'user' => [
                        'name' => $at->mahasiswa->user->name,
                        'email' => $at->mahasiswa->user->email,
                    ],
                    'nim' => $at->mahasiswa->nim,
                    'prodi' => $at->mahasiswa->prodi,
                    'peran' => $at->peran,
                ];
            } elseif ($at->status === 'mengajukan') {
                $pendingMembers[] = [
                    'id' => $at->mahasiswa_id,
                    'anggota_tim_id' => $at->id,
                    'user_id' => $at->mahasiswa->user_id,
                    'user' => [
                        'name' => $at->mahasiswa->user->name,
                        'email' => $at->mahasiswa->user->email,
                    ],
                    'nim' => $at->mahasiswa->nim,
                    'prodi' => $at->mahasiswa->prodi,
                    'peran' => $at->peran,
                ];
            }
        }
        $proyekArray['members'] = $members;
        $proyekArray['pending_members'] = $pendingMembers;

        return response()->json([
            'data' => $proyekArray
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        // Normalize frontend input keys to backend validation expectations
        $kategoriName = $request->kategori;
        $labelSimulasi = false;

        if ($kategoriName === 'Internal') {
            $kategoriSearch = 'Internal UKM';
        } elseif ($kategoriName === 'Lomba') {
            $kategoriSearch = 'Lomba';
        } elseif ($kategoriName === 'Simulasi UMKM') {
            $kategoriSearch = 'UMKM / Komunitas';
            $labelSimulasi = true;
        } else {
            $kategoriSearch = $kategoriName;
        }

        $kategori = KategoriProyek::where('nama', $kategoriSearch)->first();
        $kategoriId = $kategori ? $kategori->id : null;

        if (!$request->has('tanggal_mulai')) {
            $request->merge(['tanggal_mulai' => now()->toDateString()]);
        }
        if (!$request->has('tanggal_selesai') && $request->has('tenggat_waktu')) {
            $request->merge(['tanggal_selesai' => $request->tenggat_waktu]);
        }
        
        $request->merge([
            'kategori_proyek_id' => $kategoriId,
            'label_simulasi' => $labelSimulasi || $request->label_simulasi ?? false,
        ]);

        if ($request->has('skills_needed') && is_array($request->skills_needed)) {
            $skillsData = [];
            foreach ($request->skills_needed as $skillId) {
                $skillsData[] = [
                    'skill_id' => $skillId,
                    'jumlah_dibutuhkan' => 1,
                ];
            }
            $request->merge(['skills' => $skillsData]);
        }
        
        $validator = Validator::make($request->all(), [
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'tanggal_mulai' => 'required|date',
            'tanggal_selesai' => 'required|date|after_or_equal:tanggal_mulai',
            'kategori_proyek_id' => 'required|exists:kategori_proyeks,id',
            'label_simulasi' => 'boolean',
            'skills' => 'required|array|min:1',
            'skills.*.skill_id' => 'required|exists:skills,id',
            'skills.*.jumlah_dibutuhkan' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $kategoriObj = KategoriProyek::find($request->kategori_proyek_id);
        $status = 'open';
        if ($kategoriObj && $kategoriObj->memerlukan_approval) {
            $status = 'waiting_approval';
        }

        DB::beginTransaction();
        try {
            $proyek = Proyek::create([
                'judul' => $request->judul,
                'deskripsi' => $request->deskripsi,
                'pembuat_id' => $user->id,
                'tanggal_mulai' => $request->tanggal_mulai,
                'tanggal_selesai' => $request->tanggal_selesai,
                'status' => $status,
                'kategori_proyek_id' => $request->kategori_proyek_id,
                'label_simulasi' => $request->label_simulasi ?? false,
            ]);

            // Add required skills
            foreach ($request->skills as $skillItem) {
                KebutuhanSkill::create([
                    'proyek_id' => $proyek->id,
                    'skill_id' => $skillItem['skill_id'],
                    'jumlah_dibutuhkan' => $skillItem['jumlah_dibutuhkan'],
                ]);
            }

            // Save checkpoints if provided
            if ($request->has('checkpoints') && is_array($request->checkpoints)) {
                foreach ($request->checkpoints as $cp) {
                    \App\Models\Checkpoint::create([
                        'proyek_id' => $proyek->id,
                        'judul_milestone' => $cp['judul'] ?? $cp['judul_milestone'] ?? 'Checkpoint',
                        'deadline' => $cp['tenggat_waktu'] ?? $cp['deadline'] ?? now()->addWeeks(2)->toDateString(),
                        'status' => 'pending',
                    ]);
                }
            }

            // If user is mahasiswa, automatically add them to the team as project owner / lead with status active
            if ($user->role === 'mahasiswa') {
                $mahasiswa = Mahasiswa::where('user_id', $user->id)->first();
                if ($mahasiswa) {
                    AnggotaTim::create([
                        'proyek_id' => $proyek->id,
                        'mahasiswa_id' => $mahasiswa->id,
                        'peran' => 'Project Leader',
                        'status' => 'aktif',
                        'tanggal_join' => now(),
                    ]);
                }
            }

            DB::commit();

            return response()->json([
                'message' => 'Project created successfully',
                'proyek' => $proyek->load(['kategoriProyek', 'kebutuhanSkills.skill'])
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to create project',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $proyek = Proyek::find($id);
        if (!$proyek) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();

        // Only allow owner or admin to edit
        if ($user->id !== $proyek->pembuat_id && $user->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'judul' => 'string|max:255',
            'deskripsi' => 'string',
            'tanggal_mulai' => 'date',
            'tanggal_selesai' => 'date|after_or_equal:tanggal_mulai',
            'status' => 'string|in:open,in_progress,selesai,waiting_approval,rejected',
            'label_simulasi' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $proyek->update($request->only([
            'judul', 'deskripsi', 'tanggal_mulai', 'tanggal_selesai', 'status', 'label_simulasi'
        ]));

        return response()->json([
            'message' => 'Project updated successfully',
            'proyek' => $proyek
        ]);
    }

    public function destroy($id)
    {
        $proyek = Proyek::find($id);
        if (!$proyek) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();

        if ($user->id !== $proyek->pembuat_id && $user->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $proyek->delete();
        return response()->json(['message' => 'Project deleted successfully']);
    }

    public function getCategories()
    {
        $categories = KategoriProyek::all();
        return response()->json($categories);
    }

    // PIC approval list
    public function getWaitingApproval(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        if (!in_array($user->role, ['dosen', 'pic_ukm', 'admin'])) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $proyeks = Proyek::where('status', 'waiting_approval')
            ->with(['pembuat', 'kategoriProyek', 'kebutuhanSkills.skill'])
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($proyeks);
    }

    // PIC decide approval
    public function decideApproval(Request $request, $id)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        if (!in_array($user->role, ['dosen', 'pic_ukm', 'admin'])) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $proyek = Proyek::find($id);
        if (!$proyek) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        if ($proyek->status !== 'waiting_approval') {
            return response()->json(['message' => 'Project is not waiting for approval'], 400);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'required|in:approved,rejected',
            'catatan_alasan' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $decision = $request->status;
        $statusProyek = ($decision === 'approved') ? 'open' : 'rejected';

        DB::beginTransaction();
        try {
            $proyek->update([
                'status' => $statusProyek
            ]);

            ApprovalPic::create([
                'proyek_id' => $proyek->id,
                'pic_id' => $user->id,
                'status' => $decision,
                'catatan_alasan' => $request->catatan_alasan,
                'waktu_keputusan' => now(),
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Project approval decision recorded',
                'proyek' => $proyek
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to record decision',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
