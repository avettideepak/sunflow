import React, { useState } from "react"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { PROJECT_LINK, IS_PUBLISHED, PREVIEW } from "../../project-config"
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps"
import Geocode from "react-geocode"
import * as parksData from "./skateboard-parks.json"

// Geocode.setApiKey("AIzaSyAcPm0gefk_kjA0rgxtytc8L5abf2o69ls");
// Geocode.enableDebug();

const Map = (props) => {
  const categoryItems = useSelector(
    (state) => state.categoryReducer.categoryItems,
    shallowEqual
  )

  console.log("category items")
  console.log(categoryItems)

  const [selectedPark, setSelectedPark] = useState(null)
  const [storesLocation, setStoresLocation] = useState(null)

  let imagePath = IS_PUBLISHED ? PROJECT_LINK + "/preview/" : PROJECT_LINK + "/"

  return (
    <GoogleMap
      defaultZoom={10}
      center={{ lat: props.userLocation.lat, lng: props.userLocation.lng }}
    >
      {categoryItems &&
      categoryItems[0] &&
      categoryItems[0].properties &&
      categoryItems[0].properties.lat
        ? categoryItems.map((item) => (
            <Marker
              key={item.id}
              position={{
                lat: parseFloat(item.properties.lat),
                lng: parseFloat(item.properties.lng),
              }}
              // icon={{
              //     url:item.image,
              //     scaledSize: new window.google.maps.Size(25,25)
              // }}
              // onClick={()=>{
              //     setSelectedPark(park);
              // }}
            />
          ))
        : null}

      <Marker
        key="userLocation"
        position={{
          lat: props.userLocation.lat,
          lng: props.userLocation.lng,
        }}
        icon={{
          url: "https://maps.google.com/mapfiles/kml/shapes/man.png",
          scaledSize:
            typeof window !== undefined
              ? new window.google.maps.Size(45, 45)
              : null,
        }}
      />

      {/* {selectedPark && (
                    <InfoWindow 
                        position={{
                            lat: selectedPark.geometry.coordinates[1],
                            lng: selectedPark.geometry.coordinates[0]
                        }}
                        onCloseClick={()=>{
                            setSelectedPark(null);
                        }}
                    >
                        <div>
                            <h3>{selectedPark.properties.NAME}</h3>
                            <p>{selectedPark.properties.DESCRIPTIO}</p>
                        </div>
                    </InfoWindow>
                )} */}
    </GoogleMap>
  )
}
const WrappedMap = withScriptjs(withGoogleMap(Map))

export default WrappedMap
