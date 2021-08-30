import React, { useState, useEffect, useContext } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { browserInfo } from "../../../functions/notifications";
import { loginUserDataSuccess } from "../../../redux/actions/loginActions";
import { brandCompareUserGeoLocation } from "../../../redux/actions/geoLocationActions.js";
import classes from "./Styles/GeolocationPermission.module.css";
import { geolocationRequestAction } from "../../../redux/actions/handlersAction";
import permissionsHandler from "./utils/permissionsHandler";
import DialogContent from "@material-ui/core/DialogContent";

export default function GeolocationPermission() {
  const dispatch = useDispatch();
  //const { langCode, translate } = useContext(I18nContext);
  const LOCAL_STORAGE_GEOLOCATION_PERMISSION = "store.geolocationPermission";
  const [openModalState, setOpenModalState] = useState(false);
  const [userPermissionState, setUserPermissionState] = useState(null);
  const [
    localStorageLocationPermission,
    setLocalStorageLocationPermission
  ] = useState(null);

  const [isRtl, setIsRtl] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      if (navigator.language === "ar") {
        setIsRtl(true);
      }

      if (geolocationRequestState) {
        const localStorageData = localStorage.getItem(
          LOCAL_STORAGE_GEOLOCATION_PERMISSION
        );

        if (localStorageData) {
          const obj = JSON.parse(localStorageData);
          const expired = (Date.now() - obj.timestamp) / 60000 > 60 * 6; // 6 hours
          console.info(
            "geolocationRequestState locationStorage",
            localStorageData,
            obj,
            expired
          );
          setLocalStorageLocationPermission(expired);
        } else {
          setLocalStorageLocationPermission(true);
        }

        permissionsHandler(setUserPermissionState);
      }
    }
  }, []);

  const geolocationRequestState = useSelector(
    state => state.handlersReducer.geolocationRequest,
    shallowEqual
  );

  console.info(
    "geolocationRequestState",
    geolocationRequestState,
    localStorageLocationPermission
  );

  const languageState = useSelector(
    state => state.mainReducer.lang,
    shallowEqual
  );

  const thankYouModalStyle = {
    padding: "2rem",
    background: "white"
  };

  const noThanksButtonHandler = () => {
    dispatch(geolocationRequestAction(false));
    if (typeof localStorage !== undefined) {
      localStorage.setItem(
        LOCAL_STORAGE_GEOLOCATION_PERMISSION,
        JSON.stringify({ value: false, timestamp: Date.now() })
      );
    }
  };

  const handleOpenGoogleLocationBox = () => {
    dispatch(geolocationRequestAction(false));
    const button = document.getElementById("locationChangeBtn");
    button.click();
  };

  const handleGeolocateUser = () => {
    const getAddress = (latitude, longitude) =>
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=administrative_area_level_3|postal_code&key=${process.env.GATSBY_GOOGLE_MAPS_KEY}`
      ).then(res => res.json());

    navigator.geolocation.getCurrentPosition(async position => {
      dispatch(
        brandCompareUserGeoLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude
        })
      );
      const googleResult = await getAddress(
        position.coords.latitude,
        position.coords.longitude
      );

      console.error("HEYYY start", googleResult);

      console.error("RES", googleResult);
      let tempLocation = {};
      let foundData = googleResult.results.find(t =>
        t.types.includes("administrative_area_level_3")
      );

      if (!foundData) {
        foundData = googleResult.results.find(t =>
          t.types.includes("postal_code")
        );
      }

      console.info("foundData", foundData);

      foundData.address_components.map(address => {
        tempLocation[address.types[0]] = address;
      });

      console.info("location", tempLocation);

      let location = {
        city: tempLocation.administrative_area_level_3
          ? tempLocation.administrative_area_level_3.long_name
          : tempLocation.locality
          ? tempLocation.locality.long_name
          : tempLocation.city
          ? tempLocation.city.long_name
          : "",
        countrycode: tempLocation.country.short_name,
        countryname: tempLocation.country.long_name,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        postal: googleResult.results
          .filter(t => t.types.includes("postal_code"))[0]
          .address_components.filter(t => t.types.includes("postal_code"))[0]
          .long_name,
        regioncode: tempLocation.administrative_area_level_1.short_name,
        regionname: tempLocation.administrative_area_level_1.long_name,
        languages: "en"
      };

      if (typeof localStorage !== undefined) {
        localStorage.setItem("userLocation", JSON.stringify(location));
      }

      console.error("HERE IS ADDRESS NEW", location);
      dispatch(geolocationRequestAction(false));
      dispatch(loginUserDataSuccess(location));
    });
  };

  if (geolocationRequestState && userPermissionState === "prompt") {
    return (
      <div
        className="popover-dialog"
        // style={{ display: openModalState ? "block" : "none" }}
      >
        <div
          className="row flex"
          style={{ alignItems: "center", paddingTop: "20px" }}
        >
          <div className="col-md-2">
            <i
              className="material-icons"
              style={{ fontSize: "4rem", color: "#BBB" }}
            >
              location_on
            </i>
          </div>
          <div className="col-md-10">
            <p
              style={{
                fontSize: "1.1rem",
                color: "#666",
                lineHeight: "initial",
                marginBottom: "10px"
              }}
            >
              We need your location to show Local Vendors nearest you. Please
              allow your browser to access your location.
            </p>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#666",
                lineHeight: "initial"
              }}
            >
              Alternatively, you may click{" "}
              <span
                style={{ color: "blue", textDecoration: "underline" }}
                role="button"
                onClick={handleOpenGoogleLocationBox}
              >
                here
              </span>{" "}
              to enter your location manually.
            </p>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-sm-12" style={{ display: "flex" }}>
            <Button
              color="primary"
              size="large"
              style={{
                marginLeft: "auto",
                marginRight: "20px",
                color: "#1165f1"
              }}
              onClick={noThanksButtonHandler}
            >
              No Thanks
            </Button>

            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleGeolocateUser}
              style={{ backgroundColor: "#1165f1" }}
            >
              Allow
            </Button>
          </div>
        </div>
        <br />
      </div>
    );
  }
  if (geolocationRequestState && userPermissionState === "granted") {
    handleGeolocateUser();
    return null;
  } else if (geolocationRequestState && userPermissionState === "denied") {
    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        open={geolocationRequestState}
        onClose={() => {}}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={geolocationRequestState}>
          <div className={classes.blockedWrapper}>
            <div className={classes.title}>
              <h2 id="transition-modal-title">
                Automatic location detection is blocked on your browser
              </h2>

              <i
                onClick={() => {
                  dispatch(geolocationRequestAction(false));
                }}
                className="material-icons"
              >
                close
              </i>
            </div>
            <div style={thankYouModalStyle}>
              <div>
                <p>
                  We need your location to show local vendors near you on the
                  map. Please click the buttons below to set your location or
                  allow your browser to access your location. Other features on
                  this site also depend on your location to deliver you a better
                  browsing experience.
                </p>
                <p>
                  Click{" "}
                  <span onClick={handleOpenGoogleLocationBox} role="button">
                    here
                  </span>{" "}
                  to enter your location manually.
                </p>
                <p>
                  Click{" "}
                  <a
                    href="https://support.google.com/chrome/answer/142065"
                    target="_blank"
                  >
                    here
                  </a>{" "}
                  to read on how to enable it for Chrome on your device.
                </p>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    );
  } else return <div></div>;
}
