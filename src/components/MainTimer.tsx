
import React from 'react';
import { Play, Pause } from 'lucide-react';

interface MainTimerProps {
  currentTime: number;
  totalTime: number;
  isRunning: boolean;
  isBreak: boolean;
  activeTimerLabel: string;
  onToggle: () => void;
}

const MainTimer: React.FC<MainTimerProps> = ({
  currentTime,
  totalTime,
  isRunning,
  isBreak,
  activeTimerLabel,
  onToggle
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = totalTime > 0 ? ((totalTime - currentTime) / totalTime) * 100 : 0;

  return (
    <div className="text-center">
      <div className={`text-sm font-medium mb-2 ${isBreak ? 'text-amber-600 dark:text-amber-400' : 'text-gray-600 dark:text-gray-400'}`}>
        {isBreak ? 'BREAK TIME' : activeTimerLabel || 'SELECT TIMER'}
      </div>
      
      <div 
        className={`
          text-8xl md:text-9xl font-mono font-bold mb-6 leading-none
          ${isBreak 
            ? 'text-amber-600 dark:text-amber-400' 
            : 'text-gray-900 dark:text-white'
          }
        `}
      >
        {formatTime(currentTime)}
      </div>

      {totalTime > 0 && (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-6">
          <div 
            className={`h-2 rounded-full transition-all duration-1000 ease-linear ${
              isBreak ? 'bg-amber-500' : 'bg-red-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <button
        onClick={onToggle}
        disabled={!activeTimerLabel}
        className={`
          w-32 h-32 rounded-full flex items-center justify-center
          transition-all duration-200 transform active:scale-95
          ${!activeTimerLabel 
            ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed' 
            : isRunning 
              ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg' 
              : 'bg-green-600 hover:bg-green-700 text-white shadow-lg'
          }
        `}
      >
        {isRunning ? (
          <Pause className="w-12 h-12" />
        ) : (
          <Play className="w-12 h-12 ml-1" />
        )}
      </button>
    </div>
  );
};

export default MainTimer;
