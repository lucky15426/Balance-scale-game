import React, { useState } from 'react';
import QuestionCard from '../components/QuestionCard';
import ScoreBar from '../components/ScoreBar';
import { generateQuestion } from '../utils/gameLogic';
import { HelpCircle, RefreshCw } from 'lucide-react';
import { playSound } from '../utils/audio';

export default function Practice({ progress, onUpdateProgress }) {
  const [currentQuestion, setCurrentQuestion] = useState(() => generateQuestion('medium'));

  const handleAnswer = (isCorrect, usedHint) => {
    const pointsEarned = isCorrect ? (usedHint ? 10 : 25) : 0;
    onUpdateProgress({
      scoreAdd: pointsEarned,
      streakAdd: isCorrect ? 1 : -progress.streak,
      attemptedAdd: 1,
      correctAdd: isCorrect ? 1 : 0,
    });
  };

  const handleNextQuestion = () => {
    playSound('click');
    setCurrentQuestion(generateQuestion('medium'));
  };

  return (
    <div className="min-h-screen game-bg-gradient py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-900 border-2 border-indigo-300 font-extrabold px-4 py-1.5 rounded-full text-sm">
            <HelpCircle className="w-4 h-4 text-indigo-600" />
            <span>Unlimited Practice Mode</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-purple-950">
            Gram & Kilogram Quiz
          </h1>
          <p className="text-sm sm:text-base font-bold text-indigo-900">
            Practice converting weights, missing values, and comparison puzzles at your own pace!
          </p>
        </div>

        {/* Stats strip */}
        <ScoreBar
          score={progress.score}
          streak={progress.streak}
          level={progress.currentLevel}
          totalAttempted={progress.totalQuestionsAttempted}
          totalCorrect={progress.totalQuestionsCorrect}
        />

        {/* Active Question */}
        <QuestionCard
          questionObj={currentQuestion}
          onAnswer={handleAnswer}
          showNextBtn={true}
          onNextQuestion={handleNextQuestion}
        />

      </div>
    </div>
  );
}
