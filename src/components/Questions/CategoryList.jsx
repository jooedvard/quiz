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
    if (
      !newCategories.includes(e.target.textContent) &&
      newCategories.length != 5
    ) {
      newCategories.push(e.target.textContent);
      setCategories(newCategories);
    } else {
      handleRemoveCategory(e.target.textContent);
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
      <h1 className="custom__font text-white text-px_32 ">Welcome!</h1>
      <h1 className="text-ocean">
        Choose from the Categories and Start the Quiz!{" "}
      </h1>

      <div className="">
        <div className="mt-3 mb-3 grid-cats">
          {allCategory.map((category) => {
            return (
              <div key={category} className="">
                <label
                  onClick={handleInput}
                  className={`text ml-2 cursor-pointer  p-2 text-sm font-medium ${
                    categories.includes(category)
                      ? "text-white bg-ocean  rounded"
                      : "bg-transparent"
                  }`}
                >
                  {category}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      {
        <button
          className="mt-10  border bg-oceanwhite font-bold shadow  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={fetchQuestions}
        >
          Start Quiz
        </button>
      }
    </div>
  );
};

export default CategoryList;
