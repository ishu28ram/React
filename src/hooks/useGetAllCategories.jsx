import { useEffect, useState } from "react";

const useGetAllCategories = () => {
  const [allcategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function getAllCategories() {
    try {
      setLoading(true);

      const response = await fetch(
        `https://dummyjson.com/products/category-list`
      );
      if (!response.ok) {
        setError("something went wrong");
      }
      const results = await response.json();
      setAllCategories(results);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  }
  useEffect(() => {
    getAllCategories();
  }, []);
  return { allcategories, loading, error };
};

export default useGetAllCategories;
