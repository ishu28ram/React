import React from "react";
import ChiefCard from "./ChiefCard";

export const cheifsLists = [
  {
    name: "Juan Carlos",
    img: "/Images/top-chiefs/img_1 (1).jpg",
    recipesCount: "10",
    cuisine: "Mexican",
  },
  {
    name: "John Doe",
    img: "/Images/top-chiefs/img_2.jpg",
    recipesCount: "05",
    cuisine: "Japanese",
  },
  {
    name: "Erich Maria",
    img: "/Images/top-chiefs/img_3.jpg",
    recipesCount: "13",
    cuisine: "Italian",
  },
  {
    name: "Chris Brown",
    img: "/Images/top-chiefs/img_4.jpg",
    recipesCount: "08",
    cuisine: "American",
  },
  {
    name: "Blake Lively",
    img: "/Images/top-chiefs/img_5.jpg",
    recipesCount: "09",
    cuisine: "French",
  },
  {
    name: "Ben Affleck",
    img: "/Images/top-chiefs/img_6.jpg",
    recipesCount: "04",
    cuisine: "Indian",
  },
].sort(() => Math.random() - 0.5);

const Topchief = () => {
  return (
    <div className="section chiefs">
      <h1 className="title">Our Top Chefs</h1>
      <div className="top-chief-container">
        {cheifsLists.map((chief, index) => {
          return <ChiefCard chief={chief} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Topchief;
