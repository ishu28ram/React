import React from "react";

const StrongChecker = ({ password }) => {
  const generatestrength = () => {
    const passwordLength = password.length;

    if (passwordLength < 1) {
      return "";
    } else if (passwordLength < 5) {
      return "very weak";
    } else if (passwordLength < 8) {
      return "poor";
    } else if (passwordLength < 13) {
      return "medium";
    } else if (passwordLength < 17) {
      return "strong";
    } else {
      return "very strong";
    }
  };
  const strength = generatestrength();

  return (
    <div className="strong-container">
      Strength:{" "}
      <span
        style={{
          fontWeight: "bold",
          textTransform: "capitalize",
          color: "yellow",
        }}
      >
        {strength}
      </span>
    </div>
  );
};

export default StrongChecker;
