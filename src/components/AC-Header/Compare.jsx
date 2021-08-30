/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React, { useState, useEffect, useContext, useRef } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { PREVIEW } from "@/project-config.js";

import {
  deleteCompareItem,
  clearCompareItems,
  replaceCompareItems,
  replaceComparedItemsDetails
} from "@/redux/actions/compareActions.js";
import { I18nContext } from "@/i18n/index";
import "./Styles/Compare.css";
import { FormattedNumber } from "react-intl";
import {
  usePrevious,
  runAfterSomeTime,
  handleReplaceImagesWithLargeImagesOnError
} from "@/functions/Utilities";
import { htmlDecode } from "@/functions/htmldecoder.js";
import { navigate } from "gatsby";

export default function Compare() {
  const dispatch = useDispatch();

  const { translate, currency, langCode, priceConvert } = useContext(
    I18nContext
  );

  const [collapsed, setCollapsed] = useState(true);
  const COMPARE_COLLAPSE_STATE_KEY = "compareCollapseState";
  const COMPARE_STORAGE_NAME = "compareList";
  const COMPARE_ITEM_DETAILS_STORAGE_NAME = "compareItemDetails";

  const compareListState = useSelector(
    state => state.compareListReducer.compareList,
    shallowEqual
  );

  const previousCompareListState = usePrevious(compareListState);

  const comparedItemsDetailsState = useSelector(
    state => state.compareListReducer.comparedItemsDetails,
    shallowEqual
  );

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  //collapse state storage
  useEffect(() => {
    if (typeof localStorage !== undefined) {
      let storedCompareCollapseString = localStorage.getItem(
        COMPARE_COLLAPSE_STATE_KEY
      );
      let storedCompareCollapseBool = storedCompareCollapseString === "true";

      if (storedCompareCollapseBool) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof localStorage !== undefined) {
      localStorage.setItem(
        COMPARE_COLLAPSE_STATE_KEY,
        JSON.stringify(collapsed)
      );
    }
  }, [collapsed]);

  //collapse state storage ends

  useEffect(() => {
    // get compared items list from localstorage
    if (typeof localStorage !== undefined) {
      let storedCompareListString = localStorage.getItem(COMPARE_STORAGE_NAME);
      let storedCompareListObject = JSON.parse(storedCompareListString);

      if (
        storedCompareListObject != null &&
        storedCompareListObject != undefined
      ) {
        dispatch(replaceCompareItems(storedCompareListObject));
      }

      // get compared items details from localstorage
      let storedComparedItemsDetailsString = localStorage.getItem(
        COMPARE_ITEM_DETAILS_STORAGE_NAME
      );
      let storedComparedItemsDetailsObject = JSON.parse(
        storedComparedItemsDetailsString
      );
      if (
        storedComparedItemsDetailsString != null &&
        storedComparedItemsDetailsString != undefined
      ) {
        dispatch(replaceComparedItemsDetails(storedComparedItemsDetailsObject));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof localStorage !== undefined) {
      console.info(
        "compareListState",
        compareListState,
        compareListState && compareListState.length
      );

      if (compareListState) {
        localStorage.setItem(
          COMPARE_STORAGE_NAME,
          JSON.stringify(compareListState)
        );
      }

      if (
        previousCompareListState &&
        previousCompareListState.length === 0 &&
        compareListState &&
        compareListState.length > 0
      ) {
        setCollapsed(false);
        runAfterSomeTime(() => setCollapsed(true), 2000);
      }

      if (
        previousCompareListState &&
        previousCompareListState.length > 0 &&
        collapsed &&
        previousCompareListState.length < compareListState.length
      ) {
        setCollapsed(false);
      }
    }
  }, [compareListState]);

  useEffect(() => {
    if (typeof localStorage !== undefined) {
      if (comparedItemsDetailsState) {
        localStorage.setItem(
          COMPARE_ITEM_DETAILS_STORAGE_NAME,
          JSON.stringify(comparedItemsDetailsState)
        );
      }
    }
  }, [comparedItemsDetailsState]);

  const handleRemoveIconClick = id => {
    dispatch(deleteCompareItem(id));
  };

  const renderRemoveIcon = id => {
    return (
      <i
        className="no-select material-icons compare-remove-icon"
        onClick={() => handleRemoveIconClick(id)}
      >
        close
      </i>
    );
  };

  const handleCompareItemsClicked = () => {
    navigate(`/compare-items`);

    setCollapsed(true);
  };

  const handleClearCompareItemsButtonClicked = () => {
    dispatch(clearCompareItems());
  };

  return compareListState && compareListState.length > 0 ? (
    <div
      className={`no-select compare-container${collapsed ? `` : ` expanded`}${
        isMobileState ? ` mobile` : ``
      }`}
      aria-expanded={!collapsed}
    >
      <div
        className="compare-collapse-button"
        onClick={() => setCollapsed(!collapsed)}
      >
        <i className="material-icons">
          {collapsed ? `arrow_drop_up` : `arrow_drop_down`}
        </i>
        <span> {translate("compare.compare_title")}</span>
      </div>
      <div
        className={`compare-items-wrapper${collapsed ? `` : ` expanded`}`}
        aria-expanded={!collapsed}
      >
        {[1, 2, 3, 4].map((v, i) => {
          if (compareListState && compareListState[i]) {
            let item = compareListState[i];
            return (
              <div key={i} className="compare-item-container">
                <div className="compare-item-wrapper" key={item.id}>
                  {renderRemoveIcon(item.id)}
                  <div className="compare-item-image-wrapper">
                    <img
                      src={item.image}
                      alt={item.title}
                      onError={handleReplaceImagesWithLargeImagesOnError}
                    />
                  </div>
                  <div className="compare-item-info-wrapper">
                    <div className="compare-item-price-wrapper">
                      <span className="compare-item-price">
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
                        {/*     {`${item.currency_sign}${item.price.value.integer}.${item.price.value.decimal}`} */}
                      </span>
                    </div>
                    <div
                      className="compare-item-title"
                      dangerouslySetInnerHTML={{
                        __html: htmlDecode(item.title)
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div key={i} className="compare-item-container">
                <div
                  className="compare-item-wrapper"
                  key={i}
                  style={{
                    backgroundColor: i === 1 ? "rgb(47 167 73 / 60%)" : "",
                    display: isMobileState && i !== 1 ? "none" : ""
                  }}
                >
                  {i === 1 ? (
                    <span style={{ padding: "10px", textAlign: "center" }}>
                      {translate("compare.compare_more")}
                    </span>
                  ) : null}
                </div>
              </div>
            );
          }
        })}
        <div
          className="compare-items-actions"
          style={{
            display: isMobileState && compareListState.length < 2 ? "none" : ""
          }}
        >
          <button
            onClick={() => handleCompareItemsClicked()}
            className="compare-items-compare-button"
            disabled={compareListState.length < 2}
          >
            {translate("compare.compare_title")}
          </button>
          <button
            onClick={() => handleClearCompareItemsButtonClicked()}
            className="compare-items-clear-button"
            disabled={compareListState.length < 2}
          >
            {translate("compare.compare_clear")}
          </button>
        </div>
      </div>
    </div>
  ) : null;
}

export const toggleCompare = (
  id,
  title,
  currency_sign,
  image,
  price,
  url,
  compareListState,
  itemInComparedList,
  dispatch,
  deleteCompareItem,
  toggleCompareAction,
  translate
) => {
  //event.preventDefault();

  if (compareListState && compareListState.length >= 4) {
    if (itemInComparedList) {
      dispatch(deleteCompareItem(id));
    } else {
      let alertMessage = translate("compare.compare_not_more");
      alert(alertMessage);
    }
  } else {
    dispatch(toggleCompareAction(id, title, currency_sign, image, price, url));
  }
};
