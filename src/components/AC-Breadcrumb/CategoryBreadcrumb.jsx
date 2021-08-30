import React, { useContext } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import { PREVIEW } from "../../project-config.js";
import { Link } from "gatsby";

import {
  fetchCategoryFromRender,
  changeCategoryName,
  backToCategory
} from "../../redux/actions/categoryActions";

import { I18nContext } from "../../i18n/index";
import { navigate, useLocation } from "@reach/router";

const CategoryBreadcrumb = ({ back }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { langCode, translate } = useContext(I18nContext);

  const navCatsState = useSelector(
    state => state.menuReducer.navCats,
    shallowEqual
  );

  const categoryParentsNameState = useSelector(
    state => state.categoryReducer.parents,
    shallowEqual
  );

  const handleBreadCrumbClicked = (cid, cat, parents) => {
    let category = navCatsState;
    for (let parent of parents) {
      category = category.childs.filter(c => {
        if (c.cid === parent[1]) {
          /*parent's cid equals cid */
          return true;
        }
      })[0];
    }

    dispatch(changeCategoryName(cat, parents));
    dispatch(fetchCategoryFromRender(cid, cat, parents, "", category));
  };

  return (
    <div className="sub-nav-bread">
      <ul className="breadcrumb">
        <li typeof="v:Breadcrumb">
          <Link
            className="text-link"
            to={langCode === "en" ? `/` : `/${langCode}`}
            property="v:title"
            rel="v:url"
          >
            {`${translate("Home")} > `}
          </Link>
          {categoryParentsNameState.length > 0
            ? categoryParentsNameState.map((parent, index) => {
                if (index === 0) {
                  if (back) {
                    return (
                      <div key={index}>
                        <span
                          onClick={() => {
                            dispatch(backToCategory());
                            navigate(-1);
                          }}
                          style={{
                            cursor: "pointer",
                            fontSize: "11px"
                          }}
                          className={
                            index == categoryParentsNameState.length - 1
                              ? "final_look last_breadcrumb final-bc"
                              : "home_look"
                          }
                          dangerouslySetInnerHTML={{
                            __html: parent[0]
                          }}
                        ></span>
                        {index == categoryParentsNameState.length - 1
                          ? ""
                          : " > "}
                      </div>
                    );
                  } else {
                    let linkUrl = categoryParentsNameState[index][2];
                    let pathname = location.pathname.replace("/", "");
                    if (pathname.includes("stores")) pathname = "stores";
                    if (linkUrl && linkUrl.includes("shop")) {
                      linkUrl = linkUrl.replace("shop/", "");
                    }
                    return (
                      <Link
                        key={index}
                        className="text-link"
                        to={"/" + pathname}
                      >
                        <span
                          style={{ textTransform: "capitalize" }}
                          className={
                            index == categoryParentsNameState.length - 1
                              ? "final_look last_breadcrumb final-bc"
                              : "home_look"
                          }
                          dangerouslySetInnerHTML={{
                            __html: pathname.replace(/%20/g, " ")
                          }}
                        ></span>
                        {index < 1 ? "" : " > "}
                      </Link>
                    );
                  }
                }
              })
            : null}
        </li>
      </ul>
      {back && (
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
      )}
    </div>
  );
};

export default CategoryBreadcrumb;
