import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PixelRobot } from './PixelIcons';

const Navbar = ({ activeTab, setActiveTab, currentUser, setCurrentUser }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Beranda' },
    { id: 'matchmaking', label: 'Cari Tim' },
    { id: 'workspace', label: 'Checkpoint' },
    { id: 'peereval', label: 'Evaluasi 360°' },
    { id: 'umkm', label: 'Mitra UMKM' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[#E5E7EB] transition-all">
      {/* Top Accent Bar (Brand Green #22C55E) */}
      <div className="h-1 bg-[#22C55E] w-full" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-[#22C55E] text-white flex items-center justify-center shadow-sm group-hover:bg-[#16a34a] transition-all">
              <PixelRobot className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading-3 text-base font-bold text-[#111827] tracking-tight">
              KolaborasiKampus
            </span>
          </div>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer ${
                  activeTab === link.id
                    ? 'text-[#111827] bg-[#F3F4F6] font-semibold border border-[#E5E7EB] shadow-sm'
                    : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#FAFAFA]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right side: Masuk + Mulai Sekarang */}
          <div className="flex items-center gap-2.5">
            <button 
              onClick={() => setActiveTab('home')}
              className="text-xs font-medium text-[#6B7280] hover:text-[#111827] transition-colors px-2.5 py-1.5 cursor-pointer"
            >
              Masuk
            </button>
            <button 
              onClick={() => setActiveTab('matchmaking')}
              className="text-xs font-semibold text-white bg-[#22C55E] px-4 py-2 rounded-xl hover:bg-[#16a34a] transition-all cursor-pointer border border-[#16a34a] shadow-sm hover:translate-y-[-1px]"
            >
              Mulai Sekarang
            </button>

            {/* Mobile menu toggle */}
            <button 
              className="md:hidden ml-1 p-1.5 rounded-lg hover:bg-[#F3F4F6] border border-[#E5E7EB] cursor-pointer text-[#111827]"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#E5E7EB] py-3 space-y-1">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => { setActiveTab(link.id); setMobileOpen(false); }}
                className={`block w-full text-left px-3.5 py-2 text-xs font-medium rounded-xl cursor-pointer ${
                  activeTab === link.id
                    ? 'text-[#111827] bg-[#F3F4F6] font-semibold border border-[#E5E7EB]'
                    : 'text-[#6B7280] hover:bg-[#FAFAFA]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
