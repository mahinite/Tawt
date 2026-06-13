import React from 'react';

interface TimerDisplayProps {
  time: string;
}

export function TimerDisplay({ time }: TimerDisplayProps) {
  return (
    <div className="text-[8rem] md:text-[12rem] font-bold tracking-tight my-8 font-mono leading-none select-none">
      {time}
    </div>
  );
}
