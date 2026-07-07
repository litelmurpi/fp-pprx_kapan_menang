import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Sun, Moon, Eye, EyeOff, Key, Sparkles, UserCheck, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  
  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleDemoLogin = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('password');
    setFormErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setFormErrors({});

    const errors = {};
    if (!email) errors.email = 'Email wajib diisi';
    if (!password) errors.password = 'Password wajib diisi';
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    } else if (result.errors) {
      setFormErrors(result.errors);
    }
  };

  const demoAccounts = [
    { name: 'Budi (Backend)', email: 'budi@students.amikom.ac.id', role: 'mahasiswa' },
    { name: 'Citra (Frontend)', email: 'citra@students.amikom.ac.id', role: 'mahasiswa' },
    { name: 'Andi (Design)', email: 'andi@students.amikom.ac.id', role: 'mahasiswa' },
    { name: 'Sarah (PIC)', email: 'sarah@acc.org', role: 'pic_ukm' },
    { name: 'Dr. Haryanto', email: 'haryanto@amikom.ac.id', role: 'dosen' },
  ];

  return (
    <div className="max-h-screen flex flex-col justify-center items-center bg-[var(--color-canvas)] bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] light:bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:48px_48px] relative p-4 sm:p-6 transition-colors duration-300 font-sans">
      
      {/* Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[var(--color-primary)]/10 dark:bg-[var(--color-primary)]/10 light:bg-[var(--color-primary)]/5 blur-[140px] rounded-full pointer-events-none -z-10"></div>
      
      {/* Theme Toggler */}
      <header className="absolute top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="p-2.5 rounded-xl bg-[var(--color-surface)] hover:opacity-80 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-[var(--color-border)] transition-all cursor-pointer flex items-center justify-center shadow-sm"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 brand-text" /> : <Moon className="w-4 h-4 brand-text" />}
        </button>
      </header>

      {/* Main Modal Card (Split Layout matching Image) */}
      <main className="w-full max-w-[960px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[28px] sm:rounded-[32px] p-3 sm:p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] relative transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch my-8">
        
        {/* Left Panel: Vibrant Hero Banner */}
        <div className="lg:col-span-6 relative overflow-hidden rounded-[22px] sm:rounded-[24px] bg-gradient-to-br from-[#161f03] via-[#0d1402] to-[#060901] dark:from-[#161f03] dark:via-[#0d1402] dark:to-[#060901] light:from-[#f0fde4] light:via-[#f8fef0] light:to-[#ffffff] border border-[var(--color-border)] p-7 sm:p-9 flex flex-col justify-between min-h-[260px] lg:min-h-[520px]">
          {/* Ambient glowing blobs inside left card */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-[var(--color-primary)]/35 rounded-full blur-[60px] pointer-events-none"></div>
          <div className="absolute top-1/3 -right-10 w-56 h-56 bg-emerald-500/20 rounded-full blur-[70px] pointer-events-none"></div>
          <div className="absolute -bottom-16 -left-10 w-72 h-72 bg-[var(--color-primary)]/20 rounded-full blur-[80px] pointer-events-none"></div>
          
          {/* Top-left Asterisk/Sparkle Icon */}
          <div className="relative z-10">
            <div className="text-[var(--color-primary)] w-10 h-10 flex items-center justify-center bg-white/5 dark:bg-white/5 light:bg-black/5 rounded-2xl border border-white/10 dark:border-white/10 light:border-black/10 shadow-sm">
              <Sparkles className="w-5 h-5 text-[var(--color-primary)]" />
            </div>
          </div>

          {/* Bottom-left Text */}
          <div className="relative z-10 mt-12 sm:mt-0 space-y-2.5">
            <p className="text-[11px] font-mono uppercase tracking-widest text-[var(--color-primary)] font-semibold">
              Verstack Collaboration Hub
            </p>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold tracking-tight text-white light:text-white leading-[1.25]">
              Temukan rekan yang tepat untuk proyek, kompetisi, atau ide berikutnya.
            </h3>
          </div>
        </div>

        {/* Right Panel: Form Area */}
        <div className="lg:col-span-6 flex flex-col justify-center p-4 sm:p-6 lg:p-12">
          <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-[var(--color-text-primary)]">
            Masuk ke Akun
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1.5 leading-relaxed">
            Satu platform untuk menemukan tim, berkolaborasi, dan menyelesaikan proyek bersama.
          </p>

          {/* Global Error Banner */}
          {error && (
            <div className="mt-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs flex items-center gap-2 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (formErrors.email) setFormErrors({ ...formErrors, email: null });
                }}
                placeholder="nama@students.amikom.ac.id"
                className={`w-full bg-black/5 dark:bg-black/10 light:bg-zinc-100 text-xs font-medium px-4 py-3 rounded-xl border transition-all placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 ${
                  formErrors.email 
                    ? 'border-red-500/50 focus:border-red-500' 
                    : 'border-[var(--color-border)] focus:border-[var(--color-primary)]'
                }`}
              />
              {formErrors.email && (
                <p className="text-[10px] text-red-400 mt-1 font-medium">{formErrors.email}</p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-[var(--color-text-primary)]">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (formErrors.password) setFormErrors({ ...formErrors, password: null });
                  }}
                  placeholder="••••••••••••"
                  className={`w-full bg-black/5 dark:bg-black/10 light:bg-zinc-100 text-xs font-medium pl-4 pr-11 py-3 rounded-xl border transition-all placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 ${
                    formErrors.password 
                      ? 'border-red-500/50 focus:border-red-500' 
                      : 'border-[var(--color-border)] focus:border-[var(--color-primary)]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {formErrors.password && (
                <p className="text-[10px] text-red-400 mt-1 font-medium">{formErrors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary-hover)] font-bold text-sm py-3.5 rounded-xl cursor-pointer transition-all duration-200 shadow-[0_4px_20px_rgba(204,253,21,0.2)] active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
            >
              <span>Masuk</span>
            </button>
          </form>

          {/* Bottom link */}
          <p className="text-center text-xs text-[var(--color-text-secondary)] mt-8 font-medium">
            Belum punya akun?{' '}
            <Link to="/register" className="text-[var(--color-text-primary)] hover:underline font-bold">
              Daftar Sekarang
            </Link>
          </p>
        </div>
      </main>
      
      {/* Footer Branding */}
      <footer className="mt-4 mb-6 text-center text-[10px] text-[var(--color-text-tertiary)] font-mono">
        <p>&copy; 2026 Verstack Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LoginPage;

