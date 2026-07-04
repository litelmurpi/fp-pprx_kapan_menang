import React, { useState } from 'react';
import { Search, Clock, ArrowRight, PlusCircle, ChevronRight, X, SlidersHorizontal, Check } from 'lucide-react';
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
    setSuccessMsg('Proyek baru berhasil dipublikasikan!');
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#E5E7EB]">
        <div>
          <div className="inline-flex items-center gap-2 mb-3 bg-[#ecfdf5] border border-[#a7f3d0] text-[#166534] px-3 py-1 rounded-full text-xs font-semibold">
            <PixelSparkle className="w-4 h-4 text-[#22C55E]" />
            <span>AI Weighted Matchmaking</span>
          </div>
          <h1 className="font-heading-2 text-3xl sm:text-4xl font-bold text-[#111827]">Cari Tim &amp; Proyek Kolaborasi</h1>
          <p className="text-sm text-[#6B7280] mt-1.5">
            Keahlian kamu: <span className="font-medium text-[#111827] bg-[#F3F4F6] px-2 py-0.5 rounded border border-[#E5E7EB]">{currentUser.skills?.join(', ')}</span> · Ketersediaan: <strong className="text-[#22C55E]">{currentUser.freeHours} jam/mgg</strong>
          </p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)} 
          className="bg-[#22C55E] text-white text-xs font-semibold px-5 py-3 rounded-xl hover:bg-[#16a34a] transition-all cursor-pointer inline-flex items-center gap-2 border border-[#16a34a] shadow-sm hover:translate-y-[-1px]"
        >
          <PlusCircle className="w-4 h-4" /> Buat Proyek Baru
        </button>
      </div>

      {successMsg && (
        <div className="mb-6 p-4 border border-[#a7f3d0] rounded-xl bg-[#ecfdf5] text-[#166534] text-xs font-medium flex items-center gap-2 shadow-xs">
          <Check className="w-4 h-4 text-[#22C55E]" /> {successMsg}
        </div>
      )}

      {/* Filters */}
      <div className="mb-10 space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-[#9CA3AF] absolute left-4 top-3.5" />
          <input 
            type="text" placeholder="Cari proyek berdasarkan judul atau deskripsi..." value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-[#E5E7EB] rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-[#22C55E] focus:ring-3 focus:ring-[#22C55E]/10 transition-all bg-[#FAFAFA] text-[#111827]"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer border ${
                selectedCategory === cat 
                  ? 'bg-[#111827] text-white border-[#111827] shadow-xs' 
                  : 'bg-white text-[#6B7280] border-[#E5E7EB] hover:text-[#111827] hover:bg-[#FAFAFA]'
              }`}
            >{cat}</button>
          ))}
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => {
          const isJoined = joinedProjects.includes(project.id);
          const hasSkill = project.requiredSkills.some(s => currentUser.skills?.includes(s));
          return (
            <div key={project.id} className="border border-[#E5E7EB] rounded-[20px] p-6 flex flex-col justify-between hover:translate-y-[-2px] hover:border-[#22C55E] transition-all bg-white shadow-sm group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-medium text-[#4B5563] border border-[#E5E7EB] px-2.5 py-1 rounded-full bg-[#FAFAFA]">{project.category}</span>
                  {project.isUmkm && <span className="text-[11px] font-semibold text-[#166534] bg-[#ecfdf5] px-2.5 py-1 rounded-full border border-[#a7f3d0]">SDG 8 · UMKM</span>}
                </div>
                <h3 className="font-bold text-lg text-[#111827] mb-2 group-hover:text-[#22C55E] transition-colors">{project.title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed mb-5">{project.description}</p>

                <div className="flex items-center gap-4 text-xs font-medium text-[#6B7280] mb-5 pb-3 border-b border-[#E5E7EB]">
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#9CA3AF]" /> {project.commitmentHours} jam/mgg</span>
                  <span className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[11px] font-medium ${hasSkill ? 'bg-[#ecfdf5] text-[#166534] border-[#a7f3d0]' : 'bg-[#FAFAFA] text-[#6B7280] border-[#E5E7EB]'}`}>
                    <PixelStar className="w-3 h-3" /> {hasSkill ? '94% Match' : 'Partial Fit'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.requiredSkills.map((sk, i) => {
                    const matched = currentUser.skills?.includes(sk);
                    return (
                      <span key={i} className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${
                        matched ? 'bg-[#e0e7ff] text-[#4338ca] border-[#c7d2fe] font-semibold' : 'bg-[#FAFAFA] text-[#6B7280] border-[#E5E7EB]'
                      }`}>{matched && '✓ '}{sk}</span>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
                <span className="text-xs font-medium text-[#6B7280]">{project.slotsLeft > 0 ? `${project.slotsLeft} slot tersedia` : 'Penuh'}</span>
                {isJoined ? (
                  <button onClick={() => setActiveTab('workspace')} className="text-xs font-semibold text-[#111827] bg-[#F3F4F6] px-4 py-2 rounded-xl border border-[#E5E7EB] flex items-center gap-1 cursor-pointer hover:bg-[#E5E7EB] transition-colors">
                    Ruang Kerja <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button onClick={() => handleJoinProject(project.id)} disabled={project.slotsLeft === 0}
                    className={`text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer transition-all ${
                      project.slotsLeft === 0 
                        ? 'bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed border border-[#E5E7EB]' 
                        : 'bg-[#22C55E] text-white border border-[#16a34a] shadow-xs hover:bg-[#16a34a] hover:translate-y-[-1px]'
                    }`}>
                    Gabung Tim <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-[20px] max-w-lg w-full p-6 relative border border-[#E5E7EB] shadow-lg">
            <button onClick={() => setShowCreateModal(false)} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-[#F3F4F6] text-[#6B7280] cursor-pointer"><X className="w-5 h-5" /></button>
            <h2 className="font-heading-3 text-xl font-bold text-[#111827] mb-1 flex items-center gap-2">
              <PixelRobot className="w-5 h-5 text-[#22C55E]" /> Buat Proyek Baru
            </h2>
            <p className="text-xs text-[#6B7280] mb-6">Publikasikan proyek tantangan agar tim mahasiswa terkurasi dapat bergabung.</p>
            
            <form onSubmit={handleCreateProject} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">Judul Proyek</label>
                <input type="text" required value={newProject.title} onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#22C55E] bg-[#FAFAFA]" placeholder="Misal: Sistem Kasir Berbasis AI" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1.5">Kategori</label>
                  <select value={newProject.category} onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                    className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#22C55E] bg-[#FAFAFA]">
                    {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1.5">Komitmen Jam/Mgg</label>
                  <input type="number" required min="4" max="40" value={newProject.commitmentHours} onChange={(e) => setNewProject({...newProject, commitmentHours: parseInt(e.target.value) || 10})}
                    className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#22C55E] bg-[#FAFAFA]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">Deskripsi Proyek</label>
                <textarea rows="3" required value={newProject.description} onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#22C55E] bg-[#FAFAFA]" placeholder="Jelaskan ruang lingkup masalah dan ekspektasi deliverables..." />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">Keahlian Dibutuhkan (Pisahkan Koma)</label>
                <input type="text" required value={newProject.requiredSkills} onChange={(e) => setNewProject({...newProject, requiredSkills: e.target.value})}
                  className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#22C55E] bg-[#FAFAFA]" placeholder="React, Laravel, Figma, Node.js" />
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t border-[#E5E7EB]">
                <button type="button" onClick={() => setShowCreateModal(false)} className="text-xs font-medium text-[#6B7280] px-5 py-2.5 rounded-xl hover:bg-[#FAFAFA] cursor-pointer">Batal</button>
                <button type="submit" className="text-xs font-semibold text-white bg-[#22C55E] px-6 py-2.5 rounded-xl hover:bg-[#16a34a] transition-colors cursor-pointer shadow-xs">Publikasikan Proyek</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchmakingSection;
