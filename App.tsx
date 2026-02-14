
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phase } from './types';
import Gateway from './components/Gateway';
import HeartOverflow from './components/HeartOverflow';
import SensoryPath from './components/SensoryPath';
import PhysicsOfLove from './components/PhysicsOfLove';
import Sanctuary from './components/Sanctuary';
import EternalLetter from './components/EternalLetter';

const App: React.FC = () => {
  const [currentPhase, setCurrentPhase] = useState<Phase>(Phase.GATEWAY);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        setMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };
    const handleClick = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0]?.clientY : e.clientY;
      if (clientX !== undefined && clientY !== undefined) {
        const id = Date.now();
        setRipples((prev) => [...prev, { id, x: clientX, y: clientY }]);
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 1000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mousedown', handleClick);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mousedown', handleClick);
    };
  }, []);

  useEffect(() => {
    try {
      const savedPhase = localStorage.getItem('kashfieee_journey_phase');
      if (savedPhase !== null) {
        const parsed = parseInt(savedPhase);
        if (!isNaN(parsed) && Object.values(Phase).includes(parsed)) {
          setCurrentPhase(parsed as Phase);
        }
      }
    } catch (e) {
      console.error("Failed to load journey state", e);
    }
  }, []);

  const handlePhaseChange = useCallback((nextPhase: Phase) => {
    setCurrentPhase(nextPhase);
    try {
      localStorage.setItem('kashfieee_journey_phase', nextPhase.toString());
    } catch (e) {
      console.warn("Could not persist state", e);
    }
  }, []);

  const resetJourney = () => {
    setCurrentPhase(Phase.GATEWAY);
    try {
      localStorage.removeItem('kashfieee_journey_phase');
    } catch (e) {}
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050505] overflow-hidden select-none">
      {/* Global Interaction Ripples */}
      <div className="fixed inset-0 pointer-events-none z-[60]">
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              position: 'absolute',
              left: ripple.x - 20,
              top: ripple.y - 20,
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: '1px solid rgba(255, 77, 109, 0.4)',
              background: 'radial-gradient(circle, rgba(255, 77, 109, 0.1) 0%, transparent 70%)',
            }}
          />
        ))}
      </div>

      {/* Atmospheric Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c0303] via-[#050505] to-[#050510]" />
        <div className="absolute inset-0 bg-pulse pointer-events-none mix-blend-screen" />
        
        {/* Pointer Responsive Orbs */}
        <motion.div 
          animate={{ 
            x: mousePos.x * 0.05, 
            y: mousePos.y * 0.05,
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 50 }}
          className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] bg-pink-900/10 rounded-full blur-[140px]" 
        />
        
        <motion.div 
          animate={{ 
            x: -mousePos.x * 0.03, 
            y: -mousePos.y * 0.03,
          }}
          transition={{ type: 'spring', damping: 40, stiffness: 40 }}
          className="absolute bottom-1/4 right-1/4 w-[70vw] h-[70vw] bg-indigo-900/10 rounded-full blur-[160px]" 
        />
      </div>

      <main className="relative z-10 w-full min-h-screen">
        <AnimatePresence mode="wait">
          {currentPhase === Phase.GATEWAY && (
            <motion.div
              key="gateway"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
              transition={{ duration: 0.8 }}
              className="w-full min-h-screen"
            >
              <Gateway onNext={() => handlePhaseChange(Phase.HEART_OVERFLOW)} />
            </motion.div>
          )}
          {currentPhase === Phase.HEART_OVERFLOW && (
            <motion.div
              key="overflow"
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
              className="w-full min-h-screen"
            >
              <HeartOverflow onNext={() => handlePhaseChange(Phase.SENSORY_PATH)} />
            </motion.div>
          )}
          {currentPhase === Phase.SENSORY_PATH && (
            <motion.div
              key="sensory"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="w-full min-h-screen"
            >
              <SensoryPath onNext={() => handlePhaseChange(Phase.PHYSICS_OF_LOVE)} />
            </motion.div>
          )}
          {currentPhase === Phase.PHYSICS_OF_LOVE && (
            <motion.div
              key="physics"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="w-full min-h-screen"
            >
              <PhysicsOfLove onNext={() => handlePhaseChange(Phase.SANCTUARY)} />
            </motion.div>
          )}
          {currentPhase === Phase.SANCTUARY && (
            <motion.div
              key="sanctuary"
              initial={{ opacity: 0, filter: 'blur(30px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 1.2 }}
              className="w-full min-h-screen"
            >
              <Sanctuary onNext={() => handlePhaseChange(Phase.ETERNAL_LETTER)} />
            </motion.div>
          )}
          {currentPhase === Phase.ETERNAL_LETTER && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="w-full min-h-screen"
            >
              <EternalLetter onReset={resetJourney} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;