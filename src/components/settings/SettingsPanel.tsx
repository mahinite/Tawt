import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useSettingsStore } from '../../store/settingsStore';
import { useUIStore } from '../../store/uiStore';
import { APP_VERSION } from '../../config/app_version';
import { CHANGELOG } from '../../meta/changelog';
import { Checkbox } from '../ui/Checkbox';
import { useClickOutside } from '../../hooks/useClickOutside';

export function SettingsPanel() {
  const isSettingsOpen = useUIStore(state => state.isSettingsOpen);
  const closeSettings = useUIStore(state => state.closeSettings);
  const settings = useSettingsStore();
  const [tempPomodoro, setTempPomodoro] = React.useState<string | number>(settings.pomodoroLength);
  const [tempShortBreak, setTempShortBreak] = React.useState<string | number>(settings.shortBreakLength);
  const [tempLongBreak, setTempLongBreak] = React.useState<string | number>(settings.longBreakLength);
  const [tempLongBreakInterval, setTempLongBreakInterval] = React.useState<string>(
    String(settings.longBreakInterval)
  );

  const settingsRef = useRef<HTMLDivElement>(null);
  useClickOutside(settingsRef, closeSettings);

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

  useEffect(() => {
    if (!isSettingsOpen) return;

    setTempPomodoro(settings.pomodoroLength);
    setTempShortBreak(settings.shortBreakLength);
    setTempLongBreak(settings.longBreakLength);
    setTempLongBreakInterval(String(settings.longBreakInterval));
  }, [isSettingsOpen]);

  if (!isSettingsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-panel-inset bg-black/70 backdrop-blur-md animate-fade-in">
      {/* Panel Container */}
      <div ref={settingsRef} className="w-full max-w-panel bg-[#0A0A0A] border border-white/25 shadow-2xl overflow-hidden flex flex-col max-h-panel-cap rounded-panel">

        {/* Header */}
        <div className="px-panel-x py-panel-y border-b border-white/5 flex items-center justify-between shrink-0">
          <h2 className="text-xl font-medium tracking-tight text-white">Settings</h2>
          <button
            onClick={closeSettings}
            className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <X className="size-panel-icon-close" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-panel-x py-panel-y space-y-panel-g-section scrollbar-hide">
          {/* Section: Durations */}
          <div className="space-y-panel-g-block">
            <h3 className="text-xs font-semibold tracking-wider text-white/40 uppercase">Durations (minutes)</h3>
            <div className="grid grid-cols-3 gap-panel-g">
              <div className="flex flex-col gap-panel-g-row">
                <label className="text-xs text-white/60 font-medium">Work</label>
                <input
                  type="number"
                  min="1"
                  max="90"
                  value={tempPomodoro}
                  onChange={(e) => setTempPomodoro(e.target.value)}
                  onBlur={() => {
                    const val = parseInt(tempPomodoro, 10);

                    const safe = isNaN(val)
                      ? 1
                      : Math.min(90, Math.max(1, val));

                    setTempPomodoro(String(safe));
                    settings.updateSettings({ pomodoroLength: safe });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      (e.target as HTMLInputElement).blur();
                    }
                  }}
                  className="bg-white/5 border border-white/10 rounded-field px-field-x py-field-y text-white focus:outline-none focus:border-white/30 transition-colors font-mono text-center text-sm"
                />
              </div>
              <div className="flex flex-col gap-panel-g-row">
                <label className="text-xs text-white/60 font-medium">Short Break</label>
                <input
                  type="number"
                  min="1"
                  max="90"
                  value={tempShortBreak}
                  onChange={(e) => setTempShortBreak(e.target.value)}
                  onBlur={() => {
                    const val = parseInt(tempShortBreak, 10);

                    const safe = isNaN(val)
                      ? 1
                      : Math.min(90, Math.max(1, val));

                    setTempShortBreak(String(safe));
                    settings.updateSettings({ shortBreakLength: safe });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      (e.target as HTMLInputElement).blur();
                    }
                  }}
                  className="bg-white/5 border border-white/10 rounded-field px-field-x py-field-y text-white focus:outline-none focus:border-white/30 transition-colors font-mono text-center text-sm"
                />
              </div>
              <div className="flex flex-col gap-panel-g-row">
                <label className="text-xs text-white/60 font-medium">Long Break</label>
                <input
                  type="number"
                  min="1"
                  max="90"
                  value={tempLongBreak}
                  onChange={(e) => setTempLongBreak(e.target.value)}
                  onBlur={() => {
                    const val = parseInt(tempLongBreak, 10);

                    const safe = isNaN(val)
                      ? 1
                      : Math.min(90, Math.max(1, val));

                    setTempLongBreak(String(safe));
                    settings.updateSettings({ longBreakLength: safe });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      (e.target as HTMLInputElement).blur();
                    }
                  }}
                  className="bg-white/5 border border-white/10 rounded-field px-field-x py-field-y text-white focus:outline-none focus:border-white/30 transition-colors font-mono text-center text-sm"
                />
              </div>
            </div>
          </div>

          {/* Section: Cycles */}
          <div className="space-y-panel-g-block pt-panel-g-block border-t border-white/5">
            <h3 className="text-xs font-semibold tracking-wider text-white/40 uppercase">Cycles</h3>
            <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-field p-panel-row-pad">
              <span className="text-sm text-white/80">Long break interval</span>
              <input
                type="number"
                min="0"
                value={tempLongBreakInterval}
                onChange={(e) => setTempLongBreakInterval(e.target.value)}
                onBlur={() => {
                  const val = parseInt(tempLongBreakInterval, 10);

                  const safe = isNaN(val) || val < 0 ? 0 : val;

                  setTempLongBreakInterval(String(safe));

                  settings.updateSettings({
                    longBreakInterval: safe
                  });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    (e.target as HTMLInputElement).blur();
                  }
                }}
                className="w-field-w-interval bg-white/5 border border-white/10 rounded-field-sm px-field-x-sm py-field-y-sm text-white focus:outline-none focus:border-white/30 transition-colors font-mono text-center text-sm"
              />
            </div>
          </div>

          {/* Section: Options & Toggles */}
          <div className="space-y-panel-g-block pt-panel-g-block border-t border-white/5">
            <h3 className="text-xs font-semibold tracking-wider text-white/40 uppercase">Options</h3>

            <div className="space-y-panel-g">
              <label className="flex items-center justify-between p-panel-row-pad bg-white/5 border border-white/10 rounded-field cursor-pointer hover:bg-white/10 transition-colors">
                <span className="text-sm text-white/80">Auto start breaks</span>
                <Checkbox
                  checked={settings.autoStartBreak}
                  onChange={(checked) => settings.updateSettings({ autoStartBreak: checked })}
                />
              </label>

              <label className="flex items-center justify-between p-panel-row-pad bg-white/5 border border-white/10 rounded-field cursor-pointer hover:bg-white/10 transition-colors">
                <span className="text-sm text-white/80">Auto start pomodoros</span>
                <Checkbox
                  checked={settings.autoStartPomodoro}
                  onChange={(checked) => settings.updateSettings({ autoStartPomodoro: checked })}
                />
              </label>

              <label className="flex items-center justify-between p-panel-row-pad bg-white/5 border border-white/10 rounded-field cursor-pointer hover:bg-white/10 transition-colors">
                <span className="text-sm text-white/80">Auto advance tasks</span>
                <Checkbox
                  checked={settings.autoAdvanceTask}
                  onChange={(checked) => settings.updateSettings({ autoAdvanceTask: checked })}
                />
              </label>

              <label className="flex items-center justify-between p-panel-row-pad bg-white/5 border border-white/10 rounded-field cursor-pointer hover:bg-white/10 transition-colors">
                <span className="text-sm text-white/80">Sound effects</span>
                <Checkbox
                  checked={settings.soundEnabled}
                  onChange={(checked) => settings.updateSettings({ soundEnabled: checked })}
                />
              </label>
            </div>
          </div>

          {/* Section: What's New */}
          <div className="space-y-panel-g-block pt-panel-g-block border-t border-white/5">
            <h3 className="text-xs font-semibold tracking-wider text-white/40 uppercase">What's New</h3>
            <div className="space-y-panel-g-section">
              {CHANGELOG.map(entry => (
                <div key={entry.version} className="space-y-panel-g-row opacity-90 hover:opacity-100 transition-opacity">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm font-medium">
                      {entry.title}
                    </span>
                    <span className="text-xs text-white/40">
                      {entry.version}
                    </span>
                  </div>
                  <ul className="pl-panel-indent list-disc text-xs text-white/50 space-y-1">
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
        <div className="px-panel-x py-panel-y-sm border-t border-white/5 bg-[#0A0A0A] grid grid-cols-3 items-center shrink-0">
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
