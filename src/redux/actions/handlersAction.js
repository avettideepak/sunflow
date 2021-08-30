/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import {
  SET_HANDLER,
  SET_MOBILE_SEARCH_BTN_CLICKED,
  GEOLOCATION_REQUEST
} from "../types.js";

/**
 *
 * @param {Object} payload
 * Expects {funcName, func} Object
 */
export const setHandlerAction = payload => ({
  type: SET_HANDLER,
  payload: payload
});

export const setMobileSearchBtnClicked = payload => ({
  type: SET_MOBILE_SEARCH_BTN_CLICKED,
  payload: payload
});

export const geolocationRequestAction = payload => ({
  type: GEOLOCATION_REQUEST,
  payload
});
