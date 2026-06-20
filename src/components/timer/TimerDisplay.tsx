import React from 'react';

interface TimerDisplayProps {
  time: string;
}

export function TimerDisplay({ time }: TimerDisplayProps) {
  return (
    <div className="text-[clamp(6rem,12vw,9rem)] font-bold tracking-tight my-6 font-mono leading-none select-none">
      {time}
    </div>
  );
}
