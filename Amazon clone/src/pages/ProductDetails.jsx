import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaStar, FaThumbsUp } from "react-icons/fa";
import avator from "../asset/avator.png";

import lowestPrice from "../asset/lowestPrice.png";
import returns from "../asset/returns.png";
import cashOnDelivery from "../asset/cashOnDelivery.png";

import Product from "../component/product/Product";
import { FaRegThumbsUp } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGetSingleProducts from "../hooks/useGetSingleProducts";
import Loading from "../component/Loader/Loading";
import useGetAllProducts from "../hooks/useGetAllProducts";
import { useContextAPI } from "../store/context";

import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import Review from "../component/rating/Review";
import ReviewSummary from "../component/rating/ReviewSummary";

const ProductDetails = () => {
  const [itemQuantities, setItemQuantities] = useState({});
  const { userData, showReviewModal, setShowReviewModal } = useContextAPI();
  const { id } = useParams();
  const { singleProducts, loading, error } = useGetSingleProducts(id);
  const { allProducts } = useGetAllProducts();
  const [isInCart, setIsInCart] = useState(false);
  const [isInWIshList, setIsInWishList] = useState(false);
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  useEffect(() => {
    const checkIfInCart = async () => {
      if (userData?.uid) {
        const userRef = doc(db, "users", userData.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userCart = userDoc.data().cart || [];
          const existingCartprod = userCart.find(
            (cart) => cart.id === singleProducts?.id
          );
          setIsInCart(!!existingCartprod);
        }
      }
    };
    checkIfInCart();
  }, [userData, singleProducts?.id]);

  useEffect(() => {
    async function checkIsInWIsh() {
      const userRef = doc(db, "users", userData?.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const wishData = userSnap.data().wish || [];
        const existingWishProd = wishData.find(
          (wish) => wish.id === singleProducts?.id
        );
        setIsInWishList(!!existingWishProd);
      }
    }
    checkIsInWIsh();
  }, [userData, singleProducts?.id]);

  useEffect(() => {
    async function getReviewData() {
      try {
        const reviewRef = doc(db, "reviews", id);
        const reviewsSnap = await getDoc(reviewRef);
        if (reviewsSnap.exists()) {
          const reviewsData = reviewsSnap.data().reviews || [];
          if (reviewsData) {
            setReviews(reviewsData);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    getReviewData();
  }, [reviews]);

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

  async function updateProductCart(e, product) {
    const newQuantity = Number(e.target.value);
    setItemQuantities((prev) => ({
      ...prev,
      [product.id]: newQuantity,
    }));

    try {
      const userRef = doc(db, "users", userData.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userCarts = userSnap.data().cart || [];
        const existingCart = userCarts.find((cart) => cart.id === product.id);

        if (existingCart) {
          const updatedCartItem = {
            ...existingCart,
            quantity: newQuantity,
          };
          await updateDoc(userRef, {
            cart: arrayRemove(existingCart),
          });
          await updateDoc(userRef, {
            cart: arrayUnion(updatedCartItem),
          });
        }
      }

      setCartProducts((prevProducts) =>
        prevProducts.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      console.log(err);
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
          console.log(`Product ${product.title} removed from cart.`);
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
    <div className=" flex flex-col gap-4">
      {loading && <Loading />}
      {/* img and deletails */}
      <div className="flex gap-[3rem] flex-col lg:flex-row w-full">
        {/* img details */}
        <div className="flex gap-8 flex-col  w-full xl:w-full relative">
          <div className="w-full border-2 border-gray-300 rounder-lg bg-gray-100">
            <img
              src={singleProducts?.thumbnail}
              className="w-full object-contain rounded-lg"
              alt={singleProducts?.title}
            />
          </div>

          <div className="absolute right-3 top-5 flex items-center p-3 rounded-full bg-slate-900  text-[1.5rem]">
            {isInWIshList ? (
              <button
                title="remove from wishlist"
                className="text-red-600"
                onClick={() => handleRemoveFromWishList(singleProducts)}
              >
                <FaHeart />
              </button>
            ) : (
              <button
                title="add to wishlist"
                className="text-white hover"
                onClick={() => handleAddToWishList(singleProducts)}
              >
                <FaRegHeart />
              </button>
            )}
          </div>
        </div>

        {/* product details */}
        <div className="w-full lg:w-[100%]">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-extrabold">{singleProducts?.title}</h1>
            <h3 className="text-lg text-gray-700">
              {singleProducts?.description}
            </h3>
            <p className="text-xl capitalize text-gray-500">
              {singleProducts?.brand}
            </p>
            <div className="flex gap-6 items-center">
              <p className="text-black text-3xl font-semibold">
                $ {singleProducts?.price}
              </p>
              <select
                className="w-[50px] px-2 py-1 cursor-pointer bg-gray-200"
                onChange={(e) => {
                  updateProductCart(e, singleProducts);
                }}
                value={itemQuantities[singleProducts?.id] || 1}
              >
                {Array.from({ length: singleProducts?.stock || 5 }).map(
                  (_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="flex gap-4 items-center">
              <button className="flex gap-1 items-center bg-customGreenBtn px-3 py-2 rounded-2xl">
                <span className="text-xl font-semibold">
                  {singleProducts?.rating}
                </span>
                <span>
                  <FaStar />
                </span>
              </button>
              {reviews.length > 0 ? (
                <p className="text-md text-gray-400">
                  {reviews.length} ratings
                </p>
              ) : (
                <p className="text-md text-gray-400">no ratings</p>
              )}
            </div>
            <p>Free delivery</p>
            <div className="flex justify-around items-center bg-[#E7EEFF] py-3 rounded-lg">
              <p className="flex justify-center items-center flex-col ">
                <img
                  src={lowestPrice}
                  alt="lowestPrice"
                  className="w-[60px] h-[60px]"
                />
                <span className="text-md text-gray-600">Lowest Price</span>
              </p>
              <p className="flex justify-center items-center flex-col  ">
                <img
                  src={cashOnDelivery}
                  alt="cashOnDelivery"
                  className="w-[60px] h-[60px]"
                />
                <span className="text-md text-gray-600">Cash on Delivery</span>
              </p>
              <p className="flex justify-center items-center flex-col ">
                <img
                  src={returns}
                  alt="returns"
                  className="w-[60px] h-[60px]"
                />
                <span className="text-md text-gray-600">7-day Returns</span>
              </p>
            </div>
            {isInCart ? (
              <button
                className="w-full bg-customRedBtn hover:bg-customRedHoverBtn py-3 text-lg font-extrabold rounded-lg"
                onClick={() => handleRemoveFromCart(singleProducts)}
              >
                Remove From Cart
              </button>
            ) : (
              <button
                className="w-full bg-customGreenBtn hover:bg-customGreenHoverBtn py-3 text-lg font-extrabold rounded-lg"
                onClick={() => handleAddToCart(singleProducts)}
              >
                Add to Cart
              </button>
            )}
            <Link to="/cart">
              <button className="w-full bg-[#b8cdfe] hover:bg-[#a6bef5] py-3 text-lg font-extrabold rounded-lg">
                go to Cart
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* REVIEW */}
      <div className="my-[1rem]">
        <h1 className="text-3xl font-semibold my-[3rem]">
          Product reviews and ratings
        </h1>
        <div className="flex flex-col gap-4 border border-1 p-6 border-gray-300">
          {/* <div></div> */}
          {/* <ReviewSummary /> */}
          <div className="flex flex-col gap-6">
            {reviews?.map((review) => {
              const formatDate = (dateString) => {
                const options = {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  hour12: true,
                  timeZoneName: "short",
                };
                const date = new Date(dateString);
                return date.toLocaleDateString("en-US", options);
              };

              const reviewTimeStamp =
                review?.reviewTimeStamp?.toDate?.() || review?.reviewTimeStamp;
              return (
                <div
                  className="flex flex-col gap-3 border-b-2 pb-[2rem]"
                  key={review?.reviewTimeStamp}
                >
                  <header className="flex items-center gap-4">
                    <img
                      src={avator || review?.userProfile}
                      alt={review?.userName}
                      className="w-[40px] h-[40px] object-cover rounded-full border-[1px] border-slate-400"
                    />
                    <p className="text-lg font-semibold">{review?.userName}</p>
                  </header>
                  <div className="flex gap-4 items-center">
                    <button className="flex gap-1 items-center bg-customGreenBtn px-3 py-1 rounded-2xl">
                      <span className="text-sm font-semibold">
                        {review?.rating}
                      </span>
                      <span className="text-xs">
                        <FaStar />
                      </span>
                    </button>
                    <p className="text-md text-gray-400">
                      {formatDate(reviewTimeStamp).split("at")[0]}
                    </p>
                  </div>
                  <p className="text-md font-bold ">{review?.reviewTitle}</p>
                  <p>{review?.reviewDescription}</p>
                  {review?.reviewImages && (
                    <div className="flex gap-2">
                      {review?.reviewImages?.map((img, index) => (
                        <img
                          src={img}
                          alt={`Review Image 1`}
                          key={img}
                          className="h-20 w-20 object-cover rounded-md border-2 border-gray-500"
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {reviews.length === 0 && (
              <p className="text-xl font-medium">
                no comments, Be a first to write review{" "}
              </p>
            )}
            {/* {singleProducts?.reviews.length > 0 &&
              singleProducts?.reviews.slice(0, 5).map((review) => {
                const formatDate = (dateString) => {
                  const options = {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  };
                  const date = new Date(dateString);
                  return date.toLocaleDateString("en-US", options);
                };
                return (
                  <div
                    className="flex flex-col gap-3 border-b-2 pb-[2rem]"
                    key={review?.id}
                  >
                    <header className="flex items-center gap-4">
                      <img
                        src={avator}
                        alt={review?.reviewerName}
                        className="w-[40px] h-[40px] object-cover rounded-full border-[1px] border-slate-400"
                      />
                      <p className="text-lg font-semibold">
                        {review?.reviewerName}
                      </p>
                    </header>
                    <div className="flex gap-4 items-center">
                      <button className="flex gap-1 items-center bg-customGreenBtn px-3 py-1 rounded-2xl">
                        <span className="text-sm font-semibold">
                          {review?.rating}
                        </span>
                        <span className="text-xs">
                          <FaStar />
                        </span>
                      </button>
                      <p className="text-md text-gray-400">
                        {formatDate(review?.date)}
                      </p>
                    </div>
                    <p className="text-md font-bold ">{review?.comment}</p>

                    <button className="flex gap-3 items-center">
                      <span className="text-gray-500 text-xl">
                        <FaRegThumbsUp />
                      </span>
                      <span className="text-md text-gray-400">
                        helpful (33)
                      </span>
                    </button>
                  </div>
                );
              })} */}

            {/* add reviews */}
            {showReviewModal && <Review product={singleProducts} />}
            <button
              className="border-2 text-md font-medium hover:font-bold border-gray-400 hover:border-gray-500 py-4 rounded-[30px]"
              onClick={() => setShowReviewModal(!showReviewModal)}
            >
              write ur review
            </button>
          </div>
        </div>
      </div>
      {/* similiar products */}
      <h1 className="text-3xl font-semibold my-[3rem]">People also viewed</h1>
      <div className="flex flex-col gap-[2rem] justify-start items-center md:items-start">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[3rem]">
          {allProducts &&
            allProducts.length > 0 &&
            allProducts
              .slice(21, 30)
              .map((product) => <Product product={product} key={product.id} />)}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
