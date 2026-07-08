import React from 'react';
import { Lock, ArrowRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AuthAlertModal = ({ isOpen, onClose, message }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="theme-card rounded-[24px] max-w-sm w-full p-8 relative shadow-2xl border-t-2 primary-border text-center animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 rounded-xl hover:bg-white/10 theme-text-sub cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 flex items-center justify-center mx-auto mb-5 shadow-[0_0_20px_rgba(204,253,21,0.15)]">
          <Lock className="w-8 h-8 text-[var(--color-primary)]" />
        </div>
        
        <h3 className="font-heading text-xl font-bold theme-text mb-3">Akses Dibatasi</h3>
        <p className="text-sm theme-text-sub mb-8 leading-relaxed">
          {message || 'Silakan login atau daftar akun terlebih dahulu untuk mengakses fitur ini.'}
        </p>
        
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => navigate('/login')}
            className="w-full btn-primary text-sm px-6 py-3.5 rounded-xl font-bold inline-flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-[1.02] transition-transform"
          >
            <span>Log in ke Verstack</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button 
            onClick={onClose}
            className="w-full px-6 py-3.5 rounded-xl font-semibold text-sm theme-text-sub hover:theme-text hover:bg-white/5 transition-colors cursor-pointer"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthAlertModal;
