/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import {
  FETCH_WISHLIST_SUCCESS,
  TOGGLE_WISHLIST_SUCCESS,
  WISHLIST_ADD_REDUX
} from "../types.js";
import {
  WISHLIST_LINK,
  WISHLIST_ADD_LINK,
  WISHLIST_REMOVE_LINK
} from "../links.js";

export const addFunctionWishList = wishlist => ({
  type: WISHLIST_ADD_REDUX,
  payload: wishlist
});

export const toggleWishListAction = (
  id,
  code,
  title,
  desc,
  currency_sign,
  image,
  price,
  url,
  wishListState
) => {
  return dispatch => {
    id = String(id);
    let wishListTemp = wishListState || [];

    if (wishListTemp.length < 1 || !wishListTemp.some(w => w.id == id)) {
      dispatch(
        addFunctionWishList([
          ...wishListTemp,
          { id, code, title, desc, currency_sign, image, price, url }
        ])
      );
    } else {
      let tempWishList = wishListTemp.filter(w => w.id != id);
      dispatch(addFunctionWishList([...tempWishList]));
    }
  };
};
