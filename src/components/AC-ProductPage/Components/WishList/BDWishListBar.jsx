import React, { useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { toggleWishListAction } from "../../../../redux/actions/wishListActions.js";
import classes from "./Styles/BDWishListBar.module.css";
import { I18nContext } from "../../../../i18n/index";

const WishListBar = () => {
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
      ? wishListState.some(w => w.id == itemDetail.itemId)
      : false;

  const toggleWish = e => {
    e.preventDefault();

    dispatch(
      toggleWishListAction(
        itemDetail.itemId,
        itemDetail.code,
        itemDetail.title,
        itemDetail.shortdesc,
        productState.currency_sign,
        itemDetail.image,
        {
          value: {
            integer: Number(priceDetail.prices[0].listprice),
            decimal: 0
          }
        },
        productState.url,
        wishListState
      )
    );
  };

  const handleToggleWishlistIcon = e => {
    isItemWishlisted
      ? setFavouriteState("favourite_border")
      : setFavouriteState("favourite");
    toggleWish(e);
  };

  return (
    <div
      className={classes.wishlist}
      onMouseEnter={() => setFavouriteState("favorite")}
      onMouseLeave={() => setFavouriteState("favorite_border")}
      onClick={e => {
        handleToggleWishlistIcon(e);
      }}
    >
      <i
        className="material-icons add-icon"
        style={
          isItemWishlisted || favouriteState === "favorite"
            ? { color: "#fd13a6" }
            : null
        }
      >
        {isItemWishlisted || favouriteState === "favorite"
          ? `favorite`
          : `favorite_border`}
      </i>

      <span>Add to wishlist</span>
    </div>
  );
};

export default WishListBar;
