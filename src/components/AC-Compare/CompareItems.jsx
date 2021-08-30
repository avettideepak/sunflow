import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Link } from "gatsby";
import LazyLoad from "react-lazyload";
import { PROJECT_LINK } from "../../project-config";
import { replaceComparedItemsDetails } from "../../redux/actions/compareActions.js";
import htmlDecoder from "../../functions/htmldecoder.js";
import { I18nContext } from "../../i18n/index";
import "./styles/CompareItems.css";
import { FormattedNumber } from "react-intl";
import { navigate } from "@reach/router";
import { handleReplaceImagesWithLargeImagesOnError } from "../../functions/Utilities";

const COMPARE_STORAGE_NAME = "compareList";
const MIN_WIDTH_OF_CELL = 160;

const CompareItems = () => {
  const { translate, priceConvert, currency } = React.useContext(I18nContext);
  const dispatch = useDispatch();
  const compareListState = useSelector(
    state => state.compareListReducer.compareList
  );

  const comparedItemsDetailsState = useSelector(
    state => state.compareListReducer.comparedItemsDetails,
    shallowEqual
  );

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  const [
    highlightDifferencesCheckedState,
    setHighlightDifferencesCheckedState
  ] = useState(false);

  const [
    filteredItemsDetailsProperties,
    setFilteredItemsDetailsProperties
  ] = useState([]);

  const [
    sortedCombinedDataHeadersState,
    setSortedCombinedDataHeadersState
  ] = useState([]);

  const purgeCompareLocalStorage = () => {
    if (typeof localStorage !== undefined) {
      localStorage.setItem(
        COMPARE_STORAGE_NAME,
        JSON.stringify(compareListState)
      );
    }
  };

  useEffect(() => {
    if (compareListState) {
      let compareListStateIds = compareListState.map(item => item.id);
      let tempComparedItemsDetails = comparedItemsDetailsState.filter(item => {
        if (item && item.itemId)
          return compareListStateIds.includes(String(item.itemId));
        else {
          purgeCompareLocalStorage();

          let alertText = translate("compareItems.errorText");
          alert(alertText);
          return false;
        }
      });

      console.info(
        "tempComparedItemsDetails",
        compareListStateIds,
        comparedItemsDetailsState
      );

      if (tempComparedItemsDetails != comparedItemsDetailsState) {
        dispatch(replaceComparedItemsDetails(tempComparedItemsDetails));
      }
    }
  }, [compareListState]);

  useEffect(() => {
    if (compareListState) {
      let compareListStateIds = compareListState.map(item => item.id);

      let comparedItemsDetailsIds = comparedItemsDetailsState.map(
        item => item.itemId
      );

      let filteredItemsDetailsIds = comparedItemsDetailsIds.filter(itemId => {
        for (let id of compareListStateIds) {
          if (itemId == id) return true;
        }
        return false;
      });

      // Checking if comparedItemsDetailsState matches to items that are being compared at the moment actually.
      // This is to bypass the issue where if a user toggles items fast they are deleted from the compared items details but they come back due to fetching of item details takes longer than deleting them.
      let filtereditemsDetailsState = comparedItemsDetailsState.filter(item =>
        filteredItemsDetailsIds.includes(item.itemId)
      );

      let comparedItemsProperties = [];

      for (let item of filtereditemsDetailsState) {
        comparedItemsProperties = [
          ...comparedItemsProperties,
          { [item.itemId]: item.properties }
        ];
      }

      for (let obj of comparedItemsProperties) {
        let objKey = Object.keys(obj);

        let tempPropItems = [];

        obj[objKey].forEach(property => {
          tempPropItems[property.propnumber] = property;
        });

        obj[objKey] = tempPropItems;
      }

      console.info("filteredItemsDetailsProperties", comparedItemsProperties);

      setFilteredItemsDetailsProperties(comparedItemsProperties);
    }
  }, [comparedItemsDetailsState]);

  useEffect(() => {
    createDataHeaders();
  }, [filteredItemsDetailsProperties]);

  const createDataHeaders = () => {
    let dataHeadersArray = [];

    filteredItemsDetailsProperties.forEach(item => {
      let itemId = Object.keys(item);
      let tempHeadersArray = [];
      let count = 0;
      item[itemId].forEach((property, index) => {
        //console.info("prop", property.propnumber);
        let dataHeaderKeys = dataHeadersArray.map(i => i.key);

        // if it is a unique prop
        if (!dataHeaderKeys.includes(String(property.propnumber))) {
          tempHeadersArray[count++] = (
            <div
              key={property.propnumber}
              sort={index}
              className="compare-table-data-header"
            >
              {property.propdesc}
            </div>
          );
        }
      });
      dataHeadersArray.push(...tempHeadersArray);
    });
    let combinedDataHeaders = [...dataHeadersArray];
    let sortedCombinedDataHeaders = combinedDataHeaders.sort(
      (a, b) => a.props.sort - b.props.sort
    );
    setSortedCombinedDataHeadersState(sortedCombinedDataHeaders);
  };

  const renderDataRows = () => {
    let dataCells = [];

    let generateDataCell = data => (
      <div className="compare-table-data-cell">
        <div className="stock-status -in-stock">{data}</div>
      </div>
    );

    let dataRows = sortedCombinedDataHeadersState.map(
      (dataHeader, dataHeaderIndex) => {
        dataCells = [];
        let dataCellsPropsValues = [];

        let highlightedClass = "";

        filteredItemsDetailsProperties.forEach((obj, index) => {
          let itemId = Object.keys(obj);
          let dataHeaderPropNumber = dataHeader.key;

          if (obj[itemId][dataHeaderPropNumber]) {
            let propValue = obj[itemId][dataHeaderPropNumber].propvalue;
            dataCellsPropsValues.push(propValue);
            dataCells.push(generateDataCell(propValue));
          } else {
            dataCellsPropsValues.push(`-`);
            dataCells.push(generateDataCell(``));
          }
        });

        if (highlightDifferencesCheckedState) {
          for (let dataCellPropValue of dataCellsPropsValues) {
            if (dataCellPropValue == "-") {
              highlightedClass = " not-highlighted";
              break;
            } else if (dataCellPropValue === dataCellsPropsValues[0]) {
              highlightedClass = " not-highlighted";
            } else {
              highlightedClass = " highlighted";
            }
          }
        }

        return (
          <div
            style={{
              minWidth: isMobileState
                ? `${MIN_WIDTH_OF_CELL * (compareListState.length + 1)}px`
                : ""
            }}
            className={`compare-table-data-row main-features-row${highlightedClass}`}
          >
            {dataHeader}

            {dataCells}
          </div>
        );
      }
    );
    // console.info("dataRows", dataRows);

    return dataRows;
  };

  const renderMainFeatures = () => {
    return (
      <React.Fragment>
        <div id="mainFeatures" className="main-features">
          {renderHiglightDifferencesCheckBox()}
          {renderDataRows()}
        </div>
      </React.Fragment>
    );
  };

  const renderHiglightDifferencesCheckBox = () => {
    return (
      <div
        className="highlight-differences-container"
        style={{
          minWidth: isMobileState
            ? `${MIN_WIDTH_OF_CELL * (compareListState.length + 1)}px`
            : ""
        }}
      >
        <div
          className="no-select highlight-differences-wrapper"
          onClick={() =>
            setHighlightDifferencesCheckedState(
              !highlightDifferencesCheckedState
            )
          }
        >
          <label
            className={
              highlightDifferencesCheckedState
                ? "checkmark-box checked"
                : "checkmark-box"
            }
          ></label>
          <span className="highlight-differences-text">
            {translate("compItems.highlightDifferences")}
          </span>
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      <span
        className="compare-items-go-back-button"
        onClick={() => {
          navigate(-1);
        }}
      >{`${translate("compItems.goBackButton")}`}</span>
      <div className="all-compare-items">
        <h1 className="compare-page-title">{translate("compItems.header")}</h1>
        <div className="compare-items-bar">
          <div className="compare-items-container"></div>
          {compareListState &&
            compareListState.map(item => {
              return (
                <React.Fragment>
                  <div id={item.id} className="compare-items-container">
                    <div className="product-description">
                      <div className="compare-items-img-wrapper">
                        <LazyLoad height={250} fadein={true} offset={100}>
                          <img
                            className="compare-items--img"
                            src={`${item.image}`}
                            alt={`${item.title} Image`}
                            onError={handleReplaceImagesWithLargeImagesOnError}
                          />
                        </LazyLoad>
                      </div>

                      <h2
                        className="product-desc-text"
                        dangerouslySetInnerHTML={{
                          __html: htmlDecoder(item.title)
                        }}
                      ></h2>
                    </div>
                    <div className="result-price">
                      {/* <div className="reviews">Reviews1</div> */}
                      <div className="price-type-price">
                        <FormattedNumber
                          value={
                            Number(
                              Number(
                                item.price.value.integer
                                  .replace("$", "")
                                  .replace(",", "")
                              ) +
                                "." +
                                item.price.value.decimal
                            ) / priceConvert
                          }
                          style="currency"
                          currency={currency}
                        />
                      </div>
                      <div className="view-details-row">
                        <div className="view-details-button">
                          <Link to={item.url.replace("product", "")}>
                            {translate("compItems.viewDetails")}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
        </div>
        {compareListState && compareListState.length > 0
          ? renderMainFeatures()
          : null}
      </div>
    </React.Fragment>
  );
};

export default CompareItems;
