import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Question = ({
  formData,
  setQuestionData,
  questionData,
  userAnswer,
  setUserAnswer,
  setShowResult,
  setError,
  error,
  questionCount,
  setCorrectCount,
  setGameOver
}) => {
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    if (questionData !== null) return; // Don't re-fetch if we already have a question

    const fetchQuestion = async () => {
      try {
        setLoading(true);
        setFetchError('');

        const res = await axios.get('https://opentdb.com/api.php', {
          params: {
            amount: 1,
            category: formData.category,
            difficulty: formData.difficulty,
            type: 'multiple',
          },
        });

        const question = res.data.results?.[0];

        if (!question || res.data.response_code !== 0) {
          throw new Error("No valid question returned from API");
        }

        const allAnswers = [...question.incorrect_answers];
        const randomIndex = Math.floor(Math.random() * 4);
        allAnswers.splice(randomIndex, 0, question.correct_answer);

        setQuestionData({ ...question, allAnswers });
      } catch (err) {
        console.error("Trivia API failed:", err);
        setFetchError("❌ API exploded. Try hitting 'Try Again' below.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [formData, questionCount, questionData, setQuestionData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userAnswer) {
      setError("Select something, Einstein.");
      return;
    }

    const isCorrect = userAnswer === questionData.correct_answer;
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }

    if (questionCount + 1 >= 10) {
      setGameOver(true);
    }

    setError('');
    setShowResult(true);
  };

  if (loading) return <p>Loading your fate...</p>;

  if (fetchError) {
    return (
      <div>
        <p style={{ color: 'red' }}>{fetchError}</p>
        <button onClick={() => setQuestionData(null)}>Try Again</button>
      </div>
    );
  }

  return (
    
  <div className="question-wrapper">
    <div className="progress-bar-container">
      <div className="progress-label">Question {questionCount + 1} of 10</div>
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${((questionCount + 1) / 10) * 100}%` }}
        />
      </div>
    </div>

    <form onSubmit={handleSubmit}>
      <h2 dangerouslySetInnerHTML={{ __html: questionData.question }} />

      {questionData.allAnswers.map((ans, idx) => (
        <div key={idx}>
          <label>
            <input
              type="radio"
              name="answer"
              value={ans}
              checked={userAnswer === ans}
              onChange={() => setUserAnswer(ans)}
            />
            <span dangerouslySetInnerHTML={{ __html: ans }} />
          </label>
        </div>
      ))}

      <button type="submit">Lock It In</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  </div>
);

};

export default Question;
