import React, { useState } from 'react';
import { 
  ArrowRight, Sparkles, Star, Users, ShieldCheck, Cpu, Code, Layers, 
  Search, CheckCircle2, GitBranch, Terminal, Globe, Award, ChevronRight,
  Zap, MessageSquare, Briefcase, UserCheck, Activity, BarChart3, Filter
} from 'lucide-react';

const SaaSLandingPage = ({ setActiveTab }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filterOptions = ['All', 'Programming', 'UI/UX', 'Machine Learning', 'Backend', 'Frontend'];

  const previewTeammates = [
    {
      id: 1,
      name: 'Alex Rivera',
      role: 'Full-Stack Engineer',
      avatar: 'AR',
      rating: '4.9★',
      projects: 14,
      availability: '18 hrs/wk',
      match: '96%',
      category: 'Programming',
      skills: ['React', 'Next.js', 'TypeScript', 'Node.js']
    },
    {
      id: 2,
      name: 'Elena Rostova',
      role: 'AI & ML Researcher',
      avatar: 'ER',
      rating: '5.0★',
      projects: 9,
      availability: '12 hrs/wk',
      match: '94%',
      category: 'Machine Learning',
      skills: ['PyTorch', 'Python', 'LLMs', 'TensorFlow']
    },
    {
      id: 3,
      name: 'Marcus Chen',
      role: 'Lead UI/UX Designer',
      avatar: 'MC',
      rating: '4.8★',
      projects: 19,
      availability: '20 hrs/wk',
      match: '92%',
      category: 'UI/UX',
      skills: ['Figma', 'Design Systems', 'Prototyping', 'Tailwind']
    },
    {
      id: 4,
      name: 'Sarah Jenkins',
      role: 'Backend Architect',
      avatar: 'SJ',
      rating: '4.9★',
      projects: 16,
      availability: '15 hrs/wk',
      match: '91%',
      category: 'Backend',
      skills: ['Laravel', 'PostgreSQL', 'Docker', 'Redis']
    },
    {
      id: 5,
      name: 'David Kim',
      role: 'Frontend Specialist',
      avatar: 'DK',
      rating: '4.7★',
      projects: 11,
      availability: '25 hrs/wk',
      match: '89%',
      category: 'Frontend',
      skills: ['Vue.js', 'React', 'Tailwind CSS', 'GraphQL']
    },
    {
      id: 6,
      name: 'Sophia Patel',
      role: 'Deep Learning Engineer',
      avatar: 'SP',
      rating: '4.9★',
      projects: 8,
      availability: '10 hrs/wk',
      match: '95%',
      category: 'Machine Learning',
      skills: ['Computer Vision', 'Python', 'Keras', 'MLOps']
    }
  ];

  const filteredTeammates = previewTeammates.filter(t => {
    const matchesCat = activeFilter === 'All' || t.category === activeFilter || t.skills.some(s => s.toLowerCase().includes(activeFilter.toLowerCase()));
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.role.toLowerCase().includes(searchQuery.toLowerCase()) || t.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full overflow-hidden theme-canvas theme-text relative">
      
      {/* ================= BACKGROUND GRID OVERLAY FOR HERO ================= */}
      <div className="absolute top-0 left-0 right-0 h-[900px] -z-10 pointer-events-none bg-grid-pattern [mask-image:radial-gradient(ellipse_80%_65%_at_50%_35%,#000_75%,transparent_100%)] opacity-100" />
      
      {/* ================= HERO SECTION ================= */}
      <section id="home" className="relative pt-48 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center z-10">
        
        {/* Large Radial Glow Behind Hero */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[var(--color-brand)]/15 blur-[140px] rounded-full pointer-events-none -z-10 animate-pulse-glow" />

        {/* Headline */}
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.04] max-w-5xl mx-auto">
          Find Your <span className="brand-text">Perfect Team.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl theme-text-sub max-w-2xl mx-auto font-normal leading-relaxed">
          Connect with talented developers, designers, and innovators based on verified skills, real collaboration ratings, and shared interests.
        </p>
        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button 
            onClick={() => setActiveTab('matchmaking')}
            className="btn-brand-primary px-8 py-4 text-sm font-semibold inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Start Building</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a 
            href="#preview" 
            className="btn-brand-secondary px-7 py-4 text-sm font-medium inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Explore Teams</span>
          </a>
        </div>

        {/* ================= HERO ILLUSTRATION (Floating Dashboard over Pixel Halftone Sphere) ================= */}
        <div className="mt-28 relative max-w-5xl mx-auto">
          
          {/* Giant Pixelated Halftone Sphere Background */}
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[550px] sm:w-[750px] h-[350px] sm:h-[450px] pointer-events-none -z-10 opacity-30 flex items-center justify-center">
            <svg viewBox="0 0 400 200" className="w-full h-full brand-text fill-current">
              {/* Halftone dot pattern circle arrangement */}
              {Array.from({ length: 15 }).map((_, row) =>
                Array.from({ length: 25 }).map((_, col) => {
                  const x = col * 16 + 8;
                  const y = row * 13 + 6;
                  const dx = x - 200;
                  const dy = y - 100;
                  const dist = Math.sqrt(dx * dx + dy * dy);
                  if (dist > 90) return null;
                  const radius = ((90 - dist) / 90) * 3.2;
                  return <circle key={`${row}-${col}`} cx={x} cy={y} r={radius} />;
                })
              )}
            </svg>
          </div>

          {/* Floating Dashboard UI */}
          <div className="theme-card backdrop-blur-md p-6 sm:p-8 rounded-[24px] shadow-[0_25px_60px_rgba(0,0,0,0.4)] text-left relative animate-float">
            
            {/* Window header */}
            <div className="flex items-center justify-between pb-5 mb-6 border-b theme-border">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-amber-500/70" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
                <span className="ml-3 font-mono-tech text-xs theme-text-sub">
                  https://app.verstack.io/
                </span>
              </div>
            </div>

            {/* Dashboard Grid Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Col 1: Team Match Score & Compatibility */}
              <div className="theme-surface p-5 rounded-[18px] border theme-border flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-brand)]/10 blur-[30px] rounded-full pointer-events-none" />
                <div>
                  <span className="text-xs theme-text-sub font-medium uppercase tracking-wider block mb-1">Team Match Score</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-extrabold brand-text font-mono-tech tracking-tight">96%</span>
                    <span className="text-xs brand-text font-semibold">▲ High Synergy</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t theme-border">
                  <div className="flex justify-between text-xs theme-text-sub mb-1.5">
                    <span>Collaboration Compatibility</span>
                    <span className="theme-text font-mono-tech font-semibold">Optimal Fit</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full brand-bg rounded-full" style={{ width: '96%' }} />
                  </div>
                </div>
              </div>

              {/* Col 2: AI Team Recommendation */}
              <div className="theme-surface p-5 rounded-[18px] border theme-border space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs theme-text-sub font-medium uppercase tracking-wider">AI Team Recommendation</span>
                  <Sparkles className="w-4 h-4 brand-text" />
                </div>
                <div className="p-3 rounded-xl theme-card border theme-border flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-brand)]/20 border border-[var(--color-brand)]/40 flex items-center justify-center font-bold brand-text text-sm shrink-0">
                    AR
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-semibold theme-text truncate">Alex Rivera</p>
                    <p className="text-xs theme-text-sub truncate">Full-Stack · 18 hrs/wk</p>
                  </div>
                  <span className="ml-auto text-xs font-mono-tech brand-badge font-bold px-2 py-1 rounded">
                    98%
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="theme-text-sub">Member Rating:</span>
                  <span className="theme-text font-mono-tech font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 brand-text fill-current" /> 4.9★ (24 reviews)
                  </span>
                </div>
              </div>

              {/* Col 3: Skills Distribution & Active Requests */}
              <div className="theme-surface p-5 rounded-[18px] border theme-border flex flex-col justify-between">
                <div>
                  <span className="text-xs theme-text-sub font-medium uppercase tracking-wider block mb-3">Skills Distribution</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['React 94%', 'Node.js 90%', 'PyTorch 88%', 'UI/UX 92%', 'Tailwind 96%'].map((tag, i) => (
                      <span key={i} className="text-[11px] font-mono-tech px-2.5 py-1 rounded theme-card border theme-border theme-text-sub hover:border-[var(--color-brand)] hover:theme-text transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t theme-border flex items-center justify-between text-xs">
                  <span className="theme-text-sub flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 brand-text" /> Active Team Requests
                  </span>
                  <span className="font-mono-tech font-bold brand-badge px-2 py-0.5 rounded">
                    3 Pending
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom mini status bar */}
            <div className="mt-6 pt-4 border-t theme-border flex flex-wrap items-center justify-between text-xs theme-text-sub font-mono-tech gap-2">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 brand-text" />
                <span>ZERO FREE-RIDERS PROTOCOL ENABLED</span>
              </span>
              <span>SHA-256 VERIFIED WORKSPACE · VERSTACK ENGINE</span>
            </div>
          </div>
        </div>

      </section>

      {/* ================= SOCIAL PROOF ================= */}
      <section className="py-12 border-y theme-border theme-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-widest theme-text-muted font-mono-tech mb-8">
            EMPOWERING INNOVATION ACROSS TOP INSTITUTIONS &amp; COMMUNITIES
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { title: 'University Clubs', sub: 'ACM / IEEE Chapters', icon: Globe },
              { title: 'Hackathons', sub: 'Global Buildathons', icon: Award },
              { title: 'Developer Communities', sub: 'Open Source Guilds', icon: Terminal },
              { title: 'Startup Incubators', sub: 'Seed Launchpads', icon: Briefcase }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="p-5 rounded-[16px] theme-card border theme-border flex items-center gap-3.5 justify-center hover:border-[var(--color-brand)] transition-all shadow-sm">
                  <Icon className="w-5 h-5 theme-text-sub" />
                  <div className="text-left">
                    <p className="text-sm font-semibold theme-text">{item.title}</p>
                    <p className="text-[11px] theme-text-muted font-mono-tech">{item.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section id="features" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight theme-text leading-tight">
            Build Better Teams, <br />
            <span className="theme-text-sub">Not Random Groups.</span>
          </h2>
          <p className="mt-4 text-base theme-text-sub">
            Say goodbye to ghosting and mismatched skills. Verstack combines cryptographic verification with AI matchmaking to build high-velocity project teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Skill Matching */}
          <div className="theme-card p-8 rounded-[24px] flex flex-col justify-between group hover:border-[var(--color-brand)]/50 transition-all shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-2xl theme-surface border theme-border flex items-center justify-center mb-6 group-hover:scale-105 transition-transform shadow-sm">
                <Layers className="w-6 h-6 brand-text" />
              </div>
              <h3 className="font-display text-xl font-bold theme-text mb-3">Skill Matching</h3>
              <p className="text-sm theme-text-sub leading-relaxed">
                Automatically discover teammates whose skills complement yours with weighted precision algorithms.
              </p>
            </div>
            {/* Illustration: Network Nodes */}
            <div className="mt-8 pt-6 border-t theme-border flex items-center justify-center py-4 theme-surface rounded-xl border">
              <svg viewBox="0 0 200 80" className="w-48 h-20 brand-text">
                <line x1="30" y1="40" x2="100" y2="20" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                <line x1="30" y1="40" x2="100" y2="60" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                <line x1="100" y1="20" x2="170" y2="40" stroke="currentColor" strokeWidth="1.5" />
                <line x1="100" y1="60" x2="170" y2="40" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="30" cy="40" r="6" fill="var(--color-elevated)" stroke="currentColor" strokeWidth="2" />
                <circle cx="100" cy="20" r="8" fill="currentColor" />
                <circle cx="100" cy="60" r="8" fill="currentColor" opacity="0.6" />
                <circle cx="170" cy="40" r="10" fill="var(--color-elevated)" stroke="currentColor" strokeWidth="3" />
              </svg>
            </div>
          </div>

          {/* Card 2: Reputation Rating */}
          <div className="theme-card p-8 rounded-[24px] flex flex-col justify-between group hover:border-[var(--color-brand)]/50 transition-all shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-2xl theme-surface border theme-border flex items-center justify-center mb-6 group-hover:scale-105 transition-transform shadow-sm">
                <Star className="w-6 h-6 brand-text" />
              </div>
              <h3 className="font-display text-xl font-bold theme-text mb-3">Reputation Rating</h3>
              <p className="text-sm theme-text-sub leading-relaxed">
                Verified collaboration history instead of anonymous reviews. Filter out free-riders before starting.
              </p>
            </div>
            {/* Illustration: Rating Dashboard */}
            <div className="mt-8 pt-6 border-t theme-border p-4 theme-surface rounded-xl border space-y-2">
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <span className="theme-text-sub">Deliverable Quality</span>
                <span className="brand-text font-bold">5.0 ★★★★★</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <span className="theme-text-sub">On-Time Delivery</span>
                <span className="theme-text font-bold">4.9 ★★★★★</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <span className="theme-text-sub">Free-Rider Risk</span>
                <span className="brand-badge px-1.5 py-0.5 rounded text-[10px] font-bold">0.0% ZERO</span>
              </div>
            </div>
          </div>

          {/* Card 3: AI Recommendation */}
          <div className="theme-card p-8 rounded-[24px] flex flex-col justify-between group hover:border-[var(--color-brand)]/50 transition-all shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-2xl theme-surface border theme-border flex items-center justify-center mb-6 group-hover:scale-105 transition-transform shadow-sm">
                <Sparkles className="w-6 h-6 brand-text" />
              </div>
              <h3 className="font-display text-xl font-bold theme-text mb-3">AI Recommendation</h3>
              <p className="text-sm theme-text-sub leading-relaxed">
                Suggest teammates based on experience, interests, and previous project completion metrics.
              </p>
            </div>
            {/* Illustration: AI Graph Visualization */}
            <div className="mt-8 pt-6 border-t theme-border p-4 theme-surface rounded-xl border">
              <div className="flex items-end justify-between h-14 gap-2 pt-2">
                {[45, 65, 80, 55, 96, 88, 99].map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                    <div 
                      className={`w-full rounded-t transition-all ${val > 90 ? 'brand-bg shadow-[0_0_10px_var(--color-brand-glow)]' : 'bg-black/10 dark:bg-white/10'}`}
                      style={{ height: `${val}%` }}
                    />
                    <span className="text-[9px] font-mono-tech theme-text-muted">#{idx+1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t theme-border">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-xs uppercase tracking-widest brand-text font-mono-tech mb-3">WORKFLOW ARCHITECTURE</p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight theme-text">
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          
          {/* Step 01 */}
          <div className="theme-card p-8 backdrop-blur-md rounded-[24px] relative group hover:border-[var(--color-brand)]/40 transition-all shadow-sm">
            <span className="text-5xl font-extrabold font-mono-tech theme-text-muted opacity-30 group-hover:text-[var(--color-brand)] transition-colors block mb-6">
              01
            </span>
            <h3 className="font-display text-xl font-bold theme-text mb-2">Create Your Profile</h3>
            <p className="text-sm theme-text-sub leading-relaxed">
              Input your verified skills, program study, portfolio links, and weekly time commitment availability.
            </p>
          </div>

          {/* Step 02 */}
          <div className="theme-card p-8 backdrop-blur-md rounded-[24px] relative group hover:border-[var(--color-brand)]/40 transition-all shadow-sm">
            <span className="text-5xl font-extrabold font-mono-tech theme-text-muted opacity-30 group-hover:text-[var(--color-brand)] transition-colors block mb-6">
              02
            </span>
            <h3 className="font-display text-xl font-bold theme-text mb-2">Discover Compatible Members</h3>
            <p className="text-sm theme-text-sub leading-relaxed">
              Our AI engine scans thousands of creators to surface teammates with complementary skill sets and 5★ ethics.
            </p>
          </div>

          {/* Step 03 */}
          <div className="theme-card p-8 backdrop-blur-md rounded-[24px] relative group hover:border-[var(--color-brand)]/40 transition-all shadow-sm">
            <span className="text-5xl font-extrabold font-mono-tech theme-text-muted opacity-30 group-hover:text-[var(--color-brand)] transition-colors block mb-6">
              03
            </span>
            <h3 className="font-display text-xl font-bold theme-text mb-2">Build Your Team</h3>
            <p className="text-sm theme-text-sub leading-relaxed">
              Launch your workspace, track weekly milestones via SHA-256 checkpoints, and graduate without free-riders.
            </p>
          </div>

        </div>
      </section>

      {/* ================= INTERACTIVE PREVIEW ================= */}
      <section id="preview" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t theme-border">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight theme-text">
            Interactive Teammate Preview
          </h2>
          <p className="mt-4 text-sm theme-text-sub">
            Explore real-time candidate cards generated by our matching engine. Filter by discipline to see compatibility scores.
          </p>
        </div>

        {/* Large Browser Mockup */}
        <div className="theme-card rounded-[24px] overflow-hidden shadow-2xl">
          
          {/* Browser Window Header */}
          <div className="theme-surface px-6 py-4 border-b theme-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#EF4444]/80" />
              <span className="w-3 h-3 rounded-full bg-[#F59E0B]/80" />
              <span className="w-3 h-3 rounded-full brand-bg opacity-80" />
              <span className="ml-3 font-mono-tech text-xs theme-text-sub theme-card px-3 py-1 rounded border theme-border">
                https://app.verstack.io/discover
              </span>
            </div>

            {/* Search Input inside mockup */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 theme-text-sub absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search skills (React, PyTorch...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full theme-card border theme-border rounded-lg pl-9 pr-4 py-1.5 text-xs theme-text placeholder:theme-text-muted focus:outline-none focus:border-[var(--color-brand)]"
              />
            </div>
          </div>

          {/* Filters Bar */}
          <div className="p-6 border-b theme-border flex items-center gap-2 overflow-x-auto scrollbar-none theme-canvas">
            <span className="text-xs theme-text-sub font-mono-tech mr-2 flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5" /> Filters:
            </span>
            {filterOptions.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeFilter === cat
                    ? 'btn-brand-primary font-bold shadow-[0_0_15px_var(--color-brand-glow)]'
                    : 'theme-surface theme-text-sub hover:theme-text border theme-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Teammate Cards Grid */}
          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 theme-canvas">
            {filteredTeammates.map(t => (
              <div key={t.id} className="theme-card p-6 rounded-[20px] flex flex-col justify-between group hover:border-[var(--color-brand)]/60 transition-all shadow-sm">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl theme-surface border theme-border flex items-center justify-center font-bold brand-text text-sm group-hover:scale-105 transition-transform shadow-sm">
                        {t.avatar}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold theme-text group-hover:text-[var(--color-brand)] transition-colors">{t.name}</h4>
                        <p className="text-xs theme-text-sub">{t.role}</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono-tech font-extrabold brand-badge">
                      {t.match} FIT
                    </span>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-xs font-mono-tech">
                      <span className="theme-text-sub">Rating:</span>
                      <span className="theme-text font-bold">{t.rating}</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono-tech">
                      <span className="theme-text-sub">Completed Projects:</span>
                      <span className="theme-text font-semibold">{t.projects}</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono-tech">
                      <span className="theme-text-sub">Availability:</span>
                      <span className="brand-text font-semibold">{t.availability}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {t.skills.map((s, idx) => (
                      <span key={idx} className="text-[10px] font-mono-tech px-2 py-0.5 rounded theme-surface border theme-border theme-text-sub">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => setActiveTab('matchmaking')}
                  className="w-full py-2.5 rounded-xl theme-surface hover:brand-bg theme-text-sub hover:text-[#0A0A0A] dark:hover:text-[#0A0A0A] font-semibold text-xs border theme-border hover:border-[var(--color-brand)] transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Connect Teammate</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center border-t theme-border relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-brand)]/5 to-transparent pointer-events-none -z-10" />
        
        <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight theme-text">
          Stop Searching. <br />
          <span className="brand-text">Start Building.</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg theme-text-sub max-w-xl mx-auto">
          Find teammates who actually fit your project. Launch your verified workspace today.
        </p>

        <div className="mt-10">
          <button
            onClick={() => setActiveTab('matchmaking')}
            className="btn-brand-primary px-10 py-5 text-base font-bold inline-flex items-center gap-2 cursor-pointer shadow-[0_0_40px_var(--color-brand-glow)]"
          >
            <span>Find My Team</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

    </div>
  );
};

export default SaaSLandingPage;
