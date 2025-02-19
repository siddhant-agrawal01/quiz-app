// frontend/src/App.js
import { useState, useEffect } from "react";
import Quiz from "./components/Quiz";

function App() {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/quiz")
      .then((response) => response.json())
      .then((data) => {
        setQuizData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {loading ? (
        <p>Loading...</p>
      ) : quizData ? (
        <Quiz quiz={quizData} />
      ) : (
        <p>Error loading quiz.</p>
      )}
    </div>
  );
}

export default App;
