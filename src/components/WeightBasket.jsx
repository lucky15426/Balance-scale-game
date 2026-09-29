import React from 'react';
import DraggableWeight from './DraggableWeight';
import { WEIGHT_ITEMS } from '../data/weights';
import { RotateCcw, Lightbulb } from 'lucide-react';
import { playSound } from '../utils/audio';

export default function WeightBasket({
  availableIds,
  selectedWeight,
  onSelectWeight,
  onResetAllPans,
  onToggleHint,
  showHintBtn = true,
  onTapPlace,
}) {
  const availableWeights = availableIds
    ? WEIGHT_ITEMS.filter((w) => availableIds.includes(w.id))
    : WEIGHT_ITEMS;

  return (
    <div className="w-full max-w-3xl mx-auto bg-white/90 backdrop-blur-md border-2 border-purple-100 rounded-3xl p-3 sm:p-4 shadow-xl">
      {/* Top mini toolbar */}
      <div className="flex items-center justify-between mb-1 px-2">
        <span className="text-xs font-bold text-slate-500">
          Fruit Weights:
        </span>

        <div className="flex items-center gap-1.5">
          {showHintBtn && (
            <button
              onClick={() => {
                playSound('click');
                onToggleHint();
              }}
              className="flex items-center gap-1 px-3 py-1 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-extrabold text-xs transition-transform active:scale-95 shadow-sm"
              title="Show Hint"
            >
              <Lightbulb className="w-3.5 h-3.5 fill-amber-400 text-amber-600" />
              <span>Hint</span>
            </button>
          )}

          <button
            onClick={() => {
              playSound('click');
              onResetAllPans();
            }}
            className="flex items-center gap-1 px-3 py-1 rounded-xl bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-700 font-extrabold text-xs transition-transform active:scale-95 shadow-sm"
            title="Reset Scale"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Row of clean draggable fruit weights */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto py-2 px-1">
        {availableWeights.map((weight) => (
          <DraggableWeight
            key={weight.id}
            weight={weight}
            isSelected={selectedWeight?.id === weight.id}
            onSelect={onSelectWeight}
          />
        ))}
      </div>

      {/* Mobile/Touch Quick Add Pill */}
      {selectedWeight && (
        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between gap-2 text-xs font-bold text-slate-700">
          <span>Tap to add <strong>{selectedWeight.name} ({selectedWeight.label})</strong>:</span>
          <div className="flex gap-2">
            <button
              onClick={() => onTapPlace('left')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-xl font-bold shadow text-xs"
            >
              Add Left
            </button>
            <button
              onClick={() => onTapPlace('right')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-xl font-bold shadow text-xs"
            >
              Add Right
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
