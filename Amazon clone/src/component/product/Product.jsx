import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { useContextAPI } from "../../store/context";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

const Product = ({ product }) => {
  const navigate = useNavigate();
  const { userData } = useContextAPI();
  const [isInCart, setIsInCart] = useState(false);
  const [isInWIshList, setIsInWishList] = useState(false);

  useEffect(() => {
    const checkIfInCart = async () => {
      if (userData?.uid) {
        const userRef = doc(db, "users", userData.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userCart = userDoc.data().cart || [];
          const existingCartprod = userCart.find(
            (cart) => cart.id === product.id
          );
          setIsInCart(!!existingCartprod);
        }
      }
    };
    checkIfInCart();
  }, [userData, product.id]);

  useEffect(() => {
    async function checkIsInWIsh() {
      const userRef = doc(db, "users", userData?.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const wishData = userSnap.data().wish || [];
        const existingWishProd = wishData.find(
          (wish) => wish.id === product.id
        );
        setIsInWishList(!!existingWishProd);
      }
    }
    checkIsInWIsh();
  }, [userData, product.id]);

  async function handleAddToCart(product) {
    if (!userData || !userData?.uid) {
      alert("User not authenticated. Please log in.");
      navigate("/auth");
      return;
    }

    const cartItems = {
      ...product,
      quantity: 1,
      timestamp: new Date(),
    };

    try {
      const userRef = doc(db, "users", userData?.uid);

      await updateDoc(userRef, {
        cart: arrayUnion({ ...cartItems }),
      });

      setIsInCart(true);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  }

  async function handleRemoveFromCart(product) {
    if (!userData || !userData?.uid) {
      alert("User not authenticated. Please log in.");
      navigate("/auth");
      return;
    }

    try {
      const userRef = doc(db, "users", userData.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userCart = userDoc.data().cart || [];
        const cartItem = userCart.find((cart) => cart.id === product.id);

        if (cartItem) {
          await updateDoc(userRef, {
            cart: arrayRemove(cartItem),
          });

          setIsInCart(false);
        }
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  }

  async function handleAddToWishList(product) {
    if (!userData || !userData.uid) {
      alert("User not authenticated. Please log in.");
      navigate("/auth");
      return;
    }

    try {
      const userRef = doc(db, "users", userData.uid);
      const userSnap = await getDoc(userRef);
      const wishItems = {
        ...product,
        timestamp: new Date(),
      };
      if (userSnap.exists()) {
        await updateDoc(userRef, { wish: arrayUnion({ ...wishItems }) });

        setIsInWishList(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleRemoveFromWishList(product) {
    if (!userData || !userData.uid) {
      alert("User not authenticated. Please log in.");
      navigate("/auth");
      return;
    }
    try {
      const userRef = doc(db, "users", userData.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const wishData = userSnap.data().wish || [];
        const existingWishItem = wishData.find(
          (wish) => wish.id === product.id
        );
        if (existingWishItem) {
          await updateDoc(userRef, { wish: arrayRemove(existingWishItem) });

          setIsInWishList(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="p-2 flex flex-col gap-2 rounded-lg cursor-pointer overflow-hidden relative hover:shadow-[5px_0px_10px_rgba(0,0,0,0.3)]">
      <Link
        to={`/${product?.title}/${product?.id}`}
        className="overflow-hidden bg-gray-100"
      >
        <img
          src={product?.thumbnail}
          alt={product?.title}
          className="w-[350px] h-[350px] object-contain transition-transform duration-300 transform hover:scale-110 "
        />
      </Link>
      <div className="absolute right-6 p-[8px] top-6 flex items-center text-[1rem] rounded-full bg-slate-800">
        {isInWIshList ? (
          <button
            className="text-red-600"
            onClick={() => handleRemoveFromWishList(product)}
          >
            <FaHeart />
          </button>
        ) : (
          <button
            className="text-white hover"
            onClick={() => handleAddToWishList(product)}
          >
            <FaRegHeart />
          </button>
        )}
      </div>
      <div className="flex flex-col gap-2 px-4">
        <Link to="/productName/id">
          <h1 className="text-2xl font-semibold capitalize">
            {product?.title.length < 20
              ? product?.title
              : product?.title.slice(0, 22) + "...."}
          </h1>
        </Link>
        <h3 className="text-xl text-gray-400">{product?.brand}</h3>
        <Link to="/productName/id" className="text-[18px] flex-wrap">
          {product?.description.slice(0, 30) + "...."}
        </Link>
        <div className="flex gap-3 items-center">
          <p className=" text-gray-500">$ {product?.price}</p>
        </div>
        <div className="flex gap-4 items-center">
          <button className="flex gap-1 items-center bg-customGreenBtn px-3 py-2 rounded-2xl">
            <span className="text-xl font-semibold">{product?.rating}</span>
            <span>
              <FaStar />
            </span>
          </button>
          <p className="text-md text-gray-400">
            {product?.reviews?.length} ratings
          </p>
        </div>
      </div>
      {isInCart ? (
        <button
          className="bg-customRedBtn w-full hover:bg-customRedHoverBtn text-lg font-bold px-4 py-3 rounded-lg mt-2"
          onClick={() => handleRemoveFromCart(product)}
        >
          Remove from Cart
        </button>
      ) : (
        <button
          className="bg-customGreenBtn w-full hover:bg-customGreenHoverBtn text-lg font-bold px-4 py-3 rounded-lg mt-2"
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default Product;
