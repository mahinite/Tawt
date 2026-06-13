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
        <div className="absolute bottom-6 right-6 font-brand text-xl text-white/70 hover:text-white/90 transition-colors tracking-[0.35em] select-none">
          TAWT
        </div>

  {/* CENTER CONTENT */}
  <div className="flex flex-col items-center justify-center flex-1">
        <ModeSelector activeMode={timer.mode} onModeChange={timer.switchMode} />
        
        <TimerDisplay time={timer.formatting} />
        
        <TimerControls 
          isRunning={timer.running}
          onToggle={timer.running ? timer.pause : timer.start}
          onReset={timer.reset}
          onSettings={openSettings}
        />
        
        {/* Cycle Tracking UI */}
        <div className="flex items-center gap-1.5 text-xs font-mono text-white/40 mt-6 mb-4 select-none">
          <span>Cycles: {timer.cycleCount}</span>
          <button
            onClick={() => useTimerStore.setState({ cycleCount: 0 })}
            className="hover:text-white transition-colors p-0.5"
            title="Reset cycle count"
          >
            <RotateCcw size={12} />
          </button>
          <span>•</span>
          <span>Next: {nextLabel}</span>
        </div>
        
        {/* Task System Component (Dynamic & Decoupled) */}
        <ActiveTask 
          task={activeTask}
          onComplete={completeTask}
          onOpenPanel={() => setIsTaskPanelOpen(true)}
        />
      </div>

      <TaskPanel 
        isOpen={isTaskPanelOpen}
        onClose={() => setIsTaskPanelOpen(false)}
      />

      <SettingsPanel />
    </main>
  );
}
