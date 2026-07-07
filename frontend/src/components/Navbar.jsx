import React, { useState } from 'react';
import { Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';
import { PixelRobot } from './PixelIcons';

const Navbar = ({ activeTab, setActiveTab, currentUser, setCurrentUser, theme, setTheme }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', isAnchor: true },
    { id: 'features', label: 'Features', isAnchor: true },
    { id: 'how-it-works', label: 'How it Works', isAnchor: true },
    { id: 'matchmaking', label: 'Find Team', isAnchor: false },
  ];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleNavClick = (link) => {
    if (link.isAnchor) {
      const scrollAction = () => {
        const el = document.getElementById(link.id);
        if (el) {
          if (window.lenis) {
            window.lenis.scrollTo(el, { offset: 0 , duration: 1.5 });
          } else {
            const y = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }
      };

      if (activeTab !== 'home') {
        setActiveTab('home');
        setTimeout(scrollAction, 100);
      } else {
        scrollAction();
      }
    } else {
      setActiveTab(link.id);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all">
      {/* Top Subtle Laser Line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-brand)] to-transparent w-full opacity-60" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 relative">
          
          {/* Left: Logo */}
          <div className="flex-1 flex justify-start">
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <span className="font-heading text-xl font-bold theme-text tracking-tight flex items-center gap-1.5">
              Verstack
            </span>
            </div>
          </div>

          {/* Center: Features | Discover | How it Works | Pricing | Resources */}
          <nav className="hidden md:flex items-center gap-1 theme-surface/80 px-1 py-1 rounded-full theme-border border shadow-sm backdrop-blur-md absolute left-1/2 -translate-x-1/2">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link)}
                className={`px-4 py-1.5 text-xs font-medium transition-all cursor-pointer rounded-full ${
                  link.id === 'matchmaking'
                    ? activeTab === 'matchmaking'
                      ? 'primary-bg text-[#111111] font-bold shadow-[0_0_12px_rgba(204,253,21,0.4)] scale-105'
                      : 'brand-badge font-semibold hover:primary-bg hover:text-[#111111]'
                    : activeTab === link.id && !link.isAnchor
                    ? 'bg-black/10 dark:bg-white/10 theme-text font-semibold'
                    : 'theme-text-sub hover:theme-text hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right side: Theme Switcher + Get Started */}
          <div className="flex-1 flex items-center justify-end gap-3">
            
            {currentUser ? (
              <div 
                onClick={() => setCurrentUser(null)}
                title="Click to Logout"
                className="backdrop-blur-md flex items-center gap-2 pl-2 pr-3 py-1.5 bg-black/5 dark:bg-white/5 border theme-border rounded-xl cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors shadow-sm"
              >
                <div className="w-6 h-6 rounded-full primary-bg flex items-center justify-center text-[#111111] font-bold text-[11px] shadow-sm">
                  {currentUser.name ? currentUser.name.charAt(0) : 'U'}
                </div>
                <span className="text-xs font-medium theme-text hidden sm:block">
                  {currentUser.name || 'Profile'}
                </span>
              </div>
            ) : (
              <button 
                onClick={() => setCurrentUser({ name: 'Budi Santoso', role: 'Developer', skills: ['React', 'Node.js'], freeHours: 15 })}
                className="btn-brand-primary px-5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer shadow-sm flex items-center gap-1.5"
              >
                <span>Login</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Theme Switcher Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2.5 rounded-xl theme-surface/80 backdrop-blur-md hover:bg-black/10 dark:hover:bg-white/10 theme-text-sub hover:theme-text theme-border border transition-all cursor-pointer flex items-center justify-center shadow-sm"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 brand-text" /> : <Moon className="w-4 h-4 brand-text" />}
            </button>
  
            {/* Mobile menu toggle */}
            <button 
              className="md:hidden ml-1 p-2.5 rounded-full theme-surface/80 backdrop-blur-md hover:bg-black/10 dark:hover:bg-white/10 theme-border border cursor-pointer theme-text transition-all shadow-sm"
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
                className={`block w-full text-left px-4 py-2.5 text-xs font-medium rounded-xl cursor-pointer ${
                  link.id === 'matchmaking'
                    ? activeTab === 'matchmaking'
                      ? 'primary-bg text-[#111111] font-bold shadow-[0_0_12px_rgba(204,253,21,0.4)]'
                      : 'brand-badge font-semibold hover:primary-bg hover:text-[#111111]'
                    : activeTab === link.id && !link.isAnchor
                    ? 'bg-black/10 dark:bg-white/10 theme-text font-semibold'
                    : 'theme-text-sub hover:theme-text hover:theme-surface'
                }`}
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
