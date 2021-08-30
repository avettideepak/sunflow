import React, { useEffect, useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { setGeoLocationState } from "../../../../redux/actions/geoLocationActions";
import { I18nContext } from "../../../../i18n/index";
import { Link, useLocation } from "@reach/router";

const LOCATIONS = [
  {
    city: "Creemore",
    state: "Ontario",
    country: "Canada",
    lat: 44.32783,
    long: -79.83744
  },
  {
    city: "Barrie",
    state: "Ontario",
    country: "Canada",
    lat: 44.389355,
    long: -79.690331
  },
  {
    city: "Wiarton",
    state: "Ontario",
    country: "Canada",
    lat: 44.7333,
    long: -81.1333
  },
  {
    city: "Thornbury",
    state: "Ontario",
    country: "Canada",
    lat: 44.56179,
    long: -80.452939
  },
  {
    city: "St. Catharines",
    state: "Ontario",
    country: "Canada",
    lat: 43.159374,
    long: -79.246864
  },
  {
    city: "Regina",
    state: "Saskatchewan",
    country: "Canada",
    lat: 50.45008,
    long: -104.6178
  },
  {
    city: "Midland",
    state: "Ontario",
    country: "Canada",
    lat: 44.7501,
    long: -79.88296
  },
  {
    city: "Clarksburg",
    state: "Ontario",
    country: "Canada",
    lat: 44.5451485,
    long: -80.461738
  },
  {
    city: "Calgary",
    state: "Alberta",
    country: "Canada",
    lat: 51.05011,
    long: -114.08529
  }

  /*   { city: "Utopia", country: "Canada", lat: 44.32783, long: -79.83744 }, */
];

export default function NoItems({ component }) {
  const location = useLocation();
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

  console.info("NumberofItems Component, closest store", closestStore);

  const handleLocationBtnClicked = location => {
    dispatch(setGeoLocationState(location));
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

    console.info("borop location", location);
    const renderMessageForSellerProductsPageOrCategories = () => {
      if (!location.href.includes("stores/")) {
        return (
          <p
            style={{
              fontWeight: "600",
              textTransform: "uppercase",
              color: "#eb283a"
            }}
          >{`Sorry there are no sellers within ${
            distanceState !== null ? distanceState : 200
          } KM of you.`}</p>
        );
      } else {
        return (
          <React.Fragment>
            <p
              style={{
                fontWeight: "600",
                textTransform: "uppercase"
              }}
            >
              {`Sorry this seller is more than ${
                distanceState !== null ? distanceState : 200
              } KM away and does not ship to your location. If you would like to view the products anyway, please change your location or the selected distance.`}
            </p>
          </React.Fragment>
        );
      }
    };

    const renderNoProductFoundAroundYouInfo = () => {
      let numberOfItems =
        component === "stores" ? numberOfStoreItemsState : numberOfItemState;
      return (
        <div className="no-product-around-you-wrapper">
          {renderMessageForSellerProductsPageOrCategories()}
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
            sellers around that city or address. As the site has just opened we
            are in progress with onboarding sellers.
          </p>
          <p>
            You can click on the following buttons to search for sellers in
            these cities however you may still need to click on the other menus
            if sellers in that city are not listed here:{" "}
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
            Be the first in your area to list your business. It's free.{" "}
            <Link
              className="no-product-around-you--btn"
              to="/seller-registration"
            >
              Sign up as a Seller
            </Link>
          </p>
        </div>
      );
    };

    return (
      <div className="data-count-content">
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
