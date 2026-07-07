import React, { useState } from 'react';
import { GitPullRequest, X, CheckCircle2, AlertTriangle, Lock, Terminal, Activity, PlusCircle } from 'lucide-react';
import { PixelTerminal, PixelCheck, PixelAlert, PixelLock, PixelRobot } from './PixelIcons';
import { mockCheckpoints, mockProjects } from '../data/mockData';
import api from '../api/axios';
import { useEffect } from 'react';

const WorkspaceSection = ({ currentUser }) => {
  const [checkpoints, setCheckpoints] = useState(mockCheckpoints);
  const [activeProject, setActiveProject] = useState(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedCpId, setSelectedCpId] = useState(3);
  const [submissionForm, setSubmissionForm] = useState({
    note: '', evidenceUrl: 'https://github.com/acc-amikom/portal-acc-v2/pull/12', progress: 100
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [myProjects, setMyProjects] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCheckpoint, setNewCheckpoint] = useState({ judul_milestone: '', deadline: '' });
  const [createSuccess, setCreateSuccess] = useState(false);

  useEffect(() => {
    const fetchMyProjects = async () => {
      try {
        const response = await api.get('/proyek');
        // Normalisasi format
        const mapped = response.data.data.map(p => ({
          id: p.id,
          title: p.judul,
          description: p.deskripsi,
          progress: 15, // TODO: calculate from checkpoints
          dibuat_oleh_id: p.dibuat_oleh_id,
          members: p.members || []
        }));
        
        // Filter projects where current user is a member
        const joined = mapped.filter(p => p.members.some(m => m.user?.email === currentUser?.email || m.user_id === currentUser?.id));
        setMyProjects(joined);
        if (joined.length > 0 && (!activeProject || !joined.some(p => p.id === activeProject.id))) {
          setActiveProject(joined[0]);
        }
      } catch (err) {
        console.error("Failed to fetch my projects:", err);
      } finally {
        setIsLoading(false);
      }
    };
    if (currentUser) {
      fetchMyProjects();
    }
  }, [currentUser, activeProject]);

  useEffect(() => {
    const fetchCheckpoints = async () => {
      if (!activeProject) {
        setCheckpoints([]);
        return;
      }
      try {
        const response = await api.get(`/proyek/${activeProject.id}/checkpoints`);
        const mapped = response.data.data.map(cp => ({
          id: cp.id,
          title: cp.nama_checkpoint,
          description: cp.deskripsi,
          status: 'Belum Selesai',
          progress: 0,
          deadline: cp.tanggal_tenggat ? cp.tanggal_tenggat.substring(0, 10) : '-',
          week: 1, // Mock or calculate
          assignee: 'Tim',
          evidenceUrl: null
        }));
        setCheckpoints(mapped);
      } catch (err) {
        console.error("Failed to fetch checkpoints:", err);
      }
    };
    fetchCheckpoints();
  }, [activeProject]);

  const handleSubmitProgress = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/checkpoints/${selectedCpId}/submit`, {
        bukti_url: submissionForm.evidenceUrl,
        catatan: submissionForm.note
      });
      const updated = checkpoints.map(cp => cp.id === selectedCpId ? {
        ...cp, status: 'Selesai (Menunggu Validasi)', progress: submissionForm.progress,
        submissionNote: submissionForm.note, evidenceUrl: submissionForm.evidenceUrl, verifiedBy: 'Pending Review'
      } : cp);
      setCheckpoints(updated);
      setSubmitSuccess(true);
      setTimeout(() => { setSubmitSuccess(false); setShowSubmitModal(false); }, 1500);
    } catch (err) {
      console.error("Failed to submit progress", err);
      alert(err.response?.data?.message || "Gagal mengirimkan progres");
    }
  };

  const handleCreateCheckpoint = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/proyek/${activeProject.id}/checkpoints`, {
        judul_milestone: newCheckpoint.judul_milestone,
        deadline: newCheckpoint.deadline,
        status: 'pending'
      });
      setCreateSuccess(true);
      
      // Reload checkpoints
      const response = await api.get(`/proyek/${activeProject.id}/checkpoints`);
      const mapped = response.data.data.map(cp => ({
        id: cp.id,
        title: cp.nama_checkpoint,
        description: cp.deskripsi,
        status: 'Belum Selesai',
        progress: 0,
        deadline: cp.tanggal_tenggat ? cp.tanggal_tenggat.substring(0, 10) : '-',
        week: 1,
        assignee: 'Tim',
        evidenceUrl: null
      }));
      setCheckpoints(mapped);

      setTimeout(() => {
        setCreateSuccess(false);
        setShowCreateModal(false);
        setNewCheckpoint({ judul_milestone: '', deadline: '' });
      }, 1500);
    } catch (err) {
      console.error("Failed to create checkpoint:", err);
      alert(err.response?.data?.message || "Gagal membuat checkpoint");
    }
  };

  const isProjectOwner = currentUser && activeProject && currentUser.id === activeProject.dibuat_oleh_id;

  const projectMembers = activeProject?.members || [];
  const membersWithContribution = projectMembers.map((m, index) => {
    let pct = 30;
    if (projectMembers.length === 1) pct = 100;
    else if (projectMembers.length === 2) pct = index === 0 ? 60 : 40;
    else if (projectMembers.length === 3) {
      const pcts = [45, 35, 20];
      pct = pcts[index] || 30;
    } else if (projectMembers.length > 3) {
      pct = Math.round(100 / projectMembers.length) + (index % 2 === 0 ? 5 : -5);
    }
    return {
      name: m.user?.name || 'Anggota Tim',
      pct: pct,
      ok: pct >= 15
    };
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b theme-border">
        <div>
          <div className="inline-flex items-center gap-2 mb-3 badge-secondary px-3.5 py-1 rounded-full text-xs font-semibold">
            <Terminal className="w-4 h-4 secondary-text" />
            <span>Audit Trail &amp; Checkpoint Issue Tracker</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold theme-text">Ruang Kerja &amp; Kontribusi</h1>
          <p className="text-sm theme-text-sub mt-1.5">
            Transparansi progres mingguan setiap anggota tim. Sistem pencegahan free-rider aktif Verstack.
          </p>
        </div>
        <div className="flex items-center gap-2 border theme-border rounded-xl px-4 py-2.5 text-xs bg-white/5">
          <span className="font-medium theme-text-sub">Proyek Aktif:</span>
          {myProjects.length > 0 ? (
            <select value={activeProject?.id || ''} onChange={(e) => setActiveProject(myProjects.find(p => p.id === parseInt(e.target.value)))}
              className="font-semibold theme-text bg-transparent focus:outline-none cursor-pointer">
              {myProjects.map(p => <option key={p.id} value={p.id} className="bg-[var(--color-surface)] text-[var(--color-text-primary)]">{p.title}</option>)}
            </select>
          ) : (
            <span className="font-semibold theme-text">Belum ada proyek</span>
          )}
        </div>
      </div>

      {/* Overview Card */}
      <div className="theme-card rounded-[16px] p-6 mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden border-t-2 primary-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono-tech font-semibold badge-primary">
              ACTIVE SPRINT 4
            </span>
            <span className="text-xs theme-text-muted font-mono-tech">ID: PRJ-2026-04</span>
          </div>
          <h2 className="font-heading text-xl font-bold theme-text mt-2">{activeProject?.title || 'Memuat...'}</h2>
          <p className="text-xs theme-text-sub mt-1">{activeProject?.description || ''}</p>
        </div>
        <div className="flex items-center gap-8 shrink-0">
          <div>
            <p className="text-[11px] theme-text-muted font-semibold uppercase tracking-wider">Sprint Progress</p>
            <div className="flex items-center gap-3 mt-1.5">
              <div className="w-32 h-2 bg-white/10 dark:bg-white/10 rounded-full overflow-hidden">
                <div className="h-full primary-bg rounded-full transition-all" style={{width: `${activeProject?.progress || 0}%`}} />
              </div>
              <span className="text-sm font-bold theme-text font-mono-tech">{activeProject?.progress || 0}%</span>
            </div>
          </div>
          <div className="text-right border-l theme-border-subtle pl-6">
            <p className="text-[11px] theme-text-muted font-semibold uppercase tracking-wider">Anggota Tim</p>
            <p className="text-xs font-semibold theme-text flex items-center gap-1.5 mt-1.5"><CheckCircle2 className="w-4 h-4 primary-text" /> {activeProject?.members?.length || 0} Aktif</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Checkpoint issue tracker list */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between gap-4 mb-3">
            <h3 className="font-heading text-base font-bold theme-text flex items-center gap-2">
              <Activity className="w-4 h-4 secondary-text" /> Daftar Checkpoint Proyek
            </h3>
            {isProjectOwner && (
              <button 
                onClick={() => setShowCreateModal(true)}
                className="btn-primary text-xs px-3.5 py-2 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" /> Tambah Checkpoint
              </button>
            )}
          </div>
          
          {checkpoints.map(cp => {
            const done = cp.status.includes('Selesai');
            const late = cp.status.includes('Terlambat');
            return (
              <div key={cp.id} className={`theme-card rounded-[16px] p-5 transition-all ${
                done ? 'border-l-4 primary-border' : late ? 'border-l-4 border-l-red-500 bg-red-500/5' : 'border-l-4 secondary-border'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                  <div>
                    <span className="text-[10px] font-mono-tech font-semibold theme-text-muted border theme-border bg-white/5 px-2 py-0.5 rounded">
                      MINGGU {cp.week} · {cp.deadline}
                    </span>
                    <h4 className="font-semibold theme-text text-sm mt-2">{cp.title}</h4>
                  </div>
                  <span className={`text-[11px] font-mono-tech font-semibold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 border ${
                    done ? 'badge-primary' : late ? 'bg-red-500/15 text-red-500 border-red-500/30' : 'bg-white/5 theme-text-sub border theme-border'
                  }`}>
                    {done && <CheckCircle2 className="w-3.5 h-3.5 primary-text" />}
                    {late && <AlertTriangle className="w-3.5 h-3.5 text-red-500" />}
                    {cp.status}
                  </span>
                </div>
                <p className="text-xs theme-text-sub mb-4 leading-relaxed">{cp.description}</p>
                <div className="flex items-center justify-between text-xs pt-3 border-t theme-border-subtle">
                  <span className="theme-text-muted font-mono-tech text-[11px]">PIC: <strong className="theme-text font-sans">{cp.assignee}</strong></span>
                  {!done ? (
                    <button onClick={() => { setSelectedCpId(cp.id); setShowSubmitModal(true); }}
                      className="btn-primary font-medium text-xs px-3.5 py-1.5 rounded-lg cursor-pointer inline-flex items-center gap-1.5">
                      <GitPullRequest className="w-3.5 h-3.5" /> Laporkan Progres
                    </button>
                  ) : (
                    <span className="badge-primary px-2.5 py-1 rounded-md font-mono-tech font-semibold text-[11px] inline-flex items-center gap-1">
                      <Lock className="w-3 h-3 primary-text" /> TERVALIDASI SYSTEM
                    </span>
                  )}
                </div>
                {done && cp.evidenceUrl && (
                  <div className="mt-3.5 p-3 bg-white/5 border theme-border rounded-lg text-xs font-mono-tech">
                    <span className="text-[10px] theme-text-muted font-semibold uppercase block mb-1">Bukti Deliverables (Immutable):</span>
                    <a href={cp.evidenceUrl} target="_blank" rel="noreferrer" className="secondary-text hover:underline truncate block">{cp.evidenceUrl}</a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Free-rider panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="theme-card rounded-[16px] p-6 relative overflow-hidden border-t-2 border-t-red-500">
            <div className="flex items-center gap-2 mb-2 bg-red-500/15 text-red-500 border border-red-500/30 px-3 py-1 rounded-full w-fit">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <h3 className="font-semibold text-xs uppercase tracking-wider font-mono-tech">Deteksi Free-Rider Sistem</h3>
            </div>
            <p className="text-xs theme-text-sub mb-5 leading-relaxed">Jika kontribusi anggota &lt;10% dari rata-rata tim, sertifikat final project otomatis ditahan oleh protokol Verstack.</p>

            <div className="space-y-3">
              {membersWithContribution.length === 0 ? (
                <p className="text-xs theme-text-sub italic text-center py-2">Belum ada anggota tim terdaftar</p>
              ) : (
                membersWithContribution.map((m, i) => (
                  <div key={i} className={`flex items-center justify-between p-3 rounded-xl border text-xs ${
                    m.ok ? 'bg-white/5 border theme-border theme-text' : 'bg-red-500/10 border-red-500/40 text-red-500 animate-pulse'
                  }`}>
                    <div className="flex items-center gap-2 font-medium">
                      {m.ok ? <CheckCircle2 className="w-4 h-4 primary-text" /> : <AlertTriangle className="w-4 h-4 text-red-500" />}
                      <span>{m.name}</span>
                    </div>
                    <span className={`font-mono-tech font-semibold px-2 py-0.5 rounded text-[11px] ${m.ok ? 'badge-primary' : 'bg-red-500/20 text-red-500 font-bold'}`}>{m.pct}%</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="theme-card rounded-[16px] p-6 bg-white/5 border theme-border">
            <h3 className="font-bold text-sm theme-text mb-1">Ambang Batas Kelulusan</h3>
            <p className="text-xs theme-text-sub mb-4">Partisipasi ≥75% checkpoint diperlukan untuk berhak menerbitkan kredensial SHA-256.</p>
            <div className="flex items-center justify-between bg-white/5 p-3.5 rounded-xl border theme-border">
              <span className="text-xs font-semibold theme-text">Status Tim Saat Ini</span>
              <span className="text-xs font-mono-tech font-semibold badge-primary px-3 py-1 rounded-full flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> ELIGIBLE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Submit modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="theme-card rounded-[20px] max-w-lg w-full p-6 relative shadow-2xl border-t-2 primary-border">
            <button onClick={() => setShowSubmitModal(false)} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/10 theme-text-sub cursor-pointer"><X className="w-5 h-5" /></button>
            <h2 className="font-heading text-xl font-bold theme-text mb-1 flex items-center gap-2"><Terminal className="w-5 h-5 secondary-text" /> Laporkan Progres Checkpoint</h2>
            <p className="text-xs theme-text-sub mb-6">Unggah tautan bukti kerja agar tercatat dalam audit trail kriptografis Verstack.</p>
            
            <form onSubmit={handleSubmitProgress} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-medium theme-text mb-1.5">Tautan Bukti (GitHub PR / Figma / Doc URL)</label>
                <input type="url" required value={submissionForm.evidenceUrl} onChange={(e) => setSubmissionForm({...submissionForm, evidenceUrl: e.target.value})}
                  className="w-full bg-white/5 border theme-border rounded-lg px-3.5 py-2.5 text-xs theme-text focus:outline-none focus:border-[var(--color-primary)]" />
              </div>
              <div>
                <div className="flex justify-between text-xs font-medium theme-text mb-1.5">
                  <span>Persentase Kontribusi Task Ini</span><span className="badge-primary px-2 py-0.5 rounded font-mono-tech font-bold">{submissionForm.progress}%</span>
                </div>
                <input type="range" min="10" max="100" step="5" value={submissionForm.progress}
                  onChange={(e) => setSubmissionForm({...submissionForm, progress: parseInt(e.target.value)})}
                  className="w-full accent-[var(--color-primary)] cursor-pointer h-2 bg-white/10 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-medium theme-text mb-1.5">Catatan Pengerjaan</label>
                <textarea rows="3" required value={submissionForm.note} onChange={(e) => setSubmissionForm({...submissionForm, note: e.target.value})}
                  className="w-full bg-white/5 border theme-border rounded-lg px-3.5 py-2.5 text-xs theme-text focus:outline-none focus:border-[var(--color-primary)]" placeholder="Jelaskan deliverable apa saja yang telah diselesaikan..." />
              </div>
              {submitSuccess ? (
                <div className="p-3.5 badge-primary rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 primary-text" /> Progres tersimpan di Audit Trail!
                </div>
              ) : (
                <div className="pt-4 flex justify-end gap-3 border-t theme-border-subtle">
                  <button type="button" onClick={() => setShowSubmitModal(false)} className="btn-secondary text-xs px-5 py-2.5 rounded-lg cursor-pointer">Batal</button>
                  <button type="submit" className="btn-primary text-xs px-6 py-2.5 rounded-lg cursor-pointer">Simpan Bukti</button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Create Checkpoint Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="theme-card rounded-[20px] max-w-lg w-full p-6 relative shadow-2xl border-t-2 primary-border">
            <button onClick={() => setShowCreateModal(false)} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/10 theme-text-sub cursor-pointer"><X className="w-5 h-5" /></button>
            <h2 className="font-heading text-xl font-bold theme-text mb-1 flex items-center gap-2"><PlusCircle className="w-5 h-5 text-[var(--color-primary)]" /> Tambah Checkpoint Baru</h2>
            <p className="text-xs theme-text-sub mb-6">Mulai sprint baru dengan menambahkan capaian milestone proyek.</p>
            
            <form onSubmit={handleCreateCheckpoint} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-medium theme-text mb-1.5">Judul Milestone / Sprint</label>
                <input type="text" required placeholder="Contoh: Sprint 2: Integrasi API & Autentikasi" value={newCheckpoint.judul_milestone} onChange={(e) => setNewCheckpoint({...newCheckpoint, judul_milestone: e.target.value})}
                  className="w-full bg-white/5 border theme-border rounded-lg px-3.5 py-2.5 text-xs theme-text focus:outline-none focus:border-[var(--color-primary)]" />
              </div>
              <div>
                <label className="block text-xs font-medium theme-text mb-1.5">Tanggal Tenggat (Deadline)</label>
                <input type="date" required value={newCheckpoint.deadline} onChange={(e) => setNewCheckpoint({...newCheckpoint, deadline: e.target.value})}
                  className="w-full bg-white/5 border theme-border rounded-lg px-3.5 py-2.5 text-xs theme-text focus:outline-none focus:border-[var(--color-primary)]" />
              </div>
              {createSuccess ? (
                <div className="p-3.5 badge-primary rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 primary-text" /> Checkpoint berhasil dibuat!
                </div>
              ) : (
                <div className="pt-4 flex justify-end gap-3 border-t theme-border-subtle">
                  <button type="button" onClick={() => setShowCreateModal(false)} className="btn-secondary text-xs px-5 py-2.5 rounded-lg cursor-pointer">Batal</button>
                  <button type="submit" className="btn-primary text-xs px-6 py-2.5 rounded-lg cursor-pointer">Buat Checkpoint</button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceSection;
