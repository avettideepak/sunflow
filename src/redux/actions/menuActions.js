/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import {
  FETCHING_MENU_SUCCESS,
  FETCHING_MENU_FAILURE,
  FETCHING_BY_STYLE_MENU_SUCCESS,
  CATEGORY_UNMOUNT,
  CATEGORY_FETCH_FLAG_SET,
  SET_STORES_NAVCAT,
  UPDATE_NAV_CATEGORY
} from "../types.js";

import { store } from "../../layout";


import {
  MENU_EXD_FETCH_LINK,
  MENU_FETCH_LINK,
  BY_STYLE_MENU_FETCH_LINK,
  TEMP_MENU_FETHC_LINK
} from "../links.js";

import { fetchCategoryFromDirectUrl } from "./categoryActions.js";

import { changeEntryState } from "./mainActions";

import { allFirstLettersCapitalize } from "../../functions/capitalize";

export const fetchingMenuSuccess = (json, category) => {
  return {
    type: FETCHING_MENU_SUCCESS,
    payload: json
  };
};

export const setStoresNavCatAction = navCat => ({
  type: SET_STORES_NAVCAT,
  payload: navCat
});

export const setCategoryNavCatAction = navCategory => ({
  type: UPDATE_NAV_CATEGORY,
  payload: navCategory
});

export const fetchingByStyleSuccess = (json, category) => {
  return {
    type: FETCHING_BY_STYLE_MENU_SUCCESS,
    payload: json
  };
};

export const fetchingMenuFailure = error => ({
  type: FETCHING_MENU_FAILURE,
  payload: error
});

export const categoryUnmountAction = () => ({
  type: CATEGORY_UNMOUNT
});

export const categoryFetchFlagAction = payload => ({
  type: CATEGORY_FETCH_FLAG_SET,
  payload: payload
});

/*export const fetchMenu = arg => {
  return dispatch => {
    dispatch(fetchingMenuSuccess(menuData));
    if (
      arg.pathname.includes("shop") &&
      !arg.pathname.includes("login") &&
      !arg.pathname.includes("wishlist") &&
      !arg.pathname.includes("about")
    ) {
      dispatch(fetchCategoryFromDirectUrl());
    } else {
      return 1;
    }
  };
};
*/

export const fetchMenu = (arg, language) => {
  let entryState = store.getState().mainReducer.entryState;
  return dispatch => {
    if (entryState) {
      dispatch(changeEntryState());
    }
    fetch(MENU_FETCH_LINK.replace("$LANGUAGE", language))
      .then(res => res.json())
      .then(json => {
        dispatch(fetchingMenuSuccess(json));
      })
      .then(() => {
        if (
          arg.pathname.includes("shop") &&
          !arg.pathname.includes("login") &&
          !arg.pathname.includes("wishlist") &&
          !arg.pathname.includes("about") &&
          !arg.pathname.includes("stores")
        ) {
          dispatch(categoryFetchFlagAction(false));
          dispatch(fetchCategoryFromDirectUrl());
        } /*  else if (arg.pathname.includes("stores")) {
          let link = arg.pathname.split("stores/")[1];
          if (link.includes("-")) {
            link = link.split("-").join(" ");
          }
          link = allFirstLettersCapitalize(link);
        } else {
          return 1;
        } */
      })
      .catch(error => {
        dispatch(fetchingMenuFailure(error));
      });
  };
};
