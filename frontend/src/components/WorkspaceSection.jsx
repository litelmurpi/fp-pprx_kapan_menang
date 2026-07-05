import React, { useState } from 'react';
import { GitPullRequest, X, CheckCircle2, AlertTriangle, Lock, Terminal, Activity } from 'lucide-react';
import { PixelTerminal, PixelCheck, PixelAlert, PixelLock, PixelRobot } from './PixelIcons';
import { mockCheckpoints, mockProjects } from '../data/mockData';

const WorkspaceSection = ({ currentUser }) => {
  const [checkpoints, setCheckpoints] = useState(mockCheckpoints);
  const [activeProject, setActiveProject] = useState(mockProjects[0]);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedCpId, setSelectedCpId] = useState(3);
  const [submissionForm, setSubmissionForm] = useState({
    note: '', evidenceUrl: 'https://github.com/acc-amikom/portal-acc-v2/pull/12', progress: 100
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmitProgress = (e) => {
    e.preventDefault();
    const updated = checkpoints.map(cp => cp.id === selectedCpId ? {
      ...cp, status: 'Selesai (Tepat Waktu)', progress: submissionForm.progress,
      submissionNote: submissionForm.note, evidenceUrl: submissionForm.evidenceUrl, verifiedBy: 'Pending Review'
    } : cp);
    setCheckpoints(updated);
    setSubmitSuccess(true);
    setTimeout(() => { setSubmitSuccess(false); setShowSubmitModal(false); }, 1500);
  };

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
          <select value={activeProject.id} onChange={(e) => setActiveProject(mockProjects.find(p => p.id === parseInt(e.target.value)))}
            className="font-semibold theme-text bg-transparent focus:outline-none cursor-pointer">
            {mockProjects.slice(0, 3).map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
          </select>
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
          <h2 className="font-heading text-xl font-bold theme-text mt-2">{activeProject.title}</h2>
          <p className="text-xs theme-text-sub mt-1">{activeProject.description}</p>
        </div>
        <div className="flex items-center gap-8 shrink-0">
          <div>
            <p className="text-[11px] theme-text-muted font-semibold uppercase tracking-wider">Sprint Progress</p>
            <div className="flex items-center gap-3 mt-1.5">
              <div className="w-32 h-2 bg-white/10 dark:bg-white/10 rounded-full overflow-hidden">
                <div className="h-full primary-bg rounded-full transition-all" style={{width: `${activeProject.progress}%`}} />
              </div>
              <span className="text-sm font-bold theme-text font-mono-tech">{activeProject.progress}%</span>
            </div>
          </div>
          <div className="text-right border-l theme-border-subtle pl-6">
            <p className="text-[11px] theme-text-muted font-semibold uppercase tracking-wider">Anggota Tim</p>
            <p className="text-xs font-semibold theme-text flex items-center gap-1.5 mt-1.5"><CheckCircle2 className="w-4 h-4 primary-text" /> 4 Aktif</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Checkpoint issue tracker list */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="font-heading text-base font-bold theme-text flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 secondary-text" /> Daftar Checkpoint Mingguan
          </h3>
          
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
              {[
                {name: 'Budi Santoso', pct: 38, ok: true},
                {name: 'Dewi Lestari', pct: 35, ok: true},
                {name: 'Eko Saputra', pct: 8, ok: false}
              ].map((m, i) => (
                <div key={i} className={`flex items-center justify-between p-3 rounded-xl border text-xs ${
                  m.ok ? 'bg-white/5 border theme-border theme-text' : 'bg-red-500/10 border-red-500/40 text-red-500 animate-pulse'
                }`}>
                  <div className="flex items-center gap-2 font-medium">
                    {m.ok ? <CheckCircle2 className="w-4 h-4 primary-text" /> : <AlertTriangle className="w-4 h-4 text-red-500" />}
                    <span>{m.name}</span>
                  </div>
                  <span className={`font-mono-tech font-semibold px-2 py-0.5 rounded text-[11px] ${m.ok ? 'badge-primary' : 'bg-red-500/20 text-red-500 font-bold'}`}>{m.pct}%</span>
                </div>
              ))}
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
          <div className="theme-card bg-[#141519] dark:bg-[#141519] rounded-[20px] max-w-lg w-full p-6 relative shadow-2xl border-t-2 primary-border">
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
    </div>
  );
};

export default WorkspaceSection;
