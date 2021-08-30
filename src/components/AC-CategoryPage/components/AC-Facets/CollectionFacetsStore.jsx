import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  handleFacetFilterParams,
  checkButtonsAction,
  updateFacetButtonsForGroupedFacets,
  handleSetFacetBread
} from "../../../../redux/actions/facetActions";

import Loading from "../../../AC-Loading/Loading";
import ReviewStarMaker from "../../../../functions/ReviewStarMaker.jsx";
import { facetImageGenerator } from "../../../../functions/facetImageGenerator.js";
import classes from "./styles/BDFacets.module.css";

import { I18nContext } from "../../../../i18n/index";
import OtherFacetsNewBDCollectionsStore from "./OtherFacetsNewBDCollectionsStore";
import { useLocation } from "@reach/router";

export default function Facets(props) {
  const { translate } = React.useContext(I18nContext);
  const dispatch = useDispatch();
  const location = useLocation();
  const catName = useSelector(state => state.categoryReducer.cat, shallowEqual);

  const facetsState = useSelector(
    state => state.facetReducer.facets,
    shallowEqual
  );
  const filterUrlState = useSelector(
    state => state.facetReducer.filterUrl,
    shallowEqual
  );
  const loadingState = useSelector(
    state => state.categoryReducer.loading,
    shallowEqual
  );

  const buttonsState = useSelector(
    state => state.facetReducer.buttons,
    shallowEqual
  );

  const [activeFacetTitles, setActiveFacetTitles] = useState([
    "PRICE",
    "PIckup_Locations",
    "Sellers",
    "Collection",
    "Category",
    "Tag"
  ]);

  const [activeShowMoreFacets, setActiveShowMoreFaces] = useState([]);
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const handleFacet = (
    value,
    index,
    name,
    buttonState,
    facetTitleAndText,
    titleCode,
    valueCode
  ) => {
    console.info("borop btnstate", buttonState);
    // set to true if it's undefined, true means unchecked
    if (buttonState === undefined) {
      buttonState = true;
    }
    let bread = [
      value,
      name,
      !buttonState,
      facetTitleAndText,
      index,
      [titleCode, valueCode]
    ];
    dispatch(checkButtonsAction(index, name, buttonState));
    dispatch(handleSetFacetBread(bread));
    dispatch(
      handleFacetFilterParams(
        value,
        name,
        buttonState,
        filterUrlState,
        index,
        false,
        titleCode,
        valueCode
      )
    );
  };

  const handleViewMoreFacetClick = (title, viewMoreActive) => {
    viewMoreActive
      ? setActiveShowMoreFaces([
        ...activeShowMoreFacets.filter(t => t !== title)
      ])
      : setActiveShowMoreFaces([...activeShowMoreFacets, title]);
  };

  const handleFacetTitleClick = (e, title, facetActive) => {
    console.info("facetTitle clicked", title, facetActive);
    facetActive
      ? setActiveFacetTitles([...activeFacetTitles.filter(t => t !== title)])
      : setActiveFacetTitles([...activeFacetTitles, title]);
  };

  useEffect(() => {
    if (catName) {
      console.log("CAT Name", catName);
    }
  }, [catName]);

  useEffect(() => {
    if (
      facetsState &&
      facetsState[2] &&
      facetsState[2].Other &&
      facetsState[2].Other[0]
    ) {
      let name = facetsState[2].Other[0].title;
      // Adding the first 'other' facet to active states so that it will be active at first
      if (!activeFacetTitles.includes(name)) {
        setActiveFacetTitles([...activeFacetTitles, name]);
      }
    }
  }, [facetsState]);

  const renderViewMoreButton = (
    numberOfFacetsValuesWithCountMoreThanZero,
    isActive,
    viewMoreActive,
    title
  ) => {
    return numberOfFacetsValuesWithCountMoreThanZero > 5 ? (
      <button
        onClick={() => handleViewMoreFacetClick(title, viewMoreActive)}
        className="view-more-button"
        style={{ display: isActive ? `block` : `none` }}
      >
        {viewMoreActive ? `SHOW LESS` : `SHOW ALL`}
        <i className="material-icons view-more-icon">
          {viewMoreActive ? `keyboard_arrow_up` : `keyboard_arrow_down`}
        </i>
      </button>
    ) : null;
  };

  const renderFacetToggleIcon = isActive => {
    return (
      <i
        role="button"
        aria-label={isActive ? "Collapse" : "Expand"}
        aria-expanded={isActive}
        className="material-icons view-more-icon"
      >
        {isActive ? `keyboard_arrow_up` : `keyboard_arrow_down`}
      </i>
    );
  };

  const renderPickUpLocation = () => {
    if (facetsState[2] && facetsState[2].Other) {
      let pickUpLocationFacet = facetsState[2].Other.find(
        other => other.name === "PIckup_Locations"
      );

      let index = facetsState[2].Other.findIndex(
        other => other.name === "PIckup_Locations"
      );

      if (pickUpLocationFacet) {
        let other = pickUpLocationFacet;
        return (
          <OtherFacetsNewBDCollectionsStore
            {...{
              other,
              index,
              renderViewMoreButton,
              handleFacet,
              translate,
              handleFacetTitleClick,
              renderFacetToggleIcon,
              activeFacetTitles,
              activeShowMoreFacets,
              buttonsState,
              facetImageGenerator
            }}
          />
        );
      }
    } else {
      return null;
    }
  };
  if (!loadingState && buttonsState && buttonsState.Price) {
    let numberOfReviewsFacetWithCountMoreThanZero =
      facetsState[1] && facetsState[1].Reviews.filter(f => f.count > 0).length;

    let activeFacetTitlesIncludesPriceTitle = activeFacetTitles.some(
      t => t === "PRICE"
    );

    let activeFacetTitleIncludesReviewsTitle = activeFacetTitles.some(
      t => t === "REVIEW"
    );

    return (
      <React.Fragment>
        <div
          className={
            showMoreOptions
              ? `col s12 m12 l12  more-options`
              : `col s12 m12 l12 `
          }
        >
          <h3 className="collectionFacetsTitle">Browse By Categories</h3>
          {facetsState[2] &&
            facetsState[2].Other.map((other, index) => {            
              if (other.name === "Collection") {
                return (
                  <OtherFacetsNewBDCollectionsStore
                    key={other.name}
                    {...{
                      other,
                      index,
                      renderViewMoreButton,
                      handleFacet,
                      translate,
                      handleFacetTitleClick,
                      renderFacetToggleIcon,
                      activeFacetTitles,
                      activeShowMoreFacets,
                      buttonsState,
                      facetImageGenerator
                    }}
                  />
                );
              }

              else return null;

            })}
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <div className="col s12 m12 l12 facetsContent">
        <div className="facetTitleWrapper" style={{ minHeight: "300px" }}></div>
      </div>
    );
  }
}
