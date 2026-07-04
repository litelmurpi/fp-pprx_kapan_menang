import React, { useState } from 'react';
import { GitPullRequest, X, CheckCircle2, AlertTriangle, Lock } from 'lucide-react';
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
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#E5E7EB]">
        <div>
          <div className="inline-flex items-center gap-2 mb-3 bg-[#ecfdf5] border border-[#a7f3d0] text-[#166534] px-3 py-1 rounded-full text-xs font-semibold">
            <PixelTerminal className="w-4 h-4 text-[#22C55E]" />
            <span>Audit Trail &amp; Checkpoint</span>
          </div>
          <h1 className="font-heading-2 text-3xl sm:text-4xl font-bold text-[#111827]">Ruang Kerja &amp; Kontribusi</h1>
          <p className="text-sm text-[#6B7280] mt-1.5">
            Transparansi progres mingguan setiap anggota tim. Sistem pencegahan free-rider aktif.
          </p>
        </div>
        <div className="flex items-center gap-2 border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-xs bg-[#FAFAFA]">
          <span className="font-medium text-[#6B7280]">Proyek Aktif:</span>
          <select value={activeProject.id} onChange={(e) => setActiveProject(mockProjects.find(p => p.id === parseInt(e.target.value)))}
            className="font-semibold text-[#111827] bg-transparent focus:outline-none cursor-pointer">
            {mockProjects.slice(0, 3).map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
          </select>
        </div>
      </div>

      {/* Overview Card */}
      <div className="border border-[#E5E7EB] rounded-[20px] p-6 mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white shadow-sm">
        <div>
          <h2 className="font-bold text-xl text-[#111827]">{activeProject.title}</h2>
          <p className="text-xs text-[#6B7280] mt-1">{activeProject.description}</p>
        </div>
        <div className="flex items-center gap-8 shrink-0">
          <div>
            <p className="text-[11px] text-[#6B7280] font-semibold uppercase tracking-wider">Sprint Progress</p>
            <div className="flex items-center gap-3 mt-1.5">
              <div className="w-32 h-2.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                <div className="h-full bg-[#22C55E] rounded-full transition-all" style={{width: `${activeProject.progress}%`}} />
              </div>
              <span className="text-sm font-bold text-[#111827] font-mono">{activeProject.progress}%</span>
            </div>
          </div>
          <div className="text-right border-l border-[#E5E7EB] pl-6">
            <p className="text-[11px] text-[#6B7280] font-semibold uppercase tracking-wider">Anggota Tim</p>
            <p className="text-xs font-semibold text-[#111827] flex items-center gap-1.5 mt-1.5"><CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> 4 Aktif</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Checkpoint list */}
        <div className="lg:col-span-7 space-y-5">
          <h3 className="font-heading-3 text-lg font-bold text-[#111827] flex items-center gap-2 mb-2">
            <PixelTerminal className="w-5 h-5 text-[#22C55E]" /> Daftar Checkpoint Mingguan
          </h3>
          
          {checkpoints.map(cp => {
            const done = cp.status.includes('Selesai');
            const late = cp.status.includes('Terlambat');
            return (
              <div key={cp.id} className={`border rounded-[20px] p-6 transition-all shadow-xs ${
                done ? 'bg-[#FAFAFA] border-[#E5E7EB]' : late ? 'bg-[#fef2f2] border-[#fecaca]' : 'bg-white border-[#E5E7EB]'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[11px] font-semibold text-[#6B7280] border border-[#E5E7EB] bg-white px-2.5 py-0.5 rounded-full">Minggu {cp.week} · {cp.deadline}</span>
                    <h4 className="font-bold text-[#111827] text-base mt-2">{cp.title}</h4>
                  </div>
                  <span className={`text-[11px] font-semibold px-3 py-1 rounded-full inline-flex items-center gap-1.5 border ${
                    done ? 'bg-[#ecfdf5] text-[#166534] border-[#a7f3d0]' : late ? 'bg-[#fef2f2] text-[#991b1b] border-[#fecaca]' : 'bg-[#FAFAFA] text-[#6B7280] border-[#E5E7EB]'
                  }`}>
                    {done && <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />}
                    {late && <AlertTriangle className="w-3.5 h-3.5 text-red-500" />}
                    {cp.status}
                  </span>
                </div>
                <p className="text-xs text-[#4B5563] mb-4 leading-relaxed">{cp.description}</p>
                <div className="flex items-center justify-between text-xs pt-4 border-t border-[#E5E7EB]">
                  <span className="text-[#6B7280]">PIC: <strong className="text-[#111827]">{cp.assignee}</strong></span>
                  {!done ? (
                    <button onClick={() => { setSelectedCpId(cp.id); setShowSubmitModal(true); }}
                      className="font-semibold text-white px-4 py-2 rounded-xl bg-[#22C55E] hover:bg-[#16a34a] transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-xs hover:translate-y-[-1px]">
                      <GitPullRequest className="w-3.5 h-3.5" /> Laporkan Progres
                    </button>
                  ) : (
                    <span className="bg-white px-3 py-1 border border-[#E5E7EB] rounded-lg font-semibold text-[#166534] inline-flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#22C55E]" /> Tervalidasi
                    </span>
                  )}
                </div>
                {done && cp.evidenceUrl && (
                  <div className="mt-4 p-3.5 bg-white border border-[#E5E7EB] rounded-xl text-xs shadow-xs">
                    <span className="text-[11px] text-[#6B7280] font-semibold uppercase tracking-wider block mb-1">Bukti Deliverables:</span>
                    <a href={cp.evidenceUrl} target="_blank" rel="noreferrer" className="text-[#4F46E5] font-medium underline truncate block">{cp.evidenceUrl}</a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Free-rider panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border border-[#E5E7EB] rounded-[20px] p-6 bg-white shadow-sm">
            <div className="flex items-center gap-2 mb-2 bg-[#fef2f2] text-[#991b1b] border border-[#fecaca] px-3 py-1 rounded-full w-fit">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <h3 className="font-semibold text-xs uppercase tracking-wider">Deteksi Free-Rider Sistem</h3>
            </div>
            <p className="text-xs text-[#6B7280] mb-5 leading-relaxed">Jika kontribusi anggota &lt;10% dari rata-rata tim, sertifikat final project otomatis ditahan oleh sistem.</p>

            <div className="space-y-3">
              {[
                {name: 'Budi Santoso', pct: 38, ok: true},
                {name: 'Dewi Lestari', pct: 35, ok: true},
                {name: 'Eko Saputra', pct: 8, ok: false}
              ].map((m, i) => (
                <div key={i} className={`flex items-center justify-between p-3.5 rounded-xl border text-xs ${
                  m.ok ? 'bg-[#FAFAFA] border-[#E5E7EB] text-[#111827]' : 'bg-[#fef2f2] border-[#fecaca] text-[#991b1b]'
                }`}>
                  <div className="flex items-center gap-2 font-medium">
                    {m.ok ? <CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> : <AlertTriangle className="w-4 h-4 text-red-500" />}
                    <span>{m.name}</span>
                  </div>
                  <span className={`font-mono font-semibold px-2 py-0.5 rounded text-[11px] ${m.ok ? 'bg-[#ecfdf5] text-[#166534]' : 'bg-red-100 text-red-800'}`}>{m.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-[#E5E7EB] rounded-[20px] p-6 bg-[#FAFAFA] shadow-sm">
            <h3 className="font-bold text-sm text-[#111827] mb-1">Ambang Batas Kelulusan</h3>
            <p className="text-xs text-[#6B7280] mb-4">Partisipasi ≥75% checkpoint diperlukan untuk berhak menerbitkan kredensial SHA-256.</p>
            <div className="flex items-center justify-between bg-white p-3.5 rounded-xl border border-[#E5E7EB] shadow-xs">
              <span className="text-xs font-semibold text-[#111827]">Status Tim Saat Ini</span>
              <span className="text-xs font-semibold bg-[#ecfdf5] text-[#166534] px-3 py-1 rounded-full border border-[#a7f3d0] flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" /> Aman (Eligible)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Submit modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-[20px] max-w-lg w-full p-6 relative border border-[#E5E7EB] shadow-lg">
            <button onClick={() => setShowSubmitModal(false)} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-[#F3F4F6] text-[#6B7280] cursor-pointer"><X className="w-5 h-5" /></button>
            <h2 className="font-heading-3 text-xl font-bold text-[#111827] mb-1 flex items-center gap-2"><PixelTerminal className="w-5 h-5 text-[#22C55E]" /> Laporkan Progres Checkpoint</h2>
            <p className="text-xs text-[#6B7280] mb-6">Unggah tautan bukti kerja agar tercatat dalam audit trail kriptografis.</p>
            
            <form onSubmit={handleSubmitProgress} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">Tautan Bukti (GitHub PR / Figma / Doc URL)</label>
                <input type="url" required value={submissionForm.evidenceUrl} onChange={(e) => setSubmissionForm({...submissionForm, evidenceUrl: e.target.value})}
                  className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#22C55E] bg-[#FAFAFA]" />
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold text-[#111827] mb-1.5">
                  <span>Persentase Kontribusi Task Ini</span><span className="bg-[#ecfdf5] text-[#166534] px-2 py-0.5 border border-[#a7f3d0] rounded font-mono font-bold">{submissionForm.progress}%</span>
                </div>
                <input type="range" min="10" max="100" step="5" value={submissionForm.progress}
                  onChange={(e) => setSubmissionForm({...submissionForm, progress: parseInt(e.target.value)})}
                  className="w-full accent-[#22C55E] cursor-pointer h-2 bg-[#E5E7EB] rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">Catatan Pengerjaan</label>
                <textarea rows="3" required value={submissionForm.note} onChange={(e) => setSubmissionForm({...submissionForm, note: e.target.value})}
                  className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#22C55E] bg-[#FAFAFA]" placeholder="Jelaskan deliverable apa saja yang telah diselesaikan..." />
              </div>
              {submitSuccess ? (
                <div className="p-3.5 bg-[#ecfdf5] border border-[#a7f3d0] rounded-xl text-xs font-semibold text-[#166534] text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> Progres tersimpan di Audit Trail!
                </div>
              ) : (
                <div className="pt-4 flex justify-end gap-3 border-t border-[#E5E7EB]">
                  <button type="button" onClick={() => setShowSubmitModal(false)} className="text-xs font-medium text-[#6B7280] px-5 py-2.5 rounded-xl hover:bg-[#FAFAFA] cursor-pointer">Batal</button>
                  <button type="submit" className="text-xs font-semibold text-white bg-[#22C55E] px-6 py-2.5 rounded-xl hover:bg-[#16a34a] transition-colors cursor-pointer shadow-xs">Simpan Bukti</button>
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
