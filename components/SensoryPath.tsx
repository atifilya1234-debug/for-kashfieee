
import React from 'react';
import { motion } from 'framer-motion';
import { Memory } from '../types';
import { getAssetPath } from '../constants';

const getMemories = (): Memory[] => [
  {
    id: 'glance',
    title: "The Sanctuary of Glances.",
    content: "The classroom was never about the blackboards or the lectures. It was about the gravity of your presence. I remember the dust motes dancing in the sunlight between us.",
    imageUrl: getAssetPath("glance")
  },
  {
    id: 'hand',
    title: "Intertwined Fingers.",
    content: "There's a specific kind of magic that happens when our hands find each other. It’s not just skin touching skin; it’s a silent conversation. Coming home in your grasp.",
    imageUrl: getAssetPath("hand")
  },
  {
    id: 'kiss',
    title: "Breath, Lips, and Forever.",
    content: "The world stops when I kiss you. Whether it’s a tender forehead kiss that whispers 'I’ve got you,' or the soft pressure of our lips meeting, every second feels eternal.",
    imageUrl: getAssetPath("kiss")
  },
  {
    id: 'ride',
    title: "Chasing Horizions.",
    content: "On that scooty, with the wind roaring past us and your arms wrapped tightly around my waist, I feel invincible. The city lights become a blur of gold, but you are my focus.",
    imageUrl: getAssetPath("ride")
  }
];

interface SensoryPathProps {
  onNext: () => void;
}

const SensoryPath: React.FC<SensoryPathProps> = ({ onNext }) => {
  const memories = getMemories();
  
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] py-32 px-6 overflow-y-auto scroll-smooth">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-32"
      >
        <h2 className="text-5xl font-poetic text-pink-50 mb-6 tracking-tighter">The Sensory Path</h2>
        <p className="text-pink-100/40 italic text-sm font-light max-w-xs mx-auto leading-relaxed">
          "Fragments of a love that defies the ordinary. Each image a heartbeat in our story."
        </p>
      </motion.div>

      <div className="space-y-64 max-w-lg mx-auto pb-64">
        {memories.map((memory, index) => (
          <MemoryItem key={memory.id} memory={memory} index={index} />
        ))}
      </div>

      <div className="flex flex-col items-center justify-center pb-40 gap-8">
        <p className="text-pink-100/20 font-cursive text-2xl italic">"And we're just getting started..."</p>
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-16 py-5 bg-transparent border border-pink-500/30 text-pink-200 rounded-full hover:bg-pink-500/5 transition-all font-poetic tracking-[0.3em] text-[10px] uppercase shadow-[0_0_40px_rgba(255,182,193,0.05)]"
        >
          Beyond the memories
        </motion.button>
      </div>
    </div>
  );
};

const MemoryItem: React.FC<{ memory: Memory; index: number }> = ({ memory, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      className="flex flex-col gap-12 perspective-1000"
    >
      <motion.div 
        whileHover={{ 
          rotateX: 5, 
          rotateY: -5,
          scale: 1.02,
          transition: { duration: 0.4, ease: "easeOut" }
        }}
        className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)] group ring-1 ring-white/5 bg-neutral-900"
      >
        <img 
          src={memory.imageUrl} 
          className="w-full h-full object-cover opacity-80 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-100" 
          alt={memory.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/10 to-transparent opacity-90" />
        <div className="absolute bottom-12 left-10 right-10">
          <span className="text-pink-500/60 text-[9px] uppercase tracking-[0.6em] font-bold mb-3 block">Fragment {index + 1}</span>
          <h3 className="text-3xl font-poetic text-pink-50 leading-tight drop-shadow-2xl">{memory.title}</h3>
        </div>
      </motion.div>
      <div className="px-6 relative">
        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-pink-500/40 to-transparent" />
        <p className="text-pink-100/60 leading-relaxed font-light text-lg italic pl-8 py-2">"{memory.content}"</p>
      </div>
    </motion.div>
  );
};

export default SensoryPath;