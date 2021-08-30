/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React from "react";
import { Link } from "gatsby";
import { useSelector, shallowEqual } from "react-redux";

import LanguageDialogBox from "./components/LanguageDialogBox";

import "./styles/LanguageOptions.scss";

const LanguageOption = ({
  countryCode,
  changeLang,
  entryState,
  translations,
  langCode,
  mapCountryList,
  close
}) => {
  const countryState = useSelector(
    state => state.mainReducer.country,
    shallowEqual
  );

  const images = require.context("../../../../assets/icons/country", true);
  let bgImage;

  if (
    mapCountryList.some(country => country === countryState) &&
    countryState !== "en"
  ) {
    bgImage = images("./" + countryState + ".png");
  } else {
    bgImage = images("./earth.png");
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = value => {
    setOpen(false);
  };

  return (
    <div className="country-options">
      <div
        className={"language-flag"}
        onClick={handleClickOpen}
        style={{ cursor: "pointer" }}
      >
        <img src={bgImage} />
      </div>

      <div className="more-country" onClick={handleClickOpen}>
        <i className="no-select material-icons">more_horiz</i>
      </div>
      <LanguageDialogBox
        translations={translations}
        open={open}
        onClose={handleClose}
        entryState={entryState}
        changeLang={changeLang}
        countryCode={countryCode}
        close={close}
      />
    </div>
  );
};

export default LanguageOption;
