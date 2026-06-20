import React from 'react';

interface TimerDisplayProps {
  time: string;
}

export function TimerDisplay({ time }: TimerDisplayProps) {
  return (
    <div className="text-[7rem] min-[420px]:text-[7.8rem] sm:text-[8.9rem] md:text-[10rem] lg:text-[11.5rem] font-bold tracking-tight my-4 sm:my-6 font-mono leading-none select-none">
      {time}
    </div>
  );
}
