import React from 'react';
import { PixelRobot, PixelHeart } from './PixelIcons';

const Footer = ({ setActiveTab }) => {
  return (
    <footer className="border-t border-[#E5E7EB] bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl bg-[#22C55E] text-white flex items-center justify-center shadow-sm">
                <PixelRobot className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading-3 text-base font-bold text-[#111827]">KolaborasiKampus</span>
            </div>
            <p className="text-xs text-[#6B7280] leading-relaxed max-w-xs">
              Platform kolaborasi tim kampus bebas free-rider dengan rekam jejak terverifikasi SHA-256. Proyek kemitraan &amp; akademik terintegrasi.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h4 className="text-xs font-semibold text-[#111827] uppercase tracking-wider mb-4">Navigasi Utama</h4>
            <ul className="space-y-2 text-xs text-[#6B7280]">
              <li><button onClick={() => setActiveTab('home')} className="hover:text-[#111827] transition-colors cursor-pointer">Beranda Utama</button></li>
              <li><button onClick={() => setActiveTab('matchmaking')} className="hover:text-[#111827] transition-colors cursor-pointer">Cari Tim &amp; Proyek</button></li>
              <li><button onClick={() => setActiveTab('workspace')} className="hover:text-[#111827] transition-colors cursor-pointer">Ruang Kerja Checkpoint</button></li>
              <li><button onClick={() => setActiveTab('peereval')} className="hover:text-[#111827] transition-colors cursor-pointer">Evaluasi 360° &amp; Portofolio</button></li>
              <li><button onClick={() => setActiveTab('umkm')} className="hover:text-[#111827] transition-colors cursor-pointer">Kemitraan SDG 8 UMKM</button></li>
            </ul>
          </div>

          {/* Tech stack badges per DESIGN.md */}
          <div>
            <h4 className="text-xs font-semibold text-[#111827] uppercase tracking-wider mb-4">Teknologi Tervalidasi</h4>
            <div className="flex flex-wrap gap-2">
              <span className="text-[11px] font-medium text-[#111827] bg-white border border-[#E5E7EB] px-3 py-1 rounded-full shadow-xs">Laravel 11 API</span>
              <span className="text-[11px] font-medium text-[#111827] bg-white border border-[#E5E7EB] px-3 py-1 rounded-full shadow-xs">React + Vite</span>
              <span className="text-[11px] font-medium text-[#111827] bg-white border border-[#E5E7EB] px-3 py-1 rounded-full shadow-xs">Tailwind CSS</span>
              <span className="text-[11px] font-medium text-[#22C55E] bg-[#ecfdf5] border border-[#a7f3d0] px-3 py-1 rounded-full shadow-xs">SHA-256 Crypto</span>
            </div>
          </div>

        </div>

        <div className="mt-10 pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B7280]">
          <p>© 2026 KolaborasiKampus. All rights reserved.</p>
          <span className="flex items-center gap-1.5 font-medium text-[#111827]">
            Dibuat dengan <PixelHeart className="w-4 h-4 text-[#22C55E] inline" /> untuk integritas akademik &amp; industri
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
