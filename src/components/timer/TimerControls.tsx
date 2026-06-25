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
    <div className="flex items-center justify-center gap-4 sm:gap-5 lg:gap-6 flex-nowrap">
      <button
        onClick={onToggle}
        className="px-7 sm:px-6 lg:px-8 py-3 sm:py-2.5 lg:py-3 text-base sm:text-base lg:text-lg rounded-full border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all font-medium text-white min-w-[130px] sm:min-w-[120px] lg:min-w-[140px]"
      >
        {isRunning ? 'Pause' : 'Start'}
      </button>

      <button
        onClick={onReset}
        className="p-3 sm:p-3 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
        aria-label="Reset Timer"
      >
        <RotateCcw size={28} className="sm:hidden" />
        <RotateCcw size={24} className="hidden sm:block" />
      </button>

      <button
        onClick={onSettings}
        className="p-3 sm:p-3 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
        aria-label="Settings"
      >
        <SettingsIcon size={28} className="sm:hidden" />
        <SettingsIcon size={24} className="hidden sm:block" />
      </button>
    </div>
  );
}
