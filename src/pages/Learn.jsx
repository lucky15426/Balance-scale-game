import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowUp, RefreshCw, Sparkles, BookOpen, CheckCircle, Calculator } from 'lucide-react';
import { playSound } from '../utils/audio';

export default function Learn({ onStartGame }) {
  const [isTransformed, setIsTransformed] = useState(false);
  const [calcKg, setCalcKg] = useState(2);

  const toggleTransform = () => {
    playSound('click');
    setIsTransformed(!isTransformed);
  };

  return (
    <div className="min-h-screen game-bg-gradient py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-900 border-2 border-purple-300 font-extrabold px-4 py-1.5 rounded-full text-sm">
            <BookOpen className="w-4 h-4 text-purple-600" />
            <span>Interactive Math Lesson</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-purple-950">
            Understanding Grams & Kilograms
          </h1>
          <p className="text-base sm:text-lg font-bold text-indigo-900 max-w-2xl mx-auto">
            Grams measure light things (like a strawberry), and Kilograms measure heavy things (like a watermelon)!
          </p>
        </div>

        {/* GOLDEN RULE HERO CARD */}
        <div className="bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-500 rounded-3xl border-4 border-yellow-200 p-6 sm:p-10 shadow-2xl text-purple-950 text-center relative overflow-hidden">
          <div className="text-xs font-black tracking-widest uppercase bg-purple-950 text-yellow-300 inline-block px-4 py-1 rounded-full mb-4">
            The Golden Formula
          </div>
          
          <div className="text-4xl sm:text-6xl font-black tracking-tight flex items-center justify-center gap-3 my-2">
            <span>1 kg</span>
            <span className="text-amber-700 font-bold">=</span>
            <span>1000 g</span>
          </div>

          <p className="text-lg sm:text-xl font-black text-purple-900 mt-2">
            1 Kilogram contains exactly 1,000 Grams!
          </p>
        </div>

        {/* VISUAL TRANSFORM ANIMATION SECTION */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl border-4 border-indigo-200 p-6 sm:p-8 shadow-xl text-center">
          <h3 className="text-xl sm:text-2xl font-black text-purple-950 mb-2">
            Magic Fruit Transformation! 🍉 ✨ 🍎
          </h3>
          <p className="text-sm font-bold text-slate-600 mb-6">
            Click the button below to see 1 kg turn into 1000 grams!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-4">
            
            {/* 1 kg side */}
            <div className={`p-6 rounded-3xl border-4 transition-all w-64 ${!isTransformed ? 'bg-emerald-100 border-emerald-400 scale-105 shadow-xl' : 'bg-slate-100 border-slate-300 opacity-60'}`}>
              <div className="text-6xl mb-2">🍉</div>
              <div className="text-2xl font-black text-emerald-950">1 Kilogram</div>
              <div className="text-sm font-extrabold text-emerald-700">Heavy Weight (1 kg)</div>
            </div>

            {/* Transform Button */}
            <button
              onClick={toggleTransform}
              className="p-4 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-black shadow-lg hover:scale-110 active:scale-95 transition-all flex items-center gap-2"
            >
              <RefreshCw className={`w-6 h-6 ${isTransformed ? 'rotate-180' : ''} transition-transform duration-500`} />
              <span>Convert!</span>
            </button>

            {/* 1000g side */}
            <div className={`p-6 rounded-3xl border-4 transition-all w-64 ${isTransformed ? 'bg-rose-100 border-rose-400 scale-105 shadow-xl' : 'bg-slate-100 border-slate-300 opacity-60'}`}>
              <div className="flex justify-center gap-1 text-3xl mb-2">
                🍎🍎🍎🍎
              </div>
              <div className="text-2xl font-black text-rose-950">1000 Grams</div>
              <div className="text-sm font-extrabold text-rose-700">4 × 250g Apples!</div>
            </div>

          </div>
        </div>

        {/* CONVERSION FLOW DIAGRAMS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* kg -> g */}
          <div className="bg-white/90 rounded-3xl border-3 border-emerald-200 p-6 shadow-xl flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 font-black text-xl flex items-center justify-center mb-3">
              1
            </div>
            <h4 className="text-xl font-black text-emerald-950 mb-2">Kilograms to Grams</h4>
            <p className="text-sm font-bold text-slate-600 mb-4">
              To convert <strong className="text-emerald-700">Kilograms to Grams</strong>, MULTIPLY by 1000!
            </p>

            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 w-full text-base font-black text-emerald-900 space-y-2">
              <div>1 kg  ↓  × 1000  ↓  1000 g</div>
              <div className="text-xs text-emerald-700">Example: 2 kg × 1000 = 2000 g</div>
            </div>
          </div>

          {/* g -> kg */}
          <div className="bg-white/90 rounded-3xl border-3 border-indigo-200 p-6 shadow-xl flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 font-black text-xl flex items-center justify-center mb-3">
              2
            </div>
            <h4 className="text-xl font-black text-indigo-950 mb-2">Grams to Kilograms</h4>
            <p className="text-sm font-bold text-slate-600 mb-4">
              To convert <strong className="text-indigo-700">Grams to Kilograms</strong>, DIVIDE by 1000!
            </p>

            <div className="bg-indigo-50 border-2 border-indigo-300 rounded-2xl p-4 w-full text-base font-black text-indigo-900 space-y-2">
              <div>1000 g  ↓  ÷ 1000  ↓  1 kg</div>
              <div className="text-xs text-indigo-700">Example: 3000 g ÷ 1000 = 3 kg</div>
            </div>
          </div>

        </div>

        {/* INTERACTIVE CONVERSION SLIDER CALCULATOR */}
        <div className="bg-white/95 rounded-3xl border-4 border-amber-300 p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center gap-2 mb-4 text-purple-950 font-black text-xl">
            <Calculator className="w-6 h-6 text-amber-500" />
            <span>Interactive Conversion Slider</span>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between font-black text-base text-slate-800 mb-2">
                <span>Select Kilograms: <strong>{calcKg} kg</strong></span>
                <span>Calculated Grams: <strong>{calcKg * 1000} g</strong></span>
              </div>
              <input
                type="range"
                min="0.25"
                max="10"
                step="0.25"
                value={calcKg}
                onChange={(e) => setCalcKg(parseFloat(e.target.value))}
                className="w-full h-4 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>

            {/* Live conversion breakdown card */}
            <div className="bg-gradient-to-r from-purple-100 via-indigo-100 to-amber-100 border-2 border-purple-200 p-4 rounded-2xl flex flex-wrap items-center justify-around gap-4 text-center font-black">
              <div>
                <div className="text-xs text-purple-600 uppercase">Kilograms</div>
                <div className="text-2xl text-purple-950">{calcKg} kg</div>
              </div>
              <div className="text-2xl text-amber-600">➔</div>
              <div>
                <div className="text-xs text-indigo-600 uppercase">Formula</div>
                <div className="text-base text-indigo-950">{calcKg} × 1000</div>
              </div>
              <div className="text-2xl text-amber-600">➔</div>
              <div>
                <div className="text-xs text-emerald-600 uppercase">Total Grams</div>
                <div className="text-2xl text-emerald-950">{calcKg * 1000} g</div>
              </div>
            </div>
          </div>
        </div>

        {/* QUICK REFERENCE CHEAT TABLE */}
        <div className="bg-white/90 rounded-3xl border-3 border-indigo-200 p-6 shadow-xl">
          <h3 className="text-xl font-black text-purple-950 mb-4 text-center">
            Fruit Weight Reference Guide
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-black text-sm">
            <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200">
              <div className="text-2xl mb-1">🍇</div>
              <div className="text-purple-600 text-xs">Grapes</div>
              <div className="text-base text-purple-950">50 g</div>
            </div>

            <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200">
              <div className="text-2xl mb-1">🍓</div>
              <div className="text-rose-600 text-xs">Strawberry</div>
              <div className="text-base text-rose-950">100 g</div>
            </div>

            <div className="p-3 bg-red-50 rounded-2xl border border-red-200">
              <div className="text-2xl mb-1">🍎</div>
              <div className="text-red-600 text-xs">Apple</div>
              <div className="text-base text-red-950">250 g</div>
            </div>

            <div className="p-3 bg-orange-50 rounded-2xl border border-orange-200">
              <div className="text-2xl mb-1">🍊</div>
              <div className="text-orange-600 text-xs">Orange</div>
              <div className="text-base text-orange-950">500 g</div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
              <div className="text-2xl mb-1">🍉</div>
              <div className="text-emerald-600 text-xs">Watermelon</div>
              <div className="text-base text-emerald-950">1 kg (1000g)</div>
            </div>

            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
              <div className="text-2xl mb-1">🎃</div>
              <div className="text-amber-600 text-xs">Pumpkin</div>
              <div className="text-base text-amber-950">5 kg (5000g)</div>
            </div>

            <div className="p-3 bg-yellow-50 rounded-2xl border border-yellow-300 col-span-2 sm:col-span-2">
              <div className="text-2xl mb-1">🧺</div>
              <div className="text-yellow-800 text-xs">Fruit Crate</div>
              <div className="text-base text-yellow-950">10 kg (10000g)</div>
            </div>
          </div>
        </div>

        {/* CTA TO BALANCE GAME */}
        <div className="text-center pt-4">
          <button
            onClick={() => {
              playSound('click');
              onStartGame();
            }}
            className="px-10 py-5 rounded-3xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-purple-950 font-black text-2xl shadow-2xl hover:shadow-yellow-400/50 transform hover:scale-105 active:scale-95 transition-all border-4 border-yellow-200"
          >
            ⚖️ Ready to Play? Open Balance Scale!
          </button>
        </div>

      </div>
    </div>
  );
}
