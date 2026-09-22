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
    <div className="flex items-center justify-center gap-pill-gap flex-nowrap">
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onModeChange(mode.id)}
          className={`px-pill-x py-pill-y text-pill rounded-full font-medium transition-colors ${activeMode === mode.id
            ? 'bg-white text-black'
            : 'bg-transparent text-white/80 hover:text-white border border-white/40 hover:border-white/60'
          }`}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
}
