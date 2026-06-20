import React from 'react';

interface TimerDisplayProps {
  time: string;
}

export function TimerDisplay({ time }: TimerDisplayProps) {
  return (
    <div className="text-[6.5rem] min-[420px]:text-[7.5rem] sm:text-[8.5rem] md:text-[10rem] lg:text-[11.5rem] font-bold tracking-tight my-4 sm:my-6 font-mono leading-none select-none">
      {time}
    </div>
  );
}
