
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Kiss {
  id: number;
  x: number;
  y: number;
  rotation: number;
  speed: number;
}

const FEEDBACKS = [
  "My heartbeat!", 
  "Inhale your love...", 
  "Soft lips...", 
  "Always yours.", 
  "Kashfieee...", 
  "Sweet nectar.",
  "Soul bond.",
  "Pure bliss."
];

interface PhysicsOfLoveProps {
  onNext: () => void;
}

const PhysicsOfLove: React.FC<PhysicsOfLoveProps> = ({ onNext }) => {
  const [kisses, setKisses] = useState<Kiss[]>([]);
  const [score, setScore] = useState(0);
  const [catches, setCatches] = useState<{id: number, x: number, y: number, text: string}[]>([]);
  const gameRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  const spawnKiss = useCallback(() => {
    if (!gameRef.current) return;
    const width = gameRef.current.clientWidth;
    const newKiss: Kiss = {
      id: nextId.current++,
      x: Math.random() * (width - 80) + 40,
      y: -60,
      rotation: (Math.random() - 0.5) * 40,
      // Increased speed: from (1.0 + random * 1.2) to (3.0 + random * 4.0)
      speed: 3.0 + Math.random() * 4.0, 
    };
    setKisses(prev => [...prev, newKiss]);
  }, []);

  useEffect(() => {
    // Reduced spawn interval from 1100ms to 700ms for more intensity
    const interval = setInterval(spawnKiss, 700);
    return () => clearInterval(interval);
  }, [spawnKiss]);

  useEffect(() => {
    let animationFrame: number;
    const update = () => {
      setKisses(prev => {
        const next = prev
          .map(k => ({ ...k, y: k.y + k.speed }))
          .filter(k => k.y < window.innerHeight + 100);
        return next;
      });
      animationFrame = requestAnimationFrame(update);
    };
    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const catchKiss = (kiss: Kiss) => {
    setScore(s => s + 1);
    const feedbackText = FEEDBACKS[Math.floor(Math.random() * FEEDBACKS.length)];
    setCatches(prev => [...prev, { id: kiss.id, x: kiss.x, y: kiss.y, text: feedbackText }]);
    setKisses(prev => prev.filter(k => k.id !== kiss.id));
    
    // Haptic feedback for interaction
    if ('vibrate' in navigator) {
      navigator.vibrate([15, 10, 15]);
    }

    setTimeout(() => {
      setCatches(prev => prev.filter(c => c.id !== kiss.id));
    }, 1200);
  };

  return (
    <div ref={gameRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] touch-none">
      <div className="absolute top-16 text-center pointer-events-none z-20 px-6">
        <h2 className="text-3xl font-poetic text-pink-100/90 mb-2">The Physics of Love</h2>
        <p className="text-pink-100/20 text-xs uppercase tracking-[0.3em] font-bold">Catch the essence of my soul</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="text-pink-900/40 text-sm">RESERVOIR:</span>
          <div className="text-4xl font-cursive text-pink-500 drop-shadow-[0_0_10px_rgba(236,72,153,0.3)]">{score} <span className="text-xl text-pink-900/50">/ 15</span></div>
        </div>
      </div>

      {kisses.map(k => (
        <motion.div
          key={k.id}
          onPointerDown={() => catchKiss(k)}
          style={{ left: k.x, top: k.y, rotate: k.rotation }}
          whileTap={{ scale: 1.8 }}
          className="absolute text-5xl cursor-pointer transition-transform touch-none select-none z-10 drop-shadow-[0_0_15px_rgba(255,0,0,0.2)]"
        >
          💋
        </motion.div>
      ))}

      <AnimatePresence>
        {catches.map(c => (
          <motion.div
            key={`catch-${c.id}`}
            initial={{ scale: 0.8, opacity: 1, y: 0 }}
            animate={{ 
              scale: [1, 2.5, 1.5], 
              opacity: [1, 0.8, 0], 
              y: -150, 
              rotate: (Math.random() - 0.5) * 20 
            }}
            exit={{ opacity: 0 }}
            style={{ left: c.x, top: c.y }}
            className="absolute z-30 pointer-events-none"
          >
            <div className="flex flex-col items-center">
              <span className="text-4xl mb-2">✨</span>
              <span className="text-pink-400 font-poetic italic text-2xl whitespace-nowrap drop-shadow-[0_0_20px_rgba(255,0,0,0.6)]">{c.text}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {score >= 15 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="z-40 bg-black/90 backdrop-blur-3xl p-10 rounded-[2.5rem] border border-pink-500/20 text-center max-w-[320px] mx-auto shadow-[0_0_80px_rgba(255,0,0,0.15)] ring-1 ring-white/5"
        >
          <div className="text-pink-500 text-4xl mb-6">❤️</div>
          <p className="text-pink-100 text-xl font-poetic mb-8 leading-relaxed italic">
            "Every kiss I send is a piece of my soul finding its way back to you. You are my only gravity."
          </p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="w-full bg-pink-600 text-white py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs shadow-xl shadow-pink-900/40"
          >
            I surrender to you
          </motion.button>
        </motion.div>
      )}

      {/* Persistent Kiss indicators for gravity feel */}
      <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-900/10 to-transparent" />
    </div>
  );
};

export default PhysicsOfLove;
