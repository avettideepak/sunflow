/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import "../../assets/css/products-ac.css";
import { Link } from "gatsby";
import ImageCarousel from "./Components/ImageCarousel/ImageCarousel";
import ReviewBar from "./Components/Review/ReviewBar";
import ReviewBarMobile from "./Components/Review/ReviewBarMobile";
import Attributes from "./Components/Attributes/BDAttributes";
import AddToCartBox from "./Components/AddToCart/AddToCartBox";
import AddToCartBoxNew from "./Components/AddToCart/AddToCartBoxNew";
import AddedToCartModal from "./Components/AddToCart/Components/AddedToCartModal";
import Reviews from "./Components/Review/components/Reviews";
import ShareButtonsNew from "./Components/ShareButtons/ShareButtonsNew";
import htmldecoder, { htmlDecode } from "../../functions/htmldecoder";
import CheckBoxAddons from "./Components/CheckBoxAddons/CheckBoxAddons";
import ShareButtons from "./Components/ShareButtons/ShareButtons";
import SupplierInfoDetailed from "./Components/SupplierInfo/SupplierInfoDetailed";
import WishListBar from "./Components/WishList/WishListBar";
import ItemCode from "./Components/ItemCode/ItemCode";
import OtherInfoTab from "./Components/OtherInfoTab/OtherInfoTab";
import MallMapModal from "@components/AC-MallMap/MallMapModal/MallMapModal";
import BestSellingProducts from "../AC-Main/BestSellingProducts";
import FeaturedProducts from "../AC-Main/FeaturedProducts";
import VistorInfo from "../AC-Main/Services/VistorInfo";



import ShareIcon from '@material-ui/icons/Share';
import Popover from "@material-ui/core/Popover";

import Breadcrumb from "./Components/Breadcrumb/Breadcrumb";
import { I18nContext } from "../../i18n/index";
import { navigate, useLocation } from "@reach/router";
import {
  changeTitleAndLongDesc,
  fetchDirectUrlGetItem,
  fetchingProductPriceInventory,
  fetchingProductRequestSaga,
  getSupplierInfo,
  mapProductUrls
} from "../../redux/actions/productAction";
import ConfirmDeliveryOptions from "./Components/AddToCart/Components/ConfirmDeliveryOptions/ConfirmDeliveryOptions";
import CartValidationErrors from "./Components/CartValidationErrors/CartValidationErrors";
import OutOfStockError from "./Components/CartValidationErrors/OutOfStockError";
import fbLogo from "../../assets/img/sellerFB.png";
import twLogo from "../../assets/img/sellerTW.png";
import igLogo from "../../assets/img/sellerIG.png";
import ptLogo from "../../assets/img/sellerPT.png";

import pdfIcon from "../../assets/img/pdfIcon.png";
import pdfFile from "../../assets/img/anatolia.pdf";

import { setGoBackToCategoryFromProductPage } from "../../redux/actions/categoryActions";
import { isArray } from "../../functions/Utilities";
import {
  addRecentItems,
  addRecentViewItemsAction
} from "../../redux/actions/recentlyViewedItemsActions";
import { PROJECT_LINK } from "../../project-config";

import RecentlyViewedItems from "../AC-RecentlyViewedItems/RecentlyViewedItems"

const OFBProductPage = ({ data, storeInfo, dynamic }) => {
  const { translate, langCode } = React.useContext(I18nContext);
  const location = useLocation();


  const loginNameState = useSelector(
    state => state.loginReducer.loginName,
    shallowEqual
  );
  const handleLogin = () => {
    document.getElementById("login-icon-btn").click();
  };

  const dispatch = useDispatch();

  if (!location.pathname.includes("ain")) {
    navigate("/");
  }
  console.info("dynamic", !!dynamic);
  console.log("storeInfostoreInfostoreInfo", storeInfo, data);
  /*  useEffect(() => {
    if (!data) {
      let productUrl = location.pathname;
      dispatch(setGoBackToCategoryFromProductPage(true));
      if (productUrl.charAt(productUrl.length - 1) === "/") {
        productUrl = productUrl.substring(0, productUrl.length - 1);
      }
      fetch(`${PROJECT_LINK}/product${productUrl}?tpt=json_en`)
        .then(res => res.json())
        .then(json => {
          console.log(
            "productpage router fetch",
            json,
            json[0].id,
            `${PROJECT_LINK}/product${productUrl}?tpt=json_en`
          );
          setTitleState(json[0].title);

          let tempJson = json && json[0];
          tempJson.productLink = productUrl;

          dispatch(changeTitleAndLongDesc(tempJson));

          dispatch(fetchingProductRequestSaga(json[0].id));

          dispatch(fetchingProductPriceInventory(json[0].id));
        })
        .catch(err => {
          console.error("err productpage fetch item", err);
          navigate("/");
        });

      return () => {
        dispatch(setGoBackToCategoryFromProductPage(false));
      };
    }
  }, []); */

  const [titleState, setTitleState] = useState("");
  const [enquiryModalState, setEnquiryModalState] = useState(false);

  const [supplierName, setSupplierName] = React.useState("");
  const [supplierCity, setSupplierCity] = React.useState("");
  const [hiddenProperties, setHiddenProperties] = React.useState([]);

  const isAddToCart = hiddenProperties[0] && hiddenProperties[0].propname == "ADDTOCART";

  console.log('hhhhhhhhhhhh', isAddToCart);

  const itemDetailState = useSelector(
    state => state.productReducer.itemDetail,
    shallowEqual
  );

  const ItemCodeState = useSelector(
    state => state.productReducer.itemDetail.code,
    shallowEqual
  );

  const recentViewItemsState = useSelector(
    state => state.recentlyViewedItemsReducer.recentlyViewedItemsList,
    shallowEqual
  );

  const itemDetailIdState = useSelector(
    state => state.productReducer.itemDetail.itemid,
    shallowEqual
  );

  const productInitialStateFromFetch = useSelector(
    state => state.productReducer.productInitial,
    shallowEqual
  );

  const supplierInfoReducer = useSelector(
    state => state.productReducer.supplierInfo,
    shallowEqual
  );

  const priceState = useSelector(
    state => state.productReducer.priceInventory,
    shallowEqual
  );

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "share-popover" : undefined;

  React.useEffect(() => {
    if (!data && supplierInfoReducer.length > 0) {
      if (supplierInfoReducer[0].distributorOrder.length > 0) {
        setSupplierName(supplierInfoReducer[0].distributorOrder[0].name);
        setSupplierCity(supplierInfoReducer[0].distributorOrder[0].city);
      }
    }
  }, [supplierInfoReducer]);

  useEffect(() => {
    console.info("RENDER++", itemDetailState.code);
    if (typeof window !== undefined && itemDetailIdState) {
      dispatch(getSupplierInfo(itemDetailIdState));
      window.scrollTo(0, 0);
    }
  }, [itemDetailIdState]);

  useEffect(() => {
    if (!data && productInitialStateFromFetch.title != "") {
      /*  if (productInitialState != "") {
        setTitleState(itemDetailsTitleState);
      } else { */
      setTitleState(productInitialStateFromFetch.title);
      /*       } */
    }
  }, [productInitialStateFromFetch /* , itemDetailsTitleState */]);

  // recently viewed items related TEST
  useEffect(() => {
    if (!data && itemDetailIdState && priceState && priceState.prices) {
      console.info("BURAYABAKARLAR2", itemDetailIdState, priceState);

      let itemDetailsTemp = {
        ...itemDetailState
      };
      let {
        itemId: id,
        title,
        currency_sign = "$",
        image,
        image3: itemLargeImage,
        url = location.pathname.replace("/preview", "")
      } = itemDetailsTemp;
      title = title.length > 40 ? title.substr(0, 40).concat(" ...") : title;
      let tempPrice = priceState.prices[0].listprice.toFixed(2);
      tempPrice = tempPrice.split(".");
      let price = {
        type: "default",
        value: {
          decimal: tempPrice[1],
          integer: tempPrice[0]
        }
      };
      itemLargeImage = itemLargeImage.substring(
        itemLargeImage.indexOf("/store"),
        itemLargeImage.length
      );

      let previouslyAddedItem = recentViewItemsState.filter(
        item => item.id == id
      )[0];

      console.info("BURAYABAKARLAR3", previouslyAddedItem);

      if (previouslyAddedItem) {
        if (previouslyAddedItem.url != url && previouslyAddedItem.id == id) {
          return;
        }
      }

      if (recentViewItemsState.length >= 10) {
        let tempRecentViewItemsState = recentViewItemsState.filter((v, i) => {
          if (i == 0) {
            return false;
          }
          return true;
        });
        console.info("qwerty", tempRecentViewItemsState, recentViewItemsState);
        dispatch(
          addRecentItems([
            ...tempRecentViewItemsState.filter(item => item.id != id),
            {
              id,
              title,
              currency_sign,
              image,
              itemLargeImage,
              price,
              url
            }
          ])
        );
      } else {
        dispatch(
          addRecentViewItemsAction(
            id,
            title,
            currency_sign,
            image,
            itemLargeImage,
            price,
            url,
            recentViewItemsState
          )
        );
      }
    }
  }, [itemDetailIdState, priceState]);

  const productUnavailableState = useSelector(
    state => state.productReducer.productUnavilable,
    shallowEqual
  );


  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  const [swipeLoc, setSwipeLoc] = React.useState({
    start: 0,
    end: 0
  });

  const reviewsContainerRef = useRef();

  const [count, setCount] = useState(0);

  const [starFilter, setStarFilter] = useState([]);
  const [avgRating, setAvgRating] = useState({
    avgRating: 0,
    countOfEachStar: {},
    totalValue: 0
  });

  const [reviewsWithImages, setReviewsWithImages] = useState([]);

  useEffect(() => {
    if (typeof window !== undefined) window.scrollTo(0, 0);
    if (data) {
      dispatch(getSupplierInfo(data._0.id));
    } else {
      dispatch(getSupplierInfo(itemDetailIdState));
    }

    dispatch(setGoBackToCategoryFromProductPage(true));

    return () => {
      dispatch(setGoBackToCategoryFromProductPage(false));
    };

  }, []);

  /* useLayoutEffect(() => {
    console.info("PRODINDEX 222", data._0.breadcrumbs);
    const { left, right } = mapProductUrls(
      location.pathname,
      data._0.breadcrumbs[data._0.breadcrumbs.length - 1].url.replace(
        "shop/",
        ""
      )
    );
    if (typeof window !== undefined) {
      let start = 0;
      let end = 0;
      let startY = 0;
      let endY = 0;
      let touchTime = 0;
      let diff = 0;

      const touchStartEvent = e => {
        console.error("HELLO 1");
        if (e.changedTouches[0]) {
          start = e.changedTouches[0].screenX;
          startY = e.changedTouches[0].screenY;
          touchTime = new Date();
        }
      };

      const touchEndEvent = e => {
        console.error("HELLO 2");
        if (e.changedTouches[0]) {
          end = e.changedTouches[0].screenX;
          endY = e.changedTouches[0].screenY;
          diff = new Date() - touchTime;
          handleSwiper();
        }
      };

      const handleSwiper = () => {
        if (Math.abs(end - start) > Math.abs(endY - startY) && diff > 100) {
          if (end < start) {
            navigate(`/${left}`, { state: { directionCat: "left" } });
          } else if (end > start) {
            navigate(`/${right}`, { state: { directionCat: "right" } });
          }
        }
      };

      window.addEventListener("touchstart", touchStartEvent);

      window.addEventListener("touchend", touchEndEvent);

      return () => {
        window.removeEventListener("touchstart", touchStartEvent);
        window.removeEventListener("touchend", touchEndEvent);
      };
    }
  }, []);
 */
  useEffect(() => {
    if (count == 0 && typeof localStorage !== undefined) {
      setCount(count + 1);
      let languageStorage = localStorage.getItem("language");
      if (!languageStorage) {
        localStorage.setItem("language", langCode);
        languageStorage = "en";
      }
      let countryStorage = localStorage.getItem("country");
      if (!countryStorage) {
        countryStorage = "en";
        localStorage.setItem("country", countryStorage);
      }
      let url = location.pathname;
      if (url[url.length - 1] === "/") url = url.substr(0, url.length - 1);

      if (url.includes(`/${localStorage.getItem("language")}/`) === false) {
        dispatch(
          fetchDirectUrlGetItem(
            url,
            localStorage.getItem("language"),
            countryStorage
          )
        );
      } else {
        setCount(count + 1);
        dispatch(fetchDirectUrlGetItem(url, langCode, countryStorage));
      }
    }

    return () => {
      setCount(0);
    };
  }, [location.pathname, langCode]);

  useEffect(() => {
    let hiddenProperties = data
      ? data.productData._xResult[0].hiddenProperties
      : itemDetailState.hiddenProperties
    setHiddenProperties(hiddenProperties)
  }, [])

  // useEffect(() => {
  //   if (data) {
  //     var cartBox = document.getElementById("pickupShipInfo");
  //     cartBox.innerHTML = "";
  //     var tempPickupHTML = "";
  //     var tempShipHTML = "";

  //     console.log("cartBox", cartBox, storeInfo);

  //     if (storeInfo.pickupLocData && storeInfo.pickupLocData) {
  //       tempPickupHTML =
  //         "<div class='pickupShipInfo'><h2>Pickup Locations</h2><div class='pickupShipInfoBody pickup'>";
  //       if (!isArray(storeInfo.pickupLocData))
  //         storeInfo.pickupLocData = [
  //           {
  //             ...storeInfo.pickupLocData
  //           }
  //         ];
  //       for (var x = 0; x < storeInfo.pickupLocData.length; x++) {
  //         tempPickupHTML =
  //           tempPickupHTML +
  //           "<p class='pickupDataBox'><strong>" +
  //           storeInfo.pickupLocData[x].pickup_location_name +
  //           "</strong><br/>" +
  //           storeInfo.pickupLocData[x].address_place +
  //           " <br/> <a target='_blank' href='https://www.google.com/maps/dir/here/" +
  //           storeInfo.pickupLocData[x].latitude +
  //           "," +
  //           storeInfo.pickupLocData[x].longitude +
  //           "'>Get Directions</a>";

  //         if (storeInfo.pickupLocData[x].time != null) {
  //           tempPickupHTML =
  //             tempPickupHTML +
  //             "<br/><strong>Hours:</strong> " +
  //             storeInfo.pickupLocData[x].time;
  //         }

  //         if (storeInfo.pickupLocData[x].additional_information != null) {
  //           tempPickupHTML =
  //             tempPickupHTML +
  //             "<br/><strong>Additional Info:</strong> " +
  //             storeInfo.pickupLocData[x].additional_information;
  //         }

  //         tempPickupHTML = tempPickupHTML + "</p>";
  //       }

  //       tempPickupHTML = tempPickupHTML + "</div></div>";
  //     }

  //     if (
  //       storeInfo.supplierShippingInfo &&
  //       storeInfo.supplierShippingInfo.length > 0 &&
  //       storeInfo.supplierShippingInfo[0].shipping_type != 0
  //     ) {
  //       tempShipHTML =
  //         "<div class='pickupShipInfo'><h2>Shipping Info</h2><div class='pickupShipInfoBody'>";

  //       var tempShipHTML = tempShipHTML + "<p><strong>Ships:</strong> ";

  //       if (storeInfo.supplierShippingInfo[0].shipping_type == 1) {
  //         tempShipHTML = tempShipHTML + "Worldwide";
  //       } else if (storeInfo.supplierShippingInfo[0].shipping_type == 2) {
  //         tempShipHTML = tempShipHTML + "Within Canada";
  //       } else if (storeInfo.supplierShippingInfo[0].shipping_type == 3) {
  //         if (storeInfo.storeSellerData.province) {
  //           tempShipHTML =
  //             tempShipHTML + "Within " + storeInfo.storeSellerData.province;
  //         } else {
  //           tempShipHTML = tempShipHTML + "Within Province";
  //         }
  //       } else if (storeInfo.supplierShippingInfo[0].shipping_type == 4) {
  //         tempShipHTML =
  //           tempShipHTML +
  //           "Within " +
  //           storeInfo.supplierShippingInfo[0].range +
  //           "KM";
  //       }

  //       tempShipHTML = tempShipHTML + "</p>";

  //       if (
  //         storeInfo.supplierShippingInfo[0].instructions &&
  //         storeInfo.supplierShippingInfo[0].instructions != null
  //       ) {
  //         tempShipHTML =
  //           tempShipHTML +
  //           "<p><strong>Additional Info:</strong> " +
  //           storeInfo.supplierShippingInfo[0].instructions +
  //           "</p>";
  //       }

  //       tempShipHTML = tempShipHTML + "</div></div>";
  //     }

  //     cartBox.innerHTML = cartBox.innerHTML + tempPickupHTML;
  //     cartBox.innerHTML = cartBox.innerHTML + tempShipHTML;
  //   }
  // }, []);

  /*let imageUrl = storeInfo.storeSellerData.image;
  if (imageUrl.includes("sls3.avetti.ca")) {
    imageUrl = imageUrl.replace(
      "sls3.avetti.ca",
      "demob2b2cs3.avetti.ca/store"
    );
  }*/

  var mapsLink;
  if (
    storeInfo &&
    storeInfo.storeSellerData &&
    Object.keys(storeInfo.storeSellerData).includes("location") &&
    storeInfo.storeSellerData.location
  ) {
    mapsLink =
      "https://www.google.ca/maps/search/" + storeInfo.storeSellerData.location;
  } else {
    mapsLink = "";
  }

  return (
    <div id="item-page" className="item">
      <Breadcrumb back={true} />
      <div className="col s12">
        <div
          style={{
            marginTop: "30px"
          }}
        >
          <div className="item-main">
            <div id="mainGridDiv" className="item-top-row row">
              {isMobileState ? (
                <React.Fragment>
                  <p className="brandItem">
                    <span id="buyBoxDistName">
                      {data &&
                        data.supplierData &&
                        data.supplierData._xResult &&
                        data.supplierData._xResult.length > 0 &&
                        data.supplierData._xResult[0].distributorOrder &&
                        data.supplierData._xResult[0].distributorOrder.length >
                        0 &&
                        data.supplierData._xResult[0].distributorOrder[0].name
                        ? data.supplierData._xResult[0].distributorOrder[0].name
                        : ""}
                    </span>
                  </p>

                  {/* <ReviewBarMobile
                    avgRating={avgRating}
                    starFilter={starFilter}
                    setStarFilter={setStarFilter}
                    reviewsContainerRef={reviewsContainerRef}
                  /> */}

                  <div
                    id="js-item-title-267578"
                    className="regularTitle title itemTitle itemTitleMobile"
                    dangerouslySetInnerHTML={{
                      __html: htmldecoder(data.productData._xResult[0].title)
                    }}
                  ></div>
                </React.Fragment>
              ) : null}

              <div id="leftGrid">
                <ImageCarousel
                  productUnavailable={productUnavailableState}
                  code={
                    data ? data.productData._xResult[0].code : ItemCodeState
                  }
                  data={{
                    productCode: data
                      ? data.productData._xResult[0].code
                      : itemDetailState.code,
                    itemId: data ? data._0.id : itemDetailState.itemId,
                    hiddenProperties: data
                      ? data.productData._xResult[0].hiddenProperties
                      : itemDetailState.hiddenProperties,
                    title: data
                      ? data.productData._xResult[0].title
                      : itemDetailState.title,
                    url: data ? data.url : ""
                  }}
                  title={
                    data
                      ? data.productData._xResult[0].title
                      : itemDetailState.title
                  }
                  imageUrl={`https://preview.open4business.io/preview/store/20180522154/assets/items/images/${data
                    ? data.productData._xResult[0].code
                    : itemDetailState.code
                    }.jpg`}
                />

                {/* {!isMobileState && (
                  <ShareButtons
                    title={
                      data ? data.productData._xResult[0].title : undefined
                    }
                    imageUrl={
                      data
                        ? `https://preview.open4business.io/preview/store/20180522154/assets/items/images/${data.productData._xResult[0].code}.jpg`
                        : undefined
                    }
                  />
                )} */}
              </div>
              <div id="rightGrid">
                <div id="titleGrid">
                  {!isMobileState ? (
                    <React.Fragment>
                      <div
                        id="js-item-title-267578"
                        className="regularTitle title itemTitle itemTitleMobile"
                        dangerouslySetInnerHTML={{
                          __html: data
                            ? htmldecoder(data.productData._xResult[0].title)
                            : htmlDecode(titleState)
                        }}
                      ></div>
                      <div className="review-share-block">
                        {/* */}
                        <ItemCode
                          code={
                            data ? data.productData._xResult[0].code : ItemCodeState
                          }
                        />
                        {
                          hiddenProperties &&
                          hiddenProperties.map(hiddenProperty => {
                            console.log("hiddenProperty", hiddenProperty)
                            if (hiddenProperty.propname == "Curbside_Pickup") {
                              return (
                                <div className="shareWrapper" style={{ margin: "10px 0 2px 0" }}>
                                  <span className="shareWrapperText">
                                    {hiddenProperty.propname.replace("_", " ")} : {" "}
                                  </span>
                                  <span className="shareWrapperTextValue">Available</span>
                                </div>
                              )
                            }
                          })
                        }  

                        
                        {
                          !isAddToCart ? 
                          <div className="besideClassess">
                          <AddToCartBoxNew
                            data={data ? data : undefined}
                            productUnavailable={productUnavailableState}
                            priceInv={data ? data.priceInvData._xResult[0] : undefined}
                            storeInfo={storeInfo ? storeInfo : undefined}
                          />

                          <div className="Mapp">
                            <ReviewBar
                              avgRating={avgRating}
                              starFilter={starFilter}
                              setStarFilter={setStarFilter}
                              reviewsContainerRef={reviewsContainerRef}
                            />
                            <MallMapModal
                              vendorId={storeInfo && storeInfo.vendorId}
                              linkText="View store on Mall Map"
                            />
                          </div>
                        </div>
                        : null
                        }
                        
                      </div>

                    </React.Fragment>
                  ) : null}


                  {isMobileState ? (
                    <div className="besideClassess">
                      {
                        hiddenProperties &&
                        hiddenProperties.map(hiddenProperty => {
                          console.log("hiddenProperty", hiddenProperty)
                          if (hiddenProperty.propname == "Curbside_Pickup") {
                            return (
                              <div className="shareWrapper" style={{ margin: "2px 0 10px 0" }}>
                                <span className="shareWrapperText">
                                  {hiddenProperty.propname.replace("_", " ")} : {" "}
                                </span>
                                <span className="shareWrapperTextValue">Available</span>
                              </div>
                            )
                          }
                        })
                      }

                      {
                        !isAddToCart ? 
                        <>                  
                      <AddToCartBoxNew
                        data={data ? data : undefined}
                        productUnavailable={productUnavailableState}
                        priceInv={data ? data.priceInvData._xResult[0] : undefined}
                        storeInfo={storeInfo ? storeInfo : undefined}
                      />

                      <div className="Mapp">
                        <ReviewBar
                          avgRating={avgRating}
                          starFilter={starFilter}
                          setStarFilter={setStarFilter}
                          reviewsContainerRef={reviewsContainerRef}
                        />
                        <MallMapModal
                          vendorId={storeInfo.vendorId}
                          linkText="View store on Mall Map"
                        />
                      </div></>
                       : null 
                      } 
                    </div>
                  ) : null}

                  {/* <div className="col-xs-12 product-page-seller-info">
                    {!isMobileState ? (
                      <p>
                        <strong>{translate("js.item.available")}: </strong>
                        <span
                          id="buyBoxDistName"
                          style={{
                            fontWeight: "400"
                          }}
                        >
                          {data &&
                            data.supplierData &&
                            data.supplierData._xResult &&
                            data.supplierData._xResult.length > 0 &&
                            data.supplierData._xResult[0].distributorOrder &&
                            data.supplierData._xResult[0].distributorOrder
                              .length > 0 &&
                            data.supplierData._xResult[0].distributorOrder[0].name
                            ? data.supplierData._xResult[0].distributorOrder[0]
                              .name
                            : ""}
                          {supplierName ? supplierName : ""}
                        </span>
                      </p>
                    ) : null}
                    <p>
                      <strong>{translate("js.item.location")}: </strong>
                      <span
                        id="buyBoxDistLoc"
                        style={{
                          fontWeight: "400"
                        }}
                      >
                        {data &&
                          data.supplierData &&
                          data.supplierData._xResult &&
                          data.supplierData._xResult.length > 0 &&
                          data.supplierData._xResult[0].distributorOrder &&
                          data.supplierData._xResult[0].distributorOrder.length >
                          0 &&
                          data.supplierData._xResult[0].distributorOrder[0].city
                          ? data.supplierData._xResult[0].distributorOrder[0]
                            .city
                          : null}
                        {supplierCity ? supplierCity : null}
                      </span>
                    </p>

                    <div className="product-page-seller-rating">
                      <strong>
                        {translate("js.item.sellerrating")}
                        :&nbsp;
                      </strong>
                      <div id="buyBoxDistRate">
                        <div className="dist-item-rating">
                          <i className="material-icons star-icon">
                            star_border
                          </i>
                          <i className="material-icons star-icon">
                            star_border
                          </i>
                          <i className="material-icons star-icon">
                            star_border
                          </i>
                          <i className="material-icons star-icon">
                            star_border
                          </i>
                          <i className="material-icons star-icon">
                            star_border
                          </i>
                          <div
                            style={{
                              display: "none"
                            }}
                            className="distReviewCount"
                          >
                            0 {translate("js.item.reviews")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  <Attributes />
                </div>
                <CheckBoxAddons />

                {
                  !isAddToCart ? 
                  <AddToCartBox
                  data={data ? data : undefined}
                  productUnavailable={productUnavailableState}
                  priceInv={data ? data.priceInvData._xResult[0] : undefined}
                  storeInfo={storeInfo ? storeInfo : undefined}
                /> : null
                }

                



                {typeof window !== "undefined" &&
                  window.location.pathname != "/sellers/abc-store-aini17pq60" ?
                  (<div className="shareWrapper">
                    <span className="shareWrapperText">Share : </span>
                    <ShareButtonsNew />
                  </div>) : null}

                <div className="shareWrapper" style={{ marginTop: "0px" }}>
                  <span className="shareWrapperText">
                    Request catalog :{" "}
                  </span>
                  {loginNameState == "" ? (
                    <span onClick={handleLogin}>
                      <img
                        style={{ width: "25px", marginLeft: "10px" }}
                        src={pdfIcon}
                      />
                    </span>
                  ) : (
                    <a href={pdfFile} target="_blank">
                      <img
                        style={{ width: "25px", marginLeft: "10px" }}
                        src={pdfIcon}
                      />
                    </a>
                  )}

                </div>

                <OtherInfoTab
                  longDesc={
                    data
                      ? {
                        longdesc: data.productData._xResult[0].longdesc,
                        longdesc2: data.productData._xResult[0].longdesc2,
                        longdesc3: data.productData._xResult[0].longdesc3,
                        longdesc4: data.productData._xResult[0].longdesc4
                      }
                      : undefined
                  }
                  properties={data ? data.productData._xResult[0].properties : undefined}

                />

                <SupplierInfoDetailed storeInfo={storeInfo} />
              </div>
              <ConfirmDeliveryOptions />
              <CartValidationErrors />
              <OutOfStockError />
              <AddedToCartModal />



            </div>
            <div className="row">
              <div className="container-fluid">
                <div className="col s12">
                  <Reviews
                    avgRating={avgRating}
                    setAvgRating={setAvgRating}
                    starFilter={starFilter}
                    setStarFilter={setStarFilter}
                    reviewsContainerRef={reviewsContainerRef}
                    reviewsWithImages={reviewsWithImages}
                    setReviewsWithImages={setReviewsWithImages}
                  />
                  <BestSellingProducts />
                  <FeaturedProducts />
                  <VistorInfo />
                  <RecentlyViewedItems />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* <Accessories /> */}
      {/* <VendorList
          handleEnquiryModalOpenClicked={handleEnquiryModalOpenClicked}
        /> */}
      {/* <OtherInfoTab
        longDesc={
          data
            ? {
              longdesc: data.productData._xResult[0].longdesc,
              longdesc2: data.productData._xResult[0].longdesc2,
              longdesc3: data.productData._xResult[0].longdesc3,
              longdesc4: data.productData._xResult[0].longdesc4
            }
            : undefined
        }
        properties={data ? data.productData._xResult[0].properties : undefined}
      /> */}

      <div className="clearfix"></div>
      {/* {storeInfo && storeInfo.storeSellerData && (
        <div className="storeInfoWrapper itemStoreInfo">
          <div className="storeLogo">{<img src={imageUrl}></img>}</div>
          <div className="storeInfoMain">
            <div className="storeInfo1">
              <h1 className="storeName testClass">
                {storeInfo.storeSellerData && storeInfo.storeSellerData.brand}
              </h1>
              {storeInfo.storeSellerData &&
                Object.keys(storeInfo.storeSellerData).includes("year") &&
                storeInfo.storeSellerData.year != "" ? (
                <p>
                  <strong>
                    Established{" "}
                    {storeInfo.storeSellerData &&
                      Object.keys(storeInfo.storeSellerData).includes("year") &&
                      storeInfo.storeSellerData.year}{" "}
                    -{" "}
                    {storeInfo.storeSellerData &&
                      Object.keys(storeInfo.storeSellerData).includes("city") &&
                      storeInfo.storeSellerData.city}
                    ,{" "}
                    {storeInfo.storeSellerData &&
                      Object.keys(storeInfo.storeSellerData).includes(
                        "province"
                      ) &&
                      storeInfo.storeSellerData.province}
                  </strong>
                </p>
              ) : null}

              {storeInfo.storeSellerData &&
                Object.keys(storeInfo.storeSellerData).includes("phone_number") &&
                storeInfo.storeSellerData.phone_number != "" ? (
                <p>
                  <strong>Phone:</strong>{" "}
                  {storeInfo.storeSellerData &&
                    Object.keys(storeInfo.storeSellerData).includes(
                      "phone_number"
                    ) &&
                    storeInfo.storeSellerData.phone_number}
                </p>
              ) : null}

              {storeInfo.storeSellerData &&
                Object.keys(storeInfo.storeSellerData).includes("location") &&
                storeInfo.storeSellerData.location != "" ? (
                <p>
                  <strong>Address:</strong>{" "}
                  {storeInfo.storeSellerData &&
                    Object.keys(storeInfo.storeSellerData).includes(
                      "location"
                    ) &&
                    storeInfo.storeSellerData.location}
                  <br />
                  {mapsLink != "" ? (
                    <a className="mapsLink" target="_blank" href={mapsLink}>
                      View on Google Maps
                    </a>
                  ) : null}
                </p>
              ) : null}

              {storeInfo.storeSellerData &&
                Object.keys(storeInfo.storeSellerData).includes("website") &&
                storeInfo.storeSellerData.website != null ? (
                <p>
                  <strong>Website:</strong> {storeInfo.storeSellerData.website}
                </p>
              ) : null}
              <p className="sellerSocialLine">
                {storeInfo.storeSellerData !== undefined &&
                  (Object.keys(storeInfo.storeSellerData).includes("facebook") ||
                    Object.keys(storeInfo.storeSellerData).includes("twitter") ||
                    Object.keys(storeInfo.storeSellerData).includes(
                      "instagram"
                    ) ||
                    Object.keys(storeInfo.storeSellerData).includes(
                      "pinterest"
                    )) &&
                  (storeInfo.storeSellerData.facebook != null ||
                    storeInfo.storeSellerData.twitter != null ||
                    storeInfo.storeSellerData.instagram != null ||
                    storeInfo.storeSellerData.pinterest != null) ? (
                  <span>
                    <strong>Connect With Us:</strong>
                    <br />
                  </span>
                ) : null}

                {storeInfo.storeSellerData &&
                  Object.keys(storeInfo.storeSellerData).includes("facebook") &&
                  storeInfo.storeSellerData.facebook != null ? (
                  <a href={storeInfo.storeSellerData.facebook}>
                    <img className="sellerSocialLogo" src={fbLogo} />
                  </a>
                ) : null}
                {storeInfo.storeSellerData &&
                  Object.keys(storeInfo.storeSellerData).includes("twitter") &&
                  storeInfo.storeSellerData.twitter != null ? (
                  <a href={storeInfo.storeSellerData.twitter}>
                    <img className="sellerSocialLogo" src={twLogo} />
                  </a>
                ) : null}
                {storeInfo.storeSellerData &&
                  Object.keys(storeInfo.storeSellerData).includes("instagram") &&
                  storeInfo.storeSellerData.instagram != null ? (
                  <a href={storeInfo.storeSellerData.instagram}>
                    <img className="sellerSocialLogo" src={igLogo} />
                  </a>
                ) : null}
                {storeInfo.storeSellerData &&
                  Object.keys(storeInfo.storeSellerData).includes("pinterest") &&
                  storeInfo.storeSellerData.pinterest != null ? (
                  <a href={storeInfo.storeSellerData.pinterest}>
                    <img className="sellerSocialLogo" src={ptLogo} />
                  </a>
                ) : null}
              </p>
            </div>
            <div className="storeInfo2">
              <h2 className="storeName">About Us</h2>

              <div id="aboutInfo">
                <p>
                  {storeInfo.storeSellerData &&
                    storeInfo.storeSellerData.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )} */}


    </div>
  );
};

export default OFBProductPage;
