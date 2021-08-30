import React, { useEffect, useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import Modal from "@material-ui/core/Modal";
import {
  closeAccessoryModal,
  getDeliveryOptions,
  addToLocalMiniCart,
  addToCartModalClose
} from "../../../../../redux/actions/productAction";

import { I18nContext } from "../../../../../i18n/index";
import { FormattedNumber } from "react-intl";
import Loading from "../../../../AC-Loading/Loading";

const AccessoryModal = () => {
  const dispatch = useDispatch();
  const { translate, priceConvert, currency } = React.useContext(I18nContext);

  const [open, setOpen] = useState(false);
  const [priceState, setPriceState] = useState(0);
  const [distIdState, setdistIdState] = useState(0);

  const [numberOfItems, setNumberOfItems] = React.useState(1);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    dispatch(closeAccessoryModal());
    setOpen(false);
  };

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  const isModalLoading = useSelector(
    state => state.productReducer.accessoryModal.loading,
    shallowEqual
  );

  const accessoryModalStatus = useSelector(
    state => state.productReducer.accessoryModal.status,
    shallowEqual
  );

  const title = useSelector(
    state => state.productReducer.accessoryModal.title,
    shallowEqual
  );

  const longdesc = useSelector(
    state => state.productReducer.accessoryModal.details.longdesc,
    shallowEqual
  );

  const code = useSelector(
    state => state.productReducer.accessoryModal.details.code,
    shallowEqual
  );
  const itemId = useSelector(
    state => state.productReducer.accessoryModal.details.itemId
  );

  const imageUrl = useSelector(
    state => state.productReducer.accessoryModal.imageUrl,
    shallowEqual
  );

  const price = useSelector(
    state => state.productReducer.accessoryModal.priceInv,
    shallowEqual
  );

  useEffect(() => {
    if (accessoryModalStatus) {
      handleOpen();
    }
  }, [accessoryModalStatus]);

  useEffect(() => {
    if (Object.keys(price).length > 0) {
      setPriceState(Number(price.prices[0].price_1) / priceConvert);
      setdistIdState(price.prices[0].distributorId);
    }
  }, [price]);

  const handleAddToCart = () => {
    let attributesObject = null;
    let distributorId = distIdState;
    dispatch(
      getDeliveryOptions(
        distributorId,
        code,
        numberOfItems,
        itemId,
        attributesObject
      )
    );
    dispatch(addToLocalMiniCart(title, price, numberOfItems, "DEFAULT"));
    dispatch(addToCartModalClose());
    handleClose();
    window.scrollTo(0, 0);
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
      {isModalLoading === false ? (
        <div
          style={{
            backgroundColor: "white",
            padding: "50px 0px",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            maxHeight: isMobileState ? "100%" : "80%"
          }}
        >
          <span
            style={{
              color: "black",
              fontSize: "30px",
              fontWeight: "normal",
              cursor: "pointer",
              width: "20px",
              right: "10px",
              top: "10px",
              position: "absolute"
            }}
            onClick={() => handleClose()}
          >
            ×
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: isMobileState ? "column" : "row",
              overflow: "overlay",
              padding: "0 30px"
            }}
          >
            <figure
              className="item-card-figure"
              style={{
                width: "300px",
                height: "300px",
                background: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                marginRight: "30px"
              }}
            ></figure>
            <div
              style={{
                maxWidth: "600px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <h3 dangerouslySetInnerHTML={{ __html: title }} />
              <p
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  fontSize: "15px",
                  margin: "20px 0"
                }}
              >
                <b>{translate("vm.itemTemplate.code")}: </b> {code}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <div style={{ marginRight: "20px" }}>
                  <div id="buyBoxQtyBox">
                    <div className="qtyControlsBox">
                      <div className="qtyControlsBtns">
                        <div
                          className="qtyControlsPlus no-select"
                          onClick={() => setNumberOfItems(numberOfItems + 1)}
                          style={{ cursor: "pointer" }}
                        >
                          <span>+</span>
                        </div>
                        <div
                          className="qtyControlsMinus no-select"
                          onClick={() => {
                            if (numberOfItems - 1 > 0) {
                              setNumberOfItems(numberOfItems - 1);
                            }
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <span>-</span>
                        </div>
                      </div>
                      <input
                        id="qtybox-dist-204"
                        className="qtyControlsInput"
                        size={String(numberOfItems).length}
                        type="text"
                        value={numberOfItems}
                        onChange={e => setNumberOfItems(Number(e.target.value))}
                      />
                      <div className="clearfix"></div>
                    </div>
                  </div>
                </div>
                <div id="buyBoxAddToCartBtn" style={{ maxWidth: "200px" }}>
                  <div
                    className="addToCartBtn"
                    title={translate("js.item.addtocart")}
                    onClick={() => handleAddToCart()}
                    style={{ alignItems: "center" }}
                  >
                    <div style={{ marginRight: "10px" }}>
                      <span>{translate("js.item.addtocart")} </span>
                    </div>
                    <div>
                      <i className="material-icons add-icon">
                        add_shopping_cart
                      </i>
                    </div>
                  </div>
                </div>
              </div>
              <h4>
                <FormattedNumber
                  value={priceState}
                  style="currency"
                  currency={currency}
                />
              </h4>
              <p
                style={{
                  margin: "20px 0",
                  fontFamily: '"Helvetica"',
                  lineHeight: "23px",
                  fontSize: "17px"
                }}
                dangerouslySetInnerHTML={{ __html: longdesc }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            position: "relative"
          }}
        >
          <Loading />
        </div>
      )}
    </Modal>
  );
};

export default AccessoryModal;
