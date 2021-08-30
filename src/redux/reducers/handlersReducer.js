/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import {
  SET_HANDLER,
  SET_MOBILE_SEARCH_BTN_CLICKED,
  GEOLOCATION_REQUEST
} from "../types.js";

const initialState = {
  notifyModalOpen: false,
  mobileSearchBtnClicked: false,
  geolocationRequest: false
};

const handlersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_HANDLER:
      return {
        ...state,
        [payload.name]: payload.value
      };
    case SET_MOBILE_SEARCH_BTN_CLICKED:
      return {
        ...state,
        mobileSearchBtnClicked: payload
      };
    case GEOLOCATION_REQUEST:
      return {
        ...state,
        geolocationRequest: payload
      };
    default:
      return state;
  }
};

export default handlersReducer;
