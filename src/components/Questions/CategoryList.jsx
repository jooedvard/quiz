import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

const API = "https://the-trivia-api.com/api/categories";

const CategoryList = ({
  setRenderStart,
  setSelectedCategories,
  isGameStart,
  fetchQuestions,
  setName,
}) => {
  const { isLoading, responseJSON, error } = useFetch(API);
  const [categories, setCategories] = useState([]);
  const [removeCheckBoxes, setRemove] = useState(false);

  useEffect(() => {
    setSelectedCategories(categories);
    categories.length == 5 ? setRenderStart(true) : setRenderStart(false);
  }, [categories]);

  const createCategories = () => {
    let categoryArray = [];
    for (const key in responseJSON) {
      if (Object.hasOwnProperty.call(responseJSON, key)) {
        const element = responseJSON[key];
        categoryArray = [...categoryArray, ...element];
      }
    }
    return categoryArray;
  };

  const handleInput = (e) => {
    let newCategories = [...categories];
    if (!newCategories.includes(e.target.value)) {
      newCategories.push(e.target.value);
      setCategories(newCategories);
    }
  };

  const handleRemoveCategory = (key, e) => {
    let newCategories = categories.filter((category) => {
      return category != key;
    });
    setCategories(newCategories);
  };

  if (isLoading || responseJSON == null || isGameStart) return;
  const allCategory = createCategories();

  return (
    <div className="">
      <h1 className="custom__font text-sky-600 text-lg">Welcome!</h1>
      <h1>Choose from the Categories and Start the Quiz! </h1>

      <div className="">
        <div className="mt-3 mb-3">
          {allCategory.map((category) => {
            return (
              <div key={category} className="">
                <input
                  type={"checkbox"}
                  id={category}
                  value={category}
                  className="relative w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={handleInput}
                  disabled={
                    categories.includes(category) || categories.length == 5
                  }
                  checked={
                    categories.includes(category) || categories.length == 5
                  }
                />
                <label
                  htmlFor={category}
                  className="text ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {category}
                </label>
              </div>
            );
          })}
        </div>

        <div className="">
          <div className="">
            {
              <div className={`flex flex-row  gap-2 mb-2 mt-5 flex-wrap`}>
                {categories.map((category) => {
                  return (
                    <div
                      key={category}
                      className={``}
                      onClick={(e) => {
                        categories.includes(category) &&
                          handleRemoveCategory(category);
                      }}
                      id="toast-default"
                      class="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                      role="alert"
                    >
                      <div class="ml-3 text-sm font-normal">{category}</div>
                      <button
                        type="button"
                        class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                        data-dismiss-target="#toast-default"
                        aria-label="Close"
                      >
                        <span class="sr-only">Close</span>
                        <svg
                          aria-hidden="true"
                          class="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            }
          </div>
        </div>
      </div>
      {
        <button
          className="mt-4  text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={fetchQuestions}
        >
          Start Quiz
        </button>
      }
    </div>
  );
};

export default CategoryList;
