/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import { call, put } from "redux-saga/effects";
import ParseErrorMessage from "../../functions/errorMessageParser";
import { store } from "../../layout";

import {
  FETCH_STORES_REQUEST,
  FETCH_STORES_REQUEST_SAGA,
  FETCH_STORES_SUCCESS,
  FETCH_STORES_FAILURE,
  SET_SELECTED_STORE,
  SET_SELECTED_STORE_TO_VIEW_ON_THE_MAP
} from "../types.js";

import { CATEGORY_FETCH_LINK } from "../links";
import buttonsMappingGatsby from "../../functions/buttonsMappingGatsby";

export const setSelectedStoreToViewOnTheMapAction = payload => ({
  type: SET_SELECTED_STORE_TO_VIEW_ON_THE_MAP,
  payload: payload
});

const fetchStoresRequestAction = navCategory => ({
  type: FETCH_STORES_REQUEST,
  payload: navCategory
});

const fetchStoresSuccessAction = (
  json,
  cid,
  cat,
  tempages,
  stores,
  priceButtonsTemp,
  //dynamicSlider,
  parents,
  link,
  filterUrl,
  urlFilterParams,
  resetCid,
  numberOfItems
) => {
  return {
    type: FETCH_STORES_SUCCESS,
    payload: {
      json,
      cid,
      cat,
      tempages,
      stores,
      priceButtonsTemp,
      // dynamicSlider,
      parents,
      link,
      filterUrl,
      urlFilterParams,
      resetCid,
      numberOfItems
    }
  };
};

const fetchStoresFailureAction = err => ({
  type: FETCH_STORES_FAILURE,
  payload: err
});

export const setSelectedStoreAction = payload => ({
  type: SET_SELECTED_STORE,
  payload: payload
});

class LocalDataService {
  api = link =>
    fetch(link)
      .then(res => res.json())
      .then(json => {
        let tempages = [];
        for (let i = 1; i <= Number(json[0].numOfPages); i++) {
          tempages.push(i);
        }
        let numberOfItems = Number(json[4].itemsCount);
        let stores = json[1].items.map(item => {
          const newObj = Object.assign({}, item);
          // update the new object
          let image = newObj.image;
          newObj.image = image.replace("thumbnails", "images");
          return newObj;
        });
        let priceButtonsTemp = buttonsMappingGatsby(json[2].facets);
        //  let dynamicSlider = {};
        // dynamicSlider = mapDynamicFacetSliders(json);

        let urlFilterParams = "";
        return {
          json,
          tempages,
          stores,
          priceButtonsTemp,
          //   dynamicSlider,
          urlFilterParams,
          numberOfItems
        };
      })
      .catch(err => {
        console.error("fetching stores error", err);
      });
}

export function* fetchStoresSaga(action) {
  yield put(fetchStoresRequestAction(action.payload.navCategory));
  try {
    let link = "";
    link = setLink(action.payload.cid, action.payload.cat);
    let filterUrl = link;
    let resetCid = action.payload.cid;
    const api = new LocalDataService();

    const store = yield call(api.api, link);

    store.stores = store.json[1].items;

    yield put(
      fetchStoresSuccessAction(
        store.json,
        action.payload.cid,
        action.payload.cat,
        store.tempages,
        store.stores,
        store.priceButtonsTemp,
        // store.dynamicSlider,
        action.payload.parents,
        link,
        filterUrl,
        store.urlFilterParams,
        resetCid,
        store.numberOfItems
      )
    );
  } catch (err) {
    console.error("FETCH STORES FAILED", err);
    fetchStoresFailureAction(ParseErrorMessage(err));
  }
}

const setLink = (cid, title) => {
  console.info("borop set link stores", title);
  let language = store.getState().mainReducer.lang;
  const { lat, lng } = store.getState().userLocationReducer;
  const distance = store.getState().categoryReducer.distance;
  let link = "";
  if (title != "Local Vendors") link = CATEGORY_FETCH_LINK(cid, language);
  else link = CATEGORY_FETCH_LINK(cid, language, lat, lng, distance);

  return link;
};
