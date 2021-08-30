import React, { useState, useEffect, useContext } from "react";

import { useSelector, shallowEqual, useDispatch } from "react-redux";

import WishListItem from "./WishListItem.jsx";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";

import { I18nContext } from "../../i18n";
import capitalize from "../../functions/capitalize";
import { addFunctionWishList } from "../../redux/actions/wishListActions.js";

export default function WishList() {
  const dispatch = useDispatch();
  const { translate } = useContext(I18nContext);

  const wishListState = useSelector(
    state => state.wishListReducer.wishlist,
    shallowEqual
  );
  const LOCAL_STORAGE_WISHLIST_NAME = "wishList";

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  return (
    <>
      <div className="icon-container" onClick={handleOpen}>
        <div className="icon-wrapper">
          <i
            className="material-icons"
            style={wishListState.length > 0 ? { color: "red" } : null}
          >
            {wishListState.length > 0 ? `favorite` : `favorite_border`}
          </i>
        </div>
        <div className="icon-text">
          <span className="icon-title">
            {wishListState.length}{" "}
            {translate("js.header.items")
              .split(/\s+/)
              .map(capitalize)
              .join(" ")}
          </span>
          <span className="icon-action-text">
            {translate("js.header.wishlist")}
          </span>
        </div>
      </div>
      <Modal
        aria-labelledby="wishlist-modal"
        aria-describedby="wishlist-form"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "90%",
          margin: "0 auto"
        }}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <WishListItem close={handleClose} />
        </Fade>
      </Modal>
    </>
  );
}
