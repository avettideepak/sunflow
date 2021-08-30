import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Styles/custom-rc-slider.css";
import {
  setCategoryDistanceAction,
  fetchCategoryFromDirectUrl
} from "../../redux/actions/categoryActions";

import classes from "./Styles/GoogleLocationBox.module.css";
import {
  setGeoLocationState,
  brandCompareUserGeoLocation
} from "../../redux/actions/geoLocationActions";
import { usePrevious } from "../../functions/Utilities";
import { useLayoutEffect } from "react";
import { useLocation } from "@reach/router";
import { fetchUserData } from "../../redux/actions/loginActions";

const marks = {
  0: "75 KM",
  33: "200 KM",
  66: "500 KM",
  100: "Global"
};

const GoogleLocationBox = ({ close }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [prevUserInputLocation, setPrevUserInputLocation] = useState(null);
  const [otherChanged, setOtherChanged] = useState(false);
  const loadingState = useSelector(
    state => state.categoryReducer.loading,
    shallowEqual
  );

  const prevLoadingState = usePrevious(loadingState);

  const distanceState = useSelector(
    state => state.categoryReducer.distance,
    shallowEqual
  );

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

  const languageState = useSelector(
    state => state.mainReducer.lang,
    shallowEqual
  );

  useEffect(() => {
    if (
      typeof window !== undefined &&
      document.getElementById("autocompleteGoogle")
    ) {
      window.initAutocomplete();
    }
  }, []);

  useEffect(() => {
    if (typeof localStorage !== undefined) {
      const userLocationUserInputBackup = localStorage.getItem(
        "userLocationUserInputBackup"
      );
      if (userLocationUserInputBackup) {
        let userLocationUserInputBackupObj = JSON.parse(
          userLocationUserInputBackup
        );
        setPrevUserInputLocation(userLocationUserInputBackupObj);
      }
    }
  }, []);

  const mapDistanceStateToSliderValue = () => {
    if (distanceState === 75) {
      return 0;
    } else if (distanceState === 200) {
      return 33;
    } else if (distanceState === 500) {
      return 66;
    } else {
      return 100;
    }
  };

  const handleSliderChange = value => {
    const mapValueToActualKmValue = () => {
      if (value === 0) {
        return 75;
      } else if (value === 33) {
        return 200;
      } else if (value === 66) {
        return 500;
      } else {
        return null;
      }
    };

    const actualValue = mapValueToActualKmValue();
    console.info("slider value", actualValue);

    dispatch(setCategoryDistanceAction(actualValue));
    setOtherChanged(true);
  };

  const handleCancelButtonClicked = () => {
    const backDropElement = document
      .querySelector("div[aria-labelledby='geolocation-modal']")
      .querySelector("div[aria-hidden='true']");
    if (backDropElement) backDropElement.click();
  };

  const handleGeoLocationConfirmClicked = () => {
    if (typeof window !== undefined) {
      let autoCompleteInput = document.getElementById("autocompleteGoogle")
        .value;
      console.info(`clicked`, autoCompleteInput);
      if (autoCompleteInput) {
        let location = window.confirmLocation();

        if (location) {
          location.initial = false;
          location.userInput = true;
          console.info("location", location);

          dispatch(setGeoLocationState(location));

          dispatch(setCategoryDistanceAction(distanceState));
        }
      } else {
        dispatch(setCategoryDistanceAction(distanceState));
      }
      if (!loadingState && !location.href.includes("ain")) {
        dispatch(fetchCategoryFromDirectUrl());
      }
      close();
    }
  };

  const renderCurrentLocation = () => {
    return `${userLocationState.city}`;
  };

  const renderProvince = () => {
    return prevUserInputLocation.state != prevUserInputLocation.city
      ? prevUserInputLocation.state
      : prevUserInputLocation.country;
  };

  const handleAutoDetectedLocationClicked = e => {
    e.preventDefault();
    let payload = {
      city: userInfoState.city,
      state: userInfoState.regioncode,
      country: userInfoState.countryName,
      lat: userInfoState.lat,
      long: userInfoState.lng,
      postal: userInfoState.postal
    };
    let distance = distanceState || 200;
    dispatch(setCategoryDistanceAction(distance));
    if (typeof localStorage !== undefined) {
      localStorage.setItem("geoDistance", JSON.stringify(distance));
    }
    dispatch(setGeoLocationState(payload));
    if (typeof window !== undefined) {
      document.getElementById(
        "autocompleteGoogle"
      ).placeholder = `${payload.city}, ${payload.state}`;
    }
    setOtherChanged(true);
  };

  const handlePreviousUserInputLocationClicked = () => {
    let payload = { ...prevUserInputLocation };
    delete payload.userInput;
    dispatch(setGeoLocationState(payload));
  };

  const renderAutoDetectedUserLocation = () => {
    if (
      userInfoState.lat != geoLocationState.lat &&
      userInfoState.lng != geoLocationState.long
    )
      return (
        <p style={{ marginTop: "15px" }}>
          Click{" "}
          <span
            onClick={e => handleAutoDetectedLocationClicked(e)}
            style={{
              textDecoration: "underline",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            here
          </span>{" "}
          to use your auto-detected location of {userInfoState.city},{" "}
          {userInfoState.regionName}
        </p>
      );
    else {
      return (
        <p style={{ marginTop: "30px" }}>
          Click{" "}
          <span
            onClick={() => dispatch(fetchUserData("", languageState))}
            style={{
              textDecoration: "underline",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            here
          </span>{" "}
          to allow your browser to auto-detect your location.
        </p>
      );
    }
  };

  const renderPreviousUserInputLocation = () => {
    if (
      prevUserInputLocation &&
      geoLocationState.lat !== prevUserInputLocation.lat &&
      geoLocationState.long !== prevUserInputLocation.long
    ) {
      return (
        <p style={{ marginTop: "15px" }}>
          Click{" "}
          <span
            onClick={handlePreviousUserInputLocationClicked}
            style={{
              textDecoration: "underline",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            here
          </span>{" "}
          to use your previously entered address of {prevUserInputLocation.city}
          , {renderProvince()}
        </p>
      );
    } else return null;
  };

  return (
    <div id="getLocationDiv">
      <i
        onClick={close}
        className="material-icons location-box-close-icon no-select"
      >
        close
      </i>
      <div className="locationDivContainer">
        <div className="locationDivWrapper">
          <h2>Change Location</h2>
          <p className="current-location">
            Current Location: {renderCurrentLocation()}
          </p>
          <p>
            Please confirm your delivery location or login so we can ensure you
            get the best price and fastest shipping
          </p>
          {renderAutoDetectedUserLocation()}
          {renderPreviousUserInputLocation()}
          <label htmlFor="autocompleteGoogle">
            Or enter either your street address or your ZIP / Postal Code.
          </label>
          <form autoComplete="off" className={classes.inputWrapper}>
            <i className="material-icons geo-location-btn">my_location</i>
            <input
              id="autocompleteGoogle"
              type="text"
              className={classes.input}
              placeholder="Type your address"
              aria-describedby="basic-addon1"
              autoComplete="off"
            />
          </form>
          <table id="address">
            <tbody>
              <tr>
                <td className="autocLabel">Street Address</td>
                <td className="slimField">
                  <input className="field" id="street_number" disabled={true} />
                </td>
                <td className="wideField" colSpan="2">
                  <input className="field" id="route" disabled={true} />
                </td>
              </tr>
              <tr>
                <td className="autocLabel">City</td>
                <td className="wideField" colSpan="3">
                  <input className="field" id="locality" disabled={true} />
                </td>
              </tr>
              <tr>
                <td className="autocLabel">State/Prov</td>
                <td className="slimField">
                  <input
                    className="field"
                    id="administrative_area_level_1"
                    disabled={true}
                  />
                </td>
                <td
                  className="autocLabel"
                  style={{
                    marginLeft: "10px"
                  }}
                >
                  ZIP/Postal
                </td>
                <td className="wideField">
                  <input className="field" id="postal_code" disabled={true} />
                  <input
                    className="field"
                    id="postal_code_prefix"
                    disabled={true}
                  />
                </td>
              </tr>
              <tr>
                <td className="autocLabel">Country</td>
                <td className="wideField" colSpan="3">
                  <input className="field" id="country" disabled={true} />
                </td>
              </tr>
            </tbody>
          </table>
          <div
            className="sl-btn sl-btn-confirm"
            onClick={handleGeoLocationConfirmClicked}
          >
            <span>Confirm</span>
          </div>
          <div
            className="sl-btn sl-btn-cancel"
            style={{
              marginLeft: "15px"
            }}
            onClick={handleCancelButtonClicked}
          >
            <span>Cancel</span>
          </div>
        </div>
        <div className={classes.locationAndSliderWrapper}>
          <p className={classes.locationAndSliderTitle}>
            Products will be displayed based on the selected distance from your
            location.
          </p>
          <div className={classes.slider}>
            <Slider
              /*  disabled={loadingState} */
              onChange={handleSliderChange}
              min={0}
              value={mapDistanceStateToSliderValue()}
              marks={{ ...marks }}
              step={null}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleLocationBox;
