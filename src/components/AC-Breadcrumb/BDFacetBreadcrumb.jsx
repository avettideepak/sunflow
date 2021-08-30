import React, { useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  handleFacetFilterParams,
  checkButtonsAction,
  handleSetFacetBread
} from "../../redux/actions/facetActions";
import { resetGatsbyCategory } from "../../redux/actions/categoryActions";
import { I18nContext } from "../../i18n/index.js";

import classes from "./Styles/BDFacetBreadcrumb.module.css";

const FacetBreadcrumb = ({ data }) => {
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

  const handleFacet = (value, filterName, buttonsState, index, pairOfCodes) => {
    const bread = [value, filterName, !buttonsState, filterUrlState, index];
    const titleCode = pairOfCodes && pairOfCodes[0];
    const facetCode = pairOfCodes && pairOfCodes[1];

    dispatch(checkButtonsAction(index, filterName, buttonsState));
    dispatch(handleSetFacetBread(bread));
    dispatch(
      handleFacetFilterParams(
        value,
        filterName,
        buttonsState,
        filterUrlState,
        index,
        null,
        titleCode,
        facetCode
      )
    );
  };

  const reset = () => {
    dispatch(resetGatsbyCategory(data));
  };

  return (
    <div
      className={classes.facetCrumbRow}
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
              4: index,
              5: pairOfCodes
            } = bread;

            let facetTitle = Object.keys(facetTitleAndText);

            if (filterName === "Price") {
              facetTitle = translate("js.item.price");
            } else if (filterName === "Review") {
              facetTitle = translate("js.item.reviews");
            }

            return (
              <React.Fragment>
                <div className="facet-crumb">
                  <span
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      padding: "5px 8px",
                      background: "#f3f3f3",
                      border: "1px solid lightgray"
                    }}
                    onClick={() =>
                      handleFacet(
                        value,
                        filterName,
                        buttonState,
                        index,
                        pairOfCodes
                      )
                    }
                  >
                    {`${facetTitle}: ${Object.values(facetTitleAndText)}`}
                    <i
                      className="material-icons"
                      style={{ fontSize: "16px", marginLeft: "8px" }}
                    >
                      cancel
                    </i>
                  </span>
                </div>
              </React.Fragment>
            );
          })
        : null}

      {facetBreadCrumbState.length > 0 ? (
        <div className="facet-crumb-cancel">
          <span
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: "5px 8px",
              background: "#f3f3f3",
              border: "1px solid lightgray"
            }}
            onClick={() => reset()}
          >
            {translate(`facetBreadCrumb.clearAll`)}
            <i
              className="material-icons"
              style={{ fontSize: "16px", marginLeft: "8px" }}
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
