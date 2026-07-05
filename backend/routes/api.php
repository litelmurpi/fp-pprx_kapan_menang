<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MahasiswaController;
use App\Http\Controllers\Api\ProyekController;
use App\Http\Controllers\Api\MatchmakingController;
use App\Http\Controllers\Api\CheckpointController;
use App\Http\Controllers\Api\SubmisiCheckpointController;
use App\Http\Controllers\Api\PeerEvaluasiController;
use App\Http\Controllers\Api\RekamKontribusiController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/portfolio/{nim}', [RekamKontribusiController::class, 'getPublicPortfolio']);

Route::get('/health', function () {
    return response()->json([
        'status' => 'OK',
        'message' => 'API is fully functional',
        'timestamp' => now()
    ]);
});

// Authenticated routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth & Profile
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    
    // Mahasiswa Profile & Skills
    Route::get('/mahasiswa/profile', [MahasiswaController::class, 'profile']);
    Route::put('/mahasiswa/profile', [MahasiswaController::class, 'updateProfile']);
    Route::get('/mahasiswa/skills', [MahasiswaController::class, 'getSkills']);
    Route::post('/mahasiswa/skills', [MahasiswaController::class, 'addOrUpdateSkill']);
    Route::delete('/mahasiswa/skills/{id}', [MahasiswaController::class, 'removeSkill']);
    Route::get('/skills/master', [MahasiswaController::class, 'masterSkills']);

    // Proyek & Approval
    Route::get('/proyek', [ProyekController::class, 'index']);
    Route::get('/proyek/waiting-approval', [ProyekController::class, 'getWaitingApproval']);
    Route::get('/proyek/categories', [ProyekController::class, 'getCategories']);
    Route::post('/proyek', [ProyekController::class, 'store']);
    Route::get('/proyek/{id}', [ProyekController::class, 'show']);
    Route::put('/proyek/{id}', [ProyekController::class, 'update']);
    Route::delete('/proyek/{id}', [ProyekController::class, 'destroy']);
    Route::post('/proyek/{id}/decide-approval', [ProyekController::class, 'decideApproval']);

    // Matchmaking & Team Membership
    Route::get('/proyek/{id}/candidates', [MatchmakingController::class, 'getCandidates']);
    Route::post('/proyek/{id}/join', [MatchmakingController::class, 'joinTeam']);
    Route::post('/proyek/{id}/members', [MatchmakingController::class, 'addMember']);
    Route::delete('/proyek/{id}/members/{memberId}', [MatchmakingController::class, 'removeMember']);
    Route::post('/proyek/{id}/members/{memberId}/respond', [MatchmakingController::class, 'respondMembership']);

    // Checkpoints (Milestones)
    Route::get('/proyek/{proyekId}/checkpoints', [CheckpointController::class, 'getProjectCheckpoints']);
    Route::post('/proyek/{proyekId}/checkpoints', [CheckpointController::class, 'store']);
    Route::get('/checkpoints/{id}', [CheckpointController::class, 'show']);
    Route::put('/checkpoints/{id}', [CheckpointController::class, 'update']);
    Route::delete('/checkpoints/{id}', [CheckpointController::class, 'destroy']);

    // Submisi Checkpoint
    Route::post('/checkpoints/{checkpointId}/submit', [SubmisiCheckpointController::class, 'submitProgress']);
    Route::get('/checkpoints/{checkpointId}/submissions', [SubmisiCheckpointController::class, 'getSubmissions']);

    // Peer Evaluasi
    Route::get('/proyek/{proyekId}/evaluasi', [PeerEvaluasiController::class, 'getProjectEvaluations']);
    Route::post('/proyek/{proyekId}/evaluasi', [PeerEvaluasiController::class, 'submitEvaluation']);

    // Portfolio & Rekam Kontribusi Validation
    Route::get('/portfolio', [RekamKontribusiController::class, 'getStudentPortfolio']);
    Route::get('/reports/flagged', [RekamKontribusiController::class, 'getFlaggedReports']);
    Route::post('/reports/{id}/validate', [RekamKontribusiController::class, 'validateReport']);
});
