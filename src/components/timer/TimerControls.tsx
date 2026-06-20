import React from 'react';
import { RotateCcw, Settings as SettingsIcon } from 'lucide-react';

interface TimerControlsProps {
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
  onSettings: () => void;
}

export function TimerControls({ isRunning, onToggle, onReset, onSettings }: TimerControlsProps) {
  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4 flex-nowrap">
      <button
        onClick={onToggle}
        className="px-5 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base lg:text-lg rounded-full border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all font-medium text-white min-w-[100px] sm:min-w-[120px] lg:min-w-[140px]"
      >
        {isRunning ? 'Pause' : 'Start'}
      </button>
      
      <button
        onClick={onReset}
        className="p-2 sm:p-3 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
        aria-label="Reset Timer"
      >
        <RotateCcw size={22} />
      </button>
      
      <button
        onClick={onSettings}
        className="p-2 sm:p-3 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
        aria-label="Settings"
      >
        <SettingsIcon size={22} />
      </button>
    </div>
  );
}
