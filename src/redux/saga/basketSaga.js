/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import { takeLatest } from "redux-saga/effects";
import {
  FETCHING_MENU_SUCCESS,
  REQUEST_BASKET_AFTER_ADDING_TO_CART,
  REQUEST_BASKET_AFTER_BASKET_UPDATE
} from "../types";
import { fetchBasketSaga } from "../../redux/actions/basketActions";

export function* basketFetchSaga() {
  //yield takeLatest(ADD_TO_CART_MODAL_CLOSE, fetchBasketSaga);
  yield takeLatest(FETCHING_MENU_SUCCESS, fetchBasketSaga);
}
export function* basketFetchAfterAddedSaga() {
  yield takeLatest(REQUEST_BASKET_AFTER_ADDING_TO_CART, fetchBasketSaga);
}

export function* basketFetchAfterBasketUpdate() {
  yield takeLatest(REQUEST_BASKET_AFTER_BASKET_UPDATE, fetchBasketSaga);
}
