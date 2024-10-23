import React from "react";
import "./error.css";

const Error = ({ message }) => {
  return (
    <div className="error_container">
      <h1>Something went Wrong </h1>
      <h3>when fetching data</h3>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam, sed!
      </p>
    </div>
  );
};

export default Error;
