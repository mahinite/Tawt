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
let lastRemainingSeconds = -1;
let lastTaskId: string | null = null;
let lastCycleCount = -1;

export const timerEngine = new TimerEngine({
  getTimerState: () => useTimerStore.getState(),
  // Passing Zustand's native setState setter
  setTimerState: (updates) => useTimerStore.setState(updates),
  getSettings: () => useSettingsStore.getState(),
  // Passing the decoupled eventBus emitter
  emitEvent: <T>(eventName: string, payload: T) => eventBus.emit(eventName, payload),
  // Direct synchronous task update — called every pomodoro second, no events involved
  onPomodoroTick: () => {
    const store = useTaskStore.getState();
    const activeTaskId = store.activeTaskId;

    if (!activeTaskId) {
      lastTaskId = null;
      return;
    }

    const task = store.tasks.find(t => t.id === activeTaskId);
    if (!task) {
      lastTaskId = null;
      return;
    }

    const timerState = useTimerStore.getState();
    const settings = useSettingsStore.getState();

    // Required by Safe Fix Plan: calculate absolute elapsed time of this pomodoro
    const totalPomodoroDurationInSeconds = settings.pomodoroLength * 60;
    const remainingSeconds = timerState.remainingSeconds;
    const elapsed = totalPomodoroDurationInSeconds - remainingSeconds;

    // Use absolute remainingSeconds differences to add to the total task elapsed time,
    // ensuring we do not rely on interval frequency (ticks).
    if (
      lastRemainingSeconds === -1 || 
      remainingSeconds > lastRemainingSeconds || 
      activeTaskId !== lastTaskId ||
      timerState.cycleCount !== lastCycleCount
    ) {
      lastRemainingSeconds = remainingSeconds;
      lastTaskId = activeTaskId;
      lastCycleCount = timerState.cycleCount;
    }

    const delta = lastRemainingSeconds - remainingSeconds;
    if (delta > 0) {
      store.setTaskElapsed(activeTaskId, task.completedSeconds + delta);
      lastRemainingSeconds = remainingSeconds;
    }

    const updatedTask = store.tasks.find(t => t.id === activeTaskId);
    if (updatedTask && updatedTask.completedSeconds >= updatedTask.targetMinutes * 60) {
      store.completeTask(activeTaskId);

      const { autoAdvanceTask } = useSettingsStore.getState();
      if (autoAdvanceTask) {
        store.advanceTask();
      }
    }
  },
});

// Sync with settings whenever they change and the timer is not running
useSettingsStore.subscribe(() => {
  timerEngine.syncWithSettings();
});
