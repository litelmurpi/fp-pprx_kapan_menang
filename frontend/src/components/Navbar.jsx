import React, { useState } from 'react';
import { Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';
import { PixelRobot } from './PixelIcons';

const Navbar = ({ activeTab, setActiveTab, currentUser, setCurrentUser, theme, setTheme }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { id: 'features', label: 'Features', isAnchor: true },
    { id: 'matchmaking', label: 'Discover', isAnchor: false },
    { id: 'how-it-works', label: 'How it Works', isAnchor: true },
    { id: 'pricing', label: 'Pricing', isAnchor: true },
    { id: 'resources', label: 'Resources', isAnchor: true },
  ];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleNavClick = (link) => {
    if (link.isAnchor) {
      if (activeTab !== 'home') {
        setActiveTab('home');
        setTimeout(() => {
          const el = document.getElementById(link.id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById(link.id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setActiveTab(link.id);
    }
  };

  return (
    <header className="sticky top-0 z-50 transition-all">
      {/* Top Subtle Laser Line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-brand)] to-transparent w-full opacity-60" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <span className="font-heading text-xl font-bold theme-text tracking-tight flex items-center gap-1.5">
              Verstack
            </span>
          </div>

          {/* Center: Features | Discover | How it Works | Pricing | Resources */}
          <nav className="hidden md:flex items-center gap-1 theme-surface/80 px-3 py-1 rounded-full theme-border border shadow-sm backdrop-blur-md">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link)}
                className="px-4 py-1.5 text-xs font-medium theme-text-sub hover:theme-text transition-all cursor-pointer rounded-full hover:bg-black/5 dark:hover:bg-white/5"
              >
                {link.label}
              </button>
            ))}
            {/* Direct quick links to Workspace & PeerEval if needed */}
            <button
              onClick={() => setActiveTab('workspace')}
              className={`px-3 py-1 text-[11px] font-mono-tech rounded-full transition-all cursor-pointer ${
                activeTab === 'workspace' ? 'brand-badge font-bold' : 'theme-text-muted hover:theme-text'
              }`}
            >
              Workspace
            </button>
          </nav>

          {/* Right side: Theme Switcher + Get Started */}
          <div className="flex items-center gap-3">
            
            {/* Theme Switcher Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 rounded-xl theme-surface hover:opacity-80 theme-text-sub hover:theme-text theme-border border transition-all cursor-pointer flex items-center justify-center shadow-sm"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 brand-text" /> : <Moon className="w-4 h-4 brand-text" />}
            </button>

            <button 
              onClick={() => setActiveTab('matchmaking')}
              className="btn-brand-primary px-5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile menu toggle */}
            <button 
              className="md:hidden ml-1 p-2 rounded-xl theme-surface theme-border border cursor-pointer theme-text"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden theme-border border-t py-4 space-y-1 theme-canvas">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => { handleNavClick(link); setMobileOpen(false); }}
                className="block w-full text-left px-4 py-2.5 text-xs font-medium theme-text-sub hover:theme-text hover:theme-surface rounded-xl cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => { setActiveTab('workspace'); setMobileOpen(false); }}
              className="block w-full text-left px-4 py-2.5 text-xs font-medium brand-badge rounded-xl cursor-pointer"
            >
              Open Workspace
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
