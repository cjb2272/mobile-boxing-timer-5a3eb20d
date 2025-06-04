
import React from 'react';

const TimerHeader: React.FC = () => {
  return (
    <div className="text-center mb-6">
      <h1 className="text-3xl font-bold mb-2">
        Boxing Timer
      </h1>
      <p className="text-muted-foreground">
        Select a timer • Tap to start • Hold to edit
      </p>
    </div>
  );
};

export default TimerHeader;
