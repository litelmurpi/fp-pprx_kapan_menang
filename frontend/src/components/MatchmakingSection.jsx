import React, { useState } from 'react';
import { Search, Clock, ArrowRight, PlusCircle, ChevronRight, X, SlidersHorizontal, Check, Sparkles } from 'lucide-react';
import { PixelSparkle, PixelCheck, PixelStar, PixelRobot } from './PixelIcons';
import { mockProjects } from '../data/mockData';

const MatchmakingSection = ({ currentUser, setActiveTab }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [joinedProjects, setJoinedProjects] = useState([1]);
  const [successMsg, setSuccessMsg] = useState('');

  const [newProject, setNewProject] = useState({
    title: '', category: 'Web Development', description: '',
    requiredSkills: 'React, Node.js, Laravel', commitmentHours: 12
  });

  const categories = ['All', 'Web Development', 'AI & Machine Learning', 'Mobile Development', 'UI/UX Design'];

  const filteredProjects = mockProjects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleJoinProject = (id) => {
    if (!joinedProjects.includes(id)) {
      setJoinedProjects([...joinedProjects, id]);
      setSuccessMsg('Berhasil mengajukan diri ke tim!');
      setTimeout(() => { setSuccessMsg(''); setActiveTab('workspace'); }, 1500);
    }
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    setShowCreateModal(false);
    setSuccessMsg('Proyek baru berhasil dipublikasikan ke jaringan Verstack!');
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b theme-border">
        <div>
          <div className="inline-flex items-center gap-2 mb-3 badge-secondary px-3.5 py-1 rounded-full text-xs font-semibold">
            <Sparkles className="w-4 h-4 secondary-text" />
            <span>AI Weighted Skill Matchmaking</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold theme-text">Cari Tim &amp; Proyek Kolaborasi</h1>
          <p className="text-sm theme-text-sub mt-1.5">
            Keahlian kamu: <span className="font-medium theme-text bg-white/5 px-2.5 py-0.5 rounded border theme-border">{currentUser.skills?.join(', ')}</span> · Ketersediaan: <strong className="primary-text font-mono-tech">{currentUser.freeHours} jam/mgg</strong>
          </p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)} 
          className="btn-primary text-xs px-5 py-3 rounded-lg inline-flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <PlusCircle className="w-4 h-4" /> Buat Proyek Baru
        </button>
      </div>

      {successMsg && (
        <div className="mb-6 p-4 badge-primary rounded-xl text-xs font-medium flex items-center gap-2 shadow-xs">
          <Check className="w-4 h-4" /> {successMsg}
        </div>
      )}

      {/* Filters & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        
        {/* Category pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'primary-bg text-[#0A0A0A] font-semibold shadow-sm'
                  : 'theme-text-sub hover:theme-text bg-white/5 hover:bg-white/10 border theme-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar with Shortcut Badge */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 theme-text-muted absolute left-3.5 top-3" />
          <input 
            type="text" 
            placeholder="Cari keahlian atau proyek..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 dark:bg-white/5 theme-text placeholder:theme-text-muted text-xs font-medium pl-10 pr-12 py-2.5 rounded-lg border theme-border focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:outline-none transition-all"
          />
          <kbd className="absolute right-3 top-2.5 bg-white/5 border theme-border rounded px-1.5 py-0.5 font-mono-tech text-[10px] theme-text-muted">⌘K</kbd>
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => {
          const isJoined = joinedProjects.includes(project.id);
          const isHighMatch = project.matchScore >= 88;
          return (
            <div 
              key={project.id} 
              className="theme-card rounded-[16px] p-6 flex flex-col justify-between group relative overflow-hidden"
            >
              {isHighMatch && (
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-80" />
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-semibold theme-text-sub bg-white/5 border theme-border px-2.5 py-1 rounded-md">
                    {project.category}
                  </span>
                  <span className={`text-[11px] font-mono-tech font-bold px-2.5 py-1 rounded-full border inline-flex items-center gap-1 ${
                    isHighMatch 
                      ? 'badge-primary' 
                      : 'bg-amber-500/15 text-amber-500 border-amber-500/30'
                  }`}>
                    <Sparkles className="w-3 h-3" />
                    {project.matchScore}% FIT
                  </span>
                </div>

                <h3 className="font-heading text-lg font-bold theme-text mb-2 group-hover:primary-text transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs theme-text-sub mb-5 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div>
                    <span className="text-[11px] font-medium theme-text-muted block mb-1.5 uppercase tracking-wider">Required Skills</span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.requiredSkills.map((skill, index) => (
                        <span key={index} className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-white/5 border theme-border theme-text-sub">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t theme-border-subtle flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs theme-text-muted font-mono-tech">
                  <Clock className="w-3.5 h-3.5 secondary-text" />
                  <span>{project.commitmentHours} jam/mgg</span>
                </div>

                {isJoined ? (
                  <span className="text-xs font-semibold px-3.5 py-2 rounded-lg badge-primary inline-flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Tergabung
                  </span>
                ) : (
                  <button 
                    onClick={() => handleJoinProject(project.id)}
                    disabled={project.slotsLeft === 0}
                    className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-xs ${
                      project.slotsLeft === 0
                        ? 'bg-white/5 theme-text-muted border theme-border cursor-not-allowed'
                        : 'btn-primary'
                    }`}
                  >
                    <span>Gabung Tim</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="theme-card bg-[#141519] dark:bg-[#141519] rounded-[20px] max-w-lg w-full p-6 relative shadow-2xl border-t-2 primary-border">
            <button onClick={() => setShowCreateModal(false)} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/10 theme-text-sub cursor-pointer"><X className="w-5 h-5" /></button>
            <h2 className="font-heading text-xl font-bold theme-text mb-1 flex items-center gap-2"><PlusCircle className="w-5 h-5 secondary-text" /> Buat Proyek Baru</h2>
            <p className="text-xs theme-text-sub mb-6">Publikasikan ide kolaborasi ke jaringan verifikasi Verstack.</p>
            
            <form onSubmit={handleCreateProject} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-medium theme-text mb-1.5">Judul Proyek</label>
                <input type="text" required value={newProject.title} onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  className="w-full bg-white/5 border theme-border rounded-lg px-3.5 py-2.5 text-xs theme-text focus:outline-none focus:border-[var(--color-primary)]" placeholder="Sistem Informasi Kasir UMKM" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium theme-text mb-1.5">Kategori Bidang</label>
                  <select value={newProject.category} onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                    className="w-full bg-[#141519] border theme-border rounded-lg px-3.5 py-2.5 text-xs theme-text focus:outline-none focus:border-[var(--color-primary)]">
                    {categories.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium theme-text mb-1.5">Waktu / Minggu (Jam)</label>
                  <input type="number" required min="4" max="40" value={newProject.commitmentHours} onChange={(e) => setNewProject({...newProject, commitmentHours: parseInt(e.target.value)})}
                    className="w-full bg-white/5 border theme-border rounded-lg px-3.5 py-2.5 text-xs font-mono-tech theme-text focus:outline-none focus:border-[var(--color-primary)]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium theme-text mb-1.5">Keahlian yang Dibutuhkan</label>
                <input type="text" required value={newProject.requiredSkills} onChange={(e) => setNewProject({...newProject, requiredSkills: e.target.value})}
                  className="w-full bg-white/5 border theme-border rounded-lg px-3.5 py-2.5 text-xs theme-text focus:outline-none focus:border-[var(--color-primary)]" placeholder="React, Laravel, Tailwind CSS" />
              </div>
              <div>
                <label className="block text-xs font-medium theme-text mb-1.5">Deskripsi Singkat &amp; Objective</label>
                <textarea rows="3" required value={newProject.description} onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  className="w-full bg-white/5 border theme-border rounded-lg px-3.5 py-2.5 text-xs theme-text focus:outline-none focus:border-[var(--color-primary)]" placeholder="Jelaskan masalah apa yang diselesaikan proyek ini..." />
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t theme-border-subtle">
                <button type="button" onClick={() => setShowCreateModal(false)} className="btn-secondary text-xs px-5 py-2.5 rounded-lg cursor-pointer">Batal</button>
                <button type="submit" className="btn-primary text-xs px-6 py-2.5 rounded-lg cursor-pointer">Publikasikan Proyek</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchmakingSection;
