import { useEffect, useState } from "react";

export const useFetchData = () => {
  const [recipesData, setRecipesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://dummyjson.com/recipes?limit=20&skip=${count * 20}`
        );

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const data = await response.json();
        setRecipesData((prev) => [...prev, ...data.recipes]);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [count]);

  useEffect(() => {
    setDisableButton(recipesData.length >= 100);
  }, [recipesData]);

  return {
    recipesData,
    isLoading,
    error,
    setCount,
    disableButton,
  };
};
