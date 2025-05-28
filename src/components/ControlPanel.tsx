
import React, { useState } from 'react';
import BreakDurationButton from './BreakDurationButton';
import BreakEditDialog from './BreakEditDialog';

interface ControlPanelProps {
  autoLoop: boolean;
  breakDuration: number;
  onToggleAutoLoop: () => void;
  onBreakDurationChange: (duration: number) => void;
  onThemeToggle: () => void;
  isDark: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  autoLoop,
  breakDuration,
  onToggleAutoLoop,
  onBreakDurationChange,
  onThemeToggle,
  isDark
}) => {
  const [breakOptions, setBreakOptions] = useState([15, 30, 45, 60, 90, 120]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleBreakEdit = (duration: number) => {
    const index = breakOptions.indexOf(duration);
    if (index !== -1) {
      setEditingIndex(index);
      setEditDialogOpen(true);
    }
  };

  const handleSaveBreakDuration = (newDuration: number) => {
    if (editingIndex !== null) {
      const newOptions = [...breakOptions];
      const oldDuration = newOptions[editingIndex];
      newOptions[editingIndex] = newDuration;
      setBreakOptions(newOptions);
      
      // If the edited duration was the currently selected one, update it
      if (breakDuration === oldDuration) {
        onBreakDurationChange(newDuration);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <span className="font-medium text-gray-700 dark:text-gray-300">Auto Loop</span>
        <button
          onClick={onToggleAutoLoop}
          className={`
            relative inline-flex h-6 w-11 items-center rounded-full transition-colors
            ${autoLoop ? 'bg-red-600' : 'bg-gray-300 dark:bg-gray-600'}
          `}
        >
          <span
            className={`
              inline-block h-4 w-4 transform rounded-full bg-white transition-transform
              ${autoLoop ? 'translate-x-6' : 'translate-x-1'}
            `}
          />
        </button>
      </div>

      {autoLoop && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Break Duration
          </label>
          <div className="grid grid-cols-3 gap-2">
            {breakOptions.map((duration) => (
              <BreakDurationButton
                key={duration}
                duration={duration}
                isSelected={breakDuration === duration}
                onSelect={onBreakDurationChange}
                onEdit={handleBreakEdit}
              />
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onThemeToggle}
        className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      <BreakEditDialog
        isOpen={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        currentDuration={editingIndex !== null ? breakOptions[editingIndex] : 0}
        onSave={handleSaveBreakDuration}
      />
    </div>
  );
};

export default ControlPanel;
