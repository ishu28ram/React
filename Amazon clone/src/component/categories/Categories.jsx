import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useGetProductsByCategories from "../../hooks/useGetProductsByCategories";

const Categories = ({ cat }) => {
  const { getCategoryProducts } = useGetProductsByCategories();
  const navigate = useNavigate();
  function handlecategories(cat) {
    getCategoryProducts(cat);
    navigate(`/cat/${cat}`);
  }

  return (
    <Link to={`/cat/${cat}`}>
      <button
        className=" font-semibold bg-gray-200 hover:bg-gray-300 px-4 py-1 rounded-xl"
        onClick={() => handlecategories(cat)}
      >
        {cat.slice(0, 5) + "..."}
      </button>
    </Link>
  );
};

export default Categories;
