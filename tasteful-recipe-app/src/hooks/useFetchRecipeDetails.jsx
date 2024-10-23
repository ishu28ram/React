import React, { useEffect, useState } from "react";

const useFetchRecipeDetails = (recipeID) => {
  const [recipeDetailsData, setRecipeDetailsData] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/recipes/${recipeID}`
        );
        const data = await response.json();
        setRecipeDetailsData(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchRecipe();
  }, [recipeID]);

  return {
    recipeDetailsData,
  };
};

export default useFetchRecipeDetails;
