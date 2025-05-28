import React from 'react';

const ResultSection = ({
  userAnswer,
  questionData,
  userName,
  onNextQuestion,
  questionCount,
  correctCount,
  isCorrect,
  gameOver,
  onRestart
}) => {
  return (
    <div className="result-section">
      <h2>{userName}, your answer was:</h2>

      {isCorrect ? (
        <p style={{ color: 'lime' }}>✅ Correct!</p>
      ) : (
        <>
          <p style={{ color: 'crimson' }}>❌ Wrong!</p>
          <p>
            The correct answer was:{' '}
            <strong dangerouslySetInnerHTML={{ __html: questionData.correct_answer }} />
          </p>
        </>
      )}

      {!gameOver ? (
        <button onClick={onNextQuestion}>Next Question</button>
      ) : (
        <>
          <p>
            🎉 Game Over, {userName}! You scored {correctCount} out of 10.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={onRestart}>🔁 New Game</button>
            <button onClick={() => {
              onRestart();
              onNextQuestion();
            }}>⏩ Keep Going</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ResultSection;
