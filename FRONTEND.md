# FRONTEND.md — Pedoman Perancangan Tampilan Website

## Platform Kolaborasi Tim Kampus dengan Rekam Jejak Terverifikasi

> Dokumen ini memetakan setiap spesifikasi fitur dari [PRD.md](./PRD.md) ke desain antarmuka konkret. Merujuk sistem visual baru yang didefinisikan di [DESIGN.md](./DESIGN.md) (Modern Minimalist × Digital Workspace — terinspirasi Linear, Vercel, dan GitHub).

| | |
|---|---|
| Merujuk PRD versi | 1.1 |
| Tech stack frontend | React (SPA) + Vite + Tailwind CSS + Axios |
| Desain sistem | Modern Minimalist × Digital Workspace (Brand Accent Green `#22C55E` + Indigo `#4F46E5` + Monochrome, lihat [DESIGN.md](./DESIGN.md)) |
| HTTP client | Axios → Laravel Sanctum API (`localhost:8000`) |
| Icon library | Lucide React + PixelIcons.jsx (sebagai aksen dekorasi kecil: `PixelCloud`, `PixelDino`, `PixelRobot`, dll.) |

---

# 1. Arsitektur Halaman & Navigasi

## 1.1 Struktur Aplikasi (Single Page Application)

Aplikasi berjalan sebagai React SPA dengan navigasi berbasis tab — bukan routing URL tradisional. Setiap modul PRD dipetakan ke satu tab utama:

| Tab ID | Label Navigasi | Modul PRD | Komponen React |
|---|---|---|---|
| `home` | Beranda | — (landing + overview) | `Hero.jsx` |
| `matchmaking` | Matchmaking Proyek | A.9.2, A.9.3 | `MatchmakingSection.jsx` |
| `workspace` | Ruang Kerja Checkpoint | A.9.4 | `WorkspaceSection.jsx` |
| `peereval` | Evaluasi & Portofolio | A.9.5, A.9.6, B.5 | `PeerEvalSection.jsx` |
| `umkm` | Kemitraan UMKM | A.9.7 | `UmkmSection.jsx` |

**State management**: `activeTab` dan `currentUser` dikelola di `App.jsx` dan diteruskan ke setiap komponen via props. Belum menggunakan context/reducer — cukup untuk skala MVP.

## 1.2 Navbar (`Navbar.jsx`)

| Elemen | Spesifikasi |
|---|---|
| Posisi | `sticky top-0 z-50` dengan backdrop blur |
| Logo | Ikon `PixelLogo` di dalam lingkaran hitam (`#222222`), hover → biru (`#0082f3`) |
| Badge identitas | `pixel-badge` dengan label "NEO-RETRO PIXEL" |
| Nav items | Pill buttons: aktif = hitam (`#222222`) + teks putih; inaktif = transparan + hover abu |
| Badge per tab | Matchmaking → `AI Match` (biru), Evaluasi → `SHA-256` (ungu), UMKM → `SDG 8` (hijau) |
| Ikon nav | Tab dengan pixel icon menggunakan `PixelSparkle`, `PixelShield`, `PixelTrophy`; sisanya Lucide |
| Account switcher | Pill button dengan avatar + nama + role badge, dropdown berisi daftar akun simulasi |
| Dropdown akun | Card elevated putih, akun terpilih = latar hitam (`#222222`), status ditandai `PixelCheck` |

### Perilaku responsif Navbar
- **Desktop (xl+)**: Semua tab navigasi terlihat horizontal
- **Tablet/Mobile**: Navigasi horizontal disembunyikan; pertimbangkan hamburger menu atau bottom tab bar di implementasi lanjutan

## 1.3 Footer (`Footer.jsx`)

| Elemen | Spesifikasi |
|---|---|
| Background | Noir hitam (`#121212`) — satu-satunya elemen halaman dengan latar gelap selain case card noir |
| Logo | `PixelLogo` dengan border biru, label font mono "Neo-Retro 8-Bit Interface" |
| Link navigasi | Teks `#aaaaaa`, hover → `#0082f3` |
| Copyright bar | Border atas `#333333`, teks mono `#758696`, ikon `PixelHeart` pink |

---

# 2. Halaman Beranda / Hero (`Hero.jsx`)

Beranda berfungsi sebagai landing page yang mengkomunikasikan value proposition platform dan mengarahkan pengguna ke modul-modul utama.

## 2.1 Layout Grid Utama

```
┌──────────────────────────────────────────────────────────┐
│ NAVBAR (sticky)                                          │
├────────────┬─────────────────────────────────────────────┤
│            │                                             │
│  METODOLOGI│  HEADLINE STATEMENT                         │
│  (Our      │  "We specialize in creating                │
│  Process)  │   human-centric academic collaboration."    │
│  3 langkah │                                             │
│            │  CTA BUTTONS                                │
│  SDG 8     │  [Mulai Matchmaking] [Kemitraan UMKM]      │
│  badge     │                                             │
│            │  PROOF POINTS (3 kolom metrik)              │
├────────────┴─────────────────────────────────────────────┤
│ CASE STUDY CARDS (4 kolom: Matchmaking | Workspace |     │
│  Peer Eval | UMKM — masing-masing clickable)            │
├──────────────────────────────────────────────────────────┤
│ LIVE PREVIEW (embedded MatchmakingSection)               │
└──────────────────────────────────────────────────────────┘
```

## 2.2 Kolom Kiri: Our Methodology (PRD A.8 User Flow)

Memetakan **alur pengguna utama PRD A.8** ke 3 langkah visual:

| Step | Label | Deskripsi | Ikon | Navigasi onClick |
|---|---|---|---|---|
| 1 | AI Matchmaking | Kurasi tim kampus seimbang keahlian | `PixelSparkle` (hitam, hover biru) | → tab `matchmaking` |
| 2 | Anti-Free-Rider Workspace | Log aktivitas & checkpoint transparan | `PixelRobot` | → tab `workspace` |
| 3 | SHA-256 Verified Hash | Portofolio kriptografis anti-pemalsuan | `PixelShield` | → tab `peereval` |

Setiap step adalah card `rounded-xl bg-[#f7f7f7]` dengan ikon kotak di kiri. Badge SDG 8 di bawah garis pemisah.

## 2.3 Kolom Kanan: Hero Statement

- **Eyebrow badge**: `pixel-badge` "HUMAN-CENTRIC INTERFACE"
- **Headline**: Font display-1 (`3.75rem`, `700`, `-0.05em`), aksen `text-[#0082f3]` pada kata kunci
- **Body**: Teks `#555555`, `1.25rem`, menyebut "free-rider" dan "portofolio terverifikasi hash"
- **CTA utama**: `uxis-btn-black` dengan `PixelSparkle` + `PixelArrow` → tab matchmaking
- **CTA sekunder**: `uxis-btn-outline` dengan `PixelHeart` → tab UMKM

## 2.4 Proof Points (3 Kolom Metrik)

Ditampilkan di bawah CTA, border atas `#d9d9d9`:

| Metrik | Nilai | Ikon | Warna |
|---|---|---|---|
| Transparansi Kontribusi Tim | 100% | `PixelCheck` | `#108a34` |
| Verifikasi Kriptografis | SHA-256 | `PixelShield` | `#0082f3` |
| Digitalisasi UMKM | SDG 8 | `PixelTrophy` | `#108a34` |

## 2.5 Case Study Cards (4 Kartu Interaktif)

Masing-masing mewakili modul inti, klik → pindah tab:

| # | Modul | Warna Latar | Class CSS | Modul PRD |
|---|---|---|---|---|
| 01 / AI | Matchmaking | `#3696ea` (Telegram Blue) | `uxis-case-blue` | A.9.3 |
| 02 / LOG | Workspace Checkpoint | `#121212` (Noir Black) | `uxis-case-noir` | A.9.4 |
| 03 / SHA | Portofolio SHA-256 | `#6651e3` (Agency Indigo) | `uxis-case-indigo` | A.9.6, B.5 |
| 04 / SDG | Kemitraan UMKM | `#3b878f` (Cyan Teal) | `uxis-case-teal` | A.9.7 |

Setiap kartu berisi: eyebrow badge → heading → deskripsi → footer dengan pixel arrow. Hover effect: `border-radius` membesar ke `32px` + `scale(1.01)`.

---

# 3. Matchmaking Proyek (`MatchmakingSection.jsx`)

> Memetakan PRD **A.9.2 (Pembuatan & Pencarian Proyek)** dan **A.9.3 (Mesin Matchmaking)**.

## 3.1 Header Section

| Elemen | Detail |
|---|---|
| Badge | `pixel-badge` "AI MATCHMAKING 8-BIT ALGORITHM" dengan `PixelSparkle` |
| Heading | "Matchmaking Proyek & Kurasi Keahlian" + `PixelRobot` |
| Subtitle | Menampilkan skill user aktif dan jam komitmen per minggu (dari `currentUser.skills` dan `currentUser.freeHours`) |
| CTA kanan | `pixel-btn` "Inisiasi Proyek Baru" → buka modal pembuatan proyek |

## 3.2 Search & Filter Bar (PRD A.9.2)

Terletak di dalam `uxis-card` dengan 2 baris:

**Baris 1:**
- Input pencarian (`uxis-input`) — filter berdasarkan judul dan deskripsi proyek
- Pill filter skill: 5 skill populer ditampilkan sebagai pill buttons
  - Aktif: `bg-[#222222] text-white`
  - Inaktif: `bg-[#f3f3f3] text-[#555555]`, hover border hitam

**Baris 2 (border-top):**
- Filter kategori proyek: `All`, `Web Development`, `AI & Machine Learning`, `Mobile Development`, `UI/UX Design`
  - Aktif: `bg-[#0082f3] text-white` (pill rounded)

## 3.3 Project Cards Grid (PRD A.9.2 + A.9.3)

Layout: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

### Anatomi satu kartu proyek:

```
┌─────────────────────────────────────┐
│ [KATEGORI tag]         [SDG 8 tag?] │  ← uxis-tag + pixel-badge hijau
│                                     │
│ Judul Proyek                  ✦     │  ← font-heading-3, PixelSparkle on hover
│ Deskripsi singkat proyek...         │  ← text-xs text-[#555555]
│                                     │
│ ┌─────────────┬─────────────────┐  │
│ │ Komitmen    │ AI Match        │  │  ← Stats box bg-[#f7f7f7]
│ │ 12 jam/mgg  │ 94% Compatible  │  │
│ └─────────────┴─────────────────┘  │
│                                     │
│ Keahlian Dibutuhkan:                │
│ [✓ React] [✓ Laravel] [Node.js]    │  ← Matched = biru, unmatched = abu
│                                     │
│─────────────────────────────────────│  ← border-t
│ 2 Slot Tersedia    [Gabung Tim AI →]│  ← uxis-btn-black / uxis-btn-blue
└─────────────────────────────────────┘
```

### Logika tampilan per-kartu (merujuk PRD B.4):

| Data | Sumber | Tampilan |
|---|---|---|
| Kategori | `project.category` | `uxis-tag` font-mono |
| Label UMKM | `project.isUmkm` | `pixel-badge` hijau "SDG 8 UMKM" (PRD A.9.7) |
| Kompatibilitas skill | Irisan `currentUser.skills ∩ project.requiredSkills` | Persentase match + warna hijau/abu |
| Kompatibilitas waktu | `currentUser.freeHours >= project.commitmentHours` | Warna hitam (cukup) / oranye (kurang) |
| Skill match per-tag | `currentUser.skills.includes(skill)` | Matched = `PixelCheck` + bg biru; unmatched = bg abu |
| Status bergabung | `joinedProjects.includes(project.id)` | Tombol berubah ke "Di Checkpoint" → navigasi workspace |
| Slot penuh | `project.slotsLeft === 0` | Tombol disabled abu |

### Ketersediaan waktu (PRD B.4.3)

Sesuai PRD: **jam luang tidak masuk formula skor, hanya ditampilkan sebagai label informatif**:

| Jam/minggu | Tampilan |
|---|---|
| < 5 jam | Teks oranye (`#f26800`) |
| 5–15 jam | Teks hitam (`#222222`) |
| > 15 jam | Teks hijau (`#108a34`) |

## 3.4 Modal Pembuatan Proyek Baru (PRD A.9.2)

Overlay `bg-black/60 backdrop-blur`, card `uxis-card-elevated`:

| Field | Tipe | Validasi | Catatan PRD |
|---|---|---|---|
| Judul Proyek | `text` (required) | Wajib | PRD: judul proyek |
| Kategori | `select` | Wajib | PRD: mendefinisikan kebutuhan skill |
| Komitmen Waktu | `number` (4-40) | Min 4 | Label informatif, bukan filter |
| Deskripsi | `textarea` (required) | Wajib | PRD: deskripsi proyek |
| Keahlian Dibutuhkan | `text` (comma-separated) | Min 1 | PRD: minimal 1 skill (B.4 edge case) |

Tombol submit: `pixel-btn` "Publikasikan Proyek".

---

# 4. Ruang Kerja & Checkpoint (`WorkspaceSection.jsx`)

> Memetakan PRD **A.9.4 (Checkpoint Proyek)** dan mekanisme deteksi free-rider.

## 4.1 Header Section

| Elemen | Detail |
|---|---|
| Badge | `pixel-badge` "CHECKPOINT WORKSPACE AUDIT" dengan `PixelTerminal` |
| Heading | "Ruang Kerja & Transparansi Kontribusi Tim" + `PixelRobot` |
| Subtitle | Menyebut mekanisme deteksi free-rider (2 checkpoint berurutan terlewat) |
| Selector proyek | Dropdown pill `bg-[#f7f7f7]` untuk memilih proyek aktif |

## 4.2 Project Overview Card

Card `uxis-card` dengan `border-l-4 border-l-[#0082f3]`, grid 4 kolom:

| Kolom | Konten |
|---|---|
| **Proyek (span 2)** | Judul + deskripsi, eyebrow "PROYEK KOLABORASI" dengan `PixelGrid` |
| **Progress** | Bar progres kotak (retro style: `border-2 border-[#222]`, no border-radius), persentase font-mono biru |
| **Status Tim** | `PixelCheck` hijau + "Aktif (4 Anggota)", label "0 Free-Rider terdeteksi" |

## 4.3 Layout 2 Kolom

```
┌─────────────────────────────┬──────────────────────────┐
│ MILESTONE CHECKPOINTS       │ DETEKSI FREE-RIDER       │
│ (lg:col-span-7)            │ (lg:col-span-5)          │
│                             │                          │
│ [Checkpoint 1 - Selesai]    │ ┌─ Card Noir ──────────┐ │
│ [Checkpoint 2 - Selesai]    │ │ Algoritma Deteksi    │ │
│ [Checkpoint 3 - Aktif]      │ │ Free-Rider           │ │
│ [Checkpoint 4 - Belum]      │ │ - Budi: 38% ✓       │ │
│                             │ │ - Dewi: 35% ✓       │ │
│                             │ │ - Eko: 8% ⚠ FLAGGED │ │
│                             │ └──────────────────────┘ │
│                             │                          │
│                             │ [Akuntabilitas Individual]│
└─────────────────────────────┴──────────────────────────┘
```

## 4.4 Checkpoint Cards (PRD A.9.4)

Setiap checkpoint ditampilkan sebagai `uxis-card` dengan border kiri berwarna sesuai status:

| Status | Border Kiri | Badge | Ikon |
|---|---|---|---|
| Selesai (Tepat Waktu) | `#108a34` (hijau) | `bg-[#e8f7ec]` hijau | `PixelCheck` |
| Terlambat | `#f26800` (oranye) | `bg-[#fdf1e8]` oranye | `PixelAlert` |
| Aktif / Belum Dikerjakan | `#0082f3` (biru) | `bg-[#edf6ff]` biru | — |

Setiap kartu berisi:
- **Header**: Minggu ke-N + Deadline (font-mono uppercase)
- **Judul milestone**: font bold hitam
- **Deskripsi**: teks `#555555`
- **Footer**: PIC Tugas + tombol "Laporkan Progres" (`uxis-btn-blue` dengan `PixelArrow`)
- **Bukti kerja** (jika selesai): Card `bg-[#f7f7f7]` dengan link URL + badge "100% VERIFIED" (`PixelCheck`)

### Perlakuan checkpoint terlewat (PRD A.9.4)

> *"Checkpoint yang lewat tenggat tanpa submisi ditandai sebagai indikator pendukung di rekam kontribusi"*

Tampilan: border kiri oranye + badge `PixelAlert` "Terlambat" + peringatan inline bahwa data ini akan masuk rekam kontribusi.

## 4.5 Panel Deteksi Free-Rider (Kolom Kanan)

### Card Noir (bg `#121212`)
Menampilkan **transparansi kontribusi per anggota tim** — memetakan PRD A.11 tentang mitigasi manipulasi:

| Anggota | Kontribusi | Status Visual |
|---|---|---|
| Budi (Backend) | 38% | `PixelCheck` hijau, card `bg-white/10` |
| Dewi (Frontend) | 35% | `PixelCheck` hijau, card `bg-white/10` |
| Eko (Researcher) | 8% ⚠ | `PixelAlert` oranye, card `bg-[#fdf1e8]` border oranye |

Teks penjelasan: *"Jika deviasi kontribusi melebihi >35% dari rata-rata tim, sistem akan menahan penerbitan sertifikat portofolio."*

### Card Akuntabilitas Individual
- Ambang batas: ≥75% partisipasi checkpoint
- Badge status: `pixel-badge` "AMAN" hijau atau "INVESTIGASI" oranye

## 4.6 Modal Submit Progres (PRD A.9.4)

| Field | Tipe | Catatan PRD |
|---|---|---|
| Tautan Bukti Kerja | `url` (required) | GitHub PR / Figma URL — PRD: "timestamp tercatat otomatis" |
| Persentase Penyelesaian | `range` (10-100, step 5) | Slider dengan label font-mono biru |
| Catatan Tambahan | `textarea` (required) | PRD: "catatan progres per checkpoint" |

Tombol submit: `pixel-btn` "Simpan & Validasi" + `PixelCheck`.

---

# 5. Evaluasi Sejawat & Portofolio SHA-256 (`PeerEvalSection.jsx`)

> Memetakan PRD **A.9.5 (Peer Evaluation)**, **A.9.6 (Rekam Kontribusi Individual)**, dan **B.5 (Verifikasi Hash)**.

## 5.1 Header Section

| Elemen | Detail |
|---|---|
| Badge | `pixel-badge` "SHA-256 CRYPTOGRAPHIC PORTFOLIO" + `PixelShield` (ungu `#6651e3`) |
| Heading | "Evaluasi Sejawat & Portofolio SHA-256" + `PixelLock` |
| Status badge | "SHA-256 IMMUTABLE" dengan `PixelCheck` hijau |

## 5.2 Layout 2 Kolom

```
┌─────────────────────────────┬──────────────────────────┐
│ EVALUASI SEJAWAT 360°       │ SERTIFIKAT SHA-256       │
│ (lg:col-span-6)            │ (lg:col-span-6)          │
│                             │                          │
│ [Pemilih rekan tim]         │ ┌─ Sertifikat ─────────┐ │
│ [4 slider evaluasi]         │ │ Nama + NIM + Univ    │ │
│ [Variance check alert]      │ │ Proyek + Skor        │ │
│ [Tombol submit]             │ │ ┌── Hash Box ──────┐ │ │
│                             │ │ │ SHA-256: a7f3... │ │ │
│                             │ │ └──────────────────┘ │ │
│                             │ └──────────────────────┘ │
└─────────────────────────────┴──────────────────────────┘
```

## 5.3 Form Evaluasi Sejawat (PRD A.9.5)

### Pemilih Rekan Tim
Grid 2 kolom, setiap tombol menampilkan avatar + nama + status ("⚠️ Indikasi Free-Rider" vs "★ Aktif Kontribusi"). Terpilih = `bg-[#222222] text-white`.

**Catatan PRD**: *"Setiap anggota menilai semua anggota lain (tidak termasuk dirinya sendiri)"* — filter `testAccounts.filter(a => a.id !== currentUser.id)`.

### 4 Dimensi Evaluasi (PRD A.9.5)

Setiap dimensi ditampilkan sebagai slider (`input[type=range]`) dengan skala 1.0 – 5.0:

| Dimensi | Aspek yang Dinilai |
|---|---|
| Kualitas Kode & Deliverables | Output kerja |
| Ketepatan Waktu Checkpoint | Kepatuhan tenggat (PRD A.9.4) |
| Kerja Sama & Partisipasi Git | Kolaborasi aktif |
| Komunikasi & Responsivitas | Responsivitas komunikasi tim |

Slider styling: `accent-[#0082f3]`; skor ditampilkan real-time sebagai font-mono biru.

### Skor Rata-rata & Variance Check (PRD B.3)

Rata-rata ditampilkan dengan `PixelStar`:
- `< 3.2` → badge oranye `bg-[#fdf1e8]` + **alert variance check**
- `>= 3.2` → badge hijau `bg-[#e8f7ec]`

**Alert Variance Check** (PRD B.3): Card oranye dengan `PixelAlert` + penjelasan:
> *"Skor sangat rendah (<3.2). Sistem akan menyandingkan dengan log aktivitas Git. Jika terbukti minim kontribusi, sertifikat akan ditahan."*

### Tombol Submit
- Sebelum submit: `pixel-btn` "Kirim Penilaian Sejawat" + `PixelShield`
- Setelah submit: Tombol berubah hijau "Evaluasi Tercatat & Terenkripsi SHA-256" + `PixelCheck`

## 5.4 Sertifikat Portofolio SHA-256 (PRD A.9.6 + B.5)

Card `uxis-card` dengan `border-t-4 border-t-[#6651e3]`:

### Elemen sertifikat:

| Bagian | Konten | Catatan PRD |
|---|---|---|
| Header | `pixel-badge` "VERIFIED CREDENTIAL" + nama + NIM + universitas | A.9.6: ringkasan otomatis |
| QR Code | Placeholder `QrCode` icon | Untuk verifikasi mobile |
| Proyek | Judul + skor evaluasi + role | A.9.6: skor rata-rata peer evaluation |
| Hash Box | Card hitam `#222222` berisi hash SHA-256 lengkap + tombol Copy | B.5: hash_data |
| Status | Badge "TAMPER-PROOF" hijau | B.5.1: tamper-evident |
| Footer | Tanggal terbit + link "Verifikasi API Live ↗" | Endpoint: `/api/verify-hash/{hash}` |

### Watermark
`PixelShield` berukuran besar (`w-32 h-32`) dengan opacity rendah (`#758696/20`) sebagai elemen dekoratif di sudut kanan atas kartu.

---

# 6. Kemitraan UMKM & SDG 8 (`UmkmSection.jsx`)

> Memetakan PRD **A.9.7 (Proyek UMKM Simulasi)** dan **A.3 tujuan G4**.

## 6.1 Header Section

| Elemen | Detail |
|---|---|
| Badge | `pixel-badge` "SDG 8: DECENT WORK & ECONOMIC GROWTH" + `PixelTrophy` hijau |
| Heading | "Kemitraan UMKM & Dampak Nyata" + `PixelHeart` pink |
| CTA | `pixel-btn` hijau (`#108a34`) "Daftarkan Proyek UMKM" |

## 6.2 Impact Metrics Grid (3 Kolom)

| Metrik | Nilai | Ikon Background | Border Kiri |
|---|---|---|---|
| Target SDG 8.2 | 24 UMKM Terdigitalisasi | `PixelTrophy` (opacity 15%) | `#108a34` |
| Target SDG 8.3 | 180+ Mahasiswa | `PixelSparkle` (opacity 15%) | `#0082f3` |
| Anti-Free-Rider | 100% Valid | `PixelHeart` (opacity 15%) | `#e83898` |

Setiap kartu: `uxis-card bg-[#f7f7f7]` dengan ikon besar semi-transparan di pojok kanan atas.

## 6.3 Daftar Proyek UMKM Aktif

Grid `grid-cols-1 md:grid-cols-2`:

### Kartu proyek UMKM:
- `uxis-card` dengan `border-t-4 border-t-[#108a34]`
- Badge: `pixel-badge` "MITRA UMKM VERIFIED" + `PixelTrophy`
- Lokasi: ikon `MapPin` + alamat UMKM (font-mono)
- Tech stack: Pill badges per-skill dengan `PixelCheck` hijau
- CTA: `uxis-btn-black bg-[#108a34]` "Gabung Proyek SDG 8" + `PixelArrow`

### Kartu ajakan UMKM baru:
- Card dashed border hijau `border-2 border-dashed border-[#108a34]`
- Ikon `PixelTrophy` besar di tengah
- CTA: `pixel-btn` hijau "Ajukan Kemitraan Gratis"

### Label simulasi (PRD A.9.7)

> *"Portofolio yang dihasilkan dari proyek ini diberi label jelas 'simulasi'"*

Setiap proyek UMKM yang berstatus simulasi harus menampilkan badge eksplisit:
```
<span className="pixel-badge !bg-[#fdf1e8] !border-[#f26800] !text-[#f26800]">
  SIMULASI — Bukan Proyek Nyata
</span>
```

## 6.4 Modal Pendaftaran UMKM (PRD A.9.7)

Card `uxis-card-elevated` dengan `border-t-4 border-t-[#108a34]`:

| Field | Tipe | Catatan PRD |
|---|---|---|
| Nama Usaha | `text` (required) | Identitas UMKM |
| Nama Pemilik / PIC | `text` (required) | Kontak person |
| No. WhatsApp | `tel` (required) | Komunikasi |
| Lokasi Usaha | `text` (required) | Geografis |
| Kebutuhan Digitalisasi | `textarea` (required) | PRD: "skenario proyek UMKM" |

Submit: `pixel-btn` hijau "Ajukan Kemitraan" + `PixelTrophy`.

---

# 7. Pemetaan Persona PRD ke Tampilan

> Merujuk PRD A.7 (Persona Pengguna).

## 7.1 Mahasiswa Pencari Tim

| Kebutuhan PRD | Implementasi UI |
|---|---|
| Menemukan rekan tim relevan skill | MatchmakingSection: filter skill + skor kompatibilitas per-kartu |
| Lintas prodi | Proyek menampilkan kebutuhan skill, bukan prodi tertentu |

## 7.2 Mahasiswa Anggota Tim

| Kebutuhan PRD | Implementasi UI |
|---|---|
| Kontribusi diakui adil | WorkspaceSection: progress bar individual + persentase kontribusi |
| Free-rider terdeteksi | Panel Deteksi Free-Rider: card noir dengan alert per-anggota |

## 7.3 Dosen / PIC UKM

| Kebutuhan PRD | Implementasi UI |
|---|---|
| Memantau kontribusi | WorkspaceSection: tabel akuntabilitas individual |
| Memvalidasi proyek | Account switcher: role "Dosen / PIC UKM" (simulasi) |
| Approval proyek UMKM | *(Belum diimplementasi di MVP frontend — di-handle backend via API endpoint)* |

## 7.4 UMKM / Komunitas Mitra (Fase Lanjutan)

| Kebutuhan PRD | Implementasi UI |
|---|---|
| Mendapat bantuan proyek | UmkmSection: modal pendaftaran UMKM |
| Mahasiswa terverifikasi | PeerEvalSection: sertifikat SHA-256 sebagai bukti kredibilitas |

---

# 8. Komponen Reusable & Sistem Token Desain

## 8.1 CSS Classes Utama (didefinisikan di `index.css`)

| Class | Fungsi | Referensi DESIGN.md |
|---|---|---|
| `.uxis-card` | Card putih, border `#d9d9d9`, radius `20px` | Component: Cards |
| `.uxis-card-elevated` | Card dengan border hitam + shadow | Component: Cards |
| `.uxis-btn-black` / `.notion-btn-primary` | Pill button hitam | Component: Buttons |
| `.uxis-btn-blue` | Pill button Electric Blue | Component: Buttons |
| `.uxis-btn-outline` / `.notion-btn-secondary` | Pill button outline hitam | Component: Buttons |
| `.uxis-input` / `.notion-input` | Input field radius `12px` | Component: Inputs |
| `.uxis-tag` / `.notion-badge` | Pill badge border hitam, uppercase | Component: Tag Badges |
| `.uxis-tag-blue` / `.notion-badge-blue` | Pill badge border biru | Component: Tag Badges |
| `.pixel-badge` | Badge retro 8-bit dengan shadow kotak | Neo-Retro Pixel |
| `.pixel-btn` | Tombol retro dengan shadow biru | Neo-Retro Pixel |
| `.pixel-box` | Container dengan shadow kotak | Neo-Retro Pixel |
| `.uxis-case-blue/indigo/teal/noir` | Kartu showcase berwarna | Feature Cards |
| `.font-display-1` s/d `.font-title` | Hierarki tipografi | Typography |

## 8.2 Komponen PixelIcons (`PixelIcons.jsx`)

Semua ikon menggunakan `viewBox="0 0 16 16"`, `shapeRendering="crispEdges"`:

| Komponen | Penggunaan Utama |
|---|---|
| `PixelSparkle` | AI Matchmaking, badge algoritma |
| `PixelHeart` | SDG 8 impact, CTA UMKM, footer |
| `PixelShield` | SHA-256 verifikasi, portofolio |
| `PixelTrophy` | SDG 8, achievement, UMKM badge |
| `PixelCheck` | Status tervalidasi, skill match |
| `PixelArrow` | Navigasi CTA, directional |
| `PixelRobot` | Algoritma/bot, workspace |
| `PixelStar` | Rating, skor evaluasi |
| `PixelTerminal` | Audit trail, workspace |
| `PixelLock` | Keamanan, kriptografi |
| `PixelAlert` | Peringatan free-rider, variance check |
| `PixelGrid` | Section descriptor, methodology |
| `PixelLogo` | Brand logo navbar + footer |

---

# 9. Pola Data & Integrasi API

## 9.1 Data Saat Ini (Mock)

Seluruh data saat ini bersumber dari `mockData.js`. Struktur data dirancang agar kompatibel langsung dengan skema database PRD B.6:

| Mock Data | Tabel PRD | Endpoint API Target |
|---|---|---|
| `testAccounts` | USER + MAHASISWA + PROFIL_SKILL | `GET /api/users`, `GET /api/mahasiswa/{id}` |
| `mockProjects` | PROYEK + KEBUTUHAN_SKILL | `GET /api/proyek`, `POST /api/proyek` |
| `mockCheckpoints` | CHECKPOINT + SUBMISI_CHECKPOINT | `GET /api/proyek/{id}/checkpoint` |
| `mockPortfolio` | REKAM_KONTRIBUSI | `GET /api/rekam-kontribusi/{id}` |

## 9.2 Rencana Migrasi ke API Nyata

Setiap komponen yang saat ini menggunakan mock data perlu dimigrasi ke `axios` calls:

| Komponen | State Lokal → API Call |
|---|---|
| `MatchmakingSection` | `mockProjects` → `GET /api/proyek?skill=X&category=Y` |
| `WorkspaceSection` | `mockCheckpoints` → `GET /api/proyek/{id}/checkpoint` |
| `WorkspaceSection` | Submit progres → `POST /api/checkpoint/{id}/submisi` |
| `PeerEvalSection` | Submit evaluasi → `POST /api/peer-evaluasi` |
| `PeerEvalSection` | `mockPortfolio` → `GET /api/rekam-kontribusi/{anggota_tim_id}` |
| `UmkmSection` | `mockProjects.filter(isUmkm)` → `GET /api/proyek?kategori=umkm` |
| `Navbar` | Health check → `GET /api/health` (sudah ada) |

## 9.3 Autentikasi (PRD A.5.1: Laravel Sanctum)

Saat ini menggunakan account switcher simulasi. Migrasi ke Sanctum:
1. Login form → `POST /api/login` → simpan token di `localStorage`
2. Axios interceptor: tambahkan `Authorization: Bearer {token}` ke setiap request
3. Guard route: redirect ke login jika token tidak valid

---

# 10. Responsivitas & Breakpoint

| Breakpoint | Target | Penyesuaian Utama |
|---|---|---|
| `< 640px` (mobile) | Smartphone | Single column, nav collapse, font-display-1 → `2.5rem` |
| `640px – 1024px` (tablet) | iPad/Tablet | 2 kolom grid, nav partial |
| `1024px – 1280px` (desktop) | Laptop | Layout penuh, 3 kolom card grid |
| `> 1280px` (xl) | Monitor besar | Nav items horizontal lengkap, max-w-7xl container |

### Catatan responsif per komponen:

| Komponen | Mobile | Desktop |
|---|---|---|
| Hero | Single column, metodologi di atas headline | 4+8 grid split |
| Matchmaking | 1 kolom kartu | 3 kolom kartu |
| Workspace | Stack vertikal (checkpoints → free-rider panel) | 7+5 kolom |
| PeerEval | Stack vertikal (form → sertifikat) | 6+6 kolom |
| UMKM | 1 kolom kartu UMKM | 2 kolom |
| Case cards (Hero) | 1 kolom stack | 4 kolom |

---

# 11. Accessibility & Semantic

| Aspek | Implementasi |
|---|---|
| Heading hierarchy | `h1` per halaman/section utama, `h2` subsection, `h3` card heading |
| Focus states | `uxis-input:focus` = border biru + box-shadow `rgba(0,130,243,0.15)` |
| Color contrast | Teks hitam `#222222` di atas putih `#ffffff` = rasio > 14:1 (AAA) |
| Interactive elements | Semua tombol dan link memiliki `cursor-pointer` |
| Alt text | Avatar menggunakan `alt={account.name}` |
| Keyboard nav | Native `button` dan `a` elements (accessible by default) |

---

# 12. Checklist Status Implementasi

| Fitur PRD | Status Frontend | Catatan |
|---|---|---|
| A.9.1 Profil Mahasiswa | ⬜ Belum ada halaman khusus | Data tersedia di account switcher & mockData |
| A.9.2 Pembuatan & Pencarian Proyek | ✅ Implementasi lengkap | Modal + search + filter + grid |
| A.9.3 Mesin Matchmaking | ✅ Simulasi (mock) | Skor kompatibilitas dihitung client-side |
| A.9.4 Checkpoint Proyek | ✅ Implementasi lengkap | List + submit modal + status tracking |
| A.9.5 Peer Evaluation | ✅ Implementasi lengkap | 4 slider + variance check + submit |
| A.9.6 Rekam Kontribusi | ✅ Sertifikat SHA-256 | Hash display + copy + QR placeholder |
| A.9.7 Proyek UMKM Simulasi | ✅ Implementasi lengkap | Cards + modal pendaftaran |
| B.3 Mitigasi Manipulasi | ✅ Variance check alert | Trigger saat avg < 3.2 |
| B.4 Matchmaking Algorithm | ⬜ Backend only | Frontend menampilkan hasil, logika di Laravel |
| B.5 Hash Chain | ⬜ Fase 2 | Kolom hash_data disiapkan, UI sertifikat sudah ada |
| Integrasi API (Sanctum) | ⬜ Belum dimulai | Masih menggunakan mock data |
| Approval Dosen/PIC | ⬜ Belum ada UI | Endpoint backend tersedia |
| Label Simulasi UMKM | ⚠️ Parsial | Badge "SIMULASI" perlu ditambahkan eksplisit |
| Halaman Profil Mahasiswa | ⬜ Belum ada | Perlu form skill tag + jam luang |

---

# 13. Prioritas Pengembangan Selanjutnya

| Prioritas | Task | Modul PRD |
|---|---|---|
| 🔴 Tinggi | Halaman Profil Mahasiswa (form skill tags + jam luang) | A.9.1 |
| 🔴 Tinggi | Integrasi API Axios → Laravel Sanctum | A.5.2 |
| 🔴 Tinggi | Label eksplisit "SIMULASI" pada proyek UMKM | A.9.7 |
| 🟡 Sedang | Halaman/modal approval dosen/PIC untuk proyek UMKM | A.9.7 |
| 🟡 Sedang | Variance check → trigger ke status `menunggu_acc_dosen` | A.9.5, B.3 |
| 🟡 Sedang | Rekam kontribusi status berjenjang (draft → acc → final) | A.9.6 |
| 🟢 Rendah | Mobile responsive: hamburger menu / bottom tab | UX |
| 🟢 Rendah | Notifikasi/reminder checkpoint (fase lanjutan) | A.6 |
| 🟢 Rendah | Integrasi sinyal GitHub commit log | B.3 |
