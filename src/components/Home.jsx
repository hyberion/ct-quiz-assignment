import React, { useState } from 'react';

const HomeForm = ({ onSubmit }) => {
  const [formState, setFormState] = useState({
    name: '',
    category: '',
    difficulty: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.category || !formState.difficulty) {
      setError('🚨 Whoa there! Fill out *everything* before getting quizzy.');
      return;
    }

    setError('');
    onSubmit(formState);
  };

  return (
    <form onSubmit={handleSubmit} className="home-form">
      <h2>🤖 Welcome, Human.</h2>
      <p>
        Please fill out this incredibly invasive form so we can judge your
        trivia skills appropriately.
      </p>

      <div>
        <label htmlFor="name">Your Glorious Name</label><br />
        <input
          id="name"
          name="name"
          type="text"
          value={formState.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="category">Pick a Category</label><br />
        <select
          id="category"
          name="category"
          value={formState.category}
          onChange={handleChange}
        >
          <option value="">-- Choose wisely --</option>
          <option value="9">General Knowledge</option>
          <option value="18">Science: Computers</option>
          <option value="23">History</option>
          <option value="27">Animals</option>
        </select>
      </div>

      <div>
        <label htmlFor="difficulty">Choose Difficulty</label><br />
        <select
          id="difficulty"
          name="difficulty"
          value={formState.difficulty}
          onChange={handleChange}
        >
          <option value="">-- Easy, Medium, or You Sure? --</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <button type="submit">Submit to Your Fate</button>

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </form>
  );
};

export default HomeForm;
