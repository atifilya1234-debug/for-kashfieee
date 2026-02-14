
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GatewayProps {
  onNext: () => void;
}

const Gateway: React.FC<GatewayProps> = ({ onNext }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [burst, setBurst] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim().toLowerCase() === 'i love you') {
      setBurst(true);
      setTimeout(onNext, 1200);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full relative"
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-4 text-pink-400/60 font-poetic italic text-lg"
        >
          "In the quiet corners of my soul..."
        </motion.div>
        
        <h1 className="text-5xl md:text-6xl font-poetic text-pink-50 mb-4 tracking-tighter breathing-glow">
          Kashfieee
        </h1>
        <p className="text-pink-100/30 text-[10px] uppercase tracking-[0.5em] mb-12">Whisper the secret to enter</p>

        <form onSubmit={handleSubmit} className="relative mb-12">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="..."
            className="w-full bg-transparent border-b border-pink-500/30 py-4 px-2 text-3xl font-cursive text-pink-300 focus:outline-none focus:border-pink-500 transition-all text-center placeholder:text-pink-900/20"
            autoFocus
          />
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute -bottom-8 left-0 right-0 text-pink-700 text-xs italic"
              >
                Hint: Three words of devotion...
              </motion.p>
            )}
          </AnimatePresence>
        </form>

        <motion.button
          whileHover={{ scale: 1.05, letterSpacing: '0.3em' }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="px-12 py-4 rounded-full border border-pink-500/30 text-pink-100/70 uppercase tracking-[0.2em] text-[10px] bg-pink-500/5 hover:bg-pink-500/10 transition-all backdrop-blur-sm shadow-[0_0_20px_rgba(255,77,109,0.05)] breathing-glow"
        >
          Unlock My Heart
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {burst && (
          <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                animate={{
                  scale: [1, 3, 0],
                  x: (Math.random() - 0.5) * window.innerWidth * 2,
                  y: (Math.random() - 0.5) * window.innerHeight * 2,
                  rotate: Math.random() * 360,
                  opacity: [1, 1, 0]
                }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="absolute text-4xl"
              >
                {i % 3 === 0 ? '❤️' : i % 3 === 1 ? '💖' : '✨'}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gateway;