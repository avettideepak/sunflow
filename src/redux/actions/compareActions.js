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

import { GET_ITEM_LINK } from "../links.js";

import { store } from "../../layout";

export const toggleItemCompare = payload => ({
  type: TOGGLE_ITEM_COMPARE,
  payload: payload
});

export const deleteCompareItem = payload => ({
  type: DELETE_COMPARE_ITEM,
  payload: payload
});

export const clearCompareItems = () => ({
  type: CLEAR_COMPARE_ITEMS
});

export const replaceCompareItems = payload => ({
  type: REPLACE_COMPARE_ITEMS,
  payload: payload
});

export const getComparedItemDetailsRequest = () => ({
  type: GET_COMPARED_ITEM_DETAILS_REQUEST
});

export const getComparedItemDetailsSuccess = payload => ({
  type: GET_COMPARED_ITEM_DETAILS_SUCCESS,
  payload: payload
});

export const getComparedItemDetailsFailure = payload => ({
  type: GET_COMPARED_ITEM_DETAILS_FAILURE,
  payload: payload
});

export const deleteComparedItemsDetails = payload => ({
  type: DELETE_COMPARED_ITEM_DETAILS,
  payload: payload
});

export const replaceComparedItemsDetails = payload => ({
  type: REPLACE_COMPARED_ITEM_DETAILS,
  payload: payload
});

export const toggleCompareAction = (
  id,
  title,
  currency_sign,
  image,
  price,
  url
) => {
  return dispatch => {
    dispatch(
      toggleItemCompare({ id, title, currency_sign, image, price, url })
    );
  };
};

export const fetchComparedItemDetails = id => {
  let language = store.getState().mainReducer.lang;
  return dispatch => {
    dispatch(getComparedItemDetailsRequest());
    fetch(
      GET_ITEM_LINK.replace("$ITEMREPLACE", id).replace("$LANGUAGE", language)
    )
      .then(res => res.json())
      .then(json => {
        console.info("json", json);
        dispatch(getComparedItemDetailsSuccess(json.__Result[0]));
      })
      .catch(err => {
        dispatch(getComparedItemDetailsFailure(err));
      });
  };
};
