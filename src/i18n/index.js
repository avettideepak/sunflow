/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React, { useReducer } from "react";
import languagesList from "./languages/languageList.json";
import currenciesList from "./languages/currencyList.json";
import countriesList from "./languages/countryList.json";

export let translations;
export let languageList = { ...languagesList.languageNames };
export let langCodeList = [...languagesList.lang];
export let currencyList = [...currenciesList];
export let countryList = {
  list: Object.keys(countriesList),
  data: countriesList
};
export let mapCountryList = Object.keys(countriesList);
languagesList.lang.map(lan => {
  const data = require(`../languages/${lan}.json`);
  let currency = ["CAD", 1];

  if (lan === "es" || lan === "fr" || lan === "tr") {
    currency = ["EUR", 1.5];
  } else {
    currency = ["USD", 1.31];
  }
  translations = { ...translations, [lan]: {} };
  translations[lan] = {
    ...data,
    currency: currency
  };
});

const getTranslate = langCode => key => translations[langCode][key] || key;

const getCurrency = langCode => {
  if (mapCountryList.some(country => country === langCode)) {
    return countryList.data[langCode].currency;
  } else {
    return "global";
  }
};

const getConvertHelper = currencyArg => {
  switch (currencyArg) {
    case "USD":
      return 1.31;
    case "EUR":
      return 1.5;
    case "CAD":
      return 1;
    default:
      return 1;
  }
};

const getConvert = langCode => {
  if (mapCountryList.some(country => country === langCode)) {
    return getConvertHelper(countryList.data[langCode].currency);
  } else {
    return 1.31;
  }
};

export const getLanguageServer = countryCode => {
  if (mapCountryList.some(country => country === countryCode)) {
    return countryList.data[countryCode].lang;
  } else {
    return "en";
  }
};
export const getCountryCode = countryCode => {
  if (mapCountryList.some(country => country === countryCode)) {
    return countryList.data[countryCode].country;
  } else {
    return "en";
  }
};

export const currencyDefine = countryCodeArg => {
  if (
    typeof localStorage !== undefined &&
    mapCountryList.some(country => country === countryCodeArg)
  ) {
    let userCurrencyStorage = localStorage.getItem("currency");
    if (!userCurrencyStorage) {
      localStorage.setItem(
        "currency",
        mapCountryList.some(country => country === countryCodeArg)
          ? countryList.data[countryCodeArg].currency
          : "USD"
      );
    }
    return currencyList.filter(currency =>
      currency.code === localStorage.getItem("currency") ? true : false
    )[0].code;
  } else {
    return "USD";
  }
};

const getCurrencyServer = countryCode => {
  if (mapCountryList.some(country => country === countryCode)) {
    localStorage.setItem("currency", countryList.data[countryCode].currency);
    return countryList.data[countryCode].currency;
  } else {
    localStorage.setItem("currency", "USD");
    return "USD";
  }
};

const initialState = {
  langCode: "en",
  translate: getTranslate("en"),
  currency: getCurrency("en"),
  priceConvert: getConvert("en"),
  locationBar: false
};

export const I18nContext = React.createContext(initialState);

export const I18nContextProvider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "setLanguage":
        localStorage.setItem("currency", getCurrency(action.payload));
        return {
          langCode: action.payload,
          currency: getCurrency(action.payload),
          translate: getTranslate(action.payload),
          priceConvert: getConvert(action.payload)
        };
      case "setCurrency":
        localStorage.setItem("currency", action.payload[0]);
        return {
          ...state,
          currency: action.payload[0],
          priceConvert: action.payload[1]
        };
      case "setCurrencyOnly":
        return {
          ...state,
          currency: action.payload,
          priceConvert: getConvertHelper(action.payload)
        };
      case "setOnlyLanguage":
        return {
          ...state,
          langCode: action.payload,
          translate: getTranslate(action.payload)
        };
      case "setThroughServer":
        return {
          ...state,
          langCode: getLanguageServer(action.payload),
          priceConvert: getConvertHelper(action.payload),
          currency: getCurrencyServer(action.payload),
          translate: getTranslate(getLanguageServer(action.payload))
        };
      case "changeLocationBar":
        return {
          ...state,
          locationBar: action.payload
        };

      default:
        return { ...initialState };
    }
  };

  const [state, dispatchContext] = useReducer(reducer, initialState);

  return (
    <I18nContext.Provider value={{ ...state, dispatchContext }}>
      {children}
    </I18nContext.Provider>
  );
};
