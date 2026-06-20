import React from 'react';
import type { TimerMode } from '../../types';

interface ModeSelectorProps {
  activeMode: TimerMode;
  onModeChange: (mode: TimerMode) => void;
}

export function ModeSelector({ activeMode, onModeChange }: ModeSelectorProps) {
  const modes: { id: TimerMode; label: string }[] = [
    { id: 'pomodoro', label: 'Pomodoro' },
    { id: 'shortBreak', label: 'Short Break' },
    { id: 'longBreak', label: 'Long Break' },
  ];

  return (
    <div className="flex items-center justify-center gap-2 flex-nowrap overflow-x-auto">
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onModeChange(mode.id)}
          className={`px-[clamp(0.7rem,1.2vw,1rem)] py-[clamp(0.35rem,0.8vw,0.6rem)] text-[clamp(0.65rem,1.17vw,0.9rem)] rounded-full font-medium transition-colors ${
            activeMode === mode.id
              ? 'bg-white text-black'
              : 'bg-transparent text-white/60 hover:text-white border border-white/20 hover:border-white/40'
          }`}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
}
