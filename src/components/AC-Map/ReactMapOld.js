import React, { useState, setState } from "react"
import ReactMapGL from "react-map-gl"
import DeckGL, { GeoJsonLayer } from "deck.gl"
//import Geocoder from "react-map-gl-geocoder";
import "./ReactMap.css"
import "mapbox-gl/dist/mapbox-gl.css"
//import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

const Map = () => {
  const mapRef = React.createRef()

  const geolocateStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    margin: 10,
  }

  const [viewport, setViewport] = useState({
    width: "100%",
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  })

  const [searchResultLayer, setSearchResultLayer] = useState(null)

  const [userLocation, setUserLocation] = useState(null)

  React.useEffect(() => {
    console.info(userLocation)
  }, [userLocation])

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN}
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        <button
          onClick={() => {
            navigator.geolocation.getCurrentPosition((position) => {
              setUserLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              })
              setViewport({
                height: 400,
                width: "100%",
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                zoom: 10,
              })

              //     this.setState({
              //       viewport: newViewport,
              //       userLocation: setUserLocation
              //    });
            })
          }}
        >
          Get Location
        </button>

        {/* <Geocoder
          mapRef={mapRef}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN}
        /> */}

        {/* <GeolocateControl
                style={geolocateStyle}
                positionOptions={{enableHighAccuracy: true}}
                trackUserLocation={false}
            /> */}
      </ReactMapGL>
    </div>
  )
}

export default Map
