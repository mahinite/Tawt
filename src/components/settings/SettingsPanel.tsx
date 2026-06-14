import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useSettingsStore } from '../../store/settingsStore';
import { useUIStore } from '../../store/uiStore';
import { APP_VERSION } from '../../config/app_version';
import { CHANGELOG } from '../../meta/changelog';

export function SettingsPanel() {
  const isSettingsOpen = useUIStore(state => state.isSettingsOpen);
  const closeSettings = useUIStore(state => state.closeSettings);
  const settings = useSettingsStore();

  useEffect(() => {
    if (!isSettingsOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeSettings();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSettingsOpen, closeSettings]);

  if (!isSettingsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      {/* Panel Container */}
      <div className="w-full max-w-[420px] bg-[#0A0A0A] border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] rounded-[32px]">
        
        {/* Header */}
        <div className="px-6 py-6 border-b border-white/5 flex items-center justify-between shrink-0">
          <h2 className="text-xl font-medium tracking-tight text-white">Settings</h2>
          <button
            onClick={closeSettings}
            className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 pb-6 space-y-6 scrollbar-hide">
          {/* Section: Durations */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-wider text-white/30 uppercase">Durations (minutes)</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-white/60 font-medium">Work</label>
                <input
                  type="number"
                  min="1"
                  value={settings.pomodoroLength}
                  onChange={(e) => settings.updateSettings({ pomodoroLength: Math.max(1, parseInt(e.target.value, 10) || 1) })}
                  className="bg-white/5 border border-white/10 rounded-2xl px-3 py-2 text-white focus:outline-none focus:border-white/30 transition-colors font-mono text-center text-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-white/60 font-medium">Short Break</label>
                <input
                  type="number"
                  min="1"
                  value={settings.shortBreakLength}
                  onChange={(e) => settings.updateSettings({ shortBreakLength: Math.max(1, parseInt(e.target.value, 10) || 1) })}
                  className="bg-white/5 border border-white/10 rounded-2xl px-3 py-2 text-white focus:outline-none focus:border-white/30 transition-colors font-mono text-center text-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-white/60 font-medium">Long Break</label>
                <input
                  type="number"
                  min="1"
                  value={settings.longBreakLength}
                  onChange={(e) => settings.updateSettings({ longBreakLength: Math.max(1, parseInt(e.target.value, 10) || 1) })}
                  className="bg-white/5 border border-white/10 rounded-2xl px-3 py-2 text-white focus:outline-none focus:border-white/30 transition-colors font-mono text-center text-sm"
                />
              </div>
            </div>
          </div>

          {/* Section: Cycles */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <h3 className="text-xs font-semibold tracking-wider text-white/30 uppercase">Cycles</h3>
            <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-4">
              <span className="text-sm text-white/80">Long break interval</span>
              <input
                type="number"
                min="1"
                value={settings.longBreakInterval}
                onChange={(e) => settings.updateSettings({ longBreakInterval: Math.max(1, parseInt(e.target.value, 10) || 1) })}
                className="w-16 bg-white/5 border border-white/10 rounded-xl px-2 py-1 text-white focus:outline-none focus:border-white/30 transition-colors font-mono text-center text-sm"
              />
            </div>
          </div>

          {/* Section: Options & Toggles */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <h3 className="text-xs font-semibold tracking-wider text-white/30 uppercase">Options</h3>
            
            <div className="space-y-3">
              <label className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors">
                <span className="text-sm text-white/80">Auto start breaks</span>
                <input
                  type="checkbox"
                  checked={settings.autoStartBreak}
                  onChange={(e) => settings.updateSettings({ autoStartBreak: e.target.checked })}
                  className="w-5 h-5 accent-gray-300 cursor-pointer rounded"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors">
                <span className="text-sm text-white/80">Auto start pomodoros</span>
                <input
                  type="checkbox"
                  checked={settings.autoStartPomodoro}
                  onChange={(e) => settings.updateSettings({ autoStartPomodoro: e.target.checked })}
                  className="w-5 h-5 accent-gray-300 cursor-pointer rounded"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors">
                <span className="text-sm text-white/80">Auto advance tasks</span>
                <input
                  type="checkbox"
                  checked={settings.autoAdvanceTask}
                  onChange={(e) => settings.updateSettings({ autoAdvanceTask: e.target.checked })}
                  className="w-5 h-5 accent-gray-300 cursor-pointer rounded"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors">
                <span className="text-sm text-white/80">Sound effects</span>
                <input
                  type="checkbox"
                  checked={settings.soundEnabled}
                  onChange={(e) => settings.updateSettings({ soundEnabled: e.target.checked })}
                  className="w-5 h-5 accent-gray-300 cursor-pointer rounded"
                />
              </label>
            </div>
          </div>

          {/* Section: What's New */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <h3 className="text-xs font-semibold tracking-wider text-white/30 uppercase">What's New</h3>
            <div className="space-y-6">
              {CHANGELOG.map(entry => (
                <div key={entry.version} className="space-y-2 opacity-90 hover:opacity-100 transition-opacity">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm font-medium">
                      {entry.title}
                    </span>
                    <span className="text-xs text-white/40">
                      {entry.version}
                    </span>
                  </div>
                  <ul className="pl-4 list-disc text-xs text-white/50 space-y-1">
                    {entry.changes.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/5 bg-[#0A0A0A] grid grid-cols-3 items-center shrink-0">
          <div />
          <span className="text-xs text-white/50 hover:text-white/80 transition-colors font-mono text-center">
            TAWT {APP_VERSION}
          </span>
          <div className="flex justify-end">
            <button
              onClick={() => window.open('https://forms.gle/umPB23UqTPCzZmvJA', '_blank')}
              className="text-xs text-white/50 hover:text-white/80 transition-colors"
            >
              Send Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
