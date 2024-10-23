import React, { useEffect, useState } from "react";
import { NavLink, Link, useLocation, matchPath } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import { FaSearch } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { useContextAPI } from "../../lib/store/context/context";

import { navlinks_Data } from "../../lib/data/data";
import Sidebar from "./Sidebar/Sidebar";
import "./Navbar.css";

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const { scrollToSearch } = useContextAPI();

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkTheme]);

  const scrollToSearchBar = () => {
    if (scrollToSearch.current && scrollToSearch.current.scrollIntoView) {
      scrollToSearch.current.scrollIntoView({ behavior: "smooth" });
    }
    if (scrollToSearch.current.focusInput) {
      scrollToSearch.current.focusInput();
    }
  };

  return (
    <>
      <nav className="navbar_container container">
        <Link to="/">
          <h1>Tasteful bites</h1>
        </Link>

        <ul className="navbar_links">
          {navlinks_Data.map((nav) => {
            return (
              <li key={nav.name}>
                <NavLink to={nav.to} className="nav" activeclassname="active">
                  {nav.name}
                </NavLink>
              </li>
            );
          })}
        </ul>

        <div className="navbar_actions">
          <span
            className="nav_icons theme_icon"
            onClick={() => setIsDarkTheme((prev) => !prev)}
          >
            {isDarkTheme ? <FaSun /> : <FaMoon />}
          </span>
          <span className="nav_icons hamburger_icon">
            <FaBars onClick={() => setShowSidebar(true)} />
          </span>
        </div>
      </nav>
      {showSidebar && (
        <Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      )}
    </>
  );
};

export default Navbar;
