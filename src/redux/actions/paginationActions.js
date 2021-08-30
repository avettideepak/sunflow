/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import {
  NEXT_PAGE_ACTION,
  DISPATCH_CURRENT_PAGE,
  DISPATCH_SCROOL_PAGE,
  NEXT_PAGE_SCROOL_ACTION,
  LAST_PAGE,
  NEXT_PAGE_SCROOL_POSITION_GATSBY,
  NEXT_PAGE_SCROOL_ACTION_GATSBY
} from "../types.js";

import {
  CATEGORY_PAGING_FETCH_LINK,
  SEARCH_PAGING_FETCH_LINK
} from "../links.js";

import { store } from "../../layout";

export const fetchingNextPage = (
  numberOfItemOnCurrentPage,
  categoryItems
  // filterUrl
) => ({
  type: NEXT_PAGE_ACTION,
  payload: {
    numberOfItemOnCurrentPage,
    categoryItems
  }
});

export const fetchingScroolNextPage = (
  numberOfItemOnCurrentPage,
  categoryItems
  // filterUrl
) => ({
  type: NEXT_PAGE_SCROOL_ACTION,
  payload: {
    numberOfItemOnCurrentPage,
    categoryItems
  }
});

export const nextPageScrool = () => ({
  type: NEXT_PAGE_SCROOL_POSITION_GATSBY
});
export const nextPageGatsby = (data, pos) => ({
  type: NEXT_PAGE_SCROOL_ACTION_GATSBY,
  payload: { data, pos }
});

export const dispatchCurrentPage = currentPage => ({
  type: DISPATCH_CURRENT_PAGE,
  payload: currentPage
});

export const dispatchScroolPage = (scroolPage, status = false) => ({
  type: DISPATCH_SCROOL_PAGE,
  payload: { scroolPage, status }
});

const setFilterUrl = (cid, keyword, page) => {
  console.info(
    "borop search pagination" + "cid:" + cid + "keyword:" + keyword + "page:",
    page
  );
  let language = store.getState().mainReducer.lang;
  let filterUrlState = store.getState().facetReducer.filterUrl;
  let queryString = "";
  if (filterUrlState && filterUrlState.includes("/&")) {
    queryString = filterUrlState.split("/&")[1];
  }
  let link = "";
  if (cid != "search") {
    link = CATEGORY_PAGING_FETCH_LINK(cid, language, page, queryString);
  } else {
    link = SEARCH_PAGING_FETCH_LINK(keyword, language, page);
  }
  return link;
};

export const nextPage = (page, cid, scrool) => {
  let params = store.getState().facetReducer.urlFilterParams;
  let keyword = store.getState().categoryReducer.keyword;
  let pagesLen = store.getState().categoryReducer.pages.length;
  if (pagesLen >= page) {
    let cidN;
    //cid undefined on Sitiation of scrooling
    if (cid == undefined || scrool == true) {
      cidN = store.getState().categoryReducer.cidN;
    } else {
      cidN = cid;
    }

    let link = setFilterUrl(cidN, keyword, page);

    if (params != "") {
      link = link + params;
    }

    return dispatch => {
      fetch(link)
        .then(res => res.json())
        .then(json => {
          let changeImage = json[1].items.map(item => {
            const newObj = Object.assign({}, item);
            // update the new object
            let image = newObj.image;
            newObj.image = image.replace("thumbnails", "images");
            return newObj;
          });

          if (scrool) {
            dispatch(
              fetchingScroolNextPage(Number(json[1].items.length), [
                ...changeImage
              ])
            );
          } else {
            dispatch(
              fetchingNextPage(Number(json[1].items.length), [...changeImage])
            );
          }
        });
    };
  } else {
    return dispatch => {
      dispatch({
        type: LAST_PAGE
      });
    };
  }
};
