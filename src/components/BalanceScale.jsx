import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getWeightById } from '../data/weights';
import { formatWeight } from '../utils/conversion';
import { CheckCircle2, Trash2 } from 'lucide-react';
import { playSound } from '../utils/audio';

export default function BalanceScale({
  leftPanItems,
  rightPanItems,
  leftTotal,
  rightTotal,
  comparison,
  onRemoveItem,
  onClearPan,
  onDropOnPan,
  selectedWeightForTap,
  onTapPlaceItem,
}) {
  const { status, tiltAngle, isBalanced, absDiff } = comparison;

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e, panSide) => {
    e.preventDefault();
    const weightId = e.dataTransfer.getData('text/weightId');
    if (weightId) {
      playSound('drop');
      onDropOnPan(weightId, panSide);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center select-none py-1">
      
      {/* Dynamic Status / Feedback Message */}
      <div className="h-10 flex items-center justify-center mb-1">
        <AnimatePresence mode="wait">
          {isBalanced ? (
            <motion.div
              key="balanced"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-emerald-500 text-white font-black text-base sm:text-lg px-7 py-2 rounded-full shadow-xl border-3 border-yellow-300 flex items-center gap-2 animate-bounce"
            >
              <CheckCircle2 className="w-6 h-6 text-yellow-300" />
              <span>Perfect Balance! ({formatWeight(leftTotal)} = {formatWeight(rightTotal)})</span>
            </motion.div>
          ) : leftTotal > 0 || rightTotal > 0 ? (
            <motion.div
              key="unbalanced"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs sm:text-sm font-bold text-slate-700 bg-white/90 backdrop-blur-sm px-5 py-1.5 rounded-full shadow-md border border-purple-200"
            >
              {status === 'left-heavy' ? '⬅️ Left side is heavier (down)' : '➡️ Right side is heavier (down)'}
            </motion.div>
          ) : (
            <div className="text-xs sm:text-sm font-bold text-purple-700">
              Drag fruits onto the pans to balance the scale!
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* BIGGER HERO BALANCE SCALE SCENE */}
      <div className="relative w-full max-w-[940px] h-[380px] sm:h-[440px] flex justify-center items-center overflow-visible">
        
        {/* Base and Center Pillar */}
        <div className="absolute bottom-1 z-10 flex flex-col items-center">
          {/* Central Vertical Golden Pillar */}
          <div className="w-9 sm:w-11 h-44 sm:h-56 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 rounded-t-md shadow-lg border-x-2 border-amber-600/40 relative">
            {/* Golden decorative rings on pillar */}
            <div className="w-11 sm:w-13 h-3.5 bg-yellow-300 rounded-full -ml-1 mt-16 border border-amber-600 shadow-sm" />
            <div className="w-11 sm:w-13 h-3.5 bg-yellow-300 rounded-full -ml-1 mt-12 border border-amber-600 shadow-sm" />
          </div>

          {/* Curved Brown Wooden Base with Gauge */}
          <div className="w-56 sm:w-72 h-16 sm:h-20 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 rounded-t-[60px] border-t-4 border-amber-500 shadow-2xl flex items-center justify-center relative -mt-1 overflow-hidden">
            {/* Needle Gauge Dial */}
            <div className="w-20 h-10 bg-white/95 rounded-t-full border-2 border-amber-900 flex justify-center items-end relative overflow-hidden pb-0.5 shadow-inner">
              {/* Dial tick marks */}
              <div className="absolute top-1 w-16 flex justify-between text-[8px] text-amber-900 font-extrabold px-1">
                <span>◀ L</span>
                <span>•</span>
                <span>R ▶</span>
              </div>
              {/* Tilting Needle pointing towards heavier side */}
              <motion.div
                animate={{ rotate: tiltAngle * 2.4 }}
                transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                className="w-1.5 h-7 bg-rose-600 origin-bottom rounded-full shadow z-10"
              />
              <div className="w-3 h-3 bg-amber-800 rounded-full absolute bottom-0" />
            </div>
          </div>
        </div>

        {/* Central Pivot Gold Circle */}
        <div className="absolute top-[110px] sm:top-[124px] z-30 w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-tr from-amber-500 via-yellow-300 to-yellow-500 rounded-full border-4 border-amber-700 shadow-2xl flex items-center justify-center pointer-events-none">
          <div className="w-4 h-4 bg-amber-950 rounded-full border border-yellow-200" />
        </div>

        {/* Big Rotating Golden Beam with Trays Attached to Ends */}
        <motion.div
          animate={{ rotate: tiltAngle }}
          transition={{ type: 'spring', stiffness: 80, damping: 14 }}
          className="absolute top-[126px] sm:top-[142px] z-20 w-[92%] sm:w-[96%] max-w-[880px] h-8 flex justify-between items-center origin-center"
        >
          {/* Main Gold Beam Bar */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 rounded-full border-2 border-amber-700 shadow-xl flex items-center justify-between px-3">
            <div className="w-3 h-3 bg-yellow-200 rounded-full border border-amber-700" />
            <div className="w-3 h-3 bg-yellow-200 rounded-full border border-amber-700" />
          </div>

          {/* LEFT SCALE TRAY ASSEMBLY */}
          <div className="relative -ml-4 sm:-ml-8 flex flex-col items-center">
            {/* Hanging Pin / Strut connecting beam tip to tray */}
            <div className="w-2 h-7 bg-gradient-to-b from-amber-600 to-amber-500 rounded-full -mb-1 shadow" />

            {/* Left Pan Tray (Counter-rotated so it always stays perfectly flat and level!) */}
            <motion.div
              animate={{ rotate: -tiltAngle }}
              transition={{ type: 'spring', stiffness: 80, damping: 14 }}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'left')}
              onClick={() => {
                if (selectedWeightForTap) onTapPlaceItem('left');
              }}
              className="w-52 sm:w-68 min-h-[110px] sm:min-h-[130px] rounded-3xl bg-gradient-to-b from-white via-white/95 to-slate-100 border-4 border-white shadow-[0_12px_32px_rgba(0,0,0,0.16)] p-2.5 flex flex-col justify-between items-center relative cursor-pointer group hover:border-purple-300 transition-all"
            >
              {/* Items Sitting in Left Tray */}
              <div className="w-full flex-1 flex flex-wrap items-center justify-center gap-2 py-1">
                <AnimatePresence>
                  {leftPanItems.map((item) => {
                    const w = getWeightById(item.weightId);
                    if (!w) return null;
                    return (
                      <motion.div
                        key={item.instanceId}
                        initial={{ scale: 0, y: -20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.15 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveItem(item.instanceId, 'left');
                        }}
                        className="relative cursor-pointer flex flex-col items-center group/item"
                        title="Click to remove"
                      >
                        <span className="text-4xl sm:text-5xl filter drop-shadow select-none">
                          {w.icon}
                        </span>
                        <span className="text-[11px] sm:text-xs font-black bg-rose-500 text-white px-2 py-0.5 rounded-full -mt-2 shadow border border-white">
                          {w.label}
                        </span>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {leftPanItems.length === 0 && (
                  <div className="text-xs sm:text-sm font-bold text-slate-400 py-4 select-none">
                    Drop fruits here
                  </div>
                )}
              </div>

              {/* Bold Clean Weight Display on Tray Platform */}
              <div className="w-full flex items-center justify-between px-2 pt-1.5 border-t border-slate-200">
                <span className="text-lg sm:text-2xl font-black text-slate-800 tracking-tight">
                  {formatWeight(leftTotal)}
                </span>
                {leftPanItems.length > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClearPan('left');
                    }}
                    title="Clear tray"
                    className="text-slate-400 hover:text-rose-500 p-1 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>

          {/* RIGHT SCALE TRAY ASSEMBLY */}
          <div className="relative -mr-4 sm:-mr-8 flex flex-col items-center">
            {/* Hanging Pin / Strut connecting beam tip to tray */}
            <div className="w-2 h-7 bg-gradient-to-b from-amber-600 to-amber-500 rounded-full -mb-1 shadow" />

            {/* Right Pan Tray (Counter-rotated so it always stays perfectly flat and level!) */}
            <motion.div
              animate={{ rotate: -tiltAngle }}
              transition={{ type: 'spring', stiffness: 80, damping: 14 }}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'right')}
              onClick={() => {
                if (selectedWeightForTap) onTapPlaceItem('right');
              }}
              className="w-52 sm:w-68 min-h-[110px] sm:min-h-[130px] rounded-3xl bg-gradient-to-b from-white via-white/95 to-slate-100 border-4 border-white shadow-[0_12px_32px_rgba(0,0,0,0.16)] p-2.5 flex flex-col justify-between items-center relative cursor-pointer group hover:border-purple-300 transition-all"
            >
              {/* Items Sitting in Right Tray */}
              <div className="w-full flex-1 flex flex-wrap items-center justify-center gap-2 py-1">
                <AnimatePresence>
                  {rightPanItems.map((item) => {
                    const w = getWeightById(item.weightId);
                    if (!w) return null;
                    return (
                      <motion.div
                        key={item.instanceId}
                        initial={{ scale: 0, y: -20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.15 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveItem(item.instanceId, 'right');
                        }}
                        className="relative cursor-pointer flex flex-col items-center group/item"
                        title="Click to remove"
                      >
                        <span className="text-4xl sm:text-5xl filter drop-shadow select-none">
                          {w.icon}
                        </span>
                        <span className="text-[11px] sm:text-xs font-black bg-rose-500 text-white px-2 py-0.5 rounded-full -mt-2 shadow border border-white">
                          {w.label}
                        </span>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {rightPanItems.length === 0 && (
                  <div className="text-xs sm:text-sm font-bold text-slate-400 py-4 select-none">
                    Drop fruits here
                  </div>
                )}
              </div>

              {/* Bold Clean Weight Display on Tray Platform */}
              <div className="w-full flex items-center justify-between px-2 pt-1.5 border-t border-slate-200">
                <span className="text-lg sm:text-2xl font-black text-slate-800 tracking-tight">
                  {formatWeight(rightTotal)}
                </span>
                {rightPanItems.length > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClearPan('right');
                    }}
                    title="Clear tray"
                    className="text-slate-400 hover:text-rose-500 p-1 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>

      {/* Subtitle Instruction */}
      <p className="text-xs sm:text-sm font-semibold text-purple-700/80 mt-1">
        Drag weights between the tray and the scale pans!
      </p>

    </div>
  );
}
