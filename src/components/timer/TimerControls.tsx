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
    <div
      className="
    flex items-center justify-center

    px-6 py-3.5

    rounded-full

    bg-white/[0.04]
    backdrop-blur-md

    border border-white/[0.10]

    shadow-[0_8px_30px_rgba(0,0,0,0.25)]
  "
    >

      <button
        onClick={onReset}
        className="
  p-2.5

  rounded-full

  text-white

  transition-all duration-150

  hover:bg-white/[0.08]
  active:bg-white/[0.12]
"
        aria-label="Reset Timer"
      >
        <RotateCcw size={24} className="sm:hidden" />
        <RotateCcw size={26} className="hidden sm:block" />
      </button>
      <div className="w-5" />
      <button
        onClick={onToggle}
        className="
  px-7 py-5

  rounded-full

  bg-white/[0.04]
  border border-white/[0.10]

  text-white

  transition-all duration-150

  hover:bg-white/[0.08]
  hover:border-white/[0.16]

  active:bg-white/[0.12]
"
        aria-label={isRunning ? "Pause Timer" : "Start Timer"}
      >
        {isRunning ? (
          <Pause size={32} className="sm:hidden" />
        ) : (
          <Play size={32} className="sm:hidden ml-0.5" />
        )}

        {isRunning ? (
          <Pause size={32} className="hidden sm:block" />
        ) : (
          <Play size={32} className="hidden sm:block ml-0.5" />
        )}
      </button>
      <div className="w-5" />

      <button
        onClick={onSkip}
        className="
  p-2.5

  rounded-full

  text-white

  transition-all duration-150

  hover:bg-white/[0.08]
  active:bg-white/[0.12]
"
        aria-label="Skip"
      >
        <SkipForward size={24} className="sm:hidden" />
        <SkipForward size={26} className="hidden sm:block" />
      </button>
    </div>
  );
}
