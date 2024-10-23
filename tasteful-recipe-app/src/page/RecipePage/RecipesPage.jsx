import React from "react";
import "./RecipesPage.css";
import Recipes from "./RecipeDetails/Recipes/Recipes";
import { useFetchData } from "../../hooks/useFetchData";

const RecipesPage = () => {
  const { recipesData, disableButton, isLoading, error, setCount } =
    useFetchData();

  return (
    <>
      <div className="recipes_main_container">
        {recipesData && recipesData?.length > 0 ? (
          <Recipes
            data={recipesData}
            setCount={setCount}
            isLoading={isLoading}
            error={error}
            disableButton={disableButton}
          />
        ) : (
          <p
            style={{
              padding: "30px",
              textAlign: "center",
            }}
          >
            No Results Found
          </p>
        )}
      </div>
    </>
  );
};

export default RecipesPage;
