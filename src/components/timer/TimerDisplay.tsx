import React from 'react';

interface TimerDisplayProps {
  time: string;
}

export function TimerDisplay({ time }: TimerDisplayProps) {
  return (
    <div className="text-[6rem] min-[420px]:text-[7rem] sm:text-[8rem] md:text-[9rem] lg:text-[10rem] font-bold tracking-tight font-manolo mono leading-none select-none">
      {time}
    </div>
  );
}
