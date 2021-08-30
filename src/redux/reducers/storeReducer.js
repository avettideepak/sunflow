/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import {
  SET_SELECTED_STORE,
  FETCH_STORES_REQUEST,
  FETCH_STORES_SUCCESS,
  FETCH_STORES_FAILURE,
  FETCHING_CATEGORY_SUCCESS,
  SET_SELECTED_STORE_TO_VIEW_ON_THE_MAP,
  FETCHING_CATEGORY_GATSBY_SUCCESS,
  FETCHING_FILTER_SUCCESS
} from "../types";

const initialState = {
  selectedStore: null,
  loading: true,
  selectedStoreToViewOnTheMap: null
  /*  stores: [],
  storeItems: [],
  parents: [],
  
  errorMessage: "" */
};

const storeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_SELECTED_STORE_TO_VIEW_ON_THE_MAP: {
      return { ...state, selectedStoreToViewOnTheMap: payload };
    }
    case SET_SELECTED_STORE:
      return {
        ...state,
        selectedStore: payload
      };
    case FETCH_STORES_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCHING_CATEGORY_SUCCESS: {
      console.info("storeReducer payload", payload);
      if (payload.cat == "Stores")
        return {
          ...state,
          stores:
            payload.cat == "Stores" ? payload.categoryItems : [...state.stores]
        };
      else return { ...state };
    }
    case FETCH_STORES_SUCCESS:
      console.info("fetch store success", payload);
      return {
        ...state,
        numberOfItems: payload.numberOfItems,
        stores: payload.stores,
        tempFacets: payload.json[2].facets,
        pages: payload.tempages,
        cat: payload.cat,
        cidN: payload.cid,
        parents: payload.parents,
        loading: false,
        currentPage: 1,
        scroolPage: 1,
        resetCid: payload.resetCid
      };

    case FETCHING_CATEGORY_GATSBY_SUCCESS:
      if (payload.data.url === "stores")
        return {
          ...state,
          numberOfItems: payload.data.itemsCount,
          stores: payload.data.items,

          cat: payload.data.cat,
          cidN: payload.data.cid,
          loading: false,
          currentPage: payload.pageContext.currentPage,
          scroolPage: payload.pageContext.currentPage
        };
      else return state;
    case FETCH_STORES_FAILURE:
      return {
        ...state,
        errorMessage: payload
      };

    /*  case FETCHING_FILTER_SUCCESS:
      return {
        ...state,
        numberOfItems: payload.numberOfItems,
        stores: payload.categoryItems,
        currentPage: 1
      }; */
    default:
      return state;
  }
};

export default storeReducer;
