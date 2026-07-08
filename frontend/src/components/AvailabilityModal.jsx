import React, { useState } from 'react';
import { X, Clock, Calendar, CheckCircle2 } from 'lucide-react';

const AvailabilityModal = ({ isOpen, onClose, currentUser, onSave }) => {
  if (!isOpen) return null;

  // Initialize weekly schedule
  const defaultSchedule = {
    Senin: { active: true, startHour: 8, endHour: 16 },
    Selasa: { active: false, startHour: 9, endHour: 17 },
    Rabu: { active: true, startHour: 10, endHour: 18 },
    Kamis: { active: false, startHour: 8, endHour: 15 },
    Jumat: { active: true, startHour: 13, endHour: 20 },
    Sabtu: { active: false, startHour: 9, endHour: 15 },
    Minggu: { active: false, startHour: 10, endHour: 16 },
  };

  const [schedule, setSchedule] = useState(() => {
    return currentUser?.schedule || defaultSchedule;
  });

  const [showToast, setShowToast] = useState(false);

  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

  const handleScheduleChange = (day, field, value) => {
    setSchedule((prev) => {
      const currentDay = prev[day] || { active: false, startHour: 8, endHour: 16 };
      let newStart = field === 'startHour' ? value : currentDay.startHour;
      let newEnd = field === 'endHour' ? value : currentDay.endHour;

      // Ensure startHour < endHour
      if (field === 'startHour' && value >= currentDay.endHour) {
        newEnd = Math.min(24, value + 1);
      }
      if (field === 'endHour' && value <= currentDay.startHour) {
        newStart = Math.max(0, value - 1);
      }

      return {
        ...prev,
        [day]: {
          ...currentDay,
          [field]: field === 'active' ? value : (field === 'startHour' ? newStart : newEnd),
        },
      };
    });
  };

  // Calculate total hours per week
  const totalWeeklyHours = days.reduce((total, day) => {
    const dayData = schedule[day];
    if (dayData && dayData.active) {
      return total + Math.max(0, dayData.endHour - dayData.startHour);
    }
    return total;
  }, 0);

  const formatHour = (h) => `${String(h).padStart(2, '0')}:00`;

  const handleSave = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({ schedule, totalWeeklyHours });
    }
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200 select-none">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-60 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-600 text-white font-medium text-xs shadow-[0_10px_30px_rgba(16,185,129,0.4)] border border-emerald-400/50 animate-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Jadwal ketersediaan berhasil diperbarui! ({totalWeeklyHours} Jam / minggu)</span>
        </div>
      )}

      {/* Modal Container */}
      <div className="w-full max-w-2xl bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[88vh] animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between bg-black/5 dark:bg-white/5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl primary-bg flex items-center justify-center text-[#111111] shadow-sm">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-display font-bold theme-text leading-tight">
                Jadwal Ketersediaan Waktu
              </h3>
              <p className="text-xs theme-text-muted mt-0.5">
                Atur hari dan jam luang Anda setiap minggu untuk pencocokan tim.
              </p>
            </div>
          </div>
          
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl theme-surface hover:bg-black/10 dark:hover:bg-white/10 theme-text-muted hover:theme-text border theme-border transition-colors cursor-pointer"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Days Schedule List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1 min-h-0">
          {days.map((day) => {
            const dayData = schedule[day] || { active: false, startHour: 8, endHour: 16 };
            const startHour = dayData.startHour !== undefined ? dayData.startHour : 8;
            const endHour = dayData.endHour !== undefined ? dayData.endHour : 16;
            const totalHrsDay = Math.max(0, endHour - startHour);

            return (
              <div
                key={day}
                className={`p-3.5 sm:p-4 rounded-2xl transition-all border ${
                  dayData.active
                    ? 'bg-[var(--color-primary)]/[0.06] dark:bg-[var(--color-primary)]/[0.04] border-[var(--color-primary)]/50 dark:border-[var(--color-primary)]/40 shadow-xs'
                    : 'bg-black/5 dark:bg-white/5 border-[var(--color-border)] opacity-60 hover:opacity-80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={dayData.active}
                      onChange={(e) => handleScheduleChange(day, 'active', e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                        dayData.active
                          ? 'bg-[var(--color-primary)] border-[var(--color-primary)] shadow-xs shadow-[var(--color-primary)]/30 scale-105'
                          : 'bg-black/5 dark:bg-white/5 border-[var(--color-border)] group-hover:border-[var(--color-primary)]/60'
                      }`}
                    >
                      <svg
                        className={`w-3.5 h-3.5 text-[#111111] transition-all duration-200 ${
                          dayData.active ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <span className={dayData.active ? 'font-bold text-sm theme-text transition-colors' : 'text-xs theme-text-muted font-medium group-hover:theme-text transition-colors'}>
                      {day}
                    </span>
                  </label>

                  {dayData.active ? (
                    <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-lg bg-[var(--color-primary)] text-[#111111] shadow-xs">
                      {formatHour(startHour)} - {formatHour(endHour)} ({totalHrsDay} Jam)
                    </span>
                  ) : (
                    <span className="text-xs font-medium italic theme-text-muted">Tidak aktif</span>
                  )}
                </div>

                {dayData.active && (
                  <div className="mt-3.5 pt-3 border-t border-[var(--color-primary)]/20 px-1 pb-1">
                    {/* Slider Track Container */}
                    <div className="relative h-5 flex items-center">
                      {/* Base Dark Contrast Track */}
                      <div className="absolute w-full h-2 bg-black/20 dark:bg-white/15 rounded-full overflow-hidden" />

                      {/* Active Brand Highlight Bar */}
                      <div
                        className="absolute h-2 bg-[var(--color-primary)] rounded-full transition-all duration-75 shadow-xs shadow-[var(--color-primary)]/40"
                        style={{
                          left: `${(startHour / 24) * 100}%`,
                          width: `${((endHour - startHour) / 24) * 100}%`,
                        }}
                      />

                      {/* Input 1: Start Hour */}
                      <input
                        type="range"
                        min="0"
                        max="23"
                        value={startHour}
                        onChange={(e) => handleScheduleChange(day, 'startHour', Number(e.target.value))}
                        className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--color-primary)] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#111111] [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer hover:[&::-webkit-slider-thumb]:scale-125 transition-all z-10"
                      />

                      {/* Input 2: End Hour */}
                      <input
                        type="range"
                        min="1"
                        max="24"
                        value={endHour}
                        onChange={(e) => handleScheduleChange(day, 'endHour', Number(e.target.value))}
                        className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--color-primary)] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#111111] [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer hover:[&::-webkit-slider-thumb]:scale-125 transition-all z-20"
                      />
                    </div>

                    {/* Time ticks / legend */}
                    <div className="flex justify-between items-center text-[10px] theme-text-muted font-mono mt-1.5 font-bold">
                      <span>00:00</span>
                      <span>06:00</span>
                      <span>12:00</span>
                      <span>18:00</span>
                      <span>24:00</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-6 py-4 border-t border-[var(--color-border)] bg-black/5 dark:bg-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs font-bold theme-text bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/30 px-3 py-1.5 rounded-xl">
            <Calendar className="w-4 h-4 shrink-0" />
            <span>Total Ketersediaan: <strong className="font-mono">{totalWeeklyHours}</strong> Jam / minggu</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border theme-border text-xs font-semibold theme-text hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="btn-brand-primary px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer shadow-md shadow-[var(--color-primary)]/20 flex items-center justify-center gap-1.5"
            >
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityModal;
