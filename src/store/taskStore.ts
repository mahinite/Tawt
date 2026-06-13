import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Task } from '../types';
import { useSettingsStore } from './settingsStore';

interface TaskStore {
  tasks: Task[];
  activeTaskId: string | null;
  draftTaskTitle: string;
  draftTaskMinutes: string;
  setDraftTaskTitle: (title: string) => void;
  setDraftTaskMinutes: (minutes: string) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'completedMinutes' | 'completedSeconds' | 'status' | 'priority'>) => void;
  setActiveTask: (id: string | null) => void;
  completeTask: (id: string) => void;
  deleteTask: (id: string) => void;
  addFocusTime: (id: string, additionalMinutes: number) => void;
  addFocusSecond: (id: string) => void;
  advanceTask: () => void;
  moveTaskPriority: (id: string, direction: 'up' | 'down') => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      activeTaskId: null,
      draftTaskTitle: '',
      draftTaskMinutes: '60',
      setDraftTaskTitle: (title) => set({ draftTaskTitle: title }),
      setDraftTaskMinutes: (minutes) => set({ draftTaskMinutes: minutes }),
      addTask: (taskData) => {
        const newTask: Task = {
           id: crypto.randomUUID(),
           ...taskData,
           completedMinutes: 0,
           completedSeconds: 0,
           status: 'active',
           priority: get().tasks.length > 0 ? Math.max(...get().tasks.map(t => t.priority)) + 1 : 0,
           createdAt: Date.now(),
        };
        set((state) => ({ 
           tasks: [...state.tasks, newTask],
           draftTaskTitle: '',
           draftTaskMinutes: '60'
        }));
      },
      setActiveTask: (id) => set({ activeTaskId: id }),
      completeTask: (id) => {
        const wasActive = get().activeTaskId === id;
        set((state) => ({
          tasks: state.tasks.map(t => 
             t.id === id ? { ...t, status: 'completed', completedAt: Date.now() } : t
          ),
          activeTaskId: state.activeTaskId === id ? null : state.activeTaskId
        }));
        const { autoAdvanceTask } = useSettingsStore.getState();
        if (wasActive && autoAdvanceTask) {
          get().advanceTask();
        }
      },
      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(t => t.id !== id),
        activeTaskId: state.activeTaskId === id ? null : state.activeTaskId
      })),
      addFocusTime: (taskId, minutes) => {
        set((state) => {
          const updated = state.tasks.map(t =>
            t.id === taskId
              ? { ...t, completedMinutes: t.completedMinutes + minutes }
              : t
          );
          return { tasks: updated };
        });
      },
      addFocusSecond: (taskId) => {
        set((state) => ({
          tasks: state.tasks.map(t => {
            if (t.id !== taskId) return t;
            const newSeconds = (t.completedSeconds ?? 0) + 1;
            return {
              ...t,
              completedSeconds: newSeconds,
              completedMinutes: Math.floor(newSeconds / 60),
            };
          }),
        }));
      },
      advanceTask: () => {
        const nextTask = get().tasks
          .filter(t => t.status !== 'completed')
          .sort((a, b) => a.priority - b.priority)[0];
        set({ activeTaskId: nextTask ? nextTask.id : null });
      },
      moveTaskPriority: (id, direction) => {
        const sorted = [...get().tasks].sort((a, b) => a.priority - b.priority);
        const idx = sorted.findIndex(t => t.id === id);
        if (idx === -1) return;

        let swapIdx = -1;
        if (direction === 'up' && idx > 0) {
          swapIdx = idx - 1;
        } else if (direction === 'down' && idx < sorted.length - 1) {
          swapIdx = idx + 1;
        }

        if (swapIdx !== -1) {
          const t1 = sorted[idx];
          const t2 = sorted[swapIdx];
          
          set((state) => ({
            tasks: state.tasks.map(t => {
              if (t.id === t1.id) return { ...t, priority: t2.priority };
              if (t.id === t2.id) return { ...t, priority: t1.priority };
              return t;
            })
          }));
        }
      },
    }),
    {
      name: 'tawt-tasks-storage',
      partialize: (state) => ({
        tasks: state.tasks,
        activeTaskId: state.activeTaskId
      })
    }
  )
);
