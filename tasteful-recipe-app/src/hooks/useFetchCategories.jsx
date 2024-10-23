import React, { useEffect, useState } from "react";

export function useFetchRecipeData(keyword) {
  const [categoriesRecipeData, setCatagoriesRecipeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!keyword) return;

        setIsLoading(true);
        const response = await fetch(
          `https://dummyjson.com/recipes/meal-type/${keyword}`
        );

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const data = await response.json();
        console.log(data);
        setCatagoriesRecipeData(data.recipes || []);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [keyword]);
  return {
    categoriesRecipeData,
    isLoading,
    error,
  };
}
