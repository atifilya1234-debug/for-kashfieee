
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeartOverflowProps {
  onNext: () => void;
}

const HeartOverflow: React.FC<HeartOverflowProps> = ({ onNext }) => {
  const [fill, setFill] = useState(0);

  const getLabel = () => {
    if (fill === 0) return "Empty without you...";
    if (fill < 20) return "Feeling your touch...";
    if (fill < 40) return "Our fingers intertwining...";
    if (fill < 60) return "A soft forehead kiss...";
    if (fill < 80) return "Your breath against mine...";
    if (fill < 95) return "Overflowing with love...";
    return "Complete. Forever.";
  };

  const handleFillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (newValue !== fill) {
      setFill(newValue);
      // Trigger subtle haptic feedback if available
      if ('vibrate' in navigator) {
        // Very short pulse for a "ticking" tactile feel
        navigator.vibrate(10);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-poetic text-pink-100/80 italic mb-4 tracking-tight">Pouring my soul into yours</h2>
        <p className="text-pink-100/40 text-sm max-w-[280px] mx-auto leading-relaxed font-light italic">
          "Like a tide finding the shore, let your essence fill every hollow space within me."
        </p>
      </motion.div>

      <div className="relative w-80 h-80 flex items-center justify-center">
        {/* Decorative Glow */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute inset-0 bg-pink-500 rounded-full blur-[80px] pointer-events-none"
        />

        {/* Heart Container */}
        <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-[0_0_25px_rgba(255,77,109,0.2)]">
          <defs>
            <clipPath id="heartClip">
              <path d="M16 28.5L14.1 26.8C7.4 20.7 3 16.7 3 11.8C3 7.8 6.1 4.7 10.1 4.7C12.3 4.7 14.5 5.8 15.9 7.4C17.3 5.8 19.5 4.7 21.8 4.7C25.7 4.7 28.8 7.8 28.8 11.8C28.8 16.7 24.4 20.7 17.7 26.8L16 28.5Z" />
            </clipPath>
          </defs>
          <path 
            d="M16 28.5L14.1 26.8C7.4 20.7 3 16.7 3 11.8C3 7.8 6.1 4.7 10.1 4.7C12.3 4.7 14.5 5.8 15.9 7.4C17.3 5.8 19.5 4.7 21.8 4.7C25.7 4.7 28.8 7.8 28.8 11.8C28.8 16.7 24.4 20.7 17.7 26.8L16 28.5Z" 
            fill="none" 
            stroke="rgba(255,192,203,0.15)" 
            strokeWidth="0.3" 
          />
          <g clipPath="url(#heartClip)">
            <motion.rect
              animate={{ height: `${fill}%` }}
              transition={{ type: 'spring', damping: 25, stiffness: 60 }}
              x="0"
              y={32 - (32 * fill / 100)}
              width="32"
              height="32"
              fill="url(#pinkGradient)"
            />
            {/* Bubbles animation inside heart */}
            {fill > 10 && [...Array(5)].map((_, i) => (
              <motion.circle
                key={i}
                initial={{ opacity: 0, r: 0 }}
                animate={{ 
                  y: [32, 0], 
                  opacity: [0, 0.4, 0],
                  r: [0, 1, 0],
                  x: [Math.random() * 32, Math.random() * 32]
                }}
                transition={{ repeat: Infinity, duration: 2 + Math.random() * 2, delay: i * 0.4 }}
                fill="white"
              />
            ))}
          </g>
          <linearGradient id="pinkGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff758f" />
            <stop offset="100%" stopColor="#800f2f" />
          </linearGradient>
        </svg>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.span
              key={getLabel()}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -10 }}
              className="font-cursive text-2xl text-white drop-shadow-2xl whitespace-nowrap text-center px-4"
            >
              {getLabel()}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-20 w-full max-w-[280px] flex flex-col items-center gap-6">
        <div className="w-full relative h-1 bg-pink-900/20 rounded-full">
           <input
            type="range"
            min="0"
            max="100"
            value={fill}
            onChange={handleFillChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <motion.div 
            className="h-full bg-pink-500 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)]"
            style={{ width: `${fill}%` }}
          />
        </div>
        
        <motion.div 
          animate={{ opacity: [0.3, 1, 0.3] }} 
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="flex items-center gap-3 text-pink-500/40 text-[10px] font-bold tracking-[0.3em] uppercase"
        >
          <span>Slide to connect souls</span>
        </motion.div>
      </div>

      <motion.button
        disabled={fill < 98}
        onClick={onNext}
        whileTap={{ scale: 0.95 }}
        className={`mt-14 px-12 py-4 rounded-full transition-all duration-700 font-poetic tracking-widest text-sm ${
          fill >= 98 
            ? 'bg-pink-600 text-white shadow-[0_0_30px_rgba(219,39,119,0.3)] cursor-pointer' 
            : 'bg-pink-900/10 text-pink-900/30 cursor-not-allowed border border-pink-900/20'
        }`}
      >
        Continue to our world
      </motion.button>
    </div>
  );
};

export default HeartOverflow;
