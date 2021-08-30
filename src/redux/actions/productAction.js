/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import { call, put } from "redux-saga/effects";
import {
  GET_ITEM_FETCH_REQUEST,
  GET_ITEM_FETCH_SUCCESS,
  GET_ITEM_FETCH_FAILURE,
  UPDATE_PRICE_INVENTORY,
  SUPPLIER_INFO_SUCCESS,
  ADD_TO_CART_MODAL_CLOSE,
  CHANGE_PRODUCT_ATTRIBUTES,
  CHANGE_PRODUCT_CHECKBOX_ATTRIBUTES,
  CHANGE_TITLE_AND_LONGDESC,
  REQUEST_BASKET_AFTER_ADDING_TO_CART,
  SHOW_CONTINUE_MODAL,
  UNMOUNT_PRODUCT_PAGE,
  SET_REVIEW_MODAL_STATE,
  SHOW_CONTINUE_MODAL_QUOTE,
  SUCECSS_MAIN_PRODUCT_SKUS_N_SKUIDS,
  FAILURE_MAIN_PRODUCT_SKUS_N_SKUIDS,
  REQUEST_MAIN_PRODUCT_SKUS_N_SKUIDS,
  SET_ATTRIBUTES_DETAILS,
  SET_CART_VALIDATION_ERR,
  POPULATE_ACCESSORY_MODAL,
  CLOSE_ACCESSORY_MODAL,
  GET_MODAL_ITEM_FETCH_REQUEST,
  GET_MODAL_ITEM_FETCH_SUCCESS,
  deliveryOptionsActions,
  addToCartActions,
  UPDATE_ACCESSORY_INVENTORY,
  SET_SELECTED_CHECKBOX_ITEMS,
  UPDATE_SELECTED_CHECKBOX_ITEMS,
  SET_PRODUCT_SWITCH_IMAGE_FLAG,
  SET_PRODUCT_IMAGECAROUSEL_INITIAL,
  SET_PRODUCT_OUT_OF_STOCK_ERR,
  SET_PRODUCT_CHECKBOX_PRICE_INVENTORY,
  SET_ATTRIBUTE_CHECKBOX_FLAG_ACTION,
  SET_ATTRIBUTE_CHECKBOX_QTY,
  SET_REQUESTING_ADD_TO_CART,
  SET_PRODUCT_UNAVAILABLE
} from "../types.js";

import {
  GET_ITEM_LINK,
  GET_ID_PRODUCT_LINK,
  GET_PRICE_INVENTORY,
  ADD_TO_CART,
  GET_DELIVERY_OPTIONS,
  GET_SUPPLIER_INFO,
  ADD_TO_SUPP_CART
} from "../links.js";

import { VID, PREVIEW } from "../../project-config";

import { store } from "../../layout";

// import marketplaces from "../../marketplaces";

import projectTree from "../../shared/projectTree.json";

export const setProductUnavilableAction = () => ({
  type: SET_PRODUCT_UNAVAILABLE
});

export const unMountProductPageAction = () => ({
  type: UNMOUNT_PRODUCT_PAGE
});

/**
 * @param {boolean} payload           True or false.
 */
export const setProductSwitchImageAction = payload => ({
  type: SET_PRODUCT_SWITCH_IMAGE_FLAG,
  payload: payload
});

export const setProductImagecarouselInitialAction = payload => ({
  type: SET_PRODUCT_IMAGECAROUSEL_INITIAL,
  payload: payload
});

export const setAddToCartValidationErrors = payload => ({
  type: SET_CART_VALIDATION_ERR,
  payload: payload
});

export const setProductOutOfStockError = payload => ({
  type: SET_PRODUCT_OUT_OF_STOCK_ERR,
  payload: payload
});

export const setAttributesDetailsAction = payload => ({
  type: SET_ATTRIBUTES_DETAILS,
  payload: payload
});

export const setReviewModalStateAction = payload => ({
  type: SET_REVIEW_MODAL_STATE,
  payload: payload
});

export const fetchingProductRequestSaga = id => ({
  type: GET_ITEM_FETCH_REQUEST,
  payload: { id }
});

export const addToCartModalClose = () => ({
  type: ADD_TO_CART_MODAL_CLOSE
});

export const updateSelectedCheckboxItemsQty = (id, qty) => ({
  type: UPDATE_SELECTED_CHECKBOX_ITEMS,
  payload: { id, qty }
});

const api = link =>
  fetch(link)
    .then(res => res.json())
    .then(json => {
      return {
        json: json.__Result[0]
      };
    })
    .catch(err => {
      console.error("error fetching product details", err.message);
    });

    const mainVID = "20210607181";

export function* fetchFunctionSaga(action) {
  let language = store.getState().mainReducer.lang;
  try {
    let link = GET_ITEM_LINK;

    link = link
      .replace("$ITEMREPLACE", action.payload.id)
      .replace("$LANGUAGE", language);

    const product = yield call(api, link);

    yield put(fetchingItemSuccess(product.json, action.payload.id));
  } catch (e) {
    console.error("ERROR FETCH PRODUCT: ", e.message);
    fetchingItemFailure(e);
  }
}

export const fetchingItemSuccess = (json, id) => ({
  type: GET_ITEM_FETCH_SUCCESS,
  payload: { json, id }
});

export const fetchingItemFailure = error => ({
  type: GET_ITEM_FETCH_FAILURE,
  payload: error
});

export const changeTitleAndLongDesc = json => ({
  type: CHANGE_TITLE_AND_LONGDESC,
  payload: json
});

export const fetchingProductPriceInventory = id => {
  let language = store.getState().mainReducer.lang;
  return dispatch => {
    fetch(
      GET_PRICE_INVENTORY.replace("$PRODUCT", id).replace("$LANGUAGE", language)
    )
      .then(res => res.json())
      .then(json =>
        dispatch({ type: UPDATE_PRICE_INVENTORY, payload: json.__Result[0] })
      );
  };
};

export const fetchMainProductSkusAndSkuIds = id => {
  let language = store.getState().mainReducer.lang;

  let link = GET_ITEM_LINK;

  link = link.replace("$ITEMREPLACE", id).replace("$LANGUAGE", language);
  return dispatch => {
    dispatch({ type: REQUEST_MAIN_PRODUCT_SKUS_N_SKUIDS });
    fetch(link)
      .then(res => res.json())
      .then(json => {
        let skus = json.__Result[0].skus;
        let skuIds = json.__Result[0].skuids;
        dispatch({
          type: SUCECSS_MAIN_PRODUCT_SKUS_N_SKUIDS,
          payload: { mainProductSkus: skus, mainProductSkuIds: skuIds }
        });
      })
      .catch(err => {
        dispatch({ type: FAILURE_MAIN_PRODUCT_SKUS_N_SKUIDS });
      });
  };
};

export const reFetchProductInitialState = (link, itemid = null) => {
  if (itemid) {
    let language = store.getState().mainReducer.lang;

    link = ADD_TO_CART.replace("$PRODUCT", itemid).replace(
      "$LANGUAGE",
      language
    );
  }
  return dispatch => {
    fetch(link)
      .then(res => res.json())
      .then(json => {
        console.info("product json", json);

        json = json && json[0];
        json.productLink = link;

        // Filtering out the reviews where the rating is 0
        if (json && json.reviews && json.reviews.length > 0) {
          json.reviews = json.reviews.filter(review => review.rating != 0);
        }
        console.info("product json others");
        dispatch(changeTitleAndLongDesc(json));
      })
      .catch(err => {
        console.error("ERROR REFETCH INITIAL: ", err.message);
        dispatch(fetchingItemFailure(err));
      });
  };
};

export const fetchDirectUrlGetItem = (url, langCode, countryCode) => {
  console.info("new url4", url, langCode);
  let tempUrl = url;
  return dispatch => {
    tempUrl = tempUrl.includes("preview")
      ? tempUrl.replace("/preview", "")
      : tempUrl;

    if (!tempUrl.includes("product")) {
      if (tempUrl.includes(`/${langCode}/`)) {
        tempUrl = tempUrl.replace(`/${langCode}`, "");
      }
      // if (marketplaces.some(market => tempUrl.includes(market[1]))) {
      //   let marketplaceName = marketplaces.filter(market => {
      //     if (tempUrl.includes(market[1])) {
      //       return true;
      //     } else {
      //       return false;
      //     }
      //   })[0][1];
      //   tempUrl = tempUrl.replace(`/${marketplaceName}`, "");
      //   tempUrl = `/${marketplaceName}/product${tempUrl}`;
      // } 
      else {
        tempUrl = "/product" + tempUrl;
      }
    }
    let id = "";

    let link = GET_ID_PRODUCT_LINK.replace("$PRODUCT", tempUrl).replace(
      "$LANGUAGE",
      langCode
    );

    if (link.includes(`/${langCode}/`)) {
      link = link.replace(`${langCode}/`, "");
    }

    console.info("new url4", link);

    if (tempUrl.includes("storeitem.html")) {
      id = tempUrl.split("iid=")[1];
      dispatch(fetchingProductRequestSaga(id));
      dispatch(fetchingProductPriceInventory(id));
    } else {
      fetch(link)
        .then(res => {
          const text = res.text();

          return text;
        })
        .then(text => {
          text = text.replace(/\n/g, "");
          console.info("text2", text);
          if (
            text.includes(
              "This item is  unavailable,  Please  select  another item."
            )
          ) {
            return dispatch(setProductUnavilableAction(true));
          } else {
            return JSON.parse(text);
          }
        })
        .then(json => {
          console.info("product json", json);
          json = json && json[0];
          id = json.id;

          json.productLink = link;
          // Filtering out the reviews where the rating is 0
          if (json && json.reviews && json.reviews.length > 0) {
            json.reviews = json.reviews.filter(review => review.rating != 0);
          }

          dispatch(changeTitleAndLongDesc(json));
          dispatch(fetchingProductRequestSaga(id));
          dispatch(fetchingProductPriceInventory(id));
        })
        .catch(err => {
          console.error(" ERROR fetch Direct Product", err);

          dispatch(fetchingItemFailure(err));
        });
    }
  };
};

export const getSupplierInfo = id => {
  let language = store.getState().mainReducer.lang;
  return dispatch => {
    fetch(
      GET_SUPPLIER_INFO.replace("$PRODUCT", id).replace("$LANGUAGE", language),
      { cache: "no-store" }
    )
      .then(res => res.json())
      .then(json => {
        dispatch({ type: SUPPLIER_INFO_SUCCESS, payload: json.__Result });
      })
      .catch(err => console.error(err));
  };
};

export const showContinueModalAfterAddingToCartAction = (quoteMode = false) => {
  return dispatch => {
    dispatch({
      type: quoteMode ? SHOW_CONTINUE_MODAL_QUOTE : SHOW_CONTINUE_MODAL
    });
  };
};

export const addToLocalMiniCart = (title, price, qty, supplier) => {
  return dispatch => {
    dispatch({
      type: SHOW_CONTINUE_MODAL,
      payload: { title, price, qty, supplier }
    });
  };
};
export const addToLocalMiniCartQute = (title, price, qty, supplier) => {
  return dispatch => {
    dispatch({
      type: SHOW_CONTINUE_MODAL_QUOTE,
      payload: { title, price, qty, supplier }
    });
  };
};

const requestDeliveryOptionsAction = payload => ({
  type: deliveryOptionsActions.REQUEST_DELIVERY_OPTIONS,
  payload: payload
});

export const getDeliveryOptions = (
  distributorId,
  invCode,
  qty,
  id,
  attributesObject,
  quoteMode = false,
  vid = null
) => {
  let language = store.getState().mainReducer.lang;
  return dispatch => {
    let historyID = "";
    let form = new FormData();
    form.append("basketeditmode", false);
    form.append("suppressautochooseinstock", false);
    form.append("distributorId", distributorId);
    form.append("mode", "query");
    form.append("invcode", invCode);
    form.append("invhistid", "");
    form.append("qty", qty);
    form.append("vid", vid || VID);
    form.append("ml", language);

    /*     let tempJsonForm = {};
    form.forEach((value, key) => {
      tempJsonForm[key] = value;
    });
    let jsonForm = JSON.stringify(tempJsonForm); */

    dispatch(
      requestDeliveryOptionsAction({
        form,
        id,
        qty,
        distributorId,
        attributesObject,
        quoteMode,
        vid
      })
    );

    // fetch(GET_DELIVERY_OPTIONS, {
    //   method: "POST",
    //   body: form,
    //   headers: {
    //     Accept: "*/*",
    //     credentials: "same-origin"
    //   },
    //   mimeType: "multipart/form-data",
    //   data: form
    // })
    //   .then(res => res.json())
    //   .then(json => {
    //     //  dispatch({ type: ADD_TO_CART_SUCCESS });
    //     console.info("getDeliveryOptions", json);

    //     historyID = json.__Result.invhistid;
    //   })
    //   .then(() => {
    //     dispatch(
    //       addToCartProduct(
    //         id,
    //         qty,
    //         historyID,
    //         distributorId,
    //         attributesObject,
    //         quoteMode
    //       )
    //     );
    //   })
    //   .catch(err => console.error(err));
  };
};

export const addToCartProduct = (
  id,
  qty,
  historyId,
  distributorId,
  attributesObject,
  quoteMode,
  vid
) => {
  let language = store.getState().mainReducer.lang;
  return dispatch => {
    var form = new FormData();
    form.append(
      "productoption",
      `productoption.html?vid=${mainVID}&cid=891&qp=0`
    );
    form.append("replaceditemmsg_0", "");
    form.append("viewMode", "item");
    form.append("actionMode", "buy");
    form.append("selfUri", "storeitem.html");
    form.append("targetUri", "basket.html");
    form.append("mode", `${quoteMode ? "addQuote" : "addItem"}`);
    form.append("itemscount", "1");
    form.append("_targetaddItem", `basket.html?vid=${mainVID}`);
    form.append("_targetaddQuote", `basket.html?vid=${mainVID}`);
    form.append("basketItems[0].itemId", id);
    form.append("basketItems[0].vendorId", vid || VID);
    form.append("basketItems[0].itemToProcess", true);
    form.append("basketItems[0].quantity", qty);
    form.append("basketItems[0].inventoryHistoryId", historyId);
    form.append("basketItems[0].distributorId", distributorId);

    if (attributesObject != null) {
      console.info("borop attr objects", attributesObject);
      let keys = Object.keys(attributesObject);
      let attributeIdandOptionIds = [];
      console.info("attr -keys", keys);

      keys.forEach((key, keyIndex) => {
        console.info("attr -key", key);

        let attribute = attributesObject[key];
        console.info("Form", attribute);
        // Get only the attributeid and the optionid objects
        let attributeKeys = ["attributeid"];

        if (attribute && attribute.optionid) {
          attributeKeys.push("optionid");
        } else {
          attributeKeys.push("value");
        }

        attributeIdandOptionIds.push([
          attribute[attributeKeys[0]],
          attribute[attributeKeys[1]]
        ]);

        attributeKeys.forEach(key => {
          form.append(
            `basketItems[0].attributes[${keyIndex}].${key.replace("id", "Id")}`,
            attribute[key]
          );
        });
      });

      // append the last bit of attributeid and optonid part.
      if (attributeIdandOptionIds.length > 0) {
        for (let attributeAndOptionId of attributeIdandOptionIds) {
          if (
            attributesObject &&
            attributesObject[attributeAndOptionId[0]] &&
            attributesObject[attributeAndOptionId[0]].optionid
          ) {
            form.append(
              `attribute_${attributeAndOptionId[0]}`,
              attributeAndOptionId[1]
            );
          } else {
            let dataname = attributesObject[attributeAndOptionId[0]].dataname;
            form.append(`${dataname}`, attributeAndOptionId[1]);
          }
        }
      }
    }

    //form.append("redirectMode", true);

    for (let data of form.values()) {
      console.info("Form", data);
    }

    fetch(
      vid
        ? ADD_TO_SUPP_CART(vid, id, language)
        : ADD_TO_CART.replace("$PRODUCT", id).replace("$LANGUAGE", language),
      {
        method: "POST",
        body: form,
        headers: {
          Accept: "*/*",
          credentials: "same-origin"
        },
        mimeType: "multipart/form-data",
        data: form
      }
    )
      .then(res => {
        res.text();
      })
      .then(text => {
        console.info("add to cart result", text);
        dispatch(fetchingProductPriceInventory(id));
        dispatch(showContinueModalAfterAddingToCartAction(quoteMode));

        dispatch({
          type: addToCartActions.SUCCESS_ADD_TO_CART,
          payload: quoteMode ? "addQuote" : "addItem"
        });
      })
      .then(() => {
        dispatch({ type: REQUEST_BASKET_AFTER_ADDING_TO_CART });
      })
      .catch(err => console.error(err, err.message));
  };
};
const fetchPriceInventoryForProductsAgain = (products, dispatch) => {
  const langState = store.getState().mainReducer.lang;
  products.forEach(product => {
    const { id: skuid, optionId: optionid } = product;

    fetch(
      GET_PRICE_INVENTORY.replace("$PRODUCT", skuid).replace(
        "$LANGUAGE",
        langState
      )
    )
      .then(res => res.json())
      .then(json => {
        json.__Result[0].qty = 1;
        dispatch(
          setProductCheckboxAttributesPriceInventoryRecordAction({
            [optionid]: json.__Result[0]
          })
        );
      })
      .catch(err =>
        console.error("error fetching variant price inventory", err)
      );
  });
};

export const addToCartCheckboxProduct = (
  parentItemId,
  itemCount,
  products,
  historyId,
  quoteMode,
  vid
) => {
  let language = store.getState().mainReducer.lang;
  return dispatch => {
    dispatch(setRequestingAddToCartAction(true));
    var form = new FormData();
    form.append(
      "productoption",
      `productoption.html?vid=${mainVID}&cid=891&qp=0`
    );
    form.append("replaceditemmsg_0", "");
    form.append("viewMode", "item");
    form.append("actionMode", "buy");
    form.append("selfUri", "storeitem.html");
    form.append("targetUri", "basket.html");
    form.append("mode", `${quoteMode ? "addQuote" : "addItem"}`);
    form.append("itemscount", itemCount);
    form.append("_targetaddItem", `basket.html?vid=${mainVID}`);
    form.append("_targetaddQuote", `basket.html?vid=${mainVID}`);

    products.forEach((product, index) => {
      form.append(`basketItems[${index}].itemId`, product.id);
      form.append(`basketItems[${index}].vendorId`, vid || VID);
      form.append(`basketItems[${index}].itemToProcess`, true);
      form.append(`basketItems[${index}].quantity`, product.qty);
      /* form.append(`basketItems[${index}].inventoryHistoryId`, 42858); */
      form.append(`basketItems[${index}].distributorId`, product.distributorId);
      console.info("borop5", product.attributes);

      if (product.attributes) {
        const [attributeid, optionid] = product.attributes;
        form.append(
          `basketItems[${index}].attributes[0].attributeId`,
          attributeid
        );

        form.append(`basketItems[${index}].attributes[0].optionId`, optionid);
        form.append(`attribute_${attributeid}`, optionid);
      }
    });

    //form.append("redirectMode", true);

    for (let data of form.values()) {
      console.info("Form", data);
    }
    console.info("borop3", products);
    let id = products[0].id;
    fetch(
      vid
        ? ADD_TO_SUPP_CART(vid, id, language)
        : ADD_TO_CART.replace("$PRODUCT", id).replace("$LANGUAGE", language),
      {
        method: "POST",
        body: form,
        headers: {
          Accept: "*/*",
          credentials: "same-origin"
        },
        mimeType: "multipart/form-data",
        data: form
      }
    )
      .then(res => {
        res.text();
      })
      .then(text => {
        console.info("add to cart result", text);

        dispatch(fetchingProductPriceInventory(parentItemId));

        fetchPriceInventoryForProductsAgain(products, dispatch);

        dispatch(showContinueModalAfterAddingToCartAction(quoteMode));
        dispatch(setRequestingAddToCartAction(false));

        dispatch({
          type: addToCartActions.SUCCESS_ADD_TO_CART,
          payload: quoteMode ? "addQuote" : "addItem"
        });
      })
      .then(() => {
        dispatch({ type: REQUEST_BASKET_AFTER_ADDING_TO_CART });
      })
      .catch(err => console.error(err, err.message));
  };
};

export const changeProductAttributesAction = payload => ({
  type: CHANGE_PRODUCT_ATTRIBUTES,
  payload: payload
});

export const changeProductCheckboxAttributesAction = payload => ({
  type: CHANGE_PRODUCT_CHECKBOX_ATTRIBUTES,
  payload: payload
});

export const setProductCheckboxAttributesPriceInventoryRecordAction = payload => ({
  type: SET_PRODUCT_CHECKBOX_PRICE_INVENTORY,
  payload: payload
});

export const setAttributeCheckboxFlagAction = payload => ({
  type: SET_ATTRIBUTE_CHECKBOX_FLAG_ACTION,
  payload: payload
});

export const setAttributeCheckboxQtyAction = payload => ({
  type: SET_ATTRIBUTE_CHECKBOX_QTY,
  payload: payload
});

export const populateAccessoryModal = payload => ({
  type: POPULATE_ACCESSORY_MODAL,
  payload: payload
});

export const closeAccessoryModal = () => ({
  type: CLOSE_ACCESSORY_MODAL
});

export const fetchingModalProductRequestSaga = id => ({
  type: GET_MODAL_ITEM_FETCH_REQUEST,
  payload: { id }
});

export function* fetchModalProductAction(action) {
  let language = store.getState().mainReducer.lang;
  try {
    let link = GET_ITEM_LINK;

    link = link
      .replace("$ITEMREPLACE", action.payload.id)
      .replace("$LANGUAGE", language);

    const product = yield call(api, link);

    yield put(fetchingModalItemSuccess(product.json, action.payload.id));
  } catch (e) {
    console.error("MODAL FAILED", e);
  }
}

export const fetchingModalItemSuccess = (json, id) => ({
  type: GET_MODAL_ITEM_FETCH_SUCCESS,
  payload: { json, id }
});

export const fetchingAccessoryPriceInventory = id => {
  let language = store.getState().mainReducer.lang;
  return dispatch => {
    fetch(
      GET_PRICE_INVENTORY.replace("$PRODUCT", id).replace("$LANGUAGE", language)
    )
      .then(res => res.json())
      .then(json =>
        dispatch({
          type: UPDATE_ACCESSORY_INVENTORY,
          payload: json.__Result[0]
        })
      );
  };
};

export const fetchingCheckboxItemPriceInventory = (item, mode) => {
  let language = store.getState().mainReducer.lang;
  console.log(mode);
  return dispatch => {
    fetch(
      GET_PRICE_INVENTORY.replace("$PRODUCT", item.id).replace(
        "$LANGUAGE",
        language
      )
    )
      .then(res => res.json())
      .then(json => {
        let i = item;
        i.distId = json.__Result[0].prices[0].distributorId;
        i.code = json.__Result[0].code;
        dispatch({
          type: SET_SELECTED_CHECKBOX_ITEMS,
          payload: { item, mode }
        });
      });
  };
};

export const setRequestingAddToCartAction = payload => ({
  type: SET_REQUESTING_ADD_TO_CART,
  payload
});

//GONNA MOVE TO CUSTOM HOOK
export const mapProductUrls = (location, data) => {
  if (data !== "shop") {
    let tempLoc = "";
    if (location[0] === "/") {
      tempLoc = location.replace("/", "");
    } else {
      tempLoc = location;
    }
    console.info("PRODINDEX", tempLoc, data);

    let products = projectTree[data].products;
    let index = products.findIndex(f => f === tempLoc);

    let previousLink = "";
    let nextLink = "";

    if (index === 0) {
      previousLink = products[products.length - 1];
      nextLink = products[index + 1];
    } else if (index === products.length - 1) {
      previousLink = products[index - 1];
      nextLink = products[0];
    } else {
      previousLink = products[index - 1];
      nextLink = products[index + 1];
    }

    return { left: nextLink, right: previousLink };
  } else {
    return { left: "", right: "" };
  }
};

export const mapCategoryUrls = location => {
  let tempLoc = "";
  if (location[0] === "/") {
    tempLoc = location.split("/")[1];
  } else {
    tempLoc = location.split("/")[0];
  }
  console.info("LOCATION TREE", tempLoc);

  let cats = Object.keys(projectTree);
  let index = cats.findIndex(f => f === tempLoc);
  console.info("CATINDEX", cats, index);
  let previousLink = "";
  let nextLink = "";

  if (index === 0) {
    previousLink = projectTree[cats[cats.length - 1]].url;
    nextLink = projectTree[cats[1]].url;
  } else if (index === cats.length - 1) {
    previousLink = projectTree[cats[index - 1]].url;
    nextLink = projectTree[cats[0]].url;
  } else {
    previousLink = projectTree[cats[index - 1]].url;
    nextLink = projectTree[cats[index + 1]].url;
  }

  return { left: nextLink, right: previousLink };
};
