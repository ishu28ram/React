import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const SearchedData = () => {
  const [searchedDataRecipe, setSearchedDataRecipe] = useState([]);
  const params = useParams();

  const searchRecipe = async (search) => {
    const randomrecipe =
      await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}
    `);
    const res = await randomrecipe.json();
    setSearchedDataRecipe(res.meals);
    console.log(res.meals);
  };

  useEffect(() => {
    searchRecipe(params.search);
  }, [params.search]);
  return (
    <div className="random-container section">
      {searchedDataRecipe &&
        searchedDataRecipe.length > 0 &&
        searchedDataRecipe.slice(0, 9).map((item, index) => {
          return (
            <Link to={"/recipes/ingredients/" + item.idMeal}>
              <div className="recipe-card" key={index}>
                <p>{item.strMeal}</p>
                <img src={item.strMealThumb} alt={item.strMeal} />
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default SearchedData;
