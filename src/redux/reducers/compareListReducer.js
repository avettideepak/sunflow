/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import {
  TOGGLE_ITEM_COMPARE,
  DELETE_COMPARE_ITEM,
  CLEAR_COMPARE_ITEMS,
  REPLACE_COMPARE_ITEMS,
  GET_COMPARED_ITEM_DETAILS_REQUEST,
  GET_COMPARED_ITEM_DETAILS_SUCCESS,
  GET_COMPARED_ITEM_DETAILS_FAILURE,
  DELETE_COMPARED_ITEM_DETAILS,
  REPLACE_COMPARED_ITEM_DETAILS
} from "../types.js";

const initialState = {
  compareList: undefined,
  comparedItemsDetails: [],
  fetchingComparedItemDetails: false,
  errorMessage: ""
};

const compareListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_ITEM_COMPARE:
      if (state.compareList === undefined) {
        return {
          ...state,
          compareList: [payload]
        };
      } else if (
        state.compareList &&
        !state.compareList.some(item => item.id === payload.id)
      ) {
        return {
          ...state,
          compareList: [...state.compareList, payload]
        };
      } else {
        return {
          ...state,
          compareList: [
            ...state.compareList.filter(item => item.id !== payload.id)
          ]
        };
      }
    case DELETE_COMPARE_ITEM:
      return {
        ...state,
        compareList: [...state.compareList.filter(item => item.id !== payload)]
      };

    case CLEAR_COMPARE_ITEMS:
      return {
        ...state,
        compareList: []
      };
    case REPLACE_COMPARE_ITEMS:
      return {
        ...state,
        compareList: payload
      };
    case GET_COMPARED_ITEM_DETAILS_REQUEST:
      return {
        ...state,
        fetchingComparedItemDetails: true
      };
    case GET_COMPARED_ITEM_DETAILS_SUCCESS:
      console.info("payload", payload);
      if (
        state.comparedItemsDetails.some(item => item.itemId == payload.itemId) // if it already exists it will be filtered out and append at the end
      ) {
        return {
          ...state,
          comparedItemsDetails: [
            ...state.comparedItemsDetails.filter(
              item => item.itemId != payload.itemId
            ),
            payload
          ]
        };
      } else {
        return {
          ...state,
          comparedItemsDetails: [...state.comparedItemsDetails, payload]
        };
      }

    case GET_COMPARED_ITEM_DETAILS_FAILURE:
      return {
        ...state,
        errorMessage: payload
      };
    case DELETE_COMPARED_ITEM_DETAILS:
      return {
        ...state,
        comparedItemsDetails: [
          ...state.comparedItemsDetails.filter(item => item.itemId != payload)
        ]
      };
    case REPLACE_COMPARED_ITEM_DETAILS:
      return {
        ...state,
        comparedItemsDetails: payload
      };
    default:
      return state;
  }
};

export default compareListReducer;
