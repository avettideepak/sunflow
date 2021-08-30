/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import {
  FETCH_BASKET_SUCCESS,
  FETCH_SUPPLIERS_BASKET_SUCCESS,
  SET_BASKET_LOADING_AFTER_UPDATE
} from "../types.js";

const initialState = {
  basket: {
    itemsCount: 0,
    products: [],
    quoteproducts: [],
    totalPriceProducts: 0,
    totalPriceQuoteProducts: 0
  },
  suppliersBasket: {},
  basketLoading: false
};

const setTotal = products => {
  let totalPrice = 0;
  products.map(({ price, qty }) => {
    totalPrice += price * qty;
  });
  return totalPrice;
};

const menuReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_BASKET_LOADING_AFTER_UPDATE:
      return {
        ...state,
        basketLoading: payload
      };
    case FETCH_BASKET_SUCCESS:
      return {
        ...state,
        basket: {
          ...state.basket,
          itemsCount: payload.products.length + payload.quoteproducts.length,
          products: payload.products,
          quoteproducts: payload.quoteproducts,
          totalPriceProducts: setTotal(payload.products),
          totalPriceQuoteProducts: setTotal(payload.quoteproducts)
        }
      };
    case FETCH_SUPPLIERS_BASKET_SUCCESS: {
      return {
        ...state,
        suppliersBasket: payload
      };
    }
    default:
      return state;
  }
};

export default menuReducer;
