import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Sun, Moon, Eye, EyeOff, Sparkles, UserPlus } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    nim: '',
    prodi: '',
    minat_bidang: '',
    jam_luang_per_minggu: 10,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  
  const { register, error, clearError } = useAuth();
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

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (formErrors[field]) {
      setFormErrors({ ...formErrors, [field]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setFormErrors({});

    // Client-side validations
    const errors = {};
    if (!formData.name) errors.name = 'Nama lengkap wajib diisi';
    if (!formData.email) errors.email = 'Email wajib diisi';
    if (!formData.password) errors.password = 'Password wajib diisi';
    if (formData.password.length < 8) errors.password = 'Password minimal 8 karakter';
    if (formData.password !== formData.password_confirmation) {
      errors.password_confirmation = 'Konfirmasi password tidak cocok';
    }
    if (!formData.nim) errors.nim = 'NIM wajib diisi';
    if (!formData.prodi) errors.prodi = 'Program studi wajib diisi';
    if (formData.jam_luang_per_minggu === '' || formData.jam_luang_per_minggu < 0) {
      errors.jam_luang_per_minggu = 'Jam luang minimal 0';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const result = await register(formData);
    if (result.success) {
      navigate('/');
    } else if (result.errors) {
      setFormErrors(result.errors);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[var(--color-canvas)] bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] light:bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:48px_48px] relative px-4 py-12 transition-colors duration-300 font-sans">
      
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[var(--color-primary)]/10 dark:bg-[var(--color-primary)]/10 light:bg-[var(--color-primary)]/5 blur-[130px] rounded-full pointer-events-none -z-10"></div>
      
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

      {/* Main Register Card */}
      <main className="w-full max-w-[800px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 md:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.25)] relative transition-all duration-300">
        {/* Subtle Laser Accent line across top */}
        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-60"></div>
        
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-10 w-10 rounded-xl bg-[var(--color-primary)] flex items-center justify-center shadow-[0_0_20px_rgba(204,253,21,0.25)] mb-3">
            <Sparkles className="w-5 h-5 text-[#111111]" />
          </div>
          <h2 className="text-xl font-display font-bold tracking-tight text-[var(--color-text-primary)]">Registrasi Mahasiswa</h2>
          <p className="text-xs text-[var(--color-text-secondary)] font-mono uppercase tracking-widest mt-1">Daftar Akun Kolaborator</p>
        </div>

        {/* Global Error Banner */}
        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs flex items-center gap-2 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            <span>{error}</span>
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Column: Account Details */}
            <div className="space-y-5">
              <h3 className="text-xs font-mono font-bold text-[var(--color-primary)] uppercase tracking-wider border-b border-[var(--color-border)] pb-2 mb-1">Informasi Akun</h3>
              
              <div>
                <label className="block text-[10px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  className={`w-full bg-black/20 dark:bg-black/20 light:bg-zinc-100 text-sm font-medium px-4 py-3 rounded-xl border transition-all placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 ${
                    formErrors.name 
                      ? 'border-red-500/50 focus:border-red-500' 
                      : 'border-[var(--color-border)] focus:border-[var(--color-primary)]'
                  }`}
                />
                {formErrors.name && (
                  <p className="text-[10px] text-red-400 mt-1.5 font-medium">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Alamat Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
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
                <label className="block text-[10px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Minimal 8 karakter"
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

              <div>
                <label className="block text-[10px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Konfirmasi Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password_confirmation}
                  onChange={(e) => handleInputChange('password_confirmation', e.target.value)}
                  placeholder="Ulangi password"
                  className={`w-full bg-black/20 dark:bg-black/20 light:bg-zinc-100 text-sm font-medium px-4 py-3 rounded-xl border transition-all placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 ${
                    formErrors.password_confirmation 
                      ? 'border-red-500/50 focus:border-red-500' 
                      : 'border-[var(--color-border)] focus:border-[var(--color-primary)]'
                  }`}
                />
                {formErrors.password_confirmation && (
                  <p className="text-[10px] text-red-400 mt-1.5 font-medium">{formErrors.password_confirmation}</p>
                )}
              </div>
            </div>

            {/* Right Column: Student Profiling */}
            <div className="space-y-5">
              <h3 className="text-xs font-mono font-bold text-[var(--color-primary)] uppercase tracking-wider border-b border-[var(--color-border)] pb-2 mb-1">Profil Akademis</h3>
              
              <div>
                <label className="block text-[10px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">NIM (Nomor Induk Mahasiswa)</label>
                <input
                  type="text"
                  value={formData.nim}
                  onChange={(e) => handleInputChange('nim', e.target.value)}
                  placeholder="Contoh: 22.11.1234"
                  className={`w-full bg-black/20 dark:bg-black/20 light:bg-zinc-100 text-sm font-medium px-4 py-3 rounded-xl border transition-all placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 ${
                    formErrors.nim 
                      ? 'border-red-500/50 focus:border-red-500' 
                      : 'border-[var(--color-border)] focus:border-[var(--color-primary)]'
                  }`}
                />
                {formErrors.nim && (
                  <p className="text-[10px] text-red-400 mt-1.5 font-medium">{formErrors.nim}</p>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Program Studi</label>
                <input
                  type="text"
                  value={formData.prodi}
                  onChange={(e) => handleInputChange('prodi', e.target.value)}
                  placeholder="Contoh: S1 Informatika"
                  className={`w-full bg-black/20 dark:bg-black/20 light:bg-zinc-100 text-sm font-medium px-4 py-3 rounded-xl border transition-all placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 ${
                    formErrors.prodi 
                      ? 'border-red-500/50 focus:border-red-500' 
                      : 'border-[var(--color-border)] focus:border-[var(--color-primary)]'
                  }`}
                />
                {formErrors.prodi && (
                  <p className="text-[10px] text-red-400 mt-1.5 font-medium">{formErrors.prodi}</p>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Minat Bidang (Opsional)</label>
                <input
                  type="text"
                  value={formData.minat_bidang}
                  onChange={(e) => handleInputChange('minat_bidang', e.target.value)}
                  placeholder="Contoh: Backend, Fullstack, UI/UX"
                  className="w-full bg-black/20 dark:bg-black/20 light:bg-zinc-100 text-sm font-medium px-4 py-3 border border-[var(--color-border)] rounded-xl placeholder:text-[var(--color-text-tertiary)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-[10px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Ketersediaan Jam Luang</label>
                  <span className="text-[11px] font-mono font-bold text-[var(--color-primary)]">{formData.jam_luang_per_minggu} jam/minggu</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={formData.jam_luang_per_minggu}
                  onChange={(e) => handleInputChange('jam_luang_per_minggu', parseInt(e.target.value))}
                  className="w-full accent-[var(--color-primary)] cursor-pointer"
                />
                <div className="flex justify-between text-[8px] text-[var(--color-text-tertiary)] font-mono uppercase mt-1">
                  <span>0 jam</span>
                  <span>15 jam (Sedang)</span>
                  <span>40 jam</span>
                </div>
                {formErrors.jam_luang_per_minggu && (
                  <p className="text-[10px] text-red-400 mt-1.5 font-medium">{formErrors.jam_luang_per_minggu}</p>
                )}
              </div>

            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary-hover)] font-semibold text-xs py-3.5 rounded-xl cursor-pointer transition-all duration-200 shadow-[0_4px_20px_rgba(204,253,21,0.2)] active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Daftar Akun Baru</span>
          </button>
        </form>

        {/* Login Redirect Link */}
        <div className="text-center mt-6">
          <p className="text-xs text-[var(--color-text-secondary)]">
            Sudah terdaftar?{' '}
            <Link to="/login" className="brand-text hover:underline font-semibold">
              Masuk Sekarang &rarr;
            </Link>
          </p>
        </div>
      </main>
      
      {/* Footer Branding */}
      <footer className="mt-8 text-center text-[10px] text-[var(--color-text-tertiary)] font-mono">
        <p>&copy; 2026 UKM Amikom ACC. Powered by Verstack Visual Systems.</p>
      </footer>
    </div>
  );
};

export default RegisterPage;
