import { useTimerStore } from './timerStore';
import { useSettingsStore } from './settingsStore';
import { TimerEngine } from '../services/timerEngine';
import { eventBus } from '../services/eventBus';
import { useTaskStore } from './taskStore';

/**
 * Adapter Layer for Timer Integration
 * Wires the framework-agnostic domain engine to the specific state management
 * strategy (Zustand) and event systems.
 */
export const timerEngine = new TimerEngine({
  getTimerState: () => useTimerStore.getState(),
  // Passing Zustand's native setState setter
  setTimerState: (updates) => useTimerStore.setState(updates),
  getSettings: () => useSettingsStore.getState(),
  // Passing the decoupled eventBus emitter
  emitEvent: <T>(eventName: string, payload: T) => eventBus.emit(eventName, payload),
  // Direct synchronous task update — called every pomodoro second, no events involved
  onPomodoroTick: () => {
    const { activeTaskId, addFocusSecond, completeTask, advanceTask } = useTaskStore.getState();
    if (activeTaskId) {
      addFocusSecond(activeTaskId);
      const task = useTaskStore.getState().tasks.find(t => t.id === activeTaskId);
      if (task && task.completedSeconds >= task.targetMinutes * 60) {
        completeTask(activeTaskId);
        const { autoAdvanceTask } = useSettingsStore.getState();
        if (autoAdvanceTask) {
          advanceTask();
        }
      }
    }
  },
});

// Sync with settings whenever they change and the timer is not running
useSettingsStore.subscribe(() => {
  timerEngine.syncWithSettings();
});
