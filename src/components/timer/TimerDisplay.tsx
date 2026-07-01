import React from 'react';

interface TimerDisplayProps {
  time: string;
}

export function TimerDisplay({ time }: TimerDisplayProps) {
  return (
    <div className="text-[7rem] min-[420px]:text-[7.8rem] sm:text-[8.5rem] md:text-[9.5rem] lg:text-[10rem] font-bold tracking-tight font-mono leading-none select-none">
      {time}
    </div>
  );
}
