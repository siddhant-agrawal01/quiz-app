// frontend/src/components/Quiz.js
import React, { useState } from "react";
import Question from "./Question";
import Scoreboard from "./Scoreboard";
import History from "./History";
import { saveAttempt } from "../idb";

const Quiz = ({ quiz }) => {
  const { title, questions } = quiz;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScoreboard, setShowScoreboard] = useState(false);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      // When quiz finishes, record the attempt in IndexedDB.
      const attempt = {
        date: new Date().toISOString(),
        score: isCorrect ? score + 1 : score,
        total: questions.length,
      };
      saveAttempt(attempt);
      setShowScoreboard(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScoreboard(false);
  };

  return (
    <div className="bg-white rounded shadow p-6 w-full max-w-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1>
      {showScoreboard ? (
        <>
          <Scoreboard
            score={score}
            total={questions.length}
            onRestart={handleRestart}
          />
          <History />
        </>
      ) : (
        <Question
          question={questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
        />
      )}
    </div>
  );
};

export default Quiz;
