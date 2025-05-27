
import React, { useState, useEffect, useCallback } from 'react';
import TimerButton from '../components/TimerButton';
import MainTimer from '../components/MainTimer';
import ControlPanel from '../components/ControlPanel';

interface Timer {
  id: number;
  label: string;
  duration: number;
}

const Index = () => {
  const [isDark, setIsDark] = useState(false);
  const [timers] = useState<Timer[]>([
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

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const startBreak = useCallback(() => {
    setIsBreak(true);
    setCurrentTime(breakDuration);
    setIsRunning(true);
  }, [breakDuration]);

  const endBreak = useCallback(() => {
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
          if (prev <= 1) {
            setIsRunning(false);
            
            if (autoLoop) {
              if (isBreak) {
                // Break ended, start timer again
                setTimeout(endBreak, 100);
              } else {
                // Timer ended, start break
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
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Boxing Timer
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Tap a timer to get started
          </p>
        </div>

        {/* Timer Buttons */}
        <div className="grid grid-cols-1 gap-3 mb-8">
          {timers.map((timer) => (
            <TimerButton
              key={timer.id}
              label={timer.label}
              duration={timer.duration}
              isActive={activeTimerId === timer.id}
              isRunning={isRunning && activeTimerId === timer.id && !isBreak}
              currentTime={activeTimerId === timer.id && !isBreak ? currentTime : timer.duration}
              onClick={() => selectTimer(timer.id)}
            />
          ))}
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
      </div>
    </div>
  );
};

export default Index;
