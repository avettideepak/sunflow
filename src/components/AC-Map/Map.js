import React, { useState } from "react";
import GoogleMap from "../AC-GoogleMaps/GoogleMaps";
import Autocomplete from "react-google-autocomplete";
import { usePosition } from "use-position";
import Geocode from "react-geocode";

const Map = () => {
  const style = {
    width: "90%",
    margin: "25px 5%"
  };
  const [userLocation, setUserLocation] = useState(null);
  let loading = true;

  React.useEffect(() => {
    console.error(userLocation);
  }, [userLocation]);

  const { latitude, longitude, timestamp, accuracy, error } = usePosition(
    false,
    { timeout: 5000 }
  );
  const [userAddress, setUserAddress] = useState(null);

  React.useEffect(() => {
    if (latitude) {
      Geocode.fromLatLng(latitude, longitude).then(
        response => {
          const address = response.results[0].formatted_address;
          setUserAddress(address);
          console.log(userAddress);
        },
        error => {
          console.error(error);
        }
      );
      setUserLocation({
        lat: latitude,
        lng: longitude
      });
    }
  }, [latitude, error]);

  Geocode.setApiKey("AIzaSyAcPm0gefk_kjA0rgxtytc8L5abf2o69ls");

  // !latitude && !error && <><span>Trying to fetch location...</span></>}
  // (latitude && longitude).then()
  //                 Geocode.fromLatLng(latitude, longitude).then(
  //                     response => {
  //                       const address = response.results[0].formatted_address;
  //                       console.log(address);
  //                     },
  //                     error => {
  //                       console.error(error);
  //                     }
  // ) : null}

  return (
    <div style={style}>
      <div>
        <h3>
          Your Location:{" "}
          {!latitude && !error && !userAddress && (
            <>
              <span>Trying to fetch location...</span>
            </>
          )}
          {error !== null && !userAddress ? (
            <span>Please enter your location below.</span>
          ) : null}
          {userAddress}
        </h3>
      </div>

      <Autocomplete
        className="test"
        style={{ width: "100%", margin: "2% 0", paddingLeft: "15px" }}
        onPlaceSelected={place => {
          setUserAddress(place.formatted_address);
          setUserLocation({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          });
        }}
        types={["address"]}
      />

      {userLocation !== null ? (
        <div style={{ width: "90vw", height: "300px" }}>
          <GoogleMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}`}
            loadingElement={<div style={{ height: "100%" }} />}
            containerElement={<div style={{ height: "100%" }} />}
            mapElement={<div style={{ height: "100%" }} />}
            userLocation={userLocation}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Map;
