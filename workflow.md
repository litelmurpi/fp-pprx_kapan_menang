# Verstack — Full Codebase Workflow Documentation

Platform kolaborasi proyek mahasiswa AMIKOM dengan sistem anti free-rider, matchmaking tim berbasis skill, dan portofolio kriptografis.

---

## 1. Arsitektur Umum

```mermaid
graph LR
    subgraph Frontend["Frontend (React + Vite)"]
        A[App.jsx] --> B[AuthContext]
        A --> C[Navbar]
        A --> D[Pages & Sections]
    end
    
    subgraph Backend["Backend (Laravel 12 + Sanctum)"]
        E[api.php Routes] --> F[Controllers]
        F --> G[Eloquent Models]
        G --> H[(MySQL Database)]
    end
    
    D -->|axios /api/*| E
    B -->|Bearer Token| E
```

### Tech Stack

| Layer | Teknologi |
|---|---|
| Frontend | React 18, Vite, React Router, Axios, Lenis (smooth scroll), Lucide Icons |
| Backend | Laravel 12, Sanctum (token auth), Eloquent ORM |
| Database | MySQL |
| Auth | Bearer token via `localStorage` |

---

## 2. Data Model (ERD)

```mermaid
erDiagram
    User ||--o| Mahasiswa : "has one"
    User ||--o{ Proyek : "creates (pembuat_id)"
    User ||--o{ ApprovalPic : "reviews (pic_id)"
    
    Mahasiswa ||--o{ ProfilSkill : "has many"
    Mahasiswa ||--o{ AnggotaTim : "joins many"
    
    ProfilSkill }o--|| Skill : "references"
    
    Proyek }o--|| KategoriProyek : "belongs to"
    Proyek ||--o{ KebutuhanSkill : "requires"
    Proyek ||--o{ AnggotaTim : "has members"
    Proyek ||--o{ Checkpoint : "has milestones"
    Proyek ||--o{ PeerEvaluasi : "has evaluations"
    Proyek ||--o{ ApprovalPic : "needs approval"
    
    KebutuhanSkill }o--|| Skill : "references"
    
    AnggotaTim ||--o{ SubmisiCheckpoint : "submits"
    AnggotaTim ||--o{ PeerEvaluasi : "gives (pemberi_id)"
    AnggotaTim ||--o{ PeerEvaluasi : "receives (penerima_id)"
    AnggotaTim ||--o| RekamKontribusi : "has record"
    
    Checkpoint ||--o{ SubmisiCheckpoint : "has submissions"

    User {
        int id PK
        string name
        string email
        string password
        string role
    }
    Mahasiswa {
        int id PK
        int user_id FK
        string nim
        string prodi
        string minat_bidang
        int jam_luang_per_minggu
    }
    Proyek {
        int id PK
        string judul
        string deskripsi
        int pembuat_id FK
        date tanggal_mulai
        date tanggal_selesai
        string status
        int kategori_proyek_id FK
        bool label_simulasi
    }
    AnggotaTim {
        int id PK
        int proyek_id FK
        int mahasiswa_id FK
        string peran
        string status
        date tanggal_join
    }
    Checkpoint {
        int id PK
        int proyek_id FK
        string judul_milestone
        date deadline
        string status
    }
    PeerEvaluasi {
        int id PK
        int proyek_id FK
        int pemberi_id FK
        int penerima_id FK
        int skor_kontribusi
        string komentar
    }
    RekamKontribusi {
        int id PK
        int anggota_tim_id FK
        float skor_rata_rata
        float persentase_ketepatan_waktu
        string status_validasi
        string flag_alasan
        string hash_data
    }
```

### User Roles

| Role | Hak Akses |
|---|---|
| `mahasiswa` | Register, login, edit profil/skill, cari tim, join proyek, submit checkpoint, peer evaluation |
| `pic_ukm` | Approve/reject proyek `waiting_approval`, validasi rekam kontribusi flagged |
| `dosen` | Approve/reject proyek, validasi rekam kontribusi flagged |
| `admin` | Semua hak akses |

### Status Flow — AnggotaTim (Keanggotaan)

```mermaid
stateDiagram-v2
    [*] --> mengajukan : Mahasiswa apply (joinTeam)
    [*] --> diundang : PIC invite (addMember)
    mengajukan --> aktif : PIC accept (respondMembership)
    mengajukan --> ditolak : PIC reject
    diundang --> aktif : Mahasiswa accept
    diundang --> ditolak : Mahasiswa reject
```

### Status Flow — Proyek

```mermaid
stateDiagram-v2
    [*] --> open : Kategori tanpa approval
    [*] --> waiting_approval : Kategori perlu approval
    waiting_approval --> open : PIC/Dosen approve
    waiting_approval --> rejected : PIC/Dosen reject
    open --> in_progress : Proyek berjalan
    in_progress --> selesai : PIC klik "Selesaikan Proyek"
    open --> selesai : PIC klik "Selesaikan Proyek"
```

---

## 3. Frontend — Component Tree & Routing

```mermaid
graph TD
    App["App.jsx (BrowserRouter)"] --> Login["/login → LoginPage"]
    App --> Register["/register → LoginPage (mode=register)"]
    App --> Main["/ → MainApp"]
    
    Main --> Nav[Navbar]
    Main --> Footer[Footer]
    
    Main --> TabHome{"activeTab = 'home'"}
    TabHome -->|logged in| Dashboard[DashboardSection]
    TabHome -->|guest| Landing[SaaSLandingPage]
    
    Main --> TabMatch{"activeTab = 'matchmaking'"}
    TabMatch --> Matchmaking[MatchmakingSection]
    
    Main --> TabWork{"activeTab = 'workspace'"}
    TabWork --> Workspace[WorkspaceSection]
    
    Main --> TabPeer{"activeTab = 'peer-eval'"}
    TabPeer --> PeerEval[PeerEvalSection]
    
    Main --> TabUmkm{"activeTab = 'umkm'"}
    TabUmkm --> Umkm[UmkmSection]
```

> [!IMPORTANT]
> Navigasi utama berbasis **tab state** (`activeTab`), bukan React Router paths. Semua halaman terproteksi ditampilkan secara conditional di dalam `MainApp`.

### Key Frontend Files

| File | Fungsi |
|---|---|
| [App.jsx](file:///var/www/html/fp/frontend/src/App.jsx) | Entry point, routing, tab state, user mapping, theme, Lenis |
| [AuthContext.jsx](file:///var/www/html/fp/frontend/src/contexts/AuthContext.jsx) | Login/register/logout/refreshUser, token management |
| [axios.js](file:///var/www/html/fp/frontend/src/api/axios.js) | Axios instance, auto-attach Bearer token, 401 redirect |
| [Navbar.jsx](file:///var/www/html/fp/frontend/src/components/Navbar.jsx) | Navigation, theme toggle, profile dropdown, availability modal |
| [DashboardSection.jsx](file:///var/www/html/fp/frontend/src/components/DashboardSection.jsx) | Dashboard: stats, created/joined projects, pending member requests |
| [MatchmakingSection.jsx](file:///var/www/html/fp/frontend/src/pages/MatchmakingSection.jsx) | JobStreet-style split layout, project browsing, quick-apply join |
| [WorkspaceSection.jsx](file:///var/www/html/fp/frontend/src/components/WorkspaceSection.jsx) | Sprint tracker, checkpoint CRUD, submission, validation, activity log |
| [PeerEvalSection.jsx](file:///var/www/html/fp/frontend/src/components/PeerEvalSection.jsx) | 360° peer eval sliders, SHA-256 portfolio card (mock data) |
| [UmkmSection.jsx](file:///var/www/html/fp/frontend/src/components/UmkmSection.jsx) | UMKM SDG-8 partnership, project listing, partner registration |
| [ProfileEditModal.jsx](file:///var/www/html/fp/frontend/src/components/ProfileEditModal.jsx) | Edit name, NIM, prodi, skills, availability |
| [CandidateDiscoveryModal.jsx](file:///var/www/html/fp/frontend/src/components/CandidateDiscoveryModal.jsx) | PIC-side: discover & invite candidates for project |
| [PeerEvaluationModal.jsx](file:///var/www/html/fp/frontend/src/components/PeerEvaluationModal.jsx) | Submit peer evaluation for completed projects |
| [AvailabilityModal.jsx](file:///var/www/html/fp/frontend/src/components/AvailabilityModal.jsx) | Weekly time schedule editor |

---

## 4. Backend — API Route Map

### Public Routes (no auth)

| Method | Endpoint | Controller | Deskripsi |
|---|---|---|---|
| `POST` | `/api/register` | AuthController@register | Registrasi user + mahasiswa |
| `POST` | `/api/login` | AuthController@login | Login, return Sanctum token |
| `GET` | `/api/proyek` | ProyekController@index | List semua proyek (open/in_progress/selesai) |
| `GET` | `/api/portfolio/{nim}` | RekamKontribusiController@getPublicPortfolio | Portfolio publik by NIM |
| `GET` | `/api/health` | Closure | Health check |

### Authenticated Routes (`auth:sanctum`)

#### Auth & Profile
| Method | Endpoint | Controller | Deskripsi |
|---|---|---|---|
| `POST` | `/api/logout` | AuthController@logout | Revoke token |
| `GET` | `/api/me` | AuthController@me | Get current user + mahasiswa + skills |
| `GET` | `/api/mahasiswa/profile` | MahasiswaController@profile | Detail mahasiswa profile |
| `PUT` | `/api/mahasiswa/profile` | MahasiswaController@updateProfile | Update name, NIM, prodi, jam_luang |
| `GET` | `/api/mahasiswa/skills` | MahasiswaController@getSkills | List profil skills user |
| `POST` | `/api/mahasiswa/skills` | MahasiswaController@addOrUpdateSkill | Add/update skill + level |
| `DELETE` | `/api/mahasiswa/skills/{id}` | MahasiswaController@removeSkill | Remove profil skill |
| `GET` | `/api/skills/master` | MahasiswaController@masterSkills | Master list all skills |

#### Proyek & Approval
| Method | Endpoint | Controller | Deskripsi |
|---|---|---|---|
| `POST` | `/api/proyek` | ProyekController@store | Create proyek + skills + checkpoints |
| `GET` | `/api/proyek/{id}` | ProyekController@show | Detail proyek + members + checkpoints |
| `PUT` | `/api/proyek/{id}` | ProyekController@update | Update proyek (owner only) |
| `DELETE` | `/api/proyek/{id}` | ProyekController@destroy | Delete proyek (owner only) |
| `GET` | `/api/proyek/categories` | ProyekController@getCategories | List kategori proyek |
| `GET` | `/api/proyek/waiting-approval` | ProyekController@getWaitingApproval | List proyek pending approval (dosen/pic) |
| `POST` | `/api/proyek/{id}/decide-approval` | ProyekController@decideApproval | Approve/reject (dosen/pic) |

#### Matchmaking & Team
| Method | Endpoint | Controller | Deskripsi |
|---|---|---|---|
| `GET` | `/api/proyek/{id}/candidates` | MatchmakingController@getCandidates | Ranked candidate list (skill_score 80% + minat 10% + onboarding 10%) |
| `POST` | `/api/proyek/{id}/join` | MatchmakingController@joinTeam | Mahasiswa apply → status `mengajukan` |
| `POST` | `/api/proyek/{id}/members` | MatchmakingController@addMember | PIC invite → status `diundang` |
| `DELETE` | `/api/proyek/{id}/members/{memberId}` | MatchmakingController@removeMember | Remove member (owner only) |
| `POST` | `/api/proyek/{id}/members/{memberId}/respond` | MatchmakingController@respondMembership | Accept/reject join request or invitation |

#### Checkpoints & Submissions
| Method | Endpoint | Controller | Deskripsi |
|---|---|---|---|
| `GET` | `/api/proyek/{proyekId}/checkpoints` | CheckpointController@getProjectCheckpoints | List checkpoints + user submission status |
| `POST` | `/api/proyek/{proyekId}/checkpoints` | CheckpointController@store | Create checkpoint (owner only) |
| `GET` | `/api/checkpoints/{id}` | CheckpointController@show | Detail checkpoint + all submissions |
| `PUT` | `/api/checkpoints/{id}` | CheckpointController@update | Update/validate checkpoint (owner) |
| `DELETE` | `/api/checkpoints/{id}` | CheckpointController@destroy | Delete checkpoint (owner) |
| `POST` | `/api/checkpoints/{checkpointId}/submit` | SubmisiCheckpointController@submitProgress | Submit progress + evidence link |
| `GET` | `/api/checkpoints/{checkpointId}/submissions` | SubmisiCheckpointController@getSubmissions | Get all submissions for checkpoint |

#### Peer Evaluation
| Method | Endpoint | Controller | Deskripsi |
|---|---|---|---|
| `GET` | `/api/proyek/{proyekId}/evaluasi` | PeerEvaluasiController@getProjectEvaluations | List all evaluations in project |
| `POST` | `/api/proyek/{proyekId}/evaluasi` | PeerEvaluasiController@submitEvaluation | Submit peer eval (hanya jika proyek `selesai`) |

#### Portfolio & Validation
| Method | Endpoint | Controller | Deskripsi |
|---|---|---|---|
| `GET` | `/api/portfolio` | RekamKontribusiController@getStudentPortfolio | My portfolio (student) |
| `GET` | `/api/reports/flagged` | RekamKontribusiController@getFlaggedReports | Flagged reports (dosen/pic) |
| `POST` | `/api/reports/{id}/validate` | RekamKontribusiController@validateReport | Validate flagged report (dosen/pic) |

---

## 5. Feature Workflows (End-to-End)

### 🔐 Workflow 1: Authentication

```mermaid
sequenceDiagram
    actor User
    participant FE as LoginPage
    participant Ctx as AuthContext
    participant API as /api
    participant DB as Database
    
    User->>FE: Fill email + password
    FE->>Ctx: login(email, password)
    Ctx->>API: POST /login
    API->>DB: Find user, verify password
    DB-->>API: User + Mahasiswa + Skills
    API-->>Ctx: { access_token, user }
    Ctx->>Ctx: localStorage.setItem('access_token')
    Ctx->>Ctx: setUser(user)
    Ctx-->>FE: { success: true }
    FE->>FE: navigate('/')
    
    Note over FE,Ctx: On refresh, AuthContext calls GET /me to restore session
```

**Catatan**: Register flow identik, POST `/register` akan membuat User + Mahasiswa sekaligus.

---

### 📊 Workflow 2: Dashboard (Home — Logged In)

```mermaid
sequenceDiagram
    actor User
    participant Dash as DashboardSection
    participant API as /api
    
    User->>Dash: Open tab 'home' (logged in)
    Dash->>API: GET /proyek
    API-->>Dash: All projects with members & pending_members
    
    Dash->>Dash: Filter: myCreatedProjects (pembuat_id = me)
    Dash->>Dash: Filter: myJoinedProjects (member user_id = me)
    Dash->>Dash: Extract: allPendingRequests from my projects
    Dash->>Dash: Calculate: matchScore, stats
    
    Dash->>Dash: Render stats cards, project grids, pending requests
    
    alt PIC accepts/rejects a pending member
        User->>Dash: Click Terima/Tolak
        Dash->>API: POST /proyek/{id}/members/{memberId}/respond {action: accept|reject}
        API-->>Dash: Updated member status
        Dash->>Dash: Refresh data
    end
```

---

### 🔍 Workflow 3: Matchmaking & Team Finding

```mermaid
sequenceDiagram
    actor Mahasiswa
    participant Match as MatchmakingSection
    participant API as /api
    
    Mahasiswa->>Match: Open tab 'matchmaking'
    Match->>API: GET /proyek
    API-->>Match: Project list (with members, skills_needed)
    
    Match->>Match: Filter by category & search
    Match->>Match: Calculate skill match % (client-side)
    Match->>Match: Render master-detail split layout
    
    Mahasiswa->>Match: Select project → see detail right pane
    Mahasiswa->>Match: Fill role + motivation → Submit "Quick Apply"
    Match->>API: POST /proyek/{id}/join { peran: "Frontend Developer" }
    API->>API: Create AnggotaTim(status='mengajukan')
    API-->>Match: Success
    Match->>Match: Show success → redirect to workspace
```

**Skor Matchmaking Backend (Candidate Discovery)**:
```
skor_akhir = (skill_score × 0.80) + (minat_bonus × 0.10) + (onboarding_bonus × 0.10)
```
- `skill_score` = rata-rata (level_keahlian / 5.0) per skill yang cocok
- `minat_bonus` = 1.0 jika minat_bidang match kategori proyek
- `onboarding_bonus` = 1.0 jika belum punya proyek aktif

---

### 🛠️ Workflow 4: Workspace & Sprint Checkpoints

```mermaid
sequenceDiagram
    actor Member
    actor PIC
    participant WS as WorkspaceSection
    participant API as /api
    
    Member->>WS: Open tab 'workspace'
    WS->>API: GET /proyek (filter joined)
    WS->>API: GET /proyek/{id}/checkpoints
    WS->>API: GET /proyek/{id} (detail + submissions)
    API-->>WS: Checkpoints + submission status + activity logs
    
    Note over Member,WS: Member submits progress
    Member->>WS: Click "Laporkan Progres" on checkpoint
    WS->>WS: Open submit modal (link + note)
    Member->>WS: Fill evidence URL + catatan
    WS->>API: POST /checkpoints/{cpId}/submit
    API-->>WS: Success
    WS->>WS: Update status → "Menunggu Validasi"
    
    Note over PIC,WS: PIC validates checkpoint
    PIC->>WS: Click "Validasi Progress"
    WS->>API: PUT /checkpoints/{cpId} { status: 'completed' }
    API-->>WS: Success
    WS->>WS: Update status → "Selesai" (TERVALIDASI SYSTEM)
    
    Note over PIC,WS: PIC creates new checkpoint
    PIC->>WS: Click "Tambah Checkpoint"
    WS->>API: POST /proyek/{id}/checkpoints { judul_milestone, deadline }
    API-->>WS: New checkpoint created
    
    Note over PIC,WS: PIC discovers candidates
    PIC->>WS: Click "Cari Kandidat"
    WS->>WS: Open CandidateDiscoveryModal
    WS->>API: GET /proyek/{id}/candidates
    API-->>WS: Ranked candidate list
    PIC->>WS: Invite candidate
    WS->>API: POST /proyek/{id}/members { mahasiswa_id, peran }
    
    Note over PIC,WS: PIC completes project
    PIC->>WS: Click "Selesaikan Proyek"
    WS->>API: PUT /proyek/{id} { status: 'selesai' }
    WS->>WS: Enable "Evaluasi Tim" button
```

---

### ⭐ Workflow 5: Peer Evaluation & Anti Free-Rider

```mermaid
sequenceDiagram
    actor Member
    participant Modal as PeerEvaluationModal
    participant API as /api
    participant Engine as PeerEvaluasiController
    
    Note over Member: Proyek harus berstatus 'selesai'
    Member->>Modal: Open "Evaluasi Tim" dari Workspace
    Modal->>API: GET /proyek/{id} (load members)
    
    loop For each teammate
        Member->>Modal: Rate skor 1-5
        Modal->>API: POST /proyek/{id}/evaluasi { penerima_anggota_id, skor_kontribusi, komentar }
        API->>Engine: Save evaluation
    end
    
    Engine->>Engine: Check if ALL N×(N-1) evaluations submitted
    
    alt All evaluations complete
        Engine->>Engine: Calculate avg score per member
        Engine->>Engine: Check variance (stdDev)
        
        alt stdDev < 0.5 AND mean > 4.0
            Engine->>Engine: FLAG: kongkalikong
            Engine->>Engine: status_validasi = 'menunggu_acc_dosen'
        else stdDev > 2.0
            Engine->>Engine: FLAG: outlier
            Engine->>Engine: status_validasi = 'menunggu_acc_dosen'
        else Normal
            Engine->>Engine: status_validasi = 'final'
        end
        
        Engine->>Engine: Calculate persentase_ketepatan_waktu
        Engine->>Engine: Generate SHA-256 hash_data
        Engine->>Engine: Create/update RekamKontribusi
    end
```

**Anti Free-Rider Detection**:
- **Kongkalikong** (collusion): Semua member saling beri skor tinggi (stdDev < 0.5 AND mean > 4.0) → flagged untuk review dosen
- **Outlier**: Skor sangat bervariasi (stdDev > 2.0) → flagged untuk review dosen
- Dosen/PIC dapat mereview flagged reports via `POST /reports/{id}/validate`

---

### 🏪 Workflow 6: UMKM SDG-8 Partnership

```mermaid
sequenceDiagram
    actor User
    participant Umkm as UmkmSection
    participant API as /api
    
    User->>Umkm: Open tab 'umkm'
    Umkm->>API: GET /proyek
    API-->>Umkm: All projects
    Umkm->>Umkm: Filter projects with category containing 'umkm'
    Umkm->>Umkm: Render UMKM project cards with skill match %
    
    alt User clicks "Daftarkan UMKM Mitra"
        alt Not logged in
            Umkm->>Umkm: Show AuthAlertModal
        else Logged in
            User->>Umkm: Fill form (nama UMKM, owner, location, need)
            Umkm->>API: POST /proyek { judul: "Digitalisasi {name}", deskripsi, kategori_proyek_id }
            API-->>Umkm: Created
            Umkm->>Umkm: Show success
        end
    end
```

---

### 📜 Workflow 7: Portfolio & Contribution Records

```mermaid
sequenceDiagram
    actor Student
    actor Dosen
    participant API as /api
    
    Note over Student: Get my portfolio
    Student->>API: GET /portfolio
    API-->>Student: List RekamKontribusi for all my projects
    
    Note over Dosen: Review flagged reports
    Dosen->>API: GET /reports/flagged
    API-->>Dosen: Reports with status 'menunggu_acc_dosen'
    Dosen->>API: POST /reports/{id}/validate { status_validasi: 'final' | 'draft', catatan }
    API->>API: Update status + append catatan + regenerate hash
    
    Note over Student: Public portfolio by NIM
    Student->>API: GET /portfolio/{nim}
    API-->>Student: Only 'final' validated records (tamper-proof SHA-256)
```

---

## 6. Ringkasan Key Business Rules

| Rule | Implementasi |
|---|---|
| Mahasiswa hanya bisa join jika proyek `open` | `MatchmakingController@joinTeam` cek `status === 'open'` |
| Peer eval hanya bisa setelah proyek `selesai` | `PeerEvaluasiController@submitEvaluation` cek `status === 'selesai'` |
| Tidak bisa evaluasi diri sendiri | `pemberi_id !== penerima_id` check |
| Proyek UMKM/Komunitas butuh approval dosen | `kategoriProyek.memerlukan_approval` → status `waiting_approval` |
| Free-rider detection otomatis | Variance analysis setelah semua N×(N-1) evaluasi masuk |
| Portofolio publik hanya tampil yang `final` | `getPublicPortfolio` filter `status_validasi === 'final'` |
| SHA-256 hash sebagai proof of record | Digenerate saat `RekamKontribusi` dibuat/diupdate |
| Project owner otomatis jadi "Project Leader" | `ProyekController@store` auto-create `AnggotaTim(status='aktif')` |
