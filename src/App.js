import React, { useState } from 'react';
import HomeForm from './components/Home';
import Question from './components/Question';
import ResultSection from './components/Results';
import SnarkyFootnotes from './components/SnarkyFootnotes';


function App() {
  const [formData, setFormData] = useState(null);
  const [questionData, setQuestionData] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState('');
  const [questionCount, setQuestionCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // ⏮ Reset all state EXCEPT name (we keep it!)
  const resetQuiz = () => {
    setQuestionData(null);
    setUserAnswer('');
    setShowResult(false);
    setError('');
    setQuestionCount(0);
    setCorrectCount(0);
    setGameOver(false);
  };

  // ⏭ Move to next question
  const handleNextQuestion = () => {
    setQuestionData(null);      // <- Reset the current question
    setUserAnswer('');
    setShowResult(false);       // <- This triggers Question.jsx to rerun useEffect
    setQuestionCount(prev => prev + 1);
  };


  return (
    <div className="app">
      <h1>🧠 The Amazing Rickety Quiz Maestro of Doom</h1>

      {!formData && (
        <HomeForm onSubmit={setFormData} />
      )}

      {formData && !showResult && (
        <Question
          formData={formData}
          setQuestionData={setQuestionData}
          questionData={questionData}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
          setShowResult={setShowResult}
          setError={setError}
          error={error}
          questionCount={questionCount}
          setCorrectCount={setCorrectCount}
          setGameOver={setGameOver}
        />
      )}

      {showResult && (
        <ResultSection
          userAnswer={userAnswer}
          questionData={questionData}
          userName={formData.name}
          onNextQuestion={handleNextQuestion}
          questionCount={questionCount}
          correctCount={correctCount}
          isCorrect={userAnswer === questionData.correct_answer}
          gameOver={gameOver}
          onRestart={resetQuiz}
        />
      )}
      <SnarkyFootnotes />
    </div>
  );
}

export default App;
