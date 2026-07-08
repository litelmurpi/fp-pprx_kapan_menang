import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Sun, Moon, Eye, EyeOff, Sparkles, CheckCircle2, AlertCircle, ChevronDown } from 'lucide-react';

const AnimatedPlaceholder = ({ text, isError, visible = true, rightPadding = "right-4" }) => {
  const [items, setItems] = useState([{ id: Date.now(), text, isError }]);

  useEffect(() => {
    setItems((prev) => {
      const last = prev[prev.length - 1];
      if (last && last.text === text && last.isError === isError) return prev;
      return [...prev, { id: Date.now(), text, isError }];
    });
  }, [text, isError]);

  useEffect(() => {
    if (items.length > 1) {
      const timer = setTimeout(() => {
        setItems((prev) => prev.slice(-1));
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [items]);

  if (!visible) return null;

  return (
    <div className={`absolute left-4 ${rightPadding} top-0 bottom-0 pointer-events-none flex items-center overflow-hidden z-0`}>
      <div className="relative w-full h-5 flex items-center">
        {items.map((item, index) => {
          const isLatest = index === items.length - 1;
          const isOld = index < items.length - 1;
          return (
            <span
              key={item.id}
              className={`absolute left-0 whitespace-nowrap text-xs transition-all duration-300 ease-out truncate max-w-full ${
                item.isError 
                  ? 'font-bold text-red-500 dark:text-red-400' 
                  : 'font-medium text-[var(--color-text-secondary)]/60 dark:text-[var(--color-text-secondary)]/50'
              } ${
                isOld 
                  ? 'animate-placeholder-out' 
                  : (items.length > 1 || item.isError) && isLatest 
                    ? 'animate-placeholder-in' 
                    : 'translate-y-0 opacity-100'
              }`}
            >
              {item.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};

const LoginPage = ({ initialMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, register, error, clearError } = useAuth();

  const [mode, setMode] = useState(initialMode || (location.pathname === '/register' ? 'register' : 'login'));

  useEffect(() => {
    if (location.pathname === '/register') {
      setMode('register');
    } else if (location.pathname === '/login') {
      setMode('login');
    }
  }, [location.pathname]);

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Register form state
  const [regStep, setRegStep] = useState(1);
  const [regData, setRegData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password_confirmation: '',
    nim: '',
    prodi: '',
    minat_bidang: '',
    schedule: {
      Senin: { active: true, startHour: 8, endHour: 12 },
      Selasa: { active: true, startHour: 9, endHour: 15 },
      Rabu: { active: true, startHour: 10, endHour: 16 },
      Kamis: { active: true, startHour: 13, endHour: 17 },
      Jumat: { active: true, startHour: 8, endHour: 11 },
      Sabtu: { active: false, startHour: 9, endHour: 15 },
      Minggu: { active: false, startHour: 9, endHour: 15 },
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showDemoMenu, setShowDemoMenu] = useState(false);
  const [isProdiOpen, setIsProdiOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [forgotMsg, setForgotMsg] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  
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
    if (!document.startViewTransition) {
      setTheme(theme === 'dark' ? 'light' : 'dark');
      return;
    }
    document.startViewTransition(() => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    });
  };

  const closeToast = () => {
    setShowToast(false);
    setTimeout(() => {
      setForgotMsg(null);
    }, 300);
  };

  const triggerToast = (msg) => {
    setForgotMsg(msg);
    setShowToast(false);
    setTimeout(() => {
      setShowToast(true);
    }, 15);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setRegStep(1);
    setFormErrors({});
    closeToast();
    clearError();
    navigate(`/${newMode}`);
  };

  const handleDemoLogin = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('password');
    setRegStep(1);
    setFormErrors({});
    closeToast();
  };

  const handleForgotPassword = () => {
    setFormErrors({});
    clearError();
    if (!email || !email.includes('@')) {
      triggerToast({ type: 'error', text: 'Masukkan alamat email Anda terlebih dahulu untuk mereset password.' });
    } else {
      triggerToast({ 
        type: 'success', 
        text: (
          <span>
            Tautan reset password telah dikirim ke <strong className="font-bold">{email}</strong>
          </span>
        ) 
      });
    }
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        closeToast();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleRegChange = (field, value) => {
    setRegData({ ...regData, [field]: value });
    if (formErrors[field]) {
      setFormErrors({ ...formErrors, [field]: null });
    }
  };

  const prodiOptions = [
    'S1 Informatika',
    'S1 Sistem Informasi',
    'S1 Teknologi Informasi',
    'S1 Teknik Komputer',
    'S1 Ilmu Komunikasi',
    'S1 Manajemen',
    'S1 Akuntansi',
    'S1 DKV',
    'S1 Arsitektur',
    'D3 Manajemen Informatika',
    'D3 Teknik Informatika',
    'S2 Magister Informatika',
  ];

  const minatOptions = [
    'Artificial Intelligence',
    'Web Development',
    'Mobile Dev',
    'UI/UX Design',
    'Data Science',
    'Cyber Security',
    'Cloud & DevOps',
  ];

  const handleMinatToggle = (minat) => {
    const current = regData.minat_bidang ? regData.minat_bidang.split(', ').map(s => s.trim()).filter(Boolean) : [];
    const exists = current.includes(minat);
    const updated = exists ? current.filter(m => m !== minat) : [...current, minat];
    handleRegChange('minat_bidang', updated.join(', '));
  };

  const handleScheduleChange = (day, field, val) => {
    setRegData((prev) => {
      const currentDay = prev.schedule[day] || { active: false, startHour: 8, endHour: 16 };
      let updatedDay = { ...currentDay, [field]: val };

      if (field === 'startHour' && val >= updatedDay.endHour) {
        updatedDay.endHour = Math.min(24, val + 1);
      } else if (field === 'endHour' && val <= updatedDay.startHour) {
        updatedDay.startHour = Math.max(0, val - 1);
      }

      return {
        ...prev,
        schedule: {
          ...prev.schedule,
          [day]: updatedDay,
        },
      };
    });
  };

  const calculateTotalHours = (schedule) => {
    return Object.values(schedule || {}).reduce((sum, day) => {
      if (!day.active) return sum;
      const hrs = (day.endHour !== undefined && day.startHour !== undefined)
        ? Math.max(0, day.endHour - day.startHour)
        : (Number(day.hours) || 0);
      return sum + hrs;
    }, 0);
  };

  const handleGoogleLogin = async () => {
    clearError();
    setFormErrors({});
    const result = await login('budi@students.amikom.ac.id', 'password');
    if (result && result.success) {
      navigate('/');
    } else {
      handleDemoLogin('budi@students.amikom.ac.id');
    }
  };

  const handleLoginSubmit = async (e) => {
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
      const firstErr = Object.values(result.errors).flat()[0] || '';
      if (firstErr.toLowerCase().includes('credential') || firstErr.toLowerCase().includes('match') || firstErr.toLowerCase().includes('record') || firstErr.toLowerCase().includes('salah')) {
        setFormErrors({ credential: firstErr });
      } else {
        setFormErrors(result.errors);
        if (result.errors.email) setEmail('');
        if (result.errors.password) setPassword('');
      }
    } else if (result.message) {
      setFormErrors({ credential: result.message });
    }
  };

  const handleStep1Next = (e) => {
    e.preventDefault();
    clearError();
    setFormErrors({});

    const errors = {};
    if (!regData.firstName.trim()) errors.firstName = 'Nama depan wajib diisi';
    if (!regData.email.trim()) errors.email = 'Email wajib diisi';
    if (!regData.password) {
      errors.password = 'Password wajib diisi';
    } else if (regData.password.length < 8) {
      errors.password = 'Password minimal 8 karakter';
    }
    if (regData.password !== regData.password_confirmation) {
      errors.password_confirmation = 'Konfirmasi password tidak cocok';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setRegData((prev) => ({
        ...prev,
        ...(errors.password ? { password: '' } : {}),
        ...(errors.password_confirmation ? { password_confirmation: '' } : {}),
      }));
      return;
    }

    setRegStep(2);
  };

  const handleStep2Next = (e) => {
    e.preventDefault();
    clearError();
    setFormErrors({});

    const errors = {};
    if (!regData.nim.trim()) errors.nim = 'NIM wajib diisi';
    if (!regData.prodi) errors.prodi = 'Prodi wajib dipilih';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setRegStep(3);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setFormErrors({});

    const fullName = `${regData.firstName.trim()} ${regData.lastName.trim()}`.trim();
    const totalHours = calculateTotalHours(regData.schedule);
    const payload = {
      name: fullName,
      email: regData.email.trim(),
      password: regData.password,
      password_confirmation: regData.password_confirmation,
      nim: regData.nim.trim(),
      prodi: regData.prodi,
      minat_bidang: regData.minat_bidang.trim() || 'Umum',
      jam_luang_per_minggu: totalHours,
    };

    const result = await register(payload);
    if (result.success) {
      navigate('/');
    } else if (result.errors) {
      setFormErrors(result.errors);
      if (result.errors.email || result.errors.password || result.errors.firstName) {
        setRegStep(1);
      } else if (result.errors.nim || result.errors.prodi) {
        setRegStep(2);
      }
    }
  };

  const demoAccounts = [
    { name: 'Budi (Backend)', email: 'budi@students.amikom.ac.id', role: 'mahasiswa' },
    { name: 'Citra (Frontend)', email: 'citra@students.amikom.ac.id', role: 'mahasiswa' },
    { name: 'Andi (Design)', email: 'andi@students.amikom.ac.id', role: 'mahasiswa' },
    { name: 'Dr. Haryanto', email: 'haryanto@amikom.ac.id', role: 'dosen' },
  ];

  const getFieldError = (err) => {
    if (!err) return null;
    return Array.isArray(err) ? err[0] : err;
  };

  const handleInputFocus = (errorKey) => {
    if (formErrors[errorKey] || formErrors.credential) {
      setFormErrors((prev) => ({ ...prev, [errorKey]: null, credential: null }));
    }
    if (error) clearError();
  };

  const loginErrorMsg = mode === 'login' ? (formErrors.credential || error) : null;
  const registerErrorMsg = mode === 'register' ? error : null;

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-[var(--color-canvas)] bg-grid-pattern relative p-3 sm:p-4 transition-colors duration-300 select-none">
      
      {/* Floating Toaster Notification for Forgot Password */}
      {forgotMsg && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] max-w-md w-[90%] sm:w-auto text-white ${
          showToast ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-8 scale-95 pointer-events-none'
        } ${
          forgotMsg.type === 'error' 
            ? 'bg-red-600 dark:bg-red-500 border-red-400/50 shadow-[0_8px_30px_rgba(239,68,68,0.3)]' 
            : 'bg-emerald-600 dark:bg-emerald-500 border-emerald-400/50 shadow-[0_8px_30px_rgba(16,185,129,0.3)]'
        }`}>
          {forgotMsg.type === 'error' ? (
            <AlertCircle className="w-5 h-5 shrink-0 text-white" />
          ) : (
            <CheckCircle2 className="w-5 h-5 shrink-0 text-white" />
          )}
          <span className="text-xs font-medium tracking-wide flex-1 text-white">
            {forgotMsg.text}
          </span>
          <button 
            type="button" 
            onClick={closeToast}
            className="text-white opacity-80 hover:opacity-100 transition-opacity ml-1 cursor-pointer p-1"
          >
            ✕
          </button>
        </div>
      )}

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
      <main className="w-full max-w-[920px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[24px] sm:rounded-[28px] p-2.5 sm:p-3.5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] relative transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch my-auto">
        
        {/* Left Panel: Vibrant Hero Banner */}
        <div className="lg:col-span-6 relative overflow-hidden rounded-[20px] sm:rounded-[22px] bg-gradient-to-br from-[#161f03] via-[#0d1402] to-[#060901] border border-[var(--color-border)] p-6 sm:p-7 flex flex-col justify-between min-h-[200px] lg:h-[520px]">
          {/* Ambient glowing blobs inside left card */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-[var(--color-primary)]/35 rounded-full blur-[60px] pointer-events-none"></div>
          <div className="absolute top-1/3 -right-10 w-56 h-56 bg-[var(--color-primary)]/12 rounded-full blur-[70px] pointer-events-none"></div>
          <div className="absolute -bottom-16 -left-10 w-72 h-72 bg-[var(--color-primary)]/20 rounded-full blur-[80px] pointer-events-none"></div>
          
          {/* Top-left Asterisk/Sparkle Icon (Interactive Dummy Account Trigger) */}
          <div className="relative z-20">
            <button
              type="button"
              onClick={() => setShowDemoMenu(!showDemoMenu)}
              title="Klik untuk memilih Akun Dummy / Demo"
              className="text-[var(--color-primary)] w-10 h-10 flex items-center justify-center bg-white/10 rounded-2xl border border-white/20 shadow-md"
            >
              <Sparkles className="w-5 h-5 transition-transform group-hover:rotate-12" />
            </button>

            {/* Dummy Accounts Bubble Blocks */}
            {showDemoMenu && (
              <div className="absolute top-12 left-0 w-64 sm:w-72 flex flex-col gap-2 z-50">
                {demoAccounts.map((account, idx) => (
                  <button
                    key={idx}
                    type="button"
                    style={{ animationDelay: `${idx * 55}ms` }}
                    onClick={() => {
                      if (mode !== 'login') switchMode('login');
                      handleDemoLogin(account.email);
                      setShowDemoMenu(false);
                    }}
                    className="w-full text-left px-3.5 py-2.5 rounded-2xl bg-white/10 hover:bg-[var(--color-primary)] hover:text-[#111111] border border-white/20 backdrop-blur-md shadow-md transition-all cursor-pointer flex items-center justify-between group/item scale-100 hover:scale-[1.02] active:scale-98 animate-bubble-pop"
                  >
                    <span className="text-xs font-bold text-white group-hover/item:text-[#111111] transition-colors">
                      {account.name}
                    </span>
                    <span className="text-[9px] font-mono-tech uppercase px-2 py-0.5 rounded-lg bg-white/10 group-hover/item:bg-[#111111]/15 text-[var(--color-primary)] group-hover/item:text-[#111111] font-bold transition-colors">
                      {account.role}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bottom-left Text */}
          <div className="relative z-10 mt-12 sm:mt-0 space-y-2.5">
            <p className="text-[11px] font-mono-tech uppercase tracking-widest text-[var(--color-primary)] font-semibold">
              Verstack Hub
            </p>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold tracking-tight text-white leading-[1.25] select-text cursor-text">
              Great Teams,<br /> Build Great Things.
            </h3>
          </div>
        </div>

        {/* Right Panel: Dynamic Form Area */}
        <div className="lg:col-span-6 flex flex-col justify-between p-4 sm:p-5 lg:p-6 relative overflow-hidden h-[480px] sm:h-[500px] lg:h-[520px]">
          
          {/* Side-by-Side Horizontal Carousel Viewport (Eliminates Overlapping/Stacking) */}
          <div className="w-full overflow-hidden relative flex-1 flex flex-col min-h-0">
            <div 
              className="flex w-[200%] flex-1 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] items-stretch min-h-0"
              style={{ transform: mode === 'login' ? 'translateX(0%)' : 'translateX(-50%)' }}
            >
              
              {/* Column 1: Login Form Container (50% of track = 100% of viewport) */}
              <div
                className={`w-1/2 shrink-0 px-1 flex flex-col transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] min-h-0 ${
                  mode === 'login' ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-40 scale-[0.98] pointer-events-none select-none'
                }`}
                inert={mode !== 'login' ? true : undefined}
              >
                <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-[var(--color-text-primary)]">
                  Masuk ke Akun
                </h2>
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1.5 leading-relaxed">
                  Temukan tim impianmu, berkolaborasi, dan wujudkan proyek hebat bersama.
                </p>

                {/* Consolidated Single Credential Error Block */}
                {loginErrorMsg && (
                  <div className="mt-4 p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs flex items-center gap-2.5 animate-shake">
                    <div className="w-2 h-2 rounded-full bg-red-500 shrink-0 animate-ping" />
                    <span className="font-medium">{loginErrorMsg}</span>
                  </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleLoginSubmit} className="mt-3.5 flex flex-col justify-between flex-1 min-h-0">
                  <div className="space-y-4 overflow-y-auto pr-1 flex-1 min-h-0">
                    <div>
                      <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1.5">
                        Email
                      </label>
                      <div className="relative overflow-hidden rounded-xl">
                        <input
                          type="email"
                          value={email}
                          onFocus={() => handleInputFocus('email')}
                          onMouseDown={() => handleInputFocus('email')}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            handleInputFocus('email');
                          }}
                          placeholder=""
                          className={`w-full text-xs font-medium px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 ${
                            getFieldError(formErrors.email) || loginErrorMsg
                              ? 'bg-red-50 dark:bg-red-500/10 border-red-500 focus:border-red-500 text-red-500 dark:text-red-400' 
                              : 'bg-black/5 dark:bg-black/5 light:bg-white border-[var(--color-border)] focus:border-[var(--color-primary)]'
                          }`}
                        />
                        <AnimatedPlaceholder
                          text={getFieldError(formErrors.email) || "nama@students.amikom.ac.id"}
                          isError={!!getFieldError(formErrors.email)}
                          visible={email.length === 0}
                          rightPadding="right-4"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1.5">
                        Password
                      </label>
                      <div className="relative overflow-hidden rounded-xl">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onFocus={() => handleInputFocus('password')}
                          onMouseDown={() => handleInputFocus('password')}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            handleInputFocus('password');
                          }}
                          placeholder=""
                          className={`w-full text-xs font-medium pl-4 pr-11 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 ${
                            getFieldError(formErrors.password) || loginErrorMsg
                              ? 'bg-red-50 dark:bg-red-500/10 border-red-500 focus:border-red-500 text-red-500 dark:text-red-400' 
                              : 'bg-black/5 dark:bg-black/5 light:bg-white border-[var(--color-border)] focus:border-[var(--color-primary)]'
                          }`}
                        />
                        <AnimatedPlaceholder
                          text={getFieldError(formErrors.password) || "••••••••••••"}
                          isError={!!getFieldError(formErrors.password)}
                          visible={password.length === 0}
                          rightPadding="right-11"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] focus:outline-none z-10"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <div className="flex justify-end mt-2">
                        <button
                          type="button"
                          onClick={handleForgotPassword}
                          className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] font-medium transition-colors cursor-pointer"
                        >
                          Lupa Password?
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary-hover)] font-bold text-sm py-3.5 rounded-xl cursor-pointer transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 mt-4 shrink-0"
                  >
                    <span>Masuk</span>
                  </button>
                </form>

                {/* Divider */}
                <div className="relative my-3 flex items-center justify-center">
                  <div className="border-t border-[var(--color-border)] w-full"></div>
                  <span className="bg-[var(--color-surface)] px-3 text-[11px] text-[var(--color-text-tertiary)] uppercase tracking-wider font-semibold absolute">
                    atau
                  </span>
                </div>

                {/* Google Login Button */}
                <button
                  type="button"
                  disabled
                  title="Fitur Masuk dengan Google saat ini tidak aktif / belum tersedia"
                  className="w-full bg-white/5 dark:bg-white/10 light:bg-black/10 text-[var(--color-text-secondary)] font-bold text-xs py-3.5 px-4 rounded-xl border border-[var(--color-border)] opacity-50 cursor-not-allowed flex items-center justify-center gap-2.5 transition-all select-none"
                >
                  <svg className="w-4 h-4 shrink-0 opacity-75" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span>Masuk dengan Google</span>
                </button>

                {/* Bottom link */}
                <p className="text-center text-xs text-[var(--color-text-secondary)] mt-auto pt-3.5 font-medium">
                  Belum punya akun?{' '}
                  <button
                    type="button"
                    onClick={() => switchMode('register')}
                    className="text-[var(--color-text-primary)] hover:underline font-bold cursor-pointer"
                  >
                    Daftar
                  </button>
                </p>
              </div>

              {/* Column 2: Register Form Container (50% of track = 100% of viewport) */}
              <div
                className={`w-1/2 shrink-0 px-1 flex flex-col transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] min-h-0 ${
                  mode === 'register' ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-40 scale-[0.98] pointer-events-none select-none'
                }`}
                inert={mode !== 'register' ? true : undefined}
              >
                {regStep === 1 && (
                  <div className="animate-form-slide flex flex-col flex-1">
                      <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-[var(--color-text-primary)]">
                        Daftar Akun
                      </h2>
                    <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 leading-relaxed">
                      Temukan tim yang tepat, dimulai dari akun Anda.
                    </p>

                    {/* Server Registration Error Block */}
                    {registerErrorMsg && (
                      <div className="mt-4 p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs flex items-center gap-2.5 animate-shake">
                        <div className="w-2 h-2 rounded-full bg-red-500 shrink-0 animate-ping" />
                        <span className="font-medium">{registerErrorMsg}</span>
                      </div>
                    )}

                    {/* Register Form Step 1 */}
                    <form onSubmit={handleStep1Next} className="mt-3.5 flex flex-col justify-between flex-1 min-h-0">
                      <div className="space-y-3.5 overflow-y-auto pr-1 flex-1 min-h-0">
                        
                        {/* First Name & Last Name (Side by Side) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1.5">
                              Nama Depan
                            </label>
                            <div className="relative overflow-hidden rounded-xl">
                              <input
                                type="text"
                                value={regData.firstName}
                                onFocus={() => handleInputFocus('firstName')}
                                onMouseDown={() => handleInputFocus('firstName')}
                                onChange={(e) => {
                                  handleRegChange('firstName', e.target.value);
                                  handleInputFocus('firstName');
                                }}
                                placeholder=""
                                className={`w-full text-xs font-medium px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 ${
                                  getFieldError(formErrors.firstName) 
                                    ? 'bg-red-50 dark:bg-red-500/10 border-red-500 focus:border-red-500 text-red-500 dark:text-red-400' 
                                    : 'bg-black/5 dark:bg-black/5 light:bg-white border-[var(--color-border)] focus:border-[var(--color-primary)]'
                                }`}
                              />
                              <AnimatedPlaceholder
                                text={getFieldError(formErrors.firstName) || "Hadi"}
                                isError={!!getFieldError(formErrors.firstName)}
                                visible={regData.firstName.length === 0}
                                rightPadding="right-4"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1.5">
                              Nama Belakang
                            </label>
                            <div className="relative overflow-hidden rounded-xl">
                              <input
                                type="text"
                                value={regData.lastName}
                                onFocus={() => handleInputFocus('lastName')}
                                onMouseDown={() => handleInputFocus('lastName')}
                                onChange={(e) => {
                                  handleRegChange('lastName', e.target.value);
                                  handleInputFocus('lastName');
                                }}
                                placeholder=""
                                className={`w-full text-xs font-medium px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 ${
                                  getFieldError(formErrors.lastName) 
                                    ? 'bg-red-50 dark:bg-red-500/10 border-red-500 focus:border-red-500 text-red-500 dark:text-red-400' 
                                    : 'bg-black/5 dark:bg-black/5 light:bg-white border-[var(--color-border)] focus:border-[var(--color-primary)]'
                                }`}
                              />
                              <AnimatedPlaceholder
                                text={getFieldError(formErrors.lastName) || "Kusuma"}
                                isError={!!getFieldError(formErrors.lastName)}
                                visible={regData.lastName.length === 0}
                                rightPadding="right-4"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1.5">
                            Email
                          </label>
                          <div className="relative overflow-hidden rounded-xl">
                            <input
                              type="email"
                              value={regData.email}
                              onFocus={() => handleInputFocus('email')}
                              onMouseDown={() => handleInputFocus('email')}
                              onChange={(e) => {
                                handleRegChange('email', e.target.value);
                                handleInputFocus('email');
                              }}
                              placeholder=""
                              className={`w-full text-xs font-medium px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 ${
                                getFieldError(formErrors.email) 
                                  ? 'bg-red-50 dark:bg-red-500/10 border-red-500 focus:border-red-500 text-red-500 dark:text-red-400' 
                                  : 'bg-black/5 dark:bg-black/5 light:bg-white border-[var(--color-border)] focus:border-[var(--color-primary)]'
                              }`}
                            />
                            <AnimatedPlaceholder
                              text={getFieldError(formErrors.email) || "nama@students.amikom.ac.id"}
                              isError={!!getFieldError(formErrors.email)}
                              visible={regData.email.length === 0}
                              rightPadding="right-4"
                            />
                          </div>
                        </div>

                        {/* Password */}
                        <div>
                          <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1.5">
                            Password
                          </label>
                          <div className="relative overflow-hidden rounded-xl">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              value={regData.password}
                              onFocus={() => handleInputFocus('password')}
                              onMouseDown={() => handleInputFocus('password')}
                              onChange={(e) => {
                                handleRegChange('password', e.target.value);
                                handleInputFocus('password');
                              }}
                              placeholder=""
                              className={`w-full text-xs font-medium pl-4 pr-11 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 ${
                                getFieldError(formErrors.password) 
                                  ? 'bg-red-50 dark:bg-red-500/10 border-red-500 focus:border-red-500 text-red-500 dark:text-red-400' 
                                  : 'bg-black/5 dark:bg-black/5 light:bg-white border-[var(--color-border)] focus:border-[var(--color-primary)]'
                              }`}
                            />
                            <AnimatedPlaceholder
                              text={getFieldError(formErrors.password) || "Minimal 8 karakter"}
                              isError={!!getFieldError(formErrors.password)}
                              visible={regData.password.length === 0}
                              rightPadding="right-11"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] focus:outline-none z-10"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        {/* Konfirmasi Password */}
                        <div>
                          <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1.5">
                            Konfirmasi Password
                          </label>
                          <div className="relative overflow-hidden rounded-xl">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              value={regData.password_confirmation}
                              onFocus={() => handleInputFocus('password_confirmation')}
                              onMouseDown={() => handleInputFocus('password_confirmation')}
                              onChange={(e) => {
                                handleRegChange('password_confirmation', e.target.value);
                                handleInputFocus('password_confirmation');
                              }}
                              placeholder=""
                              className={`w-full text-xs font-medium px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 ${
                                getFieldError(formErrors.password_confirmation) 
                                  ? 'bg-red-50 dark:bg-red-500/10 border-red-500 focus:border-red-500 text-red-500 dark:text-red-400' 
                                  : 'bg-black/5 dark:bg-black/5 light:bg-white border-[var(--color-border)] focus:border-[var(--color-primary)]'
                              }`}
                            />
                            <AnimatedPlaceholder
                              text={getFieldError(formErrors.password_confirmation) || "Ulangi password"}
                              isError={!!getFieldError(formErrors.password_confirmation)}
                              visible={regData.password_confirmation.length === 0}
                              rightPadding="right-4"
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary-hover)] font-bold text-sm py-3.5 rounded-xl cursor-pointer transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 mt-4 shrink-0"
                      >
                        <span>Daftar</span>
                      </button>
                    </form>

                    {/* Bottom link */}
                    <p className="text-center text-xs text-[var(--color-text-secondary)] mt-auto pt-3.5 font-medium">
                      Sudah punya akun?{' '}
                      <button
                        type="button"
                        onClick={() => switchMode('login')}
                        className="text-[var(--color-text-primary)] hover:underline font-bold cursor-pointer"
                      >
                        Masuk
                      </button>
                    </p>
                  </div>
                )}
                {regStep === 2 && (
                  <div className="animate-form-slide flex flex-col flex-1">
                    {/* Step 2 Header */}
                    <div className="flex justify-between items-center mb-3 pb-3 border-b border-[var(--color-border)]">
                      <h2 className="text-lg sm:text-xl font-display font-bold tracking-tight text-[var(--color-text-primary)]">Profil Akademis</h2>
                      <h3 className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[var(--color-primary)] text-[#111111] uppercase tracking-wider font-mono-tech shadow-sm">Langkah 2 dari 3</h3>
                    </div>

                    {/* Server Registration Error Block */}
                    {registerErrorMsg && (
                      <div className="mb-3 p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs flex items-center gap-2.5 animate-shake">
                        <div className="w-2 h-2 rounded-full bg-red-500 shrink-0 animate-ping" />
                        <span className="font-medium">{registerErrorMsg}</span>
                      </div>
                    )}

                    <form onSubmit={handleStep2Next} className="mt-3.5 flex flex-col justify-between flex-1 min-h-0">
                      <div className="space-y-3.5 overflow-y-auto pr-1 flex-1 min-h-0">
                        {/* 1. NIM */}
                        <div>
                          <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1.5">
                            NIM <span className="text-red-500">*</span>
                          </label>
                          <div className="relative overflow-hidden rounded-xl">
                            <input
                              type="text"
                              value={regData.nim}
                              onFocus={() => handleInputFocus('nim')}
                              onMouseDown={() => handleInputFocus('nim')}
                              onChange={(e) => {
                                handleRegChange('nim', e.target.value);
                                handleInputFocus('nim');
                              }}
                              className={`w-full text-xs font-medium px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 ${
                                getFieldError(formErrors.nim)
                                  ? 'bg-red-50 dark:bg-red-500/10 border-red-500 focus:border-red-500 text-red-500 dark:text-red-400'
                                  : 'bg-black/5 dark:bg-black/5 light:bg-white border-[var(--color-border)] focus:border-[var(--color-primary)]'
                              }`}
                            />
                            <AnimatedPlaceholder
                              text={getFieldError(formErrors.nim) || "Contoh: 21.11.4321"}
                              isError={!!getFieldError(formErrors.nim)}
                              visible={regData.nim.length === 0}
                              rightPadding="right-4"
                            />
                          </div>
                        </div>

                        {/* 2. Prodi */}
                        <div className="relative">
                          <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1.5">
                            Program Studi <span className="text-red-500">*</span>
                          </label>
                          <button
                            type="button"
                            onClick={() => setIsProdiOpen(!isProdiOpen)}
                            className={`w-full text-xs font-medium px-4 py-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                              isProdiOpen
                                ? 'border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20 bg-black/10 dark:bg-black/10 light:bg-white'
                                : 'bg-black/5 dark:bg-black/5 light:bg-white border-[var(--color-border)] hover:border-[var(--color-text-secondary)]/50'
                            }`}
                          >
                            <span className={`truncate ${regData.prodi ? 'text-[var(--color-text-primary)] font-medium' : 'text-[var(--color-text-secondary)]/60'}`}>
                              {regData.prodi || 'Pilih Program Studi...'}
                            </span>
                            <ChevronDown
                              className={`w-4 h-4 text-[var(--color-text-secondary)] transition-transform duration-200 shrink-0 ${
                                isProdiOpen ? 'rotate-180 text-[var(--color-primary)]' : ''
                              }`}
                            />
                          </button>

                          {/* Dropdown Options Panel */}
                          {isProdiOpen && (
                            <>
                              <div className="fixed inset-0 z-40" onClick={() => setIsProdiOpen(false)} />
                              <div className="absolute z-50 left-0 right-0 mt-1.5 max-h-48 overflow-y-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl py-1.5 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150 divide-y divide-[var(--color-border)]/40">
                                {prodiOptions.map((prodi) => {
                                  const isSelected = regData.prodi === prodi;
                                  return (
                                    <div
                                      key={prodi}
                                      onClick={() => {
                                        handleRegChange('prodi', prodi);
                                        setIsProdiOpen(false);
                                      }}
                                      className={`px-3.5 py-2.5 text-xs cursor-pointer transition-all flex items-center justify-between ${
                                        isSelected
                                          ? 'bg-[var(--color-primary)]/15 text-[var(--color-primary)] font-bold'
                                          : 'text-[var(--color-text-primary)] hover:bg-black/5 dark:hover:bg-white/5 light:hover:bg-black/5 font-medium'
                                      }`}
                                    >
                                      <span className="truncate">{prodi}</span>
                                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0 ml-2" />}
                                    </div>
                                  );
                                })}
                              </div>
                            </>
                          )}
                        </div>

                        {/* 3. Minat & Bidang */}
                      <div>
                        <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1">
                          Minat & Bidang Keahlian
                        </label>
                        <input
                          type="text"
                          value={regData.minat_bidang}
                          onChange={(e) => handleRegChange('minat_bidang', e.target.value)}
                          placeholder="Contoh: Artificial Intelligence, UI/UX Design..."
                          className="mb-2.5 w-full text-xs font-medium px-4 py-3 rounded-xl border bg-black/5 dark:bg-black/5 light:bg-white border-[var(--color-border)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 text-[var(--color-text-primary)] transition-all placeholder:text-[var(--color-text-secondary)]/60"
                        />
                        <div className="flex flex-wrap gap-1.5">
                          {minatOptions.map((minat) => {
                            const active = regData.minat_bidang.includes(minat);
                            return (
                              <button
                                key={minat}
                                type="button"
                                onClick={() => handleMinatToggle(minat)}
                                className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                                  active
                                    ? 'bg-[var(--color-primary)] text-[#111111] border-[var(--color-primary)] shadow-sm'
                                    : 'bg-black/10 dark:bg-white/10 light:bg-black/10 text-[var(--color-text-primary)] border-[var(--color-border)] hover:bg-black/20'
                                }`}
                              >
                                {active ? '✓ ' : '+ '}{minat}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      </div>

                      <div className="flex items-center gap-2.5 mt-4 shrink-0">
                        <button
                          type="button"
                          onClick={() => setRegStep(1)}
                          className="w-1/3 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-[var(--color-text-primary)] font-bold text-sm py-3.5 rounded-xl cursor-pointer transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-1.5 border border-[var(--color-border)]"
                        >
                          <span>Kembali</span>
                        </button>
                        <button
                          type="submit"
                          className="w-2/3 bg-[var(--color-primary)] text-[#111111] font-bold text-sm py-3.5 rounded-xl cursor-pointer transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-[var(--color-primary)]/15"
                        >
                          <span>Lanjut</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {regStep === 3 && (
                  <div className="animate-form-slide flex flex-col flex-1">
                    {/* Step 3 Header */}
                    <div className="flex justify-between items-center mb-3 pb-3 border-b border-[var(--color-border)]">
                      <h2 className="text-lg sm:text-xl font-display font-bold tracking-tight text-[var(--color-text-primary)]">Jadwal Ketersediaan</h2>
                      <h3 className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[var(--color-primary)] text-[#111111] uppercase tracking-wider font-mono-tech shadow-sm">Langkah 3 dari 3</h3>
                    </div>

                    {/* Server Registration Error Block */}
                    {registerErrorMsg && (
                      <div className="mb-3 p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs flex items-center gap-2.5 animate-shake">
                        <div className="w-2 h-2 rounded-full bg-red-500 shrink-0 animate-ping" />
                        <span className="font-medium">{registerErrorMsg}</span>
                      </div>
                    )}

                    <form onSubmit={handleRegisterSubmit} className="mt-3.5 flex flex-col justify-between flex-1 min-h-0">
                      <div className="space-y-3 overflow-y-auto pr-1 flex-1 min-h-0 max-h-[300px] sm:max-h-[340px]">
                        <p className="text-xs text-[var(--color-text-primary)] font-semibold mb-2">
                          Centang hari dan pilih estimasi jam luang Anda setiap harinya:
                        </p>

                        <div className="space-y-2">
                          {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map((day) => {
                            const dayData = regData.schedule[day] || { active: false, startHour: 8, endHour: 16 };
                            const startHour = dayData.startHour !== undefined ? dayData.startHour : 8;
                            const endHour = dayData.endHour !== undefined ? dayData.endHour : (startHour + (Number(dayData.hours) || 4));
                            const formatHour = (h) => `${String(h).padStart(2, '0')}:00`;
                            const totalHrsDay = Math.max(0, endHour - startHour);

                            return (
                              <div
                                key={day}
                                className={`px-3.5 py-3 rounded-xl transition-all ${
                                  dayData.active
                                    ? 'bg-[var(--color-primary)]/[0.08] dark:bg-[var(--color-primary)]/[0.05] border border-[var(--color-primary)]/50 dark:border-[var(--color-primary)]/40 shadow-sm'
                                    : 'bg-black/5 dark:bg-white/5 border border-[var(--color-border)] opacity-50'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <label className="flex items-center gap-3 cursor-pointer select-none group">
                                    <input
                                      type="checkbox"
                                      checked={dayData.active}
                                      onChange={(e) => handleScheduleChange(day, 'active', e.target.checked)}
                                      className="sr-only"
                                    />
                                    <div
                                      className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                                        dayData.active
                                          ? 'bg-[var(--color-primary)] border-[var(--color-primary)] shadow-sm shadow-[var(--color-primary)]/30 scale-105'
                                          : 'bg-black/5 dark:bg-white/5 border-[var(--color-border)] group-hover:border-[var(--color-primary)]/60'
                                      }`}
                                    >
                                      <svg
                                        className={`w-3.5 h-3.5 text-[#111111] transition-all duration-200 ${
                                          dayData.active ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                                        }`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M4.5 12.75l6 6 9-13.5" />
                                      </svg>
                                    </div>
                                    <span className={dayData.active ? 'font-extrabold text-sm text-[var(--color-text-primary)] transition-colors' : 'text-xs text-[var(--color-text-secondary)] font-medium group-hover:text-[var(--color-text-primary)] transition-colors'}>
                                      {day}
                                    </span>
                                  </label>

                                  {dayData.active ? (
                                    <span className="text-[11px] font-extrabold font-mono px-2.5 py-1 rounded-md bg-[var(--color-primary)] text-[#111111] shadow-sm">
                                      {formatHour(startHour)} - {formatHour(endHour)} ({totalHrsDay} Jam)
                                    </span>
                                  ) : (
                                    <span className="text-[11px] font-semibold italic text-[var(--color-text-secondary)]">Tidak aktif</span>
                                  )}
                                </div>

                                {dayData.active && (
                                  <div className="mt-3.5 pt-2.5 border-t border-[var(--color-primary)]/20 px-1 pb-1">
                                    {/* Slider Track Container */}
                                    <div className="relative h-5 flex items-center select-none">
                                      {/* Base Dark Contrast Track */}
                                      <div className="absolute w-full h-2 bg-black/25 dark:bg-white/15 rounded-full overflow-hidden" />

                                      {/* Active Brand Highlight Bar */}
                                      <div
                                        className="absolute h-2 bg-[var(--color-primary)] rounded-full transition-all duration-75 shadow-sm shadow-[var(--color-primary)]/40"
                                        style={{
                                          left: `${(startHour / 24) * 100}%`,
                                          width: `${((endHour - startHour) / 24) * 100}%`,
                                        }}
                                      />

                                      {/* Input 1: Start Hour */}
                                      <input
                                        type="range"
                                        min="0"
                                        max="23"
                                        value={startHour}
                                        onChange={(e) => handleScheduleChange(day, 'startHour', Number(e.target.value))}
                                        className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--color-primary)] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#111111] [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer hover:[&::-webkit-slider-thumb]:scale-125 transition-all z-10"
                                      />

                                      {/* Input 2: End Hour */}
                                      <input
                                        type="range"
                                        min="1"
                                        max="24"
                                        value={endHour}
                                        onChange={(e) => handleScheduleChange(day, 'endHour', Number(e.target.value))}
                                        className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--color-primary)] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#111111] [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer hover:[&::-webkit-slider-thumb]:scale-125 transition-all z-20"
                                      />
                                    </div>

                                    {/* Time ticks / legend */}
                                    <div className="flex justify-between items-center text-[10px] text-[var(--color-text-primary)]/80 font-mono mt-1.5 font-extrabold">
                                      <span>00:00</span>
                                      <span>06:00</span>
                                      <span>12:00</span>
                                      <span>18:00</span>
                                      <span>24:00</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 mt-4 shrink-0">
                        <button
                          type="button"
                          onClick={() => setRegStep(2)}
                          className="w-1/3 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-[var(--color-text-primary)] font-bold text-sm py-3.5 rounded-xl cursor-pointer transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-1.5 border border-[var(--color-border)]"
                        >
                          <span>Kembali</span>
                        </button>
                        <button
                          type="submit"
                          className="w-2/3 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary-hover)] font-bold text-sm py-3.5 rounded-xl cursor-pointer transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-[var(--color-primary)]/15"
                        >
                          <span>Selesai</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer Branding */}
      <footer className="w-full mt-auto py-2 text-center text-[10px] text-[var(--color-text-tertiary)] font-mono-tech shrink-0">
        <p>&copy; 2026 Verstack Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LoginPage;
