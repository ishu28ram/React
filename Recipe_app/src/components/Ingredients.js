import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Ingredients = () => {
  const params = useParams();
  const [ingredientsData, getIngredientsData] = useState([]);

  const fetchDataApi = async (ingredient) => {
    const results = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ingredient}`
    );
    const data = await results.json();
    console.log(data.meals);
    getIngredientsData(data.meals);
  };
  useEffect(() => {
    fetchDataApi(params.ingredient);
  }, [params.ingredient]);

  return (
    <div className="section">
      {ingredientsData.map((item, index) => {
        return (
          <div key={index} className="ingredient-container">
            <div className="box-1">
              <h2>{item.strMeal}</h2>
              <img src={item.strMealThumb} alt={item.strMeal} />
            </div>
            <div className="box-2">
              <p>Instructions:</p>

              <div className="instruction-list">{item.strInstructions}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Ingredients;
