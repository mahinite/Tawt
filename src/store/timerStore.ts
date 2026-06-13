import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TimerState } from '../types';
import { useSettingsStore } from './settingsStore';

/**
 * Pure data store for the Timer layer.
 * Stripped of all logic, leaving only state definitions and persistence.
 * Logic is fully delegated to the injected TimerEngine via the Adapter.
 */
interface TimerStore extends TimerState {}

const initialState: TimerState = {
  mode: 'pomodoro',
  remainingSeconds: (useSettingsStore.getState().pomodoroLength || 25) * 60,
  running: false,
  cycleCount: 0,
};

export const useTimerStore = create<TimerStore>()(
  persist(
    (_set) => ({
      ...initialState,
    }),
    {
      name: 'tawt-timer-storage',
      partialize: (state) => ({
        mode: state.mode,
        remainingSeconds: state.remainingSeconds,
        cycleCount: state.cycleCount,
        running: false, // Ensure timer pauses on browser reload
      }),
    }
  )
);
