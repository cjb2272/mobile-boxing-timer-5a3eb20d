
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import TimeInput from './TimeInput';

interface TimerEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  timer: {
    id: number;
    label: string;
    duration: number;
  } | null;
  onSave: (id: number, label: string, duration: number) => void;
}

const TimerEditDialog: React.FC<TimerEditDialogProps> = ({
  isOpen,
  onClose,
  timer,
  onSave
}) => {
  const [label, setLabel] = useState('');
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (timer) {
      setLabel(timer.label);
      setMinutes(Math.floor(timer.duration / 60));
      setSeconds(timer.duration % 60);
    }
  }, [timer]);

  const handleSave = () => {
    if (timer) {
      const totalSeconds = minutes * 60 + seconds;
      onSave(timer.id, label, totalSeconds);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Timer</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 p-2">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Timer Name
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full p-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Enter timer name"
            />
          </div>

          <TimeInput
            minutes={minutes}
            seconds={seconds}
            onMinutesChange={setMinutes}
            onSecondsChange={setSeconds}
            label="Duration"
          />

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 p-3 text-lg font-medium border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 p-3 text-lg font-medium bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Save
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TimerEditDialog;
