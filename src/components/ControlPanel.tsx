
import React, { useState } from 'react';
import BreakDurationButton from './BreakDurationButton';
import BreakEditDialog from './BreakEditDialog';
import ThemeSelector from './ThemeSelector';

interface ControlPanelProps {
  autoLoop: boolean;
  breakDuration: number;
  onToggleAutoLoop: () => void;
  onBreakDurationChange: (duration: number) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  autoLoop,
  breakDuration,
  onToggleAutoLoop,
  onBreakDurationChange,
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
      <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border shadow-sm">
        <span className="font-medium text-card-foreground">Auto Loop</span>
        <button
          onClick={onToggleAutoLoop}
          className={`
            relative inline-flex h-6 w-11 items-center rounded-full transition-colors
            ${autoLoop ? 'bg-primary' : 'bg-muted'}
          `}
        >
          <span
            className={`
              inline-block h-4 w-4 transform rounded-full bg-background transition-transform
              ${autoLoop ? 'translate-x-6' : 'translate-x-1'}
            `}
          />
        </button>
      </div>

      {autoLoop && (
        <div className="p-4 bg-card rounded-xl border border-border shadow-sm">
          <div className="mb-3">
            <label className="block text-sm font-medium text-card-foreground mb-1">
              Break Duration
            </label>
            <p className="text-xs text-muted-foreground">
              Tap to select • Hold to edit
            </p>
          </div>
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

      <div className="p-4 bg-card rounded-xl border border-border shadow-sm">
        <ThemeSelector />
      </div>

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
