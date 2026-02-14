
import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAssetPath } from '../constants';

interface SanctuaryProps {
  onNext: () => void;
}

const Sanctuary: React.FC<SanctuaryProps> = ({ onNext }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      ctx.fillStyle = '#0f0505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = 'italic 18px serif';
      ctx.fillStyle = 'rgba(255, 192, 203, 0.2)';
      ctx.textAlign = 'center';
      ctx.fillText('Caress away the shadows...', canvas.width / 2, canvas.height / 2);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const scratch = (e: React.PointerEvent) => {
    if (!isDrawing || isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 60, 0, Math.PI * 2);
    ctx.fill();

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] < 128) transparent++;
    }
    if (transparent / (imageData.data.length / 4) > 0.5) setIsRevealed(true);
  };

  const intimateImgPath = getAssetPath("intimate.png");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden bg-[#050505]">
      <div className="text-center mb-16 z-10">
        <h2 className="text-4xl font-poetic text-pink-50 mb-3 tracking-tighter">The Sanctuary</h2>
        <p className="text-pink-100/30 italic text-sm font-light">"Beyond the noise, our universe for two."</p>
      </div>

      <div className="relative w-full max-w-[340px] aspect-[4/5.5] rounded-[3rem] overflow-hidden shadow-2xl ring-1 ring-white/5">
        <div className="absolute inset-0 bg-neutral-950 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-b from-[#1a0a0a] to-[#020202]">
          <motion.div 
            animate={{ scale: isRevealed ? 1 : 1.1, opacity: isRevealed ? 1 : 0 }}
            className="w-full h-72 rounded-3xl overflow-hidden mb-8 ring-1 ring-white/10"
          >
             <img src={intimateImgPath} className="w-full h-full object-cover" alt="Sanctuary" />
          </motion.div>
          <motion.p animate={{ opacity: isRevealed ? 1 : 0 }} className="text-pink-100/50 leading-relaxed text-sm italic font-light">
            "Every touch is a language only we speak. Kashfieee, you are the light in my darkest nights."
          </motion.p>
          <motion.button
            onClick={onNext}
            animate={{ opacity: isRevealed ? 1 : 0, scale: isRevealed ? 1 : 0.8 }}
            className="mt-12 px-12 py-4 bg-pink-700 text-white rounded-full text-[10px] font-bold tracking-[0.4em] uppercase"
          >
            The Final Promise
          </motion.button>
        </div>

        <canvas
          ref={canvasRef}
          onPointerDown={() => setIsDrawing(true)}
          onPointerUp={() => setIsDrawing(false)}
          onPointerMove={scratch}
          className={`absolute inset-0 z-20 cursor-crosshair transition-opacity duration-1000 ${isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        />
      </div>
    </div>
  );
};

export default Sanctuary;
