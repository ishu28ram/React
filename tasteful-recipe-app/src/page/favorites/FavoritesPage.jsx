import React from "react";
import "./FavoritesPage.css";
import { useContextAPI } from "../../lib/store/context/context";
import { MdDelete } from "react-icons/md";

import { FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import RandomRecipe from "../HomePage/RandomRecipe/RandomRecipe";

const FavoritesPage = () => {
  const { favorites, setFavorites } = useContextAPI();

  function handleRemoveFavorites(fav) {
    setFavorites((prev) => prev.filter((f) => f?.id !== fav.id));
  }
  return (
    <>
      <div className="favourites_container container">
        <h1 className="title" style={{ marginBottom: "50px" }}>
          your Favorites{" "}
        </h1>
        {favorites && (
          <div className="favourites_grid">
            {favorites.map((fav) => {
              return (
                <div className="favourite_box" key={fav.id}>
                  <div className="img">
                    <img src={fav?.image} alt={fav.name} />
                    <div className="shadow_box">
                      <div className="fav_actions_button">
                        <button>
                          <Link to={`/recipes/${fav.id}`} className="link">
                            <FaInfoCircle />
                          </Link>
                        </button>
                        <button
                          onClick={() => {
                            handleRemoveFavorites(fav);
                          }}
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </div>
                  </div>
                  <h2>{fav.name}</h2>
                </div>
              );
            })}
            {favorites.length === 0 && (
              <p style={{ textAlign: "center" }}>your favourites is empty !</p>
            )}
          </div>
        )}
      </div>
      <RandomRecipe limit={6} text="More for You" />
    </>
  );
};

export default FavoritesPage;
