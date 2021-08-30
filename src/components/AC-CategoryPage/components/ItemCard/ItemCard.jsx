import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import MoreShare from "./components/MoreShare";
import htmldecoder from "../../../../functions/htmldecoder";
import { runAfterSomeTime } from "../../../../functions/Utilities.js";
import { toggleCompare } from "../../../AC-Header/Compare.jsx";
import {
  deleteCompareItem,
  toggleCompareAction,
  fetchComparedItemDetails,
  deleteComparedItemsDetails
} from "../../../../redux/actions/compareActions";
import Modal from "@material-ui/core/Modal";
import DialogContent from "@material-ui/core/DialogContent";

import { I18nContext, langCodeList } from "../../../../i18n/index";
import "./Styles/ItemCard.css";
import PriceTag from "../../../../shared/components/PriceTag/PriceTag";
import { navigate } from "gatsby";
import { useLocation } from "@reach/router";
import calculateDistance, {
  brandLocation
} from "../../../../functions/calculateDistance";
import {
  setCategoryDistanceAction,
  fetchCategoryFromDirectUrl
} from "../../../../redux/actions/categoryActions";
import { setGeoLocationState } from "../../../../redux/actions/geoLocationActions";

const MORE_SHARE_TOGGLE_TIMEOUT = 100;

const ItemCard = props => {
  const dispatch = useDispatch();
  const { langCode, currency, translate, dispatchContext } = React.useContext(
    I18nContext
  );
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const [itemDistance, setItemDistance] = useState("NaN");
  const [productOnSale, setProductOnSale] = useState(
    false /* Math.round(Math.random()) */
  );
  const [locationState, setLocationState] = useState("");
  const [functionState, setFunctionState] = useState("");

  const handleOpenLocationBar = () => {
    dispatchContext({ type: "changeLocationBar", payload: true });
  };

  const handleClose = () => {
    setOpen(false);
  };
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

  console.info("borop itemCard url", url);

  const [productPromotion, setProductPromotion] = useState(
    properties && properties.PromoText
  );

  console.info("item card props", props, productPromotion);

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  const [favouriteState, setFavouriteState] = useState("favorite_border");
  const [compareIconState, setCompareIconState] = useState("");

  const compareListState = useSelector(
    state => state.compareListReducer.compareList,
    shallowEqual
  );

  const userInfoState = useSelector(
    state => state.loginReducer.userInfo,
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

  let imageUrl = `https://ik.imagekit.io/ofb/dev/${itemLargeImage}?tr=ar-1-1,dpr-2,pr-true,f-auto,w-170`;

  let isItemWishlisted = props.wishListState.some(w => w.id == id);
  let isItemCompared =
    compareListState && compareListState.some(i => i.id == id);

  const handleToggleWishlistIcon = (e, id) => {
    let _url = url.replace("product/", "");
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
      _url
    );
    runAfterSomeTime(() => setMoreActive(false), MORE_SHARE_TOGGLE_TIMEOUT);
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

    if (url.includes("sellers/") && url.includes("-ain")) {
      url = url.split("-ain")[0];
      url = url.replace("sellers/", "stores/");
    }

    const shouldIncludeSlash = () => {
      if (url.charAt(0) == "/") {
        return "";
      } else {
        return "/";
      }
    };

    let distanceCompare = distanceState || 200;
    if (itemDistance !== "NaN" && itemDistance <= distanceCompare) {
      navigate(shouldIncludeSlash(url) + url);
    } else if (itemDistance !== "NaN" && itemDistance > distanceCompare) {
      setFunctionState(url);
      setOpen(!open);
    } else {
      navigate(shouldIncludeSlash(url) + url);
    }
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

  useEffect(() => {
    if (
      properties &&
      Object.keys(properties).includes("Brand") &&
      userLocState &&
      brandsState &&
      brandsState.length > 0 &&
      brandsState.some(
        brand =>
          brand.title.includes(properties.Brand) ||
          (properties.Brand === "Mario's Pizza" &&
            brand.title === "Marios Pizza")
      )
    ) {
      let userLong = userLocState.lng;
      let userLat = userLocState.lat;

      setItemDistance(
        Math.trunc(
          calculateDistance(
            brandLocation(
              "lat",
              brandsState.filter(
                brand =>
                  brand.title.includes(properties.Brand) ||
                  (properties.Brand === "Mario's Pizza" &&
                    brand.title === "Marios Pizza")
              )[0]
            ),
            brandLocation(
              "lng",
              brandsState.filter(
                brand =>
                  brand.title.includes(properties.Brand) ||
                  (properties.Brand === "Mario's Pizza" &&
                    brand.title === "Marios Pizza")
              )[0]
            ),
            userLat,
            userLong,
            "K"
          )
        )
      );
    } else {
      setItemDistance("NaN");
    }
  }, [userLocState]);

  const handleShowLocale = e => {
    e.preventDefault();
    let payload = {
      city: userInfoState.city,
      state: userInfoState.regioncode,
      country: userInfoState.countryName,
      lat: userInfoState.lat,
      long: userInfoState.lng,
      postal: userInfoState.postal
    };
    let distance = distanceState || 200;
    dispatch(setCategoryDistanceAction(distance));
    dispatch(setGeoLocationState(payload));

    handleClose();
    if (location.href.includes("stores")) {
      navigate(`/stores`);
    } else {
      dispatch(fetchCategoryFromDirectUrl());
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose} onEscapeKeyDown={handleClose}>
        <DialogContent className="locationbox-wrapper" id="getLocationDiv">
          <i
            className="material-icons location-box-close-icon no-select"
            onClick={handleClose}
          >
            close
          </i>
          Unfortunately the seller for this item is more than{" "}
          {distanceState === null ? "200" : distanceState}
          km away from your auto-detected location at{" "}
          {Object.keys(userLocState).includes("city") &&
            Object.keys(userLocState).includes("state")
            ? `${userLocState.city}, ${userLocState.state}`
            : ""}
          . Click a button below to Show Local Sellers or to Change your
          Location or Radius.
          <div className="buttons-modal">
            <button
              className="sl-btn sl-btn-confirm"
              onClick={e => handleShowLocale(e)}
            >
              Show Local Sellers
            </button>
            <button
              className="sl-btn sl-btn-confirm"
              onClick={e => {
                e.preventDefault();
                handleClose();
                handleOpenLocationBar();
              }}
            >
              Change Location or Radius
            </button>
          </div>
        </DialogContent>
      </Modal>
      <div
        className={`home-item--wrapper${isMobileState ? ` mobile` : ``}${moreActive ? ` more-active` : ``
          }`}
        onClick={event => {
          if (typeof window !== undefined) {
            window.scrollTo(0, 0);
          }
          handleClickOnProductCard(event, url);
        }}
      >
        <div className={`itemCard-buttons-container`}>
          {url.includes("sellers/") === false && (
            <MoreShare
              id={id}
              moreActive={moreActive}
              setMoreActive={setMoreActive}
              compareClicked={handleToggleCompareListIcon}
              wishlistClicked={handleToggleWishlistIcon}
              url={url}
              title={title}
              imageUrl={imageUrl}
              isItemWishlisted={props.wishListState.some(w => w.id == id)}
            />
          )}
        </div>

        <div
          className={`home-item${isMobileState ? ` mobile` : ``}${moreActive ? ` more-active` : ``
            }${productPromotion ? ` promo-item` : ``}`}
          style={{ cursor: "pointer" }}
        >
          {isItemWishlisted ? renderWishlistIcon() : null}
          {renderCompareIcon()}

          <div className={`item-card-image${isMobileState ? ` mobile` : ``}`}>
            <figure className="item-card-figure">
              <span
                className="figure"
                style={{ backgroundImage: `url(${imageUrl})` }}
              ></span>
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
            ></div>
            <div
              className={`product-price${productOnSale ? " price-deal" : ""}`}
            >
              <div className="product-price--main">
                {price.value && (
                  <PriceTag
                    value={{
                      integer:
                        price.type !== "empty"
                          ? price.value.integer.includes("$")
                            ? price.value.integer
                              .replace("$", "")
                              .split(".")[0]
                              .replace(",", "")
                            : price.value.integer.replace(",", "")
                          : 0,
                      decimal:
                        price.type !== "empty"
                          ? price.value.decimal.includes("$")
                            ? price.value.decimal.replace("$", "").split(".")[0]
                            : price.value.decimal
                          : 0
                    }}
                  />
                )}
              </div>
              {productOnSale ? (
                <div className="product-price--deal">
                  <PriceTag
                    value={{
                      integer:
                        price.type !== "empty"
                          ? Math.round(price.value.integer / 2)
                          : 0,
                      decimal: price.type != "empty" ? price.value.decimal : 0
                    }}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemCard;
