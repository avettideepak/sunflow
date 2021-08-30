import "mapbox-gl/dist/mapbox-gl.css";
//import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css"
import React, { useState, useRef, useEffect, useContext } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import MapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import { handleReplaceImagesWithLargeImagesOnError } from "../../functions/Utilities";
// import Geocoder from "react-map-gl-geocoder"
import PulseMarker from "../AC-UI-Elements/PulseMarker";
import MarkerIcon from "../../assets/icons/marker.png";
import PickupMarkerIcon from "../../assets/icons/pickup_marker.png";
import "./Styles/ReactMap.css";
import { classes } from "istanbul-lib-coverage";
import { I18nContext } from "../../i18n/index";
import { Link } from "@reach/router";
import { store } from "../../layout";

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

// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
const MAPBOX_TOKEN = getAccessToken();

const Map = props => {
  const dispatch = useDispatch();
  const { langCode } = useContext(I18nContext);

  const mapRef = useRef();
  const geocoderContainerRef = useRef();

  const userLocation = useSelector(
    state => state.userLocationReducer,
    shallowEqual
  );

  const storesState = useSelector(
    state => state.storeReducer.stores,
    shallowEqual
  );

  const SUPPLIERS =
    props.supplier &&
    props.supplier.reduce((a, c) => {
      a = { ...a, [c.supplier_vendorId]: c };
      return a;
    }, {});

  const [viewport, setViewport] = useState({
    latitude: userLocation.lat ? userLocation.lat : 44.3894,
    longitude: userLocation.lng ? userLocation.lng : 79.6903,
    zoom: userLocation.lat ? 3 : 1
  });

  useEffect(() => {
    if (userLocation && userLocation.lat && userLocation.lng) {
      setViewport({
        latitude: userLocation.lat,
        longitude: userLocation.lng,
        zoom: 9
      });
    }
  }, [userLocation]);

  const [selectedStore, setSelectedStore] = useState(null);

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

  const renderPickUpLocations = store => {
    let store_vid = store.properties.Created_By_Supplier;

    let pickUpLocations =
      (SUPPLIERS &&
        SUPPLIERS[store_vid] &&
        SUPPLIERS[store_vid].pickup_locations) ||
      [];

    return pickUpLocations.map(location =>
      renderMarker(
        store,
        `${location.latitude}${location.longitude}`,
        location.latitude,
        location.longitude,
        location
      )
    );
  };

  console.info("store4", selectedStore);

  const renderMarker = (store, key, lat, lng, location) => {
    let tempStore = {};

    if ((!lat, !lng)) {
      return;
    }
    if (location && store) {
      tempStore = { ...store, pickupLocation: { ...location } };
    } else if (store) tempStore = { ...store };
    return (
      <Marker
        className="marker-wrapper"
        key={key}
        offsetLeft={-15}
        offsetTop={-30}
        latitude={lat}
        longitude={lng}
      >
        <button
          className="markerBtn"
          onClick={e => {
            e.preventDefault();

            setSelectedStore(tempStore);
          }}
        >
          {location ? (
            <img
              className="pickLoc"
              width="24px"
              height="24px"
              src={PickupMarkerIcon}
            ></img>
          ) : (
            <img
              className="storeLoc"
              width="24px"
              height="24px"
              src={MarkerIcon}
            ></img>
          )}
        </button>
      </Marker>
    );
  };

  return (
    <>
      <MapGL
        ref={mapRef}
        {...viewport}
        mapStyle="mapbox://styles/avetti/ckcglujo10gkw1in776enx7lh"
        width="100%"
        height="400px"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        {/*   <div className="getLocationButton">
          <button onClick={setUserLoc}>Get Location</button>
        </div> */}
        {/* <Geocoder
          className="TEST"
          mapRef={mapRef}
          onResult={handleOnResult}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        /> */}

        <div style={{ position: "absolute", right: "10px", bottom: "40px" }}>
          <NavigationControl />
        </div>

        {storesState &&
          storesState
            .filter(store => store.properties.lat && store.properties.lng)
            .map((store, index) => {
              return (
                <React.Fragment>
                  {renderPickUpLocations(store)}
                  {renderMarker(
                    store,
                    store.properties.Created_By_Supplier,
                    parseFloat(store.properties.lat),
                    parseFloat(store.properties.lng)
                  )}
                </React.Fragment>
              );
            })}

        {selectedStore ? (
          <Popup
            closeOnClick={false}
            latitude={parseFloat(selectedStore.properties.lat)}
            longitude={parseFloat(selectedStore.properties.lng)}
            offsetTop={-35}
            offsetLeft={5}
            onClose={() => {
              setSelectedStore(null);
            }}
          >
            <div style={{ display: "flex", padding: "5px", zIndex: "1000" }}>
              <img
                width="125px"
                src={selectedStore.image}
                onError={handleReplaceImagesWithLargeImagesOnError}
              ></img>
              <div style={{ padding: "5px" }}>
                {selectedStore && selectedStore.pickupLocation && (
                  <h6>Pick-up Location:</h6>
                )}
                <p style={{ fontWeight: "bold", padding: "5px 0" }}>
                  {selectedStore.title}
                </p>
                {selectedStore && selectedStore.pickupLocation && (
                  <h6>{selectedStore.pickupLocation.address_place}</h6>
                )}
                <div
                  onClick={e => e.stopPropagation()}
                  style={{ marginTop: "20px" }}
                >
                  <Link
                    to={`stores/${selectedStore.title
                      .replace(/ /g, "-")
                      .toLowerCase()}`}
                  >
                    Visit Store
                  </Link>
                </div>
              </div>
            </div>
          </Popup>
        ) : null}

        {userLocation && userLocation.lat && userLocation.lng ? (
          <Marker
            offsetLeft={-25}
            offsetTop={-25}
            latitude={userLocation.lat}
            longitude={userLocation.lng}
          >
            <PulseMarker />
          </Marker>
        ) : null}
      </MapGL>
    </>
  );
};

export default Map;
