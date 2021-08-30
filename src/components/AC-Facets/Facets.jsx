import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  handleFacetFilterParams,
  checkButtonsAction,
  updateFacetButtonsForGroupedFacets,
  handleSetFacetBread
} from "../../redux/actions/facetActions";

import ReviewStarMaker from "../../functions/ReviewStarMaker.jsx";
import { facetImageGenerator } from "../../functions/facetImageGenerator.js";

import { I18nContext } from "../../i18n/index";
import OtherFacets from "./OtherFacets";
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
        className="material-icons"
      >{isActive ? "keyboard_arrow_up" : "keyboard_arrow_down"}</i>
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
          <OtherFacets
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
      facetsState[1] &&
      facetsState[1].Reviews &&
      facetsState[1].Reviews.filter(f => f.count > 0).length;

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
              ? `col s12 m12 l12 facetsContent more-options`
              : `col s12 m12 l12 facetsContent`
          }
        >
          {renderPickUpLocation()}

          <div
            className="facetTitleWrapper"
            style={{ display: props.renderedBy === "stores" ? "none" : "" }}
          >
            {Object.keys(buttonsState.Price).length > 0 ? (
              <h1
                data-facettitle="PRICE"
                onClick={e =>
                  handleFacetTitleClick(
                    e,
                    "PRICE",
                    activeFacetTitlesIncludesPriceTitle
                  )
                }
                className={
                  Object.values(buttonsState.Price).some(k => k === false)
                    ? "facet-has-checked-option facetTitle"
                    : "facetTitle"
                }
              >
                {translate("Price").toUpperCase()}
                {renderFacetToggleIcon(activeFacetTitlesIncludesPriceTitle)}
              </h1>
            ) : null}
            <div
              aria-expanded={activeFacetTitlesIncludesPriceTitle}
              className={
                activeFacetTitlesIncludesPriceTitle
                  ? "facetFilterWrapper scroll-bar-thin-style active"
                  : "facetFilterWrapper scroll-bar-thin-style"
              }
            >
              <div
                className={
                  activeFacetTitlesIncludesPriceTitle
                    ? "priceFacet open"
                    : "priceFacet"
                }
              >
                {facetsState &&
                  facetsState[0] &&
                  facetsState[0].Price &&
                  facetsState[0].Price.map(({ text, count, value }, index) => {
                    if (count > 0) {
                      return (
                        <div key={`${value}-${index}`} className="facetFilterContent">
                          <div
                            onClick={() =>
                              handleFacet(
                                value,
                                index,
                                "Price",
                                buttonsState.Price[index],
                                { ["Price"]: text }
                              )
                            }
                            key={`${value}-${index}`}
                            name={value}
                            style={
                              count > 0
                                ? { opacity: "1", cursor: "pointer" }
                                : { opacity: "0.6", cursor: "not-allowed" }
                            }
                          >
                            <label
                              className={
                                buttonsState.Price[index]
                                  ? "checkmark-box"
                                  : "checkmark-box checked"
                              }
                            ></label>

                            <span className="productText">{text}</span>
                            <span className="productCount">({count})</span>
                          </div>
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
          </div>
          {numberOfReviewsFacetWithCountMoreThanZero > 0 ? (
            <div className="facetTitleWrapper">
              {Object.keys(buttonsState.Reviews).length > 0 ? (
                <h1
                  data-facettitle="REVIEW"
                  onClick={e =>
                    handleFacetTitleClick(
                      e,
                      "REVIEW",
                      activeFacetTitleIncludesReviewsTitle
                    )
                  }
                  className={
                    Object.values(buttonsState.Reviews).some(k => k === false)
                      ? "facet-has-checked-option facetTitle"
                      : "facetTitle"
                  }
                >
                  {translate("js.item.reviews").toUpperCase()}
                  {renderFacetToggleIcon(activeFacetTitleIncludesReviewsTitle)}
                </h1>
              ) : null}
              <div
                aria-expanded={activeFacetTitleIncludesReviewsTitle}
                className={
                  activeFacetTitleIncludesReviewsTitle
                    ? "facetFilterWrapper scroll-bar-thin-style active"
                    : "facetFilterWrapper scroll-bar-thin-style"
                }
              >
                <div
                  className={
                    activeFacetTitleIncludesReviewsTitle
                      ? "priceFacet open"
                      : "priceFacet"
                  }
                >
                  {facetsState[1].Reviews.map(
                    ({ text, count, value }, index) => {
                      if (count > 0) {
                        return (
                          <div key={`${value}-${index}`} className="facetFilterContent">
                            <div
                              onClick={() =>
                                handleFacet(
                                  value,
                                  index,
                                  "Reviews",
                                  buttonsState.Reviews[index],
                                  { ["Review"]: text }
                                )
                              }
                              key={`${value}-${index}`}
                              name={value}
                              style={
                                count > 0
                                  ? { opacity: "1", cursor: "pointer" }
                                  : { opacity: "0.6", cursor: "not-allowed" }
                              }
                            >
                              <label
                                className={
                                  buttonsState.Reviews[index]
                                    ? "checkmark-box"
                                    : "checkmark-box checked"
                                }
                              ></label>

                              <ReviewStarMaker
                                className="productText"
                                text={text}
                                item={false}
                              />
                              <span className="productCount">({count})</span>
                            </div>
                          </div>
                        );
                      }
                    }
                  )}
                </div>
              </div>
            </div>
          ) : null}

          {facetsState &&
            facetsState[2] &&
            facetsState[2].Other &&
            facetsState[2].Other.map((other, index) => {
              if (
                location.pathname.includes("stores/") &&
                other.name === "Sellers"
              ) {
                return; // Don't render sellers facet if we are in the store page
              }
              // PIckup_Locations will be rendered at top
              if (other.name === "PIckup_Locations") return;

              return (
                <OtherFacets
                  key={`${other.name}-${index}`}
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
