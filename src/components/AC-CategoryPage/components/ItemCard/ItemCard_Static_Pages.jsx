import React, { useState, useEffect, useContext } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import MoreShare from "./components/MoreShare.jsx";
import htmldecoder from "../../../../functions/htmldecoder";
import { runAfterSomeTime } from "../../../../functions/Utilities.js";
import { toggleCompare } from "../../../AC-Header/Compare.jsx";
import {
  deleteCompareItem,
  toggleCompareAction,
  fetchComparedItemDetails,
  deleteComparedItemsDetails
} from "../../../../redux/actions/compareActions";

import { I18nContext, langCodeList } from "../../../../i18n";
import "./Styles/ItemCard_Static.css";
import PriceTag from "../../../../shared/components/PriceTag/PriceTag";

import Modal from "@material-ui/core/Modal";
import DialogContent from "@material-ui/core/DialogContent";

import useCalculateDistance from "../../../../functions/useCalculateDistance";
import LocalModals from "../../../../shared/LocalModals/LocalModals";
import LazyloadImage from "./components/LazyLoadImage";

import store_pickup from "@assets/img/store_pickup.png"
import phone_call from "@assets/img/phone_call.png"
import location_store from "@assets/img/location_store.png"
import delivery from "@assets/img/delivery.png"
import deals from "@assets/img/deals.png"

const MORE_SHARE_TOGGLE_TIMEOUT = 100;

const ItemCard = props => {
  const { recently = false, supplier, data } = props;

  const dispatch = useDispatch();
  const { translate } = useContext(I18nContext);
  const [
    showModal,
    setHandleClose,
    handleShowLocale,
    handleOpenLocationBar,
    productUrlHandler,
    supplierShippingType,
    urlState,
    rangeState
  ] = useCalculateDistance();

  const [productOnSale, setProductOnSale] = useState(
    false /* Math.round(Math.random()) */
  );

  const [moreActive, setMoreActive] = useState(false);

  const {
    id,
    title,
    code,
    desc,
    currency_sign,
    image,
    itemLargeImage,
    price,
    url,
    properties
  } = props.itemCard;

  const [productPromotion, setProductPromotion] = useState(
    properties && properties.PromoText
  );

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  // const [IsDealsProps, setIsDealsProps] = useState(
  //   properties && properties.Deals_item
  // );

  const [favouriteState, setFavouriteState] = useState("favorite_border");
  const [compareIconState, setCompareIconState] = useState("");

  const compareListState = useSelector(
    state => state.compareListReducer.compareList,
    shallowEqual
  );

  const userLocationState = useSelector(
    state => state.geoLocationReducer.brandCompareUserLocation,
    shallowEqual
  );

  const userLocState = useSelector(
    state => state.userLocationReducer,
    shallowEqual
  );

  const brandsState = useSelector(
    state => state.geoLocationReducer.brands,
    shallowEqual
  );

  const distanceState = useSelector(
    state => state.categoryReducer.distance,
    shallowEqual
  );

  // const levelStage = useSelector(
  //   state => state.categoryReducer.categoryItems.properties.ItemLevel,
  //   shallowEqual
  // );


  const levelsMain = useSelector(
    state => state.categoryReducer.categoryItems,
    shallowEqual
  );

  console.log("levelssssive", levelsMain)

  const navCategoryState = useSelector(
    state => state.menuReducer.navCategory,
    shallowEqual
  );

  let imageUrl = `https://ik.imagekit.io/ofb/dev/${itemLargeImage}`;

  let isItemWishlisted = props.wishListState.some(w => w.id == id);
  let isItemCompared =
    compareListState && compareListState.some(i => i.id == id);

  const handleToggleWishlistIcon = (e, id) => {
    e.stopPropagation();
    isItemWishlisted
      ? setFavouriteState("favourite_border")
      : setFavouriteState("favourite");
    props.toggleWish(
      e,
      id,
      code,
      title,
      desc,
      currency_sign,
      image,
      price,
      url.replace("product/", "")
    );
  };

  const handleToggleCompareListIcon = (event, itemId) => {
    event.stopPropagation();
    let compareid = String(itemId);
    isItemCompared && compareIconState === ""
      ? setCompareIconState("-outlined")
      : setCompareIconState("");

    // if item's compare checkbox is not checked
    if (!isItemCompared) {
      dispatch(fetchComparedItemDetails(compareid));
    } else {
      dispatch(deleteComparedItemsDetails(compareid));
    }

    toggleCompare(
      //event,
      compareid,
      title,
      currency_sign,
      image,
      price,
      url,
      compareListState,
      isItemCompared,
      dispatch,
      deleteCompareItem,
      toggleCompareAction,
      translate
    );

    runAfterSomeTime(() => setMoreActive(false), MORE_SHARE_TOGGLE_TIMEOUT);
  };

  const renderWishlistIcon = () => {
    return (
      <i
        className={
          isItemWishlisted
            ? "no-select material-icons item-card-wishlist-icon active"
            : "no-select material-icons item-card-wishlist-icon"
        }
        id={id}
        onMouseEnter={() => setFavouriteState("favorite")}
        onMouseLeave={() => setFavouriteState("favorite_border")}
        onClick={e => {
          handleToggleWishlistIcon(e, id);
        }}
      >
        {isItemWishlisted || favouriteState === "favorite"
          ? `favorite`
          : `favorite_border`}
      </i>
    );
  };

  const handleClickOnProductCard = (event, url) => {
    console.info(`URL:${url}`, langCodeList);

    langCodeList.map(lang => {
      if (url.substring(0, 5).includes(`${lang}/`)) {
        url = url.replace(`${lang}`, "");
      }
    });

    if (url.includes("/product/")) {
      url = url.replace("/product/", "");
    } else {
      url = url.replace("product/", "");
    }
    const shouldIncludeSlash = url => {
      if (url.charAt(0) == "/") {
        return "";
      } else {
        return "/";
      }
    };

    /* setShippingTypeState(shippingType);
      setData(supplier, shippingType); */

    productUrlHandler(id, supplier, `${shouldIncludeSlash(url)}${url}`);
  };

  const renderCompareIcon = () => {
    return (
      <React.Fragment>
        <i
          onMouseEnter={() => setCompareIconState("-outlined")}
          onMouseLeave={() => setCompareIconState("")}
          onClick={event => handleToggleCompareListIcon(event, id)}
          className={
            isItemCompared
              ? `no-select material-icons${compareIconState} compare-icon active`
              : `no-select material-icons${compareIconState} compare-icon`
          }
        >
          {isItemCompared || compareIconState === "-outlined"
            ? `check_box`
            : `check_box_outline_blank`}
        </i>
        <span
          onClick={event => handleToggleCompareListIcon(event, id)}
          className="compare-icon-tooltip"
        >
          {translate("itemCard.compareTooltip")}
        </span>
      </React.Fragment>
    );
  };

  const renderPromotion = () => {
    if (productPromotion)
      return (
        <div className="item-card-promotion-container">
          <span className="item-card-promotion--promo">{productPromotion}</span>{" "}
        </div>
      );
    else return null;
  };

  const renderSale = () => {
    if (productOnSale)
      return (
        <div className="item-card-sale-container">
          <span className="item-card-sale--sale">50% OFF</span>{" "}
        </div>
      );
    else return null;
  };

  // let supplierImage = supplier && supplier.length > 0 && `https://ik.imagekit.io/ofb/dev/store/${supplier[0].file.file_path}`;
  let supplierName = supplier && supplier.length > 0 &&  supplier[0].brand;
  let supplierPhone = supplier && supplier.length > 0 &&  supplier[0].phone_number;
  let hasPickuplocation = supplier && supplier.length > 0 &&  supplier[0].pickup_locations.length > 0;
  let isShippable = supplier && supplier.length > 0 &&  supplier[0].shipping_information.shipping_type !== null;
  let supplierAddress = supplier && supplier.length > 0 && supplier[0].location;

  const levelNumber = props.itemCard.properties.ItemLevel;
  const storeHours = props.itemCard.properties.Store_Hrs;

  console.log('TestLevel', props,levelNumber); 

  console.log("suppliersupplier1",supplier,hasPickuplocation,isShippable)

  return (
    <>
      <Modal
        open={showModal}
        onClose={setHandleClose}
        onEscapeKeyDown={setHandleClose}
      >
        <DialogContent className="locationbox-wrapper" id="getLocationDiv">
          {supplierShippingType !== "" ? (
            <LocalModals
              setHandleClose={setHandleClose}
              handleShowLocale={handleShowLocale}
              handleOpenLocationBar={handleOpenLocationBar}
              shippingTypeState={supplierShippingType}
              range={rangeState || 200}
              url={urlState}
            />
          ) : null}
        </DialogContent>
      </Modal>

      <div
        className={`home-item--wrapper${isMobileState ? ` mobile` : ``}${moreActive ? ` more-active` : ``
          }`}
        
      >
        
        <div
          className={`home-item${isMobileState ? ` mobile` : ``}${moreActive ? ` more-active` : ``
            }${productPromotion ? ` promo-item` : ``}`}
          style={{ cursor: "pointer" }}
        >
          {isItemWishlisted ? renderWishlistIcon() : null}
          {renderCompareIcon()}

          <div className={`item-card-image${isMobileState ? ` mobile` : ``}`}>
            <figure className="item-card-figure">
              <LazyloadImage
                classFun={typeof window !== undefined && (window.location.pathname.includes("/dining")) ? 'figuredine' : 'figure'}
                src={imageUrl}                
                alt={htmldecoder(title)}
              />
            </figure>
            {renderPromotion()}
            {renderSale()}
          </div>
          <div className={`item-card-regular${isMobileState ? ` mobile` : ``}`}>
            <div
              className="product-title"
              dangerouslySetInnerHTML={{
                __html: htmldecoder(title)
              }}
              title={title}
            ></div>

            {typeof window !== undefined && (window.location.pathname.includes("/dining")) ?             
            <div className="local_offer"><i className="material-icons">local_offer</i></div> 
            : null}           

             
          </div>
          {typeof window !== undefined && (!window.location.pathname.includes("/entertainment")) ?    
          <div className="item-card-store-info-2">              
              <div className="item-card-store-info-2_storelevel">
                <img src={location_store} alt="Image" />
                
                <div>{levelNumber}</div>
              </div>
            </div>
            : null}           
          
        </div>
      </div>
    </>
  );
};

export default ItemCard;
