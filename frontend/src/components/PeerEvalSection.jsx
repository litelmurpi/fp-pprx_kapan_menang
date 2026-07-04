import React, { useState } from 'react';
import { Copy, Check, QrCode, Sliders, ShieldCheck, Lock, Star, AlertTriangle } from 'lucide-react';
import { PixelShield, PixelLock, PixelStar, PixelAlert, PixelCheck } from './PixelIcons';
import { mockPortfolio, testAccounts } from '../data/mockData';

const PeerEvalSection = ({ currentUser }) => {
  const [selectedTeammate, setSelectedTeammate] = useState(testAccounts[4]);
  const [scores, setScores] = useState({ quality: 2.5, timeliness: 2.0, teamwork: 2.5, communication: 3.0 });
  const [copied, setCopied] = useState(false);
  const [evalSubmitted, setEvalSubmitted] = useState(false);

  const avgScore = ((scores.quality + scores.timeliness + scores.teamwork + scores.communication) / 4).toFixed(1);
  const isSuspicious = avgScore < 3.2;

  const handleCopyHash = () => {
    navigator.clipboard.writeText(mockPortfolio.verificationHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTeammateChange = (account) => {
    setSelectedTeammate(account);
    setEvalSubmitted(false);
    if (account.name.includes('Eko')) {
      setScores({ quality: 2.5, timeliness: 2.0, teamwork: 2.5, communication: 3.0 });
    } else {
      setScores({ quality: 4.8, timeliness: 5.0, teamwork: 4.9, communication: 4.8 });
    }
  };

  const dimensions = [
    { key: 'quality', label: 'Kualitas Deliverables' },
    { key: 'timeliness', label: 'Ketepatan Waktu' },
    { key: 'teamwork', label: 'Kerja Sama & Kolaborasi' },
    { key: 'communication', label: 'Komunikasi & Responsivitas' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#E5E7EB]">
        <div>
          <div className="inline-flex items-center gap-2 mb-3 bg-[#e0e7ff] border border-[#c7d2fe] text-[#4338ca] px-3 py-1 rounded-full text-xs font-semibold">
            <PixelShield className="w-4 h-4 text-[#4F46E5]" />
            <span>Evaluasi Sejawat 360° &amp; Portofolio SHA-256</span>
          </div>
          <h1 className="font-heading-2 text-3xl sm:text-4xl font-bold text-[#111827]">Evaluasi 360° &amp; Portofolio</h1>
          <p className="text-sm text-[#6B7280] mt-1.5">
            Sistem penilaian obyektif antar rekan tim. Menerbitkan portofolio kriptografis yang tamper-proof.
          </p>
        </div>
        <div className="flex items-center gap-2 border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-xs bg-[#FAFAFA] font-medium text-[#111827]">
          <Lock className="w-4 h-4 text-[#22C55E]" />
          <span>SHA-256 Immutable Proof</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Evaluation form */}
        <div>
          <div className="border border-[#E5E7EB] rounded-[20px] p-6 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#E5E7EB]">
              <h3 className="font-bold text-[#111827] text-lg flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#4F46E5]" /> Evaluasi Sejawat Tim
              </h3>
              <span className="text-xs font-semibold text-[#166534] bg-[#ecfdf5] border border-[#a7f3d0] px-3 py-1 rounded-full">Sprint 4 Review</span>
            </div>

            {/* Teammate selector */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {testAccounts.filter(a => a.id !== currentUser.id).slice(0, 4).map(acc => {
                const sel = selectedTeammate.id === acc.id;
                const flagged = acc.name.includes('Eko');
                return (
                  <button key={acc.id} onClick={() => handleTeammateChange(acc)}
                    className={`p-3.5 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center gap-3 ${
                      sel ? 'bg-[#111827] text-white border-[#111827] shadow-xs' : 'bg-[#FAFAFA] text-[#111827] border-[#E5E7EB] hover:border-[#9CA3AF]'
                    }`}>
                    <img src={acc.avatar} alt={acc.name} className="w-8 h-8 rounded-full border border-[#E5E7EB] bg-white shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold truncate">{acc.name}</p>
                      <p className={`text-[11px] font-medium truncate ${sel ? 'text-gray-300' : flagged ? 'text-red-500 font-semibold' : 'text-[#22C55E]'}`}>
                        {flagged ? '⚠ Flagged (Free-rider)' : '★ Kontributor Aktif'}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Sliders */}
            <div className="space-y-4 bg-[#FAFAFA] rounded-xl p-5 border border-[#E5E7EB]">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                <span className="text-xs font-semibold text-[#111827]">Menilai Rekan: <strong className="text-[#4F46E5]">{selectedTeammate.name}</strong></span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1.5 ${
                  isSuspicious ? 'bg-red-50 text-red-700 border-red-200' : 'bg-[#ecfdf5] text-[#166534] border-[#a7f3d0]'
                }`}>
                  <Star className="w-3.5 h-3.5 fill-current" /> {avgScore} / 5.0
                </span>
              </div>

              {dimensions.map(d => (
                <div key={d.key}>
                  <div className="flex justify-between text-xs font-medium text-[#4B5563] mb-1.5">
                    <span>{d.label}</span>
                    <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-[#E5E7EB] text-[#111827]">{scores[d.key]}</span>
                  </div>
                  <input type="range" min="1.0" max="5.0" step="0.1" value={scores[d.key]}
                    onChange={(e) => setScores({...scores, [d.key]: parseFloat(e.target.value)})}
                    className="w-full accent-[#4F46E5] cursor-pointer h-2 bg-[#E5E7EB] rounded-lg" />
                </div>
              ))}

              {isSuspicious && (
                <div className="p-3.5 border border-red-200 rounded-xl bg-red-50 text-xs flex items-start gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-red-900">Variance Alert Terpicu!</p>
                    <p className="text-red-700 mt-0.5">Skor evaluasi &lt;3.2 — sistem AI akan mengkroscek dengan bukti rekam jejak checkpoint.</p>
                  </div>
                </div>
              )}

              <button onClick={() => setEvalSubmitted(true)} disabled={evalSubmitted}
                className={`w-full py-3.5 rounded-xl font-semibold text-xs transition-all cursor-pointer shadow-xs ${
                  evalSubmitted ? 'bg-[#ecfdf5] text-[#166534] border border-[#a7f3d0]' : 'bg-[#4F46E5] text-white hover:bg-[#4338ca]'
                }`}>
                {evalSubmitted ? (
                  <span className="flex items-center justify-center gap-2"><Check className="w-4 h-4 text-[#22C55E]" /> Evaluasi Tersimpan &amp; Terenkripsi</span>
                ) : (
                  <span className="flex items-center justify-center gap-2">Kirim Evaluasi 360° <ShieldCheck className="w-4 h-4" /></span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Certificate */}
        <div>
          <div className="border border-[#E5E7EB] rounded-[20px] p-6 relative overflow-hidden bg-white shadow-sm">
            <div className="absolute top-4 right-4 opacity-5 pointer-events-none">
              <ShieldCheck className="w-36 h-36 text-[#4F46E5]" />
            </div>

            <div className="flex items-start justify-between mb-6 relative z-10">
              <div>
                <span className="text-[11px] font-semibold text-[#166534] bg-[#ecfdf5] border border-[#a7f3d0] px-3 py-1 rounded-full inline-flex items-center gap-1.5 shadow-xs">
                  <Lock className="w-3.5 h-3.5 text-[#22C55E]" /> Verified Academic Credential
                </span>
                <h3 className="text-xl font-bold text-[#111827] mt-3">{mockPortfolio.studentName}</h3>
                <p className="text-xs text-[#6B7280]">{mockPortfolio.university} · NIM: {mockPortfolio.nim}</p>
              </div>
              <div className="w-14 h-14 border border-[#E5E7EB] rounded-2xl flex items-center justify-center bg-[#FAFAFA] shadow-xs shrink-0">
                <QrCode className="w-8 h-8 text-[#111827]" />
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              <div className="p-4 bg-[#FAFAFA] rounded-xl border border-[#E5E7EB]">
                <span className="text-[11px] text-[#6B7280] font-semibold uppercase tracking-wider block">Proyek Final Project / Kemitraan</span>
                <p className="text-base font-bold text-[#111827] mt-1">{mockPortfolio.projectTitle}</p>
                <div className="flex items-center gap-3 mt-3 text-xs">
                  <span className="px-3 py-1 bg-[#22C55E] text-white font-semibold rounded-full shadow-xs">★ {mockPortfolio.peerScore} / 5.0 Peer Score</span>
                  <span className="text-[#4B5563] font-medium border border-[#E5E7EB] bg-white px-3 py-1 rounded-full">{mockPortfolio.role}</span>
                </div>
              </div>

              {/* Hash box */}
              <div className="p-5 bg-[#111827] rounded-xl border border-[#374151] text-white shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] text-[#22C55E] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <PixelShield className="w-3.5 h-3.5 text-[#22C55E]" /> SHA-256 Kriptografis Hash
                  </span>
                  <span className="text-[10px] bg-[#22C55E]/20 text-[#22C55E] px-2.5 py-0.5 rounded-full font-semibold border border-[#22C55E]/30">
                    Tamper-Proof
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 bg-white/5 p-3 rounded-xl text-[11px] text-gray-300 border border-white/10 font-mono">
                  <span className="truncate">{mockPortfolio.verificationHash}</span>
                  <button onClick={handleCopyHash} className="p-1.5 rounded-lg bg-[#22C55E] text-white hover:bg-[#16a34a] transition-colors shrink-0 cursor-pointer shadow-xs">
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#6B7280] relative z-10">
              <span>Diterbitkan: {mockPortfolio.issuedDate}</span>
              <a href="#" className="text-[#111827] bg-[#F3F4F6] px-3 py-1 rounded-full border border-[#E5E7EB] font-medium hover:bg-[#E5E7EB] transition-colors">Verifikasi di Explorer ↗</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PeerEvalSection;
