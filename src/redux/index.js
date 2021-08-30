/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import { createStore, applyMiddleware, compose } from "redux";
import allReducer from "./reducers";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import rootSaga from "./saga/index";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export default function configureStore() {
  const store = createStore(
    allReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware, thunk))
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
