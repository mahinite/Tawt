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
        className="mt-16 w-full max-w-sm px-6 py-4 rounded-2xl border border-dashed border-white/20 text-white/50 text-center cursor-pointer hover:border-white/40 hover:text-white/80 transition-colors select-none"
      >
        Click to select a task...
      </div>
    );
  }

  const completedSecs = task.completedSeconds ?? (task.completedMinutes * 60);
  const targetSecs = task.targetMinutes * 60;
  const progressPercent = targetSecs > 0 ? Math.min(100, Math.round((completedSecs / targetSecs) * 100)) : 0;
  const displayMinutes = Math.floor(completedSecs / 60);

  return (
    <div className="w-full max-w-sm flex flex-col gap-3 transition-all duration-300">
      <div className="flex items-center justify-between text-white group">
        <div
          onClick={onOpenPanel}
          className="flex-1 min-w-0 cursor-pointer flex items-center gap-2"
        >
          <span className="text-sm font-medium tracking-wide text-white/60 group-hover:text-white transition-colors">ACTIVE TASK</span>
          <ChevronUp size={16} className="text-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-white/5 p-5 rounded-[24px] border border-white/10 hover:bg-white/10 transition-colors">
        <div className="flex items-center justify-between gap-4 w-full">
          <div
            className="flex-1 min-w-0 cursor-pointer"
            onClick={onOpenPanel}
          >
            <div className="text-lg font-medium truncate text-white leading-tight">{task.title}</div>
            <div className="text-sm text-white/50 mt-1.5 font-mono">
              {displayMinutes} / {task.targetMinutes} min
            </div>
          </div>
          <button
            onClick={() => onComplete(task.id)}
            className="p-3 text-white/40 hover:text-emerald-400 hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
            title="Mark Done"
          >
            <CheckCircle2 size={26} />
          </button>
        </div>

        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
