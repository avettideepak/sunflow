/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React, { useContext } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import {
  I18nContext,
  translations,
  mapCountryList,
  currencyDefine
} from "../index";

import {
  changeLanguage,
  changeCountry,
  updateCurrency
} from "../../redux/actions/mainActions";

import LanguageStepper from "./components/LanguageStepper";

import Modal from "../../shared/components/UIElements/Modal";

import currencyList from "../languages/currencyList.json";

import "./styles/LanguageSelect.scss";

const LanguageSelect = props => {
  const { langCode, dispatchContext } = useContext(I18nContext);
  const [open, setOpen] = React.useState(false);

  const countryState = useSelector(
    state => state.mainReducer.country,
    shallowEqual
  );

  const images = require.context("../../assets/icons/country", true);
  let bgImage;
  {
    /*if (mapCountryList.some(country => country === countryState)) {
    bgImage = images("./" + countryState + ".png");
  } else {
    bgImage = images("./global.png");*/
  }
  bgImage = images("./ca.png");
  {
    /*}}*/
  }

  const dispatchRedux = useDispatch();

  const onLanguageSelect = e => {
    if (typeof localStorage !== undefined) {
      localStorage.setItem("language", e.lang);
      localStorage.setItem("country", e.country);
      dispatchRedux(changeCountry(e.country));
      dispatchRedux(updateCurrency(currencyDefine(e.country)));
      dispatchRedux(changeLanguage(e.lang));
      dispatchContext({ type: "setLanguage", payload: e.lang });
    }
  };
  const onLanguageSelectNew = e => {
    localStorage.setItem("language", e);
    dispatchRedux(changeLanguage(e));
    dispatchContext({ type: "setOnlyLanguage", payload: e });
  };

  const onCurrencySelect = e => {
    let temp = e.split(",");
    dispatchRedux(
      updateCurrency(
        currencyList.filter(currency =>
          currency.code === temp[0] ? true : false
        )[0].currencyId
      )
    );
    dispatchContext({ type: "setCurrency", payload: temp });
  };

  const entryState = useSelector(
    state => state.mainReducer.entryState,
    shallowEqual
  );

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <div className="language-div">
      {/*<div className="select-div" onClick={handleClick}>*/}
      <div className="select-div">
        <img className="language-flag-image" src={bgImage} alt="Canada Flag" />
      </div>
      {/* <Modal
        className="main-language"
        show={open}
        onCancel={handleClickAway}
        style={{ zIndex: "1000" }}
        noClass
        noHeader
        noFooter
      >
        <LanguageStepper
          translations={translations}
          langCode={langCode}
          changeLang={onLanguageSelect}
          changeLangNew={onLanguageSelectNew}
          changeCurrency={onCurrencySelect}
          entryState={entryState}
          close={handleClickAway}
          mapCountryList={mapCountryList}
        />
      </Modal> */}
    </div>
  );
};

export default LanguageSelect;
