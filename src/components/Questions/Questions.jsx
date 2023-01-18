import { useState } from "react";

const Questions = ({ questions }) => {
  const [active, setActive] = useState(0);
  const [chosenAnswers, setChosenAnswers] = useState([]);
  const [result, setResult] = useState();

  const updateChosenAnswers = (answer) => {
    const newChosenAnswers = [...chosenAnswers];
    newChosenAnswers[active] = answer;
    setChosenAnswers(newChosenAnswers);
  };

  const onPrev = () => {
    if (active != 0) {
      setActive((active) => active - 1);
    }
  };

  const onNext = () => {
    if (active < questions.length) {
      setActive((active) => active + 1);
    }
  };

  const onFinish = () => {
    let all = questions.filter((question, index) => {
      return question.correctAnswer === chosenAnswers[index]; 
    })

    setResult(all.length);
    console.log(all);
  }

  if (questions == null) return;

  return (
    <>
      <div className="flex flex-row flex-wrap gap-5 p-5 mx-auto">
        {questions != null &&
          questions.map((question, index) => {
            return (
              <div
                className="bg-blue-100 p-3 border hover:bg-blue-500 hover:text-white cursor-pointer"
                key={"question" + index}
                onClick={() => {
                  setActive(index);
                }}
              >{`Question ${index + 1}`}</div>
            );
          })}
      </div>
      <div>
        <h1>{`Question ${active + 1}`}</h1>
        <div>
          <h1>{questions[active].question}</h1>
          <p>
            {questions[active].tags.map((tag) => {
              return <span key={tag}>{tag}</span>;
            })}
          </p>
          <div>
            {questions[active].answers.map((answer) => {
              return (
                <div
                  key={answer}
                  onClick={() => {
                    updateChosenAnswers(answer);
                  }}
                >
                  <input
                    onChange={() => {updateChosenAnswers(answer)}}
                    type={"checkbox"}
                    disabled={result != null}
                    checked={chosenAnswers[active] === answer ? true : false}
                  />
                  <label>{answer}</label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <button onClick={onPrev}>Prev</button>
      <button onClick={onNext}>Next</button>
      <button onClick={onFinish}>Finish</button>
      <p>Your Score: {result} / {questions.length}</p>
    </>
  );
};
export default Questions;
