import React, { useEffect, useState } from 'react';

const footnotes = [
  "* Your keyes are missing.  Where coudl they be?  Behind the couch?  In the freezer?  Whoe can say?",
  "* Side effects may include hallucinations that you are taking a trivia quiz.",
  "* Correct answers not guaranteed to be true..",
  "* This quiz is monitored by is almost certainaly not fatal.",
  "* Refreshing won't save you now.",
  "* Results not real.",
  "* This line does not exist.  You are imagining this line of text.",
  "* Is this really the best use of your limited and finite life?",
  "* Do not look behind you.",
  "* No matter what you do do not read the first words of this senetence, or doom will follow.",
  "* The Omnisiaah approves.",
  "* A billion years of evolution have led to this moment.",
  "* This is not a footnote.",
    "* This is a footnote.",
  "* To make a really good cup of tea you must first invent the universe.  And if you do that tea will be least of your concerns.",
  "* Do not believe this line.  This line is lying to you.",
  "* It's already too late."
];

const SnarkyFootnotes = () => {
  const [footnote, setFootnote] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * footnotes.length);
    setFootnote(footnotes[randomIndex]);
  }, []);

  return (
    <div className="snarky-footnotes">
      <div className="footnote-line">
        {footnote}
      </div>
    </div>
  );
};

export default SnarkyFootnotes;
