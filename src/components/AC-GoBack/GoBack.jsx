import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { navigate, useLocation } from "@reach/router";
import { backToCategory } from "../../redux/actions/categoryActions";

export default function GoBack() {
  const dispatch = useDispatch();
  const location = useLocation();

  const backToCategoryFromProductState = useSelector(
    state => state.categoryReducer.backToCategoryFromProductPage,
    shallowEqual
  );

  const breadcrumbsState = useSelector(
    state => state.productReducer.productInitial.breadcrumbs,
    shallowEqual
  );

  const navCategoryState = useSelector(
    state => state.menuReducer.navCategory,
    shallowEqual
  );
  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  console.info("pathname2", location.pathname, navCategoryState);

  if (!isMobileState) {
    return null;
  }

  return (
    <div
      className="backBtn-wrapper"
      style={{ display: location.pathname === "/" ? "none" : "" }}
      onClick={e => e.stopPropagation()}
    >
      <button
        className="backBtn"
        onClick={() => {
          if (backToCategoryFromProductState && breadcrumbsState) {
            let breadcrumb = breadcrumbsState;
            breadcrumb = breadcrumb[breadcrumb.length - 1].url.replace(
              "shop",
              ""
            );
            dispatch(backToCategory());
            navigate(breadcrumb);
          } else if (
            navCategoryState &&
            navCategoryState.URL &&
            !navCategoryState.URL.includes(location.pathname)
          ) {
            dispatch(backToCategory());
            navigate(navCategoryState.URL.replace("shop", ""));
          } else {
            navigate("/");
          }
        }}
      >
        <span className="material-icons">keyboard_backspace</span>
      </button>
    </div>
  );
}
