import React, { useEffect, useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import Loading from "../../AC-Loading/Loading.jsx";
import encodeConverter from "../../../functions/htmldecoder";
import Async from "react-code-splitting";
import Grid from "@material-ui/core/Grid";
import "../Styles/StoreCategoryHeader.css";
import banner from "../../../assets/img/banners/example-banner.jpg";
import StarIcon from "@material-ui/icons/Star";
import StarHalfIcon from "@material-ui/icons/StarHalf";

import HelmetSeo from "../../../shared/components/AC-Helmet/HelmetSeo";

import {
  backToCategory,
  fetchCategoryFromDirectUrl,
  fetchCategoryFromRender
} from "../../../redux/actions/categoryActions";
import { setSelectedStoreAction } from "../../../redux/actions/storesAction";
import { GET_ITEM_LINK } from "../../../redux/links";

import { PROJECT_LINK, PREVIEW } from "../../../project-config";
import { navigate, useLocation } from "@reach/router";
import { I18nContext } from "../../../i18n";

const CategoryBreadcrumb = () => (
  <Async load={import("../../AC-Breadcrumb/CategoryBreadcrumb.jsx")} />
);

export default function StoreCategoryHeader() {
  const location = useLocation();
  const dispatch = useDispatch();

  const categoryNameState = useSelector(
    state => state.categoryReducer.cat,
    shallowEqual
  );

  const facetFilter = useSelector(
    state => state.facetReducer.filterUrl,
    shallowEqual
  );

  const storesState = useSelector(
    state => state.storeReducer.stores,
    shallowEqual
  );

  const categoryImageState = useSelector(
    state => state.categoryReducer.catImage,
    shallowEqual
  );

  const languageState = useSelector(
    state => state.mainReducer.lang,
    shallowEqual
  );

  const selectedStoreState = useSelector(
    state => state.storeReducer.selectedStore,
    shallowEqual
  );

  const cidN = useSelector(state => state.categoryReducer.cidN, shallowEqual);

  /*Checking Category Name with URL Location if not match fetch the data again
  This funtion is for back button helper*/
  useEffect(() => {
    if (categoryNameState) {
      let nameState = categoryNameState;
      if (categoryNameState.includes("&amp;")) {
        nameState = categoryNameState.replace("&amp;", "&");
      }
      if (nameState.includes("&")) {
        nameState = nameState.replace(new RegExp(/[&]/g), "-");
      }

      if (nameState.includes(" ")) {
        nameState = nameState.replace(new RegExp(/[ ]/g), "-");
      }

      if (nameState.includes("-")) {
        nameState = nameState.replace(new RegExp(/-{2,}/g), "-");
      }

      let historyName = location.pathname.replace(`${PREVIEW}/shop/`, "");

      historyName = historyName.split("/");
      if (historyName[historyName.length - 1] != "") {
        historyName = historyName[historyName.length - 1];
      } else {
        historyName = historyName[historyName.length - 2];
      }

      nameState = nameState.toLowerCase();
      console.info("tuna 2", nameState, historyName);

      if (historyName != nameState) {
        console.info("borop3", historyName, nameState);
        console.info("category- triggered here", historyName, nameState);
        dispatch(fetchCategoryFromDirectUrl());
      }
    }
    console.info("tuna", location.pathname);
  }, [location.pathname]);

  const capital_letter = str => {
    str = str.split(" ");

    for (let i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
  };

  useEffect(() => {
    let storeTitleAsAppearOnUrl = location.pathname.split(`/stores/`)[1];
    if (storesState && storesState.length > 0) {
      let foundStore = storesState.find(
        store =>
          store.title.replace(/ /g, "-").toLowerCase() ==
          storeTitleAsAppearOnUrl
      );
      console.info("tuna found", storeTitleAsAppearOnUrl);
    } else {
      dispatch(fetchCategoryFromDirectUrl());
    }
    if (
      !facetFilter.includes(
        capital_letter(storeTitleAsAppearOnUrl.split("-").join(" "))
      )
    ) {
      dispatch(fetchCategoryFromDirectUrl());
    }
  }, [location.pathname]);

  useEffect(() => {
    let storeTitleAsAppearOnUrl = location.pathname.split(`/stores/`)[1];
    console.info("storeName", storeTitleAsAppearOnUrl);
    // Get the selected store using the pathname

    if (storesState && storesState.length > 0) {
      console.info("selected store 4 ##", storesState);

      let foundStore = storesState.find(
        store =>
          store.title.replace(/ /g, "-").toLowerCase() ==
          storeTitleAsAppearOnUrl
      );

      if (foundStore) {
        fetch(
          GET_ITEM_LINK.replace("$ITEMREPLACE", foundStore.id).replace(
            "$LANGUAGE",
            languageState
          )
        )
          .then(res => res.json())
          .then(json => {
            console.info("selected store 5 @@", json);
            dispatch(setSelectedStoreAction(json.__Result[0]));
          })
          .catch(err => {
            console.info("selected store ERROR", err);
          });
      } else {
        dispatch(setSelectedStoreAction(null));
      }
    }
  }, [location.pathname, storesState]);

  console.info("selected store", selectedStoreState);
  if (selectedStoreState) {
    let imageUrl = selectedStoreState.cimage;
    if (imageUrl.includes("sls3.avetti.ca")) {
      imageUrl = imageUrl.replace(
        "sls3.avetti.ca",
        "demob2b2cs3.avetti.ca/store"
      );
    }
    return (
      <React.Fragment>
        <HelmetSeo
          title={categoryNameState}
          desc={categoryNameState}
          cid={cidN}
        />
        <div className="myContainer">
          {/* <img className="banner" src={banner}></img> */}
          <div className="storeInfoWrapper">
            <div className="storeLogo">
              <img src={imageUrl}></img>
            </div>
            <div className="storeInfoMain">
              <h1 className="storeName">{selectedStoreState.title}</h1>
              {/*   <p className="storeLocation">
                From Barrie, Ontario to the world!!!!
              </p>
              <div className="reviewsRating">
                <div className="reviewStars">
                  <StarIcon style={{ fontSize: 20 }} />
                  <StarIcon style={{ fontSize: 20 }} />
                  <StarIcon style={{ fontSize: 20 }} />
                  <StarIcon style={{ fontSize: 20 }} />
                  <StarHalfIcon style={{ fontSize: 20 }} />
                </div>
                <div className="reviewsRatingText">
                  <p>
                    4.5 from 32{" "}
                    <a href="#" className="seeReviews">
                      Reviews
                    </a>
                  </p>
                </div>
              </div> */}
            </div>
            <div
              className="storeDescription"
              dangerouslySetInnerHTML={{ __html: selectedStoreState.longdesc }}
            ></div>
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <HelmetSeo
          title={categoryNameState}
          desc={categoryNameState}
          cid={cidN}
        />
        <div className="myContainer">
          {/* <img className="banner" src={banner}></img> */}
          <div className="storeInfoWrapper">
            <div className="storeLogo">
              <div
                style={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: "50%",
                  height: "64px",
                  width: "64px"
                }}
              ></div>
            </div>
            <div
              style={{ backgroundColor: "#f5f5f5", height: "34px" }}
              className="storeInfoMain"
            ></div>
            {/*   <div
              className="storeDescription"
              style={{ backgroundColor: "#f5f5f5", height: "120px" }}
            ></div> */}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
