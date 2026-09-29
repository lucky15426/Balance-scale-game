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
        isSelected ? 'ring-4 ring-yellow-400 scale-105 bg-yellow-50' : 'hover:bg-slate-50'
      }`}
      title={`${weight.name} - ${weight.label}`}
    >
      {/* Fruit Big Emoji Icon */}
      <div className="relative flex items-center justify-center">
        <span className="text-4xl sm:text-5xl filter drop-shadow-md select-none">
          {weight.icon}
        </span>
        {/* Weight Badge on the fruit (Like in reference screenshot) */}
        <span className="absolute -bottom-1 bg-rose-500 text-white font-black text-[11px] sm:text-xs px-2 py-0.5 rounded-full shadow-md border-2 border-white">
          {weight.label}
        </span>
      </div>
    </motion.div>
  );
}
