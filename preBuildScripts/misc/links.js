//PRODUCTS LINKS
const PREVIEW_PROJECT_LINK = process.env.GATSBY_PREVIEW_PROJECT_LINK;
const PUBLISH_PROJECT_LINK = process.env.GATSBY_PUBLISH_PROJECT_LINK;
const IS_PUBLISHED = process.env.GATSBY_IS_PUBLISHED == "true" ? true : false;

const PROJECT_LINK = IS_PUBLISHED ? PUBLISH_PROJECT_LINK : PREVIEW_PROJECT_LINK;

const apiUrl = product => `${product}?tpt=json_en`;
const productUrl = id =>
  `${PROJECT_LINK}/uservices/1.0.2/product/${process.env.GATSBY_VID}/iid/${id}/lang/en/`;
const supplierUrl = id =>
  `${PROJECT_LINK}/uservices/1.0.2/suppliers/${process.env.GATSBY_VID}/iid/${id}/lang/en/`;
const priceInventoryUrl = id =>
  `${PROJECT_LINK}/uservices/1.0.2/priceinventory/${process.env.GATSBY_VID}/iid/${id}/lang/en/`;

//CATEGORIES LINKS
const menuUrl = `${PROJECT_LINK}/uservices/1.0.2/menu/${process.env.GATSBY_VID}/category/Shop/lang/en/`;
const categoryUrl = id =>
  `${PROJECT_LINK}/uservices/1.0.2/category-page/${process.env.GATSBY_VID}/cid/${id}/lang/en/page/1/showperpage/24/`;
const pagingUrl = (id, page) =>
  `${PROJECT_LINK}/uservices/1.0.2/category-paging/${process.env.GATSBY_VID}/cid/${id}/lang/en/page/${page}/showperpage/24/`;

//STORES LINKS
const categoryUrlSeller = param =>
  `${PROJECT_LINK}/uservices/1.0.2/category-page/${process.env.GATSBY_VID}/cid/520343/lang/en/page/1/showperpage/24/&Sellers=${param}`;
const pagingUrlSeller = (param, page) =>
  `${PROJECT_LINK}/uservices/1.0.2/category-paging/${process.env.GATSBY_VID}/cid/520343/lang/en/page/${page}/showperpage/24/&Sellers=${param}`;

//PREVIEW PRODUCTS LINKS
const previewApiUrl = product => `${PROJECT_LINK}/${product}?tpt=json_en`;
const apiUrlNew = productCode =>
  `${PROJECT_LINK}/storeitem.html?vid=${process.env.GATSBY_VID}&iid=${productCode}&tpt=json_en`;

module.exports = {
  apiUrl,
  productUrl,
  supplierUrl,
  priceInventoryUrl,
  menuUrl,
  categoryUrl,
  pagingUrl,
  categoryUrlSeller,
  pagingUrlSeller,
  previewApiUrl,
  apiUrlNew,
  PROJECT_LINK
};
