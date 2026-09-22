import React from 'react';
import type { Task } from '../../types';
import { CheckCircle2, ChevronUp } from 'lucide-react';

interface ActiveTaskProps {
  task: Task | null;
  onComplete: (id: string) => void;
  onOpenPanel: () => void;
}

export function ActiveTask({ task, onComplete, onOpenPanel }: ActiveTaskProps) {
  if (!task) {
    return (
      <div
        onClick={onOpenPanel}
        className="w-full max-w-card px-card-x py-card-y rounded-2xl border border-dashed border-white/30 text-white/70 text-center cursor-pointer hover:border-white/40 hover:text-white/80 transition-colors select-none"
      >
        Click to create a task...
      </div>
    );
  }

  const completedSecs = task.completedSeconds ?? (task.completedMinutes * 60);
  const targetSecs = task.targetMinutes * 60;
  const progressPercent = targetSecs > 0 ? Math.min(100, Math.round((completedSecs / targetSecs) * 100)) : 0;
  const displayMinutes = Math.floor(completedSecs / 60);

  return (
    <div className="w-full max-w-card flex flex-col gap-card-g transition-all duration-300">
      <div className="flex items-center justify-between text-white group">
        <div
          onClick={onOpenPanel}
          className="flex-1 min-w-0 cursor-pointer flex items-center gap-card-g-sm"
        >
          <span className="text-sm font-medium tracking-wide text-white/60 group-hover:text-white transition-colors">ACTIVE TASK</span>
          <ChevronUp className="size-card-icon text-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      <div className="flex flex-col gap-card-g-lg bg-white/5 p-card-pad rounded-card border border-white/10 hover:bg-white/10 transition-colors">
        <div className="flex items-center justify-between gap-card-g-lg w-full">
          <div
            className="flex-1 min-w-0 cursor-pointer"
            onClick={onOpenPanel}
          >
            <div className="text-lg font-medium truncate text-white leading-tight">{task.title}</div>
            <div className="text-sm text-white/50 mt-card-mt font-mono">
              {displayMinutes} / {task.targetMinutes} min
            </div>
          </div>
          <button
            onClick={() => onComplete(task.id)}
            className="p-card-btn text-white/40 hover:text-emerald-400 hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
            title="Mark Done"
          >
            <CheckCircle2 className="size-card-icon-btn" />
          </button>
        </div>

        <div className="h-card-bar w-full bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
