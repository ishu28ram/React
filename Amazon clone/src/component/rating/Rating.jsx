import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const Rating = ({ totalStars = 5, value, onRatingChange }) => {
  const [hoverValue, setHoverValue] = useState(0);
  const [ratingValue, setRatingValue] = useState(0);
  const [ratingText, setRatingText] = useState("");

  const handleClick = (index) => {
    const newRating = index + 1;
    setRatingValue(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  const handleHover = (index) => {
    setHoverValue(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  const getRatingText = (value) => {
    switch (value) {
      case 1:
        return "Very Bad";
      case 2:
        return "Bad";
      case 3:
        return "Good";
      case 4:
        return "Very Good";
      case 5:
        return "Excellent";
      default:
        return "";
    }
  };

  useEffect(() => {
    setRatingText(getRatingText(ratingValue));
  }, [ratingValue]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Rate this product</h1>
      <div className="flex gap-4">
        {Array.from({ length: totalStars }, (_, index) => {
          const isFilled =
            hoverValue > 0 ? index < hoverValue : index < ratingValue;

          return (
            <button
              key={index}
              className=" flex gap-2"
              onClick={() => handleClick(index)}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={handleMouseLeave}
            >
              <FaStar
                style={{
                  color: isFilled ? "#f5a623" : "#e0e0e0",
                  fontSize: "2rem",
                }}
              />
            </button>
          );
        })}
        <p className="text-red-600 text-lg font-medium ">{ratingText}</p>
      </div>
    </div>
  );
};

export default Rating;
