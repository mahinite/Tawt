import { eventBus } from '../services/eventBus';
import type { TimerMode } from '../types';

const globalAny = globalThis as any;

/**
 * Task engine adapter.
 * Previously responsible for updating task progress on session completion.
 * Task progress is now updated directly inside tick() via onPomodoroTick dep —
 * so no task mutations happen here. The subscription is kept for future
 * session-level events (e.g., notifications, analytics) without double-counting.
 */
export function initTaskEngineAdapter() {
  if (globalAny.__tawtTaskAdapterUnsub) {
    globalAny.__tawtTaskAdapterUnsub();
  }

  globalAny.__tawtTaskAdapterUnsub = eventBus.subscribe(
    'sessionCompleted',
    (_payload: { mode: TimerMode; durationSeconds: number }) => {
      // Task progress is accumulated per-second via onPomodoroTick in tick().
      // No task mutations here — session event retained for future use.
    }
  );
}
