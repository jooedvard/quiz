import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

const API = "https://the-trivia-api.com/api/categories";

const CategoryList = ({setRenderStart, setSelectedCategories, isGameStart}) => {
  const { isLoading, responseJSON, error } = useFetch(API);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setSelectedCategories(categories);
    categories.length == 5 ? setRenderStart(true) : setRenderStart(false);
  }, [categories])

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

  const handleRemoveCategory = (key) => {
    let newCategories = categories.filter((category) => {
      return category != key;
    });
    setCategories(newCategories);
  };

  if (isLoading || responseJSON == null || isGameStart) return;
  const allCategory = createCategories();

  

  return (
    <div className="mx-auto flex flex-col w-fit gap-4">
      <div>
        <h1>{categories.length < 5  && `Select ${5 - categories.length} more category!`}</h1>
        {categories.length > 0 && (
          <div className="flex flex-row flex-wrap gap-2 p-2 mt-5 max-w-xl animate__animated animate__slideInDown">
            {categories.map((category) => {
              return (
                <div
                  key={category}
                  className="shadow p-2 bg-slate-700 hover:bg-blue-500 cursor-pointer text-gray-100 rounded h-fit transition ease-in-out"
                  onClick={() => handleRemoveCategory(category)}
                >
                  {category}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div
        multiple={true}
        className="flex flex-row flex-wrap gap-2  max-w-xl p-3"
      >
        {allCategory.map((category) => {
          return (
            <div key={category} className="flex flex-row gap-2">
              <input
                type={"checkbox"}
                id={category}
                value={category}
                onChange={handleInput}
                disabled={categories.includes(category) || categories.length == 5}
                checked={categories.includes(category) || categories.length == 5}
              />
              <label htmlFor={category} className="text">
                {category}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;
