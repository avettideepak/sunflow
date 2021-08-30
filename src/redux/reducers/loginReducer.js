/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  UPDATE_LOGIN,
  USER_DATA_SUCCESS,
  COOKIE_WINDOW_SHOW,
  USER_DATA_INITIAL
} from "../types.js";

const initialState = {
  cookieWindow: null,
  loginName: "",
  securityToken: "",
  userInfo: {
    default: true,
    countryCode:
      "ca" /*
    countryName: "Canada",
    city: "Barrie",
    lat: 40.6976701,
    lng: -74.2598696,
    regioncode: "ON",
    regionName: "Ontario" */
  }
};

const loginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_DATA_INITIAL:
      return {
        ...state,
        userInfo: {
          default: true,
          countryCode: payload.countrycode.toLowerCase(),
          countryName: payload.countryname,
          city: payload.city,
          lat: payload.latitude,
          lng: payload.longitude,
          regioncode: payload.regioncode,
          regionName: payload.regionname,
          postal: payload && payload.postal
        }
      };
    case USER_DATA_SUCCESS:
      return {
        ...state,
        userInfo: {
          default: false,
          countryCode: payload.countrycode.toLowerCase(),
          countryName: payload.countryname,
          city: payload.city,
          lat: payload.latitude,
          lng: payload.longitude,
          regioncode: payload.regioncode,
          regionName: payload.regionname,
          postal: payload && payload.postal
        }
      };
    case UPDATE_LOGIN:
      return {
        ...state,
        loginName: payload.loginName ? payload.loginName : "",
        securityToken: payload.securityToken ? payload.securityToken : "",
        lat: payload.lat ? payload.lat : 40.6976701,
        lng: payload.lng ? payload.lng : -74.2598696
      };
    case LOGIN_FAILURE:
      return { ...state, errorMessageLogin: payload };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginName: payload.loginName ? payload.loginName : "",
        securityToken: payload.securityToken ? payload.securityToken : "",
        lat: payload.lat ? payload.lat : 40.6976701,
        lng: payload.lng ? payload.lng : -74.2598696
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loginName: "",
        securityToken: ""
      };

    case COOKIE_WINDOW_SHOW:
      return {
        ...state,
        cookieWindow: payload
      };
    case LOGOUT_FAILURE:
      return { ...state, errorMessageLogout: payload };
    default:
      return state;
  }
};

export default loginReducer;
