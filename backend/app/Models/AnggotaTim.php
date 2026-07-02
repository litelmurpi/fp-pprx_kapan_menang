<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['proyek_id', 'mahasiswa_id', 'peran', 'tanggal_join'])]
class AnggotaTim extends Model
{
    use HasFactory;

    protected $table = 'anggota_tims';

    protected function casts(): array
    {
        return [
            'tanggal_join' => 'date',
        ];
    }

    public function proyek(): BelongsTo
    {
        return $this->belongsTo(Proyek::class, 'proyek_id');
    }

    public function mahasiswa(): BelongsTo
    {
        return $this->belongsTo(Mahasiswa::class, 'mahasiswa_id');
    }

    public function submisiCheckpoints(): HasMany
    {
        return $this->hasMany(SubmisiCheckpoint::class, 'anggota_tim_id');
    }

    public function peerEvaluasiDiberikan(): HasMany
    {
        return $this->hasMany(PeerEvaluasi::class, 'pemberi_id');
    }

    public function peerEvaluasiDiterima(): HasMany
    {
        return $this->hasMany(PeerEvaluasi::class, 'penerima_id');
    }

    public function rekamKontribusi(): HasOne
    {
        return $this->hasOne(RekamKontribusi::class, 'anggota_tim_id');
    }
}
