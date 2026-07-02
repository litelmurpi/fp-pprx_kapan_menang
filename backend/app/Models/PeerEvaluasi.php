<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['proyek_id', 'pemberi_id', 'penerima_id', 'skor_kontribusi', 'komentar', 'waktu_evaluasi'])]
class PeerEvaluasi extends Model
{
    use HasFactory;

    protected $table = 'peer_evaluasis';

    protected function casts(): array
    {
        return [
            'waktu_evaluasi' => 'datetime',
        ];
    }

    public function proyek(): BelongsTo
    {
        return $this->belongsTo(Proyek::class, 'proyek_id');
    }

    public function pemberi(): BelongsTo
    {
        return $this->belongsTo(AnggotaTim::class, 'pemberi_id');
    }

    public function penerima(): BelongsTo
    {
        return $this->belongsTo(AnggotaTim::class, 'penerima_id');
    }
}
