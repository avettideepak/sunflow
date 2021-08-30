/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import { useState, useEffect, useContext } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import calculateDistance from "./calculateDistance";
import { useLocation, navigate } from "@reach/router";
import {
  setCategoryDistanceAction,
  fetchCategoryFromDirectUrl
} from "../redux/actions/categoryActions";
import { setGeoLocationState } from "../redux/actions/geoLocationActions";
import { I18nContext } from "../i18n";
import { PROJECT_LINK, VID } from "../project-config";

export default function useCalculateDistance() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { dispatchContext } = useContext(I18nContext);

  const [itemDistance, setItemDistance] = useState("NaN");
  const [supplierShippingType, setSupplierShippingType] = useState("");

  const [pickupLocsState, setPickupLocsState] = useState([]);
  const [rangeState, setRangeState] = useState(0);
  const [countryState, setCountryState] = useState("");
  const [provinceState, setProvinceState] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [continueProduct, setContinueProduct] = useState(false);
  const [urlState, setUrlState] = useState("");

  const distanceState = useSelector(
    state => state.categoryReducer.distance,
    shallowEqual
  );

  const userLocState = useSelector(
    state => state.userLocationReducer,
    shallowEqual
  );

  const userInfoState = useSelector(
    state => state.loginReducer.userInfo,
    shallowEqual
  );

  const showProductsWhenGlobalState = useSelector(
    state => state.categoryReducer.showProductsWhenGlobal,
    shallowEqual
  );

  /* useEffect(() => {
    if (userLocState !== "") {
      console.error("PICKUP LOCATIONS", pickupLocsState);
      let shortest = "NaN";
      let infoShortest = "";
      for (let index = 0; index < pickupLocsState.length; index++) {
        let tempDistance = calculateDistance(
          pickupLocsState[index].latitude,
          pickupLocsState[index].longitude,
          userLocState.lat,
          userLocState.lng
        );
        if (shortest === "NaN") {
          shortest = tempDistance;
          infoShortest = pickupLocsState[index];
        } else if (tempDistance < shortest) {
          shortest = tempDistance;
          infoShortest = pickupLocsState[index];
        }
      }
      console.error("PICKUP LOCATIONS EN YAKIN", shortest, infoShortest);
      setItemDistance(shortest);
    }
  }, [userLocState]); */

  const itemDistanceShort = pickUpLoc => {
    if (userLocState !== "") {
      let shortest = "NaN";
      let infoShortest = "";
      for (let index = 0; index < pickUpLoc.length; index++) {
        let tempDistance = calculateDistance(
          pickUpLoc[index].latitude,
          pickUpLoc[index].longitude,
          userLocState.lat,
          userLocState.lng
        );
        if (shortest === "NaN") {
          shortest = tempDistance;
          infoShortest = pickUpLoc[index];
        } else if (tempDistance < shortest) {
          shortest = tempDistance;
          infoShortest = pickUpLoc[index];
        }
      }

      return shortest;
    }
  };

  const productUrlHandler = async (productId, supplier, url) => {
    /* if (showProductsWhenGlobalState) {
      return navigate(url);
    } */
    setUrlState(url);

    let distanceCompare = distanceState || 200;

    const data = await fetch(
      `${PROJECT_LINK}/uservices/1.0.2/product/${VID}/iid/${productId}/lang/en/`
    ).then(res => res.json());

    let shipStatus = data.__Result[0].hiddenProperties.filter(
      t => t.propname === "SYS_SHIP"
    );
    if (shipStatus.length > 0 && supplier.length > 0) {
      let shipStatusArray = shipStatus[0].propvalue.split(",");

      let pCondition = shipStatusArray.some(s => s[0] === "P");
      let sCondition = shipStatusArray.some(s => s[0] === "S");

      let globalCondition = shipStatusArray.some(s => s === "SWW");
      let canadaCondition = shipStatusArray.some(s => s === "SCA");
      let ontarioCondition = shipStatusArray.some(s => s === "SON");
      let km25Contirion = shipStatusArray.some(s => s === "S25");
      let km100Contirion = shipStatusArray.some(s => s === "S100");

      let switchCondition;

      if (!userLocState.lat && !userLocState.lng) {
        switchCondition = 9;
      } else if (pCondition && sCondition) {
        if (globalCondition) {
          switchCondition = 1;
        } else {
          switchCondition = 6;
        }
      } else if (pCondition && !sCondition) {
        switchCondition = 5;
      } else if (!pCondition && sCondition) {
        if (globalCondition) {
          switchCondition = 1;
        } else if (canadaCondition) {
          switchCondition = 2;
        } else if (ontarioCondition) {
          switchCondition = 3;
        } else if (km25Contirion || km100Contirion) {
          shipStatusArray.map(s => {
            if (s === "S25") {
              distanceCompare = 25;
            } else if (s === "S100") {
              distanceCompare = 100;
            }
          });
          switchCondition = 4;
        }
      } else {
        switchCondition = 1;
      }

      setSupplierShippingType(switchCondition);
      let itemDist = itemDistanceShort(supplier[0].pickup_locations);

      console.log(
        "ALERT LOCATION",
        switchCondition,
        shipStatusArray,
        itemDist,
        distanceCompare,
        supplier
      );
      switch (switchCondition) {
        case 9:
          setShowModal(true);
          break;
        case 6:
          if (itemDist !== "NaN" && itemDist <= distanceCompare) {
            navigate(url);
          } else if (itemDist !== "NaN" && itemDist > distanceCompare) {
            if (
              ontarioCondition &&
              userLocState.state !== supplier[0].province
            ) {
              // dispatch(setCategoryDistanceAction(distanceCompare));
              setRangeState(distanceCompare);

              setShowModal(!showModal);
            } else if (
              canadaCondition &&
              userLocState.country !== supplier[0].country
            ) {
              //dispatch(setCategoryDistanceAction(distanceCompare));
              setRangeState(distanceCompare);

              setShowModal(!showModal);
            } else {
              navigate(url);
            }
          } else {
            navigate(url);
          }
          break;
        case 5:
          if (itemDist !== "NaN" && itemDist <= distanceCompare) {
            navigate(url);
          } else if (itemDist !== "NaN" && itemDist > distanceCompare) {
            //dispatch(setCategoryDistanceAction(distanceCompare));
            setRangeState(distanceCompare);

            setShowModal(!showModal);
          } else {
            navigate(url);
          }
          break;
        case 4:
          setRangeState(distanceCompare);

          if (itemDist !== "NaN" && itemDist <= distanceCompare) {
            navigate(url);
          } else if (itemDist !== "NaN" && itemDist > distanceCompare) {
            setShowModal(!showModal);
          } else {
            navigate(url);
          }
          break;
        case 3:
          if (userLocState.state !== supplier[0].province) {
            setShowModal(true);
          } else {
            navigate(url);
          }
          break;
        case 2:
          if (userLocState.country !== supplier[0].country) {
            setShowModal(true);
          } else {
            navigate(url);
          }
          break;
        case 1:
          navigate(url);
          break;
        default:
          navigate(url);
          break;
      }
    } else {
      navigate(url);
    }
  };

  const setHandleClose = () => {
    setShowModal(false);
  };

  const handleOpenLocationBar = () => {
    dispatchContext({
      type: "changeLocationBar",
      payload: true
    });
  };

  const handleShowLocale = e => {
    e.preventDefault();
    /*    let payload = {
      city: userInfoState.city,
      state: userInfoState.regioncode,
      country: userInfoState.countryName,
      lat: userInfoState.lat,
      long: userInfoState.lng,
      postal: userInfoState.postal
    }; */
    let distance = 200;
    dispatch(setCategoryDistanceAction(distance));
    /*    dispatch(setGeoLocationState(payload)); */

    setHandleClose();
    if (location.href.includes("stores")) {
      navigate(`/stores`);
    } else {
      dispatch(fetchCategoryFromDirectUrl());
    }
  };

  return [
    showModal,
    setHandleClose,
    handleShowLocale,
    handleOpenLocationBar,
    productUrlHandler,
    supplierShippingType,
    urlState,
    rangeState
  ];
}
