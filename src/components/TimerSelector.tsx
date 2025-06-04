
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Minus, Edit } from 'lucide-react';

interface Timer {
  id: number;
  label: string;
  duration: number;
}

interface TimerSelectorProps {
  timers: Timer[];
  activeTimerId: number | null;
  onTimerSelect: (value: string) => void;
  onDeleteTimer: (timerId: number) => void;
  onEditTimer: (timer: Timer) => void;
}

const TimerSelector: React.FC<TimerSelectorProps> = ({
  timers,
  activeTimerId,
  onTimerSelect,
  onDeleteTimer,
  onEditTimer,
}) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const selectedTimer = timers.find(t => t.id === activeTimerId);

  return (
    <div className="mb-6 p-4 bg-card rounded-xl border border-border shadow-sm">
      <label className="block text-sm font-medium text-card-foreground mb-2">
        Select Timer Preset
      </label>
      
      <Select value={activeTimerId?.toString() || ""} onValueChange={onTimerSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose a timer preset" />
        </SelectTrigger>
        <SelectContent>
          {timers.map((timer) => (
            <SelectItem key={timer.id} value={timer.id.toString()}>
              {timer.label} ({formatTime(timer.duration)})
            </SelectItem>
          ))}
          <SelectItem value="add-new" className="border-t border-border mt-1 pt-1">
            <div className="flex items-center gap-2 text-foreground">
              <Plus size={16} />
              <span>Add New Timer</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
      
      {/* Timer Actions */}
      {selectedTimer && (
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={() => onEditTimer(selectedTimer)}
            className="flex items-center gap-1 px-3 py-1 text-xs bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors"
          >
            <Edit size={12} />
            Edit "{selectedTimer.label}"
          </button>
          
          {timers.length > 1 && (
            <button
              onClick={() => onDeleteTimer(selectedTimer.id)}
              className="flex items-center gap-1 px-3 py-1 text-xs bg-destructive/10 text-destructive rounded hover:bg-destructive/20 transition-colors"
            >
              <Minus size={12} />
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TimerSelector;
