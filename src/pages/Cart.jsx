import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import discount from "../asset/discount.webp";
import { Link, useNavigate } from "react-router-dom";
import { useContextAPI } from "../store/context";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import Loading from "../component/Loader/Loading";

const Cart = () => {
  const [itemQuantities, setItemQuantities] = useState({});
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [showCoupon, setShowCoupon] = useState(0);

  const [cartProducts, setCartProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const totalCartDiscountPrice = 2;
  const { userData } = useContextAPI();

  useEffect(() => {
    async function getCartItems() {
      try {
        setIsLoading(true);
        const userRef = doc(db, "users", userData.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userCarts = userSnap.data().cart || [];
          setCartProducts(userCarts);

          const initialQuantities = {};
          userCarts.forEach((item) => {
            initialQuantities[item.id] = item.quantity || 1;
          });
          setItemQuantities(initialQuantities);
        } else {
          setCartProducts([]);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (userData && userData.uid) {
      getCartItems();
    }
  }, [userData]);

  useEffect(() => {
    const totalProductPrice = cartProducts.reduce((acc, item) => {
      const quantity = itemQuantities[item.id] || 1;
      return acc + item.price * quantity;
    }, 0);

    setTotalCartPrice(totalProductPrice);
  }, [cartProducts, itemQuantities]);

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

          setCartProducts((prevProducts) =>
            prevProducts.filter((item) => item.id !== product.id)
          );
        }
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  }
  async function handleClearCart() {
    if (!userData || !userData?.uid) {
      alert("User not authenticated. Please log in.");
      navigate("/auth");
      return;
    }

    try {
      const userRef = doc(db, "users", userData.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userCarts = userSnap.data().cart || [];
        if (userCarts.length > 0) {
          await updateDoc(userRef, {
            cart: [],
          });

          setCartProducts([]);
          setTotalCartPrice(0);
          setShowCoupon(false);
        }
      }
    } catch (err) {
      console.log(err);
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
        const wishData = userSnap.data().wish || [];
        const existingWish = wishData.find((wish) => wish.id === product.id);
        if (!existingWish) {
          await updateDoc(userRef, { wish: arrayUnion({ ...wishItems }) });
        } else {
          alert(`${product.title} is already in wishlist`);
          console.log("Item is already in the wish list.");
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  const finalTotal = showCoupon
    ? (totalCartPrice - totalCartDiscountPrice).toFixed(2)
    : totalCartPrice.toFixed(2);

  async function handlePayment() {
    if (!userData || !userData.uid) {
      alert("User not authenticated. Please log in.");
      navigate("/auth");
      return;
    }
    try {
      const userRef = doc(db, "users", userData.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const total = finalTotal;
        console.log(total);
        await updateDoc(userRef, {
          total: total,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      {/* products */}
      <div className="flex flex-col md:flex-row w-full gap-[4rem]">
        <div className=" flex flex-col gap-[3rem] w-full">
          {cartProducts.length === 0 && (
            <>
              <p className="text-center text-4xl font-bold">Cart is empty</p>
              <Link to="/" className="self-center">
                <button className="text-md py-2 px-4 rounded-lg font-semibold bg-customGreenBtn">
                  go back to shopping
                </button>
              </Link>
            </>
          )}
          {cartProducts.length > 0 && (
            <h1 className="text-3xl font-semibold capitalize">
              product details
            </h1>
          )}
          {/* main */}
          {/* prodct details */}
          <div className="categories overflow-y-scroll flex-1 h-full md:h-[70vh]  ">
            {isLoading && <Loading />}
            {cartProducts?.map((product) => {
              return (
                <div className="flex flex-col gap-4 py-[12px]" key={product.id}>
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
                    <div className=" flex flex-col gap-[10px] w-full md:w-[30vw]">
                      <h1 className="text-xl font-semibold">
                        {product?.title}
                      </h1>
                      <div className="flex gap-3 items-center">
                        <p className=" text-md text-gray-500">
                          $ {product?.price}
                        </p>
                      </div>
                      <select
                        className="w-[50px] px-2 py-1 cursor-pointer bg-gray-200"
                        onChange={(e) => {
                          updateProductCart(e, product);
                        }}
                        value={itemQuantities[product.id] || 1}
                      >
                        {Array.from({ length: product?.stock || 5 }).map(
                          (_, i) => (
                            <option key={i} value={i + 1}>
                              {i + 1}
                            </option>
                          )
                        )}
                      </select>
                      <button
                        className="flex gap-3 items-center hover:text-customRedBtn text-gray-600"
                        onClick={() => handleAddToWishList(product)}
                      >
                        <span>move to wishlist</span>
                      </button>
                    </div>
                    {/* remove */}
                    <div className="flex-1">
                      <button onClick={() => handleRemoveFromCart(product)}>
                        <span className="text-xl">
                          <IoCloseSharp />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* seperator */}
        <div className="h-[80vh] w-[1px] hidden md:block bg-gray-300 "></div>

        {/* total price */}
        <div className="w-full pb-[3rem]">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between">
              <h1 className="text-2xl font-semibold">
                Price Details ({cartProducts.length}{" "}
                {cartProducts.length === 1 ? "item" : "items"})
              </h1>
              {cartProducts.length > 0 && (
                <button
                  className="bg-[#E7EEFF] px-4 py-2 font-medium text-sm hover:text-red-600 rounded-md"
                  onClick={() => setShowCoupon(!showCoupon)}
                >
                  {showCoupon ? "Remove coupon" : "Apply coupon"}
                </button>
              )}
            </div>
            <div className="flex flex-col gap-3 pb-6 border-b-4">
              <div className="flex justify-between">
                <p className="text-xl text-gray-600"> Total Product Price</p>
                <p className="text-xl font-semibold">
                  $ {totalCartPrice.toFixed(2)}
                </p>
              </div>
              {showCoupon ? (
                <div className="flex justify-between">
                  <p className="text-xl text-gray-600"> Total Discounts</p>
                  <p className="text-xl font-semibold">
                    - $ {totalCartDiscountPrice}
                  </p>
                </div>
              ) : (
                <></>
              )}
            </div>

            {/* total order */}
            <div className="flex justify-between">
              <p className="text-2xl font-semibold"> Order Total</p>
              <p className="text-xl font-extrabold text-green-500">
                $ {finalTotal}
              </p>
            </div>
            {/* discount display */}
            {showCoupon ? (
              <div className="flex gap-2 bg-[#D3F4EA]  justify-center py-4 items-center rounded-sm">
                <img
                  src={discount}
                  alt="discount"
                  className="w-[25px] h-[25px]"
                />
                <p>Yay? your total discount is ${totalCartDiscountPrice}</p>
              </div>
            ) : (
              <></>
            )}
            {cartProducts.length > 0 && (
              <>
                <span className="text-center font-medium text-sm">
                  Clicking on 'Continue' will not deduct any money
                </span>
                <Link to="/payment">
                  <button
                    className="w-full bg-customGreenBtn hover:bg-customGreenHoverBtn py-3 text-lg font-extrabold rounded-lg"
                    onClick={handlePayment}
                  >
                    Continue
                  </button>
                </Link>
                <button
                  className="w-full bg-customRedBtn hover:bg-customRedHoverBtn py-3 text-lg font-extrabold rounded-lg"
                  onClick={handleClearCart}
                >
                  clear cart
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
