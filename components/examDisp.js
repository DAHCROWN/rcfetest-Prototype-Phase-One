import React, { useState } from 'react';
import styles from '../src/styles/Home.module.css'

const Quiz = ({ quizData }) => {
  if (!quizData || !quizData.questions || !Array.isArray(quizData.questions)) {
    return <p>No quiz data provided.</p>;
  }

  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState('');
  const [score, setScore] = React.useState(0);
  const [showScore, setShowScore] = React.useState(false);

  const handleNext = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const handlePrev = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleAnswerSelect = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleQuizSubmit = () => {
    if (selectedAnswer === quizData.questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    if (currentQuestion === quizData.questions.length - 1) {
      setShowScore(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    }
  };

  const handleQuizReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setScore(0);
    setShowScore(false);
  };

  if (quizData.questions.length === 0) {
    return <p>No questions found.</p>;
  }

  return (
    <div>
      {showScore ? (
        <div>
          <h2>You scored {score} out of {quizData.questions.length}</h2>
          <button onClick={handleQuizReset}>Try Again</button>
        </div>
      ) : (
        <div className={styles.examQuestion}>
          <h2>{quizData.questions[currentQuestion].question}</h2>
          <ul>
            {quizData.questions[currentQuestion].options.map((option, index) => (
              <li key={index}>
                <label>
                  <input
                    type="radio"
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={handleAnswerSelect}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
          <button className={styles.prevBtn} onClick={handlePrev} disabled={currentQuestion === 0}>
            Previous
          </button>
          {currentQuestion === quizData.questions.length - 1 ? (
            <button className={styles.subBtn}  onClick={handleQuizSubmit}>Submit</button>
          ) : (
            <button className={styles.nextBtn} onClick={handleNext}>Next</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
