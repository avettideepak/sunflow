/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import {
  GET_GEOLOCATION_COOKIE_REQUEST,
  GET_GEOLOCATION_COOKIE_SUCCESS,
  GET_GEOLOCATION_COOKIE_FAILURE,
  CHANGE_GEOLOCATION,
  UPDATE_BRANDS_GEOLOCATION,
  UPDATE_USER_GEOLOCATION
} from "../types.js";

const initialState = {
  geoLocation: "",
  errorMessage: "",
  brands: [],
  brandCompareUserLocation: ""
};

const geoLocationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_USER_GEOLOCATION:
      return {
        ...state,
        brandCompareUserLocation: payload
      };
    case UPDATE_BRANDS_GEOLOCATION:
      return {
        ...state,
        brands: payload
      };
    case GET_GEOLOCATION_COOKIE_REQUEST:
      return state;
    case GET_GEOLOCATION_COOKIE_SUCCESS:
      return { ...state, geoLocation: payload };
    case GET_GEOLOCATION_COOKIE_FAILURE:
      return { ...state, errorMessage: payload };
    case CHANGE_GEOLOCATION:
      return { ...state, geoLocation: payload, brands: payload };
    default:
      return state;
  }
};

export default geoLocationReducer;
