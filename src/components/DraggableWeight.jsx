import React from 'react';
import { motion } from 'framer-motion';
import { playSound } from '../utils/audio';

export default function DraggableWeight({ weight, isSelected, onSelect }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/weightId', weight.id);
    e.dataTransfer.effectAllowed = 'copy';
    playSound('pickup');
  };

  const handleClick = () => {
    playSound('pickup');
    if (onSelect) onSelect(weight);
  };

  return (
    <motion.div
      draggable
      onDragStart={handleDragStart}
      onClick={handleClick}
      whileHover={{ scale: 1.12, y: -4 }}
      whileTap={{ scale: 0.92 }}
      className={`relative cursor-grab active:cursor-grabbing flex flex-col items-center justify-center p-2 rounded-2xl transition-all ${
        isSelected ? 'ring-4 ring-yellow-400 scale-105 bg-yellow-50/80 shadow-md' : 'hover:bg-white/60'
      }`}
      title={`${weight.name} - ${weight.label}`}
    >
      {/* Big Fruit Emoji Icon - clearly visible */}
      <span className="text-5xl sm:text-6xl leading-none filter drop-shadow select-none">
        {weight.icon}
      </span>
      {/* Weight Badge placed neatly below the fruit without covering it */}
      <span className="mt-1.5 bg-rose-500 text-white font-black text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full shadow-sm border border-white whitespace-nowrap tracking-wide">
        {weight.label}
      </span>
    </motion.div>
  );
}
