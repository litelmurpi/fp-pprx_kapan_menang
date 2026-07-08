<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Mahasiswa;
use App\Models\Skill;
use App\Models\ProfilSkill;
use App\Models\KategoriProyek;
use App\Models\Proyek;
use App\Models\KebutuhanSkill;
use App\Models\AnggotaTim;
use App\Models\Checkpoint;
use App\Models\SubmisiCheckpoint;
use App\Models\PeerEvaluasi;
use App\Models\RekamKontribusi;
use App\Models\ApprovalPic;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Carbon;

class DemoDataSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Dapatkan Kategori Proyek
        $catInternal = KategoriProyek::where('nama', 'Internal UKM')->first();
        $catMatkul = KategoriProyek::where('nama', 'Mata Kuliah')->first();
        $catLomba = KategoriProyek::where('nama', 'Lomba')->first();
        $catUmkm = KategoriProyek::where('nama', 'UMKM / Komunitas')->first();

        // 2. Buat Dosen Baru
        $dosenAni = User::firstOrCreate(
            ['email' => 'ani@amikom.ac.id'],
            [
                'name' => 'Dr. Ani Wijaya',
                'password' => Hash::make('password'),
                'role' => 'dosen',
            ]
        );

        $dosenHaryanto = User::where('email', 'haryanto@amikom.ac.id')->first();
        if (!$dosenHaryanto) {
            $dosenHaryanto = User::create([
                'name' => 'Dr. Haryanto',
                'email' => 'haryanto@amikom.ac.id',
                'password' => Hash::make('password'),
                'role' => 'dosen',
            ]);
        }

        // 3. Buat PIC UKM Baru
        $picBudi = User::firstOrCreate(
            ['email' => 'budi.hartono@acc.org'],
            [
                'name' => 'Budi Hartono',
                'password' => Hash::make('password'),
                'role' => 'pic_ukm',
            ]
        );

        $picSarah = User::where('email', 'sarah@acc.org')->first();
        if (!$picSarah) {
            $picSarah = User::create([
                'name' => 'Sarah Fauziah',
                'email' => 'sarah@acc.org',
                'password' => Hash::make('password'),
                'role' => 'pic_ukm',
            ]);
        }

        // 4. Buat 10 Mahasiswa Baru dengan Skill Profile masing-masing
        $mahasiswaData = [
            [
                'email' => 'feri@students.amikom.ac.id',
                'name' => 'Feri Hermawan',
                'nim' => '22.11.4326',
                'prodi' => 'Informatika',
                'minat_bidang' => 'Backend',
                'jam_luang_per_minggu' => 12,
                'skills' => [
                    'PHP' => 4,
                    'Laravel' => 4,
                    'MySQL' => 4,
                    'Git' => 3
                ]
            ],
            [
                'email' => 'gita@students.amikom.ac.id',
                'name' => 'Gita Permata',
                'nim' => '22.11.4327',
                'prodi' => 'Sistem Informasi',
                'minat_bidang' => 'Design',
                'jam_luang_per_minggu' => 10,
                'skills' => [
                    'Figma' => 5,
                    'UI/UX Design' => 4,
                    'HTML' => 3
                ]
            ],
            [
                'email' => 'haris@students.amikom.ac.id',
                'name' => 'Haris Setiawan',
                'nim' => '22.11.4328',
                'prodi' => 'Informatika',
                'minat_bidang' => 'Frontend',
                'jam_luang_per_minggu' => 14,
                'skills' => [
                    'React' => 4,
                    'JavaScript' => 4,
                    'Tailwind CSS' => 4,
                    'HTML' => 4
                ]
            ],
            [
                'email' => 'indah@students.amikom.ac.id',
                'name' => 'Indah Sari',
                'nim' => '22.11.4329',
                'prodi' => 'Informatika',
                'minat_bidang' => 'Fullstack',
                'jam_luang_per_minggu' => 16,
                'skills' => [
                    'Laravel' => 4,
                    'React' => 4,
                    'MySQL' => 3,
                    'Git' => 3
                ]
            ],
            [
                'email' => 'joko@students.amikom.ac.id',
                'name' => 'Joko Purwanto',
                'nim' => '22.11.4330',
                'prodi' => 'Teknik Komputer',
                'minat_bidang' => 'Backend',
                'jam_luang_per_minggu' => 8,
                'skills' => [
                    'Python' => 4,
                    'Node.js' => 3,
                    'PostgreSQL' => 3,
                    'Git' => 4
                ]
            ],
            [
                'email' => 'kartika@students.amikom.ac.id',
                'name' => 'Kartika Putri',
                'nim' => '22.11.4331',
                'prodi' => 'Sistem Informasi',
                'minat_bidang' => 'Design',
                'jam_luang_per_minggu' => 12,
                'skills' => [
                    'Figma' => 4,
                    'UI/UX Design' => 5,
                    'Adobe Illustrator' => 4
                ]
            ],
            [
                'email' => 'lukman@students.amikom.ac.id',
                'name' => 'Lukman Hakim',
                'nim' => '22.11.4332',
                'prodi' => 'Informatika',
                'minat_bidang' => 'Frontend',
                'jam_luang_per_minggu' => 15,
                'skills' => [
                    'Vue.js' => 4,
                    'Tailwind CSS' => 5,
                    'JavaScript' => 4,
                    'CSS' => 4
                ]
            ],
            [
                'email' => 'mega@students.amikom.ac.id',
                'name' => 'Mega Utami',
                'nim' => '22.11.4333',
                'prodi' => 'Informatika',
                'minat_bidang' => 'Fullstack',
                'jam_luang_per_minggu' => 18,
                'skills' => [
                    'Laravel' => 4,
                    'Vue.js' => 4,
                    'MySQL' => 4,
                    'Git' => 4
                ]
            ],
            [
                'email' => 'novi@students.amikom.ac.id',
                'name' => 'Novi Rahmawati',
                'nim' => '22.11.4334',
                'prodi' => 'Sistem Informasi',
                'minat_bidang' => 'Backend',
                'jam_luang_per_minggu' => 10,
                'skills' => [
                    'PHP' => 3,
                    'MySQL' => 4,
                    'PostgreSQL' => 3
                ]
            ],
            [
                'email' => 'oki@students.amikom.ac.id',
                'name' => 'Oki Rian',
                'nim' => '22.11.4335',
                'prodi' => 'Teknik Komputer',
                'minat_bidang' => 'Frontend',
                'jam_luang_per_minggu' => 8,
                'skills' => [
                    'HTML' => 4,
                    'CSS' => 4,
                    'JavaScript' => 3
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

        // Ambil ID mahasiswa yang dibuat oleh UserSeeder untuk relasi tim
        $mhsBudi = Mahasiswa::whereHas('user', function($q) { $q->where('email', 'budi@students.amikom.ac.id'); })->first();
        $mhsAndi = Mahasiswa::whereHas('user', function($q) { $q->where('email', 'andi@students.amikom.ac.id'); })->first();
        $mhsCitra = Mahasiswa::whereHas('user', function($q) { $q->where('email', 'citra@students.amikom.ac.id'); })->first();
        $mhsDewi = Mahasiswa::whereHas('user', function($q) { $q->where('email', 'dewi@students.amikom.ac.id'); })->first();

        // Ambil ID mahasiswa yang baru dibuat
        $mhsFeri = Mahasiswa::where('nim', '22.11.4326')->first();
        $mhsGita = Mahasiswa::where('nim', '22.11.4327')->first();
        $mhsHaris = Mahasiswa::where('nim', '22.11.4328')->first();
        $mhsIndah = Mahasiswa::where('nim', '22.11.4329')->first();
        $mhsJoko = Mahasiswa::where('nim', '22.11.4330')->first();
        $mhsKartika = Mahasiswa::where('nim', '22.11.4331')->first();
        $mhsLukman = Mahasiswa::where('nim', '22.11.4332')->first();
        $mhsMega = Mahasiswa::where('nim', '22.11.4333')->first();

        // 5. Buat Proyek 1: Website E-Commerce UMKM (Status: in_progress, Category: UMKM)
        if ($catUmkm) {
            $proyek1 = Proyek::firstOrCreate(
                ['judul' => 'Website E-Commerce UMKM'],
                [
                    'deskripsi' => 'Pengembangan platform e-commerce untuk membantu digitalisasi UMKM lokal penjualan kerajinan tangan.',
                    'pembuat_id' => $dosenHaryanto->id,
                    'tanggal_mulai' => Carbon::now()->subMonths(1)->toDateString(),
                    'tanggal_selesai' => Carbon::now()->addMonths(1)->toDateString(),
                    'status' => 'in_progress',
                    'kategori_proyek_id' => $catUmkm->id,
                    'label_simulasi' => false,
                ]
            );

            // Kebutuhan Skill Proyek 1
            $skills1 = ['React', 'Laravel', 'Figma'];
            foreach ($skills1 as $sk) {
                $skill = Skill::where('nama', $sk)->first();
                if ($skill) {
                    KebutuhanSkill::firstOrCreate([
                        'proyek_id' => $proyek1->id,
                        'skill_id' => $skill->id,
                    ], ['jumlah_dibutuhkan' => 1]);
                }
            }

            // Approval PIC Proyek 1
            ApprovalPic::firstOrCreate(
                ['proyek_id' => $proyek1->id],
                [
                    'pic_id' => $picSarah->id,
                    'status' => 'approved',
                    'catatan_alasan' => 'Proposal lengkap, kebutuhan skill dan timeline realistis.',
                    'waktu_keputusan' => Carbon::now()->subMonths(1)->addDays(2),
                ]
            );

            // Anggota Tim Proyek 1 (aktif)
            if ($mhsBudi) {
                $at1_1 = AnggotaTim::firstOrCreate(
                    ['proyek_id' => $proyek1->id, 'mahasiswa_id' => $mhsBudi->id],
                    ['peran' => 'Backend Developer', 'status' => 'aktif', 'tanggal_join' => Carbon::now()->subMonths(1)]
                );
            }
            if ($mhsCitra) {
                $at1_2 = AnggotaTim::firstOrCreate(
                    ['proyek_id' => $proyek1->id, 'mahasiswa_id' => $mhsCitra->id],
                    ['peran' => 'Frontend Developer', 'status' => 'aktif', 'tanggal_join' => Carbon::now()->subMonths(1)]
                );
            }
            if ($mhsAndi) {
                $at1_3 = AnggotaTim::firstOrCreate(
                    ['proyek_id' => $proyek1->id, 'mahasiswa_id' => $mhsAndi->id],
                    ['peran' => 'UI/UX Designer', 'status' => 'aktif', 'tanggal_join' => Carbon::now()->subMonths(1)]
                );
            }

            // Checkpoints Proyek 1
            $cp1_1 = Checkpoint::firstOrCreate(
                ['proyek_id' => $proyek1->id, 'judul_milestone' => 'Desain UI/UX & Wireframing'],
                ['deadline' => Carbon::now()->subWeeks(2)->toDateString(), 'status' => 'completed']
            );

            $cp1_2 = Checkpoint::firstOrCreate(
                ['proyek_id' => $proyek1->id, 'judul_milestone' => 'Pembuatan REST API & Basis Data'],
                ['deadline' => Carbon::now()->toDateString(), 'status' => 'pending']
            );

            $cp1_3 = Checkpoint::firstOrCreate(
                ['proyek_id' => $proyek1->id, 'judul_milestone' => 'Integrasi Frontend & Pengujian'],
                ['deadline' => Carbon::now()->addWeeks(3)->toDateString(), 'status' => 'pending']
            );

            // Submisi Checkpoint Proyek 1
            if (isset($at1_3)) {
                SubmisiCheckpoint::firstOrCreate(
                    ['checkpoint_id' => $cp1_1->id, 'anggota_tim_id' => $at1_3->id],
                    [
                        'catatan_progres' => 'Figma prototype selesai dan disetujui klien. Link Figma: figma.com/proto/...',
                        'waktu_submit' => Carbon::now()->subWeeks(2)->subDays(1),
                    ]
                );
            }
            if (isset($at1_1)) {
                SubmisiCheckpoint::firstOrCreate(
                    ['checkpoint_id' => $cp1_2->id, 'anggota_tim_id' => $at1_1->id],
                    [
                        'catatan_progres' => 'REST API untuk produk, kategori, dan transaksi sudah siap di staging. Dokumentasi Swagger terlapir.',
                        'waktu_submit' => Carbon::now()->subHours(2),
                    ]
                );
            }
        }

        // 6. Buat Proyek 2: Mobile App Laundry (Status: open, Category: Mata Kuliah)
        if ($catMatkul) {
            $proyek2 = Proyek::firstOrCreate(
                ['judul' => 'Mobile App Laundry'],
                [
                    'deskripsi' => 'Aplikasi mobile berbasis React Native untuk mempermudah tracking status cucian pelanggan laundry.',
                    'pembuat_id' => $dosenAni->id,
                    'tanggal_mulai' => Carbon::now()->addWeeks(1)->toDateString(),
                    'tanggal_selesai' => Carbon::now()->addMonths(2)->toDateString(),
                    'status' => 'open',
                    'kategori_proyek_id' => $catMatkul->id,
                    'label_simulasi' => false,
                ]
            );

            // Kebutuhan Skill Proyek 2
            $skills2 = ['React', 'Node.js', 'UI/UX Design'];
            foreach ($skills2 as $sk) {
                $skill = Skill::where('nama', $sk)->first();
                if ($skill) {
                    KebutuhanSkill::firstOrCreate([
                        'proyek_id' => $proyek2->id,
                        'skill_id' => $skill->id,
                    ], ['jumlah_dibutuhkan' => 1]);
                }
            }

            // Pelamar / pendaftar Proyek 2 (status: mengajukan)
            if ($mhsHaris) {
                AnggotaTim::firstOrCreate(
                    ['proyek_id' => $proyek2->id, 'mahasiswa_id' => $mhsHaris->id],
                    ['peran' => 'Frontend/Mobile Developer', 'status' => 'mengajukan', 'tanggal_join' => null]
                );
            }
            if ($mhsGita) {
                AnggotaTim::firstOrCreate(
                    ['proyek_id' => $proyek2->id, 'mahasiswa_id' => $mhsGita->id],
                    ['peran' => 'UI/UX Designer', 'status' => 'mengajukan', 'tanggal_join' => null]
                );
            }

            // Checkpoints Proyek 2
            Checkpoint::firstOrCreate(
                ['proyek_id' => $proyek2->id, 'judul_milestone' => 'Analisis Kebutuhan & Desain Database'],
                ['deadline' => Carbon::now()->addWeeks(2)->toDateString(), 'status' => 'pending']
            );
            Checkpoint::firstOrCreate(
                ['proyek_id' => $proyek2->id, 'judul_milestone' => 'Pengembangan UI & API'],
                ['deadline' => Carbon::now()->addWeeks(5)->toDateString(), 'status' => 'pending']
            );
        }

        // 7. Buat Proyek 3: Landing Page UKM Seni (Status: selesai, Category: Internal UKM) - VALID PEER EVAL
        if ($catInternal) {
            $proyek3 = Proyek::firstOrCreate(
                ['judul' => 'Landing Page UKM Seni'],
                [
                    'deskripsi' => 'Landing page interaktif untuk menampilkan karya-karya mahasiswa UKM Seni Amikom.',
                    'pembuat_id' => $picSarah->id,
                    'tanggal_mulai' => Carbon::now()->subWeeks(6)->toDateString(),
                    'tanggal_selesai' => Carbon::now()->subWeeks(1)->toDateString(),
                    'status' => 'selesai',
                    'kategori_proyek_id' => $catInternal->id,
                    'label_simulasi' => false,
                ]
            );

            // Kebutuhan Skill Proyek 3
            $skills3 = ['HTML', 'CSS', 'UI/UX Design'];
            foreach ($skills3 as $sk) {
                $skill = Skill::where('nama', $sk)->first();
                if ($skill) {
                    KebutuhanSkill::firstOrCreate([
                        'proyek_id' => $proyek3->id,
                        'skill_id' => $skill->id,
                    ], ['jumlah_dibutuhkan' => 1]);
                }
            }

            // Anggota Tim Proyek 3 (aktif)
            $at3_1 = AnggotaTim::firstOrCreate(
                ['proyek_id' => $proyek3->id, 'mahasiswa_id' => $mhsDewi->id],
                ['peran' => 'Fullstack Developer', 'status' => 'aktif', 'tanggal_join' => Carbon::now()->subWeeks(6)]
            );
            $at3_2 = AnggotaTim::firstOrCreate(
                ['proyek_id' => $proyek3->id, 'mahasiswa_id' => $mhsLukman->id],
                ['peran' => 'Frontend Developer', 'status' => 'aktif', 'tanggal_join' => Carbon::now()->subWeeks(6)]
            );
            $at3_3 = AnggotaTim::firstOrCreate(
                ['proyek_id' => $proyek3->id, 'mahasiswa_id' => $mhsKartika->id],
                ['peran' => 'UI/UX Designer', 'status' => 'aktif', 'tanggal_join' => Carbon::now()->subWeeks(6)]
            );

            // Checkpoints Proyek 3
            $cp3_1 = Checkpoint::firstOrCreate(
                ['proyek_id' => $proyek3->id, 'judul_milestone' => 'Desain Landing Page'],
                ['deadline' => Carbon::now()->subWeeks(4)->toDateString(), 'status' => 'completed']
            );

            $cp3_2 = Checkpoint::firstOrCreate(
                ['proyek_id' => $proyek3->id, 'judul_milestone' => 'Implementasi HTML/CSS & Integrasi'],
                ['deadline' => Carbon::now()->subWeeks(2)->toDateString(), 'status' => 'completed']
            );

            // Submisi Checkpoint Proyek 3
            SubmisiCheckpoint::firstOrCreate(
                ['checkpoint_id' => $cp3_1->id, 'anggota_tim_id' => $at3_3->id],
                [
                    'catatan_progres' => 'Desain Figma final disetujui oleh pengurus UKM Seni.',
                    'waktu_submit' => Carbon::now()->subWeeks(4)->subDays(2),
                ]
            );

            SubmisiCheckpoint::firstOrCreate(
                ['checkpoint_id' => $cp3_2->id, 'anggota_tim_id' => $at3_2->id],
                [
                    'catatan_progres' => 'Landing page sudah online di github pages. Code bersih, responsive, and fast loading.',
                    'waktu_submit' => Carbon::now()->subWeeks(2)->subDays(1),
                ]
            );

            // Peer Evaluations Proyek 3 (Dewi, Lukman, Kartika)
            // Dewi -> Lukman (5), Kartika (5)
            PeerEvaluasi::firstOrCreate(
                ['proyek_id' => $proyek3->id, 'pemberi_id' => $at3_1->id, 'penerima_id' => $at3_2->id],
                ['skor_kontribusi' => 5, 'komentar' => 'Kerja keras, integrasi frontend mulus.', 'waktu_evaluasi' => Carbon::now()->subWeeks(1)]
            );
            PeerEvaluasi::firstOrCreate(
                ['proyek_id' => $proyek3->id, 'pemberi_id' => $at3_1->id, 'penerima_id' => $at3_3->id],
                ['skor_kontribusi' => 5, 'komentar' => 'Desain mockup sangat indah dan responsif terhadap feedback.', 'waktu_evaluasi' => Carbon::now()->subWeeks(1)]
            );

            // Lukman -> Dewi (4), Kartika (5)
            PeerEvaluasi::firstOrCreate(
                ['proyek_id' => $proyek3->id, 'pemberi_id' => $at3_2->id, 'penerima_id' => $at3_1->id],
                ['skor_kontribusi' => 4, 'komentar' => 'Membantu di setup awal dan backend mock, koordinasi bagus.', 'waktu_evaluasi' => Carbon::now()->subWeeks(1)]
            );
            PeerEvaluasi::firstOrCreate(
                ['proyek_id' => $proyek3->id, 'pemberi_id' => $at3_2->id, 'penerima_id' => $at3_3->id],
                ['skor_kontribusi' => 5, 'komentar' => 'Desain figma sangat lengkap dan mudah di-slice ke kode.', 'waktu_evaluasi' => Carbon::now()->subWeeks(1)]
            );

            // Kartika -> Dewi (4), Lukman (4)
            PeerEvaluasi::firstOrCreate(
                ['proyek_id' => $proyek3->id, 'pemberi_id' => $at3_3->id, 'penerima_id' => $at3_1->id],
                ['skor_kontribusi' => 4, 'komentar' => 'Sangat responsif memimpin tim dan membantu deployment.', 'waktu_evaluasi' => Carbon::now()->subWeeks(1)]
            );
            PeerEvaluasi::firstOrCreate(
                ['proyek_id' => $proyek3->id, 'pemberi_id' => $at3_3->id, 'penerima_id' => $at3_2->id],
                ['skor_kontribusi' => 4, 'komentar' => 'Codingnya rapi, meniru mockup Figma dengan sangat presisi.', 'waktu_evaluasi' => Carbon::now()->subWeeks(1)]
            );

            // Rekam Kontribusi Proyek 3 (Dewi: 4.0, Lukman: 4.5, Kartika: 5.0) - Semua validasi 'final'
            RekamKontribusi::updateOrCreate(
                ['anggota_tim_id' => $at3_1->id],
                [
                    'skor_rata_rata' => 4.0,
                    'persentase_ketepatan_waktu' => 100.0,
                    'ringkasan_kontribusi' => 'Evaluasi kontribusi tim untuk peran Fullstack Developer.',
                    'status_validasi' => 'final',
                    'flag_alasan' => null,
                    'dibuat_pada' => Carbon::now()->subWeeks(1),
                    'hash_data' => hash('sha256', $at3_1->id . '|4.0|final|' . Carbon::now()->subWeeks(1)->toDateTimeString()),
                ]
            );

            RekamKontribusi::updateOrCreate(
                ['anggota_tim_id' => $at3_2->id],
                [
                    'skor_rata_rata' => 4.5,
                    'persentase_ketepatan_waktu' => 100.0,
                    'ringkasan_kontribusi' => 'Evaluasi kontribusi tim untuk peran Frontend Developer.',
                    'status_validasi' => 'final',
                    'flag_alasan' => null,
                    'dibuat_pada' => Carbon::now()->subWeeks(1),
                    'hash_data' => hash('sha256', $at3_2->id . '|4.5|final|' . Carbon::now()->subWeeks(1)->toDateTimeString()),
                ]
            );

            RekamKontribusi::updateOrCreate(
                ['anggota_tim_id' => $at3_3->id],
                [
                    'skor_rata_rata' => 5.0,
                    'persentase_ketepatan_waktu' => 100.0,
                    'ringkasan_kontribusi' => 'Evaluasi kontribusi tim untuk peran UI/UX Designer.',
                    'status_validasi' => 'final',
                    'flag_alasan' => null,
                    'dibuat_pada' => Carbon::now()->subWeeks(1),
                    'hash_data' => hash('sha256', $at3_3->id . '|5.0|final|' . Carbon::now()->subWeeks(1)->toDateTimeString()),
                ]
            );
        }

        // 8. Buat Proyek 4: IoT Smart Agriculture (Status: open, Category: Lomba)
        if ($catLomba) {
            $proyek4 = Proyek::firstOrCreate(
                ['judul' => 'IoT Smart Agriculture'],
                [
                    'deskripsi' => 'Sistem monitoring kelembaban tanah dan penyiraman otomatis berbasis IoT LoRa.',
                    'pembuat_id' => $dosenHaryanto->id,
                    'tanggal_mulai' => Carbon::now()->addWeeks(2)->toDateString(),
                    'tanggal_selesai' => Carbon::now()->addMonths(3)->toDateString(),
                    'status' => 'open',
                    'kategori_proyek_id' => $catLomba->id,
                    'label_simulasi' => false,
                ]
            );

            // Kebutuhan Skill
            $skills4 = ['Python', 'Git', 'Project Management'];
            foreach ($skills4 as $sk) {
                $skill = Skill::where('nama', $sk)->first();
                if ($skill) {
                    KebutuhanSkill::firstOrCreate([
                        'proyek_id' => $proyek4->id,
                        'skill_id' => $skill->id,
                    ], ['jumlah_dibutuhkan' => 1]);
                }
            }

            // Pelamar
            if ($mhsJoko) {
                AnggotaTim::firstOrCreate(
                    ['proyek_id' => $proyek4->id, 'mahasiswa_id' => $mhsJoko->id],
                    ['peran' => 'IoT Developer', 'status' => 'mengajukan', 'tanggal_join' => null]
                );
            }
        }

        // 9. Buat Proyek 5: Portal Lowongan Kerja (Status: waiting_approval, Category: UMKM)
        if ($catUmkm) {
            $proyek5 = Proyek::firstOrCreate(
                ['judul' => 'Portal Lowongan Kerja'],
                [
                    'deskripsi' => 'Aplikasi web portal lowongan kerja khusus alumni untuk mempermudah pencarian karir.',
                    'pembuat_id' => $dosenAni->id,
                    'tanggal_mulai' => Carbon::now()->addWeeks(3)->toDateString(),
                    'tanggal_selesai' => Carbon::now()->addMonths(2)->toDateString(),
                    'status' => 'waiting_approval',
                    'kategori_proyek_id' => $catUmkm->id,
                    'label_simulasi' => false,
                ]
            );

            // Kebutuhan Skill
            $skills5 = ['Laravel', 'React', 'UI/UX Design'];
            foreach ($skills5 as $sk) {
                $skill = Skill::where('nama', $sk)->first();
                if ($skill) {
                    KebutuhanSkill::firstOrCreate([
                        'proyek_id' => $proyek5->id,
                        'skill_id' => $skill->id,
                    ], ['jumlah_dibutuhkan' => 1]);
                }
            }

            // Approval PIC (pending)
            ApprovalPic::firstOrCreate(
                ['proyek_id' => $proyek5->id],
                [
                    'pic_id' => $picBudi->id,
                    'status' => 'pending',
                    'catatan_alasan' => null,
                    'waktu_keputusan' => null,
                ]
            );
        }

        // 10. Buat Proyek 6: Sistem Antrean RS (Status: rejected, Category: UMKM)
        if ($catUmkm) {
            $proyek6 = Proyek::firstOrCreate(
                ['judul' => 'Sistem Antrean RS'],
                [
                    'deskripsi' => 'Aplikasi antrean online rumah sakit terintegrasi BPJS.',
                    'pembuat_id' => $dosenHaryanto->id,
                    'tanggal_mulai' => Carbon::now()->toDateString(),
                    'tanggal_selesai' => Carbon::now()->addMonths(1)->toDateString(),
                    'status' => 'rejected',
                    'kategori_proyek_id' => $catUmkm->id,
                    'label_simulasi' => false,
                ]
            );

            // Kebutuhan Skill
            $skills6 = ['PHP', 'MySQL'];
            foreach ($skills6 as $sk) {
                $skill = Skill::where('nama', $sk)->first();
                if ($skill) {
                    KebutuhanSkill::firstOrCreate([
                        'proyek_id' => $proyek6->id,
                        'skill_id' => $skill->id,
                    ], ['jumlah_dibutuhkan' => 1]);
                }
            }

            // Approval PIC (rejected)
            ApprovalPic::firstOrCreate(
                ['proyek_id' => $proyek6->id],
                [
                    'pic_id' => $picSarah->id,
                    'status' => 'rejected',
                    'catatan_alasan' => 'Deskripsi kurang detail dan tidak realistis dalam jangka waktu 1 bulan.',
                    'waktu_keputusan' => Carbon::now()->subDays(3),
                ]
            );
        }

        // 11. Buat Proyek 7: Sistem Monitoring Inventaris (Status: selesai, Category: Mata Kuliah) - FLAGGED KONGKALIKONG
        if ($catMatkul) {
            $proyek7 = Proyek::firstOrCreate(
                ['judul' => 'Sistem Monitoring Inventaris'],
                [
                    'deskripsi' => 'Sistem monitoring stok inventaris laboratorium berbasis web.',
                    'pembuat_id' => $dosenHaryanto->id,
                    'tanggal_mulai' => Carbon::now()->subWeeks(4)->toDateString(),
                    'tanggal_selesai' => Carbon::now()->subWeeks(1)->toDateString(),
                    'status' => 'selesai',
                    'kategori_proyek_id' => $catMatkul->id,
                    'label_simulasi' => false,
                ]
            );

            // Kebutuhan Skill
            $skills7 = ['PHP', 'HTML', 'Figma'];
            foreach ($skills7 as $sk) {
                $skill = Skill::where('nama', $sk)->first();
                if ($skill) {
                    KebutuhanSkill::firstOrCreate([
                        'proyek_id' => $proyek7->id,
                        'skill_id' => $skill->id,
                    ], ['jumlah_dibutuhkan' => 1]);
                }
            }

            // Anggota Tim Proyek 7 (aktif)
            $at7_1 = AnggotaTim::firstOrCreate(
                ['proyek_id' => $proyek7->id, 'mahasiswa_id' => $mhsFeri->id],
                ['peran' => 'Backend Developer', 'status' => 'aktif', 'tanggal_join' => Carbon::now()->subWeeks(4)]
            );
            $at7_2 = AnggotaTim::firstOrCreate(
                ['proyek_id' => $proyek7->id, 'mahasiswa_id' => $mhsHaris->id],
                ['peran' => 'Frontend Developer', 'status' => 'aktif', 'tanggal_join' => Carbon::now()->subWeeks(4)]
            );
            $at7_3 = AnggotaTim::firstOrCreate(
                ['proyek_id' => $proyek7->id, 'mahasiswa_id' => $mhsGita->id],
                ['peran' => 'UI/UX Designer', 'status' => 'aktif', 'tanggal_join' => Carbon::now()->subWeeks(4)]
            );

            // Checkpoints Proyek 7
            $cp7_1 = Checkpoint::firstOrCreate(
                ['proyek_id' => $proyek7->id, 'judul_milestone' => 'Desain database'],
                ['deadline' => Carbon::now()->subWeeks(3)->toDateString(), 'status' => 'completed']
            );

            $cp7_2 = Checkpoint::firstOrCreate(
                ['proyek_id' => $proyek7->id, 'judul_milestone' => 'Integrasi API'],
                ['deadline' => Carbon::now()->subWeeks(1)->toDateString(), 'status' => 'completed']
            );

            // Submisi Checkpoint Proyek 7
            SubmisiCheckpoint::firstOrCreate(
                ['checkpoint_id' => $cp7_1->id, 'anggota_tim_id' => $at7_1->id],
                [
                    'catatan_progres' => 'Database design complete.',
                    'waktu_submit' => Carbon::now()->subWeeks(3)->subDays(1),
                ]
            );

            SubmisiCheckpoint::firstOrCreate(
                ['checkpoint_id' => $cp7_2->id, 'anggota_tim_id' => $at7_2->id],
                [
                    'catatan_progres' => 'API integrated and tested.',
                    'waktu_submit' => Carbon::now()->subWeeks(1)->subDays(1),
                ]
            );

            // Peer Evaluations Proyek 7 (Feri, Haris, Gita) - Kongkalikong (Semua 5)
            // Feri -> Haris (5), Gita (5)
            PeerEvaluasi::firstOrCreate(
                ['proyek_id' => $proyek7->id, 'pemberi_id' => $at7_1->id, 'penerima_id' => $at7_2->id],
                ['skor_kontribusi' => 5, 'komentar' => 'Great work', 'waktu_evaluasi' => Carbon::now()->subWeeks(1)]
            );
            PeerEvaluasi::firstOrCreate(
                ['proyek_id' => $proyek7->id, 'pemberi_id' => $at7_1->id, 'penerima_id' => $at7_3->id],
                ['skor_kontribusi' => 5, 'komentar' => 'Great work', 'waktu_evaluasi' => Carbon::now()->subWeeks(1)]
            );

            // Haris -> Feri (5), Gita (5)
            PeerEvaluasi::firstOrCreate(
                ['proyek_id' => $proyek7->id, 'pemberi_id' => $at7_2->id, 'penerima_id' => $at7_1->id],
                ['skor_kontribusi' => 5, 'komentar' => 'Great work', 'waktu_evaluasi' => Carbon::now()->subWeeks(1)]
            );
            PeerEvaluasi::firstOrCreate(
                ['proyek_id' => $proyek7->id, 'pemberi_id' => $at7_2->id, 'penerima_id' => $at7_3->id],
                ['skor_kontribusi' => 5, 'komentar' => 'Great work', 'waktu_evaluasi' => Carbon::now()->subWeeks(1)]
            );

            // Gita -> Feri (5), Haris (5)
            PeerEvaluasi::firstOrCreate(
                ['proyek_id' => $proyek7->id, 'pemberi_id' => $at7_3->id, 'penerima_id' => $at7_1->id],
                ['skor_kontribusi' => 5, 'komentar' => 'Great work', 'waktu_evaluasi' => Carbon::now()->subWeeks(1)]
            );
            PeerEvaluasi::firstOrCreate(
                ['proyek_id' => $proyek7->id, 'pemberi_id' => $at7_3->id, 'penerima_id' => $at7_2->id],
                ['skor_kontribusi' => 5, 'komentar' => 'Great work', 'waktu_evaluasi' => Carbon::now()->subWeeks(1)]
            );

            // Rekam Kontribusi Proyek 7 (Flagged Kongkalikong, status: menunggu_acc_dosen)
            $anggotaProyek7 = [$at7_1, $at7_2, $at7_3];
            foreach ($anggotaProyek7 as $member) {
                RekamKontribusi::updateOrCreate(
                    ['anggota_tim_id' => $member->id],
                    [
                        'skor_rata_rata' => 5.0,
                        'persentase_ketepatan_waktu' => 100.0,
                        'ringkasan_kontribusi' => "Evaluasi kontribusi tim untuk peran {$member->peran}. [FLAGGED: Evaluasi terdeteksi memiliki variasi sangat rendah (kongkalikong), memerlukan peninjauan dosen/PIC]",
                        'status_validasi' => 'menunggu_acc_dosen',
                        'flag_alasan' => 'kongkalikong',
                        'dibuat_pada' => Carbon::now()->subWeeks(1),
                        'hash_data' => hash('sha256', $member->id . '|5.0|menunggu_acc_dosen|' . Carbon::now()->subWeeks(1)->toDateTimeString()),
                    ]
                );
            }
        }

        // 12. Buat Proyek 8: Aplikasi E-Learning (Status: selesai, Category: Mata Kuliah) - FLAGGED OUTLIER
        if ($catMatkul) {
            $proyek8 = Proyek::firstOrCreate(
                ['judul' => 'Aplikasi E-Learning'],
                [
                    'deskripsi' => 'Pengembangan portal e-learning interaktif untuk sekolah menengah.',
                    'pembuat_id' => $dosenAni->id,
                    'tanggal_mulai' => Carbon::now()->subWeeks(4)->toDateString(),
                    'tanggal_selesai' => Carbon::now()->subWeeks(1)->toDateString(),
                    'status' => 'selesai',
                    'kategori_proyek_id' => $catMatkul->id,
                    'label_simulasi' => false,
                ]
            );

            // Kebutuhan Skill
            $skills8 = ['Laravel', 'Vue.js', 'UI/UX Design'];
            foreach ($skills8 as $sk) {
                $skill = Skill::where('nama', $sk)->first();
                if ($skill) {
                    KebutuhanSkill::firstOrCreate([
                        'proyek_id' => $proyek8->id,
                        'skill_id' => $skill->id,
                    ], ['jumlah_dibutuhkan' => 1]);
                }
            }

            // Anggota Tim Proyek 8 (aktif)
            $at8_1 = AnggotaTim::firstOrCreate(
                ['proyek_id' => $proyek8->id, 'mahasiswa_id' => $mhsIndah->id],
                ['peran' => 'Fullstack Developer', 'status' => 'aktif', 'tanggal_join' => Carbon::now()->subWeeks(4)]
            );
            $at8_2 = AnggotaTim::firstOrCreate(
                ['proyek_id' => $proyek8->id, 'mahasiswa_id' => $mhsJoko->id],
                ['peran' => 'Backend Developer', 'status' => 'aktif', 'tanggal_join' => Carbon::now()->subWeeks(4)]
            );
            $at8_3 = AnggotaTim::firstOrCreate(
                ['proyek_id' => $proyek8->id, 'mahasiswa_id' => $mhsMega->id],
                ['peran' => 'UI/UX Designer', 'status' => 'aktif', 'tanggal_join' => Carbon::now()->subWeeks(4)]
            );

            // Checkpoints Proyek 8
            $cp8_1 = Checkpoint::firstOrCreate(
                ['proyek_id' => $proyek8->id, 'judul_milestone' => 'Desain & Setup Sistem'],
                ['deadline' => Carbon::now()->subWeeks(2)->toDateString(), 'status' => 'completed']
            );

            // Submisi Checkpoint Proyek 8
            SubmisiCheckpoint::firstOrCreate(
                ['checkpoint_id' => $cp8_1->id, 'anggota_tim_id' => $at8_1->id],
                [
                    'catatan_progres' => 'Sistem e-learning dideploy di server staging.',
                    'waktu_submit' => Carbon::now()->subWeeks(2)->subDays(1),
                ]
            );

            // Peer Evaluations Proyek 8 (Indah, Joko, Mega) - Outlier
            // Indah -> Joko (5), Mega (5)
            PeerEvaluasi::firstOrCreate(
                ['proyek_id' => $proyek8->id, 'pemberi_id' => $at8_1->id, 'penerima_id' => $at8_2->id],
                ['skor_kontribusi' => 5, 'komentar' => 'Great Backend work.', 'waktu_evaluasi' => Carbon::now()->subWeeks(1)]
            );
            PeerEvaluasi::firstOrCreate(
                ['proyek_id' => $proyek8->id, 'pemberi_id' => $at8_1->id, 'penerima_id' => $at8_3->id],
                ['skor_kontribusi' => 5, 'komentar' => 'Great Design work.', 'waktu_evaluasi' => Carbon::now()->subWeeks(1)]
            );

            // Mega -> Joko (5), Indah (5)
            PeerEvaluasi::firstOrCreate(
                ['proyek_id' => $proyek8->id, 'pemberi_id' => $at8_3->id, 'penerima_id' => $at8_2->id],
                ['skor_kontribusi' => 5, 'komentar' => 'Very helpful APIs.', 'waktu_evaluasi' => Carbon::now()->subWeeks(1)]
            );
            PeerEvaluasi::firstOrCreate(
                ['proyek_id' => $proyek8->id, 'pemberi_id' => $at8_3->id, 'penerima_id' => $at8_1->id],
                ['skor_kontribusi' => 5, 'komentar' => 'Superb fullstack setup.', 'waktu_evaluasi' => Carbon::now()->subWeeks(1)]
            );

            // Joko -> Indah (1), Mega (5)
            PeerEvaluasi::firstOrCreate(
                ['proyek_id' => $proyek8->id, 'pemberi_id' => $at8_2->id, 'penerima_id' => $at8_1->id],
                ['skor_kontribusi' => 1, 'komentar' => 'Conflict in code merging, not helping much.', 'waktu_evaluasi' => Carbon::now()->subWeeks(1)]
            );
            PeerEvaluasi::firstOrCreate(
                ['proyek_id' => $proyek8->id, 'pemberi_id' => $at8_2->id, 'penerima_id' => $at8_3->id],
                ['skor_kontribusi' => 5, 'komentar' => 'Mockup looks great.', 'waktu_evaluasi' => Carbon::now()->subWeeks(1)]
            );

            // Rekam Kontribusi Proyek 8 (Indah receives 5 and 1, triggers outlier flag)
            // Indah (AT_Indah): mean = 3.0, stdDev = 2.0. Status: menunggu_acc_dosen, flag_alasan: outlier
            RekamKontribusi::updateOrCreate(
                ['anggota_tim_id' => $at8_1->id],
                [
                    'skor_rata_rata' => 3.0,
                    'persentase_ketepatan_waktu' => 100.0,
                    'ringkasan_kontribusi' => 'Evaluasi kontribusi tim untuk peran Fullstack Developer. [FLAGGED: Evaluasi terdeteksi memiliki variasi sangat tinggi (outlier), memerlukan peninjauan dosen/PIC]',
                    'status_validasi' => 'menunggu_acc_dosen',
                    'flag_alasan' => 'outlier',
                    'dibuat_pada' => Carbon::now()->subWeeks(1),
                    'hash_data' => hash('sha256', $at8_1->id . '|3.0|menunggu_acc_dosen|' . Carbon::now()->subWeeks(1)->toDateTimeString()),
                ]
            );

            // Joko (AT_Joko): mean = 5.0, stdDev = 0.0. Status: menunggu_acc_dosen, flag_alasan: kongkalikong
            RekamKontribusi::updateOrCreate(
                ['anggota_tim_id' => $at8_2->id],
                [
                    'skor_rata_rata' => 5.0,
                    'persentase_ketepatan_waktu' => 100.0,
                    'ringkasan_kontribusi' => 'Evaluasi kontribusi tim untuk peran Backend Developer. [FLAGGED: Evaluasi terdeteksi memiliki variasi sangat rendah (kongkalikong), memerlukan peninjauan dosen/PIC]',
                    'status_validasi' => 'menunggu_acc_dosen',
                    'flag_alasan' => 'kongkalikong',
                    'dibuat_pada' => Carbon::now()->subWeeks(1),
                    'hash_data' => hash('sha256', $at8_2->id . '|5.0|menunggu_acc_dosen|' . Carbon::now()->subWeeks(1)->toDateTimeString()),
                ]
            );

            // Mega (AT_Mega): mean = 5.0, stdDev = 0.0. Status: menunggu_acc_dosen, flag_alasan: kongkalikong
            RekamKontribusi::updateOrCreate(
                ['anggota_tim_id' => $at8_3->id],
                [
                    'skor_rata_rata' => 5.0,
                    'persentase_ketepatan_waktu' => 100.0,
                    'ringkasan_kontribusi' => 'Evaluasi kontribusi tim untuk peran UI/UX Designer. [FLAGGED: Evaluasi terdeteksi memiliki variasi sangat rendah (kongkalikong), memerlukan peninjauan dosen/PIC]',
                    'status_validasi' => 'menunggu_acc_dosen',
                    'flag_alasan' => 'kongkalikong',
                    'dibuat_pada' => Carbon::now()->subWeeks(1),
                    'hash_data' => hash('sha256', $at8_3->id . '|5.0|menunggu_acc_dosen|' . Carbon::now()->subWeeks(1)->toDateTimeString()),
                ]
            );
        }
    }
}
