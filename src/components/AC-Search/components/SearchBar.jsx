import React, { useEffect, useState, useLayoutEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";

import { PREVIEW, PROJECT_LINK, VID } from "../../../project-config.js";

import { navigate } from "gatsby";

export default function SearchBar() {
  const [searchInputFocused, setSearchInputFocused] = useState(false);
  const inputRef = useRef(null);
  const [input, setInput] = useState("");
  const handleSubmit = evt => {
    evt.preventDefault();

    navigate(`/search/${input}`);
  };

  const currentScreenWidthState = useSelector(
    state => state.mainReducer.currentScreenWidth,
    shallowEqual
  );
  alert("asd");

  useLayoutEffect(() => {
    console.info("borop focus", inputRef.current);
    inputRef.current.focus();
    return () => {
      inputRef.current.blur();
    };
  }, []);

  return (
    <div
      className={
        searchInputFocused
          ? "search-form-container active"
          : "search-form-container"
      }
      aria-expanded={searchInputFocused}
    >
      <form
        id="searchForm"
        onSubmit={handleSubmit}
        className={searchInputFocused ? "active" : ""}
      >
        <label htmlFor="search-input">
          <i className="material-icons">search</i>
        </label>
        <input
          ref={inputRef}
          onFocus={() => setSearchInputFocused(true)}
          onBlur={() => setSearchInputFocused(false)}
          type="text"
          className="search-form-input"
          name="keyword"
          id="search-input"
          autoComplete="off"
          onChange={e => setInput(e.target.value)}
          placeholder="Search for Products..."
          value={input}
        />
      </form>
    </div>
  );
}
