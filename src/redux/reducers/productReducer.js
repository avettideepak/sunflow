/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
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
  SHOW_CONTINUE_MODAL,
  UNMOUNT_PRODUCT_PAGE,
  SET_REVIEW_MODAL_STATE,
  REQUEST_MAIN_PRODUCT_SKUS_N_SKUIDS,
  SUCECSS_MAIN_PRODUCT_SKUS_N_SKUIDS,
  FAILURE_MAIN_PRODUCT_SKUS_N_SKUIDS,
  SET_ATTRIBUTES_DETAILS,
  SET_CART_VALIDATION_ERR,
  POPULATE_ACCESSORY_MODAL,
  CLOSE_ACCESSORY_MODAL,
  GET_MODAL_ITEM_FETCH_SUCCESS,
  deliveryOptionsActions,
  addToCartActions,
  SHOW_CONTINUE_MODAL_QUOTE,
  UPDATE_ACCESSORY_INVENTORY,
  SET_SELECTED_CHECKBOX_ITEMS,
  UPDATE_SELECTED_CHECKBOX_ITEMS,
  confirmActions,
  SET_PRODUCT_SWITCH_IMAGE_FLAG,
  SET_PRODUCT_IMAGECAROUSEL_INITIAL,
  SET_PRODUCT_OUT_OF_STOCK_ERR,
  SET_PRODUCT_CHECKBOX_PRICE_INVENTORY,
  SET_ATTRIBUTE_CHECKBOX_FLAG_ACTION,
  SET_ATTRIBUTE_CHECKBOX_QTY,
  SET_REQUESTING_ADD_TO_CART,
  SET_PRODUCT_UNAVAILABLE
} from "../types.js";

const initialState = {
  itemDetail: {
    code: ""
  },
  priceInventory: {},
  loading: true,
  product: {
    title: "",
    price: { integer: "", decimal: "" },
    image: "",
    currency_sign: "",
    url: "",
    id: ""
  },
  noproduct: false,
  supplierInfo: [],
  requestingAddToCart: false,
  addToCartSuccess: false,
  addToCartMode: "",
  productAttributeCheckboxFlag: false,
  selectedProductAttributes: {},
  selectedProductCheckboxAttributes: { priceInventory: {} },
  productInitial: {
    title: "",
    longDesc: "",
    properties: []
  },
  reviewsModalOpen: false,
  frequentlyBoughtTogether: [],
  checkboxItems: [],
  selectedCheckboxItems: [],
  accessories: [],
  alsoLike: [],
  accessoryModal: {
    status: false,
    loading: true,
    title: "",
    imageUrl: "",
    price: "",
    priceInv: {},
    details: { longdesc: "", code: "" }
  },
  deliveryOptions: "",
  productImageSwitch: false,
  productPageImageCarouselInitial: true,
  productUnavilable: false
};

const copyInitialState = { ...initialState };

const setPrice = price => {
  return { integer: price.integer, decimal: price.decimal };
};

const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PRODUCT_UNAVAILABLE:
      return {
        ...state,
        productUnavilable: true
      };
    case POPULATE_ACCESSORY_MODAL:
      return {
        ...state,
        accessoryModal: {
          ...state.accessoryModal,
          status: true,
          title: payload.title,
          imageUrl: payload.imageUrl,
          price: payload.price
        }
      };
    case SET_PRODUCT_SWITCH_IMAGE_FLAG:
      return {
        ...state,
        productImageSwitch: payload
      };
    case SET_PRODUCT_IMAGECAROUSEL_INITIAL: {
      return {
        ...state,
        productPageImageCarouselInitial: payload
      };
    }
    case CLOSE_ACCESSORY_MODAL:
      return {
        ...state,
        accessoryModal: {
          status: false,
          loading: true,
          title: "",
          imageUrl: "",
          price: "",
          priceInv: {},
          details: { longdesc: "", code: "" }
        }
      };
    case UNMOUNT_PRODUCT_PAGE:
      return {
        ...copyInitialState
      };
    case CHANGE_TITLE_AND_LONGDESC:
      return {
        ...state,
        productInitial: payload,
        frequentlyBoughtTogether: [...payload.frequentlyBoughtTogether],
        checkboxItems: payload.checkboxItems ? [...payload.checkboxItems] : [],
        accessories: [...payload.accessories],
        alsoLike: [...payload.alsoLike]
      };
    case ADD_TO_CART_MODAL_CLOSE:
      return {
        ...state,
        addToCartSuccess: false
      };
    case SHOW_CONTINUE_MODAL:
      return {
        ...state,
        addToCartSuccess: true
      };
    case SHOW_CONTINUE_MODAL_QUOTE:
      return {
        ...state,
        addToCartSuccess: true
      };

    case addToCartActions.REQUEST_ADD_TO_CART:
      return {
        ...state,
        requestingAddToCart: true
      };
    case confirmActions.CONFIRM_NO: {
      return {
        ...state,
        requestingAddToCart: false
      };
    }
    case addToCartActions.SUCCESS_ADD_TO_CART:
      return {
        ...state,
        addToCartMode: payload,
        requestingAddToCart: false
      };
    case addToCartActions.FAILURE_ADD_TO_CART:
      return {
        ...state,
        requestingAddToCart: false
      };
    case SET_REQUESTING_ADD_TO_CART:
      return {
        ...state,
        requestingAddToCart: payload
      };
    case GET_ITEM_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        noproduct: false,
        addToCartSuccess: false
      };
    case GET_MODAL_ITEM_FETCH_SUCCESS:
      return {
        ...state,
        accessoryModal: {
          ...state.accessoryModal,
          loading: false,
          details: payload.json
        }
      };
    case GET_ITEM_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        itemDetail: {
          ...payload.json,
          mainProductSkus: state.itemDetail.mainProductSkus
            ? [...state.itemDetail.mainProductSkus]
            : payload.json.mainitemid === 0
            ? payload.json.skus
            : undefined,
          mainProductSkuIds: state.itemDetail.mainProductSkuIds
            ? [...state.itemDetail.mainProductSkuIds]
            : payload.json.mainitemid === 0
            ? payload.json.skuids
            : undefined,
          attributeDetails: state.itemDetail.attributeDetails
            ? [...state.itemDetail.attributeDetails]
            : undefined
        },
        noproduct: false,
        addToCartSuccess: false
      };

    case GET_ITEM_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        noproduct: true,
        addToCartSuccess: false
      };

    case UPDATE_ACCESSORY_INVENTORY:
      return {
        ...state,
        accessoryModal: {
          ...state.accessoryModal,
          priceInv: payload
        }
      };
    case UPDATE_PRICE_INVENTORY:
      return {
        ...state,
        priceInventory: payload
      };
    case SUPPLIER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        supplierInfo: [...payload]
      };
    case CHANGE_PRODUCT_ATTRIBUTES:
      return {
        ...state,
        selectedProductAttributes: payload
      };
    case CHANGE_PRODUCT_CHECKBOX_ATTRIBUTES:
      return {
        ...state,
        selectedProductCheckboxAttributes: payload
      };
    case SET_PRODUCT_CHECKBOX_PRICE_INVENTORY:
      return {
        ...state,
        selectedProductCheckboxAttributes: {
          ...state.selectedProductCheckboxAttributes,
          priceInventory: {
            ...state.selectedProductCheckboxAttributes.priceInventory,
            ...payload
          }
        }
      };
    case SET_ATTRIBUTE_CHECKBOX_QTY:
      return {
        ...state,
        selectedProductCheckboxAttributes: {
          ...state.selectedProductCheckboxAttributes,
          priceInventory: {
            ...state.selectedProductCheckboxAttributes.priceInventory,
            [payload.optionid]: {
              ...state.selectedProductCheckboxAttributes.priceInventory[
                payload.optionid
              ],
              qty: payload.qty
            }
          }
        }
      };
    case SET_ATTRIBUTE_CHECKBOX_FLAG_ACTION:
      return {
        ...state,
        productAttributeCheckboxFlag: payload
      };
    case SET_ATTRIBUTES_DETAILS:
      return {
        ...state,
        itemDetail: { ...state.itemDetail, attributeDetails: [...payload] }
      };
    case SET_CART_VALIDATION_ERR:
      return {
        ...state,
        itemDetail: {
          ...state.itemDetail,
          cartValidationErrors: [...payload]
        }
      };
    case SET_PRODUCT_OUT_OF_STOCK_ERR:
      return {
        ...state,
        itemDetail: {
          ...state.itemDetail,
          productOutOfStockError: payload
        }
      };
    case SET_REVIEW_MODAL_STATE:
      return {
        ...state,
        reviewsModalOpen: payload
      };
    case SUCECSS_MAIN_PRODUCT_SKUS_N_SKUIDS:
      return {
        ...state,
        itemDetail: { ...state.itemDetail, ...payload }
      };
    case SET_SELECTED_CHECKBOX_ITEMS:
      if (payload.mode === "add") {
        return {
          ...state,
          selectedCheckboxItems: [...state.selectedCheckboxItems, payload.item]
        };
      }
      if (payload.mode === "remove") {
        let newState = [...state.selectedCheckboxItems];
        newState = newState.filter(item => item.id !== payload.item.id);
        console.log(newState);
        return {
          ...state,
          selectedCheckboxItems: newState
        };
      }
      if (payload.mode === "update") {
        return {
          ...state,
          selectedCheckboxItems: [
            ...state.selectedCheckboxItems.map((item, index) => {
              if (item.id === payload.item.id) {
                return {
                  ...item,
                  qty: payload.item.qty
                };
              }
              return item;
            })
          ]
        };
      }
    case UPDATE_SELECTED_CHECKBOX_ITEMS:
      return state.selectedCheckboxItems.map((item, index) => {
        if (item.id === payload.id) {
          return {
            ...item,
            qty: payload.qty
          };
        }
        return item;
      });

    default:
      return state;
  }
};

export default productReducer;
