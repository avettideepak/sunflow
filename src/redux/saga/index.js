/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import { categoryFetchSaga, categoryFetchSagaAfterCheck } from "./categorySaga";
import {
  productFetchSaga,
  productModalFetchSaga,
  getDeliveryOptionsSaga,
  addToCartSaga
} from "./productSaga";
import { storesFetchSaga } from "./storesSaga";
import {
  basketFetchSaga,
  basketFetchAfterAddedSaga,
  basketFetchAfterBasketUpdate
} from "./basketSaga";
import { spawn } from "redux-saga/effects";
import { confirmSaga } from "./confirmSaga";

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield spawn(categoryFetchSaga);
  yield spawn(categoryFetchSagaAfterCheck);
  yield spawn(productFetchSaga);
  yield spawn(productModalFetchSaga);
  yield spawn(storesFetchSaga);
  yield spawn(basketFetchSaga);
  yield spawn(basketFetchAfterAddedSaga);
  yield spawn(basketFetchAfterBasketUpdate);
  yield spawn(getDeliveryOptionsSaga);
  yield spawn(addToCartSaga);
  yield spawn(confirmSaga);
}
