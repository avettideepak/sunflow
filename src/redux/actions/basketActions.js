/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import {
  FETCH_BASKET_SUCCESS,
  FETCH_SUPPLIERS_BASKET_SUCCESS,
  REQUEST_BASKET_AFTER_BASKET_UPDATE,
  SET_BASKET_LOADING_AFTER_UPDATE
} from "../types.js";
import { BASKET_LINK, GET_BASKETS } from "../links.js";
import { call, put } from "redux-saga/effects";
import { store } from "../../layout";

export const fetchBasketAction = products => ({
  type: FETCH_BASKET_SUCCESS,
  payload: products
});

export const fetchSupplierBasketSuccessAction = suppliers => ({
  type: FETCH_SUPPLIERS_BASKET_SUCCESS,
  payload: suppliers
});

export const setBasketLoadingAfterUpdate = payload => ({
  type: SET_BASKET_LOADING_AFTER_UPDATE,
  payload
});

const api = async params => {
  try {
    let link = params.link;
    const res = await fetch(
      link ? link() : BASKET_LINK(params.language, params.vid)
    );

    const json = await res.json();
    let basket = json.__Result;
    console.info("result basket", basket);
    return basket;
  } catch (error) {
    console.warn("fetch basket_link failed", error);
  }
};

export function* fetchBasketSaga(action) {
  let language = store.getState().mainReducer.lang;
  let currency = store.getState().mainReducer.currency;
  let params = { language, currency };
  console.info("borop basket4", action.type);

  try {
    //  const result = yield call(api, params);
    const suppliersResult = yield call(api, { ...params, link: GET_BASKETS });

    console.info("suppliersBasket", suppliersResult);

    // yield put(fetchBasketAction(result));
    yield put(fetchSupplierBasketSuccessAction(suppliersResult));
    if (action.type === REQUEST_BASKET_AFTER_BASKET_UPDATE) {
      yield put(setBasketLoadingAfterUpdate(false));
    }
  } catch (error) {
    console.error("fetch basket saga error", error);
    if (action.type === REQUEST_BASKET_AFTER_BASKET_UPDATE) {
      yield put(setBasketLoadingAfterUpdate(false));
    }
  }
}
