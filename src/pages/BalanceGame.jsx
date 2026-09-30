import React, { useState, useEffect } from 'react';
import BalanceScale from '../components/BalanceScale';
import WeightBasket from '../components/WeightBasket';
import FeedbackModal from '../components/FeedbackModal';
import { triggerConfetti } from '../components/ConfettiEffect';
import { GAME_LEVELS } from '../data/levels';
import { calculateTotalWeight, compareWeights } from '../utils/conversion';
import { playSound } from '../utils/audio';
import { ChevronLeft, ChevronRight, Star, RotateCcw } from 'lucide-react';

export default function BalanceGame({ progress, onUpdateProgress, onNavigate }) {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const currentLevel = GAME_LEVELS[currentLevelIndex];

  const [leftPanItems, setLeftPanItems] = useState([]);
  const [rightPanItems, setRightPanItems] = useState([]);
  const [selectedWeight, setSelectedWeight] = useState(null);

  const [showHintModal, setShowHintModal] = useState(false);
  const [isLevelCleared, setIsLevelCleared] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
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
    setShowFeedbackModal(false);
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
      playSound('success');
      triggerConfetti();

      const basePoints = 100;
      const hintBonus = usedHint ? 10 : 25;
      const awardedPoints = basePoints + hintBonus;

      onUpdateProgress({
        scoreAdd: awardedPoints,
        levelCompleted: currentLevel.id,
        streakAdd: 1,
      });

      // DELAY feedback modal by 3.2 seconds so player can watch the scale swing
      // and settle straight ("proper seedha hote hue"), and view the "Balanced! Congratulations!" UI indicator!
      const timer = setTimeout(() => {
        playSound('fanfare');
        setShowFeedbackModal(true);
      }, 3200);

      return () => clearTimeout(timer);
    }
  }, [leftTotal, rightTotal, comparison.isBalanced, isLevelCleared, currentLevel]);

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
    // If user removes item after clearance, allow readjustment
    setIsLevelCleared(false);
    setShowFeedbackModal(false);
  };

  const handleClearPan = (panSide) => {
    playSound('click');
    if (panSide === 'left') setLeftPanItems([]);
    if (panSide === 'right') setRightPanItems([]);
    setIsLevelCleared(false);
    setShowFeedbackModal(false);
  };

  const handleResetAll = () => {
    playSound('click');
    resetLevel();
  };

  const handleTapPlaceItem = (panSide) => {
    if (!selectedWeight) return;
    playSound('drop');
    handleDropOnPan(selectedWeight.id, panSide);
  };

  const handleNextLevel = () => {
    setShowFeedbackModal(false);
    setIsLevelCleared(false);
    if (currentLevelIndex < GAME_LEVELS.length - 1) {
      setCurrentLevelIndex((prev) => prev + 1);
    } else {
      onNavigate('progress');
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-3 px-3 sm:px-6 flex flex-col justify-between overflow-hidden">
      
      {/* SCENIC COUNTRYSIDE MEADOW BACKGROUND (Matching reference photo with rolling hills & trees) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft Sky Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#bde4f9] via-[#d6effd] to-[#e8f7d9]" />

        {/* Distant soft hill */}
        <svg className="absolute bottom-0 w-full h-[320px] text-[#b3dfaa]/50" preserveAspectRatio="none" viewBox="0 0 1440 320">
          <path fill="currentColor" d="M0,140 C320,80 440,200 760,130 C1060,60 1220,170 1440,120 L1440,320 L0,320 Z" />
        </svg>

        {/* Midground rolling green hill */}
        <svg className="absolute bottom-0 w-full h-[240px] text-[#93cc80]/55" preserveAspectRatio="none" viewBox="0 0 1440 320">
          <path fill="currentColor" d="M0,180 C360,110 520,220 860,150 C1140,90 1300,180 1440,160 L1440,320 L0,320 Z" />
        </svg>

        {/* Foreground vibrant meadow hill */}
        <svg className="absolute bottom-0 w-full h-[160px] text-[#78bb62]/45" preserveAspectRatio="none" viewBox="0 0 1440 320">
          <path fill="currentColor" d="M0,210 C420,160 680,240 1020,180 C1220,140 1360,200 1440,190 L1440,320 L0,320 Z" />
        </svg>

        {/* Stylized trees on the hillsides like in the reference photo */}
        <div className="absolute bottom-24 left-4 sm:left-12 text-3xl opacity-50 select-none">🌳</div>
        <div className="absolute bottom-32 left-14 sm:left-28 text-2xl opacity-40 select-none">🌲</div>
        <div className="absolute bottom-28 right-6 sm:right-16 text-3xl opacity-50 select-none">🌳</div>
        <div className="absolute bottom-36 right-16 sm:right-32 text-2xl opacity-40 select-none">🌲</div>
      </div>

      <div className="max-w-4xl mx-auto w-full space-y-2 relative z-10">
        
        {/* Compact, clean Kid-Friendly Level Header */}
        <div className="flex items-center justify-between bg-white/85 backdrop-blur-md border border-emerald-200/80 rounded-2xl px-4 py-2 shadow-sm">
          {/* Level Switcher */}
          <div className="flex items-center gap-1.5">
            <button
              disabled={currentLevelIndex === 0}
              onClick={() => setCurrentLevelIndex((prev) => Math.max(0, prev - 1))}
              className="p-1 rounded-lg bg-emerald-100/80 hover:bg-emerald-200 disabled:opacity-30 text-emerald-950 transition-colors cursor-pointer"
              title="Previous Level"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs sm:text-sm font-black text-emerald-950 px-1">
              Level {currentLevelIndex + 1}/{GAME_LEVELS.length}
            </span>
            <button
              disabled={currentLevelIndex === GAME_LEVELS.length - 1}
              onClick={() => setCurrentLevelIndex((prev) => Math.min(GAME_LEVELS.length - 1, prev + 1))}
              className="p-1 rounded-lg bg-emerald-100/80 hover:bg-emerald-200 disabled:opacity-30 text-emerald-950 transition-colors cursor-pointer"
              title="Next Level"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Simple Goal Question */}
          <div className="text-center px-2">
            <span className="text-sm sm:text-base font-extrabold text-emerald-950">
              {currentLevel.instruction}
            </span>
          </div>

          {/* Score Counter */}
          <div className="flex items-center gap-1 bg-amber-100/90 border border-amber-300 px-2.5 py-1 rounded-full text-xs font-black text-amber-900">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>{progress.score}</span>
          </div>
        </div>

        {/* Top Centered Reset Button (Matching reference photo pill button) */}
        <div className="flex justify-center -my-0.5">
          <button
            onClick={handleResetAll}
            className="flex items-center gap-1.5 px-4 py-1 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-emerald-700 font-bold text-xs sm:text-sm border border-slate-200 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-sm"
            title="Reset Scale"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        {/* Hint Tooltip */}
        {showHintModal && (
          <div className="bg-amber-50/95 border border-amber-300 rounded-2xl px-4 py-2 text-xs sm:text-sm font-bold text-amber-950 flex items-center justify-between shadow-sm animate-fadeIn backdrop-blur-sm">
            <span>💡 <strong>Hint:</strong> {currentLevel.hint}</span>
            <button
              onClick={() => setShowHintModal(false)}
              className="text-amber-800 hover:text-amber-950 font-bold ml-2 text-xs cursor-pointer"
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
          onNextLevel={handleNextLevel}
          isLevelCleared={isLevelCleared}
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

      {/* FEEDBACK POPUP (Delays smoothly so the user sees the scale settle and balanced UI first) */}
      <FeedbackModal
        isOpen={showFeedbackModal}
        title={`${currentLevel.title} Done! 🎉`}
        explanation={currentLevel.explanation}
        pointsEarned={usedHint ? 110 : 125}
        onNextLevel={handleNextLevel}
        onRestartLevel={resetLevel}
        onClose={() => setShowFeedbackModal(false)}
        nextLevelText={currentLevelIndex < GAME_LEVELS.length - 1 ? 'Next Level →' : 'See Progress 🏆'}
      />
    </div>
  );
}
