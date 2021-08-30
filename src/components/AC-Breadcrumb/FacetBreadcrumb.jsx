import React, { useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  handleFacetFilterParams,
  checkButtonsAction,
  handleSetFacetBread
} from "../../redux/actions/facetActions";
import { fetchCategoryFromRender } from "../../redux/actions/categoryActions";
import { I18nContext } from "../../i18n/index.js";

const FacetBreadcrumb = () => {
  const dispatch = useDispatch();
  const { translate } = React.useContext(I18nContext);

  const filterUrlState = useSelector(
    state => state.facetReducer.filterUrl,
    shallowEqual
  );

  const facetBreadCrumbState = useSelector(
    state => state.facetReducer.bread,
    shallowEqual
  );

  const resetCidState = useSelector(
    state => state.categoryReducer.resetCid,
    shallowEqual
  );

  const catState = useSelector(
    state => state.categoryReducer.cat,
    shallowEqual
  );

  const parentsState = useSelector(
    state => state.categoryReducer.parents,
    shallowEqual
  );

  const keywordState = useSelector(
    state => state.categoryReducer.keyword,
    shallowEqual
  );

  const navCategoryState = useSelector(
    state => state.menuReducer.navCategory,
    shallowEqual
  );

  const handleFacet = (value, filterName, buttonsState, index) => {
    let bread = [value, filterName, !buttonsState, filterUrlState, index];
    dispatch(checkButtonsAction(index, filterName, buttonsState));
    dispatch(handleSetFacetBread(bread));
    dispatch(
      handleFacetFilterParams(value, filterName, buttonsState, filterUrlState)
    );
  };

  const reset = () => {
    dispatch(
      fetchCategoryFromRender(
        resetCidState,
        catState,
        parentsState,
        keywordState,
        navCategoryState
      )
    );
  };

  return (
    <div
      className="col-xs-12 facetCrumbRow"
      style={{ display: facetBreadCrumbState.length > 0 ? "flex" : "none" }}
    >
      {facetBreadCrumbState.length > 0
        ? facetBreadCrumbState.map(bread => {
            // destructuing and renaming
            const {
              0: value,
              1: filterName,
              2: buttonState,
              3: facetTitleAndText,
              4: index
            } = bread;

            let facetTitle = Object.keys(facetTitleAndText);

            if (filterName === "Price") {
              facetTitle = translate("js.item.price");
            } else if (filterName === "Review") {
              facetTitle = translate("js.item.reviews");
            }

            return (
              <div className="facet-crumb" key={index}>
                <span
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center"
                  }}
                  onClick={() =>
                    handleFacet(value, filterName, buttonState, index)
                  }
                >
                  {`${facetTitle}: ${Object.values(facetTitleAndText)}`}
                  <i
                    className="material-icons"
                    style={{ fontSize: "16px", marginLeft: "2px" }}
                  >
                    cancel
                  </i>
                </span>
              </div>
            );
          })
        : null}

      {facetBreadCrumbState.length > 0 ? (
        <div className="facet-crumb-cancel">
          <span
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center"
            }}
            onClick={() => reset()}
          >
            {translate("facetBreadCrumb.clearAll")}
            <i
              className="material-icons"
              style={{ fontSize: "16px", marginLeft: "2px" }}
            >
              cancel
            </i>
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default FacetBreadcrumb;
