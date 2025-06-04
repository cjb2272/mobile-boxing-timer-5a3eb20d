
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Minus } from 'lucide-react';

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
}

const TimerSelector: React.FC<TimerSelectorProps> = ({
  timers,
  activeTimerId,
  onTimerSelect,
  onDeleteTimer,
}) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-foreground mb-2">
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
      
      {/* Delete buttons outside of Select */}
      {timers.length > 1 && (
        <div className="mt-2 space-y-1">
          <p className="text-xs text-muted-foreground mb-1">Delete timer:</p>
          <div className="flex flex-wrap gap-1">
            {timers.map((timer) => (
              <button
                key={`delete-${timer.id}`}
                onClick={() => onDeleteTimer(timer.id)}
                className="flex items-center gap-1 px-2 py-1 text-xs bg-destructive/10 text-destructive rounded hover:bg-destructive/20 transition-colors"
              >
                <Minus size={12} />
                {timer.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimerSelector;
