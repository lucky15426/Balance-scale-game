import React, { useState, useEffect } from 'react';
import BalanceScale from '../components/BalanceScale';
import WeightBasket from '../components/WeightBasket';
import FeedbackModal from '../components/FeedbackModal';
import { triggerConfetti } from '../components/ConfettiEffect';
import { GAME_LEVELS } from '../data/levels';
import { calculateTotalWeight, compareWeights, formatWeight } from '../utils/conversion';
import { playSound } from '../utils/audio';
import { ChevronLeft, ChevronRight, Star, Sparkles } from 'lucide-react';

export default function BalanceGame({ progress, onUpdateProgress, onNavigate }) {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const currentLevel = GAME_LEVELS[currentLevelIndex];

  const [leftPanItems, setLeftPanItems] = useState([]);
  const [rightPanItems, setRightPanItems] = useState([]);
  const [selectedWeight, setSelectedWeight] = useState(null);

  const [showHintModal, setShowHintModal] = useState(false);
  const [isLevelCleared, setIsLevelCleared] = useState(false);
  const [usedHint, setUsedHint] = useState(false);

  // Initialize level presets
  useEffect(() => {
    resetLevel();
  }, [currentLevelIndex]);

  const resetLevel = () => {
    if (!currentLevel) return;
    setLeftPanItems(currentLevel.leftPresetOverride || currentLevel.leftPreset || []);
    setRightPanItems(currentLevel.rightPreset || []);
    setSelectedWeight(null);
    setIsLevelCleared(false);
    setUsedHint(false);
    setShowHintModal(false);
  };

  const leftTotal = calculateTotalWeight(leftPanItems);
  const rightTotal = calculateTotalWeight(rightPanItems);
  const comparison = compareWeights(leftTotal, rightTotal);

  // Check level completion requirement whenever scale totals update
  useEffect(() => {
    if (isLevelCleared) return;
    if (leftTotal === 0 && rightTotal === 0) return;

    let cleared = false;

    if (currentLevel.targetGrams) {
      if (currentLevel.targetPan === 'right' && rightTotal === currentLevel.targetGrams) {
        if (leftTotal === 0 || comparison.isBalanced) {
          cleared = true;
        }
      } else if (currentLevel.targetPan === 'left' && leftTotal === currentLevel.targetGrams) {
        if (rightTotal === 0 || comparison.isBalanced) {
          cleared = true;
        }
      } else if (comparison.isBalanced && leftTotal === currentLevel.targetGrams) {
        cleared = true;
      }
    } else if (comparison.isBalanced) {
      cleared = true;
    }

    if (cleared) {
      setIsLevelCleared(true);
      playSound('fanfare');
      triggerConfetti();

      const basePoints = 100;
      const hintBonus = usedHint ? 10 : 25;
      const awardedPoints = basePoints + hintBonus;

      onUpdateProgress({
        scoreAdd: awardedPoints,
        levelCompleted: currentLevel.id,
        streakAdd: 1,
      });
    }
  }, [leftTotal, rightTotal, comparison.isBalanced]);

  const handleDropOnPan = (weightId, panSide) => {
    const newItem = {
      instanceId: `${panSide}-${Date.now()}-${Math.random()}`,
      weightId,
    };
    if (panSide === 'left') {
      setLeftPanItems((prev) => [...prev, newItem]);
    } else {
      setRightPanItems((prev) => [...prev, newItem]);
    }
  };

  const handleRemoveItem = (instanceId, panSide) => {
    playSound('drop');
    if (panSide === 'left') {
      setLeftPanItems((prev) => prev.filter((item) => item.instanceId !== instanceId));
    } else {
      setRightPanItems((prev) => prev.filter((item) => item.instanceId !== instanceId));
    }
  };

  const handleClearPan = (panSide) => {
    playSound('click');
    if (panSide === 'left') setLeftPanItems([]);
    if (panSide === 'right') setRightPanItems([]);
  };

  const handleResetAll = () => {
    resetLevel();
  };

  const handleTapPlaceItem = (panSide) => {
    if (!selectedWeight) return;
    playSound('drop');
    handleDropOnPan(selectedWeight.id, panSide);
  };

  const handleNextLevel = () => {
    if (currentLevelIndex < GAME_LEVELS.length - 1) {
      setCurrentLevelIndex((prev) => prev + 1);
    } else {
      onNavigate('progress');
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] game-bg-gradient py-3 px-3 sm:px-6 flex flex-col justify-between">
      <div className="max-w-4xl mx-auto w-full space-y-2">
        
        {/* Compact, clean Kid-Friendly Level Header */}
        <div className="flex items-center justify-between bg-white/90 backdrop-blur-md border border-purple-200/80 rounded-2xl px-4 py-2 shadow-sm">
          {/* Level Switcher */}
          <div className="flex items-center gap-1.5">
            <button
              disabled={currentLevelIndex === 0}
              onClick={() => setCurrentLevelIndex((prev) => Math.max(0, prev - 1))}
              className="p-1 rounded-lg bg-purple-100 hover:bg-purple-200 disabled:opacity-30 text-purple-900 transition-colors"
              title="Previous Level"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs sm:text-sm font-black text-purple-950 px-1">
              Level {currentLevelIndex + 1}/{GAME_LEVELS.length}
            </span>
            <button
              disabled={currentLevelIndex === GAME_LEVELS.length - 1}
              onClick={() => setCurrentLevelIndex((prev) => Math.min(GAME_LEVELS.length - 1, prev + 1))}
              className="p-1 rounded-lg bg-purple-100 hover:bg-purple-200 disabled:opacity-30 text-purple-900 transition-colors"
              title="Next Level"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Simple Goal Question */}
          <div className="text-center px-2">
            <span className="text-sm sm:text-base font-extrabold text-purple-900">
              {currentLevel.instruction}
            </span>
          </div>

          {/* Score Counter */}
          <div className="flex items-center gap-1 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-full text-xs font-black text-amber-900">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>{progress.score}</span>
          </div>
        </div>

        {/* Hint Tooltip */}
        {showHintModal && (
          <div className="bg-amber-50 border border-amber-300 rounded-2xl px-4 py-2 text-xs sm:text-sm font-bold text-amber-950 flex items-center justify-between shadow-sm animate-fadeIn">
            <span>💡 <strong>Hint:</strong> {currentLevel.hint}</span>
            <button
              onClick={() => setShowHintModal(false)}
              className="text-amber-800 hover:text-amber-950 font-bold ml-2 text-xs"
            >
              ✕
            </button>
          </div>
        )}

        {/* HERO BALANCE SCALE */}
        <BalanceScale
          leftPanItems={leftPanItems}
          rightPanItems={rightPanItems}
          leftTotal={leftTotal}
          rightTotal={rightTotal}
          comparison={comparison}
          onRemoveItem={handleRemoveItem}
          onClearPan={handleClearPan}
          onDropOnPan={handleDropOnPan}
          selectedWeightForTap={selectedWeight}
          onTapPlaceItem={handleTapPlaceItem}
        />

        {/* BOTTOM WEIGHT BASKET */}
        <WeightBasket
          availableIds={currentLevel.availableWeightIds}
          selectedWeight={selectedWeight}
          onSelectWeight={(w) => setSelectedWeight(selectedWeight?.id === w.id ? null : w)}
          onResetAllPans={handleResetAll}
          onToggleHint={() => {
            setUsedHint(true);
            setShowHintModal(!showHintModal);
          }}
          showHintBtn={true}
          onTapPlace={handleTapPlaceItem}
        />

      </div>

      {/* FEEDBACK POPUP */}
      <FeedbackModal
        isOpen={isLevelCleared}
        title={`${currentLevel.title} Done! 🎉`}
        explanation={currentLevel.explanation}
        pointsEarned={usedHint ? 110 : 125}
        onNextLevel={handleNextLevel}
        onRestartLevel={resetLevel}
        nextLevelText={currentLevelIndex < GAME_LEVELS.length - 1 ? 'Next Level →' : 'See Progress 🏆'}
      />
    </div>
  );
}
