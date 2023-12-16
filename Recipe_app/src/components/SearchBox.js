import React, { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function clickHandler(e) {
    e.preventDefault();
    navigate("searcheddata/" + search);
    setSearch("");
  }
  // const searchRecipe = async () => {
  //   const randomrecipe =
  //     await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}
  //   `);
  //   const res = await randomrecipe.json();
  //   setSearchedRecipe(res.meals);
  // };

  // useEffect(() => {
  //   searchRecipe();
  // }, []);

  return (
    <form className="search-box" onSubmit={clickHandler}>
      <input
        type="text"
        placeholder="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
};

export default SearchBox;
