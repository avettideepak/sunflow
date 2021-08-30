import React, { useContext, useLayoutEffect, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import Loading from "../../AC-Loading/Loading.jsx";
import encodeConverter from "../../../functions/htmldecoder";
import Async from "react-code-splitting";
import Grid from "@material-ui/core/Grid";
import "../Styles/StoreCategoryHeader.css";
import banner from "../../../assets/img/banners/example-banner.jpg";
import StarIcon from "@material-ui/icons/Star";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import StoreFacetsStore from "../../AC-CategoryPage/components/AC-Facets/BDFacetNewStore";
import fbLogo from "../../../assets/img/sellerFB.png";
import twLogo from "../../../assets/img/sellerTW.png";
import igLogo from "../../../assets/img/sellerIG.png";
import ptLogo from "../../../assets/img/sellerPT.png";
import Dbanner from "../../../assets/img/1548674942fr.jpg";
import HelmetSeo from "../../../shared/components/AC-Helmet/HelmetSeo";
import { navigate } from "@reach/router";
import { I18nContext } from "../../../i18n";
import { handleReplaceImagesWithLargeImagesOnError } from "../../../functions/Utilities.js";
import { setGoBackToCategoryFromProductPage } from "../../../redux/actions/categoryActions.js";
import ChatTheSellerNew from "../../AC-ProductPage/Components/ChatTheSeller/ChatTheSellerNew";

import CollectionFacetsStore from "../../AC-CategoryPage/components/AC-Facets/CollectionFacetsStore";

const CategoryBreadcrumb = () => (
  <Async load={import("../../AC-Breadcrumb/CategoryBreadcrumb.jsx")} />
);

export default function StoreCategoryHeaderStore({
  data,
  storeSellerData,
  pickupLocData,
  supplierShippingInfo,
  sellerHaveNoProducts
}) {
  console.info(
    "header store DATA",
    data,
    pickupLocData,
    supplierShippingInfo,
    storeSellerData
  );

  const dispatch = useDispatch();
  const categoryNameState = data.name;
  const { translate } = useContext(I18nContext);
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

  const cidN = data.cid;
  const cidCode = data.code;

  const handleAboutTabs = newTabID => {
    var tabs = document.getElementsByClassName("aboutTab");
    var tabBodies = document.getElementsByClassName("tabBody");

    for (var x = 0; x < tabs.length; x++) {
      tabs[x].classList.remove("activeTab");
    }
    for (var x = 0; x < tabBodies.length; x++) {
      tabBodies[x].classList.add("hidden");
    }

    var newTab = document.getElementById(newTabID + "Tab");
    var newTabBody = document.getElementById(newTabID);

    newTab.classList.add("activeTab");
    newTabBody.classList.remove("hidden");
  };

  useEffect(() => {
    dispatch(setGoBackToCategoryFromProductPage(true));
    return () => {
      setGoBackToCategoryFromProductPage(false);
    };
  }, []);


  let imageUrl =
    data.image.replace("https://s3.ca-central-1.amazonaws.com/demob2b2cs3.avetti.ca/store/20180522154/assets/items/images", "https://demofurnituremarketplace.avetti.io/preview/store/20180522154/assets/items/largeimages") +
    `?tr=ar-1-1,dpr-2,pr-true,f-auto,w-220`;
  console.log("IMAGE KIT", imageUrl);
  if (imageUrl.includes("sls3.avetti.ca")) {
    imageUrl = imageUrl.replace(
      "sls3.avetti.ca",
      "demob2b2cs3.avetti.ca/store"
    );
  }

  var mapsLink;
  if (
    storeSellerData &&
    Object.keys(storeSellerData).includes("location") &&
    storeSellerData.location
  ) {
    mapsLink = "https://www.google.ca/maps/search/" + storeSellerData.location;
  } else {
    mapsLink = "";
  }

  const handleMeeting = () => {
    if (typeof window !== "undefined") {
      if (window.location.pathname.includes("/stores/ashley")) {
        window.Calendly.initPopupWidget({ url: 'https://calendly.com/sivak-1/15min?month=2021-06' });
      }
      else if (window.location.pathname.includes("/stores/home-town")) {
        window.Calendly.initPopupWidget({ url: 'https://calendly.com/sivak-1/15min?month=2021-06' });
      }
      else if (window.location.pathname.includes("/stores/casacraft")) {
        window.Calendly.initPopupWidget({ url: 'https://calendly.com/sivak-1/15min?month=2021-06' });
      }
      return false;
    }
  }

  const imageToRender = () => {
    let storeImage = "";
    if (categoryNameState === "Ashley") {
      storeImage = "https://ik.imagekit.io/ofb/dev//store/20180522154/assets/items/largeimages/AINP1UIUR0.jpg";
      return storeImage;
    }
    else if (categoryNameState === "Home Town") {
      storeImage = "https://ik.imagekit.io/ofb/dev//store/20180522154/assets/items/largeimages/AIN3MZAKU2.jpg";
      return storeImage;
    }

    else if (categoryNameState === "CasaCraft") {
      storeImage = "https://ik.imagekit.io/ofb/dev//store/20180522154/assets/items/largeimages/AIN3MZAKU2.jpg";
      return storeImage;
    }
    else return null;
  }

  return (
    <React.Fragment>
      <div className="myContainerNew single-place">
        <div className="storeInfoMainSnapshot">

        <h3 class="collectionFacetsTitle">Store Snapshot</h3>

          {storeSellerData && (
            <div className="storeSnapshot">

              <div className="place-booking booking-info ">

                <div className="inner-booking">

                  <div className="contact-detail">
                    <div className="place-contact place-area">
                    
                      <div className="entry-detail"> 
                        <ul>
                          <li>
                            <i className="material-icons large">access_time</i>
                            <a href={mapsLink} target="_blank">
                              {storeSellerData &&
                                Object.keys(storeSellerData).includes("year") &&
                                storeSellerData.year != "" &&
                                <p>

                                  Established{" "}
                                  {storeSellerData &&
                                    Object.keys(storeSellerData).includes("year") &&
                                    storeSellerData.year}{" "}

                                </p>
                              }</a>
                          </li>
                          <li>
                            <i className="material-icons large">map</i>
                            <a href={mapsLink} target="_blank">{storeSellerData &&
                              Object.keys(storeSellerData).includes("location") &&
                              storeSellerData.location != "" ? (
                              <p>
                                {" "}
                                {storeSellerData &&
                                  Object.keys(storeSellerData).includes("location") &&
                                  storeSellerData.location}

                              </p>
                            )
                              :
                              null
                            }</a>
                          </li>

                          <li>
                            <i className="material-icons large">phone_forwarded</i>
                            <a href="#">{storeSellerData &&
                              Object.keys(storeSellerData).includes("phone_number") &&
                              storeSellerData.phone_number != "" ? (
                              <p>
                                {" "}
                                {storeSellerData &&
                                  Object.keys(storeSellerData).includes("phone_number") &&
                                  storeSellerData.phone_number}
                              </p>
                            )
                              :
                              null
                            }</a>
                          </li>
                          <li>
                            <i className="material-icons large">person_pin_circle</i>
                            <a href="#">{storeSellerData &&
                              Object.keys(storeSellerData).includes("year") &&
                              storeSellerData.year != "" &&
                              <a href={storeSellerData.pinterest}>
                                <span>{storeSellerData &&
                                  Object.keys(storeSellerData).includes("city") &&
                                  storeSellerData.city}</span>
                              </a>



                            }</a>
                          </li>

                          {/* <li>
                            <i class="fas fa-globe-europe large"></i>
                            {storeSellerData &&
                              Object.keys(storeSellerData).includes("website") &&
                              storeSellerData.website != null ? (
                              <p>
                                {" "}
                                <a
                                  href={storeSellerData.website}
                                  target="_blank"
                                >
                                  {storeSellerData.website}
                                </a>
                              </p>
                            )
                              :
                              null
                            }
                          </li> */}
                        </ul>
                      </div>
                      <div className="button-contact">
                        <div className="golo-button">
                          <ChatTheSellerNew storeSellerData={storeSellerData} />
                        </div>
                        <div className="btn-send-message">
                          <a className="btn-open-popup gl-button" onClick={handleMeeting}>Book A Meeting</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
