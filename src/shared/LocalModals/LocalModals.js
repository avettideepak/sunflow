/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import { useLocation, navigate } from "@reach/router";
import React from "react";
import { useSelector, shallowEqual } from "react-redux";

const LocalModals = ({
  setHandleClose,
  handleShowLocale,
  handleOpenLocationBar,
  shippingTypeState,
  range,
  url
}) => {
  const location = useLocation();

  const SHOW_LOCAL_SELLERS_OR_PRODUCTS_TEXT = location.href.includes("stores")
    ? "Show Local Sellers"
    : "Show Local Products";

  const distanceState = useSelector(
    state => state.categoryReducer.distance,
    shallowEqual
  );

  const userLocState = useSelector(
    state => state.userLocationReducer,
    shallowEqual
  );

  console.info("shippingTypeState", shippingTypeState);

  switch (shippingTypeState) {
    case 6:
      return (
        <>
          <i
            className="material-icons location-box-close-icon no-select"
            onClick={setHandleClose}
          >
            close
          </i>
          Unfortunately all pickup locations for this seller are more than{" "}
          {range}km away and they do not ship to your auto-detected location at{" "}
          {Object.keys(userLocState).includes("city") &&
          Object.keys(userLocState).includes("state")
            ? `${userLocState.city}, ${userLocState.state}`
            : ""}
          . Click a button below to View This Product, Show Only Local Sellers,
          or to Change your Location or Radius.
          <div className="buttons-modal">
            <button
              className="sl-btn sl-btn-confirm"
              onClick={() => navigate(url)}
            >
              View this product
            </button>
            <button
              className="sl-btn sl-btn-confirm"
              onClick={e => handleShowLocale(e)}
            >
              {SHOW_LOCAL_SELLERS_OR_PRODUCTS_TEXT}
            </button>
            <button
              className="sl-btn sl-btn-confirm"
              onClick={e => {
                e.preventDefault();
                setHandleClose();
                handleOpenLocationBar();
              }}
            >
              Change Location or Radius
            </button>
          </div>
        </>
      );

    case 5:
      return (
        <>
          <i
            className="material-icons location-box-close-icon no-select"
            onClick={setHandleClose}
          >
            close
          </i>
          Unfortunately all pickup locations for this seller are more than{" "}
          {range}km away and they do not ship to your auto-detected location at{" "}
          {Object.keys(userLocState).includes("city") &&
          Object.keys(userLocState).includes("state")
            ? `${userLocState.city}, ${userLocState.state}`
            : ""}
          . Click a button below to View This Product, Show Only Local Sellers,
          or to Change your Location or Radius.
          <div className="buttons-modal">
            <button
              className="sl-btn sl-btn-confirm"
              onClick={() => navigate(url)}
            >
              View this product
            </button>
            <button
              className="sl-btn sl-btn-confirm"
              onClick={e => handleShowLocale(e)}
            >
              {SHOW_LOCAL_SELLERS_OR_PRODUCTS_TEXT}
            </button>
            <button
              className="sl-btn sl-btn-confirm"
              onClick={e => {
                e.preventDefault();
                setHandleClose();
                handleOpenLocationBar();
              }}
            >
              Change Location or Radius
            </button>
          </div>
        </>
      );
    case 4:
      return (
        <>
          <i
            className="material-icons location-box-close-icon no-select"
            onClick={setHandleClose}
          >
            close
          </i>
          Unfortunately all pickup locations for this seller are more than{" "}
          {range}km away and they do not ship to your auto-detected location at{" "}
          {Object.keys(userLocState).includes("city") &&
          Object.keys(userLocState).includes("state")
            ? `${userLocState.city}, ${userLocState.state}`
            : ""}
          . Click a button below to View This Product, Show Only Local Sellers,
          or to Change your Location or Radius.
          <div className="buttons-modal">
            <button
              className="sl-btn sl-btn-confirm"
              onClick={() => navigate(url)}
            >
              View this product
            </button>
            <button
              className="sl-btn sl-btn-confirm"
              onClick={e => handleShowLocale(e)}
            >
              {SHOW_LOCAL_SELLERS_OR_PRODUCTS_TEXT}
            </button>
            <button
              className="sl-btn sl-btn-confirm"
              onClick={e => {
                e.preventDefault();
                setHandleClose();
                handleOpenLocationBar();
              }}
            >
              Change Location or Radius
            </button>
          </div>
        </>
      );
    case 3:
      return (
        <>
          <i
            className="material-icons location-box-close-icon no-select"
            onClick={setHandleClose}
          >
            close
          </i>
          Unfortunately this seller does not ship to your auto-detected location
          at{" "}
          {Object.keys(userLocState).includes("city") &&
          Object.keys(userLocState).includes("state")
            ? `${userLocState.city}, ${userLocState.state}`
            : ""}
          . Click a button below to View This Product, Show Only Local Sellers,
          or to Change your Location or Radius.
          <div className="buttons-modal">
            <button
              className="sl-btn sl-btn-confirm"
              onClick={() => navigate(url)}
            >
              View this product
            </button>
            <button
              className="sl-btn sl-btn-confirm"
              onClick={e => handleShowLocale(e)}
            >
              {SHOW_LOCAL_SELLERS_OR_PRODUCTS_TEXT}
            </button>
            <button
              className="sl-btn sl-btn-confirm"
              onClick={e => {
                e.preventDefault();
                setHandleClose();
                handleOpenLocationBar();
              }}
            >
              Change Location or Radius
            </button>
          </div>
        </>
      );
      break;
    case 2:
      return (
        <>
          <i
            className="material-icons location-box-close-icon no-select"
            onClick={setHandleClose}
          >
            close
          </i>
          Unfortunately this seller does not ship to your auto-detected location
          at{" "}
          {Object.keys(userLocState).includes("city") &&
          Object.keys(userLocState).includes("state")
            ? `${userLocState.city}, ${userLocState.state}`
            : ""}
          . Click a button below to View This Product, Show Only Local Sellers,
          or to Change your Location or Radius.
          <div className="buttons-modal">
            <button
              className="sl-btn sl-btn-confirm"
              onClick={() => navigate(url)}
            >
              View this product
            </button>
            <button
              className="sl-btn sl-btn-confirm"
              onClick={e => handleShowLocale(e)}
            >
              {SHOW_LOCAL_SELLERS_OR_PRODUCTS_TEXT}
            </button>
            <button
              className="sl-btn sl-btn-confirm"
              onClick={e => {
                e.preventDefault();
                setHandleClose();
                handleOpenLocationBar();
              }}
            >
              Change Location or Radius
            </button>
          </div>
        </>
      );
      break;
    case 9:
      return (
        <React.Fragment>
          <i
            className="material-icons location-box-close-icon no-select"
            onClick={setHandleClose}
          >
            close
          </i>
          Unfortunately, we could not auto-detect your location. Click a button
          below to View This Product or to Change your Location or Radius.
          <div
            className="buttons-modal"
            style={{ padding: "40px 40px 0", justifyContent: "space-around" }}
          >
            <button
              style={{ padding: "15px" }}
              className="sl-btn sl-btn-confirm"
              onClick={() => navigate(url)}
            >
              View this product
            </button>

            <button
              style={{ padding: "15px" }}
              className="sl-btn sl-btn-confirm"
              onClick={e => {
                e.preventDefault();
                setHandleClose();
                handleOpenLocationBar();
              }}
            >
              Change Location or Radius
            </button>
          </div>
        </React.Fragment>
      );
      break;
    default:
      return (
        <>
          <i
            className="material-icons location-box-close-icon no-select"
            onClick={setHandleClose}
          >
            close
          </i>
          Unfortunately this seller does not ship to your auto-detected location
          at{" "}
          {Object.keys(userLocState).includes("city") &&
          Object.keys(userLocState).includes("state")
            ? `${userLocState.city}, ${userLocState.state}`
            : ""}
          . Click a button below to View This Product, Show Only Local Sellers,
          or to Change your Location or Radius.
          <div className="buttons-modal">
            <button
              className="sl-btn sl-btn-confirm"
              onClick={() => navigate(url)}
            >
              View this product
            </button>
            <button
              className="sl-btn sl-btn-confirm"
              onClick={e => handleShowLocale(e)}
            >
              {SHOW_LOCAL_SELLERS_OR_PRODUCTS_TEXT}
            </button>
            <button
              className="sl-btn sl-btn-confirm"
              onClick={e => {
                e.preventDefault();
                setHandleClose();
                handleOpenLocationBar();
              }}
            >
              Change Location or Radius
            </button>
          </div>
        </>
      );
      break;
  }
};

export default LocalModals;
