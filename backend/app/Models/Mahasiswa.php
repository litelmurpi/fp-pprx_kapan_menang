<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['user_id', 'nim', 'prodi', 'minat_bidang', 'jam_luang_per_minggu'])]
class Mahasiswa extends Model
{
    use HasFactory;

    protected $appends = ['reputasi'];

    public function getReputasiAttribute()
    {
        $anggotaTimIds = $this->anggotaTims()->pluck('id');
        if ($anggotaTimIds->isEmpty()) {
            return 0;
        }
        
        $average = \App\Models\PeerEvaluasi::whereIn('penerima_id', $anggotaTimIds)->avg('skor_kontribusi');
        return $average ? round($average, 1) : 0;
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function profilSkills(): HasMany
    {
        return $this->hasMany(ProfilSkill::class, 'mahasiswa_id');
    }

    public function anggotaTims(): HasMany
    {
        return $this->hasMany(AnggotaTim::class, 'mahasiswa_id');
    }
}
