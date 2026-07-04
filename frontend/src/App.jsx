import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
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

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white selection:bg-[#22C55E] selection:text-white">
      
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        currentUser={currentUser} 
        setCurrentUser={setCurrentUser} 
      />

      <main className="flex-1">
        {activeTab === 'home' && (
          <Hero setActiveTab={setActiveTab} />
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

      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}

export default App;
