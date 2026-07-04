import React from 'react';
import { ArrowRight, Terminal, ShieldCheck, Cpu, Users } from 'lucide-react';
import { PixelRobot, PixelStar, PixelShield, PixelTrophy, PixelCloud, PixelDino } from './PixelIcons';

const Hero = ({ setActiveTab }) => {
  return (
    <section className="bg-white overflow-hidden border-b border-[#E5E7EB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-20 relative">
        
        {/* Floating Pixel Decorations (Subtle accents per DESIGN.md) */}
        <div className="absolute top-10 right-10 text-[#22C55E]/40 hidden md:block animate-pulse">
          <PixelCloud className="w-16 h-12" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-6 sm:pt-10">
          
          {/* Left Column: Headline & CTAs */}
          <div className="lg:col-span-7 text-left z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#F3F4F6] border border-[#E5E7EB] rounded-full text-xs font-semibold text-[#111827] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
              <span>Platform Kolaborasi Kampus Terverifikasi SHA-256</span>
            </div>

            <h1 className="font-display-1 text-4xl sm:text-6xl font-bold text-[#111827] leading-[1.05] tracking-tight">
              Build projects with <br />
              <span className="text-[#22C55E]">verified teams.</span><br />
              No free-riders.
            </h1>

            <p className="text-[#4B5563] text-base sm:text-lg font-normal mt-6 max-w-xl leading-relaxed">
              Temukan rekan tim berbasis skill aktual, pantau progres mingguan melalui checkpoint transparan, dan dapatkan portofolio kriptografis <strong className="text-[#111827] font-semibold">SHA-256</strong> yang diakui industri.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <button
                onClick={() => setActiveTab('matchmaking')}
                className="bg-[#22C55E] text-white font-semibold text-sm px-8 py-4 rounded-xl hover:bg-[#16a34a] transition-all cursor-pointer inline-flex items-center gap-2 border border-[#16a34a] shadow-sm hover:translate-y-[-2px]"
              >
                Mulai Matchmaking
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActiveTab('workspace')}
                className="bg-white text-[#111827] font-medium text-sm px-6 py-4 rounded-xl border border-[#E5E7EB] hover:bg-[#FAFAFA] transition-all cursor-pointer shadow-sm hover:border-[#111827]"
              >
                Lihat Ruang Kerja →
              </button>
            </div>

            {/* Bottom trust bar */}
            <div className="mt-12 pt-6 border-t border-[#E5E7EB] flex items-center gap-6 text-xs text-[#6B7280] font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
                <span>Anti-Free-Rider System</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#4F46E5]" />
                <span>AI Weighted Score</span>
              </div>
            </div>
          </div>

          {/* Right Column: Digital Workspace Mockup with Pixel Accents */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <div className="relative bg-[#FAFAFA] border border-[#E5E7EB] rounded-[20px] p-6 shadow-sm group hover:border-[#22C55E] transition-all">
              
              {/* Top Bar of Mockup */}
              <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="text-xs font-mono text-[#6B7280] ml-2">workspace // checkpoint-audit</span>
                </div>
                <span className="px-2 py-0.5 bg-green-100 text-green-800 font-medium text-[10px] rounded-full">
                  Active Sprint
                </span>
              </div>

              {/* Mockup Card Content */}
              <div className="space-y-3">
                <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#ecfdf5] text-[#166534] flex items-center justify-center font-bold text-xs">
                      <PixelRobot className="w-5 h-5 text-[#22C55E]" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#111827]">Sistem Kasir UMKM Kopi</div>
                      <div className="text-[11px] text-[#6B7280]">Checkpoint #3: Backend API Integration</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#22C55E]">94% Match</span>
                </div>

                <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#e0e7ff] text-[#4338ca] flex items-center justify-center font-bold text-xs">
                      <PixelShield className="w-5 h-5 text-[#4F46E5]" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#111827]">Audit SHA-256 Hash</div>
                      <div className="text-[11px] text-[#6B7280] font-mono">8f9b...4a2e (Tamper-Proof)</div>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-green-50 text-green-700 text-[10px] font-semibold rounded">Verified</span>
                </div>
              </div>

              {/* Mascot Accent Box */}
              <div className="mt-5 pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#FAFAFA] border border-[#E5E7EB] flex items-center justify-center">
                    <PixelDino className="w-5 h-5 text-[#22C55E]" />
                  </div>
                  <div className="text-xs text-[#4B5563]">
                    <span className="font-semibold text-[#111827]">Kampus Dino:</span> "Tim seimbang, proyek tuntas!"
                  </div>
                </div>
                <PixelStar className="w-4 h-4 text-[#F59E0B]" />
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* WHO WE ARE / STATISTIK SECTION */}
      <div className="bg-[#FAFAFA] border-t border-[#E5E7EB] py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-12">
            <h2 className="font-heading-2 text-2xl sm:text-3xl font-bold text-[#111827]">
              Platform Kolaborasi &amp; Digitalisasi Terpercaya
            </h2>
            <p className="text-sm text-[#6B7280] mt-2 max-w-xl mx-auto">
              Sistem matchmaking keahlian aktual dengan akuntabilitas rekam jejak kolaborasi kampus.
            </p>
          </div>

          {/* Statistic Card x 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white border border-[#E5E7EB] rounded-[20px] p-6 shadow-sm text-center relative overflow-hidden group hover:border-[#22C55E] transition-all">
              <div className="text-4xl sm:text-5xl font-bold text-[#111827] font-display-1">24+</div>
              <div className="text-xs font-semibold text-[#6B7280] mt-2 uppercase tracking-wider">UMKM Terdigitalisasi</div>
              <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#22C55E]" />
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-[20px] p-6 shadow-sm text-center relative overflow-hidden group hover:border-[#4F46E5] transition-all">
              <div className="text-4xl sm:text-5xl font-bold text-[#4F46E5] font-display-1">180+</div>
              <div className="text-xs font-semibold text-[#6B7280] mt-2 uppercase tracking-wider">Mahasiswa Aktif Terlibat</div>
              <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#4F46E5]" />
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-[20px] p-6 shadow-sm text-center relative overflow-hidden group hover:border-[#22C55E] transition-all">
              <div className="text-4xl sm:text-5xl font-bold text-[#22C55E] font-display-1">100%</div>
              <div className="text-xs font-semibold text-[#6B7280] mt-2 uppercase tracking-wider">Kontribusi Tervalidasi SHA-256</div>
              <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#22C55E]" />
            </div>
          </div>

          {/* Services Section */}
          <div className="text-center mb-8">
            <h3 className="font-heading-3 text-xl font-bold text-[#111827]">
              Fokus Layanan &amp; Kolaborasi
            </h3>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div 
              onClick={() => setActiveTab('matchmaking')}
              className="bg-white border border-[#E5E7EB] rounded-[20px] p-6 shadow-sm hover:translate-y-[-2px] hover:border-[#22C55E] transition-all cursor-pointer flex flex-col justify-between h-52 text-[#111827] group"
            >
              <div className="flex justify-between items-start">
                <span className="bg-[#F3F4F6] text-[#111827] font-semibold text-[11px] px-3 py-1 rounded-full border border-[#E5E7EB]">
                  Tim Proyek &amp; PKM
                </span>
                <div className="w-10 h-10 bg-[#ecfdf5] rounded-xl flex items-center justify-center text-[#22C55E] group-hover:bg-[#22C55E] group-hover:text-white transition-colors">
                  <PixelRobot className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-lg text-[#111827] mb-1">Tech Startups &amp; Kompetisi</h4>
                <p className="text-xs text-[#6B7280] leading-relaxed">Matchmaking skill akurat &amp; komitmen jam per minggu yang transparan.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div 
              onClick={() => setActiveTab('umkm')}
              className="bg-white border border-[#E5E7EB] rounded-[20px] p-6 shadow-sm hover:translate-y-[-2px] hover:border-[#4F46E5] transition-all cursor-pointer flex flex-col justify-between h-52 text-[#111827] group"
            >
              <div className="flex justify-between items-start">
                <span className="bg-[#e0e7ff] text-[#4338ca] font-semibold text-[11px] px-3 py-1 rounded-full border border-[#c7d2fe]">
                  SDG 8 · Decent Work
                </span>
                <div className="w-10 h-10 bg-[#e0e7ff] rounded-xl flex items-center justify-center text-[#4F46E5] group-hover:bg-[#4F46E5] group-hover:text-white transition-colors">
                  <PixelTrophy className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-lg text-[#111827] mb-1">Digitalisasi UMKM Lokal</h4>
                <p className="text-xs text-[#6B7280] leading-relaxed">Kemitraan pengembangan sistem informasi usaha &amp; e-commerce rintisan.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div 
              onClick={() => setActiveTab('workspace')}
              className="bg-white border border-[#E5E7EB] rounded-[20px] p-6 shadow-sm hover:translate-y-[-2px] hover:border-[#22C55E] transition-all cursor-pointer flex flex-col justify-between h-52 text-[#111827] group"
            >
              <div className="flex justify-between items-start">
                <span className="bg-[#ecfdf5] text-[#166534] font-semibold text-[11px] px-3 py-1 rounded-full border border-[#a7f3d0]">
                  Audit Trail
                </span>
                <div className="w-10 h-10 bg-[#ecfdf5] rounded-xl flex items-center justify-center text-[#22C55E] group-hover:bg-[#22C55E] group-hover:text-white transition-colors">
                  <PixelShield className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-lg text-[#111827] mb-1">Evaluasi Sejawat 360°</h4>
                <p className="text-xs text-[#6B7280] leading-relaxed">Pencegahan perilaku free-rider dengan sistem flagging otomatis.</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
