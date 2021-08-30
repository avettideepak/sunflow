/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import {
  FETCHING_FILTER_REQUEST,
  FETCHING_CATEGORY_SUCCESS,
  FETCHING_FILTER_SUCCESS,
  FACET_CHANGE_BUTTONS_STATE,
  SLIDER_MOVING,
  FETCHING_FILTER_FAILURE,
  SORTBYPARAMS_CHANGE_STATE,
  FILTERURL_CHANGE_STATE,
  UPDATE_FACET_BUTTONS_FOR_GROUPED_FACETS,
  SET_FACET_BREAD,
  FETCHING_CATEGORY_GATSBY_SUCCESS,
  RESET_GATSBY_CATEGORY,
  FETCH_STORES_SUCCESS,
  SHOW_DYNAMIC_CATEGORY
} from "../types.js";

const initialState = {
  facets: [],
  filterUrl: "",
  buttons: {},
  sliders: {},
  facetError: "",
  sortByParams: "",
  urlFilterParams: "",
  bread: [],
  itemsAreBeingFetched: false
};

const setSliders = (state, payload) => {
  // Accumulates all the count values of the facets and if it's not equal to 0 it returns false
  const { json } = payload;
  let thereIsActuallySomeFacet =
    json[2].facets &&
    json[2].facets.length > 0 &&
    json[2].facets
      .map(f => f[Object.keys(f)])
      .reduce((a, f) => {
        for (let key in f) {
          // console.info("key, a", f[key], a);
          a += f[key].count;
        }
        return a;
      }, 0) != 0;

  /*  json[2].facets.filter(facet =>
   facet[0].filter(facetItem =>
     facetItem.filter(facetItemCount => facetItemCount.count > 0)
   )
 ); */

  if (thereIsActuallySomeFacet) {
    return {
      ...state.sliders,
      ...payload.dynamicSlider,
      price: {
        minmaxValue: {
          min: Number(
            payload.json[2].facets[0].Price.filter(price => {
              if (price.count > 0) {
                return true;
              } else {
                return false;
              }
            }).map(pricefilter => {
              return [
                pricefilter.text.slice(0, pricefilter.text.indexOf("-") - 2),
                pricefilter.text.substring(pricefilter.text.indexOf("-") + 2)
              ];
            })[0][0]
          ),
          max: Number(
            payload.json[2].facets[0].Price.filter(price => {
              if (price.count > 0) {
                return true;
              } else {
                return false;
              }
            })
              .map(pricefilter => {
                return [
                  pricefilter.text.slice(0, pricefilter.text.indexOf("-") - 2),
                  pricefilter.text.substring(pricefilter.text.indexOf("-") + 2)
                ];
              })
              .slice(-1)[0][1]
          )
        },
        value: {
          min: Number(
            payload.json[2].facets[0].Price.filter(price => {
              if (price.count > 0) {
                return true;
              } else {
                return false;
              }
            }).map(pricefilter => {
              return [
                pricefilter.text.slice(0, pricefilter.text.indexOf("-") - 2),
                pricefilter.text.substring(pricefilter.text.indexOf("-") + 2)
              ];
            })[0][0]
          ),
          max: Number(
            payload.json[2].facets[0].Price.filter(price => {
              if (price.count > 0) {
                return true;
              } else {
                return false;
              }
            })
              .map(pricefilter => {
                return [
                  pricefilter.text.slice(0, pricefilter.text.indexOf("-") - 2),
                  pricefilter.text.substring(pricefilter.text.indexOf("-") + 2)
                ];
              })
              .slice(-1)[0][1]
          )
        }
      }
    };
  } else {
    return {
      ...state.sliders,
      ...payload.dynamicSlider,
      price: {
        minmaxValue: {
          min: 0,
          max: 1000000
        },
        value: {
          min: 0,
          max: 1000000
        }
      }
    };
  }
};

const setFacetBread = (state, payload) => {
  let newBread = payload;
  if (newBread != undefined) {
    if (newBread[2] == true) {
      state.bread = state.bread.filter(bread => {
        if (bread[0] == newBread[0]) {
          return false;
        } else {
          return true;
        }
      });
    } else {
      state.bread = [...state.bread, newBread];
    }
    return state.bread;
  }
  return [];
};

const setButtons = payload => {
  return payload.priceButtonsTemp;
};

const facetReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_DYNAMIC_CATEGORY: {
      return {
        ...state,
        itemsAreBeingFetched: false
      };
    }
    case RESET_GATSBY_CATEGORY: {
      return {
        ...state,
        bread: []
      };
    }
    case FETCHING_FILTER_REQUEST: {
      return {
        ...state,
        itemsAreBeingFetched: true
      };
    }
    case FETCHING_FILTER_FAILURE:
      return {
        ...state,
        fecetError: payload,
        itemsAreBeingFetched: false
      };
    case SLIDER_MOVING:
      return {
        ...state,
        sliders: {
          ...state.sliders,
          [payload.name]: {
            ...state.sliders[payload.name],
            value: {
              min: Number(payload.min),
              max: Number(payload.max)
            }
          }
        }
      };
    case SORTBYPARAMS_CHANGE_STATE:
      return {
        ...state,
        sortByParams: payload
      };
    case FILTERURL_CHANGE_STATE:
      return {
        ...state,
        filterUrl: payload
      };

    case FETCHING_FILTER_SUCCESS:
      return {
        ...state,
        facets: payload.facets,
        urlFilterParams: payload.filterFacets,
        itemsAreBeingFetched: false
      };

    case SET_FACET_BREAD:
      return {
        ...state,
        bread: setFacetBread(state, payload)
      };
    case FACET_CHANGE_BUTTONS_STATE:
      return {
        ...state,
        buttons: {
          ...state.buttons,
          [payload.filterName]: {
            ...state.buttons[payload.filterName],
            [payload.index]: payload.buttonState
          }
        }
      };
    case FETCHING_CATEGORY_SUCCESS:
      return {
        ...state,
        facets: payload.json[2].facets,
        filterUrl:
          payload.urlFilterParams == ""
            ? payload.filterUrl
            : payload.filterUrl + payload.urlFilterParams,
        urlFilterParams: payload.urlFilterParams,
        buttons: setButtons(payload), //payload.priceButtonsTemp,
        bread: []
      };
    case FETCHING_CATEGORY_GATSBY_SUCCESS:
      return {
        ...state,
        facets: payload.data.facets,
        filterUrl:
          payload.urlFilterParams == ""
            ? payload.filterUrl
            : payload.filterUrl + payload.urlFilterParams,
        urlFilterParams: payload.urlFilterParams,
        buttons: setButtons(payload), //payload.priceButtonsTemp,
        bread: []
      };
    case UPDATE_FACET_BUTTONS_FOR_GROUPED_FACETS:
      return {
        ...state,
        buttons: {
          ...state.buttons,
          [payload.facetName]: payload.facetButtons
        }
      };
    default:
      return state;
  }
};

export default facetReducer;
