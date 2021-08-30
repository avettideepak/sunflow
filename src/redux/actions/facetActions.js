/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import {
  FETCHING_FILTER_REQUEST,
  FETCHING_FILTER_SUCCESS,
  FACET_CHANGE_BUTTONS_STATE,
  FETCHING_FILTER_FAILURE,
  SLIDER_MOVING,
  SORTBYPARAMS_CHANGE_STATE,
  FILTERURL_CHANGE_STATE,
  UPDATE_FACET_BUTTONS_FOR_GROUPED_FACETS,
  SET_FACET_BREAD
} from "../types.js";

import { fetchCategoryFromRender } from "./categoryActions.js";

export const fetchingFilterRequest = () => ({
  type: FETCHING_FILTER_REQUEST
});

export const fetchingFilterSuccess = (
  numberOfItems,
  categoryItems,
  facets,
  pages,
  filterFacets,
  bread
) => ({
  type: FETCHING_FILTER_SUCCESS,
  payload: {
    numberOfItems,
    categoryItems,
    facets,
    pages,
    filterFacets,
    bread
  }
});

export const dispatchUpdateFacetButtonsForGroupedFacets = (
  facetName,
  facetButtons
) => ({
  type: UPDATE_FACET_BUTTONS_FOR_GROUPED_FACETS,
  payload: { facetName, facetButtons }
});

export const sortByParamsChangeState = sortByParams => ({
  type: SORTBYPARAMS_CHANGE_STATE,
  payload: sortByParams
});

export const filterUrlChangeState = url => ({
  type: FILTERURL_CHANGE_STATE,
  payload: url
});

export const facetChangeButtonsState = (index, filterName, buttonState) => {
  return {
    type: FACET_CHANGE_BUTTONS_STATE,
    payload: { index, filterName, buttonState }
  };
};

export const setFacetBread = bread => ({
  type: SET_FACET_BREAD,
  payload: bread
});

export const fetchingFilterFailure = error => ({
  type: FETCHING_FILTER_FAILURE,
  payload: error
});

export const sliderMoving = (min, max, name) => ({
  type: SLIDER_MOVING,
  payload: { min, max, name }
});

export const mobileFilterUrlSet = url => {
  return dispatch => {
    dispatch(filterUrlChangeState(url));
  };
};

export const mobileNewFilterFacet = (url, bread) => {
  return dispatch => {
    dispatch(fetchingFilterRequest());
    fetch(url)
      .then(res => res.json())
      .then(json => {
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
        let facets = json[2].facets;
        let pages = tempages;
        // let filterUrl = url;

        dispatch(
          fetchingFilterSuccess(
            numberOfItems,
            categoryItems,
            facets,
            pages,
            bread
          )
        );
      })
      .catch(error => {
        console.error("fetching filter failure", error);
        dispatch(fetchingFilterFailure(error));
      });
  };
};

export const newFilterFacet = (url, filterFacets) => {
  // console.info("FRI2", filterFacets, url, bread);

  return dispatch => {
    dispatch(fetchingFilterRequest());

    dispatch(filterUrlChangeState(url));

    fetch(url)
      .then(res => res.json())
      .then(json => {
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

        let facets = json[2].facets;

        let pages = tempages;
        // let filterUrl = url;
        dispatch(
          fetchingFilterSuccess(
            numberOfItems,
            categoryItems,
            facets,
            pages,
            filterFacets
            //  bread
          )
        );
      })
      .catch(error => {
        console.error("fetching filter failure", error);
        dispatch(fetchingFilterFailure(error));
      });
  };
};

export const sliderMovingAction = (min, max) => {
  return dispatch => {
    dispatch(sliderMoving(min, max));
  };
};

export const checkButtonsAction = (index, filterName, buttonState) => {
  return dispatch => {
    dispatch(facetChangeButtonsState(index, filterName, !buttonState));
  };
};

export const resetFacetStatesAction = (cid, cat) => {
  return dispatch => {
    dispatch(fetchCategoryFromRender(cid, cat));
  };
};

export const handleSetFacetBread = bread => {
  return dispatch => {
    dispatch(setFacetBread(bread));
  };
};

export const updateFacetButtonsForGroupedFacets = (facetName, facetButtons) => {
  return dispatch => {
    dispatch(
      dispatchUpdateFacetButtonsForGroupedFacets(facetName, facetButtons)
    );
  };
};

export const handleFacetFilterParams = (
  value,
  filterName,
  buttonsState,
  filterUrl,
  index,
  mobile = false,
  titleCode = null,
  valueCode = null
) => {
  /*RAW URL LINK*/
  let url = filterUrl;
  if (url.includes("/?")) url = url.replace("/?", "/&");

  value = value.split(" ").join("%20");

  if (filterName === "Price") filterName = "price";
  else if (filterName === "Reviews") filterName = "review";

  /*URL REST PARAMS*/
  let filterFacets = "";

  filterFacets = `&${titleCode || filterName}=${valueCode || value}`;
  let filterFacetsNonCodeVersion = `&${filterName}=${value}`;
  console.info("STATE-Facets***", value, filterName, buttonsState, filterUrl);

  if (buttonsState && buttonsState != "slider") {
    url = url + filterFacets;
    filterFacets = url.slice(url.indexOf("&"), url.length);
  } else if (buttonsState == "slider") {
    if (url.includes("&" + filterName) && filterName == "price") {
      url =
        url.slice(0, url.indexOf(`&${filterName}`)) +
        url.slice(url.indexOf("]") + 1, url.length) +
        filterFacets;
    } else if (url.includes(filterName)) {
      let split = url.split(`&${filterName}`);
      let secondSplit = "";
      if (split[split.length - 1].includes("&")) {
        secondSplit = split[split.length - 1].slice(
          split[split.length - 1].indexOf("&"),
          split[split.length - 1].length
        );
      }
      url = split[0] + secondSplit + filterFacets;
    } else {
      url = url + filterFacets;
    }
    filterFacets = url.slice(url.indexOf("&"), url.length);
  } else {
    console.info(
      "STATE-Facets THIS SHOULD BE 0",
      `<${url}>`,
      `<${filterFacets}>`,
      filterFacetsNonCodeVersion
    );

    url = url.replace(filterFacets, "").replace(filterFacetsNonCodeVersion, "");
    filterFacets = url.slice(url.indexOf("&"), url.length);
    console.info("STATE-Facets THIS SHOULD BE 1", url);
  }

  // url = url.replace("/&", "/?");
  console.info("STATE-Facets", filterFacets, url);
  if (filterFacets === "/") filterFacets = "";

  //FacetBreadcrumb
  //let bread = [value, filterName, !buttonsState, filterUrl, index];
  if (!mobile) return newFilterFacet(url, filterFacets);
  else return mobileFilterUrlSet(url, filterFacets);
};

export const handleSortBySelectChange = (url, filterFacets) => {
  return newFilterFacet(url, filterFacets);
};
