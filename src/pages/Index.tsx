
import React from 'react';
import TimerHeader from '../components/TimerHeader';
import TimerContainer from '../components/TimerContainer';

const Index = () => {
  return (
    <div className="min-h-screen transition-colors duration-300 bg-background text-foreground">
      <div className="container mx-auto px-4 py-6 max-w-md">
        <TimerHeader />
        <TimerContainer />
      </div>
    </div>
  );
};

export default Index;
