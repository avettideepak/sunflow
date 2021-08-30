import React, { useEffect, useState, useContext } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import Async from "react-code-splitting";
import Grid from "@material-ui/core/Grid";
import HelmetSeo from "../../../../shared/components/AC-Helmet/HelmetSeo";
import {
  categoryUnmountAction,
  categoryFetchFlagAction
} from "../../../../redux/actions/menuActions.js";
import {
  fetchCategoryFromDirectUrl,
  backToCategoryNormalize
} from "../../../../redux/actions/categoryActions";
import { htmlDecode } from "../../../../functions/htmldecoder";
import { usePrevious } from "../../../../functions/Utilities.js";
import { PROJECT_LINK } from "../../../../project-config";
import { I18nContext } from "../../../../i18n/index.js";
import "./CategoryHeader.css";

import PromotionCategoryComponent from "../../../AC-Advertising/PromotionCategoryComponent";
import { useLocation } from "@reach/router";

const CategoryBreadcrumb = () => (
  <Async load={import("../../../AC-Breadcrumb/CategoryBreadcrumbNew.jsx")} />
);

export default function CategoryHeader({ renderedBy }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const prevPathName = usePrevious(location.pathname);
  console.info("prevPATH", prevPathName);

  const { langCode } = useContext(I18nContext);

  const navCats = useSelector(
    state => state.menuReducer.navCategory,
    shallowEqual
  );

  const categoryFetchFlagState = useSelector(
    state => state.menuReducer.categoryFetchFlag,
    shallowEqual
  );

  const categoryNameState = useSelector(
    state => state.categoryReducer.cat,
    shallowEqual
  );

  const categoryImageState = useSelector(
    state => state.categoryReducer.catImage,
    shallowEqual
  );

  const cidN = useSelector(state => state.categoryReducer.cidN, shallowEqual);

  const backButtonState = useSelector(
    state => state.categoryReducer.backButton,
    shallowEqual
  );

  /*Checking Category Name with URL Location if not match fetch the data again
  This funtion is for back button helper*/
  useEffect(() => {
    let prevPath = prevPathName;
    if (langCode !== "en" && prevPath) {
      prevPath.replace(`/${langCode}`, "");
    }

    if (renderedBy === "Stores") {
      console.info("langCode renderedBy", renderedBy);
      dispatch(fetchCategoryFromDirectUrl());
    } else {
      if (
        (prevPath !== location.pathname && prevPath !== undefined) ||
        categoryFetchFlagState == true
      ) {
        if (!backButtonState) {
          dispatch(fetchCategoryFromDirectUrl());
        } else {
          dispatch(backToCategoryNormalize());
        }
      }
    }

    return () => {
      if (renderedBy === "Stores") {
        console.info(`renderedBy: ${renderedBy} fetch flag action`);
        dispatch(categoryFetchFlagAction(true));
      }
    };
  }, [location.pathname]);

  if (navCats) {
    let headerName = categoryNameState || "";
    if (categoryNameState === "Home" || categoryNameState === "Shop") {
      headerName = "";
    }
    headerName = headerName && headerName.replace(/%20/g, " ");
    return (
      <React.Fragment>
        <HelmetSeo title={headerName} desc={headerName} cid={cidN} />
        <CategoryBreadcrumb />
        <div
          className="sub-nav-wrapper"
          style={{
            // background: `url(https://s3.ca-central-1.amazonaws.com/demob2b2cs3.avetti.ca/store${categoryImageState})`
            background: `url(https://mall-preview.avetti.io/preview/store/20180522154/assets/category/images/deals.jpg)`
          }}
        >
          <div className="sub-nav-menu">
            <div className="sub-nav-title-desc-wrapper">
              <Grid container justify="space-between" alignItems="center">
                <Grid item xs={12}>
                  <h2
                    style={{ backgroundColor: "transparent" }}
                    className="sub-nav-menu-title"
                    dangerouslySetInnerHTML={{
                      __html: htmlDecode(headerName)
                    }}
                  ></h2>
                </Grid>
                <Grid item xs={12}>
                  <div
                    className="category-description"
                    style={{
                      display: navCats.longdesc != "" ? `flex` : `none`
                    }}
                  >
                    <p
                      style={{
                        margin: "0"
                      }}
                      dangerouslySetInnerHTML={{
                        __html: navCats.longdesc
                      }}
                    ></p>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
          
        </div>
      </React.Fragment>
    );
  } else {
    return null;
  }
}
