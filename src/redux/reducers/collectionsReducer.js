/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import {
  FETCH_COLLECTION_REQUEST,
  FETCH_COLLECTION_SUCCESS,
  FETCH_COLLECTION_FAILURE
} from "../types.js";

const initialState = {
  collections: {}
};

const collectionsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_COLLECTION_REQUEST:
      return {
        ...state,
        collections: {
          ...state.collections,
          [payload.cid]: { ...state.collections[payload.cid], ...payload }
        }
      };
    case FETCH_COLLECTION_SUCCESS:
      return {
        ...state,
        collections: {
          ...state.collections,
          [payload.cid]: { ...state.collections[payload.cid], ...payload }
        }
      };
    case FETCH_COLLECTION_FAILURE:
      console.info("borop cid fail", payload);
      let tempCid = "error";
      if (payload && payload.cid !== undefined) {
        tempCid = payload.cid;
      }
      return {
        ...state,
        collections: {
          ...state.collections,
          [tempCid]: { ...state.collections[tempCid], ...payload }
        }
      };
    default:
      return state;
  }
};

export default collectionsReducer;
