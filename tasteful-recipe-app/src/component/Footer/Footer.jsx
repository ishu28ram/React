import React from "react";
import "./Footer.css";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer_container">
      <div className="footer_content container">
        <div className="footer_top">
          <Link to="/">
            <h1>Tasteful bites</h1>
          </Link>
          <p>
            On the other hand, we denounce with righteous indignation and
            dislike men who are so beguiled and demoralized by the charms of
            pleasure of the moment
          </p>
        </div>
        <div className="footer_bottom">
          <p>© 2024 Tasteful bites - All rights reserved</p>
          <div className="social_icons">
            <a href="">
              <FaFacebook />
            </a>
            <a href="">
              <FaInstagram />
            </a>
            <a href="">
              <FaTwitter />
            </a>
            <a href="">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
