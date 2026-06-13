import { useEffect } from 'react';
import { useTimerStore } from '../store/timerStore';
import { timerEngine } from '../store/engineAdapter';
import type { TimerMode } from '../types';

/**
 * Custom hook to bridge the Timer Store and the Engine Adapter with React UI components.
 * UI components must use this hook, NOT the store or engine directly.
 */
export function useTimer() {
  const timerState = useTimerStore();

  // Initialization: ensure the timer remaining seconds aligns with the saved mode 
  // on first load, in case settings changed or it's a fresh session.
  useEffect(() => {
    // Only sync if timer hasn't been initialized properly or is paused
    if (!timerState.running && timerState.remainingSeconds === 0) {
       timerEngine.syncWithSettings();
    }
  }, [timerState.running, timerState.remainingSeconds]);

  return {
    // State
    mode: timerState.mode,
    remainingSeconds: timerState.remainingSeconds,
    running: timerState.running,
    cycleCount: timerState.cycleCount,

    // Derived properties
    formatting: formatTime(timerState.remainingSeconds),

    // Actions
    start: () => timerEngine.start(),
    pause: () => timerEngine.pause(),
    reset: () => timerEngine.reset(),
    switchMode: (mode: TimerMode) => timerEngine.switchMode(mode),
  };
}

/**
 * Helper to format seconds into MM:SS
 */
function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
