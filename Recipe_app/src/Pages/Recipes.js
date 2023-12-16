import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Cuisine from "../components/Cuisine";
import SearchBox from "../components/SearchBox";
import SearchedData from "../components/SearchedData";
import RandomRecipe from "../components/RandomRecipe";
import Category from "../components/Category";
import Ingredients from "../components/Ingredients";

const Recipes = () => {
  const location = useLocation();
  const { pathname } = location;

  // Determine whether to show the Cuisine or SearchedData component based on the URL
  const showCuisine = pathname.includes("/recipes/cuisine/");
  const showSearchedData = pathname.includes("/recipes/searcheddata/");
  const showIngredients = pathname.includes("/recipes/ingredients/");
  return (
    <div className="previous-searches section">
      <SearchBox />
      <Category />
      <div>
        {showCuisine && <Cuisine />}
        {showSearchedData && <SearchedData />}
        {showIngredients && <Ingredients />}
        <RandomRecipe />
      </div>
    </div>
  );
};

export default Recipes;
