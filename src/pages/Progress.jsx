import React from 'react';
import ProgressBar from '../components/ProgressBar';
import BadgeCard from '../components/BadgeCard';
import { BADGES } from '../utils/gameLogic';
import { GAME_LEVELS } from '../data/levels';
import { Award, Trophy, Flame, Target, Star, RotateCcw, Sparkles } from 'lucide-react';
import { playSound } from '../utils/audio';

export default function Progress({ progress, onReset }) {
  const completedCount = progress.completedLevels.length;
  const totalLevels = GAME_LEVELS.length;
  const levelProgressPct = Math.round((completedCount / totalLevels) * 100);

  const accuracy =
    progress.totalQuestionsAttempted > 0
      ? Math.round((progress.totalQuestionsCorrect / progress.totalQuestionsAttempted) * 100)
      : 100;

  const isBadgeUnlocked = (badge) => {
    if (badge.reqType === 'level' && completedCount >= badge.reqVal) return true;
    if (badge.reqType === 'score' && progress.score >= badge.reqVal) return true;
    if (badge.reqType === 'streak' && progress.bestStreak >= badge.reqVal) return true;
    if (badge.reqType === 'challenge' && progress.score >= badge.reqVal) return true;
    return false;
  };

  return (
    <div className="min-h-screen game-bg-gradient py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 border-2 border-amber-300 font-extrabold px-4 py-1.5 rounded-full text-sm">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Learning Dashboard</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-purple-950">
            Your Learning Journey 🏆
          </h1>
          <p className="text-base font-bold text-indigo-900">
            Track your gram & kilogram mastery, stars, levels, and unlocked achievement badges!
          </p>
        </div>

        {/* OVERALL PROGRESS CARD */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border-4 border-indigo-200 p-6 sm:p-8 shadow-xl space-y-4">
          <div className="flex items-center justify-between font-black text-purple-950">
            <div className="flex items-center gap-2 text-xl">
              <Sparkles className="w-6 h-6 text-amber-500 fill-amber-400" />
              <span>Overall GramQuest Mastery</span>
            </div>
            <span className="text-2xl text-purple-700">{levelProgressPct}%</span>
          </div>

          <ProgressBar value={completedCount} max={totalLevels} label="Levels Completed" color="from-amber-400 via-yellow-400 to-amber-500" />
        </div>

        {/* 4 STATS CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white/90 rounded-3xl border-3 border-amber-300 p-5 shadow-lg text-center">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl mb-2">
              ⭐
            </div>
            <div className="text-xs font-bold text-amber-700 uppercase">Total Score</div>
            <div className="text-2xl sm:text-3xl font-black text-amber-950">{progress.score} pts</div>
          </div>

          <div className="bg-white/90 rounded-3xl border-3 border-purple-300 p-5 shadow-lg text-center">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl mb-2">
              🏆
            </div>
            <div className="text-xs font-bold text-purple-700 uppercase">Levels Cleared</div>
            <div className="text-2xl sm:text-3xl font-black text-purple-950">{completedCount} / {totalLevels}</div>
          </div>

          <div className="bg-white/90 rounded-3xl border-3 border-rose-300 p-5 shadow-lg text-center">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-2xl mb-2">
              🔥
            </div>
            <div className="text-xs font-bold text-rose-700 uppercase">Best Streak</div>
            <div className="text-2xl sm:text-3xl font-black text-rose-950">{progress.bestStreak}</div>
          </div>

          <div className="bg-white/90 rounded-3xl border-3 border-emerald-300 p-5 shadow-lg text-center">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl mb-2">
              🎯
            </div>
            <div className="text-xs font-bold text-emerald-700 uppercase">Accuracy</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-950">{accuracy}%</div>
          </div>
        </div>

        {/* UNLOCKED BADGES GRID */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl border-4 border-indigo-200 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-2">
            <Award className="w-7 h-7 text-amber-500" />
            <h3 className="text-2xl font-black text-purple-950">
              Achievement Badges
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {BADGES.map((badge) => (
              <BadgeCard
                key={badge.id}
                badge={badge}
                isUnlocked={isBadgeUnlocked(badge)}
              />
            ))}
          </div>
        </div>

        {/* RESET PROGRESS OPTION */}
        <div className="text-center pt-4">
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to reset your points and progress?')) {
                playSound('click');
                onReset();
              }
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-rose-100 hover:bg-rose-200 text-rose-800 border-2 border-rose-300 font-extrabold text-xs transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Progress & Scores</span>
          </button>
        </div>

      </div>
    </div>
  );
}
