import React from "react";
import Categories from "../component/categories/Categories";
import Product from "../component/product/Product";
import useGetAllProducts from "../hooks/useGetAllProducts";
import useGetAllCategories from "../hooks/useGetAllCategories";
import Loading from "../component/Loader/Loading";

const Home = () => {
  const { allProducts } = useGetAllProducts();
  const { allcategories, loading, error } = useGetAllCategories();
  return (
    <div>
      <div className="mx-[2rem] md:mx-[5rem] categories flex gap-4 overflow-scroll">
        {allcategories &&
          allcategories?.length > 0 &&
          allcategories?.map((cat) => <Categories key={cat} cat={cat} />)}
      </div>
      {loading && <Loading />}
      <div className="flex justify-center items-center my-[2rem]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[3rem]">
          {allProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
