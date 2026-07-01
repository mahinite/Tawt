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
    <div className="flex items-center justify-center gap-2 flex-nowrap">
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onModeChange(mode.id)}
          className={`px-[1rem] min-[420px]:px-[1.2rem] sm:px-[1.1rem] md:px-[1.25rem]
            py-[0.6rem] min-[420px]:py-[0.65rem] sm:py-[0.55rem] md:py-[0.6rem]
            text-[0.8rem] min-[420px]:text-[0.9rem] sm:text-[1rem] md:text-[1rem]
            rounded-full font-medium transition-colors ${activeMode === mode.id
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
