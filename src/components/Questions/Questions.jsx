import { useState } from "react";

const Questions = ({ questions,  reset }) => {
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
    if (active < questions.length - 1) {
      setActive((active) => active + 1);
    }
  };

  const onFinish = () => {
    let all = questions.filter((question, index) => {
      return question.correctAnswer === chosenAnswers[index];
    });

    setResult(all.length);
    console.log(all);
  };

  if (questions == null) return;

  return (
    <div className="flex flex-col justify-between w-full">
      <div className="flex justify-between flex-col sm:flex-row-reverse">
        <button
          onClick={reset}
          type="button"
          class="rotate-180 bg-oceanwhite shadow h-fit w-fit mb-3 text-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Icon description</span>
        </button>

        <div className="w-fit flex flex-col gap-2 relative">
          
          <p className="text text-ocean font-semibold text-xs ">
            Click on buttons for next question
          </p>
          <div className="flex flex-row flex-wrap gap-2 mt-4 question">
            {questions != null &&
              questions.map((question, index) => {
                return (
                  <div
                    className={`ease-in duration-300 w-[12px] h-[12px] rounded-full border border-ocean hover:bg-white hover:text-white cursor-pointer ${
                      chosenAnswers[index] != null && "bg-deep"
                    } ${active === index && "bg-white"}`}
                    key={"question" + index}
                    onClick={() => {
                      setActive(index);
                    }}
                  ></div>
                );
              })}
          </div>
          <h1 className="custom__font font-semibold text-white leading-8 text-sm">{`Q${
            active + 1
          }/${questions.length}`}</h1>
        </div>
      </div>

      <div className="flex flex-col gap-5">
      <h1 className="text font-bold mt-2 mb-2 text-white text-px_26 ">
            {questions[active].question}
          </h1>
        <div>
          <p className="flex gap-2  text-ocean italic mt-2 text-xs max-[300px]:hidden sm:custom__font sm:text-sm">
            <span>Tags:</span>
            {questions[active].tags.map((tag) => {
              return (
                <span className="" key={tag}>
                  {tag},
                </span>
              );
            })}
          </p>
          <div className="grid mt-3 gap-2">
            {questions[active].answers.map((answer) => {
              return (
                <div
                  className="flex flex-row text-white items-center	cursor-pointer gap-3"
                  key={answer}
                  onClick={() => {
                    updateChosenAnswers(answer);
                  }}
                >
                  <input
                    onChange={() => {
                      updateChosenAnswers(answer);
                    }}
                    type={"checkbox"}
                    disabled={result != null}
                    className=" w-6 h-6  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    checked={chosenAnswers[active] === answer ? true : false}
                  />
                  <label className="cursor-pointer gap-3">{answer}</label>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-4 flex-col sm:flex-row">
        <div className="">
          <button
            onClick={onPrev}
            class="relative bg-oceanwhite shadow inline-flex items-center justify-center  mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500  dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
          >
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-oceanwhite dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Prev
            </span>
          </button>

          <button
            onClick={onNext}
            class="relative inline-flex  bg-oceanwhite shadow items-center justify-center  mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500  dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
          >
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-oceanwhite dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Next
            </span>
          </button>
          <button
            onClick={onFinish}
            type="button"
            class="bg-finish  bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Finish
          </button>
          
        </div>
        <p className="mt-5 mb-5 text-gold  custom__font">
            Your Score: {result} / {questions.length}
          </p>
        <div>
          <button
            type="button"
            class="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2"
          >
            <svg
              class="w-4 h-4 mr-2 -ml-1"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="github"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 496 512"
            >
              <path
                fill="currentColor"
                d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
              ></path>
            </svg>
            Open on Github
          </button>
        </div>
      </div>
    </div>
  );
};
export default Questions;
