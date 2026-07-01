import React from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';

interface TimerControlsProps {
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
  onSkip: () => void;
}

export function TimerControls({
  isRunning,
  onToggle,
  onReset,
  onSkip,
}: TimerControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4 sm:gap-5 lg:gap-6 flex-nowrap">
      <button
        onClick={onToggle}
        className="p-3 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
        aria-label={isRunning ? "Pause Timer" : "Start Timer"}
      >
        {isRunning ? (
          <Pause size={28} className="sm:hidden" />
        ) : (
          <Play size={28} className="sm:hidden ml-0.5" />
        )}

        {isRunning ? (
          <Pause size={24} className="hidden sm:block" />
        ) : (
          <Play size={24} className="hidden sm:block ml-0.5" />
        )}
      </button>

      <button
        onClick={onReset}
        className="p-3 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
        aria-label="Reset Timer"
      >
        <RotateCcw size={28} className="sm:hidden" />
        <RotateCcw size={24} className="hidden sm:block" />
      </button>

      <button
        onClick={onSkip}
        className="p-3 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
        aria-label="Skip"
      >
        <SkipForward size={28} className="sm:hidden" />
        <SkipForward size={24} className="hidden sm:block" />
      </button>
    </div>
  );
}
