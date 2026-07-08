import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon, ArrowRight, ChevronDown, Briefcase, LogOut, Calendar } from 'lucide-react';
import AvailabilityModal from './AvailabilityModal';

const Navbar = ({ activeTab, setActiveTab, currentUser, theme, setTheme, logout }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [availabilityModalOpen, setAvailabilityModalOpen] = useState(false);

  const navLinks = currentUser ? [
    { id: 'home', label: 'Dashboard', isAnchor: false },
    { id: 'matchmaking', label: 'Find Team', isAnchor: false },
    { id: 'workspace', label: 'Workspace', isAnchor: false },
    { id: 'umkm', label: 'UMKM', isAnchor: false },
  ] : [
    { id: 'home', label: 'Home', isAnchor: true },
    { id: 'features', label: 'Features', isAnchor: true },
    { id: 'how-it-works', label: 'How it Works', isAnchor: true },
    { id: 'matchmaking', label: 'Find Team', isAnchor: false },
  ];

  const toggleTheme = () => {
    if (!document.startViewTransition) {
      setTheme(theme === 'dark' ? 'light' : 'dark');
      return;
    }
    document.startViewTransition(() => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    });
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

          {/* Right side: Theme Switcher + User Profile / Logout */}
          <div className="flex-1 flex items-center justify-end gap-3">
            
            {/* User Info & Dropdown */}
            {currentUser ? (
              <div className="relative">
                {profileDropdownOpen && (
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setProfileDropdownOpen(false)} 
                  />
                )}

                <button 
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="h-[38px] backdrop-blur-md flex items-center gap-2 pl-2 pr-2.5 bg-black/5 dark:bg-white/5 border theme-border rounded-xl cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors shadow-sm select-none"
                >
                  {currentUser.avatar ? (
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.name || 'Profile'} 
                      className="w-5 h-5 rounded-full border theme-border shrink-0 object-cover"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full primary-bg flex items-center justify-center text-[#111111] font-bold text-[10px] shadow-sm shrink-0">
                      {currentUser.name ? currentUser.name.charAt(0) : 'U'}
                    </div>
                  )}
                  <div className="hidden sm:flex items-center gap-1.5">
                    <span className="text-xs font-bold theme-text leading-none truncate max-w-[120px]">
                      {currentUser.name || 'Profile'}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 theme-text-muted transition-transform duration-200 shrink-0 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[0_12px_40px_rgba(0,0,0,0.3)] p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-2 border-b border-[var(--color-border)] mb-1 sm:hidden">
                      <p className="text-xs font-bold theme-text truncate">{currentUser.name}</p>
                      {currentUser.email && <p className="text-[10px] theme-text-muted truncate mt-0.5">{currentUser.email}</p>}
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('workspace');
                        setProfileDropdownOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium theme-text hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer text-left"
                    >
                      <Briefcase className="w-4 h-4 primary-text shrink-0" />
                      <span>Workspace</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setAvailabilityModalOpen(true);
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium theme-text hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer text-left mt-0.5"
                    >
                      <Calendar className="w-4 h-4 primary-text shrink-0" />
                      <span>Availability</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (logout) logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer text-left mt-0.5"
                    >
                      <LogOut className="w-4 h-4 shrink-0" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/login"
                className="h-[38px] btn-brand-primary px-5 rounded-xl text-xs font-semibold cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>Login</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}

            {/* Theme Switcher Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="w-[38px] h-[38px] rounded-xl theme-surface/80 backdrop-blur-md hover:bg-black/10 dark:hover:bg-white/10 theme-text-sub hover:theme-text theme-border border transition-all cursor-pointer flex items-center justify-center shadow-sm shrink-0"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 brand-text" /> : <Moon className="w-4 h-4 brand-text" />}
            </button>

            {/* Authenticated User Info & Logout OR Login/Register */}
            {currentUser ? (
              <div className="flex items-center gap-2.5 border theme-border theme-surface rounded-xl px-3 py-1.5 shadow-sm">
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  className="w-5 h-5 rounded-full border theme-border"
                />
                <div className="hidden sm:block text-left">
                  <div className="text-[10.5px] font-bold theme-text leading-none">{currentUser.name}</div>
                  <div className="text-[8px] theme-text-muted font-mono leading-none mt-1 uppercase tracking-wider">{currentUser.badge}</div>
                </div>
                <button 
                  onClick={logout}
                  title="Logout"
                  className="ml-1 text-zinc-500 hover:text-red-500 p-1 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer flex items-center justify-center"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <a 
                  href="/login"
                  className="hidden sm:flex text-xs font-semibold theme-text hover:text-[var(--color-primary)] px-3 py-1.5 transition-colors"
                >
                  Log in
                </a>
                <a 
                  href="/register"
                  className="btn-primary text-xs font-bold px-4 py-1.5 rounded-xl shadow-[0_0_15px_rgba(204,253,21,0.3)] transition-all cursor-pointer"
                >
                  Get Started
                </a>
              </div>
            )}

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

            {!currentUser && (
              <div className="px-4 py-2 mt-2 space-y-2 border-t theme-border">
                <a href="/login" className="block w-full text-center py-2.5 text-xs font-bold theme-text border theme-border rounded-xl">Log in</a>
                <a href="/register" className="block w-full text-center py-2.5 text-xs font-bold btn-primary rounded-xl">Get Started</a>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Weekly Availability Modal */}
      <AvailabilityModal
        isOpen={availabilityModalOpen}
        onClose={() => setAvailabilityModalOpen(false)}
        currentUser={currentUser}
        onSave={(updatedData) => {
          if (currentUser) {
            currentUser.schedule = updatedData.schedule;
            currentUser.freeHours = updatedData.totalWeeklyHours;
          }
        }}
      />
    </header>
  );
};

export default Navbar;
