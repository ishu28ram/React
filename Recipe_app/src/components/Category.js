import React from "react";
import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiChopsticks, GiNoodles } from "react-icons/gi";
import { NavLink } from "react-router-dom";

const Category = () => {
  return (
    <div className="category-search-container">
      <NavLink to={"/recipes/cuisine/italian"} className="nav-link">
        <FaPizzaSlice className="cat-icon" />
        <h4>Italians</h4>
      </NavLink>
      <NavLink to={"/recipes/cuisine/american"} className="nav-link">
        <FaHamburger className="cat-icon" />
        <h4>America</h4>
      </NavLink>
      <NavLink to={"/recipes/cuisine/japanese"} className="nav-link">
        <GiChopsticks className="cat-icon" />
        <h4>Japanese</h4>
      </NavLink>
      <NavLink to={"/recipes/cuisine/chinese"} className="nav-link">
        <GiNoodles className="cat-icon" />
        <h4>Chinese</h4>
      </NavLink>
    </div>
  );
};

export default Category;
