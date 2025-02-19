// frontend/src/components/Scoreboard.js
import React from 'react';

const Scoreboard = ({ score, total, onRestart }) => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
      <p className="text-xl mb-4">Your Score: {score} / {total}</p>
      <button onClick={onRestart} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Restart Quiz
      </button>
    </div>
  );
};

export default Scoreboard;
