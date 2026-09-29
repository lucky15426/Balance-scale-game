import React, { useState } from 'react';
import { Volume2, VolumeX, Award, Flame, Star, Menu, X, BookOpen, Scale, HelpCircle, Trophy, Home as HomeIcon } from 'lucide-react';
import { playSound, getIsMuted, setMuted } from '../utils/audio';

export default function Header({ currentTab, setCurrentTab, score, streak, progress }) {
  const [muted, setMutedState] = useState(getIsMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMute = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    setMutedState(nextMuted);
    if (!nextMuted) playSound('click');
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'balance', label: 'Balance Game', icon: Scale },
    { id: 'practice', label: 'Practice', icon: HelpCircle },
    { id: 'challenge', label: 'Timed Challenge', icon: Flame },
    { id: 'progress', label: 'Progress', icon: Award },
  ];

  const handleNav = (id) => {
    playSound('click');
    setCurrentTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-purple-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 group text-left focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 via-orange-400 to-yellow-300 flex items-center justify-center text-xl shadow group-hover:scale-105 transition-transform">
              ⚖️
            </div>
            <div>
              <div className="text-xl font-black bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent">
                GramQuest
              </div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-purple-50 p-1 rounded-xl border border-purple-100">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-md scale-105'
                      : 'text-purple-800 hover:bg-purple-200/60 hover:text-purple-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-yellow-300' : 'text-purple-500'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Stats Bar & Sound Button */}
          <div className="flex items-center gap-3">
            {/* Score pill */}
            <div className="flex items-center gap-1.5 bg-amber-100 border-2 border-amber-300 px-3 py-1.5 rounded-full text-amber-900 font-extrabold text-sm shadow-sm">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
              <span>{score}</span>
              <span className="text-xs text-amber-700 font-bold hidden sm:inline">pts</span>
            </div>

            {/* Streak pill */}
            {streak > 0 && (
              <div className="hidden sm:flex items-center gap-1 bg-rose-100 border-2 border-rose-300 px-3 py-1.5 rounded-full text-rose-800 font-extrabold text-sm shadow-sm animate-bounce">
                <Flame className="w-4 h-4 fill-rose-500 text-rose-600" />
                <span>{streak}</span>
              </div>
            )}

            {/* Mute toggle */}
            <button
              onClick={toggleMute}
              title={muted ? 'Unmute Sound' : 'Mute Sound'}
              className="p-2.5 rounded-xl bg-indigo-100 hover:bg-indigo-200 text-indigo-800 border-2 border-indigo-200 transition-transform active:scale-95"
            >
              {muted ? <VolumeX className="w-5 h-5 text-rose-500" /> : <Volume2 className="w-5 h-5 text-indigo-700" />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-purple-100 text-purple-800 border border-purple-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-purple-900/95 backdrop-blur-lg border-b border-purple-700 px-4 pt-3 pb-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-base font-extrabold text-left transition-all ${
                  isActive
                    ? 'bg-amber-400 text-purple-950 shadow-lg'
                    : 'bg-purple-800/60 text-purple-100 hover:bg-purple-800'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-purple-950' : 'text-amber-400'}`} />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
