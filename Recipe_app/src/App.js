import "./App.css";
import { useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Recipes from "./Pages/Recipes";
// import Settings from "./Pages/Settings";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cuisine from "./components/Cuisine";
import SearchedData from "./components/SearchedData";
import Ingredients from "./components/Ingredients";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container main">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/recipes" element={<Recipes />}>
            <Route path="cuisine/:category" element={<Cuisine />} />
            <Route path="searcheddata/:search" element={<SearchedData />} />
            <Route path="ingredients/:ingredient" element={<Ingredients />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
