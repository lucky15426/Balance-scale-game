import React from 'react';

export default function ProgressBar({ value, max = 100, label, color = 'from-purple-500 to-indigo-600' }) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center text-xs font-black text-purple-900 mb-1">
          <span>{label}</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div className="w-full h-4 bg-purple-100 rounded-full border-2 border-purple-200 p-0.5 overflow-hidden shadow-inner">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-500 shadow`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
