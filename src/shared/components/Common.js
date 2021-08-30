/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { PREVIEW } from "../../project-config.js";

import {
  fetchingCategoryRequest,
  fetchingCategoryRequestSaga,
  setGlobalShowAllProducts
} from "../../redux/actions/categoryActions";
import {
  fetchMenu,
  fetchByStyle,
  setStoresNavCatAction
} from "../../redux/actions/menuActions.js";
import {
  fetchFeatured,
  changeLanguageFromFunction,
  fetchCurrencyInfo,
  changeLanguage,
  changeCountry,
  updateCurrency,
  setInitialLoadAction
} from "../../redux/actions/mainActions.js";
import {
  fetchLogin,
  fetchUserData,
  loginUserDataInitial
} from "../../redux/actions/loginActions.js";

import changeUrlwithLanguageChange from "../../i18n/functions/changeUrlwithLanguageChange";
import {
  I18nContext,
  translations,
  getLanguageServer,
  countryList,
  mapCountryList,
  getCountryCode,
  currencyList,
  currencyDefine
} from "../../i18n/index";
import {
  setGeoLocationState,
  setDynamicContentAction,
  updateUserDistance
} from "../../redux/actions/geoLocationActions.js";
import { useLocation } from "@reach/router";

const Common = () => {
  const { langCode, dispatchContext, currency } = useContext(I18nContext);

  const location = useLocation();
  const countryCode = useSelector(
    state => state.mainReducer.country,
    shallowEqual
  );

  const dispatch = useDispatch(); //this hook gives us dispatch method
  const entryState = useSelector(
    state => state.mainReducer.entryState,
    shallowEqual
  );
  const languageButtonState = useSelector(
    state => state.mainReducer.languageButton,
    shallowEqual
  );
  const languageState = useSelector(
    state => state.mainReducer.lang,
    shallowEqual
  );
  const currencyState = useSelector(
    state => state.mainReducer.currency,
    shallowEqual
  );

  const loginInfoState = useSelector(
    state => state.loginReducer.userInfo,
    shallowEqual
  );

  const navCatsState = useSelector(
    state => state.menuReducer.navCats,
    shallowEqual
  );

  const navCategoryState = useSelector(
    state => state.menuReducer.navCategory,
    shallowEqual
  );

  const distanceState = useSelector(
    state => state.categoryReducer.distance,
    shallowEqual
  );

  const geoLocationState = useSelector(
    state => state.geoLocationReducer.geoLocation,
    shallowEqual
  );

  /*  useEffect(() => {
    if (typeof localStorage !== undefined && !loginInfoState.default) {
      console.info("borop loginInfo", loginInfoState.default, loginInfoState);
      let countryCode = getCountryCode(
        loginInfoState.countryCode.toLowerCase()
      );

      localStorage.setItem("language", getLanguageServer(countryCode));
      localStorage.setItem("country", countryCode);
      dispatch(changeCountry(countryCode));
      dispatch(changeLanguage(getLanguageServer(countryCode)));
      dispatchContext({
        type: "setThroughServer",
        payload: countryCode
      });

      if (!location.pathname.includes(`/${langCode}/`)) {
        changeUrlwithLanguageChange(langCode, entryState, location);
      }
    }
  }, [loginInfoState]); */

  useEffect(() => {
    if (typeof localStorage !== undefined) {
      let localVariable = JSON.parse(
        localStorage.getItem("showAllProductsGlobal")
      );
      if (localVariable) {
        dispatch(setGlobalShowAllProducts(localVariable));
      }
    }
  }, []);

  //Change the directurlaccess state to false and determine which language to load...
  useEffect(() => {
    if (typeof localStorage !== undefined) {
      //  if (entryState === true) {
      //   if (!localStorage.getItem("language")) {
      //     let temp = location.pathname.split("/").filter(temp => {
      //       if (temp != "" && temp != "preview") {
      //         return true;
      //       } else {
      //         return false;
      //       }
      //     })[0];
      //     if (
      //       !mapCountryList.filter(trans => {
      //         if (trans === temp) {
      //           return true;
      //         } else {
      //           return false;
      //         }
      //       }).length > 0
      //         ? true
      //         : false
      //     ) {
      //       temp = "en";
      //     }
      //     dispatchContext({ type: "setLanguage", payload: temp });
      //   }
      // }
      let currencyStorage = "CAD"; //localStorage.getItem("currency");

      // let languageStorage = localStorage.getItem("language");
      // if (!languageStorage) {
      //   localStorage.setItem("language", languageState);
      //   languageStorage = "en";
      // }
      // let countryStorage = localStorage.getItem("country");
      // if (!countryStorage) {
      //   countryStorage = "global";
      //   localStorage.setItem("country", countryStorage);
      // }
      // if (!currencyStorage) {
      //   localStorage.setItem("currency", currencyState);
      //   currencyStorage = currencyDefine(countryStorage);
      // }
      dispatchContext({
        type: "setCurrencyOnly",
        payload: currencyStorage
      });

      // dispatch(changeCountry(countryStorage));

      /* if (localStorage.getItem("language") !== langCode) {
        dispatchContext({
          type: "setOnlyLanguage",
          payload: localStorage.getItem("language")
        });
      }

      dispatch(changeLanguageFromFunction(languageStorage));
      if (
        !location.pathname.includes(`/${localStorage.getItem("language")}/`)
      ) {
        dispatchContext({
          type: "setOnlyLanguage",
          payload: localStorage.getItem("language")
        });
        dispatch(fetchMenu(location, languageStorage));
      } else {
        dispatch(fetchMenu(location, languageStorage));
      } */
      //dispatch(fetchByStyle());
      dispatch(fetchLogin());

      let userDataStorage = localStorage.getItem("userLocation");
      console.info("userDataStorage", userDataStorage);
      if (!userDataStorage || userDataStorage.length < 10) {
        //   dispatch(fetchUserData("", langCode));
      } else {
        dispatch(
          loginUserDataInitial(JSON.parse(localStorage.getItem("userLocation")))
        );
      }

      let userDistance = localStorage.getItem("geoDistance");
      if (userDistance) {
        dispatch(setDynamicContentAction(!isNaN(userDistance)));
        dispatch(updateUserDistance(JSON.parse(userDistance)));
      }

      let geoLocationStorage = localStorage.getItem("userLocationGoogleAPI");
      if (!geoLocationStorage || geoLocationStorage.length < 10) {
        // TODO
      } else {
        let geoLocationObj = JSON.parse(geoLocationStorage);
        geoLocationObj.initial = true;
        dispatch(setGeoLocationState(geoLocationObj));
      }

      dispatch(updateCurrency(currencyStorage));
      dispatch(setInitialLoadAction(false));
    }
  }, []);

  /* useEffect(() => {
    if (typeof localStorage !== undefined) {
      let languageStorage = localStorage.getItem("language");
      let count = 0;
      if (!entryState && languageButtonState && count == 0) {
        count++;
        dispatch(fetchMenu(location, languageStorage));
        changeUrlwithLanguageChange(langCode, entryState, location);
      }
      return () => {
        count = 0;
      };
    }
  }, [langCode, countryCode]); */

  /*  useEffect(() => {
    if (
      (geoLocationState !== "" && distanceState !== null) ||
      distanceState !== null
    ) {
      dispatch(setDynamicContentAction(true));
    } else {
      dispatch(setDynamicContentAction(false));
    }
  }, [geoLocationState, distanceState]); */

  return null;
};

export default Common;
