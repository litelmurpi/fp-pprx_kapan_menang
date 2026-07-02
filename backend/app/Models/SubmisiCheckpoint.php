<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['checkpoint_id', 'anggota_tim_id', 'catatan_progres', 'waktu_submit'])]
class SubmisiCheckpoint extends Model
{
    use HasFactory;

    protected $table = 'submisi_checkpoints';

    protected function casts(): array
    {
        return [
            'waktu_submit' => 'datetime',
        ];
    }

    public function checkpoint(): BelongsTo
    {
        return $this->belongsTo(Checkpoint::class, 'checkpoint_id');
    }

    public function anggotaTim(): BelongsTo
    {
        return $this->belongsTo(AnggotaTim::class, 'anggota_tim_id');
    }
}
