import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  handleFacetFilterParams,
  checkButtonsAction,
  updateFacetButtonsForGroupedFacets,
  handleSetFacetBread
} from "../../redux/actions/facetActions";
import { useLocation } from "@reach/router";

import ReviewStarMaker from "../../functions/ReviewStarMaker.jsx";
import { facetImageGenerator } from "../../functions/facetImageGenerator.js";

import { I18nContext } from "../../i18n/index";

export default function Facets(props) {
  const location = useLocation();

  const { translate } = React.useContext(I18nContext);
  const dispatch = useDispatch();

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

  const [activeFacetTitles, setActiveFacetTitles] = useState(["PRICE"]);
  const [activeShowMoreFacets, setActiveShowMoreFaces] = useState([]);
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const handleFacet = (value, index, name, buttonState, facetTitleAndText) => {
    let bread = [value, name, !buttonState, facetTitleAndText, index];
    dispatch(checkButtonsAction(index, name, buttonState));
    dispatch(handleSetFacetBread(bread));
    dispatch(
      handleFacetFilterParams(value, name, buttonState, filterUrlState, index)
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
        {viewMoreActive
          ? translate(`facet.LessButton`)
          : translate(`facet.MoreButton`)}
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
        aria-expanded={isActive}
        className={`icon-${isActive ? "minus" : "plus"} facet-toggle-icon`}
      ></i>
    );
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
              ? "col s12 m12 l12 facetsContent more-options"
              : "col s12 m12 l12 facetsContent"
          }
        >
          <div className="facetTitleWrapper">
            {Object.keys(buttonsState.Price).length > 0 ? (
              <h4
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
                {translate("Price")}
                {renderFacetToggleIcon(activeFacetTitlesIncludesPriceTitle)}
              </h4>
            ) : null}
            <div
              aria-expanded={activeFacetTitlesIncludesPriceTitle}
              className={
                activeFacetTitlesIncludesPriceTitle
                  ? "facetFilterWrapper scroll-bar-thin-style active"
                  : "facetFilterWrapper scroll-bar-thin-style"
              }
            >
              <ul
                className={
                  activeFacetTitlesIncludesPriceTitle
                    ? "priceFacet open"
                    : "priceFacet"
                }
              >
                {facetsState[0].Price.map(({ text, count, value }, index) => {
                  if (count > 0) {
                    return (
                      <div key={value} className="facetFilterContent">
                        <li
                          onClick={() =>
                            handleFacet(
                              value,
                              index,
                              "Price",
                              buttonsState.Price[index],
                              { ["Price"]: text }
                            )
                          }
                          key={value}
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
                        </li>
                      </div>
                    );
                  }
                })}
              </ul>
            </div>
          </div>
          {numberOfReviewsFacetWithCountMoreThanZero > 0 ? (
            <div className="facetTitleWrapper">
              {Object.keys(buttonsState.Reviews).length > 0 ? (
                <h4
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
                  {translate("js.item.reviews")}
                  {renderFacetToggleIcon(activeFacetTitleIncludesReviewsTitle)}
                </h4>
              ) : null}
              <div
                aria-expanded={activeFacetTitleIncludesReviewsTitle}
                className={
                  activeFacetTitleIncludesReviewsTitle
                    ? "facetFilterWrapper scroll-bar-thin-style active"
                    : "facetFilterWrapper scroll-bar-thin-style"
                }
              >
                <ul
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
                          <div key={value} className="facetFilterContent">
                            <li
                              onClick={() =>
                                handleFacet(
                                  value,
                                  index,
                                  "Reviews",
                                  buttonsState.Reviews[index],
                                  { ["Review"]: text }
                                )
                              }
                              key={value}
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
                            </li>
                          </div>
                        );
                      }
                    }
                  )}
                </ul>
              </div>
            </div>
          ) : null}

          {facetsState[2] &&
            facetsState[2].Other.map((other, index) => {
              if (
                location.pathname.includes("stores/") &&
                other.name === "Sellers"
              ) {
                return; // Don't render sellers facet if we are in the store page
              }
              let name = other.name;
              let facetTitle = other.title
                .replace("ic_", "")
                .replace(/[_]/g, " ")
                .trim();

              if (facetTitle === "Sellers") {
                facetTitle = translate("Stores");
              }
              let numberOfFacetsValuesWithCountMoreThanZero = other.facetValues.filter(
                f => f.count > 0
              ).length;

              let isActive = activeFacetTitles.some(t => t === name);

              let isViewMoreActive = activeShowMoreFacets.some(t => t === name);
              if (numberOfFacetsValuesWithCountMoreThanZero > 0) {
                return (
                  <div key={index} className="facetTitleWrapper">
                    {Object.keys(buttonsState[name]).length > 0 ? (
                      <h4
                        role="button"
                        aria-expanded={isActive}
                        data-facettitle={other.name}
                        onClick={e =>
                          handleFacetTitleClick(e, other.name, isActive)
                        }
                        className={
                          Object.values(buttonsState[name]).some(
                            k => k === false
                          )
                            ? "facet-has-checked-option facetTitle"
                            : "facetTitle"
                        }
                      >
                        {facetTitle.replace("ic ", "")}
                        {renderFacetToggleIcon(isActive)}
                      </h4>
                    ) : null}

                    <div
                      aria-expanded={isActive}
                      className={`${
                        isActive
                          ? "facetFilterWrapper scroll-bar-thin-style active"
                          : "facetFilterWrapper scroll-bar-thin-style"
                      } ${isViewMoreActive ? "view-more-active" : ""}`}
                    >
                      <ul
                        className={isActive ? "priceFacet open" : "priceFacet"}
                      >
                        {other.facetValues.map((subother, index) => {
                          if (subother.count > 0) {
                            return (
                              <div
                                key={subother.value}
                                className="facetFilterContent"
                              >
                                <li
                                  onClick={() =>
                                    handleFacet(
                                      subother.value,
                                      index,
                                      name,
                                      buttonsState[name][index],
                                      { [facetTitle]: subother.text }
                                    )
                                  }
                                  key={subother.value}
                                  name={subother.value}
                                  style={
                                    subother.count > 0
                                      ? { opacity: "1", cursor: "pointer" }
                                      : {
                                          opacity: "0.6",
                                          cursor: "not-allowed"
                                        }
                                  }
                                >
                                  <label
                                    className={
                                      buttonsState[name][index]
                                        ? "checkmark-box"
                                        : "checkmark-box checked"
                                    }
                                  ></label>

                                  {
                                    // renders an Image if there is any for specific facets like FINISH facet
                                    facetImageGenerator(
                                      facetTitle,
                                      subother.text
                                    )
                                  }
                                  <span className="productText">
                                    {subother.text}
                                  </span>
                                  <span className="productCount">
                                    ({subother.count})
                                  </span>
                                </li>
                              </div>
                            );
                          }
                        })}
                      </ul>
                    </div>

                    <div
                      className={`view-more-button-wrapper ${
                        isViewMoreActive ? "view-more-active" : ""
                      }`}
                    >
                      {renderViewMoreButton(
                        numberOfFacetsValuesWithCountMoreThanZero,
                        isActive,
                        isViewMoreActive,
                        other.name
                      )}
                    </div>
                  </div>
                );
              }
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
