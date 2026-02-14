
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Particle } from '../types';

interface EternalLetterProps {
  onReset: () => void;
}

const LETTER_TEXT = `My Dearest Kashfieee,

As I sit here, the silence of the night feels heavy with all the things I want to say to you. I used to think that love was something from books—a dramatic gesture, a sudden spark. But with you, it's something far more profound.

It's the quiet gravity of your hand finding mine under a desk. It's the way the city blurs when you're holding onto me tight on our scooty, and the way you look at me like I'm the only person in the room when we're supposed to be studying. 

I remember every **kiss**—the ones that left me breathless and the ones that simply whispered 'I'm here.' You have become the architecture of my every thought. Every bunked tuition class was a lesson in joy, every secret smile in the hallway was a masterpiece. 

You are my **soulmate**, my **forever**, and my **mine**. 

I promise to protect this magic we've built. I promise to be the one who waits for you at the end of every long day, the one who knows the exact shape of your silence, and the one who loves you more than words could ever hope to capture. You are my home, my peace, and my beautiful reality.

I love you, now and always.

Forever yours,
Rahim`;

const EternalLetter: React.FC<EternalLetterProps> = ({ onReset }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Heart Particles
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (index < LETTER_TEXT.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + LETTER_TEXT[index]);
        setIndex(prev => prev + 1);
        
        // Auto-scroll
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, 3); // Faster typing speed (reduced from 10ms to 3ms)
      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [index]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newParticle: Particle = {
        id: Date.now(),
        x: Math.random() * window.innerWidth,
        y: -20,
        size: 8 + Math.random() * 20,
        speed: 0.8 + Math.random() * 1.5,
        opacity: 0.2 + Math.random() * 0.6,
      };
      setParticles(prev => [...prev.slice(-50), newParticle]);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={i} className="mb-6">
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <motion.span
                  key={j}
                  animate={{ scale: [1, 1.1, 1], color: ['#ff4d6d', '#ffb3c1', '#ff4d6d'] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="font-bold text-pink-400 drop-shadow-[0_0_8px_rgba(255,77,109,0.4)]"
                >
                  {part.slice(2, -2)}
                </motion.span>
              );
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 bg-[#0a0a0a]">
      {/* Golden Heart Rain */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ y: p.y, x: p.x, opacity: 0 }}
            animate={{ y: window.innerHeight + 100, opacity: [0, p.opacity, 0] }}
            transition={{ duration: 12 / p.speed, ease: "linear" }}
            style={{ fontSize: p.size }}
            className="absolute text-pink-500/20"
          >
            ❤
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-lg bg-black/60 backdrop-blur-2xl p-10 md:p-14 rounded-[3rem] border border-pink-500/10 shadow-[0_0_120px_rgba(255,182,193,0.1)]"
      >
        <div 
          ref={containerRef}
          className="max-h-[65vh] overflow-y-auto pr-4 custom-scrollbar"
        >
          <div className="font-poetic text-pink-100/90 leading-loose text-lg md:text-xl whitespace-pre-wrap italic font-light">
            {formatText(displayedText)}
          </div>
        </div>

        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-16 text-center"
          >
            <div className="mb-8 font-cursive text-4xl text-pink-500 drop-shadow-[0_0_15px_rgba(255,77,109,0.5)]">I love you, Kashfieee.</div>
            <motion.button
              onClick={onReset}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 bg-gradient-to-r from-pink-800 to-pink-600 text-white rounded-full font-bold uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-pink-900/40"
            >
              Relive our magic
            </motion.button>
          </motion.div>
        )}
      </motion.div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 192, 203, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 192, 203, 0.1);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default EternalLetter;
