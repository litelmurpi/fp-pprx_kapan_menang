import React, { useState, useEffect } from 'react';
import { 
  Briefcase, Clock, Users, ArrowRight, CheckCircle2, 
  XCircle, UserCheck, Sparkles, TrendingUp, PlusCircle, 
  Check, X, AlertCircle, ArrowUpRight, Compass, Shield
} from 'lucide-react';
import api from '../api/axios';

const DashboardSection = ({ currentUser, setActiveTab }) => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/proyek');
      // Map properties matching backend structure
      const mapped = response.data.data.map(p => ({
        id: p.id,
        title: p.judul,
        category: p.kategori,
        description: p.deskripsi,
        picName: p.pembuat ? p.pembuat.name : 'Unknown',
        dibuat_oleh_id: p.dibuat_oleh_id,
        requiredHours: 12,
        duration: p.tenggat_waktu ? `Target: ${p.tenggat_waktu}` : '6 Minggu',
        status: p.status,
        requiredSkills: p.skills_needed ? p.skills_needed.map(s => s.name) : [],
        currentMembers: p.members || [],
        pendingMembers: p.pending_members || [],
        slotsLeft: Math.max(0, (p.max_anggota || 4) - (p.members ? p.members.length : 0)),
        isUmkm: p.label_simulasi
      }));
      setProjects(mapped);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
      setErrorMsg("Gagal memuat data dashboard.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleDecision = async (projectId, memberId, action) => {
    try {
      setErrorMsg('');
      setSuccessMsg('');
      const response = await api.post(`/proyek/${projectId}/members/${memberId}/respond`, { action });
      setSuccessMsg(action === 'accept' ? 'Berhasil menerima anggota ke dalam tim!' : 'Berhasil menolak permohonan gabung.');
      
      // Refresh data
      fetchDashboardData();
      
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      console.error("Decision failed:", err);
      setErrorMsg(err.response?.data?.message || 'Gagal memproses keputusan.');
    }
  };

  // Filter projects
  const myCreatedProjects = projects.filter(p => p.dibuat_oleh_id === currentUser.id);
  const myJoinedProjects = projects.filter(p => 
    p.currentMembers.some(m => m.user_id === currentUser.id) && p.dibuat_oleh_id !== currentUser.id
  );
  
  // Pending applicants for projects created by me
  const allPendingRequests = myCreatedProjects.flatMap(p => 
    p.pendingMembers.map(pm => ({
      ...pm,
      projectTitle: p.title,
      projectId: p.id
    }))
  );

  // Statistics calculations
  const totalActiveProjects = myCreatedProjects.length + myJoinedProjects.length;
  const committedHours = currentUser.freeHours || 12;
  const matchScorePercent = 88; // Default mock match rating based on completed portfolio items

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-16 space-y-8 animate-in fade-in duration-200">
      
      {/* Toast notifications */}
      {successMsg && (
        <div className="fixed bottom-5 right-5 z-50 p-4 bg-emerald-500/90 backdrop-blur-md text-zinc-950 text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg border border-emerald-400/20 animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}
      {errorMsg && (
        <div className="fixed bottom-5 right-5 z-50 p-4 bg-red-500/90 backdrop-blur-md text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg border border-red-400/20 animate-in slide-in-from-bottom-5 duration-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* User Greeting Block */}
      <div className="theme-card p-6 sm:p-8 rounded-[24px] border-t-2 primary-border bg-gradient-to-r from-white/[0.02] to-transparent flex flex-col sm:flex-row items-center sm:justify-between gap-6 shadow-xl relative overflow-hidden">
        {/* Glow decorative effect */}
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-[var(--color-primary)]/10 blur-[80px]" />
        
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left z-10">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            className="w-16 h-16 rounded-full border border-white/20 shadow-md p-0.5"
          />
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold theme-text leading-tight">
              Selamat Datang Kembali, <span className="primary-text">{currentUser.name.split(' ')[0]}</span>!
            </h1>
            <p className="text-xs theme-text-sub mt-1.5 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="font-mono-tech uppercase tracking-wider text-[10px] badge-primary px-2 py-0.5 rounded">
                {currentUser.badge}
              </span>
              <span>• {currentUser.email}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5 z-10">
          <button 
            onClick={() => setActiveTab('matchmaking')}
            className="btn-primary text-xs px-5 py-3 rounded-xl font-bold flex items-center gap-2 cursor-pointer shadow-lg hover:scale-102 transition-transform"
          >
            <Compass className="w-4 h-4" /> Cari Tim Baru
          </button>
        </div>
      </div>

      {/* Bento Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="theme-card p-5 rounded-2xl flex items-center justify-between hover:bg-white/[0.03] transition-colors">
          <div className="space-y-1">
            <p className="text-[10px] theme-text-muted uppercase tracking-wider font-mono-tech">Proyek Aktif</p>
            <p className="text-2xl font-bold theme-text">{totalActiveProjects}</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border theme-border">
            <Briefcase className="w-5 h-5 text-[var(--color-primary)]" />
          </div>
        </div>

        <div className="theme-card p-5 rounded-2xl flex items-center justify-between hover:bg-white/[0.03] transition-colors">
          <div className="space-y-1">
            <p className="text-[10px] theme-text-muted uppercase tracking-wider font-mono-tech">Ketersediaan</p>
            <p className="text-2xl font-bold theme-text">{committedHours} jam<span className="text-xs font-normal text-zinc-500">/mgg</span></p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border theme-border">
            <Clock className="w-5 h-5 text-[var(--color-primary)]" />
          </div>
        </div>

        <div className="theme-card p-5 rounded-2xl flex items-center justify-between hover:bg-white/[0.03] transition-colors">
          <div className="space-y-1">
            <p className="text-[10px] theme-text-muted uppercase tracking-wider font-mono-tech">Match Score</p>
            <p className="text-2xl font-bold text-emerald-400">{matchScorePercent}%</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border theme-border">
            <Sparkles className="w-5 h-5 text-emerald-400" />
          </div>
        </div>

        <div className="theme-card p-5 rounded-2xl flex items-center justify-between hover:bg-white/[0.03] transition-colors">
          <div className="space-y-1">
            <p className="text-[10px] theme-text-muted uppercase tracking-wider font-mono-tech">Reputasi / Eval</p>
            <p className="text-2xl font-bold text-sky-400">9.2<span className="text-xs font-normal text-zinc-500">/10</span></p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border theme-border">
            <TrendingUp className="w-5 h-5 text-sky-400" />
          </div>
        </div>

      </div>

      {/* Main Grid: My Projects (Left) & Requests/Sidebar (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Projects List (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Projects Created by Me */}
          <div className="space-y-4">
            <h2 className="font-heading text-lg font-bold theme-text flex items-center gap-2">
              <span>Proyek Kolaborasi Saya (PIC)</span>
              <span className="text-xs font-normal theme-text-muted font-mono">({myCreatedProjects.length})</span>
            </h2>
            
            {isLoading ? (
              <div className="theme-card p-8 text-center rounded-2xl border-dashed">
                <div className="w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-xs theme-text-sub">Memuat proyek...</p>
              </div>
            ) : myCreatedProjects.length === 0 ? (
              <div className="theme-card p-8 text-center rounded-2xl border-dashed">
                <Briefcase className="w-8 h-8 theme-text-muted mx-auto mb-2 opacity-50" />
                <p className="text-sm font-semibold theme-text">Kamu belum memublikasikan proyek</p>
                <p className="text-xs theme-text-sub mt-1 mb-4">Mulai bangun tim kolaborasi riil untuk solusi teknologi mitra.</p>
                <button 
                  onClick={() => setActiveTab('matchmaking')} 
                  className="btn-primary text-xs px-4 py-2.5 rounded-lg font-bold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" /> Buat Proyek Pertama
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {myCreatedProjects.map(proj => (
                  <div key={proj.id} className="theme-card p-5 rounded-2xl flex flex-col justify-between hover:border-[var(--color-border-hover)] transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] font-semibold theme-text-sub bg-white/5 border theme-border px-2 py-0.5 rounded">
                          {proj.category}
                        </span>
                        {proj.status === 'open' ? (
                          <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">Active Recruiting</span>
                        ) : (
                          <span className="text-[9px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">{proj.status}</span>
                        )}
                      </div>
                      <h3 className="text-sm font-bold theme-text mb-1 line-clamp-1">{proj.title}</h3>
                      <p className="text-xs theme-text-sub line-clamp-2 leading-relaxed mb-4">{proj.description}</p>
                    </div>

                    <div className="pt-3 border-t theme-border flex items-center justify-between">
                      <span className="text-[10px] theme-text-muted flex items-center gap-1 font-mono-tech">
                        <Users className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                        {proj.currentMembers.length} Anggota aktif
                      </span>
                      <button 
                        onClick={() => setActiveTab('workspace')} 
                        className="text-xs font-semibold text-[var(--color-primary)] hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        Kelola <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Joined Projects */}
          <div className="space-y-4 pt-4">
            <h2 className="font-heading text-lg font-bold theme-text flex items-center gap-2">
              <span>Proyek yang Saya Ikuti</span>
              <span className="text-xs font-normal theme-text-muted font-mono">({myJoinedProjects.length})</span>
            </h2>

            {isLoading ? (
              <div className="theme-card p-8 text-center rounded-2xl border-dashed">
                <div className="w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-xs theme-text-sub">Memuat proyek...</p>
              </div>
            ) : myJoinedProjects.length === 0 ? (
              <div className="theme-card p-6 text-center rounded-xl border-dashed">
                <Compass className="w-8 h-8 theme-text-muted mx-auto mb-2 opacity-50" />
                <p className="text-xs theme-text-sub">Kamu belum bergabung di tim proyek manapun saat ini.</p>
                <button 
                  onClick={() => setActiveTab('matchmaking')} 
                  className="text-xs text-[var(--color-primary)] hover:underline font-bold mt-2 cursor-pointer"
                >
                  Cari tim di direktori &rarr;
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {myJoinedProjects.map(proj => (
                  <div key={proj.id} className="theme-card p-5 rounded-2xl flex flex-col justify-between hover:border-[var(--color-border-hover)] transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] font-semibold theme-text-sub bg-white/5 border theme-border px-2 py-0.5 rounded">
                          {proj.category}
                        </span>
                        <span className="text-[9px] font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20">Kontributor</span>
                      </div>
                      <h3 className="text-sm font-bold theme-text mb-1 line-clamp-1">{proj.title}</h3>
                      <p className="text-xs theme-text-sub line-clamp-2 leading-relaxed mb-4">{proj.description}</p>
                    </div>

                    <div className="pt-3 border-t theme-border flex items-center justify-between">
                      <span className="text-[10px] theme-text-muted flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        PIC: {proj.picName}
                      </span>
                      <button 
                        onClick={() => setActiveTab('workspace')} 
                        className="text-xs font-semibold text-[var(--color-primary)] hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        Buka Workspace <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Applications/Requests approvals (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="theme-card p-6 rounded-[20px] bg-gradient-to-b from-white/[0.01] to-transparent space-y-4">
            <h3 className="font-heading text-base font-bold theme-text flex items-center gap-2 pb-3 border-b theme-border">
              <UserCheck className="w-5 h-5 text-[var(--color-primary)]" />
              <span>Permintaan Gabung Masuk</span>
            </h3>

            {isLoading ? (
              <div className="text-center py-6">
                <div className="w-6 h-6 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-[11px] theme-text-sub">Memeriksa...</p>
              </div>
            ) : allPendingRequests.length === 0 ? (
              <div className="py-8 text-center text-xs theme-text-sub space-y-2">
                <Shield className="w-8 h-8 theme-text-muted mx-auto opacity-40 mb-1" />
                <p className="font-semibold">Belum ada permintaan baru</p>
                <p className="px-4">Permintaan pendaftaran mahasiswa ke proyek kolaborasimu akan muncul di panel ini.</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
                {allPendingRequests.map((req, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/5 border theme-border space-y-3 hover:bg-white/[0.08] transition-all">
                    <div>
                      <p className="text-[10px] theme-text-muted font-bold font-mono-tech truncate uppercase tracking-wider mb-1">
                        👉 {req.projectTitle}
                      </p>
                      <h4 className="text-sm font-bold theme-text">{req.user?.name}</h4>
                      <p className="text-[10px] theme-text-sub font-mono-tech mt-0.5">
                        {req.nim} • {req.prodi}
                      </p>
                    </div>

                    <div className="px-3 py-2 rounded-lg bg-black/25 border theme-border flex items-center justify-between text-[11px] font-mono-tech">
                      <span className="theme-text-sub">Peran:</span>
                      <span className="font-bold text-[var(--color-primary)]">{req.peran}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1.5">
                      <button 
                        onClick={() => handleDecision(req.projectId, req.anggota_tim_id, 'accept')}
                        className="w-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-zinc-950 font-bold py-2 rounded-lg text-[11px] inline-flex items-center justify-center gap-1 transition-all cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" /> Terima
                      </button>
                      <button 
                        onClick={() => handleDecision(req.projectId, req.anggota_tim_id, 'reject')}
                        className="w-full bg-white/5 hover:bg-red-500/10 hover:text-red-400 border border-white/10 hover:border-red-500/30 text-zinc-300 font-semibold py-2 rounded-lg text-[11px] inline-flex items-center justify-center gap-1 transition-all cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" /> Tolak
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};

export default DashboardSection;
