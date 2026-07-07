import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] text-white flex-col gap-4 font-sans select-none">
        <div className="relative w-16 h-16">
          {/* Pulsing loading circle with ambient glow */}
          <div className="absolute inset-0 rounded-full border-2 border-[var(--color-primary)]/20 animate-ping"></div>
          <div className="absolute inset-2 rounded-full border-2 border-[var(--color-primary)] border-t-transparent animate-spin"></div>
        </div>
        <div className="text-xs font-mono tracking-widest text-zinc-500 uppercase animate-pulse">
          Synchronizing Workspace...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
