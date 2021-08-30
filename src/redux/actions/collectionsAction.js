/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import {
  FETCH_COLLECTION_REQUEST,
  FETCH_COLLECTION_SUCCESS,
  FETCH_COLLECTION_FAILURE
} from "../types.js";

import { CATEGORY_FETCH_LINK } from "../links.js";

const fetchCollectionRequestAction = payload => ({
  type: FETCH_COLLECTION_REQUEST,
  payload: payload
});

const fetchCollectionSuccessAction = payload => ({
  type: FETCH_COLLECTION_SUCCESS,
  payload: payload
});

const fetchCollectionFailureAction = payload => ({
  type: FETCH_COLLECTION_FAILURE,
  paylaod: payload
});

export const fetchCollectionAction = (
  cat,
  URL,
  cid,
  lang,
  lat,
  long,
  distance
) => {
  console.info("borop cid", cid);
  return dispatch => {
    dispatch(fetchCollectionRequestAction({ loading: true, cid }));
    fetch(CATEGORY_FETCH_LINK(cid, lang, lat, long, distance))
      .then(res => res.json())
      .then(json =>
        dispatch(
          fetchCollectionSuccessAction({
            ...json,
            cid,
            cat,
            URL,
            loading: false
          })
        )
      )
      .catch(err => {
        console.error("error fetching collections", err);
        return dispatch(
          fetchCollectionFailureAction({
            error: err.message,
            loading: false,
            cid
          })
        );
      });
  };
};
