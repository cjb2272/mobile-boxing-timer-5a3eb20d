
import React, { useState } from 'react';
import TimeInput from './TimeInput';

interface ControlPanelProps {
  autoLoop: boolean;
  breakDuration: number;
  onToggleAutoLoop: () => void;
  onBreakDurationChange: (duration: number) => void;
  onThemeToggle: () => void;
  isDark: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  autoLoop,
  breakDuration,
  onToggleAutoLoop,
  onBreakDurationChange,
  onThemeToggle,
  isDark
}) => {
  const [breakMinutes, setBreakMinutes] = useState(Math.floor(breakDuration / 60));
  const [breakSeconds, setBreakSeconds] = useState(breakDuration % 60);

  const handleBreakTimeChange = (minutes: number, seconds: number) => {
    const totalSeconds = minutes * 60 + seconds;
    onBreakDurationChange(totalSeconds);
  };

  const handleMinutesChange = (minutes: number) => {
    setBreakMinutes(minutes);
    handleBreakTimeChange(minutes, breakSeconds);
  };

  const handleSecondsChange = (seconds: number) => {
    setBreakSeconds(seconds);
    handleBreakTimeChange(breakMinutes, seconds);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <span className="font-medium text-gray-700 dark:text-gray-300">Auto Loop</span>
        <button
          onClick={onToggleAutoLoop}
          className={`
            relative inline-flex h-6 w-11 items-center rounded-full transition-colors
            ${autoLoop ? 'bg-red-600' : 'bg-gray-300 dark:bg-gray-600'}
          `}
        >
          <span
            className={`
              inline-block h-4 w-4 transform rounded-full bg-white transition-transform
              ${autoLoop ? 'translate-x-6' : 'translate-x-1'}
            `}
          />
        </button>
      </div>

      {autoLoop && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <TimeInput
            minutes={breakMinutes}
            seconds={breakSeconds}
            onMinutesChange={handleMinutesChange}
            onSecondsChange={handleSecondsChange}
            label="Break Duration"
          />
        </div>
      )}

      <button
        onClick={onThemeToggle}
        className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
    </div>
  );
};

export default ControlPanel;
