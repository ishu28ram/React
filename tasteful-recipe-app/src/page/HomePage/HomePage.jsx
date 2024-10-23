import React, { useEffect, useRef, useState } from "react";
import "./HomePage.css";

import ThankLetter from "../../component/ThankLetter/ThankLetter";
import RandomRecipe from "./RandomRecipe/RandomRecipe";
import BannerHome from "./BannerHome/BannerHome";
import SearchBar from "../../component/SearchBar/SearchBar";
import { useContextAPI } from "../../lib/store/context/context";

const HomePage = () => {
  const { scrollToSearch } = useContextAPI();

  return (
    <div className="home_container">
      <BannerHome />
      <RandomRecipe limit={3} keyword="" text="Super Delicious" />

      <ThankLetter />
      <RandomRecipe limit={6} keyword="" text="Top picks for you" />
    </div>
  );
};

export default HomePage;
