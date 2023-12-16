import React from "react";
import CustomImage from "./CustomImage";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const images = [
    "/Images/gallery/img_1.jpg",
    "/Images/gallery/img_2.jpg",
    "/Images/gallery/img_3.jpg",
    "/Images/gallery/img_4.jpg",
    "/Images/gallery/img_5.jpg",
    "/Images/gallery/img_6.jpg",
    "/Images/gallery/img_7.jpg",
    "/Images/gallery/img_8.jpg",
    "/Images/gallery/img_9.jpg",
  ];

  return (
    <div className="section hero">
      <div className="col typography">
        <h1 className="title">What are we about</h1>
        <p className="info">
          Recipe Chef is a place where you can please your soul and tummy with
          delicious food recepies of all cuisine. And our service is absolutely
          free. So start exploring now.
        </p>
        <Link to={"/recipes"}>
          <button className="btn">Explore Now</button>
        </Link>
      </div>
      <div className="col gallery">
        {images.map((image, index) => (
          <CustomImage src={image} key={index} pt={"90%"} />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
