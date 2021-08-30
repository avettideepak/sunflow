import React, { useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { toggleWishListAction } from "../../../../redux/actions/wishListActions.js";

import { I18nContext } from "../../../../i18n/index";

const WishListBar = ({ data, productUnavailable, price: pPrice }) => {
  const dispatch = useDispatch();
  const { translate } = React.useContext(I18nContext);

  const [favouriteState, setFavouriteState] = useState("favorite_border");

  const wishListState = useSelector(
    state => state.wishListReducer.wishlist,
    shallowEqual
  );

  const productState = useSelector(
    state => state.productReducer.product,
    shallowEqual
  );

  const productLinkState = useSelector(
    state => state.productReducer.productInitial.productLink,
    shallowEqual
  );

  const itemDetail = useSelector(
    state => state.productReducer.itemDetail,
    shallowEqual
  );

  const priceDetail = useSelector(
    state => state.productReducer.priceInventory,
    shallowEqual
  );

  let isItemWishlisted =
    wishListState.length > 0
      ? wishListState.some(
        w =>
          w.id == (itemDetail.itemId || data.productData._xResult[0].itemId)
      )
      : false;

  const toggleWish = e => {
    e.preventDefault();

    let price = {};
    if (productUnavailable) {
      console.info(pPrice);
      let integer = "0";
      let decimal = "0";
      if (String(pPrice).includes(".")) {
        let pairs = String(pPrice).split(".");
        integer = pairs[0];
        decimal = pairs[1];
      } else {
        integer = String(pPrice);
      }
      price = {
        value: {
          integer,
          decimal
        }
      };
      console.info("-", data);
      if (
        data &&
        data.productData &&
        data.productData._xResult &&
        data.productData._xResult[0] &&
        data.productData._xResult[0].code
      ) {
        let { code, itemId, shortdesc, title } = data.productData._xResult[0];
        let image = `https://ik.imagekit.io/ofb/store/20180522154/assets/items/images/${code}.jpg`;
        dispatch(
          toggleWishListAction(
            itemId,
            code,
            title,
            shortdesc,
            "",
            image,
            price,
            data.url.split("product/")[1],
            wishListState
          )
        );
      }
    } else {
      price = {
        value: {
          integer: String(Math.floor(priceDetail.prices[0].price_1)),
          decimal: String(Math.round((priceDetail.prices[0].price_1 % 1) * 100))
        }
      };

      console.info("borop wish price", price);

      let productUrl = productLinkState.split("product/")[1];

      if (productUrl.includes("?")) productUrl = productUrl.split("?")[0];

      dispatch(
        toggleWishListAction(
          itemDetail.itemId,
          itemDetail.code,
          itemDetail.title,
          itemDetail.shortdesc,
          productState.currency_sign,
          itemDetail.image,
          price,
          productUrl,
          wishListState
        )
      );
    }
  };

  const handleToggleWishlistIcon = e => {
    isItemWishlisted
      ? setFavouriteState("favourite_border")
      : setFavouriteState("favourite");
    toggleWish(e);
  };

  return (
    <div
      className="col-xs-121 wishlist-btn"
      style={{
        cursor: "pointer"
      }}
      onMouseEnter={() => setFavouriteState("favorite")}
      onMouseLeave={() => setFavouriteState("favorite_border")}
      onClick={e => {
        handleToggleWishlistIcon(e);
      }}
    >
      <p
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <span id="buyBoxWishlist" >
          <span
            className="wishlistHeart"
            title={translate("js.item.wishlist.add")}
          >
            <span style={{ cursor: "pointer", marginRight: "5px" }}>
              {/* <i
                className="material-icons add-icon"
                style={
                  isItemWishlisted || favouriteState === "favorite"
                    ? { color: "red" }
                    : null
                }
              >
                {isItemWishlisted || favouriteState === "favorite"
                  ? `favorite`
                  : `favorite_border`}
              </i> */}
            </span>
          </span>
        </span>
        {translate("js.item.wishlist.add")}
      </p>
    </div>
  );
};

export default WishListBar;
