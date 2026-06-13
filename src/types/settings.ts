/**
 * User Preferences and Application Configuration.
 * Fully decoupled from hardcoded logic across the application.
 */
export interface Settings {
  /** Duration of a work session (Pomodoro) in minutes */
  pomodoroLength: number;

  /** Duration of a short break in minutes */
  shortBreakLength: number;

  /** Duration of a long break in minutes */
  longBreakLength: number;

  /** Number of work cycles required before a long break is triggered */
  longBreakInterval: number;

  /** Should the timer automatically transition into a break after work? */
  autoStartBreak: boolean;

  /** Should the timer automatically start the next work session after a break? */
  autoStartPomodoro: boolean;

  /** Should completed tasks automatically switch to the next task? */
  autoAdvanceTask: boolean;

  /** Is completion alert sound enabled? */
  soundEnabled: boolean;

  /** User preference for how to visualize task completion progress */
  progressDisplay: "minutes" | "percent" | "bar" | "combined";

  /** Active theme identifier (extensible for future theme catalogs, e.g. "dark", "light", "cosmic") */
  themeId: string;

  /** Active primary font identifier (extensible for custom typography overlays) */
  fontId: string;

  /** Unix timestamp of the last settings change (supports future cloud sync/conflict resolution) */
  updatedAt?: number;
}
