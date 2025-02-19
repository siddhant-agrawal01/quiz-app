// frontend/src/components/Timer.js
import React, { useState, useEffect } from 'react';

const Timer = ({ initialTime = 30, onTimeUp, resetTrigger }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  // Reset timer when resetTrigger changes (e.g., new question)
  useEffect(() => {
    setTimeLeft(initialTime);
  }, [resetTrigger, initialTime]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
    const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timerId);
  }, [timeLeft, onTimeUp]);

  return (
    <div className="text-red-500 font-bold">
      Time Left: {timeLeft}s
    </div>
  );
};

export default Timer;
