import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SaaSLandingPage from './components/SaaSLandingPage';
import MatchmakingSection from './components/MatchmakingSection';
import WorkspaceSection from './components/WorkspaceSection';
import PeerEvalSection from './components/PeerEvalSection';
import UmkmSection from './components/UmkmSection';
import Footer from './components/Footer';
import { testAccounts } from './data/mockData';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentUser, setCurrentUser] = useState(testAccounts[0]);
  const [theme, setTheme] = useState('dark');

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
          <MatchmakingSection currentUser={currentUser} setActiveTab={setActiveTab} />
        )}

        {activeTab === 'workspace' && (
          <WorkspaceSection currentUser={currentUser} />
        )}

        {activeTab === 'peereval' && (
          <PeerEvalSection currentUser={currentUser} />
        )}

        {activeTab === 'umkm' && (
          <UmkmSection currentUser={currentUser} setActiveTab={setActiveTab} />
        )}
      </main>

      <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
