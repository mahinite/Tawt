import React from 'react';
import { TaskItem } from './TaskItem';
import type { Task } from '../../types';

interface TaskListProps {
  tasks: Task[];
  activeTaskId: string | null;
  onSelect: (id: string) => void;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onMovePriority: (id: string, direction: 'up' | 'down') => void;
}

export function TaskList({ tasks, activeTaskId, onSelect, onComplete, onDelete, onMovePriority }: TaskListProps) {
  // Sorting: active tasks first, logically grouped
  const sorted = [...tasks].sort((a, b) => a.priority - b.priority);
  const activeTasks = sorted.filter(t => t.status === 'active');
  const completedTasks = sorted.filter(t => t.status === 'completed');
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);
  
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="w-16 h-16 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <p className="text-white/50 text-sm">No tasks yet. Create one to get started.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {activeTasks.length > 0 && (
        <div className="flex flex-col gap-2">
          {activeTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              isActive={task.id === activeTaskId}
              onSelect={onSelect}
              onComplete={onComplete}
              onDelete={onDelete}
              onMovePriority={onMovePriority}
              openMenuId={openMenuId}
              setOpenMenuId={setOpenMenuId}
            />
          ))}
        </div>
      )}

      {completedTasks.length > 0 && (
        <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-white/5">
          <div className="text-xs font-semibold tracking-wider text-white/30 uppercase mb-2">Completed</div>
          {completedTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              isActive={false}
              onSelect={onSelect}
              onComplete={onComplete}
              onDelete={onDelete}
              onMovePriority={onMovePriority}
              openMenuId={openMenuId}
              setOpenMenuId={setOpenMenuId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
