import React from "react";
import { useState, useEffect } from "react";
import CategoryList from "./CategoryList";
import Questions from "./Questions";

const QUIZ_API =
  "https://the-trivia-api.com/api/questions?limit=20&categories=";

  const Quiz = () => {
  const [questions, setQuestions] = useState(null);
  const [renderStart, setRenderStart] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState();
  const [isGameStart, setGameStart] = useState(false);

  const fetchQuestions = async () => {
    let request = await fetch(QUIZ_API + [...selectedCategories])
    let response = await request.json();
    response.forEach(question => {
      question.answers = shuffleAnswers(question);
    })
    setQuestions(response);
  }

  const shuffleAnswers = (question) => {
    let incorrectAnswers = question.incorrectAnswers;
    let correctAnswer = question.correctAnswer;
    let answers = [...incorrectAnswers, correctAnswer];
    let shuffleAnswers = answers.sort((a, b) => 0.5 - Math.random());
    return shuffleAnswers;
  };

  useEffect(() => {
    if(questions != null) setGameStart(true);
  }, [questions])


  return (
    <div>
      <CategoryList
        setRenderStart={setRenderStart}
        setSelectedCategories={setSelectedCategories}
        isGameStart={isGameStart}
      ></CategoryList>
      {renderStart && !isGameStart && <button onClick={fetchQuestions}>Start Quiz</button>}
      {questions != null && 
      <>
      <Questions questions={questions}></Questions>
      </>}
      
    </div>
  );
};

export default Quiz;
