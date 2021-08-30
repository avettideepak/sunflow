/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import {
  FETCHING_FEATURED_SUCCESS,
  FETCHING_FEATURED_FAILURE,
  IS_MOBILE_CHECK,
  SELECTED_STORE_MAP,
  FETCHING_FEATURED_CATEGORY_SUCCESS,
  FETCHING_FEATURED_CATEGORY_NAME_CHANGE,
  UPDATE_CURRENCY,
  CHANGE_LANGUAGE,
  CHANGE_ENTRY_STATE,
  CHANGE_LANGUAGE_FROM_FUNCTION,
  CHANGE_COUNTRY,
  SCROOL_POSITION,
  SET_INITIAL_LOAD
} from "../types.js";

import {
  FEATURED_FETCH_LINK,
  CATEGORY_FEATURED_LINK,
  GET_CURRENCY_ID,
  GET_CURRENCY_INFO
} from "../links.js";

import { store } from "../../layout";

export const setInitialLoadAction = payload => ({
  type: SET_INITIAL_LOAD,
  payload
});
export const fetchingFeaturedSuccess = json => ({
  type: FETCHING_FEATURED_SUCCESS,
  payload: json
});

export const fetchingFeaturedCategorySuccess = (json, cid) => ({
  type: FETCHING_FEATURED_CATEGORY_SUCCESS,
  payload: { json, cid }
});

export const fetchingFeaturedCategoryNameChange = (cid, catName) => ({
  type: FETCHING_FEATURED_CATEGORY_NAME_CHANGE,
  payload: { cid, catName }
});

export const fetchingFeaturedFailure = error => ({
  type: FETCHING_FEATURED_FAILURE,
  payload: error
});

export const handleMobileOrDesktop = payload => ({
  type: IS_MOBILE_CHECK,
  payload: payload
});

export const selectedStoreMap = payload => ({
  type: SELECTED_STORE_MAP,
  payload: payload
});

export const updateCurrency = json => ({
  type: UPDATE_CURRENCY,
  payload: json
});

export const handleScroolPosition = payload => ({
  type: SCROOL_POSITION,
  payload: payload
});

export const fetchFeatured = () => {
  let language = store.getState().mainReducer.lang;
  return dispatch => {
    fetch(FEATURED_FETCH_LINK.replace("$LANGUAGE", language))
      .then(res => res.json())
      .then(json => dispatch(fetchingFeaturedSuccess(json)))
      .catch(error => dispatch(fetchingFeaturedFailure(error)));
  };
};

export const fetchFeaturedMostPopular = (cid, cat) => {
  let language = store.getState().mainReducer.lang;
  return dispatch => {
    dispatch(fetchingFeaturedCategoryNameChange(cid, cat));
    fetch(
      CATEGORY_FEATURED_LINK.replace("$cid", cid).replace("$LANGUAGE", language)
    )
      .then(res => res.json())
      .then(json => dispatch(fetchingFeaturedCategorySuccess(json, cid)))
      .catch(error => dispatch(fetchingFeaturedFailure(error)));
  };
};

export const fetchCurrencyInfo = () => {
  return dispatch => {
    let currencyID = 0;
    fetch(GET_CURRENCY_ID)
      .then(res => res.json())
      .then(json => {
        currencyID = json.__Result;
      })
      .then(() => {
        fetch(GET_CURRENCY_INFO.replace("$CURRENCY", currencyID))
          .then(res => res.json())
          .then(json => dispatch(updateCurrency(json.__Result)));
      });
  };
};

export const changeLanguage = language => ({
  type: CHANGE_LANGUAGE,
  payload: language
});

export const changeCountry = countryCode => ({
  type: CHANGE_COUNTRY,
  payload: countryCode
});

export const changeLanguageFromFunction = language => ({
  type: CHANGE_LANGUAGE_FROM_FUNCTION,
  payload: language
});

export const changeEntryState = () => ({
  type: CHANGE_ENTRY_STATE
});
