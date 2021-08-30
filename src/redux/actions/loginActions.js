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

import {
  LOGOUT_LINK,
  LOGIN_CHECK_LINK,
  CATEGORY_FETCH_LINK
} from "../links";
import { brandCompareUserGeoLocation } from "./geoLocationActions.js";
import { geolocationRequestAction } from "./handlersAction";

export const cookieWindowShow = payload => ({
  type: COOKIE_WINDOW_SHOW,
  payload: payload
});

export const loginSuccess = json => ({
  type: LOGIN_SUCCESS,
  payload: {
    loginName: json.firstname,
    securityToken: json.securitytoken, 
    lat: json.latitude,
    lng: json.longitude
  }
});

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: error
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
});

export const logoutFailure = error => ({
  type: LOGOUT_FAILURE,
  payload: error
});

export const updateLoginInfo = json => ({
  type: UPDATE_LOGIN,
  payload: {
    loginName: json.firstname,
    securityToken: json.securitytoken,
    lat: json.latitude,
    lng: json.longitude
  }
});

export const fetchLogin = securitytoken => {
  var form = new FormData();
  form.append("securitytoken", securitytoken);

  return dispatch => {
    fetch(LOGIN_CHECK_LINK, {
      headers: {
        Accept: "*/*"
      }
    })
      .then(res => res.json())
      .then(json => {
        console.info("login Success", json);
        dispatch(loginSuccess(json.__Result));
      })
      .catch(error => {
        console.error("login check error", error);
        dispatch(loginFailure(error));
      });
  };
};

export const loginUserDataSuccess = data => ({
  type: USER_DATA_SUCCESS,
  payload: data
});

export const loginUserDataInitialAction = data => ({
  type: USER_DATA_INITIAL,
  payload: data
});

export const loginUserDataInitial = data => {
  return dispatch => {
    dispatch(loginUserDataInitialAction(data));
    dispatch(
      brandCompareUserGeoLocation({
        lat: data.latitude,
        long: data.longitude
      })
    );
  };
};

const iOS = () => {
  if (typeof window !== undefined) {
    return [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
      "Mac68K",
      "MacPPC",
      "MacIntel"
    ].includes(navigator.platform);
  }
};

export const fetchUserData = (securitytoken, langCode) => {
  var form = new FormData();
  form.append("securitytoken", securitytoken);
  return dispatch => {
    if (false) {
      fetch("https://ipapi.co/json", {
        headers: {
          Accept: "*/*"
        }
      })
        .then(res => res.json())
        .then(json => {
          console.info("ipapi", json);
          let location = {
            city: json.city,
            countrycode: json.country_code,
            countryname: json.country_name,
            latitude: json.latitude,
            longitude: json.longitude,
            postal: json.postal,
            regioncode: json.region_code,
            regionname: json.region,
            languages: json.languages
          };

          if (json.postal) location.postal = json.postal;

          if (typeof localStorage !== undefined) {
            localStorage.setItem("userLocation", JSON.stringify(location));
          }
          dispatch(
            brandCompareUserGeoLocation({
              lat: location.latitude,
              long: location.longitude
            })
          );
          dispatch(loginUserDataSuccess(location));
        })
        .catch(error => {
          console.error("apiapi fetch error");
          alert(
            "Failed to retrieve your location, this might be due to a ad blocker.  We are not displaying any ads on this site and need your location to show local sellers.  If you are using one please disable it because some features on this site depend on it."
          );
          dispatch(loginFailure(error));
        });
    } else {
      if (typeof window !== undefined && navigator.geolocation) {
        dispatch(geolocationRequestAction(true));
      }
    }
  };
};

export const handleLogout = securitytoken => {
  return dispatch => {
    var form = new FormData();
    form.append("securitytoken", securitytoken);

    fetch(LOGOUT_LINK, {
      method: "POST",
      body: form,
      headers: {
        Accept: "*/*",
        credentials: "same-origin"
      },
      mimeType: "multipart/form-data",
      data: form
    }).then(json => {
      dispatch(logoutSuccess());
    });
  };
};
