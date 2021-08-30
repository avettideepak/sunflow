import React, { useContext, useState, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import { PREVIEW } from "../../../../project-config.js";
import { Link } from "gatsby";
import { navigate } from "@reach/router";

import {
  fetchCategoryFromRender,
  changeCategoryName,
  backToCategory
} from "../../../../redux/actions/categoryActions";

import { I18nContext } from "../../../../i18n/index";

const Breadcrumb = ({ back }) => {
  const dispatch = useDispatch();
  const { langCode, translate } = useContext(I18nContext);
  const [breadcrumb, setBreadcrumb] = useState([]);

  const navCatsState = useSelector(
    state => state.menuReducer.navCats,
    shallowEqual
  );

  const categoryParentsNameState = useSelector(
    state => state.categoryReducer.parents,
    shallowEqual
  );

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  const breadcrumbState = useSelector(
    state => state.mainReducer.breadcrumb,
    shallowEqual
  );

  useEffect(() => {
    if (breadcrumbState && breadcrumbState.length > 1) {
      setBreadcrumb(
        breadcrumbState.filter(
          bread => bread.name !== "Home" && bread.name !== "Shop"
        )
      );
    }
  }, [breadcrumbState]);

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
    <>
      <div className="sub-nav-bread cc">
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
            {breadcrumb.map((bread, index) => {
              let url = bread.url.replace("shop");
              if (back) {
                return (
                  <React.Fragment key={index}>
                    <span
                      onClick={() => {
                        dispatch(backToCategory());
                        navigate(-1);
                      }}

                      style={{ cursor: "pointer", fontSize: "11px" }}
                      className={
                        index == categoryParentsNameState.length - 1
                          ? "final_look last_breadcrumb final-bc"
                          : "home_look"
                      }
                      dangerouslySetInnerHTML={{ __html: bread.name }}
                    ></span>
                    {index == breadcrumb.length - 1 ? "" : " > "}
                  </React.Fragment>
                );
              } else {
                return (
                  <Link key={index} className="text-link" to={url}>
                    <span
                      className={
                        index == categoryParentsNameState.length - 1
                          ? "final_look last_breadcrumb final-bc"
                          : "home_look"
                      }
                      dangerouslySetInnerHTML={{ __html: bread.name }}
                    ></span>
                    {index == categoryParentsNameState.length - 1 ? "" : " > "}
                  </Link>
                );
              }
            })}
          </li>
        </ul>

        <div className="Malltimings"><i className="material-icons">access_time</i> mall timing- 09 : 00 AM - 11 : 00 PM</div>
      </div>
      {!isMobileState && back && (
        <button
          className="backBtn"
          onClick={() => {
            dispatch(backToCategory());
            navigate(-1);
          }}
        >
          Go Back
        </button>
      )}
    </>
  );
};

export default Breadcrumb;
