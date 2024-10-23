import React, { useEffect, useState } from "react";
import "./SearchPage.css";
import Recipes from "../RecipePage/RecipeDetails/Recipes/Recipes";
import { FaSearch } from "react-icons/fa";
import useFetchSearchData from "../../hooks/useFetchSearchData";
import { useContextAPI } from "../../lib/store/context/context";
import { MdCancel } from "react-icons/md";
import RandomRecipe from "../HomePage/RandomRecipe/RandomRecipe";

const SearchPage = () => {
  const { inputValue, setInputValue } = useContextAPI();
  const [debouncedValue, setDebouncedValue] = useState("");
  const { searchData, fetchData, isLoading, error } = useFetchSearchData();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 100);

    return () => {
      setDebouncedValue("");
      clearTimeout(timer);
    };
  }, [inputValue]);

  function handleInput(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setInputValue("");
    fetchData(debouncedValue);
  }
  const handleCancel = () => {
    setInputValue("");
  };
  return (
    <>
      <div className="recipes_main_container container">
        <div className="searchBar_container container">
          <form onSubmit={handleSubmit} className="inputField_container">
            <input
              type="text"
              placeholder="please search ur recipe"
              value={inputValue}
              onChange={handleInput}
            />
            <button type="submit">
              {inputValue ? <MdCancel onClick={handleCancel} /> : <FaSearch />}
            </button>
          </form>
        </div>
      </div>
      {searchData && searchData.length > 0 ? (
        <Recipes
          data={searchData}
          isLoading={isLoading}
          error={error}
          text="Search Results"
        />
      ) : (
        <p
          style={{
            padding: "30px",
            textAlign: "center",
          }}
        >
          No Search Found
        </p>
      )}
      <RandomRecipe limit={6} text="Hot searches" />
    </>
  );
};

export default SearchPage;
