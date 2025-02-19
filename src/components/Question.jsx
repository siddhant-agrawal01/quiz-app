// frontend/src/components/Question.js
import React, { useState } from 'react';
import Timer from './Timer';

const Question = ({ question, onAnswer, questionNumber, totalQuestions }) => {
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState('');

  const handleOptionClick = (option) => {
    if (selected !== null) return; // prevent multiple selections
    setSelected(option);
    const isCorrect = option === question.answer;
    setFeedback(isCorrect ? 'Correct!' : `Wrong! Correct answer: ${question.answer}`);
    // Delay proceeding to next question to allow user to see feedback
    setTimeout(() => {
      onAnswer(isCorrect);
      setSelected(null);
      setFeedback('');
    }, 1500);
  };

  const handleTimeUp = () => {
    if (selected === null) {
      setFeedback(`Time's up! Correct answer: ${question.answer}`);
      setTimeout(() => {
        onAnswer(false);
        setSelected(null);
        setFeedback('');
      }, 1500);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span>Question {questionNumber} of {totalQuestions}</span>
        <Timer initialTime={30} onTimeUp={handleTimeUp} resetTrigger={question.id} />
      </div>
      <h2 className="text-xl font-medium mb-4">{question.question}</h2>
      <div className="grid grid-cols-1 gap-3">
        {question.options.map((option, index) => (
          <button 
            key={index}
            onClick={() => handleOptionClick(option)}
            className={`py-2 px-4 border rounded hover:bg-gray-200 ${
              selected === option ? (option === question.answer ? 'bg-green-300' : 'bg-red-300') : ''
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {feedback && <p className="mt-4 font-semibold">{feedback}</p>}
    </div>
  );
};

export default Question;
