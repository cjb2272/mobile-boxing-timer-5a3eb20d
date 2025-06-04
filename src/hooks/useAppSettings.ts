
import { useLocalStorage } from './useLocalStorage';

interface Timer {
  id: number;
  label: string;
  duration: number;
}

interface AppSettings {
  version: string;
  timers: Timer[];
  breakOptions: number[];
  autoLoop: boolean;
  breakDuration: number;
  selectedTimerId: number | null;
  roundCount: number;
}

const defaultSettings: AppSettings = {
  version: '1.0',
  timers: [
    { id: 1, label: '30 Second Round', duration: 30 },
    { id: 2, label: '45 Second Round', duration: 45 },
    { id: 3, label: '1 Minute Round', duration: 60 },
  ],
  breakOptions: [15, 30, 45, 60, 90, 120],
  autoLoop: false,
  breakDuration: 30,
  selectedTimerId: null,
  roundCount: 0,
};

export function useAppSettings() {
  const [settings, setSettings] = useLocalStorage<AppSettings>('boxingTimer-settings', defaultSettings);

  // Helper functions to update specific parts of settings
  const updateTimers = (timers: Timer[]) => {
    setSettings(prev => ({ ...prev, timers }));
  };

  const updateBreakOptions = (breakOptions: number[]) => {
    setSettings(prev => ({ ...prev, breakOptions }));
  };

  const updateAutoLoop = (autoLoop: boolean) => {
    setSettings(prev => ({ ...prev, autoLoop }));
  };

  const updateBreakDuration = (breakDuration: number) => {
    setSettings(prev => ({ ...prev, breakDuration }));
  };

  const updateSelectedTimerId = (selectedTimerId: number | null) => {
    setSettings(prev => ({ ...prev, selectedTimerId }));
  };

  const updateRoundCount = (roundCount: number) => {
    setSettings(prev => ({ ...prev, roundCount }));
  };

  const resetToDefaults = () => {
    setSettings(defaultSettings);
  };

  return {
    settings,
    updateTimers,
    updateBreakOptions,
    updateAutoLoop,
    updateBreakDuration,
    updateSelectedTimerId,
    updateRoundCount,
    resetToDefaults,
  };
}
