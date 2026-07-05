# Pedoman Sistem Desain Visual: Modern Minimalist × Linear.app Theme
**Proyek:** Verstack (Platform Kolaborasi Mahasiswa, Matchmaking Tim, Evaluasi 360°, dan Verifikasi Portofolio SHA-256)  
**Referensi Utama:** [Linear.app](https://linear.app/) & High-Performance Digital Workspaces  
**Versi:** 2.0 (Linear Theme Edition)  

---

## 1. Filosofi & Visi Desain

Antarmuka **Verstack** mengadopsi bahasa desain **Linear.app** yang terkenal sebagai standar emas aplikasi *developer* dan *product builder* modern. Desain ini berfokus pada **presisi tinggi, kecepatan visual, estetika gelap yang elegan (Dark Mode First / Crisp High-Contrast), dan pengurangan distraksi**.

### Prinsip Utama:
1. **High-Performance Workstation**: Aplikasi tidak terasa seperti website akademik konvensional atau formulir birokrasi, melainkan ruang kerja digital kelas dunia tempat para *builder* menciptakan karya nyata.
2. **Subtle Glassmorphism & Depth Layering**: Menggunakan latar belakang gelap (*obsidian / dark matter*) dengan lapisan permukaan transparan (*translucent surfaces*), efek *backdrop blur*, dan pembatas garis tipis 1px (*hairline borders*).
3. **Laser Glows & Focused Illumination**: Garis batas atas (*top border highlight*) dan pendaran cahaya radial halus (*radial ambient glow*) digunakan untuk memandu mata pengguna ke elemen penting seperti CTA utama, status *Active Sprint*, dan kredensial terverifikasi **SHA-256**.
4. **Micro-Interactions & Tactile Feedback**: Setiap interaksi (hover tombol, klik tab, penggeseran slider evaluasi) merespons seketika dengan animasi transisi yang mulus dan memuaskan.
5. **Akuntabilitas & Visualisasi Integritas**: Fitur pencegahan *free-rider* dan validasi kriptografis ditampilkan secara tegas, jelas, dan berwibawa melalui hierarki warna status yang intuitif.

---

## 2. Design Tokens & Palet Warna

Sistem warna dibangun di atas dua fondasi tema (Dark & Light Mode) yang dapat diganti secara dinamis melalui fitur **Theme Switcher** di navigasi utama.

### A. Backgrounds & Surface Hierarchy (Dual Theme System)
| Token | Dark Mode (Monochrome Foundation) | Light Mode (Clean Productivity Authority) | Penggunaan |
| :--- | :--- | :--- | :--- |
| `--color-bg-canvas` | `#0A0A0A` (Deep Obsidian) | `#FAFAFA` (Soft White) | Latar belakang utama aplikasi & landing page |
| `--color-bg-surface` | `#111111` | `#FFFFFF` | Latar belakang section, sidebar, dan container tingkat 1 |
| `--color-bg-elevated` | `#161616` | `#FFFFFF` | Latar belakang card komponen, modal, dan dropdown |
| `--color-bg-hover` | `rgba(204, 253, 21, 0.08)` | `rgba(179, 187, 253, 0.12)` | Warna latar saat elemen/baris di-hover |
| `--color-bg-active` | `rgba(204, 253, 21, 0.15)` | `rgba(179, 187, 253, 0.22)` | Warna latar elemen yang sedang aktif / terpilih |

### B. Borders & Separators
| Token | Dark Mode | Light Mode | Penggunaan |
| :--- | :--- | :--- | :--- |
| `--color-border-subtle` | `rgba(255, 255, 255, 0.08)` | `rgba(0, 0, 0, 0.06)` | Pemisah antar baris tabel atau daftar checkpoint |
| `--color-border-default` | `#262626` (Clean Border) | `#E2E8F0` | Garis batas standar untuk card dan input form (Kontras Tajam) |
| `--color-border-hover` | `#CCFD15` (Lime Hover) | `#8C99E0` | Garis batas card saat mengalami interaksi hover |
| `--color-border-highlight` | `rgba(204, 253, 21, 0.45)` | `rgba(179, 187, 253, 0.60)` | *Top border highlight* untuk memberikan efek ketajaman |

### C. Typography / Ink (Text Colors)
| Token | Dark Mode | Light Mode | Penggunaan |
| :--- | :--- | :--- | :--- |
| `--color-text-primary` | `#FFFFFF` (Pure White) | `#0A0A0A` (Jet Black) | Teks utama, judul, angka statistik, label penting (Kontras Tinggi) |
| `--color-text-secondary` | `#8B8B8B` | `#475569` (Slate-600) | Deskripsi singkat, metadata, subtitle, placeholder input |
| `--color-text-tertiary` | `#525252` | `#64748B` (Slate-500) | Label non-aktif, nomor minggu, keterangan *timestamp* |
| `--color-text-accent` | `#CCFD15` (Vibrant Lime) | `#1E466B` (Bold Authority) | Teks sorotan pada aksen brand & hero title |

### D. Brand & Semantic Accent Colors (Dual-Accent System)
| Nama Aksen | Hex Code | Latar Badge | Border Badge | Penggunaan |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Accent (Vibrant Lime)** | `#CCFD15` | `rgba(204, 253, 21, 0.15)` | `rgba(204, 253, 21, 0.35)` | CTA utama (`.btn-primary`), sorotan kata penting, indikator aktif, success highlights |
| **Secondary Accent (Periwinkle)** | `#B3BBFD` | `rgba(179, 187, 253, 0.15)` | `rgba(179, 187, 253, 0.35)` | Tombol sekunder (`.btn-secondary`), hover states, links, info badges |
| **Amber Warning (Alert)** | `#F59E0B` | `rgba(245, 158, 11, 0.10)` | `rgba(245, 158, 11, 0.25)` | *Variance Check Alert*, batas ambang partisipasi, partial skill fit |
| **Crimson Flag (Danger)** | `#EF4444` | `rgba(239, 68, 68, 0.10)` | `rgba(239, 68, 68, 0.25)` | Deteksi *Free-Rider* (<10% kontribusi), tugas terlambat |

---


## 3. Hierarki Tipografi

Sistem tipografi dirancang agar bersih, sangat mudah dibaca pada layar beresolusi tinggi, dan memberikan kesan teknikal yang elegan.

```css
/* Google Fonts Import Reference */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');
```

| Tingkat | Font Family | Ukuran / Bobot | Line Height | Letter Spacing | Penggunaan |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Hero** | `Space Grotesk` | `48px - 64px` / Bold (700) | `1.05` | `-0.035em` | Headline utama halaman depan |
| **Heading 1** | `Space Grotesk` | `32px - 40px` / Bold (700) | `1.15` | `-0.03em` | Judul section utama (Cari Tim, Ruang Kerja) |
| **Heading 2** | `Space Grotesk` / `Inter` | `24px - 28px` / SemiBold (600) | `1.25` | `-0.025em` | Judul card utama, nama proyek |
| **Heading 3** | `Inter` | `18px - 20px` / SemiBold (600) | `1.3` | `-0.015em` | Sub-section, judul modal |
| **Body Large** | `Inter` | `16px` / Regular (400) - Medium (500) | `1.6` | `-0.01em` | Teks paragraf deskriptif |
| **Body Default** | `Inter` | `14px` / Regular (400) - Medium (500) | `1.5` | `0` | Deskripsi proyek, teks umum UI |
| **Caption / Label**| `Inter` | `12px` / Medium (500) - SemiBold (600) | `1.4` | `+0.01em` | Label input, kategori badge, metadata |
| **Technical / Code**| `JetBrains Mono` | `12px - 14px` / Medium (500) | `1.4` | `0` | Hash SHA-256, NIM, Git PR Link, persentase |

---

## 4. Arsitektur Komponen UI (Linear System)

### A. Surface & Cards
Kartu pada tema Linear tidak menggunakan bayangan hitam pekat yang kasar, melainkan menggabungkan pembatas tipis 1px, latar belakang transparan, dan *ambient shadow* yang sangat halus.
- **Base Card Style**:
  ```html
  <div class="bg-[#141519]/80 backdrop-blur-md border border-white/10 rounded-[16px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-200 hover:border-white/20 hover:bg-[#141519]">
    <!-- Content -->
  </div>
  ```
- **Laser Highlight Card (Untuk Kredensial / Proyek Unggulan)**:
  Ditambahkan garis batas atas yang lebih terang (`border-t-white/30` atau pendaran gradien violet/emerald di tepi atas).

### B. Buttons & Action Controls
Tombol dirancang presisi dengan gradien halus dan efek *glow* di bagian bawah saat mengalami interaksi.
1. **Primary Lime Glow Button (Action Utama)**:
   ```html
   <button class="btn-primary font-semibold text-xs px-5 py-2.5 rounded-lg inline-flex items-center gap-2 cursor-pointer shadow-sm">
     <span>Mulai Matchmaking</span>
     <svg class="w-4 h-4" /> <!-- Icon -->
   </button>
   ```
2. **Secondary Periwinkle Outline Button**:
   ```html
   <button class="btn-secondary font-medium text-xs px-4 py-2.5 rounded-lg inline-flex items-center gap-2 cursor-pointer">
     <span>Lihat Ruang Kerja</span>
   </button>
   ```
3. **Ghost / Utility Button**:
   ```html
   <button class="text-[#8A8F98] hover:text-[#F7F8F8] hover:bg-white/5 font-medium text-xs px-3 py-1.5 rounded-md transition-all duration-150 cursor-pointer">
     <span>Batal</span>
   </button>
   ```

### C. Badges, Tags & Status Pills
Pill badge bergaya Linear memiliki bentuk kapsul sempurna (`rounded-full`), border 1px transparan, dan ikon atau titik indikator menyala (*glowing dot*).
- **AI Match Badge (Violet)**:
  `bg-[#5E6AD2]/10 text-[#8B96E9] border border-[#5E6AD2]/25 px-3 py-1 rounded-full text-[11px] font-semibold inline-flex items-center gap-1.5`
- **Verified SHA-256 Badge (Emerald)**:
  `bg-[#10B981]/10 text-[#34D399] border border-[#10B981]/25 px-3 py-1 rounded-full text-[11px] font-semibold inline-flex items-center gap-1.5`
- **Free-Rider Flagged Badge (Crimson)**:
  `bg-[#EF4444]/15 text-[#F87171] border border-[#EF4444]/30 px-3 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1.5 animate-pulse`
- **SDG 8 UMKM Partner Badge (Sky Cyan)**:
  `bg-[#38BDF8]/10 text-[#7DD3FC] border border-[#38BDF8]/25 px-3 py-1 rounded-full text-[11px] font-semibold inline-flex items-center gap-1.5`

### D. Form Inputs, Selectors & Search Bar
- **Search Bar dengan Shortcut Badge**:
  Mengandung ikon pencarian di kiri dan indikator *shortcut keyboard* di kanan (misal: `⌘K` atau `/`).
  ```html
  <div class="relative w-full">
    <svg class="w-4 h-4 text-[#8A8F98] absolute left-3.5 top-3.5" />
    <input type="text" placeholder="Cari proyek atau keahlian..." class="w-full bg-[#0D0E11] text-[#F7F8F8] placeholder-[#5A5F6B] text-xs font-medium pl-10 pr-12 py-3 rounded-lg border border-white/10 focus:border-[#5E6AD2] focus:ring-2 focus:ring-[#5E6AD2]/20 focus:outline-none transition-all" />
    <kbd class="absolute right-3.5 top-3 bg-white/5 border border-white/10 rounded px-1.5 py-0.5 font-mono text-[10px] text-[#8A8F98]">⌘K</kbd>
  </div>
  ```

---

## 5. Pedoman Khusus Fitur Utama Verstack

### A. Matchmaking & Pencarian Proyek
- **Visualisasi Kompatibilitas Skill**: Skor pencocokan skill tidak ditampilkan seadanya, melainkan dalam bentuk *metric bar* atau *pill badge* yang bersinar (`94% Match` menggunakan warna Emerald Green `#10B981`, sedangkan `Partial Fit` menggunakan warna Amber `#F59E0B`).
- **Komitmen Waktu**: Ditampilkan dengan ikon jam bergaya simpel dan teks monospace (misal: `12 jam/mgg`) berwarna `#8A8F98`.

### B. Audit Trail Checkpoint & Ruang Kerja (Workspace)
- **Daftar Checkpoint Mingguan**: Mengadopsi tampilan *Linear Issue Tracker*.
  - Setiap baris checkpoint memiliki pembatas bawah tipis (`border-b border-white/5`).
  - Bagian sebelah kiri berisi nomor minggu dan deadline dalam format monospace.
  - Bagian kanan berisi status (*Selesai / Dalam Pengerjaan / Terlambat*) dan tombol CTA **Laporkan Progres** yang simpel namun kontras.
- **Panel Deteksi Free-Rider (Sistem Peringatan Dini)**:
  - Anggota tim yang berkontribusi normal ditampilkan dengan indikator hijau (`★ Aktif - 35%`).
  - Anggota dengan kontribusi <10% dari rata-rata tim secara otomatis diberi batas merah transparan (`border-[#EF4444]/40 bg-[#EF4444]/10`), teks merah `#F87171`, dan tanda peringatan `⚠ Flagged (Free-Rider)`. Hal ini memberikan efek psikologis akuntabilitas yang sangat kuat.

### C. Portofolio & Kredensial Kriptografis (SHA-256 Pass)
- **Konsep Digital Pass**: Kartu portofolio dibentuk seperti *Linear Digital Credential Pass* atau *Apple Wallet Card*.
- **Kotak Display SHA-256 Hash**:
  - Menggunakan latar belakang sangat gelap (`bg-[#08090A]`) dengan border `#374151` dan sudut melengkung (`rounded-xl`).
  - Teks string hash ditampilkan dalam font `JetBrains Mono` berwarna `#34D399` (hijau terminal modern) atau putih abu-abu dengan tombol salin (Copy Button) di sisi kanan yang merespons dengan centang hijau saat diklik.
- **QR Code Verification**: Ditempatkan di sudut kanan atas kartu dalam container putih bersudut melengkung halus untuk kontras pemindaian maksimal.

### D. Kemitraan SDG 8 UMKM Lokal
- Proyek UMKM ditampilkan dalam grid kartu dengan aksen biru langit / cyan (`#38BDF8`).
- **Pernyataan Simulasi Akademik**: Wajib mencantumkan penanda kurasi yang elegan agar pengguna memahami bahwa proyek tersebut adalah wadah praktik lapangan:
  `bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-medium px-3 py-1.5 rounded-lg inline-block mb-4`
  *"⚠ Simulasi — Proyek kurasi akademik percontohan"*

---

## 6. Layout & Struktur Halaman (Page Structure)

### A. Navigation Bar with Theme Switcher (Sticky Blur Header)
```html
<header class="sticky top-0 z-50 bg-[#08090A]/80 backdrop-blur-md border-b border-white/10 transition-all">
  <div class="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
    <!-- Logo & Title -->
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6872D9] to-[#5E6AD2] flex items-center justify-center shadow-[0_0_15px_rgba(94,106,210,0.4)]">
        <!-- Logo Icon -->
      </div>
      <span class="font-heading-3 text-sm font-bold text-[#F7F8F8] tracking-tight">Verstack</span>
    </div>
    
    <!-- Navigation Links -->
    <nav class="hidden md:flex items-center gap-1">
      <button class="px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#F7F8F8] bg-white/10 border border-white/10 shadow-xs">Beranda</button>
      <button class="px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#8A8F98] hover:text-[#F7F8F8] hover:bg-white/5 transition-all">Cari Tim</button>
      <button class="px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#8A8F98] hover:text-[#F7F8F8] hover:bg-white/5 transition-all">Checkpoint</button>
    </nav>
    
    <!-- Action Button & Theme Switcher -->
    <div class="flex items-center gap-2">
      <!-- Theme Switch Toggle Button -->
      <button aria-label="Toggle Theme" class="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#8A8F98] hover:text-[#F7F8F8] border border-white/10 transition-all cursor-pointer flex items-center justify-center">
        <!-- Sun Icon for Light Mode / Moon Icon for Dark Mode -->
        <svg class="w-4 h-4 text-current" />
      </button>
      <button class="bg-[#5E6AD2] hover:bg-[#6872D9] text-white text-xs font-medium px-4 py-2 rounded-lg shadow-sm border border-white/10">Mulai Sekarang</button>
    </div>
  </div>
</header>
```

### B. Hero Section (Linear Spotlight Layout)
- **Headline**: Menggunakan efek teks gradien kontras tinggi:
  `class="font-display text-4xl sm:text-6xl font-bold bg-gradient-to-r from-white via-white to-[#8A8F98] bg-clip-text text-transparent leading-[1.08] tracking-tight"`
- **Ambient Light Glow**: Di belakang hero, letakkan elemen dekoratif berupa cahaya pendar radial:
  ```html
  <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#5E6AD2]/20 to-[#10B981]/15 blur-[120px] rounded-full pointer-events-none -z-10"></div>
  ```
- **Product Mockup Showcase**: Tampilkan card interaktif yang melambangkan aktivitas real-time di dalam aplikasi (contoh: log konfirmasi pull request github, pembaruan status checkpoint tim, dan verifikasi skor AI).

---

## 7. Panduan Efek & Micro-Interactions

1. **Hover Lift**: Setiap elemen interaktif (kartu proyek, tombol) wajib menggunakan transisi `transform` dan `box-shadow`:
   `transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)]`
2. **Smooth Focus States**: Saat input form difokuskan, garis batas harus bertransisi secara halus ke warna violet Linear `#5E6AD2` dengan pendaran ring tipis di sekelilingnya tanpa menggeser tata letak elemen lain.
3. **Skeleton Loading / Pulse**: Gunakan animasi pendaran kelabu gelap (`animate-pulse bg-white/5 rounded-lg`) untuk memuat data sebelum ditampilkan dari API Laravel backend.

---

## 8. Ringkasan Checklist Implementasi Developer

- [x] Mendukung perpindahan dua tema (Dual Theme System: **Obsidian Dark Mode** `#08090A` dan **Crisp Linear Light Mode** `#FFFFFF`) secara dinamis menggunakan Theme Switcher di Navbar.
- [x] Latar belakang utama menggunakan `#08090A` untuk Dark Mode dan `#FFFFFF` untuk Light Mode dengan penyesuaian kontras otomatis pada teks dan surface card.
- [x] Seluruh border pembatas menggunakan garis tipis dengan opasitas rendah (`border-white/10` untuk gelap dan `#E5E7EB` untuk terang).
- [x] Mengurangi ketergantungan pada ikon warna-warni yang tidak perlu; gunakan ikon berskala monokromatik dengan aksen warna hanya untuk indikator status vital (Sukses, Peringatan, Bahaya, Info).
- [x] Penggunaan font sans-serif modern (**Space Grotesk** / **Inter**) untuk UI dan **JetBrains Mono** untuk string kriptografis SHA-256 dan log audit.
- [x] Efek *laser glow* dan *radial backdrop illumination* diterapkan dengan bijak dan performatif (menggunakan CSS blur dan opacity tanpa membebani rendering DOM).

---
*Pedoman sistem desain visual ini menjadi acuan mutlak bagi seluruh tim pengembang frontend (React/Vite/Tailwind) dan backend (Laravel API) untuk menjamin antarmuka Verstack berada pada standar estetika software developer modern tertinggi.*
