/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import { call, put } from "redux-saga/effects";
import {
  FETCHING_CATEGORY_SUCCESS,
  FETCHING_CATEGORY_FAILURE,
  FETCHING_CATEGORY_REQUEST,
  FETCHING_CATEGORY_REQUEST_SAGA,
  CHANGE_CATEGORY_NAME,
  FETCHING_SEARCH_SUCCESS,
  FETCHING_SEARCH_FAILURE,
  CHANGE_KEYWORD_NAME,
  SET_FETCHED_CATEGORY_ITEMS_COUNT,
  FETCHING_CATEGORY_NO_ITEM_FOUND,
  BACK_TO_CATEGORY_REQUEST,
  BACK_TO_CATEGORY_FINISH,
  SET_CATEGORY_DISTANCE,
  FETCHING_CATEGORY_GATSBY_SUCCESS,
  RESET_GATSBY_CATEGORY,
  CHECK_GLOBAL_SHOW_ALL_PRODUCTS,
  SET_GO_BACK_TO_CATEGORY_FROM_PRODUCT_PAGE,
  SHOW_DYNAMIC_CATEGORY
} from "../types.js";
import { CATEGORY_FETCH_LINK, SEARCH_FETCH_LINK } from "../links.js";
import { store } from "../../layout";
import categoryMapping from "../../functions/categoryMapping.js";
import mapDynamicFacetSliders from "../../functions/mapDynamicFacetSliders";

import buttonsMappingGatsby from "../../functions/buttonsMappingGatsby.js";

import capitalize, {
  allFirstLettersCapitalize
} from "../../functions/capitalize";

export const setGlobalShowAllProducts = payload => ({
  type: CHECK_GLOBAL_SHOW_ALL_PRODUCTS,
  payload: payload
});

export const setCategoryDistanceAction = distance => {
  if (typeof localStorage !== undefined) {
    if (distance !== null) {
      localStorage.setItem("showAllProductsGlobal", "false");
    } else {
      localStorage.setItem("showAllProductsGlobal", "true");
    }
    return dispatch => {
      localStorage.setItem("geoDistance", JSON.stringify(distance));
      dispatch({
        type: SET_CATEGORY_DISTANCE,
        payload: distance
      });
    };
  }
};

export const setGoBackToCategoryFromProductPage = payload => ({
  type: SET_GO_BACK_TO_CATEGORY_FROM_PRODUCT_PAGE,
  payload
});

export const backToCategory = () => ({
  type: BACK_TO_CATEGORY_REQUEST
});
export const backToCategoryNormalize = () => ({
  type: BACK_TO_CATEGORY_FINISH
});

export const resetGatsbyCategory = data => {
  console.info("borop reset data", data);
  return dispatch => {
    dispatch(
      gatsbyFetchCategory(
        data,
        {
          currentPage: 1,
          pageCount: data.numberOfPages,
          url: data.url
        },
        data.url
      )
    );
    dispatch({
      type: RESET_GATSBY_CATEGORY
    });
  };
};

export const setFetchedCategoryItemsCount = (itemsCount = -1) => ({
  type: SET_FETCHED_CATEGORY_ITEMS_COUNT,
  payload: itemsCount
});

export const fetchingCategoryNoItemFound = payload => ({
  type: FETCHING_CATEGORY_NO_ITEM_FOUND,
  payload
});

export const showDynamicAction = payload => ({
  type: SHOW_DYNAMIC_CATEGORY,
  payload
});

export const fetchingCategorySuccess = (
  json,
  cid,
  cat,
  tempages,
  categoryItems,
  priceButtonsTemp,
  dynamicSlider,
  parents,
  link,
  filterUrl,
  urlFilterParams,
  resetCid,
  numberOfItems
) => ({
  type: FETCHING_CATEGORY_SUCCESS,
  payload: {
    json,
    cid,
    cat,
    tempages,
    categoryItems,
    priceButtonsTemp,
    dynamicSlider,
    parents,
    link,
    filterUrl,
    urlFilterParams,
    resetCid,
    numberOfItems
  }
});

export const fetchingSearchSuccess = (
  json,
  tempages,
  numberOfItems,
  categoryItems,
  priceButtonsTemp,
  dynamicSlider,
  keyword
) => ({
  type: FETCHING_SEARCH_SUCCESS,
  payload: {
    json,
    tempages,
    numberOfItems,
    categoryItems,
    priceButtonsTemp,
    dynamicSlider,
    keyword
  }
});

export const fetchingCategoryRequest = navCategory => ({
  type: FETCHING_CATEGORY_REQUEST,
  payload: navCategory
});

export const fetchingCategoryRequestSaga = (
  cid,
  cat,
  parents,
  keyword,
  navCategory
) => ({
  type: FETCHING_CATEGORY_REQUEST_SAGA,
  payload: { cid, cat, parents, keyword, navCategory }
});

export const fetchingCategoryFailure = error => ({
  type: FETCHING_CATEGORY_FAILURE,
  payload: error
});

export const fetchingSearchFailure = error => ({
  type: FETCHING_SEARCH_FAILURE,
  payload: error
});

export const fetchingCategorySuccessGatsby = (
  data,
  filterUrl,
  urlFilterParams,
  priceButtonsTemp,
  pageContext
) => ({
  type: FETCHING_CATEGORY_GATSBY_SUCCESS,
  payload: {
    data,
    filterUrl,
    urlFilterParams,
    priceButtonsTemp,
    pageContext
  }
});

export const gatsbyFetchCategory = (data, pageContext, keyword = "") => {
  return dispatch => {
    let link = "";
    link = setLink(data.cid, keyword, data.cat);

    let filterUrl = link;
    let urlFilterParams = "";

    let priceButtonsTemp = buttonsMappingGatsby(data.facets);

    dispatch(
      fetchingCategorySuccessGatsby(
        data,
        filterUrl,
        urlFilterParams,
        priceButtonsTemp,
        pageContext
      )
    );
  };
};

class LocalDataService {
  api = link =>
    fetch(link)
      .then(res => res.json())
      .then(json => {
        console.info("cat json", json);
        if (json.length === 0) {
          return { json };
        }
        let tempJson = Object.assign({}, json);
        console.info("cat fetch", tempJson);
        let tempages = [];
        for (let i = 1; i <= Number(json[0].numOfPages); i++) {
          tempages.push(i);
        }
        let numberOfItems = Number(json[4].itemsCount);
        let categoryItems = json[1].items.map(item => {
          const newObj = Object.assign({}, item);
          // update the new object
          let image = newObj.image;
          newObj.image = image.replace("thumbnails", "images");
          return newObj;
        });
        let priceButtonsTemp = buttonsMappingGatsby(json[2].facets);
        let dynamicSlider = {};
        dynamicSlider = mapDynamicFacetSliders(json);

        let urlFilterParams = "";
        console.info("cat finish");
        return {
          json,
          tempages,
          categoryItems,
          priceButtonsTemp,
          dynamicSlider,
          urlFilterParams,
          numberOfItems
        };
      })
      .catch(err => {
        console.error("fetching category error:", err);
      });
}

export function* fetchFunctionSaga(action) {
  try {
    let link = "";

    console.info(
      "link 111",
      action.payload.cid,
      "keyword:",
      action.payload.keyword,
      "nav cat:",
      action.payload.navCategory
    );
    link = setLink(
      action.payload.cid,
      action.payload.keyword,
      action.payload.navCategory
    );

    console.info("link", link);
    let filterUrl = link;
    let resetCid = action.payload.cid;

    const api = new LocalDataService();

    const category = yield call(api.api, link);
    console.info(
      "cat finish all api",
      category.json,
      category.json.length > 4 && Number(category.json[4].itemsCount) === 0
    );

    if (
      category.json.length === 0 ||
      (category.json.length > 4 && Number(category.json[4].itemsCount) === 0)
    ) {
      yield put(
        fetchingCategoryNoItemFound({
          cid: action.payload.cid,
          cat: action.payload.cat
        })
      );
    } else {
      console.info(
        "cat fetchsuccess",
        category.json,
        "13",
        action.payload.cid,
        "12",
        action.payload.cat,
        "10",
        category.tempages,
        "9",
        category.categoryItems,
        "8",
        category.priceButtonsTemp,
        "7",
        category.dynamicSlider,
        "6",
        action.payload.parents,
        "5",
        link,
        "4",
        filterUrl,
        "3",
        category.urlFilterParams,
        "2",
        resetCid,
        "1",
        category.numberOfItems
      );
      yield put(
        fetchingCategorySuccess(
          category.json,
          action.payload.cid,
          action.payload.cat,
          category.tempages,
          category.categoryItems,
          category.priceButtonsTemp,
          category.dynamicSlider,
          action.payload.parents,
          link,
          filterUrl,
          category.urlFilterParams,
          resetCid,
          category.numberOfItems
        )
      );
      console.info("cat fetchsuccess2");
    }
  } catch (e) {
    console.error("error fetching category:", e);
    yield put(fetchingCategoryFailure(e.message));
  }
}

export const fetchCategoryFromDirectUrl = () => {
  let category = store.getState().menuReducer.navCats;
  let storesState = store.getState().storeReducer.stores;
  let lang = store.getState().mainReducer.lang;

  console.info("category- 1", category);

  if (window.location.href.includes("search/")) {
    let keyword = window.location.href.split("search/")[1];

    keyword = decodeURI(keyword);
    console.info("keyword", keyword);
    return dispatch => {
      dispatch(fetchingCategoryRequest(category));
      dispatch(
        fetchingCategoryRequestSaga(
          "search",
          keyword,
          [
            ["search", ""],
            [keyword, ""]
          ],
          keyword,
          category
        )
      );
    };
  } else {
    let keyword = "";
    category = categoryMapping(category, lang);
    console.info("category- 3", category, lang);

    if (window.location.pathname.includes("/stores/")) {
      keyword = `stores/${window.location.pathname.split("stores/")[1]}`;
    }
    console.info("category- 2", category, keyword);

    if (category && category.description) {
      category.description = category.description.replace("&amp;", "&");
    }

    return dispatch => {
      console.info("WED3", storesState);
      dispatch(changeCategoryName(category.description, category.parents));
      // Need to check if the url includes store in order to make sure the stores are populated, which is required to find out the selected store
      if (
        window.location.pathname.includes("stores/") &&
        storesState == undefined
      ) {
        const restOfThePathName = window.location.pathname.split("stores/")[1];
        console.info(
          "restOfThePathName",
          restOfThePathName,
          !!restOfThePathName
        );
        if (restOfThePathName) {
          let category = store.getState().menuReducer.navCats;

          let storesNavCat = category.childs.find(navCat =>
            navCat.URL.includes("stores")
          );

          console.info("WED2", storesState, storesNavCat, category);

          dispatch(fetchingCategoryRequest(storesNavCat));
          let parent = [
            [storesNavCat.name, storesNavCat.cid, storesNavCat.URL]
          ];
          //dispatch(setStoresNavCatAction(storesNavCat));
          dispatch(
            fetchingCategoryRequestSaga(
              storesNavCat.cid,
              storesNavCat.name,
              parent,
              "",
              storesNavCat
            )
          );
        }
      }
      console.info("MON1", category);
      dispatch(fetchingCategoryRequest(category));
      dispatch(
        fetchingCategoryRequestSaga(
          category.cid,
          category.description,
          category.parents,
          keyword,
          category
        )
      );
    };
  }
};

export const fetchCategoryFromRender = (
  cid,
  cat,
  parents,
  keyword,
  category
) => {
  return dispatch => {
    console.info(
      "fetching category from render",
      cid,
      cat,
      parents,
      keyword,
      category
    );
    dispatch(fetchingCategoryRequest(category));
    dispatch(fetchingCategoryRequestSaga(cid, cat, parents, keyword, category));
  };
};

export const changeCategoryName = (cat, parents, keywordArg, longdesc) => {
  let keyword = "";
  if (keywordArg == "search") {
    keyword = keywordArg;
  }
  return {
    type: CHANGE_CATEGORY_NAME,
    payload: { cat, parents, keyword, longdesc }
  };
};

export const changeKeyword = keyword => {
  return {
    type: CHANGE_KEYWORD_NAME,
    payload: { keyword }
  };
};

const setLink = (cid, keyword, cat) => {
  let language = store.getState().mainReducer.lang;
  console.info("category- setlink", cat);
  const { lat, lng } = store.getState().userLocationReducer;

  const distance = store.getState().categoryReducer.distance;

  let link = "";
  console.info("category- 8", keyword);
  if (cid == "search") {
    link = SEARCH_FETCH_LINK(keyword, language);
  } else if (keyword.includes("stores/")) {
    keyword = keyword.replace("stores/", "").replace(/-/g, " ");

    keyword = allFirstLettersCapitalize(keyword);
    if (keyword.includes("4m")) keyword = "4M Farms";
    if (keyword === "So Jam Good") keyword = "So JAM Good";
    keyword = keyword.replace("%e2%80%99", "");
    if (keyword.slice(-1) === "/") keyword = keyword.slice(0, -1);

    link = CATEGORY_FETCH_LINK(cid, language) + `&Sellers=${keyword}`;
  } else if (keyword === "geo") {
    link = CATEGORY_FETCH_LINK(cid, language, lat, lng, distance || 200);
  } else {
    link = CATEGORY_FETCH_LINK(cid, language, lat, lng, distance);
  }

  if (cat && cat.activeFacets && Object.keys(cat.activeFacets).length > 0) {
    let keys = Object.keys(cat.activeFacets);
    if (cat.activeFacets[keys[0]]) {
      let facets = link.includes("?") ? "&" : "?";
      let count = 0;

      const handleConcat = count => {
        if (count > 0) {
          return "&";
        } else {
          return "";
        }
      };

      for (let key of keys) {
        if (cat.activeFacets[key]) {
          facets += `${handleConcat(count)}${capitalize(key)}=${capitalize(
            cat.activeFacets[key]
          )}`;
          count += 1;
        }
      }

      link = link + facets;
    }
  }
  return link;
};
