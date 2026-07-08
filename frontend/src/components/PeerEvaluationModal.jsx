import React, { useState, useEffect } from 'react';
import { X, Star, Send, CheckCircle2, MessageSquare, AlertTriangle } from 'lucide-react';
import api from '../api/axios';

const PeerEvaluationModal = ({ project, currentUser, onClose }) => {
  const [evaluations, setEvaluations] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const [errorMsg, setErrorMsg] = useState('');

  // Filter members excluding current user
  const otherMembers = project.members.filter(m => m.user?.email !== currentUser?.email && m.user_id !== currentUser?.id);

  // Initialize evaluation state
  useEffect(() => {
    const initialState = {};
    otherMembers.forEach(m => {
      initialState[m.id] = { skor: 0, komentar: '' };
    });
    setEvaluations(initialState);
  }, [project]);

  const handleRatingChange = (memberId, rating) => {
    setEvaluations(prev => ({
      ...prev,
      [memberId]: { ...prev[memberId], skor: rating }
    }));
  };

  const handleCommentChange = (memberId, comment) => {
    setEvaluations(prev => ({
      ...prev,
      [memberId]: { ...prev[memberId], komentar: comment }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMsg('');

    try {
      // Validate all rated
      const unrated = otherMembers.find(m => evaluations[m.id]?.skor === 0);
      if (unrated) {
        throw new Error("Terdapat anggota yang belum diberikan nilai evaluasi.");
      }

      // Submit evaluations one by one
      for (const m of otherMembers) {
        const payload = {
          penerima_anggota_id: m.anggota_tim_id || m.id, // Depending on backend structure
          skor: evaluations[m.id].skor,
          komentar: evaluations[m.id].komentar
        };
        // Some backends might require dievaluasi_id instead, the controller accepts both.
        await api.post(`/proyek/${project.id}/evaluasi`, payload);
      }

      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Evaluation error:", err);
      setErrorMsg(err.message || err.response?.data?.message || "Gagal mengirimkan evaluasi.");
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-[#111111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div>
            <h2 className="text-lg font-bold text-zinc-100 font-heading flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400" />
              Peer Evaluation & Reputasi
            </h2>
            <p className="text-[11px] text-zinc-400 font-mono-tech mt-1">
              Beri penilaian kontribusi untuk anggota tim proyek <span className="font-bold text-white">{project?.title}</span>
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {errorMsg && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-2 text-red-400 text-xs font-semibold">
              <AlertTriangle className="w-4 h-4" /> {errorMsg}
            </div>
          )}
          
          {submitStatus === 'success' ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="font-heading text-xl font-bold text-zinc-100">Evaluasi Tersimpan!</h3>
              <p className="text-sm text-zinc-400">Terima kasih atas penilaian Anda. Reputasi anggota tim telah diperbarui secara otomatis.</p>
            </div>
          ) : otherMembers.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-xl border border-dashed border-white/10">
              <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-3" />
              <p className="text-sm font-medium text-zinc-300">Tidak ada anggota tim lain untuk dinilai.</p>
            </div>
          ) : (
            <form id="evaluationForm" onSubmit={handleSubmit} className="space-y-6">
              {otherMembers.map(member => (
                <div key={member.id} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-zinc-100">{member.user?.name}</h4>
                      <p className="text-[10px] text-zinc-400 font-mono-tech mt-0.5">{member.peran}</p>
                    </div>
                    
                    {/* Interactive Star Rating */}
                    <div className="flex items-center gap-1 group">
                      {[1, 2, 3, 4, 5].map(star => {
                        const isFilled = evaluations[member.id]?.skor >= star;
                        return (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleRatingChange(member.id, star)}
                            className="p-1 hover:scale-125 transition-transform duration-200 cursor-pointer"
                          >
                            <Star className={`w-5 h-5 ${isFilled ? 'text-amber-400 fill-amber-400' : 'text-white/20'}`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Comment Input */}
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                    <textarea 
                      rows="2"
                      placeholder={`Berikan ulasan singkat terkait kontribusi ${member.user?.name.split(' ')[0]}...`}
                      value={evaluations[member.id]?.komentar || ''}
                      onChange={(e) => handleCommentChange(member.id, e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-amber-500/50 transition-colors resize-none"
                    />
                  </div>
                </div>
              ))}
            </form>
          )}
        </div>

        {/* Footer */}
        {submitStatus !== 'success' && otherMembers.length > 0 && (
          <div className="px-6 py-4 border-t border-white/10 bg-white/[0.02] flex justify-end gap-3">
            <button 
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button 
              type="submit"
              form="evaluationForm"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-zinc-950 bg-amber-400 hover:bg-amber-500 disabled:opacity-50 transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(251,191,36,0.3)]"
            >
              {isSubmitting ? (
                <><div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Menyimpan...</>
              ) : (
                <><Send className="w-4 h-4" /> Simpan & Kirim Evaluasi</>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeerEvaluationModal;
