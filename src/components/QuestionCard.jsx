import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Lightbulb, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { playSound } from '../utils/audio';

export default function QuestionCard({ questionObj, onAnswer, showNextBtn, onNextQuestion }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSelectOption = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    const correct = option === questionObj.correctAnswer;
    setIsAnswered(true);
    setIsCorrect(correct);

    if (correct) playSound('correct');
    else playSound('wrong');

    onAnswer(correct, showHint);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setShowHint(false);
    onNextQuestion();
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/95 backdrop-blur-lg border-4 border-indigo-200 rounded-3xl p-6 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 bg-indigo-100 text-indigo-900 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-indigo-600" />
          <span>Practice Question</span>
        </div>

        <button
          onClick={() => {
            playSound('click');
            setShowHint(!showHint);
          }}
          className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 px-3 py-1 rounded-full border border-amber-300 transition-colors"
        >
          <Lightbulb className="w-4 h-4 fill-amber-400 text-amber-600" />
          <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
        </button>
      </div>

      {/* Question Prompt */}
      <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 text-center leading-snug">
        {questionObj.question}
      </h2>

      {/* Hint Alert */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 p-3 bg-amber-50 border-2 border-amber-300 rounded-2xl text-amber-900 text-xs sm:text-sm font-bold flex items-start gap-2"
          >
            <span className="text-lg">💡</span>
            <div>{questionObj.hint}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Multiple Choice Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {questionObj.options.map((option, idx) => {
          let btnStyle = 'bg-purple-50 text-purple-950 border-purple-200 hover:bg-purple-100 hover:border-purple-400';

          if (isAnswered) {
            if (option === questionObj.correctAnswer) {
              btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-lg scale-105';
            } else if (option === selectedOption) {
              btnStyle = 'bg-rose-500 text-white border-rose-600 opacity-90';
            } else {
              btnStyle = 'bg-slate-100 text-slate-400 border-slate-200 opacity-50';
            }
          }

          return (
            <motion.button
              key={idx}
              whileHover={!isAnswered ? { scale: 1.03 } : {}}
              whileTap={!isAnswered ? { scale: 0.97 } : {}}
              disabled={isAnswered}
              onClick={() => handleSelectOption(option)}
              className={`p-4 rounded-2xl border-3 text-base sm:text-lg font-black transition-all flex items-center justify-between shadow-sm ${btnStyle}`}
            >
              <span>{option}</span>
              {isAnswered && option === questionObj.correctAnswer && (
                <CheckCircle className="w-6 h-6 text-yellow-300" />
              )}
              {isAnswered && option === selectedOption && option !== questionObj.correctAnswer && (
                <XCircle className="w-6 h-6 text-white" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Answer Explanation & Next Button */}
      {isAnswered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-2xl border-2 flex flex-col sm:flex-row items-center justify-between gap-3 ${
            isCorrect
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-rose-50 border-rose-300 text-rose-950'
          }`}
        >
          <div className="text-sm font-bold text-center sm:text-left">
            <div className="font-extrabold text-base">
              {isCorrect ? '🎉 Great Job! Correct Answer!' : '💡 Keep Trying!'}
            </div>
            <p>{questionObj.explanation}</p>
          </div>

          <button
            onClick={handleNext}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-base shadow-xl hover:from-purple-700 hover:to-indigo-700 flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <span>Next Question</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </div>
  );
}
