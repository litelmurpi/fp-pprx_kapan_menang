import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating = 0, maxRating = 5, size = 4 }) => {
  // Ensure rating is a number and fallback to 0
  const safeRating = Number(rating) || 0;

  return (
    <div className="flex items-center gap-1 group cursor-default" title={`Rating: ${safeRating.toFixed(1)}/${maxRating}`}>
      <div className="flex items-center gap-0.5">
        {[...Array(maxRating)].map((_, i) => {
          // Calculate how much of this specific star should be filled (0 to 100)
          const fillPercentage = Math.max(0, Math.min(100, (safeRating - i) * 100));
          
          return (
            <div key={i} className="relative transition-transform duration-300 hover:scale-125 hover:-translate-y-0.5 z-10 hover:z-20">
              {/* Empty Star (Background) */}
              <Star className={`w-${size} h-${size} text-white/10`} />
              
              {/* Filled Star Overlay */}
              <div 
                className="absolute top-0 left-0 overflow-hidden transition-all duration-500 ease-out" 
                style={{ width: `${fillPercentage}%` }}
              >
                <Star className={`w-${size} h-${size} text-amber-400 fill-amber-400`} />
              </div>
            </div>
          );
        })}
      </div>
      <span className="ml-1.5 text-[11px] font-bold font-mono-tech text-zinc-400 group-hover:text-amber-400 transition-colors">
        {safeRating.toFixed(1)}
      </span>
    </div>
  );
};

export default StarRating;
