
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
            <div key={timer.id} className="flex items-center group">
              <SelectItem value={timer.id.toString()} className="flex-1">
                {timer.label} ({Math.floor(timer.duration / 60)}:{(timer.duration % 60).toString().padStart(2, '0')})
              </SelectItem>
              {timers.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteTimer(timer.id);
                  }}
                  className="p-1 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Minus size={16} />
                </button>
              )}
            </div>
          ))}
          <SelectItem value="add-new" className="border-t border-border mt-1 pt-1">
            <div className="flex items-center gap-2 text-foreground">
              <Plus size={16} />
              <span>Add New Timer</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TimerSelector;
