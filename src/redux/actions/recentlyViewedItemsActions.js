/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import { ADD_RECENT_VIEWED_ITEMS } from "../types.js";

export const addRecentItems = recentViewedItemList => ({
  type: ADD_RECENT_VIEWED_ITEMS,
  payload: recentViewedItemList
});

export const addRecentViewItemsAction = (
  id,
  title,
  currency_sign,
  image,
  itemLargeImage,
  price,
  url,
  recentViewedItemsState
) => {
  return dispatch => {
    if (!recentViewedItemsState.some(w => w.id == String(id))) {
      dispatch(
        addRecentItems([
          ...recentViewedItemsState,
          { id, title, currency_sign, image, itemLargeImage, price, url }
        ])
      );
    } else {
      let tempRecentViewItems = recentViewedItemsState.filter(i => i.id != id);
      dispatch(
        addRecentItems([
          ...tempRecentViewItems,
          { id, title, currency_sign, image, itemLargeImage, price, url }
        ])
      );
    }
  };
};
