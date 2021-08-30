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
  CHANGE_LANGUAGE_FROM_FUNCTION,
  CHANGE_ENTRY_STATE,
  CHANGE_COUNTRY,
  CHANGE_TITLE_AND_LONGDESC,
  SCROOL_POSITION,
  SET_INITIAL_LOAD
} from "../types.js";

const initialState = {
  featuredCid: "",
  isMobile: false,
  selectedStoreMap:null,
  currentScreenWidth: 1024,
  featuredCategory: [],
  featuredCatName: "",
  featuredLoading: {
    432307: true,
    432308: true,
    432310: true,
    432311: true
  },
  currency: "",
  lang: "en",
  country: "en",
  entryState: true,
  languageButton: false,
  breadcrumb: [],
  position: 0,
  initialLoad: true
};

const mainReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SCROOL_POSITION:
      return {
        ...state,
        position: payload
      };

    case SET_INITIAL_LOAD:
      return {
        ...state,
        initialLoad: payload
      };
    case CHANGE_TITLE_AND_LONGDESC:
      return {
        ...state,
        breadcrumb: [...payload.breadcrumbs]
      };
    case CHANGE_ENTRY_STATE:
      return {
        ...state,
        entryState: false
      };
    case CHANGE_LANGUAGE:
      return {
        ...state,
        lang: payload,
        languageButton: true
      };
    case CHANGE_COUNTRY:
      return {
        ...state,
        country: payload
      };
    case CHANGE_LANGUAGE_FROM_FUNCTION:
      return {
        ...state,
        lang: payload
      };
    case IS_MOBILE_CHECK:
      return {
        ...state,
        isMobile: payload.isMobile,
        currentScreenWidth: payload.currentScreenWidth
      };
    case SELECTED_STORE_MAP:
      return {
        ...state,
        selectedStoreMap: payload,
      };
    case FETCHING_FEATURED_FAILURE:
      return { ...state, errorMessage: payload };
    case FETCHING_FEATURED_SUCCESS:
      return {
        ...state,
        featuredCid: "65807"
      };
    case FETCHING_FEATURED_CATEGORY_NAME_CHANGE:
      return {
        ...state,
        featuredCatName: {
          ...state.featuredCatName,
          [payload.cid]: payload.catName
        },
        featuredLoading: { ...state.featuredLoading, [payload.cid]: true }
      };
    case FETCHING_FEATURED_CATEGORY_SUCCESS:
      return {
        ...state,
        featuredCategory: {
          ...state.featuredCategory,
          [payload.cid]: payload.json[1].items
        },
        featuredLoading: { ...state.featuredLoading, [payload.cid]: false }
      };
    case UPDATE_CURRENCY:
      return {
        ...state,
        currency: payload
      };
    default:
      return state;
  }
};

export default mainReducer;
