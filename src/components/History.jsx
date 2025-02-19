// frontend/src/components/History.js
import React, { useEffect, useState } from "react";
import { getAttempts } from "../idb";

const History = () => {
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await getAttempts();
      setAttempts(data);
    };
    fetchHistory();
  }, []);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Quiz Attempt History</h3>
      {attempts.length === 0 ? (
        <p>No attempts recorded yet.</p>
      ) : (
        <ul className="space-y-2">
          {attempts.map((attempt, index) => (
            <li key={index} className="border p-2 rounded">
              <p>Date: {new Date(attempt.date).toLocaleString()}</p>
              <p>
                Score: {attempt.score} / {attempt.total}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
