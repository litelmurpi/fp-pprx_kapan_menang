import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Sun, Moon, Eye, EyeOff, Key, Sparkles, UserCheck } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col justify-center items-center bg-[var(--color-canvas)] bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] light:bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:48px_48px] relative px-4 transition-colors duration-300 font-sans">
      
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[var(--color-primary)]/10 dark:bg-[var(--color-primary)]/10 light:bg-[var(--color-primary)]/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      
      {/* Top Header Theme Toggler */}
      <header className="absolute top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="p-2.5 rounded-xl bg-[var(--color-surface)] hover:opacity-80 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-[var(--color-border)] transition-all cursor-pointer flex items-center justify-center shadow-sm"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 brand-text" /> : <Moon className="w-4 h-4 brand-text" />}
        </button>
      </header>

      {/* Main Login Card */}
      <main className="w-full max-w-[480px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 md:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.25)] relative transition-all duration-300">
        {/* Subtle Laser Accent line across top */}
        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-60"></div>
        
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-10 w-10 rounded-xl bg-[var(--color-primary)] flex items-center justify-center shadow-[0_0_20px_rgba(204,253,21,0.25)] mb-3">
            <Sparkles className="w-5 h-5 text-[#111111]" />
          </div>
          <h2 className="text-xl font-display font-bold tracking-tight text-[var(--color-text-primary)]">Masuk ke Verstack</h2>
          <p className="text-xs text-[var(--color-text-secondary)] font-mono uppercase tracking-widest mt-1">Academic Workspace</p>
        </div>

        {/* Global Error Banner */}
        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs flex items-center gap-2 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Alamat Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (formErrors.email) setFormErrors({ ...formErrors, email: null });
              }}
              placeholder="nama@students.amikom.ac.id"
              className={`w-full bg-black/20 dark:bg-black/20 light:bg-zinc-100 text-sm font-medium px-4 py-3 rounded-xl border transition-all placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 ${
                formErrors.email 
                  ? 'border-red-500/50 focus:border-red-500' 
                  : 'border-[var(--color-border)] focus:border-[var(--color-primary)]'
              }`}
            />
            {formErrors.email && (
              <p className="text-[10px] text-red-400 mt-1.5 font-medium">{formErrors.email}</p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Password</label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (formErrors.password) setFormErrors({ ...formErrors, password: null });
                }}
                placeholder="Masukkan password Anda"
                className={`w-full bg-black/20 dark:bg-black/20 light:bg-zinc-100 text-sm font-medium pl-4 pr-11 py-3 rounded-xl border transition-all placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 ${
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
              <p className="text-[10px] text-red-400 mt-1.5 font-medium">{formErrors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary-hover)] font-semibold text-xs py-3.5 rounded-xl cursor-pointer transition-all duration-200 shadow-[0_4px_20px_rgba(204,253,21,0.2)] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Key className="w-3.5 h-3.5" />
            <span>Mulai Kolaborasi</span>
          </button>
        </form>

        {/* Register Redirect Link */}
        <div className="text-center mt-6">
          <p className="text-xs text-[var(--color-text-secondary)]">
            Belum terdaftar?{' '}
            <Link to="/register" className="brand-text hover:underline font-semibold">
              Buat akun baru &rarr;
            </Link>
          </p>
        </div>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--color-border)]"></div>
          </div>
          <div className="relative flex justify-center text-[10px] font-semibold text-[var(--color-text-tertiary)] uppercase">
            <span className="bg-[var(--color-surface)] px-3 tracking-wider">Akses Uji Coba (Demo)</span>
          </div>
        </div>

        {/* Demo Account Pills */}
        <div className="space-y-3">
          <p className="text-[10px] text-[var(--color-text-tertiary)] text-center uppercase tracking-wider font-mono">
            Klik akun simulasi di bawah untuk mengisi form
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {demoAccounts.map((account) => (
              <button
                key={account.email}
                type="button"
                onClick={() => handleDemoLogin(account.email)}
                className="px-3 py-1.5 text-[10px] font-medium rounded-full bg-black/10 dark:bg-black/10 light:bg-zinc-100 hover:bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-[var(--color-border)] transition-all cursor-pointer flex items-center gap-1"
              >
                <UserCheck className="w-2.5 h-2.5 text-[var(--color-primary)]" />
                <span>{account.name}</span>
              </button>
            ))}
          </div>
        </div>
      </main>
      
      {/* Footer Branding */}
      <footer className="mt-8 text-center text-[10px] text-[var(--color-text-tertiary)] font-mono">
        <p>&copy; 2026 UKM Amikom ACC. Powered by Verstack Visual Systems.</p>
      </footer>
    </div>
  );
};

export default LoginPage;
