<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['proyek_id', 'pic_id', 'status', 'catatan_alasan', 'waktu_keputusan'])]
class ApprovalPic extends Model
{
    use HasFactory;

    protected $table = 'approval_pics';

    protected function casts(): array
    {
        return [
            'waktu_keputusan' => 'datetime',
        ];
    }

    public function proyek(): BelongsTo
    {
        return $this->belongsTo(Proyek::class, 'proyek_id');
    }

    public function pic(): BelongsTo
    {
        return $this->belongsTo(User::class, 'pic_id');
    }
}
