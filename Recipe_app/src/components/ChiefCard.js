import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const ChiefCard = ({ chief }) => {
  return (
    <div className="chief-card">
      <div className="chief-card-image">
        <img src={chief.img} alt={chief.name} />
      </div>
      <div className="chief-card-info">
        <h3 className="chief-card-name">{chief.name}</h3>
        <p className="chief-card-recipe-count">Recipes: {chief.recipesCount}</p>
        <p className="chief-card-cuisine">Cuisine: {chief.cuisine}</p>
        <p className="chief-card-icons">
          <FontAwesomeIcon icon={faFacebook} />
          <FontAwesomeIcon icon={faTwitter} />
          <FontAwesomeIcon icon={faInstagram} />
        </p>
      </div>
    </div>
  );
};

export default ChiefCard;
