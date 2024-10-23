import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { navlinks_Data } from "../../../lib/data/data";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  return (
    <div className={`sidebar_container ${showSidebar ? "open" : ""}`}>
      <button className="nav_close_icons">
        <IoClose onClick={() => setShowSidebar(false)} />
      </button>
      <ul className="nav_links">
        {navlinks_Data.map((navlink) => {
          return (
            <Link to={navlink.to} className="navs">
              <li onClick={() => setShowSidebar(false)}>{navlink.name}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
