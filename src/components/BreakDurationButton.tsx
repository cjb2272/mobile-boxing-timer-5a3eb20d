
import React, { useState, useRef } from 'react';

interface BreakDurationButtonProps {
  duration: number;
  isSelected: boolean;
  onSelect: (duration: number) => void;
  onEdit: (duration: number) => void;
}

const BreakDurationButton: React.FC<BreakDurationButtonProps> = ({
  duration,
  isSelected,
  onSelect,
  onEdit
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const hasFired = useRef(false);

  const handleMouseDown = () => {
    setIsPressed(true);
    hasFired.current = false;
    
    longPressTimer.current = setTimeout(() => {
      hasFired.current = true;
      onEdit(duration);
      setIsPressed(false);
    }, 500); // 500ms for long press
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    
    // Only trigger select if it wasn't a long press
    if (!hasFired.current) {
      onSelect(duration);
    }
  };

  const handleMouseLeave = () => {
    setIsPressed(false);
    
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      className={`
        px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
        ${isPressed ? 'scale-95' : ''}
        ${isSelected
          ? 'bg-red-600 text-white'
          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
        }
      `}
    >
      {duration}s
    </button>
  );
};

export default BreakDurationButton;
