import React, { useState, useEffect } from 'react';
import { 
  Search, Clock, ArrowRight, PlusCircle, ChevronRight, X, SlidersHorizontal, 
  Check, Sparkles, Eye, Store, MapPin, Globe, AlertCircle, ShieldCheck, Award, 
  BookOpen, Send, CheckCircle2, Briefcase, UserCheck, Layers, Zap, Calendar, 
  Users, Maximize2, MessageSquare 
} from 'lucide-react';
import { mockProjects, mockCheckpoints } from '../data/mockData';
import ProjectDetailModal from '../components/ProjectDetailModal';
import AuthAlertModal from '../components/AuthAlertModal';

export const calculateMatchScore = (requiredSkills = [], userSkills = []) => {
  if (!requiredSkills.length) return 100;
  if (!userSkills.length) return 0;
  const matchedSkills = requiredSkills.filter(s => 
    userSkills.some(us => us.toLowerCase() === s.toLowerCase() || s.toLowerCase().includes(us.toLowerCase()))
  );
  return Math.round((matchedSkills.length / requiredSkills.length) * 100);
};

const MatchmakingSection = ({ currentUser, setActiveTab, joinedProjects: propJoined, onJoinProject }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [localJoinedProjects, setLocalJoinedProjects] = useState([102]);
  const [successMsg, setSuccessMsg] = useState('');
  const [authAlert, setAuthAlert] = useState({ isOpen: false, message: '' });
  
  // Master-Detail JobStreet Layout States
  const [selectedProject, setSelectedProject] = useState(mockProjects[0]);
  const [activeTabDetail, setActiveTabDetail] = useState('overview'); // overview, members, roadmap
  const [showMobileModal, setShowMobileModal] = useState(false);

  // Embedded Apply Form States
  const [rolePreference, setRolePreference] = useState(
    currentUser?.badge ? currentUser.badge.split(' ')[0] : 'Fullstack Developer'
  );
  const [motivationNote, setMotivationNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const joinedProjects = propJoined || localJoinedProjects;

  const [newProject, setNewProject] = useState({
    title: '', category: 'Web Development', description: '',
    requiredSkills: 'React, Node.js, Laravel', commitmentHours: 12
  });

  const categories = ['All', 'Web Development', 'AI & Machine Learning', 'Mobile Development', 'UI/UX Design', 'Edutech / Kampus'];

  const filteredProjects = mockProjects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (p.picName && p.picName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = selectedCategory === 'All' || p.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCat;
  });

  // Keep selectedProject valid when filters change
  useEffect(() => {
    if (filteredProjects.length > 0 && (!selectedProject || !filteredProjects.some(p => p.id === selectedProject.id))) {
      setSelectedProject(filteredProjects[0]);
    }
  }, [filteredProjects, selectedProject]);

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setSubmittedSuccess(false);
    setMotivationNote('');
    if (currentUser?.badge) {
      setRolePreference(currentUser.badge.split(' ')[0] || 'Fullstack Developer');
    }
    if (window.innerWidth < 1024) {
      setShowMobileModal(true);
    }
  };

  const handleJoinProject = (id, joinData = {}) => {
    if (!currentUser) {
      setAuthAlert({ isOpen: true, message: 'Silakan login terlebih dahulu untuk mengajukan diri ke tim ini.' });
      return;
    }
    if (!joinedProjects.includes(id)) {
      if (onJoinProject) {
        onJoinProject(id, joinData);
      }
      setLocalJoinedProjects(prev => [...prev, id]);
      setSuccessMsg(`Berhasil mengajukan diri ke tim "${selectedProject?.title}" dengan peran ${joinData.role || 'Developer'}!`);
      setTimeout(() => { setSuccessMsg(''); setActiveTab('workspace'); }, 1600);
    }
  };

  const handleSubmitInlineJoin = (e) => {
    e.preventDefault();
    if (!selectedProject) return;
    if (!currentUser) {
      setAuthAlert({ isOpen: true, message: 'Silakan login terlebih dahulu untuk mengajukan diri ke tim ini.' });
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      setTimeout(() => {
        handleJoinProject(selectedProject.id, { role: rolePreference, motivation: motivationNote });
      }, 1200);
    }, 800);
  };

  const handleOpenCreateModal = () => {
    if (!currentUser) {
      setAuthAlert({ isOpen: true, message: 'Silakan login terlebih dahulu untuk mempublikasikan proyek baru di Verstack.' });
      return;
    }
    setShowCreateModal(true);
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    setShowCreateModal(false);
    setSuccessMsg('Proyek baru berhasil dipublikasikan ke jaringan Verstack!');
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  // Helper properties for selectedProject
  const commitmentHours = selectedProject?.commitmentHours || selectedProject?.requiredHours || 12;
  const duration = selectedProject?.duration || '6 Minggu';
  const slotsLeft = selectedProject?.slotsLeft !== undefined ? selectedProject.slotsLeft : 2;
  const progress = selectedProject?.progress !== undefined ? selectedProject.progress : 15;
  const requiredSkills = selectedProject?.requiredSkills || ['Laravel', 'React', 'Tailwind CSS'];
  const userSkills = currentUser?.skills || [];
  
  const matchedSkills = requiredSkills.filter(s => 
    userSkills.some(us => us.toLowerCase() === s.toLowerCase() || s.toLowerCase().includes(us.toLowerCase()))
  );
  const toLearnSkills = requiredSkills.filter(s => 
    !userSkills.some(us => us.toLowerCase() === s.toLowerCase() || s.toLowerCase().includes(us.toLowerCase()))
  );
  const isHighMatch = (selectedProject?.matchScore || 85) >= 88;
  const isJoinedSelected = selectedProject ? joinedProjects.includes(selectedProject.id) : false;
  const projectCheckpoints = mockCheckpoints.slice(0, selectedProject?.checkpointsCount || 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-6 border-b theme-border">
        <div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold theme-text">Cari Tim &amp; Proyek Kolaborasi</h1>
          <p className="text-sm theme-text-sub mt-1.5 flex flex-wrap items-center gap-2">
          </p>
        </div>
        <button 
          onClick={handleOpenCreateModal} 
          className="btn-primary text-xs px-5 py-3 rounded-lg inline-flex items-center gap-2 cursor-pointer shadow-sm shrink-0"
        >
          <PlusCircle className="w-4 h-4" /> Buat Proyek Baru
        </button>
      </div>

      {successMsg && (
        <div className="mb-6 p-4 badge-primary rounded-xl text-xs font-medium flex items-center gap-2 shadow-md animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 shrink-0" /> {successMsg}
        </div>
      )}

      {/* Filters & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        
        {/* Category pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'primary-bg text-[#0A0A0A] font-semibold shadow-sm'
                  : 'theme-text-sub hover:theme-text bg-white/5 hover:bg-white/10 border theme-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80 shrink-0">
          <Search className="w-4 h-4 theme-text-muted absolute left-3.5 top-3" />
          <input 
            type="text" 
            placeholder="Cari judul proyek, keahlian, atau PIC..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 dark:bg-white/5 theme-text placeholder:theme-text-muted text-xs font-medium pl-10 pr-12 py-2.5 rounded-lg border theme-border focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:outline-none transition-all"
          />
          <span className="absolute right-3 top-2.5 text-[10px] theme-text-muted font-mono-tech px-1.5 py-0.5 rounded bg-white/5 border theme-border">
            {filteredProjects.length} Job
          </span>
        </div>
      </div>

      {/* JobStreet Master-Detail Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT PANE: Project List (5 Columns on Desktop) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {filteredProjects.length === 0 ? (
            <div className="theme-card p-8 text-center rounded-2xl border-dashed">
              <p className="text-sm font-semibold theme-text">Tidak ada proyek yang sesuai</p>
              <p className="text-xs theme-text-sub mt-1">Coba gunakan kata kunci pencarian lain atau pilih kategori "All".</p>
            </div>
          ) : (
            filteredProjects.map(project => {
              const isJoined = joinedProjects.includes(project.id);
              const cardHighMatch = (project.matchScore || 85) >= 88;
              const isSelected = selectedProject?.id === project.id;
              const currentCount = project.currentMembers?.length || 2;
              const emptySlots = project.slotsLeft !== undefined ? project.slotsLeft : 2;
              const targetCount = currentCount + emptySlots;

              return (
                <div 
                  key={project.id}
                  onClick={() => handleSelectProject(project)}
                  className={`p-6 rounded-2xl transition-all duration-200 cursor-pointer relative flex flex-col justify-between border-1 ${
                    isSelected 
                      ? 'bg-white/[0.04] dark:bg-white/[0.06] border-[var(--color-primary)] shadow-md' 
                      : 'theme-card hover:border-[var(--color-border-hover)] bg-white/[0.01]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-[10px] font-semibold theme-text-sub bg-white/5 border theme-border px-2.5 py-1 rounded-md">
                        {project.category}
                      </span>
                      <span className={`text-[10px] font-mono-tech font-bold px-2.5 py-1 rounded-full border inline-flex items-center gap-1 ${
                        cardHighMatch ? 'badge-primary' : 'bg-amber-500/15 text-amber-500 border-amber-500/30'
                      }`}>
                        <Sparkles className="w-3 h-3" />
                        {project.matchScore || 85}% FIT
                      </span>
                    </div>

                    <h3 className="font-heading text-base font-bold mb-1.5 theme-text">
                      {project.title}
                    </h3>

                    <p className="text-xs theme-text-sub mb-4 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t theme-border-subtle flex items-center justify-between text-[11px] font-mono-tech">
                    <div className="flex items-center gap-1.5 theme-text-muted">
                      <Clock className="w-3.5 h-3.5 secondary-text" />
                      <span>{project.commitmentHours || project.requiredHours || 12} jam/minggu</span>
                    </div>

                    {isJoined ? (
                      <span className="badge-primary px-2.5 py-1 rounded-md font-bold flex items-center gap-1">
                        <Check className="w-3 h-3" /> Tergabung
                      </span>
                    ) : (
                      <span className={`font-semibold flex items-center gap-1.5 px-2.5 py-1 rounded-md ${
                        project.slotsLeft === 0 
                          ? 'bg-white/5 theme-text-muted border theme-border' 
                          : isSelected ? 'bg-white/10 theme-text border border-[var(--color-primary)]/50' : 'bg-white/5 theme-text border theme-border'
                      }`}>
                        <Users className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0" />
                        <span>{project.slotsLeft === 0 ? `Penuh (${targetCount}/${targetCount})` : `${currentCount}/${targetCount}`}</span>
                        <ChevronRight className="w-3 h-3 ml-0.5" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* RIGHT PANE: Sticky JobStreet Detail View (7 Columns on Desktop, Hidden on Mobile) */}
        <div className="hidden lg:flex lg:col-span-7 sticky top-24 min-h-[600px] flex-col theme-card rounded-2xl border-t-2 primary-border bg-[var(--color-elevated)] p-0 shadow-2xl relative">
          
          {selectedProject ? (
            <div className="flex flex-col w-full">
              
              {/* Top Header Section inside Right Pane */}
              <div className="p-6 sm:p-7 border-b theme-border bg-white/[0.02] relative shrink-0">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-semibold theme-text-sub bg-white/5 border theme-border px-3 py-1 rounded-md">
                      {selectedProject.category}
                    </span>
                    <span className={`text-[11px] font-mono-tech font-bold px-3 py-1 rounded-full border inline-flex items-center gap-1 ${
                      isHighMatch ? 'badge-primary' : 'bg-amber-500/15 text-amber-500 border-amber-500/30'
                    }`}>
                      <Sparkles className="w-3.5 h-3.5" />
                      {selectedProject.matchScore || 85}% FIT PROFILE
                    </span>
                    {selectedProject.isUmkm && (
                      <span className="text-[11px] font-semibold badge-info px-3 py-1 rounded-md inline-flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5 info-text" /> SDG 8 UMKM
                      </span>
                    )}
                  </div>
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl font-bold theme-text leading-tight mb-3">
                  {selectedProject.title}
                </h2>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="inline-flex items-center gap-2 text-xs theme-text-sub">
                    <ShieldCheck className="w-4 h-4 text-[var(--color-primary)]" />
                    <span>PIC : <span className="theme-text bg-white/5 border theme-border px-2 py-1.5 rounded-lg">{selectedProject.picName || 'Sarah Fauziah'}</span></span>
                  </div>

                  {isJoinedSelected ? (
                    <button 
                      onClick={() => setActiveTab('workspace')}
                      className="btn-primary text-xs px-5 py-2.5 rounded-xl font-bold inline-flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <Check className="w-4 h-4" /> Buka Workspace Tim
                    </button>
                  ) : slotsLeft === 0 ? (
                    <span className="text-xs font-semibold px-4 py-2 rounded-lg bg-white/5 theme-text-muted border theme-border cursor-not-allowed">
                      Pendaftaran Ditutup (Penuh)
                    </span>
                  ) : (
                    <a 
                      href="#apply-section-inline"
                      className="btn-primary text-xs px-5 py-2.5 rounded-xl font-bold inline-flex items-center gap-2 cursor-pointer shadow-lg hover:scale-102 transition-transform"
                    >
                      <span>Ajukan Permintaan Gabung</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-4 gap-2 p-4 sm:px-7 bg-white/[0.01] border-b theme-border shrink-0 text-center">
                <div className="p-2.5 rounded-xl bg-white/5 border theme-border">
                  <p className="text-[10px] theme-text-muted uppercase font-mono-tech">Komitmen</p>
                  <p className="text-xs font-bold theme-text font-mono-tech mt-0.5">{commitmentHours} Jam/minggu</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border theme-border">
                  <p className="text-[10px] theme-text-muted uppercase font-mono-tech">Durasi SPRINT</p>
                  <p className="text-xs font-bold theme-text mt-0.5">{duration}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border theme-border">
                  <p className="text-[10px] theme-text-muted uppercase font-mono-tech">Kuota Tim</p>
                  <p className="text-xs font-bold text-emerald-400 mt-0.5 flex items-center justify-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0" />
                    <span>{slotsLeft > 0 ? `${selectedProject.currentMembers?.length || 2}/${(selectedProject.currentMembers?.length || 2) + slotsLeft}` : `Penuh (${(selectedProject.currentMembers?.length || 2)}/${(selectedProject.currentMembers?.length || 2)})`}</span>
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border theme-border">
                  <p className="text-[10px] theme-text-muted uppercase font-mono-tech">Progres Tim</p>
                  <p className="text-xs font-bold theme-text font-mono-tech mt-0.5">{progress}%</p>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-2 px-6 sm:px-7 pt-3 border-b theme-border shrink-0 bg-white/[0.01]">
                {[
                  { id: 'overview', label: '📋 Deskripsi & Skill Fit' },
                  { id: 'members', label: `👥 Anggota Tim (${selectedProject.currentMembers?.length || 0})` },
                  { id: 'roadmap', label: `🗺️ Roadmap SPRINT (${selectedProject.checkpointsCount || 4})` },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTabDetail(tab.id)}
                    className={`pb-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                      activeTabDetail === tab.id
                        ? 'border-[var(--color-primary)] primary-text'
                        : 'border-transparent theme-text-sub hover:theme-text'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Scrollable Tab Content Body */}
              <div className="p-6 sm:p-7 space-y-6 text-xs sm:text-sm leading-relaxed flex-1">
                
                {activeTabDetail === 'overview' && (
                  <div className="space-y-6 animate-in fade-in duration-150">
                    <div>
                      <h3 className="text-xs font-semibold theme-text-muted uppercase tracking-wider mb-2 font-mono-tech">
                        Tujuan &amp; Deskripsi Proyek
                      </h3>
                      <p className="theme-text bg-white/5 p-4 rounded-xl border theme-border leading-relaxed">
                        {selectedProject.description || 'Proyek kolaboratif bersertifikasi untuk membangun solusi nyata dalam jaringan Amikom Club Center (ACC) & Verstack.'}
                      </p>
                    </div>

                    {/* Skill Match Breakdown */}
                    <div>
                      <h3 className="text-xs font-semibold theme-text-muted uppercase tracking-wider mb-3 font-mono-tech flex items-center justify-between">
                        <span>Analisis Kesesuaian Keahlian (Skill Match)</span>
                        <span className="primary-text lowercase font-normal">{matchedSkills.length} dari {requiredSkills.length} skill terpenuhi</span>
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                          <p className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 mb-2.5">
                            <CheckCircle2 className="w-4 h-4" /> Skill Sesuai Profil Kamu
                          </p>
                          {matchedSkills.length > 0 ? (
                            <div className="flex flex-wrap gap-1.5">
                              {matchedSkills.map((sk, idx) => (
                                <span key={idx} className="text-xs font-medium px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                                  ✓ {sk}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs theme-text-sub italic">Belum ada skill yang cocok secara langsung.</p>
                          )}
                        </div>

                        <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                          <p className="text-xs font-semibold text-amber-400 flex items-center gap-1.5 mb-2.5">
                            <Zap className="w-4 h-4" /> Peluang Upskilling &amp; Belajar
                          </p>
                          {toLearnSkills.length > 0 ? (
                            <div className="flex flex-wrap gap-1.5">
                              {toLearnSkills.map((sk, idx) => (
                                <span key={idx} className="text-xs font-medium px-2.5 py-1 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30">
                                  + {sk}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-emerald-400 font-medium">✨ Luar biasa! Kamu menguasai semua keahlian yang dibutuhkan!</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border theme-border flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-[var(--color-primary)] shrink-0 mt-0.5" />
                      <div className="text-xs theme-text-sub space-y-1">
                        <p className="font-semibold theme-text">Jaminan Protokol Kolaborasi Verstack</p>
                        <p>
                          Setiap kontribusi pada proyek ini tercatat secara on-chain di audit trail ACC. Evaluasi sejawat mingguan (Peer Evaluation) aktif untuk mencegah free-rider dan menjamin portofolio riil.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTabDetail === 'members' && (
                  <div className="space-y-4 animate-in fade-in duration-150">
                    <h3 className="text-xs font-semibold theme-text-muted uppercase tracking-wider mb-3 font-mono-tech">
                      Komposisi Tim Saat Ini
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(selectedProject.currentMembers || []).map((m, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-white/5 border theme-border flex items-center gap-3">
                          <img 
                            src={m.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${m.name}`} 
                            alt={m.name} 
                            className="w-10 h-10 rounded-full bg-white/10 border theme-border shrink-0" 
                          />
                          <div>
                            <p className="text-xs font-bold theme-text">{m.name}</p>
                            <p className="text-[11px] primary-text font-medium">{m.role || 'Anggota Tim'}</p>
                          </div>
                        </div>
                      ))}

                      {Array.from({ length: slotsLeft }).map((_, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl border-2 border-dashed theme-border-subtle flex items-center justify-center gap-2 text-xs theme-text-sub bg-white/[0.02]">
                          <UserCheck className="w-4 h-4 theme-text-muted" />
                          <span>+ Slot Posisi Terbuka (Tersedia)</span>
                        </div>
                      ))}
                    </div>

                    {(!selectedProject.currentMembers || selectedProject.currentMembers.length === 0) && (
                      <div className="text-center py-8 bg-white/5 rounded-xl border theme-border">
                        <p className="text-xs font-semibold theme-text mb-1">Belum ada anggota yang bergabung di tim ini</p>
                        <p className="text-[11px] theme-text-sub">Jadilah pionir pertama yang memimpin proyek kolaborasi ini!</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTabDetail === 'roadmap' && (
                  <div className="space-y-4 animate-in fade-in duration-150">
                    <h3 className="text-xs font-semibold theme-text-muted uppercase tracking-wider mb-3 font-mono-tech">
                      Jadwal Checkpoint &amp; Milestone Mingguan
                    </h3>

                    <div className="space-y-3">
                      {projectCheckpoints.map((cp, idx) => (
                        <div key={cp.id || idx} className="p-4 rounded-xl bg-white/5 border theme-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full badge-primary font-mono-tech text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </div>
                            <div>
                              <p className="text-xs font-bold theme-text">{cp.title || `Sprint Milestone #${idx + 1}`}</p>
                              <p className="text-[11px] theme-text-sub mt-0.5">Tenggat Waktu: <strong className="theme-text">{cp.dueDate || '14 Juli 2026'}</strong></p>
                            </div>
                          </div>
                          <span className="text-[11px] font-mono-tech font-semibold px-2.5 py-1 rounded bg-white/10 theme-text self-start sm:self-auto shrink-0">
                            Verifikasi Dosen / PIC
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Inline JobStreet Quick-Apply Section at the Bottom */}
                <div id="apply-section-inline" className="pt-6 border-t theme-border">
                  {isJoinedSelected ? (
                    <div className="bg-[var(--color-primary)]/15 border border-[var(--color-primary)]/40 p-5 rounded-2xl flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl badge-primary">
                          <Check className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm font-bold theme-text">Kamu Sudah Tergabung di Tim Proyek Ini</p>
                          <p className="text-xs theme-text-sub">Akses ruang kerja untuk melihat pembagian tugas sprint.</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setActiveTab('workspace')}
                        className="btn-primary text-xs px-5 py-3 rounded-xl font-bold flex items-center gap-2 cursor-pointer shrink-0"
                      >
                        <span>Buka Workspace Tim</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  ) : slotsLeft === 0 ? (
                    <div className="bg-amber-500/10 border border-amber-500/30 p-5 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="w-6 h-6 text-amber-400 shrink-0" />
                        <div>
                          <p className="text-sm font-bold text-amber-300">Kuota Tim Proyek Sudah Penuh</p>
                          <p className="text-xs theme-text-sub">Pendaftaran ditutup karena seluruh posisi telah terisi.</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white/[0.03] border-2 theme-border rounded-2xl p-6 relative overflow-hidden">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-bold theme-text flex items-center gap-2">
                          <Briefcase className="w-4 h-4 primary-text" />
                          <span>Pengajuan Permintaan Gabung Tim (Quick Apply)</span>
                        </h4>
                      </div>

                      {submittedSuccess ? (
                        <div className="p-6 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-center space-y-1.5 animate-in zoom-in-95 duration-200">
                          <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2 animate-bounce" />
                          <p className="text-sm font-bold text-emerald-300">Permintaan Gabung Tim Berhasil Diajukan!</p>
                          <p className="text-xs text-emerald-200/80">
                            Notifikasi telah dikirim ke PIC proyek ({selectedProject.picName || 'Sarah Fauziah'}). Mengalihkan ke ruang kerja...
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmitInlineJoin} className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-semibold theme-text-muted uppercase tracking-wider mb-1.5 font-mono-tech">
                                Pilih Peran / Posisi di Tim
                              </label>
                              <select 
                                value={rolePreference} 
                                onChange={(e) => setRolePreference(e.target.value)}
                                className="w-full bg-white/5 border theme-border rounded-xl px-3.5 py-2.5 text-xs font-medium theme-text focus:outline-none focus:border-[var(--color-primary)] transition-all cursor-pointer"
                              >
                                <option value="Backend Developer">Backend Developer (Laravel / PHP)</option>
                                <option value="Frontend Developer">Frontend Developer (React / Tailwind)</option>
                                <option value="UI/UX Designer">UI/UX Designer (Figma / Research)</option>
                                <option value="Fullstack Developer">Fullstack Developer (Lead)</option>
                                <option value="Quality Assurance / Tester">Quality Assurance / System Tester</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold theme-text-muted uppercase tracking-wider mb-1.5 font-mono-tech">
                                Ketersediaan Waktu Kamu
                              </label>
                                <div className="w-full bg-white/5 border theme-border rounded-xl px-3.5 py-2.5 text-xs font-medium theme-text flex items-center justify-between">
                                  <span>{currentUser?.freeHours || 12} Jam / minggu</span>
                                  <span className="text-[10px] badge-primary px-2 py-0.5 rounded font-mono-tech">Terverifikasi</span>
                                </div>
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold theme-text-muted uppercase tracking-wider mb-1.5 font-mono-tech flex items-center justify-between">
                              <span>Pesan / Motivasi Singkat untuk PIC (Opsional)</span>
                              <span className="text-[10px] theme-text-muted font-normal">Membantu mempercepat approval</span>
                            </label>
                            <div className="relative">
                              <MessageSquare className="w-4 h-4 theme-text-muted absolute left-3.5 top-3" />
                              <input 
                                type="text" 
                                value={motivationNote}
                                onChange={(e) => setMotivationNote(e.target.value)}
                                placeholder="Contoh: Saya memiliki pengalaman membuat sistem serupa di mata kuliah pemrograman web..."
                                className="w-full bg-white/5 border theme-border rounded-xl pl-10 pr-4 py-2.5 text-xs theme-text placeholder:theme-text-muted focus:outline-none focus:border-[var(--color-primary)] transition-all"
                              />
                            </div>
                          </div>

                          <div className="pt-2 flex justify-end">
                            <button 
                              type="submit" 
                              disabled={isSubmitting}
                              className="w-full sm:w-auto btn-primary text-xs px-8 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
                            >
                              {isSubmitting ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                  <span>Memverifikasi Protokol Verstack...</span>
                                </>
                              ) : (
                                <>
                                  <Send className="w-4 h-4" />
                                  <span>Kirim Permintaan Gabung Tim Sekarang</span>
                                </>
                              )}
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  )}
                </div>

              </div>
            </div>
          ) : (
            <div className="p-16 text-center text-xs theme-text-sub flex flex-col items-center justify-center h-full">
              <Briefcase className="w-12 h-12 theme-text-muted mb-3 opacity-40" />
              <p className="text-sm font-semibold theme-text">Pilih proyek kolaborasi dari daftar di sebelah kiri</p>
              <p className="text-xs theme-text-sub mt-1">Detail spesifikasi, analisis kecocokan skill, dan form pengajuan tim akan ditampilkan di sini.</p>
            </div>
          )}
        </div>

      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="theme-card rounded-[20px] max-w-lg w-full p-6 relative shadow-2xl border-t-2 primary-border">
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
                    className="w-full bg-[var(--color-elevated)] border theme-border rounded-lg px-3.5 py-2.5 text-xs theme-text focus:outline-none focus:border-[var(--color-primary)]">
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

      {/* Mobile / Fullscreen Detail Modal */}
      {showMobileModal && selectedProject && (
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={() => setShowMobileModal(false)}
          onJoin={(id, data) => handleJoinProject(id, data)}
          currentUser={currentUser}
          isJoined={joinedProjects.includes(selectedProject.id)}
          setActiveTab={setActiveTab}
        />
      )}

      <AuthAlertModal 
        isOpen={authAlert.isOpen}
        onClose={() => setAuthAlert({ isOpen: false, message: '' })}
        message={authAlert.message}
      />
    </div>
  );
};

export default MatchmakingSection;
