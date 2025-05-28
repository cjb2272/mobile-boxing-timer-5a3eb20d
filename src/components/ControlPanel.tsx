
import React from 'react';

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
  const breakOptions = [15, 30, 45, 60, 90, 120];

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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Break Duration
          </label>
          <div className="grid grid-cols-3 gap-2">
            {breakOptions.map((duration) => (
              <button
                key={duration}
                onClick={() => onBreakDurationChange(duration)}
                className={`
                  px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${breakDuration === duration
                    ? 'bg-red-600 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
                  }
                `}
              >
                {duration}s
              </button>
            ))}
          </div>
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
