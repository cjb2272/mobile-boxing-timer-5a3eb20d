import React, { useState, useEffect, useCallback } from 'react';
import TimerButton from '../components/TimerButton';
import MainTimer from '../components/MainTimer';
import ControlPanel from '../components/ControlPanel';
import TimerEditDialog from '../components/TimerEditDialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

interface Timer {
  id: number;
  label: string;
  duration: number;
}

const Index = () => {
  const [isDark, setIsDark] = useState(false);
  const [timers, setTimers] = useState<Timer[]>([
    { id: 1, label: 'Round 1', duration: 180 }, // 3 minutes
    { id: 2, label: 'Round 2', duration: 300 }, // 5 minutes
    { id: 3, label: 'HIIT', duration: 30 },     // 30 seconds
    { id: 4, label: 'Rest', duration: 60 },     // 1 minute
    { id: 5, label: 'Warm Up', duration: 600 }, // 10 minutes
  ]);

  const [activeTimerId, setActiveTimerId] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [autoLoop, setAutoLoop] = useState(false);
  const [breakDuration, setBreakDuration] = useState(30);
  const [isBreak, setIsBreak] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingTimer, setEditingTimer] = useState<Timer | null>(null);
  const [roundCount, setRoundCount] = useState(0);

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('boxingTimer-theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('boxingTimer-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('boxingTimer-theme', 'light');
    }
  };

  // Timer functionality
  const activeTimer = timers.find(t => t.id === activeTimerId);

  const selectTimer = (timerId: number) => {
    if (activeTimerId === timerId) {
      // Toggle play/pause for active timer
      setIsRunning(!isRunning);
    } else {
      // Select new timer
      setActiveTimerId(timerId);
      const timer = timers.find(t => t.id === timerId);
      setCurrentTime(timer?.duration || 0);
      setIsRunning(false);
      setIsBreak(false);
      // Reset round count when switching timers
      setRoundCount(0);
    }
  };

  const handleTimerSelect = (value: string) => {
    const timerId = parseInt(value);
    selectTimer(timerId);
  };

  const handleLongPress = (timer: Timer) => {
    setEditingTimer(timer);
    setEditDialogOpen(true);
  };

  const handleSaveTimer = (id: number, label: string, duration: number) => {
    setTimers(prev => prev.map(timer => 
      timer.id === id 
        ? { ...timer, label, duration }
        : timer
    ));
    
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
    setRoundCount(prev => prev + 1);
    if (activeTimer) {
      setCurrentTime(activeTimer.duration);
      setIsRunning(true);
    }
  }, [activeTimer, roundCount]);

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
    <div className="min-h-screen transition-colors duration-300 bg-background text-foreground" style={{ fontFamily: 'var(--font-primary)' }}>
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">
            Boxing Timer
          </h1>
          <p className="text-muted-foreground">
            Select a timer • Tap to start • Hold to edit
          </p>
        </div>

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
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-2">
            Select Timer Preset
          </label>
          <Select value={activeTimerId?.toString() || ""} onValueChange={handleTimerSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a timer preset" />
            </SelectTrigger>
            <SelectContent>
              {timers.map((timer) => (
                <SelectItem key={timer.id} value={timer.id.toString()}>
                  {timer.label} ({Math.floor(timer.duration / 60)}:{(timer.duration % 60).toString().padStart(2, '0')})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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
          onToggleAutoLoop={() => setAutoLoop(!autoLoop)}
          onBreakDurationChange={setBreakDuration}
        />

        {/* Timer Edit Dialog */}
        <TimerEditDialog
          isOpen={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          timer={editingTimer}
          onSave={handleSaveTimer}
        />
      </div>
    </div>
  );
};

export default Index;
