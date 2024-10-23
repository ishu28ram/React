import React, { useEffect, useState } from "react";
import "./RecipeDetails.css";
import { Link, useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";

import useFetchRecipeDetails from "../../../hooks/useFetchRecipeDetails";
import Recipes from "./Recipes/Recipes";
import { useContextAPI } from "../../../lib/store/context/context";
import { useFetchRecipeData } from "../../../hooks/useFetchCategories";

const RecipeDetails = () => {
  const { recipeID } = useParams();
  const { recipeDetailsData } = useFetchRecipeDetails(recipeID);
  const { categoriesRecipeData, isLoading, error } = useFetchRecipeData(
    recipeDetailsData?.mealType?.[0]
  );
  const { favorites, setFavorites } = useContextAPI();

  function handleAddFavorites() {
    setFavorites((prev) => {
      return [{ ...recipeDetailsData }, ...prev];
    });
  }
  function handleRemoveFavorites() {
    setFavorites((prev) =>
      prev.filter((fav) => fav?.id.toString() !== recipeID)
    );
  }
  const isFavorites = favorites.some((fav) => fav?.id.toString() === recipeID);
  console.log(isFavorites);
  return (
    <>
      <div className="recipe_details_container container">
        <div className="recipe_details_header">
          <div className="header_left">
            <p>
              Cuisine
              <br />
              <span>{recipeDetailsData?.cuisine}</span>
            </p>
            <p>
              Difficulty
              <br />
              <span>{recipeDetailsData?.difficulty}</span>
            </p>
            <p>
              Servings
              <br />
              <span>{recipeDetailsData?.servings}</span>
            </p>
            <p>
              Prep Timing
              <br />
              <span>{recipeDetailsData?.prepTimeMinutes} Minutes</span>
            </p>
          </div>
          <div className="header_right">
            {isFavorites ? (
              <button onClick={handleRemoveFavorites}>
                <FaHeart />
              </button>
            ) : (
              <button onClick={handleAddFavorites}>
                <FaRegHeart />
              </button>
            )}
          </div>
        </div>

        <div className="recipe_details_image">
          <div className="recipe_img">
            <img src={recipeDetailsData?.image} alt={recipeDetailsData?.name} />
            <a
              target="_blank"
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                recipeDetailsData?.name
              )}`}
              className="shadow_play"
            >
              <FaPlay />
            </a>
          </div>

          <div className="recipe_details">
            <h1>{recipeDetailsData?.name}</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
              cupiditate minima corporis officia nisi fuga dicta, quas, odit
              tempora autem hic, voluptatem labore quasi. Quibusdam placeat
              possimus facere aliquid quidem nesciunt esse veritatis aut,
              facilis magni eaque, voluptatem delectus dolore eligendi soluta,
              dignissimos porro totam labore inventore sapiente est quas.
            </p>
          </div>
        </div>

        <div className="recipe_extra_details">
          <div className="ingredients">
            <h1 className="title">ingredients</h1>
            <ul>
              <li>
                <span>
                  <b>Items</b>
                </span>
              </li>
              {recipeDetailsData?.ingredients &&
                recipeDetailsData?.ingredients.length > 0 &&
                recipeDetailsData?.ingredients.map((ingredient) => {
                  return <li key={ingredient}>{ingredient}</li>;
                })}
            </ul>
          </div>

          <div className="instructions">
            <h1 className="title">Instruction</h1>
            <ul>
              {recipeDetailsData?.instructions &&
                recipeDetailsData?.instructions.length > 0 &&
                recipeDetailsData?.instructions.map((instruction) => {
                  return <li key={instruction}>{instruction}</li>;
                })}
            </ul>
          </div>
        </div>
      </div>
      {/* similiar recipe */}
      <Recipes
        limit={9}
        data={categoriesRecipeData}
        isLoading={isLoading}
        error={error}
        text="Similar picks for you"
      />
    </>
  );
};

export default RecipeDetails;
