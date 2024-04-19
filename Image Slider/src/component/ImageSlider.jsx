import React from "react";
import { DUMMY_DATA } from "../Data/data";
import {
  BiSolidLeftArrowCircle,
  BiSolidRightArrowCircle,
} from "react-icons/bi";
import { useState } from "react";
import { useEffect } from "react";


const ImageSlider = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [currentImage]);

  function handlePrev() {
    setCurrentImage(
      currentImage === 0 ? DUMMY_DATA.length - 1 : currentImage - 1
    );
  }

  function handleNext() {
    setCurrentImage(
      currentImage === DUMMY_DATA.length - 1 ? 0 : currentImage + 1
    );
  }

  function handleJumpImage(index) {
    setCurrentImage(index);
  }
  return (
    <div className="main-container">
      <div className="image-container">
        <BiSolidLeftArrowCircle
          size={30}
          className="arrow arrow-left"
          onClick={handlePrev}
        />

        {DUMMY_DATA.map((data, i) => {
          return (
            <img
              key={data.id}
              src={data.image}
              alt="a slider image"
              className={currentImage === i ? "img" : "img hidden-img"}
            />
          );
        })}

        <BiSolidRightArrowCircle
          size={30}
          className="arrow arrow-right"
          onClick={handleNext}
        />

        <div className="overlay">
          <div className="details">
            <h1>{DUMMY_DATA[currentImage].title}</h1>
            <h3>{DUMMY_DATA[currentImage].message}</h3>
          </div>
        </div>

        <div className="indicators-container">
          {DUMMY_DATA.map((_, i) => (
            <button
              key={i}
              className={
                currentImage === i
                  ? "indicator-fill"
                  : "indicator-fill update-indicator-fill"
              }
              onClick={() => handleJumpImage(i)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
