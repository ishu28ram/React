import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchData, options } from "../utils/fetchData";

const Cuisine = () => {
  const params = useParams();
  const [cuisine, setCuisine] = useState([]);
  const [loading, setLoading] = useState(true);

  const cuisineRecipe = async (category) => {
    const randomrecipe =
      await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${category}
    `);
    const res = await randomrecipe.json();

    setLoading(false);
    setCuisine(res.meals);
  };

  useEffect(() => {
    cuisineRecipe(params.category);
  }, [params.category]);

  if (loading) {
    return <div>Loading....</div>;
  }
  return (
    <div className="random-container section">
      {cuisine &&
        cuisine.length > 0 &&
        cuisine.slice(0, 9).map((item, index) => {
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

export default Cuisine;
