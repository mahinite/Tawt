import React from 'react';
import type { Task } from '../../types';
import { CheckCircle2, Trash2, PlayCircle, ArrowUp, ArrowDown } from 'lucide-react';

interface TaskItemProps {
  key?: string | number;
  task: Task;
  isActive: boolean;
  onSelect: (id: string) => void;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onMovePriority: (id: string, direction: 'up' | 'down') => void;
}

export function TaskItem({ task, isActive, onSelect, onComplete, onDelete, onMovePriority }: TaskItemProps) {
  const completedSecs = task.completedSeconds ?? (task.completedMinutes * 60);
  const targetSecs = task.targetMinutes * 60;
  const progressPercent = targetSecs > 0 ? Math.min(100, Math.round((completedSecs / targetSecs) * 100)) : 0;
  const displayMinutes = Math.floor(completedSecs / 60);

  return (
    <div className={`p-4 flex flex-col gap-3 rounded-2xl border transition-colors ${
      isActive 
        ? 'border-white/40 bg-white/10' 
        : 'border-white/5 bg-zinc-950 hover:border-white/20'
    }`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0 pt-0.5">
          <div className={`font-medium ${task.status === 'completed' ? 'line-through text-white/40' : 'text-white'}`}>
            {task.title}
          </div>
          <div className="text-sm text-white/50 font-mono mt-1">
            {displayMinutes} / {task.targetMinutes} min
          </div>
        </div>
        
        <div className="flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
          {task.status === 'active' && (
             <>
               <button
                 onClick={() => onMovePriority(task.id, 'up')}
                 className="p-2.5 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors"
                 title="Move Up"
               >
                 <ArrowUp size={20} />
               </button>
               <button
                 onClick={() => onMovePriority(task.id, 'down')}
                 className="p-2.5 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors"
                 title="Move Down"
               >
                 <ArrowDown size={20} />
               </button>
               {!isActive && (
                 <button
                   onClick={() => onSelect(task.id)}
                   className="p-2.5 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors"
                   title="Select Task"
                 >
                   <PlayCircle size={20} />
                 </button>
               )}
               <button
                 onClick={() => onComplete(task.id)}
                 className="p-2.5 hover:bg-emerald-400/10 rounded-full text-white/60 hover:text-emerald-400 transition-colors"
                 title="Mark Done"
               >
                 <CheckCircle2 size={20} />
               </button>
             </>
          )}
          <button
            onClick={() => onDelete(task.id)}
            className="p-2.5 hover:bg-red-400/10 rounded-full text-white/60 hover:text-red-400 transition-colors"
            title="Delete Task"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
      
      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-500 ${task.status === 'completed' ? 'bg-emerald-400/60' : 'bg-white/60'}`} 
          style={{ width: `${progressPercent}%` }} 
        />
      </div>
    </div>
  );
}
