# Platform Kolaborasi Tim Kampus dengan Rekam Jejak Terverifikasi

Platform ini dirancang untuk mempermudah kolaborasi proyek tim di lingkungan kampus. Fitur utama mencakup pencocokan anggota tim berbasis keahlian (*skill matchmaking*), pelacakan kontribusi individual secara transparan untuk mencegah *free-riding*, serta penilaian rekan sejawat (*peer evaluation*) terstruktur yang menghasilkan portofolio terverifikasi secara otomatis oleh sistem.

Proyek ini menggunakan arsitektur terpisah:
- **Backend**: Laravel API (PHP 8.3+) dengan database SQLite
- **Frontend**: React + Vite (Node.js 18+ / npm 11+)

---

## 🛠️ Prasyarat (Prerequisites)

Pastikan perangkat Anda sudah terinstal perkakas berikut:
- **PHP** (minimal versi 8.2, direkomendasikan 8.3)
- **Composer** (minimal versi 2.0)
- **Node.js** (minimal versi 18, direkomendasikan 20+)
- **npm** (atau package manager lain seperti yarn/pnpm)
- Ekstensi PHP yang dibutuhkan Laravel (seperti `sqlite3`, `mbstring`, `xml`, dll.)

---

## 🚀 Langkah Inisialisasi Proyek

Ikuti panduan di bawah ini setelah Anda melakukan klon repositori (`git clone`).

### 1. Inisialisasi Backend (Laravel)

Buka terminal baru dan masuk ke direktori `backend`:

```bash
cd backend
```

#### A. Salin berkas lingkungan (.env)
Salin konfigurasi default dari `.env.example` ke berkas baru bernama `.env`:
```bash
cp .env.example .env
```
*(Secara default, Laravel menggunakan koneksi database SQLite yang tidak memerlukan konfigurasi server database tambahan).*

#### B. Pasang dependensi Composer
Unduh dan pasang semua pustaka PHP yang dibutuhkan:
```bash
composer install
```

#### C. Generate Application Key
Jalankan perintah berikut untuk menghasilkan kunci enkripsi aplikasi Laravel:
```bash
php artisan key:generate
```

#### D. Siapkan Database SQLite
Buat berkas database SQLite kosong di folder database:
```bash
touch database/database.sqlite
```

#### E. Jalankan Migrasi & Seeding Data
Jalankan migrasi untuk membuat tabel-tabel di database serta mengisinya dengan data awal (*seeder*):
```bash
php artisan migrate:fresh --seed
```
> [!NOTE]
> Database seeder akan membuat beberapa data uji otomatis (seperti kategori keahlian, kategori proyek, dan akun pengguna).

#### F. Jalankan Server Pengembangan
Mulai server lokal Laravel:
```bash
php artisan serve
```
Secara default, API backend akan berjalan di **`http://127.0.0.1:8000`**.

---

### 2. Inisialisasi Frontend (React + Vite)

Buka jendela terminal baru (tetap biarkan server backend berjalan), lalu masuk ke direktori `frontend`:

```bash
cd frontend
```

#### A. Pasang dependensi Node.js
Pasang semua pustaka Javascript yang dibutuhkan:
```bash
npm install
```

#### B. Jalankan Server Pengembangan
Mulai server lokal React + Vite:
```bash
npm run dev
```
Secara default, frontend akan berjalan di **`http://localhost:5173`** (atau port lain yang ditunjukkan di terminal Anda).

---

## 🧑‍💻 Akun Uji Coba (Kredensial Default)

Setelah proses seeding database selesai, Anda dapat masuk ke dalam platform menggunakan akun uji coba berikut (semua akun menggunakan password: `password`):

| Peran (Role) | Email | Nama Pengguna | Deskripsi Peran |
| --- | --- | --- | --- |
| **Mahasiswa (Backend)** | `budi@students.amikom.ac.id` | Budi Santoso | Mahasiswa dengan fokus backend, jam luang 12 jam/minggu |
| **Mahasiswa (Design)** | `andi@students.amikom.ac.id` | Andi Wijaya | Mahasiswa dengan fokus UI/UX design, jam luang 15 jam/minggu |
| **Mahasiswa (Frontend)** | `citra@students.amikom.ac.id` | Citra Lestari | Mahasiswa dengan fokus frontend, jam luang 8 jam/minggu |
| **Mahasiswa (Fullstack)** | `dewi@students.amikom.ac.id` | Dewi Sartika | Mahasiswa dengan fokus fullstack, jam luang 20 jam/minggu |
| **Mahasiswa (Backend - Flagged)** | `eko@students.amikom.ac.id` | Eko Prasetyo | Mahasiswa dengan waktu sangat terbatas (4 jam/minggu) |
| **PIC UKM** | `sarah@acc.org` | Sarah Fauziah | Penanggung Jawab dari Amikom Club Center |
| **Dosen** | `haryanto@amikom.ac.id` | Dr. Haryanto | Dosen Pengampu / Reviewer Proyek |
| **Admin** | `admin@acc.org` | Admin Center | Administrator sistem utama |

---

## 📖 Dokumentasi & Pengujian API

Aplikasi ini dilengkapi dengan halaman dokumentasi API interaktif yang indah dengan gaya *Minimalist UI*.

- **Link Dokumentasi API**: [http://localhost:8000/api-documentation](http://localhost:8000/api-documentation) (diakses saat server backend berjalan)
- **Unduh Postman Collection**: Anda dapat mengunduh berkas Postman Collection langsung dari [http://localhost:8000/api-documentation/postman](http://localhost:8000/api-documentation/postman) atau menggunakan file yang sudah disediakan di path `backend/postman_collection.json`.
