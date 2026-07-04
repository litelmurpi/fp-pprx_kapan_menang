import React, { useState } from 'react';
import { Store, MapPin, ArrowRight, X, CheckCircle2 } from 'lucide-react';
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
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#E5E7EB]">
        <div>
          <div className="inline-flex items-center gap-2 mb-3 bg-[#e0e7ff] border border-[#c7d2fe] text-[#4338ca] px-3 py-1 rounded-full text-xs font-semibold">
            <PixelTrophy className="w-4 h-4 text-[#4F46E5]" />
            <span>SDG 8 · Decent Work &amp; Economic Growth</span>
          </div>
          <h1 className="font-heading-2 text-3xl sm:text-4xl font-bold text-[#111827]">Kemitraan UMKM Lokal</h1>
          <p className="text-sm text-[#6B7280] mt-1.5">
            Digitalisasi usaha nyata untuk UMKM lokal. Mahasiswa mendapatkan pengalaman proyek riil, UMKM mendapatkan solusi teknologi.
          </p>
        </div>
        <button onClick={() => setShowPartnerModal(true)}
          className="bg-[#22C55E] text-white text-xs font-semibold px-5 py-3 rounded-xl hover:bg-[#16a34a] transition-all cursor-pointer inline-flex items-center gap-2 border border-[#16a34a] shadow-sm hover:translate-y-[-1px]">
          <Store className="w-4 h-4" /> Daftarkan UMKM Mitra
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {[
          { label: 'UMKM Terdigitalisasi', val: '24+', icon: PixelTrophy, color: '#22C55E', bg: '#ecfdf5', border: '#a7f3d0' },
          { label: 'Mahasiswa Terlibat', val: '180+', icon: PixelStar, color: '#4F46E5', bg: '#e0e7ff', border: '#c7d2fe' },
          { label: 'Tingkat Kontribusi Valid', val: '100%', icon: PixelHeart, color: '#22C55E', bg: '#ecfdf5', border: '#a7f3d0' },
        ].map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={i} className="bg-white border border-[#E5E7EB] rounded-[20px] p-6 shadow-sm flex items-center justify-between hover:border-[#22C55E] transition-all">
              <div>
                <span className="text-xs font-semibold text-[#6B7280] block">{m.label}</span>
                <span className="text-3xl font-bold text-[#111827] mt-1 block font-display-1">{m.val}</span>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs" style={{backgroundColor: m.bg, borderColor: m.border, color: m.color}}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* UMKM cards */}
      <h2 className="font-bold text-[#111827] text-xl mb-6 flex items-center gap-2">
        <Store className="w-5 h-5 text-[#22C55E]" /> Proyek UMKM Aktif
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {umkmProjects.map(project => (
          <div key={project.id} className="border border-[#E5E7EB] rounded-[20px] p-6 flex flex-col justify-between hover:translate-y-[-2px] hover:border-[#22C55E] transition-all bg-white shadow-sm group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-semibold text-[#166534] bg-[#ecfdf5] border border-[#a7f3d0] px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                  <PixelTrophy className="w-3.5 h-3.5 text-[#22C55E]" /> Mitra UMKM
                </span>
                <span className="text-[11px] font-medium text-[#4B5563] bg-[#FAFAFA] border border-[#E5E7EB] px-2.5 py-1 rounded-full">{project.category}</span>
              </div>
              <h3 className="font-bold text-xl text-[#111827] mb-2 group-hover:text-[#22C55E] transition-colors">{project.title}</h3>
              <div className="flex items-center gap-1.5 text-xs font-medium text-[#6B7280] mb-3">
                <MapPin className="w-3.5 h-3.5 text-[#9CA3AF]" /> Sleman, D.I. Yogyakarta
              </div>
              <p className="text-xs text-[#4B5563] leading-relaxed mb-5">{project.description}</p>
              
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.requiredSkills.map((sk, i) => (
                  <span key={i} className="text-[11px] px-2.5 py-1 rounded-full border border-[#E5E7EB] bg-[#FAFAFA] text-[#4B5563] font-medium">{sk}</span>
                ))}
              </div>

              {/* Label simulasi eksplisit */}
              <div className="text-[11px] font-medium text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl inline-block mb-4">
                ⚠ Simulasi — Proyek kurasi akademik percontohan
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
              <span className="text-xs font-medium text-[#6B7280]">{project.slotsLeft} slot tim tersedia</span>
              <button onClick={() => setActiveTab('matchmaking')}
                className="text-xs font-semibold bg-[#22C55E] text-white px-5 py-2.5 rounded-xl hover:bg-[#16a34a] transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-xs">
                Gabung Tim <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {/* CTA card */}
        <div onClick={() => setShowPartnerModal(true)}
          className="border border-dashed border-[#D1D5DB] rounded-[20px] p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#FAFAFA] hover:border-[#22C55E] transition-all min-h-[260px] bg-white group">
          <div className="w-16 h-16 bg-[#ecfdf5] border border-[#a7f3d0] rounded-2xl flex items-center justify-center mb-4 text-[#22C55E] group-hover:bg-[#22C55E] group-hover:text-white transition-colors shadow-xs">
            <PixelTrophy className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-xl text-[#111827] mb-1">Punya Usaha UMKM?</h3>
          <p className="text-xs text-[#6B7280] max-w-xs mb-5 leading-relaxed">Daftarkan kebutuhan digitalisasi usaha Anda. Tim mahasiswa tercurasi siap membantu menyelesaikan tantangan bisnis.</p>
          <span className="text-xs font-semibold text-white bg-[#111827] px-6 py-2.5 rounded-xl hover:bg-[#374151] transition-colors shadow-xs inline-flex items-center gap-1.5">
            Ajukan Kemitraan →
          </span>
        </div>
      </div>

      {/* Modal */}
      {showPartnerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-[20px] max-w-lg w-full p-6 relative border border-[#E5E7EB] shadow-lg">
            <button onClick={() => setShowPartnerModal(false)} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-[#F3F4F6] text-[#6B7280] cursor-pointer"><X className="w-5 h-5" /></button>
            <h2 className="font-heading-3 text-xl font-bold text-[#111827] mb-1 flex items-center gap-2"><PixelTrophy className="w-5 h-5 text-[#22C55E]" /> Daftar Mitra UMKM</h2>
            <p className="text-xs text-[#6B7280] mb-6">Proyek akan dikurasi oleh pengampu untuk menjadi tugas akhir atau PKM mahasiswa.</p>
            
            <form onSubmit={handleSubmitPartner} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">Nama Usaha / UMKM</label>
                <input type="text" required value={form.umkmName} onChange={(e) => setForm({...form, umkmName: e.target.value})}
                  className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#22C55E] bg-[#FAFAFA]" placeholder="Toko Batik Nusantara" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1.5">Pemilik / PIC</label>
                  <input type="text" required value={form.ownerName} onChange={(e) => setForm({...form, ownerName: e.target.value})}
                    className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#22C55E] bg-[#FAFAFA]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1.5">No. WhatsApp</label>
                  <input type="tel" required value={form.contact} onChange={(e) => setForm({...form, contact: e.target.value})}
                    className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:bg-[#FAFAFA]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">Lokasi Usaha</label>
                <input type="text" required value={form.location} onChange={(e) => setForm({...form, location: e.target.value})}
                  className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#22C55E] bg-[#FAFAFA]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">Kebutuhan Digitalisasi / Solusi</label>
                <textarea rows="3" required value={form.need} onChange={(e) => setForm({...form, need: e.target.value})}
                  className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#22C55E] bg-[#FAFAFA]" />
              </div>
              {partnerSuccess ? (
                <div className="p-3.5 bg-[#ecfdf5] border border-[#a7f3d0] rounded-xl text-xs font-semibold text-[#166534] text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> Pengajuan Kemitraan Berhasil!
                </div>
              ) : (
                <div className="pt-4 flex justify-end gap-3 border-t border-[#E5E7EB]">
                  <button type="button" onClick={() => setShowPartnerModal(false)} className="text-xs font-medium text-[#6B7280] px-5 py-2.5 rounded-xl hover:bg-[#FAFAFA] cursor-pointer">Batal</button>
                  <button type="submit" className="text-xs font-semibold text-white bg-[#22C55E] px-6 py-2.5 rounded-xl hover:bg-[#16a34a] transition-colors cursor-pointer shadow-xs">Ajukan Sekarang</button>
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
