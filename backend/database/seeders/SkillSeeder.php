<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Skill;

class SkillSeeder extends Seeder
{
    public function run(): void
    {
        $skills = [
            // Frontend
            ['nama' => 'HTML', 'kategori' => 'Frontend'],
            ['nama' => 'CSS', 'kategori' => 'Frontend'],
            ['nama' => 'JavaScript', 'kategori' => 'Frontend'],
            ['nama' => 'React', 'kategori' => 'Frontend'],
            ['nama' => 'Vue.js', 'kategori' => 'Frontend'],
            ['nama' => 'Tailwind CSS', 'kategori' => 'Frontend'],

            // Backend
            ['nama' => 'PHP', 'kategori' => 'Backend'],
            ['nama' => 'Laravel', 'kategori' => 'Backend'],
            ['nama' => 'Node.js', 'kategori' => 'Backend'],
            ['nama' => 'MySQL', 'kategori' => 'Backend'],
            ['nama' => 'PostgreSQL', 'kategori' => 'Backend'],
            ['nama' => 'Python', 'kategori' => 'Backend'],

            // Design
            ['nama' => 'UI/UX Design', 'kategori' => 'Design'],
            ['nama' => 'Figma', 'kategori' => 'Design'],
            ['nama' => 'Adobe Illustrator', 'kategori' => 'Design'],

            // Management / Writing
            ['nama' => 'Project Management', 'kategori' => 'Management'],
            ['nama' => 'Copywriting', 'kategori' => 'Writing'],
            ['nama' => 'SEO', 'kategori' => 'Marketing'],
            ['nama' => 'Git', 'kategori' => 'DevOps'],
        ];

        foreach ($skills as $skill) {
            Skill::firstOrCreate(['nama' => $skill['nama']], $skill);
        }
    }
}
