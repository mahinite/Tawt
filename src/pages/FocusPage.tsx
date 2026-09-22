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
import { RotateCcw, MoreVertical } from 'lucide-react';
import '../styles/branding.css';
import { FocusLayout } from '../components/layout/FocusLayout';
import { useLayoutMode } from "../hooks/useLayoutMode";


export function FocusPage() {
  const timer = useTimer();
  const layoutMode = useLayoutMode();
  const { activeTask, completeTask } = useTasks();
  const [isTaskPanelOpen, setIsTaskPanelOpen] = useState(false);
  const openSettings = useUIStore(state => state.openSettings);
  const settings = useSettingsStore();

  const nextLabel = timer.mode === 'pomodoro'
    ? ((timer.cycleCount + 1) % settings.longBreakInterval === 0 ? 'Long Break' : 'Short Break')
    : 'Pomodoro';

  return (
    <main
      className="bg-black text-white flex flex-col relative h-dvh pt-safe-top pb-safe-bottom pl-safe-left pr-safe-right"
    >
      {/* MORE MENU */}
      <div className="absolute top-chrome right-chrome-x z-20">
        <button
          onClick={openSettings}
          className="p-chrome rounded-full hover:bg-white/10 transition-colors text-white/75 hover:text-white"
          aria-label="More"
          title="More"
        >
          <MoreVertical className="size-chrome-icon" />
        </button>
      </div>

      <FocusLayout
        layoutMode={layoutMode}
        mode={
          <ModeSelector
            activeMode={timer.mode}
            onModeChange={timer.switchMode}
          />
        }

        cycle={
          <div className="select-none">
            <div className="mx-auto w-fit flex items-center gap-status-gap px-status-x py-status-y rounded-full bg-white/5 text-status font-inter shadow-md shadow-black/40 backdrop-blur-sm md:bg-transparent">
              <span>Cycles: {timer.cycleCount}</span>

              <button
                onClick={() => useTimerStore.setState({ cycleCount: 0 })}
                className="hover:text-white transition-colors p-status-btn cursor-pointer"
                title="Reset cycle count"
              >
                <RotateCcw className="size-status-icon" />
              </button>

              <span className="text-white/20 px-status-dot">•</span>

              <span>
                Next: {nextLabel}
              </span>
            </div>
          </div>
        }

        timer={
          <TimerDisplay time={timer.formatting} />
        }

        controls={
          <TimerControls
            isRunning={timer.running}
            onToggle={timer.running ? timer.pause : timer.start}
            onReset={timer.reset}
            onSkip={timer.skip}
          />
        }

        task={
          <div className="w-full max-w-card">
            <ActiveTask
              task={activeTask}
              onComplete={completeTask}
              onOpenPanel={() => setIsTaskPanelOpen(true)}
            />
          </div>
        }
      />

      {/* BRAND */}
      <div className="absolute bottom-brand-y right-brand-x font-brand text-brand text-white/70 hover:text-white/90 transition-colors tracking-brand select-none">
        TAWT
      </div>

      <TaskPanel
        isOpen={isTaskPanelOpen}
        onClose={() => setIsTaskPanelOpen(false)}
      />

      <SettingsPanel />
    </main>
  );
}