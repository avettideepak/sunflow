/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import {
  GET_GEOLOCATION_COOKIE_REQUEST,
  GET_GEOLOCATION_COOKIE_SUCCESS,
  GET_GEOLOCATION_COOKIE_FAILURE,
  CHANGE_GEOLOCATION,
  UPDATE_BRANDS_GEOLOCATION,
  UPDATE_USER_GEOLOCATION,
  SET_DYNAMIC_CONTENT,
  UPDATE_USER_DISTANCE
} from "../types.js";

export const updateUserDistance = payload => ({
  type: UPDATE_USER_DISTANCE,
  payload: payload
});
export const updateBrandsGeolocation = payload => ({
  type: UPDATE_BRANDS_GEOLOCATION,
  payload: payload
});

export const brandCompareUserGeoLocation = payload => ({
  type: UPDATE_USER_GEOLOCATION,
  payload: payload
});

export const changeGeoLocationAction = payload => ({
  type: CHANGE_GEOLOCATION,
  payload: payload
});
export const getGeolocationRequest = () => ({
  type: GET_GEOLOCATION_COOKIE_REQUEST
});

export const getGeoLocationSuccess = payload => ({
  type: GET_GEOLOCATION_COOKIE_SUCCESS,
  payload: payload
});

export const getGeoLocationFailute = err => ({
  type: GET_GEOLOCATION_COOKIE_FAILURE,
  paylaod: err
});

export const setDynamicContentAction = payload => ({
  type: SET_DYNAMIC_CONTENT,
  payload: payload
});

export const setGeoLocationState = geoLocation => {
  return dispatch => {
    dispatch(getGeolocationRequest());
    if (geoLocation) dispatch(getGeoLocationSuccess(geoLocation));
    else dispatch(getGeoLocationFailute("Could not get the geolocation."));
  };
};
