import React, { useState } from 'react';
import { 
  X, Clock, Check, Sparkles, Globe, AlertCircle, ShieldCheck, 
  Send, CheckCircle2, Briefcase, UserCheck, Zap, Maximize2, MessageSquare 
} from 'lucide-react';
import { mockCheckpoints } from '../data/mockData';

const ProjectDetailModal = ({ project, onClose, onJoin, currentUser, isJoined, setActiveTab }) => {
  const [activeTab, setActiveTabLocal] = useState('overview'); // overview, members, roadmap
  const [rolePreference, setRolePreference] = useState(
    currentUser?.badge ? currentUser.badge.split(' ')[0] : 'Fullstack Developer'
  );
  const [motivationNote, setMotivationNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!project) return null;

  const commitmentHours = project.commitmentHours || project.requiredHours || 12;
  const duration = project.duration || '6 Minggu';
  const slotsLeft = project.slotsLeft !== undefined ? project.slotsLeft : 2;
  const progress = project.progress !== undefined ? project.progress : 15;
  const requiredSkills = project.requiredSkills || ['Laravel', 'React', 'Tailwind CSS'];
  const userSkills = currentUser?.skills || [];

  const matchedSkills = requiredSkills.filter(s => 
    userSkills.some(us => us.toLowerCase() === s.toLowerCase() || s.toLowerCase().includes(us.toLowerCase()))
  );
  const toLearnSkills = requiredSkills.filter(s => 
    !userSkills.some(us => us.toLowerCase() === s.toLowerCase() || s.toLowerCase().includes(us.toLowerCase()))
  );
  const isHighMatch = (project.matchScore || 85) >= 88;
  const projectCheckpoints = mockCheckpoints.slice(0, project.checkpointsCount || 4);

  const handleSubmitJoin = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      setTimeout(() => {
        if (onJoin) {
          onJoin(project.id, { role: rolePreference, motivation: motivationNote });
        }
        if (setActiveTab) {
          setActiveTab('workspace');
        }
        onClose();
      }, 1200);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="theme-card rounded-[24px] max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden relative shadow-2xl border-t-2 primary-border bg-[var(--color-elevated)]">
        
        {/* Top Modal Header */}
        <div className="p-6 sm:p-7 border-b theme-border bg-white/[0.02] relative shrink-0">
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 border theme-border hover:bg-white/10 theme-text-sub hover:theme-text transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-3 pr-10">
            <span className="text-[11px] font-semibold theme-text-sub bg-white/5 border theme-border px-3 py-1 rounded-md">
              {project.category}
            </span>
            <span className={`text-[11px] font-mono-tech font-bold px-3 py-1 rounded-full border inline-flex items-center gap-1 ${
              isHighMatch ? 'badge-primary' : 'bg-amber-500/15 text-amber-500 border-amber-500/30'
            }`}>
              <Sparkles className="w-3.5 h-3.5" />
              {project.matchScore || 85}% FIT PROFILE
            </span>
            {project.isUmkm && (
              <span className="text-[11px] font-semibold badge-info px-3 py-1 rounded-md inline-flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 info-text" /> SDG 8 UMKM
              </span>
            )}
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl font-bold theme-text leading-tight mb-3 pr-8">
            {project.title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 pt-1">
            <div className="inline-flex items-center gap-2 text-xs theme-text-sub bg-white/5 px-3.5 py-1.5 rounded-lg border theme-border">
              <ShieldCheck className="w-4 h-4 text-[var(--color-primary)]" />
              <span>PIC Verifikator: <strong className="theme-text">{project.picName || 'Sarah Fauziah'}</strong></span>
            </div>
          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-4 gap-2 p-4 sm:px-7 bg-white/[0.01] border-b theme-border shrink-0 text-center">
          <div className="p-2.5 rounded-xl bg-white/5 border theme-border">
            <p className="text-[10px] theme-text-muted uppercase font-mono-tech">Komitmen</p>
            <p className="text-xs font-bold theme-text font-mono-tech mt-0.5">{commitmentHours} Jam/mgg</p>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border theme-border">
            <p className="text-[10px] theme-text-muted uppercase font-mono-tech">Durasi SPRINT</p>
            <p className="text-xs font-bold theme-text mt-0.5">{duration}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border theme-border">
            <p className="text-[10px] theme-text-muted uppercase font-mono-tech">Sisa Kuota</p>
            <p className="text-xs font-bold text-emerald-400 mt-0.5">{slotsLeft > 0 ? `${slotsLeft} Slot Kosong` : 'Penuh'}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border theme-border">
            <p className="text-[10px] theme-text-muted uppercase font-mono-tech">Progres Tim</p>
            <p className="text-xs font-bold theme-text font-mono-tech mt-0.5">{progress}%</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 sm:px-7 pt-3 border-b theme-border shrink-0 bg-white/[0.01]">
          {[
            { id: 'overview', label: '📋 Deskripsi & Skill Fit' },
            { id: 'members', label: `👥 Anggota Tim (${project.currentMembers?.length || 0})` },
            { id: 'roadmap', label: `🗺️ Roadmap SPRINT (${project.checkpointsCount || 4})` },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTabLocal(tab.id)}
              className={`pb-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[var(--color-primary)] primary-text'
                  : 'border-transparent theme-text-sub hover:theme-text'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Tab Content Body */}
        <div className="p-6 sm:p-7 space-y-6 text-xs sm:text-sm leading-relaxed overflow-y-auto flex-1">
          
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h3 className="text-xs font-semibold theme-text-muted uppercase tracking-wider mb-2 font-mono-tech">
                  Tujuan &amp; Deskripsi Proyek
                </h3>
                <p className="theme-text bg-white/5 p-4 rounded-xl border theme-border leading-relaxed">
                  {project.description || 'Proyek kolaboratif bersertifikasi untuk membangun solusi nyata dalam jaringan Amikom Club Center (ACC) & Verstack.'}
                </p>
              </div>

              {/* Skill Match Breakdown */}
              <div>
                <h3 className="text-xs font-semibold theme-text-muted uppercase tracking-wider mb-3 font-mono-tech flex items-center justify-between">
                  <span>Analisis Kesesuaian Keahlian (Skill Match)</span>
                  <span className="primary-text lowercase font-normal">{matchedSkills.length} dari {requiredSkills.length} skill terpenuhi</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                    <p className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 mb-2.5">
                      <CheckCircle2 className="w-4 h-4" /> Skill Sesuai Profil Kamu
                    </p>
                    {matchedSkills.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {matchedSkills.map((sk, idx) => (
                          <span key={idx} className="text-xs font-medium px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                            ✓ {sk}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs theme-text-sub italic">Belum ada skill yang cocok secara langsung.</p>
                    )}
                  </div>

                  <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                    <p className="text-xs font-semibold text-amber-400 flex items-center gap-1.5 mb-2.5">
                      <Zap className="w-4 h-4" /> Peluang Upskilling &amp; Belajar
                    </p>
                    {toLearnSkills.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {toLearnSkills.map((sk, idx) => (
                          <span key={idx} className="text-xs font-medium px-2.5 py-1 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30">
                            + {sk}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-emerald-400 font-medium">✨ Luar biasa! Kamu menguasai semua keahlian yang dibutuhkan!</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border theme-border flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[var(--color-primary)] shrink-0 mt-0.5" />
                <div className="text-xs theme-text-sub space-y-1">
                  <p className="font-semibold theme-text">Jaminan Protokol Kolaborasi Verstack</p>
                  <p>
                    Setiap kontribusi pada proyek ini tercatat secara on-chain di audit trail ACC. Evaluasi sejawat mingguan (Peer Evaluation) aktif untuk mencegah free-rider dan menjamin portofolio riil.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'members' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h3 className="text-xs font-semibold theme-text-muted uppercase tracking-wider mb-3 font-mono-tech">
                Komposisi Tim Saat Ini
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(project.currentMembers || []).map((m, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white/5 border theme-border flex items-center gap-3">
                    <img 
                      src={m.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${m.name}`} 
                      alt={m.name} 
                      className="w-10 h-10 rounded-full bg-white/10 border theme-border shrink-0" 
                    />
                    <div>
                      <p className="text-xs font-bold theme-text">{m.name}</p>
                      <p className="text-[11px] primary-text font-medium">{m.role || 'Anggota Tim'}</p>
                    </div>
                  </div>
                ))}

                {Array.from({ length: slotsLeft }).map((_, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border-2 border-dashed theme-border-subtle flex items-center justify-center gap-2 text-xs theme-text-sub bg-white/[0.02]">
                    <UserCheck className="w-4 h-4 theme-text-muted" />
                    <span>+ Slot Posisi Terbuka (Tersedia)</span>
                  </div>
                ))}
              </div>

              {(!project.currentMembers || project.currentMembers.length === 0) && (
                <div className="text-center py-8 bg-white/5 rounded-xl border theme-border">
                  <p className="text-xs font-semibold theme-text mb-1">Belum ada anggota yang bergabung di tim ini</p>
                  <p className="text-[11px] theme-text-sub">Jadilah pionir pertama yang memimpin proyek kolaborasi ini!</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'roadmap' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h3 className="text-xs font-semibold theme-text-muted uppercase tracking-wider mb-3 font-mono-tech">
                Jadwal Checkpoint &amp; Milestone Mingguan
              </h3>

              <div className="space-y-3">
                {projectCheckpoints.map((cp, idx) => (
                  <div key={cp.id || idx} className="p-4 rounded-xl bg-white/5 border theme-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full badge-primary font-mono-tech text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="text-xs font-bold theme-text">{cp.title || `Sprint Milestone #${idx + 1}`}</p>
                        <p className="text-[11px] theme-text-sub mt-0.5">Tenggat Waktu: <strong className="theme-text">{cp.dueDate || '14 Juli 2026'}</strong></p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono-tech font-semibold px-2.5 py-1 rounded bg-white/10 theme-text self-start sm:self-auto shrink-0">
                      Verifikasi Dosen / PIC
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick-Apply Section inside Modal */}
          <div className="pt-6 border-t theme-border">
            {isJoined ? (
              <div className="bg-[var(--color-primary)]/15 border border-[var(--color-primary)]/40 p-5 rounded-2xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl badge-primary">
                    <Check className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold theme-text">Kamu Sudah Tergabung di Tim Proyek Ini</p>
                    <p className="text-xs theme-text-sub">Akses ruang kerja untuk melihat pembagian tugas sprint.</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    if (setActiveTab) setActiveTab('workspace');
                    onClose();
                  }}
                  className="btn-primary text-xs px-5 py-3 rounded-xl font-bold flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <span>Buka Workspace Tim</span>
                </button>
              </div>
            ) : slotsLeft === 0 ? (
              <div className="bg-amber-500/10 border border-amber-500/30 p-5 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-amber-400 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-amber-300">Kuota Tim Proyek Sudah Penuh</p>
                    <p className="text-xs theme-text-sub">Pendaftaran ditutup karena seluruh posisi telah terisi.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/[0.03] border-2 theme-border rounded-2xl p-6 relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold theme-text flex items-center gap-2">
                    <Briefcase className="w-4 h-4 primary-text" />
                    <span>Pengajuan Permintaan Gabung Tim (Quick Apply)</span>
                  </h4>
                  <span className="text-[10px] font-mono-tech badge-primary px-2 py-0.5 rounded">
                    ⚡ Verstack Instant Review
                  </span>
                </div>

                {submittedSuccess ? (
                  <div className="p-6 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-center space-y-1.5 animate-in zoom-in-95 duration-200">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2 animate-bounce" />
                    <p className="text-sm font-bold text-emerald-300">Permintaan Gabung Tim Berhasil Diajukan!</p>
                    <p className="text-xs text-emerald-200/80">
                      Notifikasi telah dikirim ke PIC proyek ({project.picName || 'Sarah Fauziah'}). Mengalihkan ke ruang kerja...
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitJoin} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold theme-text-muted uppercase tracking-wider mb-1.5 font-mono-tech">
                          Pilih Peran / Posisi di Tim
                        </label>
                        <select 
                          value={rolePreference} 
                          onChange={(e) => setRolePreference(e.target.value)}
                          className="w-full bg-white/5 border theme-border rounded-xl px-3.5 py-2.5 text-xs font-medium theme-text focus:outline-none focus:border-[var(--color-primary)] transition-all cursor-pointer"
                        >
                          <option value="Backend Developer">Backend Developer (Laravel / PHP)</option>
                          <option value="Frontend Developer">Frontend Developer (React / Tailwind)</option>
                          <option value="UI/UX Designer">UI/UX Designer (Figma / Research)</option>
                          <option value="Fullstack Developer">Fullstack Developer (Lead)</option>
                          <option value="Quality Assurance / Tester">Quality Assurance / System Tester</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold theme-text-muted uppercase tracking-wider mb-1.5 font-mono-tech">
                          Ketersediaan Waktu Kamu
                        </label>
                        <div className="w-full bg-white/5 border theme-border rounded-xl px-3.5 py-2.5 text-xs font-medium theme-text flex items-center justify-between">
                          <span>{currentUser.freeHours || 12} Jam / minggu</span>
                          <span className="text-[10px] badge-primary px-2 py-0.5 rounded font-mono-tech">Terverifikasi</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold theme-text-muted uppercase tracking-wider mb-1.5 font-mono-tech flex items-center justify-between">
                        <span>Pesan / Motivasi Singkat untuk PIC (Opsional)</span>
                        <span className="text-[10px] theme-text-muted font-normal">Membantu mempercepat approval</span>
                      </label>
                      <div className="relative">
                        <MessageSquare className="w-4 h-4 theme-text-muted absolute left-3.5 top-3" />
                        <input 
                          type="text" 
                          value={motivationNote}
                          onChange={(e) => setMotivationNote(e.target.value)}
                          placeholder="Contoh: Saya memiliki pengalaman membuat sistem serupa..."
                          className="w-full bg-white/5 border theme-border rounded-xl pl-10 pr-4 py-2.5 text-xs theme-text placeholder:theme-text-muted focus:outline-none focus:border-[var(--color-primary)] transition-all"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end gap-3">
                      <button 
                        type="button"
                        onClick={onClose}
                        className="btn-secondary text-xs px-5 py-3 rounded-xl font-medium cursor-pointer"
                      >
                        Batal
                      </button>
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="btn-primary text-xs px-8 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            <span>Memverifikasi Protokol...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Kirim Permintaan Gabung</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;
