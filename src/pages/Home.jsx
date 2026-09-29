import React from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, BookOpen, Trophy, Scale, ArrowRight, ShieldCheck } from 'lucide-react';
import { playSound } from '../utils/audio';

export default function Home({ onNavigate }) {
  return (
    <div className="min-h-screen game-bg-gradient py-8 px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-6 sm:py-12">
          
          {/* Left Column Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start space-y-6"
          >
            {/* Playful Tag */}
            <div className="inline-flex items-center gap-2 bg-yellow-300 text-amber-950 font-black px-4 py-2 rounded-full border-2 border-yellow-400 shadow-md text-sm sm:text-base">
              <Sparkles className="w-5 h-5 text-amber-600 fill-amber-500 animate-spin" />
              <span>Interactive Kids Math Adventure</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-purple-950 leading-tight">
              Can You Balance <br />
              <span className="bg-gradient-to-r from-purple-700 via-indigo-600 to-pink-600 bg-clip-text text-transparent">
                The Scale? ⚖️
              </span>
            </h1>

            <p className="text-lg sm:text-xl font-extrabold text-indigo-900 leading-relaxed max-w-xl">
              Discover how <strong className="text-purple-700 underline decoration-yellow-400">grams</strong> and{' '}
              <strong className="text-emerald-700 underline decoration-yellow-400">kilograms</strong> work by playing with heavy fruits, magical weights, and physical scale balancing!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
              <button
                onClick={() => {
                  playSound('click');
                  onNavigate('balance');
                }}
                className="px-8 py-4 rounded-3xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-purple-950 font-black text-xl shadow-xl hover:shadow-amber-400/50 flex items-center justify-center gap-3 transform hover:scale-105 active:scale-95 transition-all border-3 border-yellow-200"
              >
                <Play className="w-6 h-6 fill-purple-950" />
                <span>Start Playing</span>
              </button>

              <button
                onClick={() => {
                  playSound('click');
                  onNavigate('learn');
                }}
                className="px-8 py-4 rounded-3xl bg-white/90 hover:bg-white text-purple-900 border-3 border-purple-200 font-black text-xl shadow-lg flex items-center justify-center gap-3 transform hover:scale-105 active:scale-95 transition-all"
              >
                <BookOpen className="w-6 h-6 text-purple-600" />
                <span>Learn Conversion</span>
              </button>
            </div>

            {/* Quick Stat reassurance */}
            <div className="flex items-center gap-6 text-sm font-bold text-indigo-950 pt-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>100% Free & Interactive</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl">🍉</span>
                <span>1 kg = 1000 g</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column Floating Balance Scale Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center items-center py-6"
          >
            {/* Background Glow Ring */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-purple-300/60 rounded-full blur-3xl -z-10 animate-pulse" />

            {/* Floating Fruit Elements */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute top-2 left-6 bg-white/90 border-2 border-rose-300 p-3 rounded-2xl shadow-xl flex items-center gap-2 font-black text-rose-900 text-sm"
            >
              <span className="text-3xl">🍓</span>
              <div>
                <div>Strawberry</div>
                <div className="text-xs text-rose-600 font-bold">100 g</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              className="absolute top-6 right-4 bg-white/90 border-2 border-emerald-300 p-3 rounded-2xl shadow-xl flex items-center gap-2 font-black text-emerald-900 text-sm"
            >
              <span className="text-3xl">🍉</span>
              <div>
                <div>Watermelon</div>
                <div className="text-xs text-emerald-600 font-bold">1 kg (1000g)</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
              className="absolute bottom-4 left-10 bg-white/90 border-2 border-orange-300 p-3 rounded-2xl shadow-xl flex items-center gap-2 font-black text-orange-900 text-sm"
            >
              <span className="text-3xl">🍊</span>
              <div>
                <div>Orange</div>
                <div className="text-xs text-orange-600 font-bold">500 g</div>
              </div>
            </motion.div>

            {/* Hero Central Balance Illustration */}
            <div className="w-80 sm:w-96 bg-white/80 backdrop-blur-md border-4 border-yellow-400 rounded-3xl p-6 shadow-2xl flex flex-col items-center">
              <div className="text-7xl sm:text-8xl my-2 filter drop-shadow-lg animate-bounce">
                ⚖️
              </div>
              <div className="w-full bg-indigo-900 text-white rounded-2xl p-3 text-center font-black text-base shadow">
                <span>1000 Grams = 1 Kilogram</span>
              </div>
            </div>

          </motion.div>
        </div>

        {/* 3 FEATURE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
          <div
            onClick={() => onNavigate('balance')}
            className="cursor-pointer bg-white/90 hover:bg-white border-3 border-indigo-200 hover:border-amber-400 p-6 rounded-3xl shadow-xl transition-all transform hover:-translate-y-2 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
              ⚖️
            </div>
            <h3 className="text-xl font-black text-purple-950 mb-2">Interactive Balance</h3>
            <p className="text-sm font-bold text-slate-600 mb-4">
              Drag fruits onto the pans and watch the scale physically tilt until both sides match!
            </p>
            <div className="flex items-center gap-1 text-sm font-extrabold text-amber-600 group-hover:gap-2 transition-all">
              <span>Play Scale Game</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('learn')}
            className="cursor-pointer bg-white/90 hover:bg-white border-3 border-indigo-200 hover:border-purple-400 p-6 rounded-3xl shadow-xl transition-all transform hover:-translate-y-2 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
              💡
            </div>
            <h3 className="text-xl font-black text-purple-950 mb-2">Visual Lessons</h3>
            <p className="text-sm font-bold text-slate-600 mb-4">
              See 🍉 1 kg transform into 1000 g with animated counters, multiplication & division rules.
            </p>
            <div className="flex items-center gap-1 text-sm font-extrabold text-purple-600 group-hover:gap-2 transition-all">
              <span>Explore Lessons</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('challenge')}
            className="cursor-pointer bg-white/90 hover:bg-white border-3 border-indigo-200 hover:border-rose-400 p-6 rounded-3xl shadow-xl transition-all transform hover:-translate-y-2 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
              ⚡
            </div>
            <h3 className="text-xl font-black text-purple-950 mb-2">Speed Challenge</h3>
            <p className="text-sm font-bold text-slate-600 mb-4">
              Test your conversion speed in 30-second rapid quiz challenges and earn golden badges!
            </p>
            <div className="flex items-center gap-1 text-sm font-extrabold text-rose-600 group-hover:gap-2 transition-all">
              <span>Start Challenge</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
