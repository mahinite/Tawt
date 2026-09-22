import React from 'react';

interface TimerDisplayProps {
  time: string;
}

export function TimerDisplay({ time }: TimerDisplayProps) {
  return (
    <div className="text-timer tracking-tight font-timer leading-none select-none">
      {time}
    </div>
  );
}
