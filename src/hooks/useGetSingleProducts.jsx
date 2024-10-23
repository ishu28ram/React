import React, { useEffect, useState } from "react";

const useGetSingleProducts = (id) => {
  const [singleProducts, setSingleProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function getSingleProducts() {
    try {
      setLoading(true);
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      if (!response.ok) {
        setError("something went wrong");
      }
      const results = await response.json();
      setSingleProducts(results);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  }
  useEffect(() => {
    getSingleProducts();
  }, [id]);
  return {
    singleProducts,
    loading,
    error,
  };
};

export default useGetSingleProducts;
