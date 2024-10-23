import React, { useEffect } from "react";
import "./RandomRecipe.css";
import { useFetchData } from "../../../hooks/useFetchData";
import Loading from "../../../component/Loading/Loading";
import { Link, useLocation } from "react-router-dom";
import bg from "../../../../public/images/bg.jpg";
import { FaInfoCircle } from "react-icons/fa";

function RandomRecipe({ text, limit }) {
  const { recipesData, isLoading, error } = useFetchData();
  const location = useLocation();
  const hideElements = location.pathname === "/recipes";
  const randomMeals = Math.floor(
    Math.random() * Math.max(recipesData.length - limit, 1)
  );
  return (
    <div className="random_Recipe_container container">
      {!hideElements && recipesData.length > 0 && text && (
        <h1 className="title">{text} </h1>
      )}
      <div className="random_recipe_content">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="random_recipe">
            {recipesData &&
              recipesData.length > 0 &&
              recipesData
                .slice(randomMeals, randomMeals + limit)
                .map((recipe) => {
                  return (
                    <Link to={`/recipes/${recipe?.id}`} key={recipe?.id}>
                      <div className="recipe_box">
                        <div className="img">
                          <img src={recipe?.image || bg} alt={recipe?.name} />

                          <div className="shadow_box">
                            <div className="fav_actions_button">
                              <button className="icons">
                                <Link
                                  to={`/recipes/${recipe?.id}`}
                                  className="link"
                                >
                                  <FaInfoCircle />
                                </Link>
                              </button>
                            </div>
                          </div>
                        </div>
                        <p>{recipe?.name} </p>
                      </div>
                    </Link>
                  );
                })}
          </div>
        )}
        {!isLoading && recipesData?.length === 0 && <p>No data found</p>}
        {error && <p>Somthing went wrong</p>}

        {!hideElements && recipesData?.length > 0 && (
          <Link to="/recipes">
            <button>More Recipes</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default RandomRecipe;
