import React from "react";
import CustomImage from "./CustomImage";
import { Link } from "react-router-dom";

const RecipesCard = ({ recipes, id }) => {
  // function ingredientsBtn() {
  //   getingredient(recipes);
  //   console.log(ingredient);
  // }

  return (
    <div className="recipe-card">
      <CustomImage src={recipes.recipe.image} pt="65%" className="custom-img" />
      <div className="recipe-card-info">
        {/* <img
          className="author-img"
          src="/Images/top-chiefs/img_1 (1).jpg"
          alt=""
        /> */}
        <p className="recipe-title">{recipes.recipe.label}</p>

        <p className="recipe-desc"> Dish Type: {recipes.recipe.dishType}</p>
        <p>{id}</p>
        <p className="recipe-desc">
          {" "}
          Cuisine Type: {recipes.recipe.cuisineType}
        </p>
        <p className="recipe-desc"> Meal Type: {recipes.recipe.mealType}</p>
        <Link to={`/ingredients/${id}`}>
          <button className="recipe-view-btn btn">VIEW RECIPE</button>
        </Link>
      </div>
    </div>
  );
};

export default RecipesCard;
