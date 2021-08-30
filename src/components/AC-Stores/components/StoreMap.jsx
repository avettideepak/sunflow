/* import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css"; */
import React, { useState, useRef, useEffect, useContext } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
/* import MapGL, { Marker, Popup, NavigationControl } from "react-map-gl"; */
import PulseMarker from "../../AC-UI-Elements/PulseMarker";
import MarkerIcon from "../../../assets/icons/marker.png";
/* import "./Styles/ReactMap.css"; */
import { I18nContext } from "../../../i18n/index";
import classes from "../Styles/StoreMap.module.css";
import { setHTMLElementFixedPosition } from "../../../functions/Utilities";
import { setSelectedStoreToViewOnTheMapAction } from "../../../redux/actions/storesAction";
//import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import SelectedStoreDetails from "./SelectedStoreDetails";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "../Styles/DirectionsStyles.css";

function getAccessToken() {
  var accessToken = null;

  if (typeof window !== "undefined" && window.location) {
    var match = window.location.search.match(/access_token=([^&\/]*)/);
    accessToken = match && match[1];
  }

  if (!accessToken && typeof process !== "undefined") {
    // Note: This depends on bundler plugins (e.g. webpack) inmporting environment correctly
    accessToken = accessToken || process.env.GATSBY_MAPBOX_API_ACCESS_TOKEN; // eslint-disable-line
  }

  return accessToken || null;
}
let mapBoxDirections = null;

// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
const MAPBOX_TOKEN = getAccessToken();

const StoreMap = props => {
  const dispatch = useDispatch();
  const { langCode } = useContext(I18nContext);

  // const [mapBoxDirections, setMapBoxDirections] = useState(null);

  const mapRef = useRef();
  const [collapsed, setCollapsed] = useState(false);

  const [map, setMap] = useState(null);
  const [directionsRequested, setDirectionsRequested] = useState(false);
  const mapContainer = useRef(null);

  const userLocation = useSelector(
    state => state.userLocationReducer,
    shallowEqual
  );

  const selectedStoreToViewOnTheMapState = useSelector(
    state => state.storeReducer.selectedStoreToViewOnTheMap,
    shallowEqual
  );

  const [viewport, setViewport] = useState({
    latitude: userLocation.lat ? userLocation.lat : 38,
    longitude: userLocation.lng ? userLocation.lng : 35,
    zoom: userLocation.lat ? 9 : 1
  });

  const [selectedStore, setSelectedStore] = useState(null);

  const styles = {
    height: "calc(100vh - 80px)"
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      import("@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions")
        .then(component => {
          mapBoxDirections = component.default;
        })
        .catch(
          error =>
            `An error occurred while loading the MapboxDirections component  ${error}`
        );
    }
  }, []);

  console.info("borop map", mapBoxDirections);

  useEffect(() => {
    setHTMLElementFixedPosition(selectedStoreToViewOnTheMapState != null);
  }, [selectedStoreToViewOnTheMapState]);

  useEffect(() => {
    if (
      selectedStoreToViewOnTheMapState &&
      typeof window !== undefined &&
      mapBoxDirections
    ) {
      mapboxgl.accessToken = MAPBOX_TOKEN;
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [
          selectedStoreToViewOnTheMapState.properties.lng,
          selectedStoreToViewOnTheMapState.properties.lat
        ],
        zoom: 12
      });

      const marker = new mapboxgl.Marker(
        <img width="30px" height="30px" src={MarkerIcon}></img>
      )
        .setLngLat([
          selectedStoreToViewOnTheMapState.properties.lng,
          selectedStoreToViewOnTheMapState.properties.lat
        ])
        .addTo(map);

      // set up the custom control
      const createButton = (text, onclick) => {
        const button = document.createElement("button");
        button.classList.add(classes.toggleViewDirectionsBtn);
        button.setAttribute("type", "button");
        button.appendChild(document.createTextNode(text));
        button.addEventListener("click", onclick);
        return button;
      };
      const markButton = createButton("Toggle View Directions", ev => {
        ev.target.parentElement.classList.toggle("collapsed");
      });
      const mapboxglLatLngControl = {
        onAdd: () => {
          const toggleButtonContainer = document.createElement("div");
          toggleButtonContainer.classList.add(
            "toggle-button-container",
            "mapboxgl-ctrl"
          );
          toggleButtonContainer.appendChild(markButton);
          return toggleButtonContainer;
        },
        getDefaultPosition: () => {
          return "top-left";
        },
        onRemove: () => {}
      };

      const directions = new mapBoxDirections({
        accessToken: mapboxgl.accessToken,
        unit: "metric",
        profile: "mapbox/driving",
        proximitiy: [userLocation.lng, userLocation.lat]
      });

      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        })
      );

      const nav = new mapboxgl.NavigationControl();
      map.addControl(nav, "bottom-right");

      if (directionsRequested) {
        map.addControl(mapboxglLatLngControl);

        map.addControl(directions, "top-left");

        directions.setOrigin([userLocation.lng, userLocation.lat]);
        directions.setDestination([
          selectedStoreToViewOnTheMapState.properties.lng,
          selectedStoreToViewOnTheMapState.properties.lat
        ]);
      }

      map.on("load", () => {
        map.resize();
      });
    }
  }, [selectedStoreToViewOnTheMapState, directionsRequested]);

  const setUserLoc = () => {
    navigator.geolocation.getCurrentPosition(position => {
      let userLocationTemp = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      const newViewport = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 9
      };

      setViewport(newViewport);
      //  dispatch(setUserLocation(userLocationTemp));
      // setUserLocation(userLocation);
    });
  };

  const handleViewportChange = viewPort => {
    setViewport(viewPort);
  };
  const handleClose = () => {
    setDirectionsRequested(false);
    dispatch(setSelectedStoreToViewOnTheMapAction(null));
  };

  const handleGeocoderViewportChange = viewPort => {
    handleViewportChange(viewPort);
  };

  const handleOnResult = event => {
    let userLocationTemp = {
      latitude: event.result.geometry.coordinates[1],
      longitude: event.result.geometry.coordinates[0]
    };
    let newViewport = {
      latitude: event.result.geometry.coordinates[1],
      longitude: event.result.geometry.coordinates[0],
      zoom: 12
    };
    //    dispatch(updateUserAddress(event.result.place_name));
    setViewport(newViewport);

    //    dispatch(setUserLocation(userLocationTemp));
  };

  if (selectedStoreToViewOnTheMapState && userLocation.lat) {
    return (
      <div className={classes.container}>
        <div style={styles} className={classes.wrapper}>
          <i
            onClick={handleClose}
            className={`no-select material-icons ${classes.closeIcon}`}
          >
            close
          </i>
          <div aria-expanded={!collapsed} className={classes.directionsWrapper}>
            <SelectedStoreDetails
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              setDirectionsRequested={setDirectionsRequested}
            />
          </div>

          <div className={classes.mapWrapper}>
            <div
              style={{ height: "100%" }}
              ref={el => (mapContainer.current = el)}
              className="mapContainer"
            />
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default StoreMap;
