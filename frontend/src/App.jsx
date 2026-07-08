import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SaaSLandingPage from './pages/SaaSLandingPage';
import MatchmakingSection from './pages/MatchmakingSection';

import Navbar from './components/Navbar';
import WorkspaceSection from './components/WorkspaceSection';
import PeerEvalSection from './components/PeerEvalSection';
import UmkmSection from './components/UmkmSection';
import DashboardSection from './components/DashboardSection';
import Footer from './components/Footer';
import Lenis from '@studio-freight/lenis';
import './index.css';

function MainApp() {
  const [activeTab, setActiveTab] = useState('home');
  const { user, logout, refreshUser } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [joinedProjects, setJoinedProjects] = useState([102]); // Budi Santoso is in project 102 by default

  const handleJoinProject = (projectId, joinData = {}) => {
    if (!joinedProjects.includes(projectId)) {
      setJoinedProjects(prev => [...prev, projectId]);
    }
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

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

  // Construct a user object that fits the format the existing sections expect
  const mappedUser = user ? {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`,
    prodi: user.mahasiswa?.prodi || 'Informatika',
    freeHours: user.mahasiswa?.jam_luang_per_minggu !== undefined ? user.mahasiswa.jam_luang_per_minggu : 10,
    skills: (user.mahasiswa?.profil_skills || user.mahasiswa?.profilSkills || [])
      .map(ps => ps.skill?.nama || ps.skill?.name)
      .filter(Boolean),
    role: user.role === 'mahasiswa'
      ? `Mahasiswa (${user.mahasiswa?.minat_bidang || 'Kolaborator'})`
      : (user.role === 'pic_ukm' ? 'PIC UKM' : 'Dosen Reviewer'),
    badge: user.role === 'mahasiswa'
      ? (user.mahasiswa?.minat_bidang || 'Kolaborator')
      : (user.role === 'pic_ukm' ? 'Staff' : 'Faculty'),
    status: 'Active'
  } : null;

  return (
    <div data-theme={theme} className={`min-h-screen flex flex-col justify-between theme-canvas theme-text transition-colors duration-300 ${theme}`}>
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={mappedUser}
        theme={theme}
        setTheme={setTheme}
        logout={logout}
      />

      <main className="flex-1">
        {activeTab === 'home' && (
          mappedUser ? (
            <DashboardSection 
              currentUser={mappedUser} 
              setActiveTab={setActiveTab} 
              refreshUser={refreshUser} 
            />
          ) : (
            <SaaSLandingPage setActiveTab={setActiveTab} />
          )
        )}

        {activeTab === 'matchmaking' && (
          <MatchmakingSection
            currentUser={mappedUser}
            setActiveTab={setActiveTab}
            joinedProjects={joinedProjects}
            onJoinProject={handleJoinProject}
          />
        )}

        {activeTab === 'workspace' && (
          <WorkspaceSection currentUser={mappedUser} setActiveTab={setActiveTab} />
        )}

        {(activeTab === 'peer-eval' || activeTab === 'peereval') && (
          <PeerEvalSection currentUser={mappedUser} setActiveTab={setActiveTab} />
        )}

        {activeTab === 'umkm' && (
          <UmkmSection
            currentUser={mappedUser}
            setActiveTab={setActiveTab}
            joinedProjects={joinedProjects}
            onJoinProject={handleJoinProject}
          />
        )}
      </main>

      <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/matchmaking" element={<MatchmakingSection />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<LoginPage initialMode="register" />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <MainApp />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;