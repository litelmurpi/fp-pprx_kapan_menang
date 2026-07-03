<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Mahasiswa;
use App\Models\Skill;
use App\Models\ProfilSkill;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Admin
        User::firstOrCreate(
            ['email' => 'admin@acc.org'],
            [
                'name' => 'Admin Center',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );

        // 2. Create Dosen & PIC UKM
        $dosen = User::firstOrCreate(
            ['email' => 'haryanto@amikom.ac.id'],
            [
                'name' => 'Dr. Haryanto',
                'password' => Hash::make('password'),
                'role' => 'dosen',
            ]
        );

        $pic = User::firstOrCreate(
            ['email' => 'sarah@acc.org'],
            [
                'name' => 'Sarah Fauziah',
                'password' => Hash::make('password'),
                'role' => 'pic_ukm',
            ]
        );

        // 3. Create Mahasiswa + Profiles
        $mahasiswaData = [
            [
                'email' => 'budi@students.amikom.ac.id',
                'name' => 'Budi Santoso',
                'nim' => '22.11.4321',
                'prodi' => 'Informatika',
                'minat_bidang' => 'Backend',
                'jam_luang_per_minggu' => 12,
                'skills' => [
                    'PHP' => 4,
                    'Laravel' => 4,
                    'MySQL' => 3,
                    'Git' => 3
                ]
            ],
            [
                'email' => 'andi@students.amikom.ac.id',
                'name' => 'Andi Wijaya',
                'nim' => '22.11.4322',
                'prodi' => 'Sistem Informasi',
                'minat_bidang' => 'Design', // matching category
                'jam_luang_per_minggu' => 15,
                'skills' => [
                    'Figma' => 5,
                    'UI/UX Design' => 4,
                    'CSS' => 3
                ]
            ],
            [
                'email' => 'citra@students.amikom.ac.id',
                'name' => 'Citra Lestari',
                'nim' => '22.11.4323',
                'prodi' => 'Informatika',
                'minat_bidang' => 'Frontend',
                'jam_luang_per_minggu' => 8,
                'skills' => [
                    'JavaScript' => 4,
                    'HTML' => 5,
                    'CSS' => 4,
                    'React' => 3
                ]
            ],
            [
                'email' => 'dewi@students.amikom.ac.id',
                'name' => 'Dewi Sartika',
                'nim' => '22.11.4324',
                'prodi' => 'Informatika',
                'minat_bidang' => 'Fullstack',
                'jam_luang_per_minggu' => 20,
                'skills' => [
                    'React' => 4,
                    'Laravel' => 3,
                    'PHP' => 3,
                    'Git' => 3
                ]
            ],
            [
                'email' => 'eko@students.amikom.ac.id',
                'name' => 'Eko Prasetyo',
                'nim' => '22.11.4325',
                'prodi' => 'Teknik Komputer',
                'minat_bidang' => 'Backend',
                'jam_luang_per_minggu' => 4, // 🔴 Waktu Terbatas
                'skills' => [
                    'Node.js' => 4,
                    'PostgreSQL' => 3,
                    'Git' => 4
                ]
            ]
        ];

        foreach ($mahasiswaData as $data) {
            $user = User::firstOrCreate(
                ['email' => $data['email']],
                [
                    'name' => $data['name'],
                    'password' => Hash::make('password'),
                    'role' => 'mahasiswa',
                ]
            );

            $mhs = Mahasiswa::firstOrCreate(
                ['user_id' => $user->id],
                [
                    'nim' => $data['nim'],
                    'prodi' => $data['prodi'],
                    'minat_bidang' => $data['minat_bidang'],
                    'jam_luang_per_minggu' => $data['jam_luang_per_minggu'],
                ]
            );

            // Add Skills
            foreach ($data['skills'] as $skillName => $level) {
                $skill = Skill::where('nama', $skillName)->first();
                if ($skill) {
                    ProfilSkill::firstOrCreate([
                        'mahasiswa_id' => $mhs->id,
                        'skill_id' => $skill->id,
                        'level_keahlian' => $level,
                    ]);
                }
            }
        }
    }
}
