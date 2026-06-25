import React, { useState } from 'react';
import { useTimer } from '../hooks/useTimer';
import { useTasks } from '../hooks/useTasks';
import { ModeSelector } from '../components/timer/ModeSelector';
import { TimerDisplay } from '../components/timer/TimerDisplay';
import { TimerControls } from '../components/timer/TimerControls';
import { ActiveTask } from '../components/tasks/ActiveTask';
import { TaskPanel } from '../components/tasks/TaskPanel';
import { SettingsPanel } from '../components/settings/SettingsPanel';
import { useUIStore } from '../store/uiStore';
import { useSettingsStore } from '../store/settingsStore';
import { useTimerStore } from '../store/timerStore';
import { RotateCcw } from 'lucide-react';
import '../styles/branding.css';

export function FocusPage() {
  const timer = useTimer();
  const { activeTask, completeTask } = useTasks();
  const [isTaskPanelOpen, setIsTaskPanelOpen] = useState(false);
  const openSettings = useUIStore(state => state.openSettings);
  const settings = useSettingsStore();

  const nextLabel = timer.mode === 'pomodoro'
    ? ((timer.cycleCount + 1) % settings.longBreakInterval === 0 ? 'Long Break' : 'Short Break')
    : 'Pomodoro';

  return (
    <main className="min-h-screen bg-black text-white flex flex-col p-4 relative">

      {/* BRAND */}
      <div className="absolute bottom-6 right-6 font-brand text-md text-white/70 hover:text-white/90 transition-colors tracking-[0.35em] select-none">
        TAWT
      </div>

      {/* CENTER CONTENT */}
      <div className="flex flex-col items-center justify-center flex-1">

        {/* MODE SELECTOR */}
        <div>
          <ModeSelector
            activeMode={timer.mode}
            onModeChange={timer.switchMode}
          />
        </div>

        {/* TIMER */}
        <div>
          <TimerDisplay time={timer.formatting} />
        </div>

        {/* CONTROLS */}
        <div className="mt-4">
          <TimerControls
            isRunning={timer.running}
            onToggle={timer.running ? timer.pause : timer.start}
            onReset={timer.reset}
            onSettings={openSettings}
          />
        </div>

        {/* CYCLE TRACKER */}
        <div className="mt-6 mb-4 select-none">
          <div className="mx-auto w-fit flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-900/80 text-zinc-200 text-sm font-inter shadow-md shadow-black/40 backdrop-blur-sm sm:px-5 sm:py-1.5 sm:gap-2.5">
            <span>Cycles: {timer.cycleCount}</span>
            <button
              onClick={() => useTimerStore.setState({ cycleCount: 0 })}
              className="hover:text-white transition-colors p-0.5 cursor-pointer"
              title="Reset cycle count"
            >
              <RotateCcw size={15} />
            </button>
            <span className="text-white/20 px-0.5 sm:px-1">•</span>
            <span>Next: {nextLabel}</span>
          </div>
        </div>

        {/* ACTIVE TASK */}
        <div className="w-full max-w-sm mt-12 sm:mt-16">
          <ActiveTask
            task={activeTask}
            onComplete={completeTask}
            onOpenPanel={() => setIsTaskPanelOpen(true)}
          />
        </div>

      </div>

      <TaskPanel
        isOpen={isTaskPanelOpen}
        onClose={() => setIsTaskPanelOpen(false)}
      />

      <SettingsPanel />
    </main>
  );
}
