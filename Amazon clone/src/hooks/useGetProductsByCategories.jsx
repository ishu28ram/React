import React, { useState } from "react";

const useGetProductsByCategories = () => {
  const [allCategoriesProducts, setAllCategoriesProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function getCategoryProducts(prod) {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://dummyjson.com/products/category/${prod}`
      );

      if (!response.ok) {
        throw new Error("Something went wrong with the request.");
      }

      const results = await response.json();
      if (results?.products) {
        setAllCategoriesProducts(results.products);
      } else {
        setAllCategoriesProducts([]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  return { allCategoriesProducts, getCategoryProducts, loading, error };
};

export default useGetProductsByCategories;
