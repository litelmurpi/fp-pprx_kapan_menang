// Mock Data & Test Accounts for ACC Collaborate (Amikom Club Center)
// Synced with README.md and PRD specifications

export const testAccounts = [
  {
    id: 1,
    role: "Mahasiswa (Backend)",
    name: "Budi Santoso",
    email: "budi@students.amikom.ac.id",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi",
    prodi: "Informatika",
    freeHours: 12,
    skills: ["Laravel", "PHP", "MySQL", "REST API", "Git"],
    badge: "Backend Specialist",
    rating: 4.8,
    verifiedProjectsCount: 4,
    status: "Active"
  },
  {
    id: 2,
    role: "Mahasiswa (Design)",
    name: "Andi Wijaya",
    email: "andi@students.amikom.ac.id",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andi",
    prodi: "Sistem Informasi",
    freeHours: 15,
    skills: ["UI/UX Design", "Figma", "User Research", "Prototyping", "Tailwind CSS"],
    badge: "Creative Designer",
    rating: 4.9,
    verifiedProjectsCount: 5,
    status: "Active"
  },
  {
    id: 3,
    role: "Mahasiswa (Frontend)",
    name: "Citra Lestari",
    email: "citra@students.amikom.ac.id",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Citra",
    prodi: "Informatika",
    freeHours: 8,
    skills: ["React", "Vite", "Javascript", "Tailwind CSS", "HTML/CSS"],
    badge: "Frontend Engineer",
    rating: 4.7,
    verifiedProjectsCount: 3,
    status: "Active"
  },
  {
    id: 4,
    role: "Mahasiswa (Fullstack)",
    name: "Dewi Sartika",
    email: "dewi@students.amikom.ac.id",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dewi",
    prodi: "Teknologi Informasi",
    freeHours: 20,
    skills: ["Laravel", "React", "Node.js", "MySQL", "Docker", "Git"],
    badge: "Fullstack Leader",
    rating: 5.0,
    verifiedProjectsCount: 7,
    status: "Active"
  },
  {
    id: 5,
    role: "Mahasiswa (Flagged)",
    name: "Eko Prasetyo",
    email: "eko@students.amikom.ac.id",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eko",
    prodi: "Teknik Komputer",
    freeHours: 4,
    skills: ["HTML/CSS", "Python"],
    badge: "Terbatas (4 Jam/minggu)",
    rating: 3.1,
    verifiedProjectsCount: 1,
    status: "Flagged (Low Contribution)",
    flagReason: "Deteksi anomali: variance nilai evaluasi sejawat > 25% pada proyek sebelumnya"
  },
  {
    id: 6,
    role: "PIC UKM",
    name: "Sarah Fauziah",
    email: "sarah@acc.org",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    org: "Amikom Club Center (ACC)",
    badge: "Koordinator Proyek",
    status: "Staff"
  },
  {
    id: 7,
    role: "Dosen Reviewer",
    name: "Dr. Haryanto",
    email: "haryanto@amikom.ac.id",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Haryanto",
    departemen: "Fakultas Ilmu Komputer",
    badge: "Academic Reviewer",
    status: "Faculty"
  }
];

export const masterSkills = [
  { name: "Laravel", category: "Backend", color: "red" },
  { name: "React", category: "Frontend", color: "blue" },
  { name: "Tailwind CSS", category: "Frontend", color: "cyan" },
  { name: "UI/UX Design", category: "Design", color: "purple" },
  { name: "Figma", category: "Design", color: "pink" },
  { name: "MySQL", category: "Database", color: "amber" },
  { name: "REST API", category: "Backend", color: "emerald" },
  { name: "Node.js", category: "Backend", color: "green" },
  { name: "Git & GitHub", category: "DevOps", color: "orange" },
  { name: "User Research", category: "Design", color: "indigo" },
  { name: "Python", category: "Data / AI", color: "yellow" },
  { name: "Docker", category: "DevOps", color: "sky" }
];

export const mockProjects = [
  {
    id: 101,
    title: "Portal Kolaborasi Internal UKM ACC v2",
    category: "Edutech / Kampus",
    description: "Pengembangan sistem manajemen kegiatan dan absensi terintegrasi QR Code untuk organisasi kemahasiswaan Amikom Club Center.",
    picName: "Sarah Fauziah (PIC UKM)",
    requiredHours: 12,
    duration: "6 Minggu",
    matchScore: 96,
    status: "Merekrut Anggota",
    requiredSkills: ["Laravel", "React", "Tailwind CSS", "REST API"],
    currentMembers: [
      { name: "Dewi Sartika", role: "Project Lead / Fullstack", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dewi" },
      { name: "Andi Wijaya", role: "UI/UX Designer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andi" }
    ],
    slotsLeft: 2,
    checkpointsCount: 4,
    progress: 25,
    isUmkm: false
  },
  {
    id: 102,
    title: "Sistem Manajemen Inventori & POS Kopi Merapi",
    category: "Kemitraan UMKM (SDG 8)",
    description: "Aplikasi kasir berbasis cloud dengan pencatatan stok biji kopi real-time dan laporan laba rugi untuk UMKM Kopi Merapi Sleman.",
    picName: "Pak Budi Hartono (Owner UMKM) & Dr. Haryanto",
    requiredHours: 15,
    duration: "8 Minggu",
    matchScore: 88,
    status: "Berjalan",
    requiredSkills: ["Laravel", "MySQL", "UI/UX Design", "Tailwind CSS"],
    currentMembers: [
      { name: "Budi Santoso", role: "Backend Developer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi" },
      { name: "Citra Lestari", role: "Frontend Developer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Citra" }
    ],
    slotsLeft: 1,
    checkpointsCount: 5,
    progress: 60,
    isUmkm: true,
    sdgBadge: "SDG 8: Pekerjaan Layak & Pertumbuhan Ekonomi"
  },
  {
    id: 103,
    title: "Aplikasi Mobile Edukasi Sampah Digital Jogja Clean",
    category: "Green Tech / Komunitas",
    description: "Platform pemantauan tempat pembuangan sampah sementara (TPS) dan gamifikasi daur ulang bagi warga Yogyakarta.",
    picName: "Komunitas Jogja Lestari",
    requiredHours: 10,
    duration: "4 Minggu",
    matchScore: 74,
    status: "Menunggu Approval Dosen",
    requiredSkills: ["React", "UI/UX Design", "Figma", "Git"],
    currentMembers: [
      { name: "Andi Wijaya", role: "UI/UX Designer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andi" }
    ],
    slotsLeft: 3,
    checkpointsCount: 3,
    progress: 0,
    isUmkm: false
  },
  {
    id: 104,
    title: "E-Catalog & Booking Service Batik Sleman Heritage",
    category: "Kemitraan UMKM (SDG 8)",
    description: "Platform pameran motif batik klasik dengan sistem reservasi kunjungan wisata edukasi batik untuk wisatawan mancanegara.",
    picName: "Ibu Nurul (Pengrajin Batik)",
    requiredHours: 14,
    duration: "6 Minggu",
    matchScore: 92,
    status: "Merekrut Anggota",
    requiredSkills: ["Laravel", "React", "REST API", "Tailwind CSS"],
    currentMembers: [],
    slotsLeft: 4,
    checkpointsCount: 4,
    progress: 0,
    isUmkm: true,
    sdgBadge: "SDG 8: Pekerjaan Layak & Pertumbuhan Ekonomi"
  }
];

export const mockCheckpoints = [
  {
    id: 1,
    title: "Checkpoint 1: Wireframe & Database Schema Design",
    dueDate: "10 Juli 2026",
    status: "Selesai (Tepat Waktu)",
    progress: 100,
    assignees: ["Dewi Sartika", "Andi Wijaya"],
    submissionNote: "ERD tersimpan di MySQL dan prototipe hi-fi telah divalidasi oleh PIC UKM.",
    evidenceUrl: "https://github.com/acc-amikom/portal-acc-v2/pull/3",
    verifiedBy: "Dr. Haryanto"
  },
  {
    id: 2,
    title: "Checkpoint 2: Authentication & REST API Development",
    dueDate: "24 Juli 2026",
    status: "Selesai (Tepat Waktu)",
    progress: 100,
    assignees: ["Budi Santoso", "Dewi Sartika"],
    submissionNote: "Implementasi Laravel Sanctum dan 12 endpoint API utama selesai dengan testing.",
    evidenceUrl: "https://github.com/acc-amikom/portal-acc-v2/pull/8",
    verifiedBy: "Sarah Fauziah (PIC UKM)"
  },
  {
    id: 3,
    title: "Checkpoint 3: Frontend Integration & Matchmaking Dashboard",
    dueDate: "7 Agustus 2026",
    status: "Dalam Pengerjaan",
    progress: 65,
    assignees: ["Citra Lestari", "Andi Wijaya"],
    submissionNote: "Sedang mengintegrasikan endpoint /proyek dan halaman filter skill.",
    evidenceUrl: "https://github.com/acc-amikom/portal-acc-v2/tree/feature-matchmaking",
    verifiedBy: "Pending"
  },
  {
    id: 4,
    title: "Checkpoint 4: UAT Testing & Deployment to Production",
    dueDate: "21 Agustus 2026",
    status: "Belum Dimulai",
    progress: 0,
    assignees: ["Seluruh Tim"],
    submissionNote: "-",
    evidenceUrl: "-",
    verifiedBy: "-"
  }
];

export const mockPortfolio = {
  id: "CERT-ACC-2026-8941",
  studentName: "Budi Santoso",
  prodi: "S1 Informatika - Universitas Amikom Yogyakarta",
  projectTitle: "Sistem Manajemen Inventori & POS Kopi Merapi",
  role: "Lead Backend Developer",
  duration: "8 Minggu (120 Jam Kontribusi Tervalidasi)",
  completedDate: "28 Juni 2026",
  verificationHash: "8f9b42a1d3c7e098451f2b3a4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d",
  hashTimestamp: "2026-06-28T16:45:12+07:00",
  verifiedBy: [
    "Dr. Haryanto (Dosen Reviewer)",
    "Sarah Fauziah (Koordinator ACC)",
    "Pak Budi Hartono (Mitra UMKM Kopi Merapi)"
  ],
  stats: {
    peerScore: 4.85,
    onTimeRate: "100%",
    checkpointsCompleted: 5,
    varianceFlag: "Aman (< 5% deviasi)"
  },
  skillsDemonstrated: ["Laravel 11", "MySQL Optimization", "REST API Security", "Sanctum Auth", "Git Workflow"]
};

export const mockPeerEvalExample = {
  projectTitle: "Sistem Manajemen Inventori & POS Kopi Merapi",
  evaluator: "Dewi Sartika (Fullstack Leader)",
  evaluatee: "Eko Prasetyo (Anggota Tim)",
  metrics: {
    quality: 2.5,
    timeliness: 2.0,
    teamwork: 2.5,
    communication: 3.0
  },
  averageScore: 2.5,
  systemAlert: {
    triggered: true,
    type: "WARNING_VARIANCE",
    message: "Terdeteksi potensi Free-Riding: Rata-rata nilai evaluasi (2.5/5.0) berada 40% di bawah rata-rata tim (4.8/5.0). Sistem telah menahan pembuatan portofolio otomatis dan mengirim notifikasi investigasi ke Dosen Reviewer.",
    action: "Membutuhkan verifikasi log git commit & wawancara singkat."
  }
};
