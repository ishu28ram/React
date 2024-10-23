import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useContextAPI } from "../store/context";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Link } from "react-router-dom";
import Loading from "../component/Loader/Loading";

const Wishlist = () => {
  const { userData } = useContextAPI();
  const [wishData, setWishData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getWIshData() {
      try {
        setIsLoading(true);
        const userRef = doc(db, "users", userData?.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const wishDataDoc = userSnap.data().wish || [];
          setWishData(wishDataDoc);
        } else {
          setWishData([]);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (userData && userData.uid) {
      getWIshData();
    }
  }, [userData]);

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
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const cartData = userSnap.data().cart || [];
        const existingCart = cartData.find((cart) => cart.id === product.id);
        if (!existingCart) {
          await updateDoc(userRef, { cart: arrayUnion({ ...cartItems }) });
        } else {
          alert(`${product.title} is already in cart, to but go to cart`);
        }
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  }

  async function handleRemoveFromWishList(product) {
    if (!userData || !userData.uid) {
      alert("User not authenticated. Please log in.");
      navigate("/auth");
      return;
    }
    try {
      const userRef = doc(db, "users", userData?.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const wishData = userSnap.data().wish || [];
        const existingWishItem = wishData.find(
          (wish) => wish.id === product.id
        );
        if (existingWishItem) {
          await updateDoc(userRef, { wish: arrayRemove(existingWishItem) });
          setWishData((prev) => prev.filter((wish) => wish.id !== product.id));
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleClearWisList() {
    if (!userData || !userData?.uid) {
      alert("User not authenticated. Please log in.");
      navigate("/auth");
      return;
    }

    try {
      const userRef = doc(db, "users", userData?.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const wishData = userSnap.data().wish || [];
        if (wishData.length > 0) {
          await updateDoc(userRef, {
            wish: [],
          });

          setWishData([]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className=" flex justify-center flex-col items-center gap-6 w-full">
      <div className="flex justify-between w-full">
        <h1 className="text-2xl font-extrabold">
          My wishlist (<span className="text-red-600">{wishData.length}</span>)
        </h1>
        {wishData.length > 0 && (
          <button
            className="py-2 px-6 bg-customRedBtn hover:bg-customRedHoverBtn w-[full] rounded-lg text-md font-semibold"
            onClick={handleClearWisList}
          >
            Clear Wish List
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2 ">
        {isLoading && <Loading />}
        {wishData && wishData.length > 0 ? (
          wishData?.map((product) => (
            <div className="flex flex-col  py-[12px]" key={product.id}>
              <div className="flex gap-4 border-b-2 py-2 w-full ">
                {/* img */}
                <div className="w-[150px] h-[150px] ">
                  <Link to={`/${product?.title}/${product?.id}`}>
                    <img
                      src={product?.thumbnail}
                      className="w-full rounded-lg "
                      alt={product?.title}
                    />
                  </Link>
                </div>
                {/* details */}
                <div className=" flex flex-col gap-[10px] w-full md:w-[30vw] mr-5">
                  <h1 className="text-xl font-bold">
                    <Link to={`/${product?.title}/${product?.id}`}>
                      {product?.title}
                    </Link>
                  </h1>
                  <p className=" text-md text-gray-500">
                    {product?.description}
                  </p>
                  <p className=" text-lg text-gray-700 font-medium">
                    $ {product?.price}
                  </p>

                  <button
                    className="w-full bg-customGreenBtn hover:bg-customGreenHoverBtn py-2 text-lg font-bold rounded-lg
                      "
                    onClick={() => handleAddToCart(product)}
                  >
                    {" "}
                    move to Cart
                  </button>
                </div>
                {/* remove */}
                <div className="flex-1">
                  <button onClick={() => handleRemoveFromWishList(product)}>
                    <span className="text-xl hover:text-red-600">
                      <FaTrash />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No wish items</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
