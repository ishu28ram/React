import { useState } from "react";

const useGetSearchProducts = () => {
  const [allSearchProducts, setAllSearchProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function getSearchProducts(prod) {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${prod}`
      );

      if (!response.ok) {
        throw new Error("Something went wrong with the request.");
      }

      const results = await response.json();
      if (results?.products) {
        setAllSearchProducts(results.products);
      } else {
        setAllSearchProducts([]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { allSearchProducts, getSearchProducts, loading, error };
};

export default useGetSearchProducts;
