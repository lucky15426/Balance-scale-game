import React from 'react';
import { Lock, Check } from 'lucide-react';

export default function BadgeCard({ badge, isUnlocked }) {
  return (
    <div
      className={`p-4 rounded-3xl border-3 transition-all flex flex-col items-center text-center relative overflow-hidden ${
        isUnlocked
          ? 'bg-gradient-to-b from-amber-50 to-yellow-100 border-amber-400 shadow-lg scale-100'
          : 'bg-slate-100/70 border-slate-300 opacity-60 grayscale'
      }`}
    >
      {/* Badge Icon */}
      <div className="w-16 h-16 rounded-2xl bg-white border-2 border-amber-300 shadow-md flex items-center justify-center text-3xl mb-2">
        {badge.icon}
      </div>

      {/* Badge Title */}
      <h4 className="text-base font-black text-slate-900 mb-1 leading-tight">
        {badge.title}
      </h4>

      {/* Description */}
      <p className="text-xs font-semibold text-slate-600 leading-normal">
        {badge.description}
      </p>

      {/* Lock/Unlock Badge Indicator */}
      <div className="mt-3">
        {isUnlocked ? (
          <span className="inline-flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow">
            <Check className="w-3 h-3" /> UNLOCKED
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 bg-slate-400 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full">
            <Lock className="w-3 h-3" /> LOCKED
          </span>
        )}
      </div>
    </div>
  );
}
