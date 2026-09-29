import React from 'react';
import { Star, Flame, Trophy, Target } from 'lucide-react';

export default function ScoreBar({ score, streak, level, totalAttempted, totalCorrect }) {
  const accuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 100;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-md border-2 border-indigo-200 rounded-2xl p-3 shadow-md mb-4 flex flex-wrap items-center justify-around gap-2 text-sm font-black">
      
      {/* Score */}
      <div className="flex items-center gap-1.5 text-amber-900 bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-300">
        <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
        <span>⭐ {score} Points</span>
      </div>

      {/* Streak */}
      <div className="flex items-center gap-1.5 text-rose-900 bg-rose-100 px-3 py-1.5 rounded-xl border border-rose-300">
        <Flame className="w-4 h-4 fill-rose-500 text-rose-600" />
        <span>🔥 {streak} Streak</span>
      </div>

      {/* Level */}
      <div className="flex items-center gap-1.5 text-purple-900 bg-purple-100 px-3 py-1.5 rounded-xl border border-purple-300">
        <Trophy className="w-4 h-4 text-purple-600" />
        <span>🏆 Level {level}</span>
      </div>

      {/* Accuracy */}
      <div className="flex items-center gap-1.5 text-emerald-900 bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-300">
        <Target className="w-4 h-4 text-emerald-600" />
        <span>🎯 {accuracy}% Accuracy</span>
      </div>
    </div>
  );
}
