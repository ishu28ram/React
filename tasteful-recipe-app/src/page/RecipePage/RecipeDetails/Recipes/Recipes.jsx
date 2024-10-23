import React from "react";
import "./Recipes.css";
import { Link, useLocation } from "react-router-dom";
import Loading from "../../../../component/Loading/Loading";
import { FaInfoCircle } from "react-icons/fa";

const Recipes = ({
  limit,
  disableButton,
  data,
  isLoading,
  setCount,
  error,
  text,
}) => {
  const location = useLocation();
  const hideElement = location.pathname === "/recipes";
  return (
    <div className="random_Recipe_container container">
      {data && data?.length > 0 && (
        <h1 className="title">{text?.toUpperCase() || "Recipes"} </h1>
      )}
      <div className="random_recipe_content">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="random_recipe">
            {data &&
              data?.length > 0 &&
              data.slice(0, limit).map((recipe) => {
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

        {error && <p>something went wrong</p>}

        {data &&
          data.length > 0 &&
          (hideElement ? (
            <button
              disabled={disableButton}
              onClick={() => setCount((prev) => prev + 1)}
            >
              View More
            </button>
          ) : (
            <Link to="/recipes">
              <button>More Recipes</button>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Recipes;
