<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['nama', 'kategori'])]
class Skill extends Model
{
    use HasFactory;

    public function profilSkills(): HasMany
    {
        return $this->hasMany(ProfilSkill::class, 'skill_id');
    }

    public function kebutuhanSkills(): HasMany
    {
        return $this->hasMany(KebutuhanSkill::class, 'skill_id');
    }
}
