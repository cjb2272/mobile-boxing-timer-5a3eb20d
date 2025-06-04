
import React, { useState, useEffect, useCallback } from 'react';
import TimerButton from './TimerButton';
import MainTimer from './MainTimer';
import ControlPanel from './ControlPanel';
import TimerEditDialog from './TimerEditDialog';
import TimerSelector from './TimerSelector';
import { useAppSettings } from '../hooks/useAppSettings';

interface Timer {
  id: number;
  label: string;
  duration: number;
}

const TimerContainer: React.FC = () => {
  const {
    settings,
    updateTimers,
    updateBreakOptions,
    updateAutoLoop,
    updateBreakDuration,
    updateSelectedTimerId,
    updateRoundCount,
  } = useAppSettings();

  // Extract settings for easier access
  const {
    timers,
    breakOptions,
    autoLoop,
    breakDuration,
    selectedTimerId: activeTimerId,
    roundCount,
  } = settings;

  const [currentTime, setCurrentTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingTimer, setEditingTimer] = useState<Timer | null>(null);
  const [nextTimerId, setNextTimerId] = useState(() => {
    return Math.max(...timers.map(t => t.id)) + 1;
  });

  // Timer functionality
  const activeTimer = timers.find(t => t.id === activeTimerId);

  // Initialize current time when active timer changes
  useEffect(() => {
    if (activeTimer && !isRunning) {
      setCurrentTime(activeTimer.duration);
    }
  }, [activeTimer, isRunning]);

  const selectTimer = (timerId: number) => {
    if (activeTimerId === timerId) {
      // Toggle play/pause for active timer
      setIsRunning(!isRunning);
    } else {
      // Select new timer
      updateSelectedTimerId(timerId);
      const timer = timers.find(t => t.id === timerId);
      setCurrentTime(timer?.duration || 0);
      setIsRunning(false);
      setIsBreak(false);
      // Reset round count when switching timers
      updateRoundCount(0);
    }
  };

  const handleTimerSelect = (value: string) => {
    if (value === 'add-new') {
      handleAddTimer();
      return;
    }
    
    if (value.startsWith('delete-')) {
      const timerId = parseInt(value.replace('delete-', ''));
      handleDeleteTimer(timerId);
      return;
    }
    
    const timerId = parseInt(value);
    selectTimer(timerId);
  };

  const handleAddTimer = () => {
    const newTimer: Timer = {
      id: nextTimerId,
      label: `New Timer`,
      duration: 60 // Default to 1 minute
    };
    updateTimers([...timers, newTimer]);
    setNextTimerId(prev => prev + 1);
    setEditingTimer(newTimer);
    setEditDialogOpen(true);
  };

  const handleDeleteTimer = (timerId: number) => {
    if (timers.length <= 1) {
      return; // Don't allow deleting if it's the last timer
    }
    
    const newTimers = timers.filter(timer => timer.id !== timerId);
    updateTimers(newTimers);
    
    // If we're deleting the active timer, reset
    if (activeTimerId === timerId) {
      updateSelectedTimerId(null);
      setCurrentTime(0);
      setIsRunning(false);
      setIsBreak(false);
      updateRoundCount(0);
    }
  };

  const handleLongPress = (timer: Timer) => {
    setEditingTimer(timer);
    setEditDialogOpen(true);
  };

  const handleSaveTimer = (id: number, label: string, duration: number) => {
    const newTimers = timers.map(timer => 
      timer.id === id 
        ? { ...timer, label, duration }
        : timer
    );
    updateTimers(newTimers);
    
    // If we're editing the currently active timer, update current time
    if (activeTimerId === id && !isRunning) {
      setCurrentTime(duration);
    }
  };

  const toggleTimer = () => {
    console.log('toggleTimer called - currentTime:', currentTime, 'isRunning:', isRunning, 'activeTimer:', activeTimer?.label);
    
    if (!isRunning && currentTime === 0 && activeTimer) {
      // Timer has finished and user wants to restart it
      console.log('Restarting finished timer, resetting currentTime to:', activeTimer.duration);
      setCurrentTime(activeTimer.duration);
      setIsRunning(true);
    } else {
      // Normal toggle behavior
      setIsRunning(!isRunning);
    }
  };

  const startBreak = useCallback(() => {
    console.log('Starting break with duration:', breakDuration);
    setIsBreak(true);
    setCurrentTime(breakDuration);
    setIsRunning(true);
  }, [breakDuration]);

  const endBreak = useCallback(() => {
    console.log('Ending break, completing round. Round count will be:', roundCount + 1);
    setIsBreak(false);
    // Increment round count when break ends (completing a full cycle)
    const newRoundCount = roundCount + 1;
    updateRoundCount(newRoundCount);
    if (activeTimer) {
      setCurrentTime(activeTimer.duration);
      setIsRunning(true);
    }
  }, [activeTimer, roundCount, updateRoundCount]);

  // Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          console.log('Timer tick - currentTime:', prev, 'isBreak:', isBreak, 'autoLoop:', autoLoop);
          
          if (prev <= 1) {
            console.log('Timer reached 0, stopping. AutoLoop:', autoLoop, 'isBreak:', isBreak);
            setIsRunning(false);
            
            if (autoLoop) {
              if (isBreak) {
                // Break ended, start timer again
                console.log('Auto-loop: Break ended, starting timer');
                setTimeout(endBreak, 100);
              } else {
                // Timer ended, start break
                console.log('Auto-loop: Timer ended, starting break');
                setTimeout(startBreak, 100);
              }
            }
            
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, currentTime, autoLoop, isBreak, startBreak, endBreak]);

  return (
    <>
      {/* Single Large Timer Display */}
      {activeTimer && (
        <div className="mb-4">
          <TimerButton
            label={activeTimer.label}
            duration={activeTimer.duration}
            isActive={true}
            isRunning={isRunning && !isBreak}
            currentTime={!isBreak ? currentTime : activeTimer.duration}
            onClick={() => selectTimer(activeTimer.id)}
            onLongPress={() => handleLongPress(activeTimer)}
            size="large"
          />
        </div>
      )}

      {/* Timer Selection Dropdown */}
      <TimerSelector
        timers={timers}
        activeTimerId={activeTimerId}
        onTimerSelect={handleTimerSelect}
        onDeleteTimer={handleDeleteTimer}
      />

      {/* Main Timer Display */}
      <div className="mb-8">
        <MainTimer
          currentTime={currentTime}
          totalTime={isBreak ? breakDuration : (activeTimer?.duration || 0)}
          isRunning={isRunning}
          isBreak={isBreak}
          activeTimerLabel={isBreak ? 'BREAK' : (activeTimer?.label || '')}
          roundCount={roundCount}
          onToggle={toggleTimer}
        />
      </div>

      {/* Control Panel */}
      <ControlPanel
        autoLoop={autoLoop}
        breakDuration={breakDuration}
        breakOptions={breakOptions}
        onToggleAutoLoop={() => updateAutoLoop(!autoLoop)}
        onBreakDurationChange={updateBreakDuration}
        onBreakOptionsChange={updateBreakOptions}
      />

      {/* Timer Edit Dialog */}
      <TimerEditDialog
        isOpen={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        timer={editingTimer}
        onSave={handleSaveTimer}
      />
    </>
  );
};

export default TimerContainer;
