/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import ParseErrorMessage from "../../functions/errorMessageParser.js";

import {
  FETCHING_MENU_SUCCESS,
  FETCHING_MENU_FAILURE,
  FETCHING_MENU_REQUEST,
  FETCHING_CATEGORY_REQUEST,
  FETCHING_BY_STYLE_MENU_SUCCESS,
  CATEGORY_UNMOUNT,
  CATEGORY_FETCH_FLAG_SET,
  SET_STORES_NAVCAT,
  UPDATE_NAV_CATEGORY
} from "../types.js";

const initialState = {
  navCats: "",
  isLoading: true,
  errorMessage: "",
  navCategory: "",
  /*   storesNavCat: "", */
  byStyleNavCats: {},
  categoryFetchFlag: true
};

const menuReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_NAV_CATEGORY:
      return {
        ...state,
        navCategory: payload
      };
    case FETCHING_BY_STYLE_MENU_SUCCESS:
      return { ...state, byStyleNavCats: payload };
    case FETCHING_MENU_REQUEST:
      return { ...state, isLoading: true };
    case FETCHING_MENU_FAILURE:
      console.info("FETCHING_MENU_FAILURE", payload.message);
      return {
        ...state,
        isLoading: false,
        errorMessage: ParseErrorMessage(payload)
      };
    case FETCHING_MENU_SUCCESS:
      return {
        ...state,
        isLoading: false,
        navCats: payload
      };
    case FETCHING_CATEGORY_REQUEST:
      return {
        ...state,
        navCategory: payload
      };

    case SET_STORES_NAVCAT:
      return {
        ...state,
        storesNavCat: payload
      };

    case CATEGORY_UNMOUNT:
      return {
        ...state,
        navCategory: ""
      };

    case CATEGORY_FETCH_FLAG_SET:
      return {
        ...state,
        categoryFetchFlag: payload
      };
    default:
      return state;
  }
};

export default menuReducer;
