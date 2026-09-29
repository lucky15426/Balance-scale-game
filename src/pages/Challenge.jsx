import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import QuestionCard from '../components/QuestionCard';
import { generateQuestion } from '../utils/gameLogic';
import { triggerBigCelebration } from '../components/ConfettiEffect';
import { Flame, Clock, Play, RotateCcw, Trophy, Award, ArrowRight } from 'lucide-react';
import { playSound } from '../utils/audio';

export default function Challenge({ progress, onUpdateProgress, onNavigate }) {
  const [gameState, setGameState] = useState('idle'); // 'idle', 'playing', 'finished'
  const [timeLeft, setTimeLeft] = useState(30);
  const [scoreEarned, setScoreEarned] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const [currentQuestion, setCurrentQuestion] = useState(null);

  // Timer tick
  useEffect(() => {
    let timer = null;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (gameState === 'playing' && timeLeft === 0) {
      setGameState('finished');
      playSound('fanfare');
      triggerBigCelebration();

      onUpdateProgress({
        scoreAdd: scoreEarned,
        attemptedAdd: questionsAnswered,
        correctAdd: correctCount,
      });
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const handleStartChallenge = () => {
    playSound('click');
    setTimeLeft(30);
    setScoreEarned(0);
    setQuestionsAnswered(0);
    setCorrectCount(0);
    setCurrentQuestion(generateQuestion('hard'));
    setGameState('playing');
  };

  const handleAnswer = (isCorrect, usedHint) => {
    setQuestionsAnswered((prev) => prev + 1);
    if (isCorrect) {
      const pts = usedHint ? 50 : 100;
      setScoreEarned((prev) => prev + pts);
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (timeLeft > 0) {
      setCurrentQuestion(generateQuestion('hard'));
    }
  };

  const accuracy = questionsAnswered > 0 ? Math.round((correctCount / questionsAnswered) * 100) : 0;

  return (
    <div className="min-h-screen game-bg-gradient py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-900 border-2 border-rose-300 font-extrabold px-4 py-1.5 rounded-full text-sm">
            <Flame className="w-4 h-4 text-rose-600 fill-rose-400" />
            <span>Timed Speed Challenge</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-purple-950">
            30-Second Gram Dash! ⏱️
          </h1>
          <p className="text-base font-bold text-indigo-900 max-w-xl mx-auto">
            Answer as many conversion questions as you can before the clock runs out!
          </p>
        </div>

        {/* IDLE STATE */}
        {gameState === 'idle' && (
          <div className="bg-white/95 backdrop-blur-md rounded-3xl border-4 border-yellow-400 p-8 shadow-2xl text-center max-w-lg mx-auto space-y-6">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 flex items-center justify-center text-5xl shadow-xl animate-bounce">
              ⏱️
            </div>

            <div>
              <h2 className="text-2xl font-black text-purple-950 mb-2">
                Ready for the Challenge?
              </h2>
              <p className="text-sm font-bold text-slate-600 leading-relaxed">
                You will get 30 seconds to answer rapidly. Earn 100 points for every correct answer!
              </p>
            </div>

            <button
              onClick={handleStartChallenge}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-amber-500 to-yellow-400 hover:from-rose-600 hover:to-yellow-500 text-purple-950 font-black text-xl shadow-xl hover:shadow-rose-400/50 flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Play className="w-6 h-6 fill-purple-950" />
              <span>Start 30s Challenge</span>
            </button>
          </div>
        )}

        {/* PLAYING STATE */}
        {gameState === 'playing' && (
          <div className="space-y-4">
            {/* Timer & Score Strip */}
            <div className="bg-white/90 backdrop-blur-md border-3 border-rose-300 rounded-2xl p-4 shadow-lg flex items-center justify-between font-black text-lg">
              <div className="flex items-center gap-2 text-rose-900 bg-rose-100 px-4 py-1.5 rounded-full border border-rose-300 animate-pulse">
                <Clock className="w-5 h-5 text-rose-600" />
                <span>⏱️ {timeLeft}s remaining</span>
              </div>

              <div className="flex items-center gap-2 text-amber-900 bg-amber-100 px-4 py-1.5 rounded-full border border-amber-300">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span>⭐ {scoreEarned} pts</span>
              </div>
            </div>

            {currentQuestion && (
              <QuestionCard
                questionObj={currentQuestion}
                onAnswer={handleAnswer}
                showNextBtn={true}
                onNextQuestion={handleNextQuestion}
              />
            )}
          </div>
        )}

        {/* FINISHED STATE SUMMARY */}
        {gameState === 'finished' && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/95 backdrop-blur-md rounded-3xl border-4 border-yellow-400 p-8 shadow-2xl text-center max-w-xl mx-auto space-y-6"
          >
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-orange-400 flex items-center justify-center text-4xl shadow-xl">
              🏆
            </div>

            <div>
              <h2 className="text-3xl font-black text-purple-950 mb-1">
                Challenge Complete! 🎉
              </h2>
              <p className="text-sm font-bold text-slate-600">
                Awesome speed converting! Here is your final summary:
              </p>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-black">
              <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200">
                <div className="text-xs text-purple-600">Attempted</div>
                <div className="text-2xl text-purple-950">{questionsAnswered}</div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                <div className="text-xs text-emerald-600">Correct</div>
                <div className="text-2xl text-emerald-950">{correctCount}</div>
              </div>

              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
                <div className="text-xs text-amber-600">Score Earned</div>
                <div className="text-2xl text-amber-950">+{scoreEarned}</div>
              </div>

              <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-200">
                <div className="text-xs text-indigo-600">Accuracy</div>
                <div className="text-2xl text-indigo-950">{accuracy}%</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleStartChallenge}
                className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-purple-950 font-black text-base shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Play Again</span>
              </button>

              <button
                onClick={() => {
                  playSound('click');
                  onNavigate('balance');
                }}
                className="flex-1 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-base shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <span>Back to Balance Game</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
