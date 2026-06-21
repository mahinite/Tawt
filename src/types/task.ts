/**
 * Represents the fundamental domain model for a Task.
 */
export interface Task {
  /** Unique identifier for the task (UUID preferred to support future cloud sync without collisions) */
  id: string;

  /** Display name / title of the task */
  title: string;

  /** User's estimated time budget for this task in minutes */
  targetMinutes: number;

  /** Total actual focus time accumulated towards this task in minutes (floor of completedSeconds / 60) */
  completedMinutes: number;

  /** Total accumulated focus seconds — source of truth, incremented every Pomodoro tick */
  completedSeconds: number;

  /** Lifecycle status of the task. Break sessions do not advance this state. */
  status: "active" | "completed";

  /** The priority of the task. Lower number = higher priority. */
  priority: number;

  /** Unix timestamp of creation (vital for future history tracking and synchronization) */
  createdAt: number;

  /** Unix timestamp of when the task was explicitly marked done (important for daily statistics and metrics) */
  completedAt?: number;

  /** Unix timestamp of last update (crucial for future cloud sync multi-device consistency) */
  updatedAt?: number;

  /** Optional: Allows future task categorizations, tags or project groupings */
  projectId?: string;

  /** Internal field to track the last time the task was updated with focus time, used for accurate time tracking on Pomodoro ticks */
  lastTick?: number;
}
