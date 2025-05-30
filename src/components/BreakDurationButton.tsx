
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
    <div className="relative group">
      <button
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        className={`
          px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border relative
          ${isPressed ? 'scale-95' : ''}
          ${isSelected
            ? 'bg-primary text-primary-foreground border-primary'
            : 'bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground'
          }
        `}
      >
        {duration}s
        {/* Long press indicator */}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-muted-foreground rounded-full opacity-60 group-hover:opacity-100 transition-opacity" 
             title="Hold to edit" />
      </button>
      
      {/* Tooltip for desktop users */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        Hold to edit
      </div>
    </div>
  );
};

export default BreakDurationButton;
