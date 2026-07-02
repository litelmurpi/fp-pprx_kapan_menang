<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['nama', 'memerlukan_approval'])]
class KategoriProyek extends Model
{
    use HasFactory;

    protected $table = 'kategori_proyeks';

    protected function casts(): array
    {
        return [
            'memerlukan_approval' => 'boolean',
        ];
    }

    public function proyeks(): HasMany
    {
        return $this->hasMany(Proyek::class, 'kategori_proyek_id');
    }
}
