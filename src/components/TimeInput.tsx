
import React from 'react';

interface TimeInputProps {
  minutes: number;
  seconds: number;
  onMinutesChange: (minutes: number) => void;
  onSecondsChange: (seconds: number) => void;
  label?: string;
}

const TimeInput: React.FC<TimeInputProps> = ({
  minutes,
  seconds,
  onMinutesChange,
  onSecondsChange,
  label
}) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <label className="block text-xs mb-1 text-gray-500">Minutes</label>
          <input
            type="number"
            min="0"
            max="59"
            value={minutes}
            onChange={(e) => onMinutesChange(parseInt(e.target.value) || 0)}
            className="w-full p-3 text-lg text-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
        <span className="text-2xl font-bold text-gray-600 dark:text-gray-400">:</span>
        <div className="flex-1">
          <label className="block text-xs mb-1 text-gray-500">Seconds</label>
          <input
            type="number"
            min="0"
            max="59"
            value={seconds}
            onChange={(e) => onSecondsChange(parseInt(e.target.value) || 0)}
            className="w-full p-3 text-lg text-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default TimeInput;
