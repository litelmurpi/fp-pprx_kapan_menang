<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\KategoriProyek;

class KategoriProyekSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['nama' => 'Internal UKM', 'memerlukan_approval' => false],
            ['nama' => 'Mata Kuliah', 'memerlukan_approval' => false],
            ['nama' => 'Lomba', 'memerlukan_approval' => false],
            ['nama' => 'UMKM / Komunitas', 'memerlukan_approval' => true],
        ];

        foreach ($categories as $category) {
            KategoriProyek::firstOrCreate(['nama' => $category['nama']], $category);
        }
    }
}
