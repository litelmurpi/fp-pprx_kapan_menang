<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Mahasiswa;
use App\Models\Skill;
use App\Models\KategoriProyek;
use App\Models\Proyek;
use App\Models\KebutuhanSkill;
use App\Models\AnggotaTim;
use App\Models\PeerEvaluasi;
use App\Models\RekamKontribusi;
use Illuminate\Foundation\Testing\RefreshDatabase;

class MatchmakingAndPeerEvalTest extends TestCase
{
    use RefreshDatabase;

    private $dosen;
    private $project;
    private $laravelSkill;
    private $reactSkill;
    private $figmaSkill;

    protected function setUp(): void
    {
        parent::setUp();

        // 1. Create Dosen/PIC
        $this->dosen = User::create([
            'name' => 'Dr. Haryanto',
            'email' => 'haryanto@amikom.ac.id',
            'password' => bcrypt('password'),
            'role' => 'dosen',
        ]);

        // 2. Create Skills
        $this->laravelSkill = Skill::create(['nama' => 'Laravel', 'kategori' => 'Backend']);
        $this->reactSkill = Skill::create(['nama' => 'React', 'kategori' => 'Frontend']);
        $this->figmaSkill = Skill::create(['nama' => 'Figma', 'kategori' => 'Design']);

        // 3. Create Project Category
        $kategori = KategoriProyek::create(['nama' => 'Internal UKM', 'memerlukan_approval' => false]);

        // 4. Create Project requiring Laravel and React
        $this->project = Proyek::create([
            'judul' => 'Website ACC',
            'deskripsi' => 'ACC Website project',
            'pembuat_id' => $this->dosen->id,
            'tanggal_mulai' => now()->toDateString(),
            'tanggal_selesai' => now()->addMonth()->toDateString(),
            'status' => 'open',
            'kategori_proyek_id' => $kategori->id,
            'label_simulasi' => false,
        ]);

        // Require Laravel and React
        KebutuhanSkill::create([
            'proyek_id' => $this->project->id,
            'skill_id' => $this->laravelSkill->id,
            'jumlah_dibutuhkan' => 1
        ]);
        KebutuhanSkill::create([
            'proyek_id' => $this->project->id,
            'skill_id' => $this->reactSkill->id,
            'jumlah_dibutuhkan' => 1
        ]);
    }

    public function test_matchmaking_rankings()
    {
        // Create 2 students with different skills
        // Student 1 (Budi): has Laravel (5), React (4) -> high match
        $u1 = User::create(['name' => 'Budi', 'email' => 'budi@test.com', 'password' => bcrypt('pass'), 'role' => 'mahasiswa']);
        $m1 = Mahasiswa::create(['user_id' => $u1->id, 'nim' => '22.11.0001', 'prodi' => 'IF', 'minat_bidang' => 'Backend', 'jam_luang_per_minggu' => 10]);
        $m1->profilSkills()->create(['skill_id' => $this->laravelSkill->id, 'level_keahlian' => 5]);
        $m1->profilSkills()->create(['skill_id' => $this->reactSkill->id, 'level_keahlian' => 4]);

        // Student 2 (Andi): has Figma (5) -> zero skill match
        $u2 = User::create(['name' => 'Andi', 'email' => 'andi@test.com', 'password' => bcrypt('pass'), 'role' => 'mahasiswa']);
        $m2 = Mahasiswa::create(['user_id' => $u2->id, 'nim' => '22.11.0002', 'prodi' => 'SI', 'minat_bidang' => 'Design', 'jam_luang_per_minggu' => 12]);
        $m2->profilSkills()->create(['skill_id' => $this->figmaSkill->id, 'level_keahlian' => 5]);

        // Act: Get matchmaking candidates
        $response = $this->actingAs($this->dosen)
            ->getJson("/api/proyek/{$this->project->id}/candidates");

        $response->assertStatus(200);
        $candidates = $response->json();

        $this->assertCount(2, $candidates);
        
        // Assert Budi is first due to skill match
        $this->assertEquals('Budi', $candidates[0]['name']);
        // Budi score:
        // skill_score = ((5/5) + (4/5)) / 2 = 0.90
        // minat_bonus = 0 (no intersection between 'Backend' and 'Internal UKM')
        // onboarding_bonus = 1 (0 projects)
        // total_score = (0.90 * 0.8) + (0 * 0.1) + (1 * 0.1) = 0.72 + 0.10 = 0.82
        $this->assertEquals(0.82, $candidates[0]['skor_akhir']);

        // Andi score:
        // skill_score = 0
        // minat_bonus = 0
        // onboarding_bonus = 1
        // total_score = 0 + 0 + 0.10 = 0.10
        $this->assertEquals(0.10, $candidates[1]['skor_akhir']);
        $this->assertEquals('Andi', $candidates[1]['name']);
    }

    public function test_variance_check_flagging()
    {
        // Create 3 students to build a 3-member team
        $u1 = User::create(['name' => 'Budi', 'email' => 'budi@test.com', 'password' => bcrypt('pass'), 'role' => 'mahasiswa']);
        $m1 = Mahasiswa::create(['user_id' => $u1->id, 'nim' => '22.11.0001', 'prodi' => 'IF', 'jam_luang_per_minggu' => 10]);
        
        $u2 = User::create(['name' => 'Andi', 'email' => 'andi@test.com', 'password' => bcrypt('pass'), 'role' => 'mahasiswa']);
        $m2 = Mahasiswa::create(['user_id' => $u2->id, 'nim' => '22.11.0002', 'prodi' => 'SI', 'jam_luang_per_minggu' => 12]);

        $u3 = User::create(['name' => 'Citra', 'email' => 'citra@test.com', 'password' => bcrypt('pass'), 'role' => 'mahasiswa']);
        $m3 = Mahasiswa::create(['user_id' => $u3->id, 'nim' => '22.11.0003', 'prodi' => 'IF', 'jam_luang_per_minggu' => 8]);

        // Join them all to the project
        $at1 = AnggotaTim::create(['proyek_id' => $this->project->id, 'mahasiswa_id' => $m1->id, 'peran' => 'Backend Dev', 'status' => 'aktif', 'tanggal_join' => now()]);
        $at2 = AnggotaTim::create(['proyek_id' => $this->project->id, 'mahasiswa_id' => $m2->id, 'peran' => 'Designer', 'status' => 'aktif', 'tanggal_join' => now()]);
        $at3 = AnggotaTim::create(['proyek_id' => $this->project->id, 'mahasiswa_id' => $m3->id, 'peran' => 'Frontend Dev', 'status' => 'aktif', 'tanggal_join' => now()]);

        // Set project status to selesai so evaluations can be submitted
        $this->project->update(['status' => 'selesai']);

        // Case: Collusion (everyone gives everyone else a flat 5 out of 5)
        // Budi (at1) evaluates Andi (at2) and Citra (at3)
        $this->actingAs($u1)->postJson("/api/proyek/{$this->project->id}/evaluasi", [
            'penerima_anggota_id' => $at2->id,
            'skor_kontribusi' => 5,
            'komentar' => 'Great work'
        ])->assertStatus(200);

        $this->actingAs($u1)->postJson("/api/proyek/{$this->project->id}/evaluasi", [
            'penerima_anggota_id' => $at3->id,
            'skor_kontribusi' => 5,
            'komentar' => 'Great work'
        ])->assertStatus(200);

        // Andi (at2) evaluates Budi (at1) and Citra (at3)
        $this->actingAs($u2)->postJson("/api/proyek/{$this->project->id}/evaluasi", [
            'penerima_anggota_id' => $at1->id,
            'skor_kontribusi' => 5,
            'komentar' => 'Great work'
        ])->assertStatus(200);

        $this->actingAs($u2)->postJson("/api/proyek/{$this->project->id}/evaluasi", [
            'penerima_anggota_id' => $at3->id,
            'skor_kontribusi' => 5,
            'komentar' => 'Great work'
        ])->assertStatus(200);

        // Citra (at3) evaluates Budi (at1) and Andi (at2)
        $this->actingAs($u3)->postJson("/api/proyek/{$this->project->id}/evaluasi", [
            'penerima_anggota_id' => $at1->id,
            'skor_kontribusi' => 5,
            'komentar' => 'Great work'
        ])->assertStatus(200);

        // This final evaluation submission will trigger calculations
        $this->actingAs($u3)->postJson("/api/proyek/{$this->project->id}/evaluasi", [
            'penerima_anggota_id' => $at2->id,
            'skor_kontribusi' => 5,
            'komentar' => 'Great work'
        ])->assertStatus(200);

        // Check Rekam Kontribusi generated for Budi (at1)
        $rekam = RekamKontribusi::where('anggota_tim_id', $at1->id)->first();
        $this->assertNotNull($rekam);
        $this->assertEquals(5.00, $rekam->skor_rata_rata);
        // Should be flagged due to zero variance (everyone gave 5.0)
        $this->assertEquals('menunggu_acc_dosen', $rekam->status_validasi);
        $this->assertStringContainsString('FLAGGED', $rekam->ringkasan_kontribusi);
    }
}
