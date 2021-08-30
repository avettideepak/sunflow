import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { PREVIEW } from "@/project-config.js";

import { AHEAD_SEARCH } from "@/redux/links";

import { I18nContext } from "@/i18n/index";
import { navigate } from "gatsby";

export default function SearchHelper() {
  const { translate } = React.useContext(I18nContext);
  const [keywords, setKeywords] = useState([]);
  const [finalRecording, setFinalRecording] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchInputFocused, setSearchInputFocused] = useState(false);

  const [dropdownSelectedIndex, setDropdownSelectedIndex] = useState(null);

  const currentScreenWidthState = useSelector(
    state => state.mainReducer.currentScreenWidth,
    shallowEqual
  );

  console.info("searchInputFocused", searchInputFocused);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const options = {
    autoStart: false,
    continuous: false
  };
  const formRef = useRef();
  const inputRef = useRef();
  const handleSubmit = evt => {
    evt && evt.preventDefault();
    console.info("borop search", searchInput);

    if (searchInput === "") return;
    if (dropdownSelectedIndex !== null && keywords.length > 0) {
      setSearchInput("");
      setKeywords([]);
      navigate(`/search/${keywords[dropdownSelectedIndex]}`);
      return;
    }
    if (evt && evt.target.tagName == "P") {
      navigate(`/search/${evt.target.textContent}`);
    } else {
      navigate(`/search/${searchInput}`);
    }
  };

  const handleArrowNavigateDropdown = e => {
    console.info("clicked", dropdownSelectedIndex, keywords);
    e = e || window.event;
    if (e.keyCode == "27") {
      setSearchInput("");
      setKeywords([]);
      setDropdownSelectedIndex(null);
    }

    if (dropdownSelectedIndex !== null) {
      if (e.keyCode == "38") {
        if (dropdownSelectedIndex > 0)
          setDropdownSelectedIndex(
            dropdownSelectedIndex => dropdownSelectedIndex - 1
          );
        else if (dropdownSelectedIndex === 0) setDropdownSelectedIndex(null);
      } else if (e.keyCode == "40") {
        if (dropdownSelectedIndex < keywords.length - 1)
          setDropdownSelectedIndex(
            dropdownSelectedIndex => dropdownSelectedIndex + 1
          );
      }
    } else if (dropdownSelectedIndex === null) {
      if (e.keyCode == "40") {
        setDropdownSelectedIndex(0);
      }
    }
  };

  useEffect(() => {
    if (keywords && keywords.length > 0) {
      //setDropdownSelectedIndex(0);
    } else {
      setDropdownSelectedIndex(null);
    }
  }, [keywords]);

  console.info("borop search2", searchInput);

  const handleKeyClicked = key => {
    console.info("clicked", key);
    navigate(`/search/${key}`);
  };
  const helpSearch = e => {
    e.persist();

    const { value } = e.target;
    if (finalRecording != "") {
      setFinalRecording("");
    }
    setSearchInput(value);
    if (value.length > 2) {
      let link = AHEAD_SEARCH(value);
      fetch(link).then(res => {
        res.text().then(text => {
          console.error("WED2", text);
          text = text.split("\n");
          setKeywords(text);
        });
      });
    }
    if (value == "") {
      setKeywords([]);
      setSearchInput("");
    }
  };

  useLayoutEffect(() => {
    if (currentScreenWidthState >= 1260) inputRef.current.focus();
    return () => {
      inputRef.current.blur();
    };
  }, []);

  const setStyles = () => {
    if (inputRef.current) {
      let inputPosition = inputRef.current.getBoundingClientRect();
      console.info("inputPosition", inputPosition);
      return {
        top: `${inputPosition.top - 23}px`,
        left: `${inputPosition.left}px`,
        width: `${inputPosition.width}px`
      };
    }
  };

  const handleSubmitSelectedDropdown = e => {
    e = e || window.event;
  };

  const handleSetSearchInputFocusState = state => {
    if (state === false) {
      setTimeout(() => {
        setKeywords([]);
        setSearchInput("");
        setSearchInputFocused(state);
      }, 100);
    } else {
      setSearchInputFocused(state);
    }
  };

  console.info("keywords", keywords);
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
        ref={formRef}
        id="searchForm"
        onSubmit={handleSubmit}
        className={searchInputFocused ? "active" : ""}
      >
        {/* <label
          onClick={() => {
            handleSubmit(null);
          }}
          htmlFor="search-input"
        >
          <i className="material-icons">search</i>
        </label> */}
        <input
          onKeyDown={handleArrowNavigateDropdown}
          ref={inputRef}
          onFocus={() => handleSetSearchInputFocusState(true)}
          onBlur={() => handleSetSearchInputFocusState(false)}
          type="text"
          className={`search-form-input${
            currentScreenWidthState >= 1260 ? " expanded" : ""
          }`}
          name="keyword"
          id="search-input"
          autoComplete="off"
          onChange={e => helpSearch(e)}
          placeholder={translate("js.header.searchfor")}
          value={searchInput}
        />
        {keywords && keywords.length > 0 && keywords[0] && searchInput ? (
          <div
            style={setStyles()}
            className={
              searchInputFocused
                ? "search-typeahead-container active"
                : "search-typeahead-container"
            }
          >
            <ul>
              {keywords.map((key, index) => (
                <li
                  className={`${
                    index === dropdownSelectedIndex ? "active" : ""
                  }`}
                  onClick={() => {
                    setSearchInput("");
                    handleKeyClicked(key);
                  }}
                >
                  {key}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </form>
    </div>
  );
}
