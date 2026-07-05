import React from 'react';

interface TimerDisplayProps {
  time: string;
}

export function TimerDisplay({ time }: TimerDisplayProps) {
  return (
    <div className="text-[6rem] min-[420px]:text-[6.5rem] sm:text-[7.5rem] md:text-[8.5rem] lg:text-[9.5rem] tracking-tight font-timer leading-none select-none">
      {time}
    </div>
  );
}
