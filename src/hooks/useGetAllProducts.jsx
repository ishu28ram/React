import { useEffect, useState } from "react";

const useGetAllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function getAllProducts() {
    try {
      setLoading(true);

      const response = await fetch(`https://dummyjson.com/products`);
      if (!response.ok) {
        setError("something went wrong");
      }
      const results = await response.json();
      setAllProducts(results.products);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  }
  useEffect(() => {
    getAllProducts();
  }, []);
  return { allProducts, loading, error };
};

export default useGetAllProducts;
