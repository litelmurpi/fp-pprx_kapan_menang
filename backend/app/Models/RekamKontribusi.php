<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['anggota_tim_id', 'skor_rata_rata', 'ringkasan_kontribusi', 'status_validasi', 'hash_data', 'dibuat_pada'])]
class RekamKontribusi extends Model
{
    use HasFactory;

    protected $table = 'rekam_kontribusis';

    protected function casts(): array
    {
        return [
            'dibuat_pada' => 'datetime',
            'skor_rata_rata' => 'float',
        ];
    }

    public function anggotaTim(): BelongsTo
    {
        return $this->belongsTo(AnggotaTim::class, 'anggota_tim_id');
    }
}
