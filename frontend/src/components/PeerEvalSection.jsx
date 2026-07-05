import React, { useState } from 'react';
import { Copy, Check, QrCode, Sliders, ShieldCheck, Lock, Star, AlertTriangle, Fingerprint } from 'lucide-react';
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
    { key: 'quality', label: 'Kualitas Deliverables & Kode' },
    { key: 'timeliness', label: 'Ketepatan Waktu Delivery' },
    { key: 'teamwork', label: 'Kerja Sama & Kolaborasi Tim' },
    { key: 'communication', label: 'Komunikasi & Responsivitas' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b theme-border">
        <div>
          <div className="inline-flex items-center gap-2 mb-3 badge-secondary px-3.5 py-1 rounded-full text-xs font-semibold">
            <Fingerprint className="w-4 h-4 secondary-text" />
            <span>Evaluasi Sejawat 360° &amp; Kredensial SHA-256</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold theme-text">Evaluasi 360° &amp; Portofolio</h1>
          <p className="text-sm theme-text-sub mt-1.5">
            Sistem penilaian obyektif antar rekan tim Verstack. Menerbitkan portofolio kriptografis yang tamper-proof.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: 360 Peer Evaluation Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="theme-card rounded-[16px] p-6 relative overflow-hidden border-t-2 primary-border">
            
            <div className="flex items-center justify-between pb-4 mb-5 border-b theme-border-subtle">
              <span className="font-heading text-base font-bold theme-text flex items-center gap-2">
                <Sliders className="w-4 h-4 secondary-text" /> Form Evaluasi Akhir Sprint
              </span>
              <span className="text-xs font-mono-tech theme-text-muted">Proyek: E-Commerce Kasir</span>
            </div>

            {/* Teammate selector */}
            <div className="mb-6">
              <label className="block text-xs font-medium theme-text-sub mb-2 uppercase tracking-wider">Pilih Rekan Tim yang Dinilai</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[testAccounts[4], testAccounts[1], testAccounts[2]].map(member => (
                  <button
                    key={member.id}
                    onClick={() => handleTeammateChange(member)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedTeammate.id === member.id
                        ? 'primary-bg/15 primary-border theme-text font-semibold shadow-sm'
                        : 'bg-white/5 border theme-border theme-text-sub hover:theme-text'
                    }`}
                  >
                    <p className="text-xs truncate">{member.name}</p>
                    <p className="text-[10px] theme-text-muted mt-0.5 truncate">{member.role}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Evaluation Sliders */}
            <div className="space-y-5 bg-white/5 p-5 rounded-xl border theme-border">
              {dimensions.map(dim => (
                <div key={dim.key}>
                  <div className="flex justify-between text-xs font-medium theme-text mb-2">
                    <span>{dim.label}</span>
                    <span className="font-mono-tech font-bold secondary-text">{scores[dim.key]} / 5.0</span>
                  </div>
                  <input
                    type="range" min="1.0" max="5.0" step="0.1" value={scores[dim.key]}
                    onChange={(e) => setScores({...scores, [dim.key]: parseFloat(e.target.value)})}
                    className="w-full accent-[var(--color-primary)] cursor-pointer h-2 bg-white/10 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] theme-text-muted font-mono-tech mt-1">
                    <span>1.0 (Buruk)</span><span>3.0 (Cukup)</span><span>5.0 (Ekselen)</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Average Score Box */}
            <div className="mt-6 pt-5 border-t theme-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs theme-text-sub block">Skor Rata-rata Evaluasi Sejawat:</span>
                <span className={`text-2xl font-bold font-mono-tech ${isSuspicious ? 'text-amber-500' : 'primary-text'}`}>
                  {avgScore} / 5.0
                </span>
              </div>

              {isSuspicious && (
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 bg-amber-500/10 border border-amber-500/30 px-3.5 py-2 rounded-xl">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Variance Alert (&lt;3.2): Memerlukan verifikasi Dosen</span>
                </div>
              )}
            </div>

            {/* Submit button */}
            <div className="mt-6">
              {evalSubmitted ? (
                <div className="p-3.5 badge-primary rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 primary-text" /> Nilai evaluasi berhasil direkam di Audit Trail!
                </div>
              ) : (
                <button
                  onClick={() => setEvalSubmitted(true)}
                  className="w-full btn-primary font-semibold text-xs py-3.5 rounded-lg cursor-pointer shadow-md"
                >
                  Kirim Evaluasi Sejawat Kriptografis
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Right: Verified Portfolio Card (Apple Wallet / Linear style) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="theme-card rounded-[20px] p-6 relative overflow-hidden shadow-2xl border-t-2 primary-border">
            
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono-tech font-bold badge-primary inline-flex items-center gap-1 mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 primary-text" /> VERIFIED BY VERSTACK PROTOCOL
                </span>
                <h3 className="font-heading text-lg font-bold theme-text">{mockPortfolio.studentName}</h3>
                <p className="text-xs theme-text-sub font-mono-tech">{mockPortfolio.university} · {mockPortfolio.prodi}</p>
              </div>
              <div className="p-2 bg-white rounded-xl shadow-xs shrink-0">
                <QrCode className="w-10 h-10 text-black" />
              </div>
            </div>

            <div className="space-y-4 bg-white/5 p-4 rounded-xl border theme-border mb-6">
              <div className="flex justify-between text-xs">
                <span className="theme-text-muted">Proyek Kelulusan:</span>
                <span className="font-semibold theme-text text-right">{mockPortfolio.projectTitle}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="theme-text-muted">Peran Tim:</span>
                <span className="font-semibold secondary-text">{mockPortfolio.role}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="theme-text-muted">Final Evaluation Score:</span>
                <span className="font-mono-tech font-bold primary-text">{mockPortfolio.finalScore}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="theme-text-muted">Total Jam Kontribusi:</span>
                <span className="font-mono-tech font-semibold theme-text">{mockPortfolio.hoursLogged} jam</span>
              </div>
            </div>

            {/* SHA-256 Crypto Hash Box per DESIGN.md Section 5.C */}
            <div>
              <label className="block text-[11px] font-semibold theme-text-muted uppercase tracking-wider mb-1.5 font-mono-tech">
                SHA-256 Cryptographic Proof Hash:
              </label>
              <div className="bg-[#08090A] border border-[#374151] rounded-xl p-3 flex items-center justify-between gap-2 shadow-inner">
                <code className="font-mono-tech text-[11px] primary-text truncate block w-full">
                  {mockPortfolio.verificationHash}
                </code>
                <button
                  onClick={handleCopyHash}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white shrink-0 transition-colors cursor-pointer"
                  title="Salin Hash"
                >
                  {copied ? <Check className="w-4 h-4 primary-text" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {copied && <p className="text-[11px] primary-text font-mono-tech mt-1.5">✓ String hash disalin ke clipboard</p>}
            </div>

            <div className="mt-6 pt-4 border-t theme-border-subtle flex items-center justify-between text-[11px] font-mono-tech theme-text-muted">
              <span>IMMUTABLE LEDGER RECORD</span>
              <span className="secondary-text">VERSTACK v2.0</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default PeerEvalSection;
