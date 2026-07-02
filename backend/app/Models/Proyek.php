<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable([
    'judul',
    'deskripsi',
    'pembuat_id',
    'tanggal_mulai',
    'tanggal_selesai',
    'status',
    'kategori_proyek_id',
    'label_simulasi'
])]
class Proyek extends Model
{
    use HasFactory;

    protected $table = 'proyeks';

    protected function casts(): array
    {
        return [
            'label_simulasi' => 'boolean',
            'tanggal_mulai' => 'date',
            'tanggal_selesai' => 'date',
        ];
    }

    public function pembuat(): BelongsTo
    {
        return $this->belongsTo(User::class, 'pembuat_id');
    }

    public function kategoriProyek(): BelongsTo
    {
        return $this->belongsTo(KategoriProyek::class, 'kategori_proyek_id');
    }

    public function kebutuhanSkills(): HasMany
    {
        return $this->hasMany(KebutuhanSkill::class, 'proyek_id');
    }

    public function anggotaTims(): HasMany
    {
        return $this->hasMany(AnggotaTim::class, 'proyek_id');
    }

    public function checkpoints(): HasMany
    {
        return $this->hasMany(Checkpoint::class, 'proyek_id');
    }

    public function peerEvaluasis(): HasMany
    {
        return $this->hasMany(PeerEvaluasi::class, 'proyek_id');
    }

    public function approvalPics(): HasMany
    {
        return $this->hasMany(ApprovalPic::class, 'proyek_id');
    }
}
