import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { FaSearch } from "react-icons/fa";

import "./SearchBar.css";
import { useContextAPI } from "../../lib/store/context/context";
import { useNavigate, useParams } from "react-router-dom";

const SearchBar = forwardRef((prop, ref) => {
  const inputRef = useRef(null);
  const { setInputValue, inputValue } = useContextAPI();
  const navigate = useNavigate();

  // Expose a method to focus the input field to the parent component
  useImperativeHandle(ref, () => ({
    focusInput: () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
  }));

  function handleSubmit(e) {
    e.preventDefault();
    if (inputValue.trim()) {
      navigate(`/recipes`); // Navigate to search results page
    }
  }

  function handleInput(e) {
    setInputValue(e.target.value);
  }
  return (
    <div className="searchBar_container container" ref={ref}>
      <div className="inputField_container">
        <input
          type="text"
          placeholder="please search ur recipe"
          ref={inputRef}
          value={inputValue}
          onChange={handleInput}
        />
        <button onClick={handleSubmit}>
          <FaSearch />
        </button>
      </div>
    </div>
  );
});

export default SearchBar;
