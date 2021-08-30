/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
require("dotenv").config({
  path: `.env`
});
require("es6-promise").polyfill();
require("isomorphic-fetch");
const { PROJECT_LINK } = require("./preBuildScripts/misc/links.js");
const clear = require("./preBuildScripts/clear.js");
const menu = require("./preBuildScripts/menu/menu.js");
const categories = require("./preBuildScripts/categories/categories.js");
const stores = require("./preBuildScripts/stores/stores.js");
const previewProducts = require("./preBuildScripts/previewProducts/previewProducts.js");
const projectMapping = require("./preBuildScripts/projectMapping/projectMapping");
const productCheckList = require("./preBuildData/previewProducts/run.js");

const promiseclear = () =>
  new Promise((res, rej) => {
    clear(res);
  });
const promisemenu = () =>
  new Promise((res, rej) => {
    menu(res);
  });

const promisecategories = () =>
  new Promise((res, rej) => {
    categories(res);
  });
  
const promisestores = () =>
  new Promise((res, rej) => {
    stores(res);
  });
const promisepreviewProducts = () =>
  new Promise((res, rej) => {
    previewProducts(res);
  });

const promiseprojectMapping = () =>
  new Promise((res, rej) => {
    projectMapping(res);
  });
const promiseproductCheckList = () =>
  new Promise((res, rej) => {
    productCheckList(res);
  });

console.error("PROJECT LINK: ", PROJECT_LINK);
promiseclear()
  .then(() => promiseproductCheckList())
  .then(() => promisemenu())
  .then(() => promisecategories())
  .then(() => promisestores())
  .then(() => promisepreviewProducts())
  .then(() => promiseproductCheckList())
  .then(() => console.log("PREFETCH ENDED"))
  .catch(err => console.error(err));
