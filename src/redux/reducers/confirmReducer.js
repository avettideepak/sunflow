/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import { SHOW_CONFIRM, HIDE_CONFIRM } from "../types.js";

const initialState = {
  showConfirm: false,
  confirmMessage: ""
};

const compareListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_CONFIRM:
      return {
        ...state,
        showConfirm: true,
        confirmMessage: payload
      };

    case HIDE_CONFIRM:
      return {
        ...state,
        showConfirm: false,
        confirmMessage: ""
      };
    default:
      return state;
  }
};

export default compareListReducer;
