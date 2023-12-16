import React, { useState } from "react";
import SideBar from "./SideBar";
import { faHome, faList } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ lightMode, setLightMode }) => {
  const location = useLocation();
  const [showSideBar, setShowSideBar] = useState(false);

  const links = [
    {
      name: "Home",
      path: "/",
      icon: faHome,
    },
    {
      name: "Recipes",
      path: "/recipes",
      icon: faList,
    },
    // {
    //   name: "Settings",
    //   path: "/settings",
    //   icon: faCog,
    // },
  ];

  function closeSideBar() {
    setShowSideBar(false);
  }

  return (
    <>
      <div className="navbar container">
        <Link to="/" className="logo">
          Recipe <span>Chef</span>
        </Link>
        <div className="nav-links">
          {links.map((link) => (
            <Link
              to={link.path}
              key={link.name}
              className={location.pathname === link.path ? "active" : ""}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* <FontAwesomeIcon
          onClick={() => setLightMode(lightMode)}
          className={lightMode}
          alt="modes"
          icon={faMoon}
        /> */}

        <div
          onClick={() => setShowSideBar(!showSideBar)}
          className={showSideBar ? "sidebar-btn active" : "sidebar-btn"}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
      {showSideBar && <SideBar closeSideBar={closeSideBar} links={links} />}
    </>
  );
};

export default Navbar;
