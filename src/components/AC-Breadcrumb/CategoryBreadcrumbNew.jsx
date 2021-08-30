/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */ import React, {
  useContext,
} from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import { PREVIEW } from "../../project-config.js";
import { Link } from "gatsby";

import {
  fetchCategoryFromRender,
  changeCategoryName,
  backToCategory,
} from "../../redux/actions/categoryActions";

import { I18nContext } from "../../i18n/index";
import { navigate, useLocation } from "@reach/router";

const CategoryBreadcrumb = ({ back }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { langCode, translate } = useContext(I18nContext);

  const navCatsState = useSelector(
    (state) => state.menuReducer.navCats,
    shallowEqual
  );

  const categoryParentsNameState = useSelector(
    (state) => state.categoryReducer.parents,
    shallowEqual
  );

  const handleBreadCrumbClicked = (cid, cat, parents) => {
    let category = navCatsState;
    for (let parent of parents) {
      category = category.childs.filter((c) => {
        if (c.cid === parent[1]) {
          /*parent's cid equals cid */
          return true;
        }
      })[0];
    }

    dispatch(changeCategoryName(cat, parents));
    dispatch(fetchCategoryFromRender(cid, cat, parents, "", category));
  };

  let locationHref = location.pathname.split("/").filter((f) => f !== "");
  return (
    <div className="sub-nav-bread">
      <ul className="breadcrumb categorybred">
        <li typeof="v:Breadcrumb">
          <Link
            className="text-link"
            to={langCode === "en" ? `/` : `/${langCode}`}
            property="v:title"
            rel="v:url"
          >
            {`${translate("Home")} > `}
          </Link>
          {locationHref.map((url, index) => {
            return (
              <Link
                key={index}
                className="text-link"
                to={
                  "/" +
                  locationHref.reduce((acc, url, i) =>
                    i <= index ? acc + "/" + url : acc
                  )
                }
              >
                <span
                  style={{ textTransform: "capitalize" }}
                  className={
                    index == locationHref.length - 1
                      ? "final_look last_breadcrumb final-bc"
                      : "home_look"
                  }
                  dangerouslySetInnerHTML={{
                    __html: url.replace(
                      /%20/g,
                      " "
                    ),
                  }}
                ></span>
                {index === locationHref.length - 1 ? "" : " > "}
              </Link>
            );
          })}
        </li>
      </ul>

      <div className="Malltimings"><i className="material-icons">access_time</i> mall timing- 09 : 00 AM - 11 : 00 PM</div>
      
      {/* {back && (
        <div style={{ width: "150px" }}>
          <button
            className="backBtn"
            onClick={() => {
              dispatch(backToCategory());
              navigate(-1);
            }}
            style={{ backgroundColor: "#2d509f" }}
          >
            <span class="material-icons">keyboard_backspace</span>{" "}
            {translate("compItems.goBackButton")}
          </button>
        </div>
      )} */}
    </div>
  );
};

export default CategoryBreadcrumb;
