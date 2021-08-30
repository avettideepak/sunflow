/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import { FETCH_WISHLIST_SUCCESS, WISHLIST_ADD_REDUX } from "../types.js";

const initialState = {
  wishlist: []
};

const wishListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case WISHLIST_ADD_REDUX:
      return {
        ...state,
        wishlist: payload
      };
    case FETCH_WISHLIST_SUCCESS:
      return {
        ...state,
        wishlist: { ...state.wishlist }
      };
    default:
      return state;
  }
};

export default wishListReducer;
