import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useGetSearchProducts from "../hooks/useSearchProducts";
import Product from "../component/product/Product";
import Loading from "../component/Loader/Loading";
import useGetAllCategories from "../hooks/useGetAllCategories";
import Categories from "../component/categories/Categories";
import useGetProductsByCategories from "../hooks/useGetProductsByCategories";

const Category = () => {
  const { catName } = useParams();
  const { allcategories } = useGetAllCategories();
  const { allCategoriesProducts, getCategoryProducts, loading, error } =
    useGetProductsByCategories();
  useEffect(() => {
    if (catName) {
      getCategoryProducts(catName);
    }
  }, [catName]);
  return (
    <div>
      <div className="mx-[2rem] md:mx-[5rem] categories flex gap-4 overflow-scroll">
        {allcategories &&
          allcategories?.length > 0 &&
          allcategories?.map((cat) => <Categories key={cat} cat={cat} />)}
      </div>
      <h1 className="text-3xl font-semibold my-[3rem]">
        <span>Results for</span>
        <span className="text-orange-600 ml-3">
          {catName.toLocaleUpperCase()}
        </span>
      </h1>
      {loading && <Loading />}
      {error && <p>error</p>}
      <div className="flex flex-col gap-[2rem] justify-start items-center md:items-start mb-[2rem]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[3rem]">
          {allCategoriesProducts.length === 0 && (
            <p>no items found. please try another product </p>
          )}
          {allCategoriesProducts &&
            allCategoriesProducts.length > 0 &&
            allCategoriesProducts?.map((product) => (
              <Product key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
