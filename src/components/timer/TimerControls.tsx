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

    px-ctl-x py-ctl-y

    rounded-full

    bg-white/[0.04]
    backdrop-blur-md

    border border-white/[0.10]
    border-2
    shadow-[0_8px_30px_rgba(0,0,0,0.25)]
  "
    >

      <button
        onClick={onReset}
        className="
  p-ctl-btn

  rounded-full

  text-white

  transition-all duration-150

  hover:bg-white/[0.08]
  active:bg-white/[0.12]
"
        aria-label="Reset Timer"
      >
        <RotateCcw className="size-ctl-icon" />
      </button>
      <div className="w-ctl-gap" />
      <button
        onClick={onToggle}
        className="
  px-ctl-main-x py-ctl-main-y

  rounded-full

  bg-white/[0.2]
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
          <Pause className="size-ctl-icon-main" />
        ) : (
          <Play className="size-ctl-icon-main ml-0.5" />
        )}
      </button>
      <div className="w-ctl-gap" />

      <button
        onClick={onSkip}
        className="
  p-ctl-btn

  rounded-full

  text-white

  transition-all duration-150

  hover:bg-white/[0.08]
  active:bg-white/[0.12]
"
        aria-label="Skip"
      >
        <SkipForward className="size-ctl-icon" />
      </button>
    </div>
  );
}
