import React from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { PROJECT_LINK, VID } from "../../../../../project-config";
import Modal from "@material-ui/core/Modal";

import { addToCartModalClose } from "../../../../../redux/actions/productAction";
import { backToCategory } from "../../../../../redux/actions/categoryActions";

import { I18nContext } from "../../../../../i18n/index";
import { navigate } from "@reach/router";

const AddedToCartModal = () => {
  const { translate } = React.useContext(I18nContext);

  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    dispatch(addToCartModalClose());
  };

  const productAddedToCart = useSelector(
    state => state.productReducer.addToCartSuccess,
    shallowEqual
  );

  const mainProductSkuIdsState = useSelector(
    state => state.productReducer.itemDetail.mainProductSkuIds,
    shallowEqual
  );

  const addToCartModeState = useSelector(
    state => state.productReducer.addToCartMode
  );
  const languageState = useSelector(
    state => state.mainReducer.lang,
    shallowEqual
  );
  React.useEffect(() => {
    setOpen(productAddedToCart);
  }, [productAddedToCart]);

  const handleViewCartClicked = () => {
    const button = document.getElementById("cart-icon-btn");
    button.click();
    handleClose();
  };
  return (
    <Modal
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      open={open}
      onClose={handleClose}
    >
      <div
        className="added-to-cart-modal-wrapper"
        style={{
          backgroundColor: "white",
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          position: "relative"
        }}
      >
        <span
          style={{
            color: "black",
            fontSize: "30px",
            fontWeight: "normal",
            cursor: "pointer",
            width: "20px",
            right: "0px",
            top: "0px",
            position: "absolute"
          }}
          onClick={() => handleClose()}
        >
          ×
        </span>
        <p
          id="simple-modal-description"
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
          {addToCartModeState === "addQuote"
            ? translate("addedToQuoteMessage")
            : translate("Theproductmessage")}
        </p>

        {/*  <a href={`${PROJECT_LINK}/basket.html?vid=${VID}&iu=${languageState}`}> */}
        <button
          onClick={handleViewCartClicked}
          className="addToCartBtn"
          style={{ marginTop: "10px", marginBottom: "10px" }}
        >
          {addToCartModeState === "addQuote"
            ? translate("VIEWQUOTEBASKET")
            : translate("VIEWCART")}
        </button>
        {/*  </a> */}
        <button
          className="addToCartBtn"
          onClick={() => {
            dispatch(backToCategory());
            handleClose();
            navigate(-1);
          }}
          style={{ backgroundColor: "#2d509f" }}
        >
          {translate("compItems.goBackButton")}
        </button>
      </div>
    </Modal>
  );
};

export default AddedToCartModal;
