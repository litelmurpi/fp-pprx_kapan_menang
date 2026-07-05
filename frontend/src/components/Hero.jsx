import React from 'react';
import { ArrowRight, Terminal, ShieldCheck, Cpu, Users, GitCommit, CheckCircle2 } from 'lucide-react';
import { PixelRobot, PixelStar, PixelShield, PixelTrophy, PixelCloud, PixelDino } from './PixelIcons';

const Hero = ({ setActiveTab }) => {
  return (
    <section className="theme-canvas overflow-hidden border-b theme-border relative transition-colors duration-300">
      
      {/* Linear Spotlight Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[var(--color-primary)]/15 to-[var(--color-secondary)]/15 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-20 relative">
        
        {/* Subtle decorative accent */}
        <div className="absolute top-8 right-8 text-[var(--color-secondary)]/30 hidden md:block animate-pulse">
          <PixelCloud className="w-14 h-10" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-6 sm:pt-10">
          
          {/* Left Column: Headline & CTAs */}
          <div className="lg:col-span-7 text-left z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/5 dark:bg-white/5 border theme-border rounded-full text-xs font-medium theme-text-sub mb-6 shadow-xs">
              <span className="w-2 h-2 rounded-full primary-bg animate-pulse" />
              <span>Verstack High-Performance Workspace v2.0</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-bold leading-[1.08] tracking-tight theme-text">
              Build projects with <br />
              <span className="primary-text font-extrabold">verified teams.</span><br />
              Zero free-riders.
            </h1>

            <p className="theme-text-sub text-base sm:text-lg font-normal mt-6 max-w-xl leading-relaxed">
              Platform kolaborasi kampus berpresisi tinggi. Temukan rekan tim berbasis kompatibilitas skill aktual, pantau progres mingguan via checkpoint transparan, dan terbitkan portofolio kriptografis <strong className="theme-text font-semibold">SHA-256</strong>.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <button
                onClick={() => setActiveTab('matchmaking')}
                className="btn-primary text-sm px-7 py-3.5 rounded-lg inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Mulai Matchmaking</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveTab('workspace')}
                className="btn-secondary text-sm px-6 py-3.5 rounded-lg inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Lihat Ruang Kerja</span>
                <span className="font-mono-tech text-xs opacity-60">⌘K</span>
              </button>
            </div>

            {/* Tech badges / stats */}
            <div className="grid grid-cols-3 gap-6 mt-14 pt-8 border-t theme-border-subtle">
              <div>
                <p className="text-2xl sm:text-3xl font-bold theme-text font-mono-tech tracking-tight">100%</p>
                <p className="text-xs theme-text-muted mt-1">Audit Trail Immutable</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold theme-text font-mono-tech tracking-tight">SHA-256</p>
                <p className="text-xs theme-text-muted mt-1">Verified Credentials</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold theme-text font-mono-tech tracking-tight">&lt;10%</p>
                <p className="text-xs theme-text-muted mt-1">Free-Rider Threshold</p>
              </div>
            </div>
          </div>

          {/* Right Column: Linear Dashboard Preview Mockup */}
          <div className="lg:col-span-5 relative">
            <div className="theme-card rounded-[16px] p-6 shadow-2xl relative overflow-hidden border-t-2 primary-border">
              
              {/* Top Bar / Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b theme-border-subtle">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 font-mono-tech text-[11px] theme-text-sub font-medium">sprint-4-evaluation.log</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono-tech font-semibold badge-primary">
                  ● ACTIVE SPRINT
                </span>
              </div>

              {/* Mockup list item 1 */}
              <div className="p-3.5 rounded-xl bg-white/5 dark:bg-white/5 border theme-border mb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 primary-text" />
                    <span className="text-xs font-semibold theme-text">API Integration Checkpoint #3</span>
                  </div>
                  <span className="font-mono-tech text-[10px] theme-text-muted">2m ago</span>
                </div>
                <div className="flex items-center justify-between mt-2.5 pt-2 border-t theme-border-subtle text-[11px]">
                  <span className="theme-text-sub flex items-center gap-1">
                    <GitCommit className="w-3.5 h-3.5 primary-text" /> commit <code className="font-mono-tech secondary-text">a8f9c20</code>
                  </span>
                  <span className="primary-text font-medium">Validated by System</span>
                </div>
              </div>

              {/* Mockup list item 2 (Flagged free rider simulation) */}
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 mb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span className="text-xs font-bold text-red-500 dark:text-red-400">Variance Alert: Low Participation</span>
                  </div>
                  <span className="font-mono-tech text-[10px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-500 font-bold">8% WORK</span>
                </div>
                <p className="text-[11px] text-red-600 dark:text-red-300 mt-1">
                  Kontribusi anggota &lt;10% threshold rata-rata tim. Kredensial otomatis ditahan.
                </p>
              </div>

              {/* Mockup list item 3 (AI skill fit) */}
              <div className="p-3.5 rounded-xl bg-white/5 dark:bg-white/5 border theme-border flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded badge-info flex items-center justify-center text-[10px] font-bold">
                    AI
                  </div>
                  <div>
                    <p className="text-xs font-semibold theme-text">Frontend Engineer (React/Vite)</p>
                    <p className="text-[10px] theme-text-muted">Proyek: e-Commerce Kasir UMKM</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-mono-tech font-bold badge-primary">
                  94% FIT
                </span>
              </div>

              {/* Bottom decorative bar */}
              <div className="mt-4 pt-3 border-t theme-border-subtle flex items-center justify-between text-[10px] font-mono-tech theme-text-muted">
                <span>VERSTACK CRYPTO PROOF</span>
                <span className="primary-text">SHA256: 7f83b1...9a4c</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
