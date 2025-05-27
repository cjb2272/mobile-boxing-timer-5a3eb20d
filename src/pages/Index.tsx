import React, { useState, useEffect, useCallback } from 'react';
import TimerButton from '../components/TimerButton';
import MainTimer from '../components/MainTimer';
import ControlPanel from '../components/ControlPanel';
import TimerEditDialog from '../components/TimerEditDialog';

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
    }
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
    console.log('Ending break, returning to timer:', activeTimer?.label);
    setIsBreak(false);
    if (activeTimer) {
      setCurrentTime(activeTimer.duration);
      setIsRunning(true);
    }
  }, [activeTimer]);

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
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'dark bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Boxing Timer
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Tap to start • Hold to edit
          </p>
        </div>

        {/* Timer Buttons - New Layout */}
        <div className="mb-6">
          {/* Large Timer (first one) */}
          <div className="mb-3">
            <TimerButton
              key={timers[0].id}
              label={timers[0].label}
              duration={timers[0].duration}
              isActive={activeTimerId === timers[0].id}
              isRunning={isRunning && activeTimerId === timers[0].id && !isBreak}
              currentTime={activeTimerId === timers[0].id && !isBreak ? currentTime : timers[0].duration}
              onClick={() => selectTimer(timers[0].id)}
              onLongPress={() => handleLongPress(timers[0])}
              size="large"
            />
          </div>
          
          {/* Smaller Timers (2x2 grid) */}
          <div className="grid grid-cols-2 gap-3">
            {timers.slice(1).map((timer) => (
              <TimerButton
                key={timer.id}
                label={timer.label}
                duration={timer.duration}
                isActive={activeTimerId === timer.id}
                isRunning={isRunning && activeTimerId === timer.id && !isBreak}
                currentTime={activeTimerId === timer.id && !isBreak ? currentTime : timer.duration}
                onClick={() => selectTimer(timer.id)}
                onLongPress={() => handleLongPress(timer)}
                size="small"
              />
            ))}
          </div>
        </div>

        {/* Main Timer Display */}
        <div className="mb-8">
          <MainTimer
            currentTime={currentTime}
            totalTime={isBreak ? breakDuration : (activeTimer?.duration || 0)}
            isRunning={isRunning}
            isBreak={isBreak}
            activeTimerLabel={isBreak ? 'BREAK' : (activeTimer?.label || '')}
            onToggle={toggleTimer}
          />
        </div>

        {/* Control Panel */}
        <ControlPanel
          autoLoop={autoLoop}
          breakDuration={breakDuration}
          onToggleAutoLoop={() => setAutoLoop(!autoLoop)}
          onBreakDurationChange={setBreakDuration}
          onThemeToggle={toggleTheme}
          isDark={isDark}
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
