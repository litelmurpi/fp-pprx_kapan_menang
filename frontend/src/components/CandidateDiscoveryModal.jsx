import React, { useState, useEffect } from 'react';
import { X, Search, Sparkles, UserPlus, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import api from '../api/axios';
import StarRating from './StarRating';

const CandidateDiscoveryModal = ({ project, onClose }) => {
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [inviteStatus, setInviteStatus] = useState({}); // track invitation status by candidate id
  
  useEffect(() => {
    const fetchCandidates = async () => {
      if (!project?.id) return;
      try {
        const response = await api.get(`/proyek/${project.id}/candidates`);
        setCandidates(response.data);
      } catch (err) {
        console.error("Failed to fetch candidates:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCandidates();
  }, [project]);

  const handleInvite = async (candidateId) => {
    try {
      setInviteStatus(prev => ({ ...prev, [candidateId]: 'loading' }));
      await api.post(`/proyek/${project.id}/members`, {
        mahasiswa_id: candidateId,
        peran: 'Team Member'
      });
      setInviteStatus(prev => ({ ...prev, [candidateId]: 'success' }));
    } catch (err) {
      console.error("Failed to invite candidate:", err);
      setInviteStatus(prev => ({ ...prev, [candidateId]: 'error' }));
      alert(err.response?.data?.message || "Gagal mengundang kandidat.");
    }
  };

  const filteredCandidates = candidates.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.skills.some(s => s.nama.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-4xl bg-[#111111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div>
            <h2 className="text-lg font-bold text-zinc-100 font-heading flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              Rekomendasi Kandidat
            </h2>
            <p className="text-[11px] text-zinc-400 font-mono-tech mt-1">
              Untuk proyek: <span className="font-bold text-white">{project?.title}</span>
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-white/10 bg-black/20">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Cari nama atau skill kandidat..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500/50 transition-colors"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
            </div>
          ) : filteredCandidates.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-xl border border-dashed border-white/10">
              <AlertCircle className="w-8 h-8 text-zinc-500 mx-auto mb-3" />
              <p className="text-sm font-medium text-zinc-300">Tidak ada kandidat ditemukan.</p>
              <p className="text-[11px] text-zinc-500 mt-1">Coba sesuaikan kata kunci pencarian Anda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCandidates.map(candidate => {
                const matchScorePercent = Math.round(candidate.skor_akhir * 100);
                const isHighMatch = matchScorePercent >= 80;
                const status = inviteStatus[candidate.mahasiswa_id];

                return (
                  <div key={candidate.mahasiswa_id} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <img 
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${candidate.name}`} 
                            alt={candidate.name} 
                            className="w-10 h-10 rounded-full bg-black/50 border border-white/10"
                          />
                          <div>
                            <h4 className="text-sm font-bold text-zinc-100">{candidate.name}</h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <p className="text-[10px] text-zinc-400 font-mono-tech">{candidate.prodi}</p>
                              {candidate.reputasi > 0 && (
                                <StarRating rating={candidate.reputasi} maxRating={5} size={3} />
                              )}
                            </div>
                          </div>
                        </div>
                        <span className={`text-[10px] font-mono-tech font-bold px-2 py-1 rounded-md border flex items-center gap-1 ${
                          isHighMatch ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/15 text-amber-500 border-amber-500/30'
                        }`}>
                          {isHighMatch && <Sparkles className="w-3 h-3" />}
                          {matchScorePercent}% FIT
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {candidate.skills.slice(0, 4).map((skill, idx) => (
                          <span key={idx} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-zinc-300">
                            {skill.nama}
                          </span>
                        ))}
                        {candidate.skills.length > 4 && (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-zinc-400">
                            +{candidate.skills.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between mt-2">
                      <div className={`flex items-center gap-1.5 text-[10px] font-medium font-mono-tech px-2 py-1 rounded-md border ${
                        candidate.jam_luang_color === 'green' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                        candidate.jam_luang_color === 'yellow' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                        'bg-red-500/10 text-red-400 border-red-500/20'
                      }`}>
                        <Clock className="w-3 h-3" />
                        <span>{candidate.jam_luang_per_minggu} jam/mgg</span>
                      </div>

                      <button 
                        onClick={() => handleInvite(candidate.mahasiswa_id)}
                        disabled={status === 'success' || status === 'loading'}
                        className={`text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer disabled:cursor-not-allowed ${
                          status === 'success' ? 'bg-emerald-500/20 text-emerald-400' :
                          status === 'loading' ? 'bg-white/10 text-zinc-400' :
                          'bg-emerald-500 hover:bg-emerald-400 text-zinc-950'
                        }`}
                      >
                        {status === 'success' ? (
                          <><CheckCircle2 className="w-3.5 h-3.5" /> Terundang</>
                        ) : status === 'loading' ? (
                          <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Mengundang</>
                        ) : (
                          <><UserPlus className="w-3.5 h-3.5" /> Invite</>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateDiscoveryModal;
