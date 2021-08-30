import React, { useState, useEffect, useContext } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import WishListModal from "./WishListModal";
import WishListMobile from "./WishListMobile";
import { I18nContext } from "../../../i18n";
import capitalize from "../../../functions/capitalize";
import { addFunctionWishList } from "../../../redux/actions/wishListActions.js";
import { setHTMLElementFixedPosition } from "../../../functions/Utilities.js";
import { toggleWishListAction } from "../../../redux/actions/wishListActions.js";
import WishListIcon from "../../../assets/img/icons/whislist1.png";

export default function WishListCustomModal() {
  const dispatch = useDispatch();
  const { translate, langCode } = useContext(I18nContext);

  const [showModal, setShowModal] = useState(false);

  const wishListState = useSelector(
    state => state.wishListReducer.wishlist,
    shallowEqual
  );

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  useEffect(() => {
    // This will set aria-hidden of html element based on the value of showModal
    setHTMLElementFixedPosition(showModal);
  }, [showModal]);

  const LOCAL_STORAGE_WISHLIST_NAME = "wishList";

  const handleOpen = () => setShowModal(true);

  const handleClose = () => setShowModal(false);

  useEffect(() => {
    if (typeof localStorage !== undefined) {
      let storedWishListString = localStorage.getItem(
        LOCAL_STORAGE_WISHLIST_NAME
      );
      let storedWishListObject = JSON.parse(storedWishListString);
      if (storedWishListObject)
        dispatch(addFunctionWishList([...storedWishListObject]));
    }
  }, []);

  useEffect(() => {
    if (typeof localStorage !== undefined) {
      localStorage.setItem(
        LOCAL_STORAGE_WISHLIST_NAME,
        JSON.stringify(wishListState)
      );
    }
  }, [wishListState]);

  const toggleWish = (
    e,
    id,
    code,
    title,
    desc,
    currency_sign,
    image,
    price,
    url
  ) => {
    e.preventDefault();
    dispatch(
      toggleWishListAction(
        id,
        code,
        title,
        desc,
        currency_sign,
        image,
        price,
        url,
        wishListState
      )
    );
  };

  const renderWishListWindow = () => {
    /*     if (isMobileState) { */
    return (
      <WishListMobile
        show={showModal}
        close={handleClose}
        toggleWish={toggleWish}
      />
    );
    /*   } else {
      return <WishListModal show={showModal} close={handleClose} />;
    } */
  };

  return (
    <React.Fragment>
      {renderWishListWindow()}
      <div
        id="wishlist-icon-btn"
        className="icon-container"
        onClick={handleOpen}
      >
        <div className="icon-wrapper">
          <img src={WishListIcon} className="iconInfo1" />
          {/* <span
            className="miniwishlist-new-count"
            style={
              wishListState.length > 0
                ? { backgroundColor: "#0ecab6" }
                : { display: "none" }
            }
          >
            {wishListState.length}
          </span> */}
        </div>
      </div>
    </React.Fragment>
  );
}
