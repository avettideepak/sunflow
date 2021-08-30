/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import menuReducer from "./menuReducer";
import mainReducer from "./mainReducer";
import loginReducer from "./loginReducer";
import categoryReducer from "./categoryReducer";
import facetReducer from "./facetReducer";
import sessionReducer from "./sessionReducer";
import geoLocationReducer from "./geoLocationReducer";
import wishListReducer from "./wishListReducer";
import compareListReducer from "./compareListReducer";
import recentlyViewedItemsReducer from "./recentlyViewedItemsReducer";
import messagingReducer from "./messagingReducer";
import productReducer from "./productReducer";
import storeReducer from "./storeReducer";
import confirmReducer from "./confirmReducer";
import userLocationReducer from "./userLocationReducer";
import collectionsReducer from "./collectionsReducer";
import handlersReducer from "./handlersReducer";

import { combineReducers } from "redux";

const allReducers = combineReducers({
  menuReducer,
  mainReducer,
  loginReducer,
  categoryReducer,
  facetReducer,
  sessionReducer,
  geoLocationReducer,
  wishListReducer,
  compareListReducer,
  recentlyViewedItemsReducer,
  messagingReducer,
  productReducer,
  storeReducer,
  confirmReducer,
  userLocationReducer,
  collectionsReducer,
  handlersReducer
});

export default allReducers;
