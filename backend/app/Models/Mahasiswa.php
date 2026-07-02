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
