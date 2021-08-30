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
import StoreFacetsStore from "../../AC-CategoryPage/components/AC-Facets/BDFacetNewStore.jsx";
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
import { Link } from "gatsby";
import MallMapModal from "@components/AC-MallMap/MallMapModal/MallMapModal"
// import WordLimit from 'react-word-limit';

import call_store from "@assets/img/call_store.png"
import interactive_map from "@assets/img/interactive_map.png"
import location_pin from "@assets/img/location_pin.png"
import wall_clock from "@assets/img/wall_clock.png"
import web from "@assets/img/web.png"




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

  // useLayoutEffect(() => {
  //   if (storeSellerData) {

  //     if (pickupLocData && pickupLocData.length > 0 && pickupLocData && pickupLocData.length === 0) {
  //       var pickUpDiv = document.getElementById("pickUpData");
  //       pickUpDiv.innerHTML = "";

  //       for (var x = 0; x < pickupLocData.length; x++) {
  //         var tempHTML =
  //           "<p  className='pickupDataBox'><strong>" +
  //           pickupLocData[x].pickup_location_name +
  //           "</strong><br/>" +
  //           pickupLocData[x].address_place +
  //           " - <a target='_blank' href='https://www.google.com/maps/dir/here/" +
  //           pickupLocData[x].latitude +
  //           "," +
  //           pickupLocData[x].longitude +
  //           "'>Get Directions</a>";

  //         if (pickupLocData[x].time != null) {
  //           tempHTML =
  //             tempHTML +
  //             "<br/><strong>Hours:</strong> " +
  //             pickupLocData[x].time;
  //         }

  //         if (pickupLocData[x].additional_information != null) {
  //           tempHTML =
  //             tempHTML +
  //             "<br/><strong>Additional Info:</strong> " +
  //             pickupLocData[x].additional_information;
  //         }

  //         tempHTML = tempHTML + "</p>";

  //         pickUpDiv.innerHTML = pickUpDiv.innerHTML + tempHTML;
  //       }
  //     } else {
  //       var pickupTab = document.getElementById("pickupInfoTab");
  //       pickupTab.classList.add("hidden");
  //     }

  //     if (supplierShippingInfo && supplierShippingInfo.length > 0) {
  //       var shippingDiv = document.getElementById("shippingData");
  //       shippingDiv.innerHTML = "";

  //       var tempHTML = "<p><strong>Ships:</strong> ";

  //       if (supplierShippingInfo[0].shipping_type == 0) {
  //         var shippingTab = document.getElementById("shippingInfoTab");
  //         shippingTab.classList.add("hidden");
  //       } else if (supplierShippingInfo[0].shipping_type == 1) {
  //         tempHTML = tempHTML + "Worldwide";
  //       } else if (supplierShippingInfo[0].shipping_type == 2) {
  //         tempHTML = tempHTML + "Within Canada";
  //       } else if (supplierShippingInfo[0].shipping_type == 3) {
  //         if (storeSellerData.province) {
  //           tempHTML = tempHTML + "Within " + storeSellerData.province;
  //         } else {
  //           tempHTML = tempHTML + "Within Province";
  //         }
  //       } else if (supplierShippingInfo[0].shipping_type == 4) {
  //         tempHTML =
  //           tempHTML + "Within " + supplierShippingInfo[0].range + "KM";
  //       }

  //       tempHTML = tempHTML + "</p>";

  //       if (
  //         supplierShippingInfo[0].instructions &&
  //         supplierShippingInfo[0].instructions != null
  //       ) {
  //         tempHTML =
  //           tempHTML +
  //           "<p><strong>Additional Info:</strong> " +
  //           supplierShippingInfo[0].instructions +
  //           "</p>";
  //       }

  //       shippingDiv.innerHTML = tempHTML;
  //     } else {
  //       var shippingTab = document.getElementById("shippingInfoTab");
  //       shippingTab.classList.add("hidden");
  //     }
  //   }
  // }, []);

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
      if (window.location.pathname.includes("/stores/otiad")) {
        window.Calendly.initPopupWidget({ url: 'https://calendly.com/avettisupplier3/30min?hide_event_type_details=1' });
      }
      else if (window.location.pathname.includes("/stores/ahmet")) {
        window.Calendly.initPopupWidget({ url: 'https://calendly.com/avettisupplier2-1/30min?hide_event_type_details=1' });
      }
      else if (window.location.pathname.includes("/stores/abakli")) {
        window.Calendly.initPopupWidget({ url: 'https://calendly.com/avettisupplier1/30min?hide_event_type_details=1' });
      }
      else {
        window.Calendly.initPopupWidget({ url: 'https://calendly.com/avetti/30min?hide_event_type_details=1' });
      }
      return false;
    }
  }

  const imageToRender = () => {
    let storeImage = "";
    if (categoryNameState === "Ashley") {
      storeImage = "https://ik.imagekit.io/ofb/mall/1_O5PLTgkp9FZFUiWyl0EMNA_s9-swsStV.jpeg";
      return storeImage;
    }
    else if (categoryNameState === "Home Town") {
      storeImage = "https://ik.imagekit.io/ofb/mall/1_O5PLTgkp9FZFUiWyl0EMNA_s9-swsStV.jpeg";
      return storeImage;
    }

    else if (categoryNameState === "CasaCraft") {
      storeImage = "https://ik.imagekit.io/ofb/mall/1_O5PLTgkp9FZFUiWyl0EMNA_s9-swsStV.jpeg";
      return storeImage;
    }
    else return null;
  }

  return (
    <React.Fragment>
      <div className="myContainerNew single-place">
        <div className="storeInfoWrapper">

          <div className="storeLogo" style={{
            // background: `url(${imageToRender()})`,
            // backgroundPosition: "bottom",
            // backgroundRepeat: "no-repeat",
            // backgroundSize: "cover"
          }}>
            <div className="storeLogo-overlay">
              <div className="storeLogo-overlay-inner1">
                <h1 className="storeNameHeader">{categoryNameState}</h1>
                <div className="storeDescHeaderWrapper">
                  {/* <p className="storeDescHeader"><WordLimit limit={600}>{storeSellerData && storeSellerData.description}</WordLimit></p> */}
                  {/* <p className="storeDescHeader">{storeSellerData && storeSellerData.description}</p> */}
                  {/* <div className="storeSocialIcons">
                    {storeSellerData && storeSellerData.facebook ? (
                      <a href={storeSellerData.facebook} target="_blank">

                        <i className="fa fa-facebook-f shareIcons"></i>
                      </a>
                    ) : null}
                    {storeSellerData && storeSellerData.twitter ? (
                      <a href={storeSellerData.twitter} target="_blank">
                        
                        <i className="fa fa-twitter shareIcons"></i>
                      </a>
                    ) : null}
                    {storeSellerData && storeSellerData.instagram ? (
                      <a href={storeSellerData.instagram} target="_blank">
                        
                        <i className="fa fa-instagram shareIcons"></i>
                      </a>
                    ) : null}
                    {storeSellerData && storeSellerData.pinterest ? (
                      <a href={storeSellerData.pinterest} target="_blank">
                        
                        <i className="fa fa-pinterest-p shareIcons"></i>
                      </a>
                    ) : null}
                  </div> */}
                </div>
              </div>
              {/* <div className="storeLogo-overlay-inner2">

              </div> */}
            </div>

          </div>

          <div className="store-info">
            <div className="store-info-inner-1">
              <p>{storeSellerData && storeSellerData.description}</p>
            </div>
            <div className="store-info-inner-2">
              {
                storeSellerData && storeSellerData.phone_number && (
                  <div className="store-info-inner-2__data">
                    <img src={call_store} alt="Image" />
                    <p>{storeSellerData.phone_number}</p>
                  </div>
                )
              }
              {
                storeSellerData && storeSellerData.website && (
                  <div className="store-info-inner-2__data">
                    <img src={web} alt="Image" />
                    <p>{storeSellerData.website}</p>
                  </div>
                )
              }
              {
                storeSellerData && storeSellerData.location && (
                  <div className="store-info-inner-2__data">
                    <img src={location_pin} alt="Image" />
                    <p>{storeSellerData.location}</p>
                  </div>
                )
              }
              <div className="store-info-inner-2__data">
                <img src={wall_clock} alt="Image" />
                <p>09 : 00 AM - 11 : 00 PM</p>
              </div>
              <div className="store-info-inner-2__data">
                <img src={interactive_map} alt="Image" />
                {/* <p><Link to="/interactive-mall-map">View Interactive Map</Link></p> */}
                <MallMapModal
                  vendorId={storeSellerData.supplier_vendorId}
                  linkText="View Interactive Map"
                />
              </div>
            </div>
          </div>
          <div className="store-divider"></div>

          {/* <CollectionFacetsStore/> */}



          {/* {sellerHaveNoProducts && (
            <div
              className="seller-have-no-products-wrapper"
              style={{ margin: "50px 5%" }}
            >
              <h4>
                Sorry this seller has pickup locations that are more than 200 KM
                away and does not ship to your location or has not listed their
                products yet. Chat with them to learn more about what they
                offer.
              </h4>
              <div className="chat-wrapper" style={{ maxWidth: "400px" }}>
                <ChatTheSeller storeSellerData={storeSellerData} />
              </div>
            </div>
          )} */}
        </div>
      </div>
    </React.Fragment>
  );
}
