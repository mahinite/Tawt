import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Settings } from '../types';

interface SettingsStore extends Settings {
  updateSettings: (newSettings: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
  pomodoroLength: 25,
  shortBreakLength: 5,
  longBreakLength: 15,
  longBreakInterval: 4,
  autoStartBreak: false,
  autoStartPomodoro: false,
  autoAdvanceTask: false,
  soundEnabled: true,
  progressDisplay: 'minutes',
  themeId: 'dark',
  fontId: 'inter',
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...defaultSettings,
      updateSettings: (newSettings) => set((state) => ({ ...state, ...newSettings, updatedAt: Date.now() })),
    }),
    {
      name: 'tawt-settings-storage',
    }
  )
);
