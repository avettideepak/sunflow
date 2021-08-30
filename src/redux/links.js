/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import {
  VID,
  PREVIEW,
  LINK_DISTRIBUTION,
  IS_PUBLISHED
} from "../project-config.js";

/*export const MENU_FETCH_LINK = `${LINK_DISTRIBUTION}/subcat.ajx?vid=${VID}&cname=Shop&iu=$LANGUAGE`;*/

const vidMain = "20210607181";

export const ACCOUNT_MESSAGES_LINK = `${LINK_DISTRIBUTION}/myaccountmessage.ajx?vid=${VID}`; // &type=2 send

export const MENU_FETCH_LINK = `${LINK_DISTRIBUTION}/uservices/1.0.2/menu/${VID}/category/Shop/lang/$LANGUAGE/`;

export const MENU_EXD_FETCH_LINK = `${LINK_DISTRIBUTION}/subcat.ajx?vid=${VID}&cid=72180&longdesc=all&showqty=yes`;
export const BY_STYLE_MENU_FETCH_LINK = `${LINK_DISTRIBUTION}/subcat.ajx?vid=${VID}&cid=72167&level=1&longdesc=all&showqty=yes&_=1570632812521`;

export const NOTIFY_ON_RESTOCK = `${LINK_DISTRIBUTION}/uservices/1.0.2/notifyme/`;

export const BASKET_LINK = (lang, vid = null) =>
  `${LINK_DISTRIBUTION}/uservices/1.0.2/basket/${vidMain}/lang/${lang}/`;

export const GET_BASKETS = (vid = null) =>
  `${LINK_DISTRIBUTION}/uservices/1.0.2/getbaskets/${vidMain}/`;

export const BASKET_UPDATE = vid =>
  `${LINK_DISTRIBUTION}/basket.html?vid=${vidMain}&executedAction=updateBasket&executeActionStatus=true`;

export const CATEGORY_FETCH_LINK = (
  cid,
  lang,
  lat = null,
  lng = null,
  distance = null
) =>
  `${LINK_DISTRIBUTION}/uservices/1.0.2/category-page/${VID}/cid/${cid}/lang/${lang}/${
    lat && lng && distance ? `&lat=${lat}&long=${lng}&distance=${distance}` : ``
  }`;

export const SEARCH_FETCH_LINK = (keyword, language) =>
  `${LINK_DISTRIBUTION}/uservices/1.0.2/search-page/${VID}/keyword/${keyword}/page/1/lang/${language}/`;

export const AHEAD_SEARCH = keyword =>
  `${LINK_DISTRIBUTION}/typeaheadsearch.ajx?vid=${VID}&pagetile=AdvancedSearchUsingSolrNew&iu=EN&q=${keyword}`;

export const CATEGORY_PAGING_FETCH_LINK = (
  cid,
  lang,
  page,
  queryString = null
) =>
  `${LINK_DISTRIBUTION}/uservices/1.0.2/category-paging/${VID}/cid/${cid}/lang/${lang}/page/${page}/showperpage/24/${
    queryString ? `&${queryString}` : ""
  }`;

export const SEARCH_PAGING_FETCH_LINK = (keyword, lang, page) =>
  `${LINK_DISTRIBUTION}/uservices/1.0.2/search-page/${VID}/keyword/${keyword}/page/${page}/lang/${lang}/`;

export const LOGIN_SIGNIN_LINK = `${LINK_DISTRIBUTION}/uservices/1.0.2/signin/${VID}/lang/$LANGUAGE/`;

export const LOGIN_CHECK_LINK = `${LINK_DISTRIBUTION}/uservices/1.0.2/login/${VID}/`;

export const FEATURED_FETCH_LINK = `${LINK_DISTRIBUTION}/uservices/1.0.2/category-page/${VID}/cid/59522/lang/$LANGUAGE/`;

export const CATEGORY_FEATURED_LINK = `${LINK_DISTRIBUTION}/uservices/1.0.2/category-page/${VID}/cid/$cid/lang/$LANGUAGE/&sortci=topsellers%20asc`;

export const LOGOUT_LINK = `${LINK_DISTRIBUTION}/uservices/1.0.2/signout/${VID}/`;

export const GET_ITEM_LINK = `${LINK_DISTRIBUTION}/uservices/1.0.2/product/${VID}/iid/$ITEMREPLACE/lang/$LANGUAGE/`;

export const GET_ATTIRIBUTE_LINK = (attributeId, lang) =>
  `${LINK_DISTRIBUTION}/uservices/1.0.2/variant/${VID}/aid/${attributeId}/lang/${lang}/?iu=${lang}`;

export const GET_ID_PRODUCT_LINK = `${LINK_DISTRIBUTION}$PRODUCT?tpt=json_$LANGUAGE`;

export const GET_CURRENCY_ID = `${LINK_DISTRIBUTION}/uservices/1.0.2/currency/${VID}/`;

export const GET_CURRENCY_INFO = `${LINK_DISTRIBUTION}/getcurrency.ajx?vid=${VID}&currencyid=$CURRENCY`;
export const GET_CURRENCY_LIST = `${LINK_DISTRIBUTION}/getcurrency.ajx?vid=${VID}`;

export const GET_PRICE_INVENTORY = `${LINK_DISTRIBUTION}/uservices/1.0.2/priceinventory/${VID}/iid/$PRODUCT/lang/$LANGUAGE/`;

export const ADD_TO_CART = `${LINK_DISTRIBUTION}/uservices/1.0.2/product-page/${vidMain}/iid/$PRODUCT/lang/$LANGUAGE/`;

export const ADD_TO_SUPP_CART = (vid, itemId, lang) =>
  `${LINK_DISTRIBUTION}/uservices/1.0.2/product-page/${vidMain}/iid/${itemId}/lang/${lang}/`;

export const GET_DELIVERY_OPTIONS = `${LINK_DISTRIBUTION}/getdeliveryoptions.ajx`;

export const ITEM_REVIEW = `${LINK_DISTRIBUTION}/uservices/1.0.2/product-review/`;

export const GET_SUPPLIER_INFO = `${LINK_DISTRIBUTION}/uservices/1.0.2/suppliers/${VID}/iid/$PRODUCT/lang/$LANGUAGE/`;

export const GET_LANGUAGES = `${LINK_DISTRIBUTION}/uservices/1.0.2/language/${VID}/`;

export const SEND_GOOGLE_TOKEN = `${LINK_DISTRIBUTION}/ssoautologin.ajx`;
