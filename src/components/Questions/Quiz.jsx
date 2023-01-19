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
  const [name, setName] = useState("");

  const reset = () => {
    setQuestions(null);
    setRenderStart(false);
    setSelectedCategories([]);
    setGameStart(false);
  }

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
    <>
      <CategoryList
        setRenderStart={setRenderStart}
        setSelectedCategories={setSelectedCategories}
        isGameStart={isGameStart}
        fetchQuestions={fetchQuestions}
        setName={setName}
      ></CategoryList>
      {questions != null && 
      <>
      <Questions questions={questions} reset={reset}></Questions>
      </>}
      
    </>
  );
};

export default Quiz;
