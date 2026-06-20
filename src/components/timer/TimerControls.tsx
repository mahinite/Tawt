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
    <div className="flex items-center justify-center gap-2 sm:gap-4 flex-nowrap overflow-x-auto">
      <button
        onClick={onToggle}
        className="px-[clamp(1.2rem,2.5vw,2rem)] py-[clamp(0.5rem,1.2vw,0.9rem)] text-[clamp(0.85rem,1.5vw,1.1rem)] rounded-full border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all font-medium text-white min-w-[90px] sm:min-w-[120px]"
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
