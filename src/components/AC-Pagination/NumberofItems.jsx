import React, { useEffect, useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { changeGeoLocationAction } from "../../redux/actions/geoLocationActions";
import { I18nContext } from "../../i18n/index";

const LOCATIONS = [
  /*   { city: "Utopia", country: "Canada", lat: 44.32783, long: -79.83744 }, */
];

export default function NumberOfItems({ component }) {
  const dispatch = useDispatch();
  const { translate } = React.useContext(I18nContext);

  const [closestStore, setClosestStore] = useState(null);
  const [
    totalProductCountOfSellersFacet,
    setTotalProductCountOfSellersFacet
  ] = useState(null);

  const userInfoState = useSelector(
    state => state.loginReducer.userInfo,
    shallowEqual
  );

  const geoLocationState = useSelector(
    state => state.geoLocationReducer.geoLocation,
    shallowEqual
  );

  const numberOfItemState = useSelector(
    state => state.categoryReducer.numberOfItems,
    shallowEqual
  );

  const loadingState = useSelector(
    state => state.categoryReducer.loading,
    shallowEqual
  );

  const distanceState = useSelector(
    state => state.categoryReducer.distance,
    shallowEqual
  );

  const numberOfStoreItemsState = useSelector(
    state => state.storeReducer.numberOfItems,
    shallowEqual
  );

  /*   const facetsState = useSelector(
    state => state.facetReducer.facets,
    shallowEqual
  );

  const storesState = useSelector(
    state => state.storeReducer.stores,
    useSelector
  ); */

  /*   const latState = geoLocationState.lat || userInfoState.lat;
  const lngState = geoLocationState.long || userInfoState.lng; */

  /*  useEffect(() => {
    if (
      numberOfItemState === 0 &&
      facetsState &&
      facetsState[2] &&
      facetsState[2].Other
    ) {
      let sellersFacet = facetsState[2].Other.find(
        facet => facet.name === "Sellers"
      );

      if (sellersFacet && sellersFacet.facetValues) {
        setTotalProductCountOfSellersFacet(
          sellersFacet.facetValues.reduce((a, seller) => {
            a += seller.count;
            return a;
          }, 0)
        );
        let sellerWithCountNonZero = sellersFacet.facetValues.some(
          seller => seller.count > 0
        );

        if (sellerWithCountNonZero) {
          let sortedStoresByDistance = storesState.reduce((arr, store) => {
            if (store.properties.lat && store.properties.lng) {
              let distance = getDistanceBetweenTwoCoords(
                latState,
                lngState,
                store.properties.lat,
                store.properties.lng
              );
              arr.push({ id: store.id, distance });
            }

            return arr;
          }, []);

          sortedStoresByDistance = sortedStoresByDistance.sort(
            (a, b) => a.distance - b.distance
          );

          if (sortedStoresByDistance) {
            let closestStore = storesState.find(
              store => store.id === sortedStoresByDistance[0].id
            );

            closestStore.distance = sortedStoresByDistance[0].distance;
            setClosestStore(closestStore);
          }
        }
      }
    }
  }, [facetsState]); */

  console.info("NumberofItems Component, closest store", closestStore);

  const handleLocationBtnClicked = location => {
    dispatch(changeGeoLocationAction(location));
  };

  const handleOpenLocationBox = () => {
    const button = document.getElementById("locationChangeBtn");
    button.click();
  };

  const renderDataCountContent = () => {
    const renderNumberOfItems = () => {
      if (component && component == "stores") {
        return numberOfStoreItemsState;
      } else {
        return numberOfItemState;
      }
    };

    const renderNumberOfProductsFoundText = () => {
      if (component && component == "stores") {
        return `${
          numberOfStoreItemsState > 1
            ? ` ${translate("js.category.productsfound")}`
            : ` ${translate("js.category.productfound")}`
        }`;
      } else {
        return `${
          numberOfItemState > 1
            ? ` ${translate("js.category.productsfound")}`
            : ` ${translate("js.category.productfound")}`
        }`;
      }
    };

    const renderNearestStoreInfoIfNoProductFoundAroundTheUser = () => {
      if (closestStore) {
        return (
          <div className="data-count--nearest-store">
            <p style={{ lineHeight: "initial" }}>
              But, there are {totalProductCountOfSellersFacet} products
              globally. Closest store is{" "}
              <span>{`${closestStore.title} and it is ${Math.ceil(
                closestStore.distance
              )} KM away. `}</span>{" "}
              You can try to change your location or adjust the distance.{" "}
              <b
                onClick={handleOpenLocationBox}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                here
              </b>
            </p>
          </div>
        );
      } else {
        return null;
      }
    };

    const renderNoProductFoundAroundYouInfo = () => {
      if (numberOfItemState === 0) {
        return (
          <div className="no-product-around-you-wrapper">
            <p
              style={{
                fontWeight: "600",
                textTransform: "uppercase",
                color: "#eb283a"
              }}
            >{`Sorry there are no sellers within ${distanceState} KM of you.`}</p>
            <p>
              Click{" "}
              <b
                onClick={handleOpenLocationBox}
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: "#06b124"
                }}
              >
                here
              </b>{" "}
              to make the search radius larger or to enter a city name to find
              sellers around that city or address. As the site has just opened
              we are in progress with onboarding sellers.
            </p>
            <p>
              You can click on the following buttons to search for sellers in
              these cities:{" "}
            </p>
            <div className="no-product-around-you-btns-wrapper">
              {LOCATIONS.map((location, index) => (
                <span
                  key={index}
                  onClick={() => handleLocationBtnClicked(location)}
                  className="no-product-around-you--btn"
                >
                  {location.city}
                </span>
              ))}
            </div>
            <p>
              If you are looking for a no cost new sales channel to offer your
              products email us at{" "}
              <a
                style={{ fontWeight: "600", color: "blue" }}
                href="mailto:ecommece@avetti.com"
              >
                ecommece@avetti.com
              </a>{" "}
              to sign up.
            </p>
          </div>
        );
      } else return null;
    };

    return (
      <div className="data-count-content">
        <div>
          <b>{renderNumberOfItems()}</b>
          {renderNumberOfProductsFoundText()}
        </div>
        {renderNearestStoreInfoIfNoProductFoundAroundTheUser()}
        {renderNoProductFoundAroundYouInfo()}
      </div>
    );
  };

  return (
    <React.Fragment>
      {!loadingState ? (
        <div className="dataCount">{renderDataCountContent()}</div>
      ) : null}
    </React.Fragment>
  );
}
