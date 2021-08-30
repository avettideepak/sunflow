/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import { PREVIEW } from "../project-config.js";
import { translations } from "../i18n/index";
const categoryMapping = (arg, lang) => {
  console.info("category mapping", arg, lang);
  let allCategoryNames = [];
  let navTemp = { cid: 0, name: 0 };
  navTemp = arg;

  let activeFacets = {};

  const nestedRouting = category => {
    if (navTemp != undefined) {
      console.info("category mapping", category);
      let temp = navTemp.childs.find(child => {
        let name = child.URL.split("/");
        name = name[name.length - 1];
        console.info("mapping-", params);

        let parentName = child.description.replace("&amp;", "&");
        if (name.includes("&amp;")) {
          name = name.replace(" &amp; ", "-");
        }

        if (category.toLowerCase().includes(name)) {
          allCategoryNames.push([parentName, child.cid, child.URL]);
          return true;
        } else {
          return false;
        }
      });

      console.info("category- 6", temp);

      if (temp != undefined) {
        navTemp = temp;
      } else {
        navTemp = { cid: 0, name: 0 };
      }
    } else {
      navTemp = { cid: 0, name: 0 };
    }
  };
  let params = "";
  if (typeof window !== undefined) {
    params = window.location.pathname.replace(`${PREVIEW}`, "");
  } //Translate Part
  params = params.replace(`/${lang}`, "");

  params = params.split("/").filter(param => {
    if (param !== "" && param !== "preview" && param !== "shop") {
      return true;
    } else {
      return false;
    }
  });

  console.info("category- 4", params);

  if (params[0] == "stores" && params.length > 1) {
    console.info("category- title", params[1]);
    return { ...navTemp, parents: ["Sellers", "432427"] };
  }
  console.info("category- 5", params);

  if (params[0] != "" && !params.includes("stores")) {
    if (params[1] == "collections") {
      activeFacets = { collections: params[2] };
      params = [params[0]];
    }
    params
      .filter(fil => (fil != "" ? true : false))
      .map(routeCat => {
        nestedRouting(routeCat);
      });
  } else {
    params
      .filter(fil => (fil != "" ? true : false))
      .map(routeCat => {
        nestedRouting(routeCat);
      });
  }

  return { ...navTemp, parents: allCategoryNames, activeFacets };
};

export default categoryMapping;
