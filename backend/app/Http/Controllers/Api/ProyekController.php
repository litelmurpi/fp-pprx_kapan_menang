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
        return response()->json($proyek);
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

        return response()->json($proyek);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        
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

        $kategori = KategoriProyek::find($request->kategori_proyek_id);
        $status = 'open';
        if ($kategori->memerlukan_approval) {
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

            // If user is mahasiswa, automatically add them to the team as project owner / lead
            if ($user->role === 'mahasiswa') {
                $mahasiswa = Mahasiswa::where('user_id', $user->id)->first();
                if ($mahasiswa) {
                    AnggotaTim::create([
                        'proyek_id' => $proyek->id,
                        'mahasiswa_id' => $mahasiswa->id,
                        'peran' => 'Project Leader',
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
