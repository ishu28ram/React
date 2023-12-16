import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RandomContainer = () => {
  const [random, setRandom] = useState([]);

  const fetchDataAPI = async () => {
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/random.php`
    );
    const response = await data.json();
    setRandom(response.meals);
    // console.log(setRandom(response.meals).sort(() => Math.random() - 0.5));
    console.log("random" + response.meals);
  };
  useEffect(() => {
    fetchDataAPI();
  }, []);

  return (
    <div className="random-container section">
      {random.map((item, index) => {
        return (
          <Link to={"/recipes/ingredients/" + item.idMeal}>
            <div className="recipe-card" key={index}>
              <p>{item.strMeal}</p>
              <img src={item.strMealThumb} alt={item.strMeal} />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default RandomContainer;
//  {
//    random.map((item, index) => {
//      return (
//        <SplideSlide>
//          <div className="recipe-card" key={index}>
//            <p>{item.strMeal}</p>
//            <img src={item.strMealThumb} alt={item.strMeal} />
//            <div className="gradient"></div>
//          </div>
//        </SplideSlide>
//      );
//    });
//  }
