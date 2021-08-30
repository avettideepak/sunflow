import React from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { PROJECT_LINK, PREVIEW } from "../../../project-config";
import classes from "../Styles/WishListMobile.module.css";
import { Link, navigate } from "gatsby";

import { FormattedNumber } from "react-intl";
import { I18nContext } from "../../../i18n/index";
import PriceTag from "../../../shared/components/PriceTag/PriceTag";
import { handleReplaceImagesWithLargeImagesOnError } from "../../../functions/Utilities";

export default function WishListMobile({ show, close, toggleWish }) {
  const wishListState = useSelector(
    state => state.wishListReducer.wishlist,
    shallowEqual
  );

  const { langCode, currency, translate, priceConvert } = React.useContext(
    I18nContext
  );

  const renderWishList = () => {
    if (wishListState && wishListState.length > 0) {
      return wishListState.map(wishItem => renderWishListItem(wishItem));
    } else {
      return (
        <p className={classes.noItemsFound}>
          {translate("js.header.wishlist.noitems")}
        </p>
      );
    }
  };

  const handleWishItemClicked = url => {
    close();
    navigate(url);
  };
  const renderWishListItem = wishItem => {
    let { id, code, title, desc, currency_sign, image, price, url } = wishItem;

    let imageKitImage = `https://ik.imagekit.io/ofb/dev/store/20180522154/assets/items/largeimages/${code}.jpg?tr=ar-1-1,dpr-2,pr-true,f-auto,h-150`;

    url = `/${url}`;
    let description =
      desc && typeof desc === "string" && desc.replace('\\"', '"');
    return (
      <div
        className={classes.wishItemWrapper}
        onClick={() => handleWishItemClicked(url)}
        key={id}
      >
        <div className={classes.wishItemImage}>
          <img
            src={imageKitImage}
            alt={`${title}`}
            // onError={handleReplaceImagesWithLargeImagesOnError}
          />
        </div>
        <div className={classes.wishItemDetails} style={{ overflow: "hidden" }}>
          <div className={classes.wishItemDesc}>{description}</div>
          <div className={classes.wishItemCode}>
            <label>Code:</label>
            <span>{code}</span>
          </div>
          <div className={classes.wishItemPrice}>
            {price.value && (
              <PriceTag
                value={{
                  integer:
                    price.type !== "empty"
                      ? typeof price.value.integer === "string" &&
                        price.value.integer.includes("$")
                        ? price.value.integer
                            .replace("$", "")
                            .split(".")[0]
                            .replace(",", "")
                        : price.value.integer.replace(",", "")
                      : 0,
                  decimal:
                    price.type !== "empty"
                      ? typeof price.value.decimal === "string" &&
                        price.value.decimal.includes("$")
                        ? price.value.decimal.replace("$", "").split(".")[0]
                        : price.value.decimal
                      : 0
                }}
              />
            )}
          </div>
          <div className={classes.wishItemActionWrapper}>
            <button
              className={classes.wishItemRemove}
              onClick={e => {
                e.stopPropagation();
                toggleWish(
                  e,
                  id,
                  code,
                  title,
                  desc,
                  currency_sign,
                  image,
                  price,
                  url
                );
              }}
            >
              {/*{translate("wishlistMobile.removeButtonText")}*/}

              <i title="Remove" class="material-icons-outlined">
                delete
              </i>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      onClick={close}
      className={
        `${langCode === "ar" ? classes.arabic + " " : ""}` +
        classes.outerContainer +
        `${show ? " " + classes.active : ""}`
      }
    >
      <div
        className={classes.container + `${show ? " " + classes.active : ""}`}
      >
        <div
          className={
            langCode === "ar"
              ? "wishListTitleArabic " + classes.wishListTitle
              : classes.wishListTitle
          }
        >
          <h3>{translate("wishlistMobile.title")}</h3>
          <i className="material-icons" onClick={close}>
            close
          </i>
        </div>

        <div className={classes.wrapper}>
          <div className={classes.wishListWrapper + ` scroll-bar-thin-style`}>
            {renderWishList()}
          </div>
        </div>
      </div>
    </div>
  );
}
