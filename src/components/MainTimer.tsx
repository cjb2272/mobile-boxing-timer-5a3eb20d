
import React from 'react';
import { Play, Pause } from 'lucide-react';

interface MainTimerProps {
  currentTime: number;
  totalTime: number;
  isRunning: boolean;
  isBreak: boolean;
  activeTimerLabel: string;
  roundCount: number;
  onToggle: () => void;
}

const MainTimer: React.FC<MainTimerProps> = ({
  currentTime,
  totalTime,
  isRunning,
  isBreak,
  activeTimerLabel,
  roundCount,
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
      <div className={`text-sm font-medium mb-2 ${isBreak ? 'text-amber-600 dark:text-amber-400' : 'text-muted-foreground'}`}>
        {isBreak ? 'BREAK TIME' : activeTimerLabel || 'SELECT TIMER'}
      </div>

      {/* Large Round Counter */}
      {activeTimerLabel && (
        <div className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
          Round {roundCount}
        </div>
      )}
      
      <div 
        className={`
          text-8xl md:text-9xl font-mono font-bold mb-6 leading-none
          ${isBreak 
            ? 'text-amber-600 dark:text-amber-400' 
            : 'text-foreground'
          }
        `}
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {formatTime(currentTime)}
      </div>

      {totalTime > 0 && (
        <div className="w-full bg-muted rounded-full h-2 mb-6">
          <div 
            className={`h-2 rounded-full transition-all duration-1000 ease-linear ${
              isBreak ? 'bg-amber-500' : 'bg-primary'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={onToggle}
          disabled={!activeTimerLabel}
          className={`
            w-32 h-32 rounded-full flex items-center justify-center
            transition-all duration-200 transform active:scale-95
            ${!activeTimerLabel 
              ? 'bg-muted text-muted-foreground cursor-not-allowed' 
              : isRunning 
                ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg' 
                : 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg'
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
    </div>
  );
};

export default MainTimer;
