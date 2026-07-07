import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SaaSLandingPage from './components/SaaSLandingPage';
import MatchmakingSection from './components/MatchmakingSection';
import WorkspaceSection from './components/WorkspaceSection';
import PeerEvalSection from './components/PeerEvalSection';
import UmkmSection from './components/UmkmSection';
import Footer from './components/Footer';
import { testAccounts } from './data/mockData';
import Lenis from '@studio-freight/lenis';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentUser, setCurrentUser] = useState(testAccounts[0]);
  const [theme, setTheme] = useState('dark');
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
  }, [theme]);

  return (
    <div data-theme={theme} className={`min-h-screen flex flex-col justify-between theme-canvas theme-text transition-colors duration-300 ${theme}`}>
      
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        currentUser={currentUser} 
        setCurrentUser={setCurrentUser}
        theme={theme}
        setTheme={setTheme}
      />

      <main className="flex-1">
        {activeTab === 'home' && (
          <SaaSLandingPage setActiveTab={setActiveTab} />
        )}

        {activeTab === 'matchmaking' && (
          <MatchmakingSection 
            currentUser={currentUser} 
            setActiveTab={setActiveTab}
            joinedProjects={joinedProjects}
            onJoinProject={handleJoinProject}
          />
        )}

        {activeTab === 'workspace' && (
          <WorkspaceSection currentUser={currentUser} setActiveTab={setActiveTab} />
        )}

        {(activeTab === 'peer-eval' || activeTab === 'peereval') && (
          <PeerEvalSection currentUser={currentUser} setActiveTab={setActiveTab} />
        )}

        {activeTab === 'umkm' && (
          <UmkmSection 
            currentUser={currentUser} 
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

export default App;