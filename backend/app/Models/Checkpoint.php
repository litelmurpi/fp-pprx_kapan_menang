<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['proyek_id', 'judul_milestone', 'deadline', 'status'])]
class Checkpoint extends Model
{
    use HasFactory;

    protected $table = 'checkpoints';

    protected function casts(): array
    {
        return [
            'deadline' => 'date',
        ];
    }

    public function proyek(): BelongsTo
    {
        return $this->belongsTo(Proyek::class, 'proyek_id');
    }

    public function submisiCheckpoints(): HasMany
    {
        return $this->hasMany(SubmisiCheckpoint::class, 'checkpoint_id');
    }
}
