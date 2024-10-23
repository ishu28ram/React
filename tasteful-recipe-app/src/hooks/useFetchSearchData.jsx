import React, { useEffect, useState } from "react";

const useFetchSearchData = () => {
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async (inputKey) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://dummyjson.com/recipes/search?q=${inputKey}`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      console.log(data);
      setSearchData(data.recipes);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return { searchData, fetchData, isLoading, error };
};

export default useFetchSearchData;
