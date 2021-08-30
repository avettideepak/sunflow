import React, { useEffect, useContext } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import {
  backToCategory,
  fetchCategoryFromDirectUrl
} from "../../redux/actions/categoryActions";
import GoogleLocationBox from "./GoogleLocationBox";
import Modal from "@material-ui/core/Modal";
import { I18nContext } from "../../i18n";
import Async from "react-code-splitting";

import { setGeoLocationState } from "../../redux/actions/geoLocationActions.js";

import classes from "./Styles/LocationBar.module.css";
import DialogContent from "@material-ui/core/DialogContent";
import { navigate, useLocation } from "@reach/router";

const GeolocationPermission = () => (
  <Async
    load={import(
      "../../components/AC-Notifications/GeolocationPermission/GeolocationPermission"
    )}
  />
);

const GoBack = () => <Async load={import("../AC-GoBack/GoBack")} />;

const LocationBar = () => {
  const {
    langCode,
    translate,
    locationBar: open,
    dispatchContext
  } = useContext(I18nContext);
  const dispatch = useDispatch();
  const location = useLocation();
  const handleOpen = () => {
    dispatchContext({ type: "changeLocationBar", payload: true });
  };

  const handleClose = () => {
    dispatchContext({ type: "changeLocationBar", payload: false });
  };

  const geoLocationState = useSelector(
    state => state.geoLocationReducer.geoLocation,
    shallowEqual
  );

  const userInfoState = useSelector(
    state => state.loginReducer.userInfo,
    shallowEqual
  );
  const userLocationState = useSelector(
    state => state.userLocationReducer,
    shallowEqual
  );

  const distanceState = useSelector(
    state => state.categoryReducer.distance,
    shallowEqual
  );

  const backToCategoryFromProductState = useSelector(
    state => state.categoryReducer.backToCategoryFromProductPage,
    shallowEqual
  );
  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );
  const breadcrumbsState = useSelector(
    state => state.productReducer.productInitial.breadcrumbs,
    shallowEqual
  );

  const geolocationRequestState = useSelector(
    state => state.handlersReducer.geolocationRequest,
    shallowEqual
  );

  const back = true;

  useEffect(() => {
    let geoLocation = undefined; /* window.getCookie("SSIDL"); */
    geoLocation && dispatch(setGeoLocationState(geoLocation));
  }, []);

  useEffect(() => {
    if (
      (geoLocationState && geoLocationState.lat,
      geoLocationState.long && !geoLocationState.initial) &&
      !location.href.includes("ain")
    ) {
      localStorage.setItem(
        "userLocationGoogleAPI",
        JSON.stringify(geoLocationState)
      );
      // If user entered value, store in seprate localStorage key so that we can go back to this value
      if (geoLocationState && geoLocationState.userInput) {
        localStorage.setItem(
          "userLocationUserInputBackup",
          JSON.stringify(geoLocationState)
        );
      }

      dispatch(fetchCategoryFromDirectUrl());
    }
  }, [geoLocationState]);

  const renderProvince = () => {
    return userLocationState.state != userLocationState.city
      ? userLocationState.state
      : userLocationState.country;
  };

  const renderLocationBarText = () => {
    return (
      <div
        className={classes.location}
        onClick={() => {
          if (isMobileState) handleOpen();
        }}
      >
        {distanceState !== null &&
        userLocationState.lat &&
        userLocationState.lng ? (
          <React.Fragment>
            <span className={classes.locationText}>
              {`${isMobileState ? "" : translate("Showing")}` +
                ` ${translate("Sellers Within")}` +
                ` ${distanceState} KM ` +
                translate("of") +
                ` -${
                  userLocationState.postal ? ` ${userLocationState.postal}` : ""
                }`}
            </span>
            &nbsp;
            <span className={classes.city}>{userLocationState.city}</span>
          </React.Fragment>
        ) : (
          <span className={classes.locationText}>
            {translate("Showing All Sellers")}
          </span>
        )}
      </div>
    );
  };

  return (
    <div id="locationGrid" className={classes.container}>
      {geolocationRequestState && <GeolocationPermission />}

      <div className={classes.wrapper}>
        {isMobileState ? (
          <span
            onClick={handleOpen}
            className="material-icons"
            style={{
              color: "#555",
              marginRight: "8px"
            }}
          >
            location_on
          </span>
        ) : null}
        {renderLocationBarText()}
        {isMobileState ? (
          <div
            id="locationChangeBtn"
            style={{
              marginTop: "4px"
            }}
            onClick={handleOpen}
          >
            <i className="material-icons">keyboard_arrow_down</i>
          </div>
        ) : (
          <div
            id="locationChangeBtn"
            className={classes.locationChangeBtn}
            onClick={handleOpen}
          >
            <span className="material-icons">location_on</span>{" "}
            {translate("Change")}
          </div>
        )}
      </div>
      <Modal
        className={classes.geoLocationModal}
        aria-labelledby="geolocation-modal"
        aria-describedby="google-geolocation-form"
        open={open}
        onClose={handleClose}
        onEscapeKeyDown={handleClose}
      >
        <DialogContent className="locationbox-wrapper">
          <GoogleLocationBox close={handleClose} />
        </DialogContent>
      </Modal>
      <GoBack />
    </div>
  );
};

export default LocationBar;
