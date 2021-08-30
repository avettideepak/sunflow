import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import classes from "../Styles/SearchBarMobile.module.css";
import { I18nContext } from "../../../i18n/index";
import { navigate } from "gatsby";
import { AHEAD_SEARCH } from "../../../redux/links.js";
import { setMobileSearchBtnClicked } from "../../../redux/actions/handlersAction";

export default function SearchBarMobile({ navMenuOpen }) {
  const dispatch = useDispatch();
  const { translate } = React.useContext(I18nContext);
  const [input, setInput] = useState("");
  const [keywords, setKeywords] = useState([]);

  const inputRef = useRef("");

  const handleEnterKeyPressed = event => {
    console.info(event.keyCode);
    if (event.keyCode == 13) handleSearchIconClicked();
  };

  const mobileSearchBtnClickedState = useSelector(
    state => state.handlersReducer.mobileSearchBtnClicked,
    shallowEqual
  );

  const handleSearchIconClicked = () => {
    const btn = document.getElementById("mobile-nav-icon");
    if (input.trim() !== "") {
      if (btn) btn.click();
      navigate(`/search/${input}`);
    }
  };

  useEffect(() => {
    if (navMenuOpen === false) dispatch(setMobileSearchBtnClicked(false));
    if (mobileSearchBtnClickedState) inputRef.current.focus();
  }, [navMenuOpen]);

  const handleInputChanged = event => {
    const { value } = event.target;
    setInput(value);

    if (value.length > 2) {
      let link = AHEAD_SEARCH(value);
      fetch(link).then(res => {
        res.text().then(text => {
          console.info("ahead search:", inputRef.current.value);

          text = text.split("\n");
          if (inputRef.current.value !== "") setKeywords(text);
          else {
            setKeywords([]);
          }
        });
      });
    }
    if (value == "") {
      setKeywords([]);
    }
  };

  const handleClearInput = () => {
    setInput("");
    setKeywords([]);
  };

  const handleKeyClicked = key => {
    console.info("clicked", key);
    navigate(`/search/${key}`);
  };

  return (
    <div className={`icon-container ${classes.searchIcon}`}>
      <div className={`icon-wrapper ${classes.iconWrapper}`}>
        <React.Fragment>
          <i
            onClick={handleClearInput}
            style={{ visibility: input.length > 0 ? "visible" : "hidden" }}
            className="material-icons"
          >
            close
          </i>
          <input
            ref={inputRef}
            style={{ height: "38px" }}
            value={input}
            onChange={handleInputChanged}
            onKeyDown={handleEnterKeyPressed}
            placeholder={translate("Searchforproduct")}
            type="text"
            className={classes.input}
          />
        </React.Fragment>

        <i className="material-icons ssss" onClick={handleSearchIconClicked}>
          search
        </i>
      </div>
      {keywords && keywords.length > 0 && keywords[0] ? (
        <div
          /*  style={setStyles()} */
          className={"search-typeahead-container activeMobile"}
        >
          <ul>
            {keywords.map(key => (
              <li
                onClick={() => {
                  handleKeyClicked(key);
                  handleClearInput();
                  const btn = document.getElementById("mobile-nav-icon");
                  if (btn) btn.click();
                }}
              >
                {key}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
