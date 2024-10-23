import React from "react";
import "./ThanksLetter.css";

const ThankLetter = () => {
  return (
    <div className="thanksLetter_container">
      <h1>
        Deliciousness
        <br />
        to your inbox
      </h1>
      <h3>Enjoy weekly hand picked recipes and recommendations</h3>
      <div className="input_field">
        <input placeholder="Email Address" />
        <button>JOIN</button>
      </div>
      <p>By joining our newsletter you agree to our Terms and Conditions</p>
    </div>
  );
};

export default ThankLetter;
