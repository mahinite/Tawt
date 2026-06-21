/**
 * Defines the possible operating states of the timer session.
 */
export type TimerMode = "pomodoro" | "shortBreak" | "longBreak";

/**
 * Represents the core real-time state of the timer engine.
 * Fully unaware of UI and Task constructs.
 */
export interface TimerState {
  mode: TimerMode;
  remainingSeconds: number;
  running: boolean;
  cycleCount: number;

  startTimestamp: number | null;
  endTimestamp: number | null;
}

/**
 * Focus Session
 * Represents a completed contiguous unit of time.
 * Essential foundation for future usage statistics, daily charts, and history tracking.
 */
export interface FocusSession {
  /** Unique identifier for the historical session entry */
  id: string;

  /** The operating mode of this completed session (typically "pomodoro") */
  mode: TimerMode;

  /** Optional link to a task that was active during this session */
  taskId?: string;

  /** Start time of the session (Unix timestamp) */
  startTime: number;

  /** End time of the session (Unix timestamp) */
  endTime: number;

  /** Total actual duration recorded in seconds */
  durationSeconds: number;
}
