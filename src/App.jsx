import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Learn from './pages/Learn';
import BalanceGame from './pages/BalanceGame';
import Practice from './pages/Practice';
import Challenge from './pages/Challenge';
import Progress from './pages/Progress';
import { loadProgress, saveProgress, resetProgress } from './utils/storage';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [progress, setProgress] = useState(loadProgress);

  const handleUpdateProgress = ({
    scoreAdd = 0,
    levelCompleted = null,
    streakAdd = 0,
    attemptedAdd = 0,
    correctAdd = 0,
  }) => {
    setProgress((prev) => {
      const newScore = Math.max(0, prev.score + scoreAdd);
      
      let newStreak = prev.streak;
      if (streakAdd > 0) newStreak += streakAdd;
      else if (streakAdd < 0) newStreak = 0;

      const newBestStreak = Math.max(prev.bestStreak, newStreak);

      const completedLevels = [...prev.completedLevels];
      if (levelCompleted && !completedLevels.includes(levelCompleted)) {
        completedLevels.push(levelCompleted);
      }

      const nextProg = {
        ...prev,
        score: newScore,
        streak: newStreak,
        bestStreak: newBestStreak,
        completedLevels,
        totalQuestionsAttempted: prev.totalQuestionsAttempted + attemptedAdd,
        totalQuestionsCorrect: prev.totalQuestionsCorrect + correctAdd,
      };

      saveProgress(nextProg);
      return nextProg;
    });
  };

  const handleResetProgress = () => {
    const defaultData = resetProgress();
    setProgress(defaultData);
  };

  return (
    <div className="min-h-screen flex flex-col font-['Fredoka',sans-serif] text-slate-800 bg-indigo-950 select-none">
      {/* Top Header Navigation */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        score={progress.score}
        streak={progress.streak}
        progress={progress}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <Home onNavigate={(tab) => setCurrentTab(tab)} />
        )}

        {currentTab === 'learn' && (
          <Learn onStartGame={() => setCurrentTab('balance')} />
        )}

        {currentTab === 'balance' && (
          <BalanceGame
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
            onNavigate={(tab) => setCurrentTab(tab)}
          />
        )}

        {currentTab === 'practice' && (
          <Practice
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
          />
        )}

        {currentTab === 'challenge' && (
          <Challenge
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
            onNavigate={(tab) => setCurrentTab(tab)}
          />
        )}

        {currentTab === 'progress' && (
          <Progress
            progress={progress}
            onReset={handleResetProgress}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-purple-950 border-t border-purple-800 text-purple-200 py-6 px-4 text-center text-xs font-extrabold space-y-2">
        <div className="flex justify-center items-center gap-2 text-sm text-yellow-400">
          <span>⚖️</span>
          <span>GramQuest — Learn 1 kg = 1000 g By Playing!</span>
        </div>
        <p className="text-purple-300 font-medium">
          Interactive educational balance scale game for children aged 6–12.
        </p>
      </footer>
    </div>
  );
}
