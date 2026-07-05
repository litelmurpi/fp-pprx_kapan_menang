import React, { useState } from 'react';
import { Store, MapPin, ArrowRight, X, CheckCircle2, Globe, AlertCircle } from 'lucide-react';
import { PixelTrophy, PixelHeart, PixelCheck, PixelStar } from './PixelIcons';
import { mockProjects } from '../data/mockData';

const UmkmSection = ({ currentUser, setActiveTab }) => {
  const umkmProjects = mockProjects.filter(p => p.isUmkm);
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [partnerSuccess, setPartnerSuccess] = useState(false);
  const [form, setForm] = useState({
    umkmName: '', ownerName: '', location: 'Sleman, D.I. Yogyakarta',
    need: 'Pembuatan Aplikasi Kasir & Stok Barang', contact: '081234567890'
  });

  const handleSubmitPartner = (e) => {
    e.preventDefault();
    setPartnerSuccess(true);
    setTimeout(() => { setPartnerSuccess(false); setShowPartnerModal(false); }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b theme-border">
        <div>
          <div className="inline-flex items-center gap-2 mb-3 badge-info px-3.5 py-1 rounded-full text-xs font-semibold">
            <Globe className="w-4 h-4 info-text" />
            <span>SDG 8 · Decent Work &amp; Economic Growth</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold theme-text">Kemitraan SDG 8 UMKM Lokal</h1>
          <p className="text-sm theme-text-sub mt-1.5">
            Digitalisasi usaha nyata untuk UMKM lokal dalam jaringan Verstack. Mahasiswa mendapatkan portofolio riil, UMKM mendapatkan solusi teknologi terverifikasi.
          </p>
        </div>
        <button onClick={() => setShowPartnerModal(true)}
          className="btn-primary text-xs px-5 py-3 rounded-lg inline-flex items-center gap-2 cursor-pointer shadow-sm">
          <Store className="w-4 h-4" /> Daftarkan UMKM Mitra
        </button>
      </div>

      {/* Simulation Academic Notice per DESIGN.md Section 5.D */}
      <div className="bg-amber-500/10 border border-amber-500/30 text-amber-500 dark:text-amber-300 text-xs font-medium px-4 py-3 rounded-xl mb-8 flex items-center gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
        <span><strong>⚠ Simulasi Akademik:</strong> Proyek kurasi akademik percontohan sebagai wadah praktik lapangan terverifikasi protokol Verstack.</span>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {[
          { label: 'UMKM Terdigitalisasi', val: '24+', badge: 'badge-info' },
          { label: 'Mahasiswa Terlibat', val: '180+', badge: 'badge-secondary' },
          { label: 'Tingkat Kontribusi Valid', val: '100%', badge: 'badge-primary' },
        ].map((m, i) => (
          <div key={i} className={`theme-card rounded-[16px] p-6 flex items-center gap-4 ${m.badge}`}>
            <div>
              <p className="text-3xl font-bold font-mono-tech theme-text tracking-tight">{m.val}</p>
              <p className="text-xs theme-text-sub mt-1 font-medium">{m.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* UMKM Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {umkmProjects.map(project => (
          <div key={project.id} className="theme-card rounded-[16px] p-6 flex flex-col justify-between group relative overflow-hidden border-t-2 info-border">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-semibold badge-info px-2.5 py-1 rounded-md inline-flex items-center gap-1">
                  <Store className="w-3 h-3" /> Mitra UMKM
                </span>
                <span className="text-[11px] font-mono-tech font-bold px-2.5 py-1 rounded-full badge-primary">
                  {project.matchScore}% FIT
                </span>
              </div>

              <h3 className="font-heading text-lg font-bold theme-text mb-2 group-hover:info-text transition-colors">
                {project.title}
              </h3>
              <p className="text-xs theme-text-sub mb-5 line-clamp-3 leading-relaxed">
                {project.description}
              </p>

              <div className="space-y-3 mb-6">
                <div>
                  <span className="text-[11px] font-medium theme-text-muted block mb-1.5 uppercase tracking-wider">Required Tech</span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.requiredSkills.map((skill, index) => (
                      <span key={index} className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-white/5 border theme-border theme-text-sub">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t theme-border-subtle flex items-center justify-between">
              <span className="text-xs theme-text-muted font-mono-tech">{project.commitmentHours} jam/mgg</span>
              <button 
                onClick={() => setActiveTab('matchmaking')}
                className="btn-primary text-xs font-semibold px-4 py-2 rounded-lg transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-xs"
              >
                <span>Lihat Detail</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Partner Modal */}
      {showPartnerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="theme-card bg-[#141519] dark:bg-[#141519] rounded-[20px] max-w-lg w-full p-6 relative shadow-2xl border-t-2 info-border">
            <button onClick={() => setShowPartnerModal(false)} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/10 theme-text-sub cursor-pointer"><X className="w-5 h-5" /></button>
            <h2 className="font-heading text-xl font-bold theme-text mb-1 flex items-center gap-2"><Store className="w-5 h-5 info-text" /> Pengajuan Mitra UMKM Baru</h2>
            <p className="text-xs theme-text-sub mb-6">Ajukan kebutuhan digitalisasi usaha Anda untuk dikerjakan oleh tim mahasiswa terverifikasi Verstack.</p>
            
            <form onSubmit={handleSubmitPartner} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-medium theme-text mb-1.5">Nama Usaha / UMKM</label>
                <input type="text" required value={form.umkmName} onChange={(e) => setForm({...form, umkmName: e.target.value})}
                  className="w-full bg-white/5 border theme-border rounded-lg px-3.5 py-2.5 text-xs theme-text focus:outline-none focus:border-[var(--color-info)]" placeholder="Kopi Nusantara Sleman" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium theme-text mb-1.5">Nama Pemilik / PIC</label>
                  <input type="text" required value={form.ownerName} onChange={(e) => setForm({...form, ownerName: e.target.value})}
                    className="w-full bg-white/5 border theme-border rounded-lg px-3.5 py-2.5 text-xs theme-text focus:outline-none focus:border-[var(--color-info)]" placeholder="Bpk. Ahmad" />
                </div>
                <div>
                  <label className="block text-xs font-medium theme-text mb-1.5">Kontak WhatsApp / Email</label>
                  <input type="text" required value={form.contact} onChange={(e) => setForm({...form, contact: e.target.value})}
                    className="w-full bg-white/5 border theme-border rounded-lg px-3.5 py-2.5 text-xs theme-text focus:outline-none focus:border-[var(--color-info)]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium theme-text mb-1.5">Lokasi Usaha</label>
                <input type="text" required value={form.location} onChange={(e) => setForm({...form, location: e.target.value})}
                  className="w-full bg-white/5 border theme-border rounded-lg px-3.5 py-2.5 text-xs theme-text focus:outline-none focus:border-[var(--color-info)]" />
              </div>
              <div>
                <label className="block text-xs font-medium theme-text mb-1.5">Kebutuhan Digitalisasi</label>
                <textarea rows="3" required value={form.need} onChange={(e) => setForm({...form, need: e.target.value})}
                  className="w-full bg-white/5 border theme-border rounded-lg px-3.5 py-2.5 text-xs theme-text focus:outline-none focus:border-[var(--color-info)]" placeholder="Contoh: Butuh aplikasi kasir berbasis web untuk memantau stok dan laporan penjualan bulanan..." />
              </div>
              {partnerSuccess ? (
                <div className="p-3.5 badge-primary rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 primary-text" /> Pengajuan UMKM berhasil dikirim ke tim kurasi dosen!
                </div>
              ) : (
                <div className="pt-4 flex justify-end gap-3 border-t theme-border-subtle">
                  <button type="button" onClick={() => setShowPartnerModal(false)} className="btn-secondary text-xs px-5 py-2.5 rounded-lg cursor-pointer">Batal</button>
                  <button type="submit" className="btn-primary text-xs px-6 py-2.5 rounded-lg cursor-pointer">Ajukan Kemitraan</button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UmkmSection;
