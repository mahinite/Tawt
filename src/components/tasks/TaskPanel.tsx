import React from 'react';
import { X, Plus } from 'lucide-react';
import { TaskList } from './TaskList';
import { useTasks } from '../../hooks/useTasks';

interface TaskPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TaskPanel({ isOpen, onClose }: TaskPanelProps) {
  const { 
    tasks, 
    activeTaskId, 
    draftTaskTitle,
    draftTaskMinutes,
    setDraftTaskTitle,
    setDraftTaskMinutes,
    addTask, 
    setActiveTask, 
    completeTask, 
    deleteTask,
    moveTaskPriority
  } = useTasks();

  if (!isOpen) return null;

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftTaskTitle.trim()) return;
    
    const parsedMinutes = parseInt(draftTaskMinutes, 10);
    if (isNaN(parsedMinutes) || parsedMinutes <= 0) return;
    
    const targetMinutes = parsedMinutes;

    addTask({
      title: draftTaskTitle.trim(),
      targetMinutes: targetMinutes
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/70 backdrop-blur-md">
      {/* Panel Container */}
      <div className="w-full max-w-[92vw] sm:max-w-[420px] bg-[#0A0A0A] border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] rounded-2xl sm:rounded-[32px]">
        
        {/* Header */}
        <div className="px-4 sm:px-6 py-5 sm:py-6 border-b border-white/5 flex items-center justify-between shrink-0">
          <h2 className="text-xl font-medium tracking-tight text-white">Tasks</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto px-6 py-6 pb-6 scrollbar-hide">
          <TaskList 
            tasks={tasks}
            activeTaskId={activeTaskId}
            onSelect={(id) => {
               setActiveTask(id);
               onClose();
            }}
            onComplete={completeTask}
            onDelete={deleteTask}
            onMovePriority={moveTaskPriority}
          />
        </div>

        {/* Input Area (Pinned to bottom) */}
    <div className="p-6 border-t border-white/5 bg-[#0A0A0A] shrink-0">
      <form onSubmit={handleAddTask} className="flex gap-3">
        <input
          type="text"
          value={draftTaskTitle}
          onChange={(e) => setDraftTaskTitle(e.target.value)}
          placeholder="What to focus on?"
          className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 placeholder:text-white/30 text-white focus:outline-none focus:border-white/30 transition-colors shadow-inner"
        />
        <div className="w-[60px] bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center gap-1.5 focus-within:border-white/30 transition-colors shadow-inner shrink-0 overflow-hidden">
          <input
            type="number"
            value={draftTaskMinutes}
            onChange={(e) => setDraftTaskMinutes(e.target.value)}
            onBlur={() => {
              const parsed = parseInt(draftTaskMinutes, 10);
              if (isNaN(parsed) || parsed <= 0) {
                setDraftTaskMinutes('1');
              } else {
                setDraftTaskMinutes(parsed.toString());
              }
            }}
            min="1"
            className="w-7 bg-transparent border-0 text-center text-white focus:outline-none font-inter text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
         <span className="text-sm text-white/50 font-inter select-none pointer-events-none shrink-0">
  m
</span>
        </div>
        <button
          type="submit"
          className="w-[50px] bg-white text-black font-medium rounded-2xl hover:bg-gray-200 transition-colors flex items-center justify-center shrink-0 disabled:opacity-50 disabled:hover:bg-white"
          disabled={!draftTaskTitle.trim()}
        >
          <Plus size={20} strokeWidth={2.5} />
        </button>
      </form>
    </div>
      </div>
    </div>
  );
}
