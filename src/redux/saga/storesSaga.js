/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import { takeLatest } from "redux-saga/effects";

import { FETCH_STORES_REQUEST_SAGA } from "../types";
import { fetchStoresSaga } from "../actions/storesAction";

export function* storesFetchSaga() {
  yield takeLatest(FETCH_STORES_REQUEST_SAGA, fetchStoresSaga);
}
