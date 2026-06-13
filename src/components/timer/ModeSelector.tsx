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
    <div className="flex items-center gap-3">
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onModeChange(mode.id)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
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
