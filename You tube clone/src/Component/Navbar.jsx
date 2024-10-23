import { Box, Stack } from "@mui/material";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import logo from "../Asset/logo1.png";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchterm, setSearchterm] = useState("");
  const navigate = useNavigate();

  const onhandleSubmit = (e) => {
    e.preventDefault();

    if (searchterm) {
      navigate(`/search/${searchterm}`);
      setSearchterm("");
    }
  };
  return (
    <Box
      direction="row"
      alignItems="center"
      justifyContent='center'
      px={4}
      py={2.5}
      borderBottom= "1px solid #3d3d3d"
      sx={{
        position: "sticky",
        top: 0,
        zIndex:999,
        background: "#000",

      }}
    >
     
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            style={{ width: "130px", height: "35px", cursor: "pointer" }}
          />
        </Link>
        <form className="search-container" onSubmit={onhandleSubmit}>
          <span
            style={{
              cursor: "pointer",
              padding: "5px",
              background: "transparent",
              outline: "none",
              border: "none",
              color: "red",
              fontSize: "1rem",
            }}
          >
            <BsSearch className="search-icon" />
          </span>
          <input
            type="text"
            value={searchterm}
            placeholder="search here...."
            onChange={(e) => setSearchterm(e.target.value)}
          />
        </form>
      </Box>
    </Box>
  );
};

export default Navbar;
