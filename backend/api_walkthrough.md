# Walkthrough Uji Coba API (Postman Testing)

Dokumen ini menjelaskan langkah-langkah untuk melakukan uji coba seluruh endpoint API Platform Kolaborasi Tim Kampus menggunakan file Postman Collection yang telah disertakan di [postman_collection.json](file:///var/www/html/fp/backend/postman_collection.json).

---

## 1. Persiapan Awal

1. **Jalankan Laravel Dev Server**:
   Jalankan command berikut di folder `/var/www/html/fp/backend`:
   ```bash
   php artisan serve
   ```
   *Secara default, server akan berjalan di `http://localhost:8000`.*

2. **Database Seeding**:
   Pastikan database telah di-refresh dan diisi dengan data awal:
   ```bash
   php artisan migrate:fresh --seed
   ```

3. **Import ke Postman**:
   - Buka Postman.
   - Klik tombol **Import** di kiri atas.
   - Pilih file `postman_collection.json` dari folder `/var/www/html/fp/backend`.
   - Secara otomatis variable `base_url` akan bernilai `http://localhost:8000/api`.

---

## 2. Kredensial Uji Coba (Seeded Users)

Semua akun menggunakan password: `password`

| Nama | Email | Role | Deskripsi |
|---|---|---|---|
| Admin Center | `admin@acc.org` | `admin` | Administrator Utama |
| Dr. Haryanto | `haryanto@amikom.ac.id` | `dosen` | PIC / Dosen Validator |
| Sarah Fauziah | `sarah@acc.org` | `pic_ukm` | PIC UKM Center |
| Budi Santoso | `budi@students.amikom.ac.id` | `mahasiswa` | Mahasiswa (Minat: Backend) |
| Andi Wijaya | `andi@students.amikom.ac.id` | `mahasiswa` | Mahasiswa (Minat: Design) |
| Citra Lestari | `citra@students.amikom.ac.id` | `mahasiswa` | Mahasiswa (Minat: Frontend) |
| Dewi Sartika | `dewi@students.amikom.ac.id` | `mahasiswa` | Mahasiswa (Minat: Fullstack) |
| Eko Prasetyo | `eko@students.amikom.ac.id` | `mahasiswa` | Mahasiswa (🔴 Jam luang: 4 jam/minggu) |

---

## 3. Skenario Alur Uji Coba (Step-by-Step)

### Skenario A: Login & Kelola Profil Mahasiswa
1. Buka folder **Authentication** di Postman → jalankan request **Login** dengan data Budi (default body).
   - *Script test akan secara otomatis menangkap token dan menyimpannya di variable `{{token}}`.*
2. Jalankan request **Get Current User (Me)** untuk memeriksa role dan relasi profil mahasiswa.
3. Buka folder **Student Profile** → jalankan request **Update Profile Info** untuk mengubah data Budi.
4. Jalankan request **Add or Update Skill** untuk menambahkan keahlian ke profil Budi (Gunakan ID skill dari request **Get Master Skills List**).

---

### Skenario B: Manajemen Proyek & Approval PIC
1. Budi membuat proyek baru kategori "UMKM" (Kategori ID = 4 yang memerlukan approval) dengan memicu request **Create Project** di folder **Project Management**.
   - Karena kategori UMKM memerlukan approval, status proyek otomatis diset sebagai `waiting_approval`.
2. Login kembali menggunakan kredensial Dosen (`haryanto@amikom.ac.id`).
3. Buka folder **PIC Approval** → jalankan request **Get Waiting Approval Projects** untuk melihat daftar proyek menunggu ACC.
4. Jalankan request **PIC Decide Approval** dengan status `approved` untuk meng-ACC proyek tersebut. Status proyek kini berubah menjadi `open`.

---

### Skenario C: Matchmaking & Pembentukan Tim
1. Login kembali sebagai Budi (`budi@students.amikom.ac.id`).
2. Buka folder **Matchmaking & Teams** → jalankan request **Get Matching Candidates List (Weighted Ranking)** untuk mencari kandidat terbaik untuk proyek Budi.
   - Hasil akan diurutkan berdasarkan skor kecocokan tertinggi.
   - Calon anggota yang belum pernah ikut proyek (seperti Andi, Citra) akan mendapat dorongan skor dari `onboarding_bonus`.
   - Eko Prasetyo akan menampilkan label `🔴 Waktu Terbatas` karena jam luang < 5 jam/minggu.
3. Jalankan request **Add Member to Team (Invite)** untuk merekrut Andi (mahasiswa_id = 2) dan Citra (mahasiswa_id = 3).

---

### Skenario D: Checkpoints & Progres
1. Budi (Project Leader) membuat target checkpoint di folder **Checkpoints** dengan request **Create Project Checkpoint** (Sprint 1).
2. Andi login ke Postman, lalu jalankan request **Submit Progress to Checkpoint** untuk mencatatkan kontribusi progresnya.
3. Budi memantau progres lewat request **Get Checkpoint Submissions list**.

---

### Skenario E: Peer Evaluation & Deteksi Kolusi (Variance Check)
1. Setelah proyek selesai, seluruh anggota tim harus saling memberikan penilaian kontribusi (Budi menilai Andi dan Citra, Andi menilai Budi dan Citra, Citra menilai Budi dan Andi).
2. Buka folder **Peer Evaluation & Portfolio** → jalankan request **Submit Peer Evaluation**.
3. **Mekanisme Variance Check**:
   - Jika Anda mengirimkan nilai 5 (skor tertinggi) dari seluruh anggota ke semua anggota secara seragam, sistem akan mendeteksi **kolusi/kongkalikong**.
   - Rekam kontribusi otomatis di-generate dengan status `menunggu_acc_dosen` dan deskripsi ringkasan dibubuhi tanda `[FLAGGED]`.
4. Dosen login (`haryanto@amikom.ac.id`) → jalankan request **Get Flagged Reports (Dosen)** untuk melihat rekam kontribusi bermasalah.
5. Dosen memicu request **PIC Validate Flagged Report** dengan status `final` untuk memverifikasi kebenaran kontribusi setelah evaluasi manual.
6. Mahasiswa login kembali dan melihat portofolio mereka yang kini berstatus `final` dan telah ter-hash aman lewat request **Get My Verified Portfolio**.
