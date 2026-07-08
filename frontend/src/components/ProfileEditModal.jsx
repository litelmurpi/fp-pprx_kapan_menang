import React, { useState, useEffect } from 'react';
import { X, User, Star, Trash2, Plus, CheckCircle2, AlertCircle, Sparkles, BookOpen, Clock, Heart, Zap } from 'lucide-react';
import api from '../api/axios';

const ProfileEditModal = ({ isOpen, onClose, currentUser, refreshUser }) => {
  const [activeTab, setActiveTab] = useState('profile'); // profile, skills
  
  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: '',
    nim: '',
    prodi: '',
    minat_bidang: 'Backend',
    jam_luang_per_minggu: 10
  });

  // Skills State
  const [userSkills, setUserSkills] = useState([]);
  const [masterSkills, setMasterSkills] = useState([]);
  const [newSkillId, setNewSkillId] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState(3);

  // Status & Feedback State
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const fetchData = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      // 1. Fetch Profile info
      const profileRes = await api.get('/mahasiswa/profile');
      const data = profileRes.data;
      setProfileForm({
        name: data.user?.name || '',
        nim: data.nim || '',
        prodi: data.prodi || '',
        minat_bidang: data.minat_bidang || 'Backend',
        jam_luang_per_minggu: data.jam_luang_per_minggu || 10
      });

      // 2. Fetch User Skills
      const skillsRes = await api.get('/mahasiswa/skills');
      setUserSkills(skillsRes.data);

      // 3. Fetch Master Skills
      const masterRes = await api.get('/skills/master');
      setMasterSkills(masterRes.data);
    } catch (err) {
      console.error("Error fetching profile/skills data:", err);
      setErrorMsg("Gagal memuat data profil. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const response = await api.put('/mahasiswa/profile', {
        name: profileForm.name,
        nim: profileForm.nim,
        prodi: profileForm.prodi,
        minat_bidang: profileForm.minat_bidang,
        jam_luang_per_minggu: parseInt(profileForm.jam_luang_per_minggu, 10)
      });
      
      setSuccessMsg("Profil berhasil diperbarui!");
      if (refreshUser) {
        await refreshUser();
      }
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error("Profile update failed:", err);
      setErrorMsg(err.response?.data?.message || "Gagal memperbarui profil.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkillId) {
      setErrorMsg("Silakan pilih keahlian terlebih dahulu.");
      return;
    }
    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const response = await api.post('/mahasiswa/skills', {
        skill_id: parseInt(newSkillId, 10),
        level_keahlian: parseInt(newSkillLevel, 10)
      });
      
      setSuccessMsg("Keahlian berhasil ditambahkan!");
      setNewSkillId('');
      setNewSkillLevel(3);
      
      // Refresh skills list
      const skillsRes = await api.get('/mahasiswa/skills');
      setUserSkills(skillsRes.data);

      if (refreshUser) {
        await refreshUser();
      }
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error("Add skill failed:", err);
      setErrorMsg(err.response?.data?.message || "Gagal menambahkan keahlian.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveSkill = async (id) => {
    setErrorMsg('');
    setSuccessMsg('');
    try {
      await api.delete(`/mahasiswa/skills/${id}`);
      setSuccessMsg("Keahlian berhasil dihapus!");
      
      // Refresh skills list
      const skillsRes = await api.get('/mahasiswa/skills');
      setUserSkills(skillsRes.data);

      if (refreshUser) {
        await refreshUser();
      }
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error("Remove skill failed:", err);
      setErrorMsg(err.response?.data?.message || "Gagal menghapus keahlian.");
    }
  };

  if (!isOpen) return null;

  // Filter out master skills that the user already has
  const availableMasterSkills = masterSkills.filter(
    ms => !userSkills.some(us => us.skill_id === ms.id)
  );

  // Group master skills by category
  const groupedMasterSkills = availableMasterSkills.reduce((acc, skill) => {
    if (!acc[skill.kategori]) {
      acc[skill.kategori] = [];
    }
    acc[skill.kategori].push(skill);
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="theme-card rounded-[24px] max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden relative shadow-2xl border-t-2 primary-border bg-[var(--color-elevated)]">
        
        {/* Header */}
        <div className="p-6 border-b theme-border bg-white/[0.02] relative shrink-0">
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 border theme-border hover:bg-white/10 theme-text-sub hover:theme-text transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className="w-4 h-4 text-[var(--color-primary)]" />
            <span className="text-[10px] font-mono-tech uppercase tracking-wider badge-primary px-2 py-0.5 rounded">
              Pengaturan Akun
            </span>
          </div>

          <h2 className="font-heading text-2xl font-bold theme-text">
            Edit Profil &amp; Kemampuan
          </h2>
          <p className="text-xs theme-text-sub mt-1">
            Sesuaikan portofolio dan tingkat keahlianmu untuk mengoptimalkan kecocokan tim proyek.
          </p>
        </div>

        {/* Success/Error Alerts */}
        {successMsg && (
          <div className="px-6 pt-4 shrink-0 animate-in slide-in-from-top-2 duration-150">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          </div>
        )}
        {errorMsg && (
          <div className="px-6 pt-4 shrink-0 animate-in slide-in-from-top-2 duration-150">
            <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center gap-4 px-6 pt-3 border-b theme-border shrink-0 bg-white/[0.01]">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'border-[var(--color-primary)] primary-text'
                : 'border-transparent theme-text-sub hover:theme-text'
            }`}
          >
            <div className="flex items-center gap-1.5 justify-center">
              <User className="w-4 h-4" />
              <span>Informasi Profil</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'skills'
                ? 'border-[var(--color-primary)] primary-text'
                : 'border-transparent theme-text-sub hover:theme-text'
            }`}
          >
            <div className="flex items-center gap-1.5 justify-center">
              <Zap className="w-4 h-4" />
              <span>Kemampuan &amp; Skill ({userSkills.length})</span>
            </div>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {isLoading ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs theme-text-sub">Memuat informasi profil...</p>
            </div>
          ) : activeTab === 'profile' ? (
            /* Profile Info Form */
            <form onSubmit={handleProfileSubmit} className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold theme-text-muted uppercase tracking-wider mb-1.5 font-mono-tech">
                    Nama Lengkap
                  </label>
                  <input 
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-white/5 border theme-border rounded-xl px-3.5 py-2.5 text-xs theme-text focus:outline-none focus:border-[var(--color-primary)] transition-all"
                    placeholder="Nama Lengkap Anda"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold theme-text-muted uppercase tracking-wider mb-1.5 font-mono-tech">
                    NIM (Nomor Induk Mahasiswa)
                  </label>
                  <input 
                    type="text"
                    required
                    value={profileForm.nim}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, nim: e.target.value }))}
                    className="w-full bg-white/5 border theme-border rounded-xl px-3.5 py-2.5 text-xs theme-text focus:outline-none focus:border-[var(--color-primary)] transition-all"
                    placeholder="Contoh: 22.11.4321"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold theme-text-muted uppercase tracking-wider mb-1.5 font-mono-tech">
                    Program Studi
                  </label>
                  <input 
                    type="text"
                    required
                    value={profileForm.prodi}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, prodi: e.target.value }))}
                    className="w-full bg-white/5 border theme-border rounded-xl px-3.5 py-2.5 text-xs theme-text focus:outline-none focus:border-[var(--color-primary)] transition-all"
                    placeholder="Contoh: Informatika"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold theme-text-muted uppercase tracking-wider mb-1.5 font-mono-tech">
                    Minat Bidang (Kategori Utama)
                  </label>
                  <select 
                    value={profileForm.minat_bidang}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, minat_bidang: e.target.value }))}
                    className="w-full bg-white/5 border theme-border rounded-xl px-3.5 py-2.5 text-xs theme-text focus:outline-none focus:border-[var(--color-primary)] transition-all cursor-pointer"
                  >
                    <option value="Backend">Backend Development</option>
                    <option value="Frontend">Frontend Development</option>
                    <option value="Design">UI/UX Design</option>
                    <option value="Fullstack">Fullstack Development</option>
                    <option value="Mobile">Mobile App Development</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold theme-text-muted uppercase tracking-wider mb-1.5 font-mono-tech flex items-center justify-between">
                  <span>Ketersediaan Waktu (Jam Per Minggu)</span>
                  <span className="primary-text lowercase font-normal">{profileForm.jam_luang_per_minggu} jam / minggu</span>
                </label>
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border theme-border">
                  <Clock className="w-5 h-5 text-[var(--color-primary)] shrink-0" />
                  <input 
                    type="range"
                    min="1"
                    max="40"
                    value={profileForm.jam_luang_per_minggu}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, jam_luang_per_minggu: parseInt(e.target.value, 10) }))}
                    className="w-full accent-[var(--color-primary)] cursor-pointer"
                  />
                </div>
                <p className="text-[10px] theme-text-muted mt-1.5">
                  Komitmen waktu membantu PIC mencocokkan beban kerja sprint proyek kolaborasi.
                </p>
              </div>

              <div className="pt-4 border-t theme-border flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={onClose}
                  className="btn-secondary text-xs px-5 py-2.5 rounded-xl font-medium cursor-pointer"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-primary text-xs px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-lg cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <span>Simpan Perubahan</span>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Skills Tab */
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Form Add New Skill */}
              <div className="bg-white/[0.02] border theme-border rounded-2xl p-5 space-y-4">
                <h3 className="text-xs font-bold theme-text flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-[var(--color-primary)]" />
                  <span>Tambah Skill Baru</span>
                </h3>
                
                <form onSubmit={handleAddSkill} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                  <div className="sm:col-span-5">
                    <label className="block text-[9px] font-bold theme-text-muted uppercase tracking-wider mb-1.5 font-mono-tech">
                      Pilih Keahlian
                    </label>
                    <select
                      required
                      value={newSkillId}
                      onChange={(e) => setNewSkillId(e.target.value)}
                      className="w-full bg-black/20 border theme-border rounded-xl px-3.5 py-2.5 text-xs theme-text focus:outline-none focus:border-[var(--color-primary)] transition-all cursor-pointer"
                    >
                      <option value="">-- Pilih Skill --</option>
                      {Object.keys(groupedMasterSkills).map(cat => (
                        <optgroup key={cat} label={cat} className="bg-zinc-900 text-zinc-300">
                          {groupedMasterSkills[cat].map(skill => (
                            <option key={skill.id} value={skill.id} className="text-white">
                              {skill.nama}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-4">
                    <label className="block text-[9px] font-bold theme-text-muted uppercase tracking-wider mb-1.5 font-mono-tech flex justify-between">
                      <span>Tingkat Keahlian</span>
                      <span className="primary-text font-normal">{newSkillLevel}/5</span>
                    </label>
                    <select
                      value={newSkillLevel}
                      onChange={(e) => setNewSkillLevel(parseInt(e.target.value, 10))}
                      className="w-full bg-black/20 border theme-border rounded-xl px-3.5 py-2.5 text-xs theme-text focus:outline-none focus:border-[var(--color-primary)] transition-all cursor-pointer"
                    >
                      <option value="1">1 - Pemula (Novice)</option>
                      <option value="2">2 - Dasar (Basic)</option>
                      <option value="3">3 - Menengah (Intermediate)</option>
                      <option value="4">4 - Lanjut (Advanced)</option>
                      <option value="5">5 - Ahli (Expert)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary text-xs py-2.5 rounded-xl font-bold flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Tambah
                    </button>
                  </div>
                </form>
              </div>

              {/* Owned Skills List */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold theme-text-muted uppercase tracking-wider font-mono-tech">
                  Skill Anda Saat Ini ({userSkills.length})
                </h3>

                {userSkills.length === 0 ? (
                  <div className="text-center py-8 border-2 border-dashed theme-border rounded-xl">
                    <BookOpen className="w-6 h-6 theme-text-muted mx-auto mb-2 opacity-50" />
                    <p className="text-xs theme-text-sub">Kamu belum menambahkan skill apapun ke profil.</p>
                    <p className="text-[10px] theme-text-muted mt-0.5">Pilih skill di atas untuk meningkatkan pencocokan proyek.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1">
                    {userSkills.map((us) => (
                      <div 
                        key={us.id} 
                        className="p-3.5 rounded-xl bg-white/5 border theme-border flex items-center justify-between hover:bg-white/[0.08] transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="text-xs font-bold theme-text">{us.skill?.nama}</p>
                            <span className="text-[8px] font-mono-tech bg-white/10 px-1.5 py-0.5 rounded text-zinc-400">
                              {us.skill?.kategori}
                            </span>
                          </div>
                          
                          {/* Stars level representation */}
                          <div className="flex items-center gap-0.5 mt-1.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3 h-3 ${
                                  i < us.level_keahlian 
                                    ? 'fill-[var(--color-primary)] text-[var(--color-primary)]' 
                                    : 'text-zinc-600'
                                }`} 
                              />
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={() => handleRemoveSkill(us.id)}
                          title="Hapus Skill"
                          className="p-2 rounded-lg bg-red-500/5 border border-red-500/10 hover:bg-red-500/20 hover:border-red-500/30 text-red-400 transition-all cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;
