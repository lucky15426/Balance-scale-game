import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react';
import { playSound } from '../utils/audio';

export default function FeedbackModal({
  isOpen,
  title = 'Level Completed! 🎉',
  explanation,
  pointsEarned = 100,
  onNextLevel,
  onRestartLevel,
  nextLevelText = 'Next Challenge →',
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          className="w-full max-w-md bg-white border-4 border-yellow-400 rounded-3xl p-6 sm:p-8 shadow-2xl text-center relative overflow-hidden"
        >
          {/* Top Decorative Sunburst Accent */}
          <div className="absolute -top-16 -left-16 w-32 h-32 bg-yellow-300 rounded-full blur-2xl opacity-60 pointer-events-none" />
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-purple-300 rounded-full blur-2xl opacity-60 pointer-events-none" />

          {/* Celebratory Icon */}
          <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-tr from-yellow-400 via-amber-300 to-orange-400 flex items-center justify-center text-4xl shadow-xl animate-bounce">
            ⚖️
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-purple-950 mb-2">
            {title}
          </h2>

          {pointsEarned > 0 && (
            <div className="inline-flex items-center gap-1.5 bg-amber-100 border-2 border-amber-300 text-amber-900 font-black px-4 py-1.5 rounded-full text-base mb-4 shadow-sm">
              <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400" />
              <span>+{pointsEarned} Bonus Points!</span>
            </div>
          )}

          {explanation && (
            <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-4 text-sm font-bold text-purple-900 mb-6 leading-relaxed">
              <div className="flex items-center justify-center gap-1 text-purple-700 font-extrabold mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Conversion Insight</span>
              </div>
              {explanation}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                playSound('click');
                onNextLevel();
              }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-lg shadow-xl hover:shadow-emerald-400/50 flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <span>{nextLevelText}</span>
              <ArrowRight className="w-6 h-6" />
            </button>

            {onRestartLevel && (
              <button
                onClick={() => {
                  playSound('click');
                  onRestartLevel();
                }}
                className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Try Level Again</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
