const FinishModal = ({ result, setRenderResult }) => {
  const getPoints = () => {
    if (result != null) {
      let points = result.answersList.filter((answer, index) => {
        return answer[1];
      });

      return points.length;
    }

    return 0;
  };

  return (
    <div className="">
      <div className="flex justify-between">
        <p className="mt-5 mb-5 text-gold  custom__font flex flex-row gap-3 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
          <span> {`Your Score : ${getPoints()}`}</span>
        </p>
        <button
          onClick={() => {
            setRenderResult(false);
          }}
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
      </div>

      <div className="w-fit ">
        {result != null &&
          result.answersList.map((answers) => {
            return (
              <div className="grid grid-cols-1-auto gap-10 items-center">
                <div className="text-sm pt-2 text-oceanwhite">{answers[0].question}</div>
                <div className="bg-oceanwhite rounded mt-2 h-fit ">{answers[1] ? <Tick /> : <Cross />}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default FinishModal;

const Tick = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5 text-ocean"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
};

const Cross = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5 text-deep"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};
