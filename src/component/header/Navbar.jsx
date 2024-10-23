import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaBars } from "react-icons/fa";

import { MdAccountCircle } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import useGetSearchProducts from "../../hooks/useSearchProducts";
import { useContextAPI } from "../../store/context";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";

const Navbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const { getSearchProducts } = useGetSearchProducts();
  const navigate = useNavigate();
  const { userData, isOpen, setIsOpen } = useContextAPI();

  function handleSearchSubmit(e) {
    e.preventDefault();
    getSearchProducts(searchInput);
    navigate(`/search/${searchInput}`);
    setSearchInput("");
  }
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 flex text-white gap-8 justify-between items-center w-full bg-customGray px-[2rem] md:px-[5rem] py-[1.5rem] z-50">
        <Link to="/" className="logo flex-1 ">
          <h1 className="text-3xl font-extrabold">ZapCart</h1>
        </Link>
        <div className="search w-full">
          <form
            onSubmit={handleSearchSubmit}
            className="flex gap-4 rounded-lg bg-white px-4 py-2"
          >
            <input
              type="text"
              placeholder="search product here..."
              className="w-full text-black bg-transparent outline-none border-none"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className="text-black scale-x-[-1] text-xl">
              <FaSearch />
            </button>
          </form>
        </div>

        <h1 className="text-md font-semibold justify-center text-customGreenBtn flex-wrap capitalize flex gap-1">
          <span> Hello,</span>
          <span>{userData?.username.split("_" || "-" || " ")[0]}</span>
        </h1>

        <div className="relative ">
          <button className="text-2xl" onClick={() => setIsOpen(true)}>
            <FaBars />
          </button>
          {isOpen && (
            <div className="absolute top-10 rounded-tl-lg rounded-bl-lg rounded-br-lg right-2 px-[1rem] w-[150px]  rounded-sm action-btns flex-1 flex flex-col bg-slate-200 z-[50] ">
              <Link
                to="/wishlist"
                className=" py-3 border-b-[1px] border-gray-400 hover:font-extrabold"
                onClick={() => setIsOpen(false)}
              >
                <button className="text-[21px] text-red-600 flex gap-2">
                  <span className="text-black">
                    <FaHeart />
                  </span>
                  <span className="text-black text-[16px]">wishlist</span>
                </button>
              </Link>
              <Link
                to="/cart"
                className="py-3  border-b-[1px] border-gray-400 hover:font-extrabold"
                onClick={() => setIsOpen(false)}
              >
                <button className="text-[21px] flex gap-2">
                  <span className="text-black">
                    <FaShoppingCart />
                  </span>
                  <span className="text-black text-[16px]">cart</span>
                </button>
              </Link>
              <Link
                to="/auth"
                className="py-3  border-b-[1px] border-gray-400 hover:font-extrabold"
                onClick={() => setIsOpen(false)}
              >
                <button
                  className="text-[22px] flex gap-2"
                  onClick={() => signOut(auth)}
                >
                  <span className="text-black">
                    <MdAccountCircle />
                  </span>
                  <span className="text-black text-[16px]">Logout</span>
                </button>
              </Link>
            </div>
          )}
        </div>
      </header>
      {isOpen && (
        <>
          <div
            className="absolute top-0 left-0 w-full h-full bg-transparent z-[49]"
            onClick={() => setIsOpen(false)}
          ></div>
        </>
      )}
    </>
  );
};

export default Navbar;
