import type { TimerMode, TimerState, Settings } from '../types';

export interface TimerDependencies {
  getTimerState: () => TimerState;
  setTimerState: (updates: Partial<TimerState>) => void;
  getSettings: () => Settings;
  emitEvent: <T>(eventName: string, payload: T) => void;
  /** Called once per second during an active Pomodoro. Updates task progress directly. */
  onPomodoroTick: () => void;
}

/**
 * Domain logic for the Timer Engine.
 * Formulated to be strictly framework-agnostic and decoupled from UI/Stores.
 * Replaces direct Zustand usage with Dependency Injection.
 */
export class TimerEngine {
  private deps: TimerDependencies;
  private intervalId: number | null = null;
  private isProcessingComplete: boolean = false;

  constructor(deps: TimerDependencies) {
    this.deps = deps;
  }

public start(): void {
  const state = this.deps.getTimerState();
  if (state.running || state.remainingSeconds <= 0) return;

  const now = Date.now();

  this.deps.setTimerState({
    running: true,
    startTimestamp: now,
    endTimestamp: now + state.remainingSeconds * 1000
  });

  this.intervalId = (globalThis as any).setInterval(() => {
    this.tick();
  }, 250) as number;
}

  public pause(): void {
    this.deps.setTimerState({ running: false });
    this.clearInterval();
  }

  public reset(): void {
    this.pause();
    const state = this.deps.getTimerState();
    this.applyMode(state.mode);
  }

  public switchMode(mode: TimerMode): void {
    this.pause();
    this.applyMode(mode);
  }

  public syncWithSettings(): void {
    const state = this.deps.getTimerState();
    if (!state.running) {
       this.applyMode(state.mode);
    }
  }

  private tick(): void {
  const state = this.deps.getTimerState();

  if (!state.running || this.isProcessingComplete) {
    return;
        }

        const now = Date.now();
        const remaining = Math.max(
          0,
          Math.floor((state.endTimestamp! - now) / 1000)
        );

        this.deps.setTimerState({
          remainingSeconds: remaining
        });

        if (state.mode === 'pomodoro') {
          this.deps.onPomodoroTick();
        }

        if (remaining <= 0) {
          this.handleSessionComplete();
        }
        }

  private handleSessionComplete(): void {
    this.isProcessingComplete = true; // Lock
    
    // 1. Immediately pause and clear the timer to prevent double-trigger loops
    this.pause();
    this.deps.setTimerState({ remainingSeconds: 0 });

    const state = this.deps.getTimerState();
    const settings = this.deps.getSettings();

    // 2. Play sound if enabled
    if (settings.soundEnabled) {
      try {
        const AudioContextClass = (globalThis as any).AudioContext || (globalThis as any).webkitAudioContext;
        if (AudioContextClass) {
          const context = new AudioContextClass();
          const oscillator = context.createOscillator();
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(880, context.currentTime);
          oscillator.connect(context.destination);
          oscillator.start();
          oscillator.stop(context.currentTime + 0.25);
        }
      } catch (e) {
        console.warn("Failed to play sound:", e);
      }
    }

    // 3. Compute duration and dispatch generic event via injected bus
    const durationSeconds = this.getDurationForMode(state.mode, settings) * 60;
    const payload = {
      mode: state.mode,
      durationSeconds
    };
    console.log("EMIT SESSION:", payload);
    this.deps.emitEvent('sessionCompleted', payload);

    // 4. Mode Transitions and auto-start logic
    let nextMode: TimerMode;
    let autoStart = false;

    if (state.mode === 'pomodoro') {
      const nextBreakIndex = state.cycleCount + 1;
      if (nextBreakIndex % settings.longBreakInterval === 0) {
        nextMode = 'longBreak';
      } else {
        nextMode = 'shortBreak';
      }
      autoStart = settings.autoStartBreak;
      
    } else {
      nextMode = 'pomodoro';
      autoStart = settings.autoStartPomodoro;
      this.deps.setTimerState({ cycleCount: state.cycleCount + 1 });
    }

    // Apply next mode
    this.applyMode(nextMode);
    
    this.isProcessingComplete = false; // Unlock

    if (autoStart) {
      // Delay ensures clean call stack and propagates events first
      (globalThis as any).setTimeout(() => this.start(), 0);
    }
  }

  private clearInterval(): void {
    if (this.intervalId !== null) {
      (globalThis as any).clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private getDurationForMode(mode: TimerMode, settings: Settings): number {
    switch (mode) {
      case 'pomodoro': return settings.pomodoroLength;
      case 'shortBreak': return settings.shortBreakLength;
      case 'longBreak': return settings.longBreakLength;
      default: return 25;
    }
  }

  private applyMode(mode: TimerMode): void {
  const settings = this.deps.getSettings();
  const durationSeconds = this.getDurationForMode(mode, settings) * 60;

  this.deps.setTimerState({
    mode,
    remainingSeconds: durationSeconds,
    running: false,

    startTimestamp: null,
    endTimestamp: null,
    });
  }
}
