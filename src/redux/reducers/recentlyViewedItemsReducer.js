/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import { ADD_RECENT_VIEWED_ITEMS } from "../types.js";

const initialState = {
  recentlyViewedItemsList: []
};

const recentlyViewedItemsReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case ADD_RECENT_VIEWED_ITEMS:
      return {
        ...state,
        recentlyViewedItemsList: payload
      };
    default:
      return state;
  }
};

export default recentlyViewedItemsReducer;
