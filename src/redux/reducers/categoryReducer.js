/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import ParseErrorMessage from "../../functions/errorMessageParser.js";

import {
  FETCHING_CATEGORY_SUCCESS,
  FETCHING_CATEGORY_FAILURE,
  FETCHING_CATEGORY_NO_ITEM_FOUND,
  FETCHING_CATEGORY_REQUEST,
  FETCH_STORES_SUCCESS,
  SET_FETCHED_CATEGORY_ITEMS_COUNT,
  CHANGE_CATEGORY_NAME,
  FETCHING_FILTER_SUCCESS,
  FETCHING_SEARCH_SUCCESS,
  FETCHING_SEARCH_FAILURE,
  CHANGE_KEYWORD_NAME,
  DISPATCH_CURRENT_PAGE,
  DISPATCH_SCROOL_PAGE,
  NEXT_PAGE_ACTION,
  NEXT_PAGE_SCROOL_ACTION,
  LAST_PAGE,
  CHANGE_LANGUAGE,
  CHANGE_LANGUAGE_FROM_FUNCTION,
  BACK_TO_CATEGORY_REQUEST,
  BACK_TO_CATEGORY_FINISH,
  SET_CATEGORY_DISTANCE,
  FETCHING_CATEGORY_GATSBY_SUCCESS,
  UPDATE_USER_DISTANCE,
  USER_DATA_SUCCESS,
  SET_LOAD_MORE_PAGE,
  SET_DYNAMIC_CONTENT,
  GET_GEOLOCATION_COOKIE_SUCCESS,
  FETCHING_FILTER_REQUEST,
  NEXT_PAGE_SCROOL_ACTION_GATSBY,
  NEXT_PAGE_SCROOL_POSITION_GATSBY,
  CHECK_GLOBAL_SHOW_ALL_PRODUCTS,
  SET_GO_BACK_TO_CATEGORY_FROM_PRODUCT_PAGE,
  SHOW_DYNAMIC_CATEGORY
} from "../types.js";
import { PROJECT_LINK } from "../../project-config.js";

const initialState = {
  numberOfItems: 0,
  numberOfItemOnCurrentPage: 0,
  categoryItems: [
    {
      id: "",
      title: "",
      currency_sign: "",
      image: "",
      price: { value: { integer: "", decimal: "" }, list_price: "" },
      url: "",
      code: ""
    }
  ],
  tempFacets: [],
  pages: [],
  link: PROJECT_LINK + "/",
  loading: false,
  loadingBottom: false,
  currentPage: 1,
  scroolPage: 1,
  loadMorePage: true,
  parents: [],
  keyword: "",
  noItemFound: false,
  cat: "Home",
  backButton: false,
  distance: null,
  showDynamic: false,
  showProductsWhenGlobal: false,
  backToCategoryFromProductPage: false
};

const setDistance = (state, payload) => {
  if (payload.regionname !== "Ontario") {
    return { ...state, distance: null };
  } else {
    return { ...state };
  }
};

const categoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_DYNAMIC_CATEGORY:
      return {
        ...state,
        showDynamic: payload
      };
    case UPDATE_USER_DISTANCE:
      return {
        ...state,
        distance: payload
      };
    case CHECK_GLOBAL_SHOW_ALL_PRODUCTS:
      return {
        ...state,
        showProductsWhenGlobal: payload
      };
    case SET_DYNAMIC_CONTENT:
      return {
        ...state,
        showDynamic: payload
      };
    case USER_DATA_SUCCESS: {
      return setDistance(state, payload);
    }
    case SET_CATEGORY_DISTANCE:
      return {
        ...state,
        distance: payload,
        showDynamic: payload === null ? false : true,
        showProductsWhenGlobal: payload === null ? true : false
      };
    case SET_GO_BACK_TO_CATEGORY_FROM_PRODUCT_PAGE:
      return {
        ...state,
        backToCategoryFromProductPage: payload
      };
    case BACK_TO_CATEGORY_FINISH:
      return {
        ...state,
        backButton: false
      };
    case BACK_TO_CATEGORY_REQUEST:
      return {
        ...state,
        backButton: state.numberOfItems !== 0 ? true : false // fix no items found issue after refreshing the product page and going back to the category page
      };
    case CHANGE_LANGUAGE:
      return {
        ...state,
        loading: true
      };
    case CHANGE_LANGUAGE_FROM_FUNCTION:
      return {
        ...state,
        loading: false
      };
    case LAST_PAGE:
      return {
        ...state,
        loading: false,
        loadingBottom: false
      };
    case DISPATCH_SCROOL_PAGE:
      let tempStatus = true;
      if (payload.status === true) {
        tempStatus = false;
      }
      return {
        ...state,
        scroolPage: payload.scroolPage,
        loadMorePage: payload.scroolPage !== 3,
        loadingBottom: tempStatus
      };
    case SET_LOAD_MORE_PAGE:
      return {
        ...state,
        loadMorePage: payload
      };
    case DISPATCH_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload,
        scroolPage: payload,
        loading: true
      };
    case NEXT_PAGE_SCROOL_ACTION:
      return {
        ...state,
        loading: false,
        loadingBottom: false,
        numberOfItemOnCurrentPage: payload.numberOfItemOnCurrentPage,
        categoryItems: [...state.categoryItems, ...payload.categoryItems],
        showDynamic: true
      };
    case NEXT_PAGE_SCROOL_ACTION_GATSBY:
      return {
        ...state,
        loading: false,
        loadingBottom: false,
        categoryItems: [...state.categoryItems, ...payload.data],
        sc: true,
        scPos: payload.pos
      };
    case NEXT_PAGE_SCROOL_POSITION_GATSBY:
      return {
        ...state,
        sc: false
      };
    case NEXT_PAGE_ACTION:
      return {
        ...state,
        loading: false,
        loadingBottom: false,
        numberOfItemOnCurrentPage: payload.numberOfItemOnCurrentPage,
        categoryItems: payload.categoryItems
      };
    case CHANGE_KEYWORD_NAME:
      return {
        ...state,
        keyword: payload.keyword
      };
    case FETCHING_FILTER_REQUEST:
      return {
        ...state,
        loadingBottom: true
      };
    case FETCHING_FILTER_SUCCESS:
      return {
        ...state,
        numberOfItems: payload.numberOfItems,
        categoryItems: payload.categoryItems,
        pages: payload.pages,
        currentPage: 1,
        showDynamic: true,
        loadingBottom: false
      };

    case CHANGE_CATEGORY_NAME:
      return {
        ...state,
        cat: payload.cat,
        parents: payload.parents,
        cidN: payload.keyword,
        longDesc: payload.longdesc
      };
    case FETCHING_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        catImage: payload && payload.image,
        noItemFound: false,
        backButton: false
      };
    case FETCHING_SEARCH_FAILURE:
    case FETCHING_CATEGORY_FAILURE:
      console.info("err", payload);
      return {
        ...state,
        loading: true,
        errorMessageCategory: ParseErrorMessage(payload)
      };
    case FETCHING_CATEGORY_GATSBY_SUCCESS:
      return {
        ...state,
        numberOfItems: payload.data.itemsCount,
        categoryItems: payload.data.items,
        pages: Array.from(
          { length: payload.data.numberOfPages },
          (x, i) => i + 1
        ),
        cat: payload.data.cat,
        cidN: payload.data.cid,
        loading: false,
        currentPage: payload.pageContext.currentPage,
        scroolPage: payload.pageContext.currentPage,
        noItemFound: false,
        backButton: false
        /*        showDynamic: false */
      };
    case FETCHING_CATEGORY_SUCCESS:
      return {
        ...state,
        numberOfItems: payload.numberOfItems,
        categoryItems: payload.categoryItems,
        tempFacets: payload.json[2].facets,
        pages: payload.tempages,
        cat: payload.cat,
        cidN: payload.cid,
        parents: payload.parents,
        loading: false,
        currentPage: 1,
        scroolPage: 1,
        loadMorePage: true,
        resetCid: payload.resetCid,
        noItemFound: false,
        backButton: false
      };
    case FETCHING_CATEGORY_NO_ITEM_FOUND:
      return {
        ...state,
        cidN: payload.cid,
        cat: payload.cat,
        noItemFound: false,
        loading: false
      };
    case FETCH_STORES_SUCCESS:
      console.info("fetch stores success categoryReducer", payload);
      return {
        ...state,
        cat: payload.cat,
        cidN: payload.cid,
        parents: payload.parents,
        loading: false,
        resetCid: payload.resetCid
      };
    case SET_FETCHED_CATEGORY_ITEMS_COUNT:
      return {
        ...state,
        numberOfItems: payload,
        loading: payload == 0 ? false : true
      };
    case FETCHING_SEARCH_SUCCESS:
      return {
        ...state,
        numberOfItems: payload.numberOfItems,
        categoryItems: payload.categoryItems,
        pages: payload.tempages,
        loading: false,
        keyword: payload.keyword,
        backButton: false
      };
    default:
      return state;
  }
};

export default categoryReducer;
