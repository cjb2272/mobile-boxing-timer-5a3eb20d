
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface BreakEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentDuration: number;
  onSave: (duration: number) => void;
}

const BreakEditDialog: React.FC<BreakEditDialogProps> = ({
  isOpen,
  onClose,
  currentDuration,
  onSave
}) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setMinutes(Math.floor(currentDuration / 60));
      setSeconds(currentDuration % 60);
    }
  }, [isOpen, currentDuration]);

  const handleSave = () => {
    const totalSeconds = minutes * 60 + seconds;
    if (totalSeconds > 0) {
      onSave(totalSeconds);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Break Duration</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 p-2">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Duration
            </label>
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <label className="block text-xs mb-1 text-gray-500">Minutes</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={minutes}
                  onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
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
                  onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
                  className="w-full p-3 text-lg text-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

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

export default BreakEditDialog;
