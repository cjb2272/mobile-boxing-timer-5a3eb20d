
import React, { useRef } from 'react';
import { Play, Pause } from 'lucide-react';

interface TimerButtonProps {
  label: string;
  duration: number;
  isActive: boolean;
  isRunning: boolean;
  currentTime: number;
  onClick: () => void;
  onLongPress: () => void;
  size?: 'large' | 'small';
}

const TimerButton: React.FC<TimerButtonProps> = ({
  label,
  duration,
  isActive,
  isRunning,
  currentTime,
  onClick,
  onLongPress,
  size = 'large'
}) => {
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = isActive ? ((duration - currentTime) / duration) * 100 : 0;

  const handleTouchStart = () => {
    longPressTimer.current = setTimeout(() => {
      onLongPress();
    }, 800); // 800ms for long press
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleClick = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
      onClick();
    }
  };

  const sizeClasses = size === 'large' 
    ? 'min-h-[100px] p-6' 
    : 'min-h-[80px] p-4';

  const textSizes = size === 'large'
    ? 'text-xl'
    : 'text-lg';

  return (
    <button
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
      className={`
        relative overflow-hidden rounded-xl w-full ${sizeClasses}
        transition-all duration-200 transform active:scale-95
        ${isActive 
          ? 'bg-red-600 dark:bg-red-500 text-white shadow-lg scale-105' 
          : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
        }
        border-2 ${isActive ? 'border-red-400' : 'border-transparent'}
      `}
    >
      {isActive && (
        <div 
          className="absolute bottom-0 left-0 h-1 bg-white/30 transition-all duration-1000 ease-linear"
          style={{ width: `${progress}%` }}
        />
      )}
      
      <div className="flex items-center justify-between">
        <div className="text-left">
          <div className={`font-bold ${textSizes}`}>{label}</div>
          <div className="text-sm opacity-75">
            {isActive ? formatTime(currentTime) : formatTime(duration)}
          </div>
        </div>
        
        {isActive && (
          <div className="ml-2">
            {isRunning ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </div>
        )}
      </div>
    </button>
  );
};

export default TimerButton;
