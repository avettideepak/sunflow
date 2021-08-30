import React, { useEffect, useRef, useState, useContext } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  getDeliveryOptions,
  addToLocalMiniCart,
  setAddToCartValidationErrors,
  setProductOutOfStockError,
  addToCartCheckboxProduct,
} from "../../../../redux/actions/productAction";
import { I18nContext } from "../../../../i18n/index";
import { FormattedNumber } from "react-intl";
//import NotificationRequest from "../../Components/NotificationRequest/NotificationRequest"
import Loading from "../../../AC-Loading/Loading";
import GrandTotalCheckBoxItems from "./Components/GrandTotalCheckBoxItems";
import NotifyOnReStock from "../../../AC-Notifications/NotifyOnReStock";
import Tooltip from "@material-ui/core/Tooltip";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import "./Styles/AddToCartBox.css";
// import WishListBarMobile from "../WishList/WishListBarMobile";
import WishListBarNew from "../WishList/WishListBar";

import ChatTheSeller from "../ChatTheSeller/ChatTheSeller";

const WIGGLE_TIMER = 2500;

const AddToCartBox = (props) => {
  const dispatch = useDispatch();
  const { translate, currency, priceConvert } = useContext(I18nContext);

  /* const [listPrice, setListPrice] = useState(
    props.priceInv.prices[0].listprice || 0
  ); */

  const isMobileState = useSelector(
    (state) => state.mainReducer.isMobile,
    shallowEqual
  );
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const [firstDistId, setFirstDistId] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (
      props.priceInv.prices.length > 0 &&
      Object.keys(props.priceInv.prices[0]).includes("price_1")
    ) {
      setPrice(props.priceInv.prices[0].price_1);
    }
  }, [props]);

  console.info("addtocart props", props);

  const [numberOfItems, setNumberOfItems] = useState(1);
  const [shouldWiggle, setShouldWiggle] = useState(false);
  const [perUnitState, setPerUnitState] = useState("");
  const [inStock, setInStock] = useState(true);
  const [inStockQty, setInStockQty] = useState("");

  const initialValue = useRef(true);

  const checkBoxItemsState = useSelector(
    (state) => state.productReducer.checkboxItems,
    shallowEqual
  );

  const selectedCheckBoxItemsState = useSelector(
    (state) => state.productReducer.selectedCheckboxItems,
    shallowEqual
  );

  const supplierInfoState = useSelector(
    (state) => state.productReducer.supplierInfo,
    shallowEqual
  );

  const priceState = useSelector(
    (state) => state.productReducer.priceInventory,
    shallowEqual
  );

  const isProductDetailsLoading = useSelector(
    (state) => state.productReducer.loading,
    shallowEqual
  );

  const attributesState = useSelector(
    (state) => state.productReducer.itemDetail.attributes,
    shallowEqual
  );

  const attributeid =
    attributesState && attributesState[0] && attributesState[0].attributeid;

  const productAttributeCheckboxFlagState = useSelector(
    (state) => state.productReducer.productAttributeCheckboxFlag,
    shallowEqual
  );

  const selectedProductCheckboxAttributesState = useSelector(
    (state) => state.productReducer.selectedProductCheckboxAttributes,
    shallowEqual
  );

  const requestingAddToCartState = useSelector(
    (state) => state.productReducer.requestingAddToCart,
    shallowEqual
  );

  const mainItemIdState = useSelector(
    (state) => state.productReducer.itemDetail.mainitemid,
    shallowEqual
  );

  const skusState = useSelector(
    (state) => state.productReducer.itemDetail.skus,
    shallowEqual
  );

  const itemIdState = useSelector(
    (state) => state.productReducer.itemDetail.itemid,
    shallowEqual
  );

  const selectedProductAttributesState = useSelector(
    (state) => state.productReducer.selectedProductAttributes,
    shallowEqual
  );

  const attributeDetailsState = useSelector(
    (state) => state.productReducer.itemDetail.attributeDetails,
    shallowEqual
  );

  const productInitialProperties = useSelector(
    (state) => state.productReducer.productInitial.properties,
    shallowEqual
  );

  useEffect(() => {
    if (isProductDetailsLoading) {
      setPerUnitState(null);
    } else {
      if (productInitialProperties && productInitialProperties.length > 0) {
        let perUnitProp = productInitialProperties.find((prop) =>
          ["Per Unit", "Per-Unit"].includes(Object.keys(prop)[0])
        );
        console.info("perUnitProp", productInitialProperties, perUnitProp);
        if (perUnitProp) setPerUnitState(Object.values(perUnitProp)[0]);
      }
    }
  }, [isProductDetailsLoading, productInitialProperties]);

  useEffect(() => {
    if (
      priceState &&
      Object.keys(priceState).length > 0 &&
      supplierInfoState &&
      supplierInfoState[0] &&
      supplierInfoState[0].distributorOrder
    ) {
      let firstDistId = 0;
      if (
        supplierInfoState[0].distributorOrder.length > 0 &&
        Object.keys(supplierInfoState[0].distributorOrder[0]).includes(
          "distid"
        ) &&
        supplierInfoState[0].distributorOrder[0].distid
      ) {
        firstDistId = supplierInfoState[0].distributorOrder[0].distid;
      }

      setFirstDistId(firstDistId);
      setPrice(
        priceState.prices.find((inv) => inv.distributorId == firstDistId) &&
          priceState.prices.find((inv) => inv.distributorId == firstDistId)
            .price_1
      );

      // determine stock status

      let instockQty =
        priceState.invs && priceState.invs[0] && priceState.invs[0].instock;
      setInStock(instockQty > 0);

      setInStockQty(instockQty);
    }
  }, [priceState, supplierInfoState]);

  useEffect(() => {
    let timer = null;
    if (numberOfItems) {
      if (initialValue.current) {
        initialValue.current = false;
        return;
      }

      timer = setTimeout(() => {
        setShouldWiggle(true);
      }, WIGGLE_TIMER);
    }
    return () => {
      setShouldWiggle(false);
      clearTimeout(timer);
    };
  }, [numberOfItems]);

  const handleAddToCart = (quoteMode = false) => {
    if (!inStock) {
      dispatch(setProductOutOfStockError(true));
      return;
    }
    let attributesObject = null;

    let requiredFields = [];

    if (productAttributeCheckboxFlagState) {
      let expectedAttributeIdAndScreenName = "";
      if (attributeDetailsState && attributeDetailsState.length > 0) {
        expectedAttributeIdAndScreenName = attributeDetailsState[0];
      }

      let hasSelectedAttribute =
        selectedProductCheckboxAttributesState &&
        selectedProductCheckboxAttributesState[
          expectedAttributeIdAndScreenName.attributeid
        ] &&
        selectedProductCheckboxAttributesState[
          expectedAttributeIdAndScreenName.attributeid
        ].length > 0;

      if (!hasSelectedAttribute)
        requiredFields.push(expectedAttributeIdAndScreenName.screenname);
    } else {
      if (
        selectedProductAttributesState.hasOwnProperty(
          mainItemIdState || itemIdState
        )
      ) {
        attributesObject =
          selectedProductAttributesState[mainItemIdState || itemIdState];

        let expectedAttributes = attributeDetailsState.reduce((p, c) => {
          const { screenname, attributeid } = c;
          p = [...p, { screenname, attributeid }];
          return p;
        }, []);

        let receivedAttributeIds = Object.keys(attributesObject);

        console.info(
          "addToCartTest",
          attributesObject,
          expectedAttributes,
          receivedAttributeIds
        );

        if (mainItemIdState != 0) {
          expectedAttributes.forEach((attr) => {
            if (!receivedAttributeIds.includes(attr.attributeid.toString()))
              requiredFields.push(attr.screenname);
          });
        } else {
          expectedAttributes.forEach((attr) => {
            requiredFields.push(attr.screenname);
          });
        }
      } else {
        if (attributeDetailsState && attributeDetailsState.length > 0) {
          let expectedAttributes = attributeDetailsState.reduce((p, c) => {
            const { screenname, attributeid } = c;
            p = [...p, { screenname, attributeid }];
            return p;
          }, []);

          expectedAttributes.forEach((attr) => {
            requiredFields.push(attr.screenname);
          });
        }
      }
    }

    dispatch(setAddToCartValidationErrors(requiredFields));

    if (requiredFields.length > 0) {
      return;
    }
    let firstDist = supplierInfoState[0].distributorOrder[0];

    let vid = firstDist.supplier_store_vid;

    if (
      productAttributeCheckboxFlagState &&
      selectedCheckBoxItemsState &&
      selectedCheckBoxItemsState.length === 0
    ) {
      let itemCount =
        selectedProductCheckboxAttributesState &&
        selectedProductCheckboxAttributesState[attributeid] &&
        selectedProductCheckboxAttributesState[attributeid].length;

      let priceInventory =
        selectedProductCheckboxAttributesState &&
        selectedProductCheckboxAttributesState.priceInventory;
      console.info("borop3", selectedProductAttributesState);
      let products = [];

      let keys = Object.keys(priceInventory).filter((key) =>
        selectedProductCheckboxAttributesState[attributeid].includes(
          Number(key)
        )
      );

      let outOfStockAll = true;
      for (let key of keys) {
        let product = {};
        product.attributes = [attributeid, key];
        product.optionId = key;
        product.id = priceInventory[key].itemid;
        product.distributorId = priceInventory[key].invs[0].distributorId;
        product.qty = priceInventory[key].qty;

        //if out of stock don't add to the list of products and reduce the number of selected items
        if (priceInventory[key].invs[0].instock) {
          products.push(product);
          outOfStockAll = false;
        } else {
          itemCount -= 1;
        }
      }

      if (outOfStockAll) {
        dispatch(setProductOutOfStockError(true));
        return;
      }

      /*  let attributesObject = {};

      attributesObject = selectedProductCheckboxAttributesState[
        attributeid
      ].map(optionid => {
        return [attributeid, optionid];
      }); */

      dispatch(addToCartCheckboxProduct(itemCount, products, 0, false, vid));
    } else if (
      productAttributeCheckboxFlagState &&
      selectedCheckBoxItemsState &&
      selectedCheckBoxItemsState.length > 0
    ) {
      let itemCount =
        selectedProductCheckboxAttributesState &&
        selectedProductCheckboxAttributesState[attributeid] &&
        selectedProductCheckboxAttributesState[attributeid].length;

      itemCount += selectedCheckBoxItemsState.length;

      let priceInventory =
        selectedProductCheckboxAttributesState &&
        selectedProductCheckboxAttributesState.priceInventory;
      console.info("borop3", selectedProductAttributesState);
      let products = [];

      let keys = Object.keys(priceInventory).filter((key) =>
        selectedProductCheckboxAttributesState[attributeid].includes(
          Number(key)
        )
      );

      let outOfStockAll = true;
      for (let key of keys) {
        let product = {};
        product.attributes = [attributeid, key];
        product.optionId = key;
        product.id = priceInventory[key].itemid;
        product.distributorId = priceInventory[key].invs[0].distributorId;
        product.qty = priceInventory[key].qty;

        //if out of stock don't add to the list of products and reduce the number of selected items
        if (priceInventory[key].invs[0].instock) {
          products.push(product);
          outOfStockAll = false;
        } else {
          itemCount -= 1;
        }
      }

      // add the extras to the products
      selectedCheckBoxItemsState.forEach((item) => {
        let product = {};
        product.id = item.id;
        product.distributorId = item.distId;
        product.qty = item.qty;
        products.push(product);
      });

      if (outOfStockAll) {
        dispatch(setProductOutOfStockError(true));
        return;
      }

      /*  let attributesObject = {};

      attributesObject = selectedProductCheckboxAttributesState[
        attributeid
      ].map(optionid => {
        return [attributeid, optionid];
      }); */

      dispatch(addToCartCheckboxProduct(itemCount, products, 0, false, vid));
    } else if (
      selectedCheckBoxItemsState &&
      selectedCheckBoxItemsState.length > 0
    ) {
      let itemCount = 1 + selectedCheckBoxItemsState.length;
      let products = [];

      // add the actual product to the list of products
      let productItself = {
        distributorId: priceState.prices.find(
          (inv) => inv.distributorId == firstDistId
        ).distributorId,
        id: priceState.itemid,
        qty: 1,
      };

      products.push(productItself);

      selectedCheckBoxItemsState.forEach((item) => {
        let product = {};
        product.id = item.id;
        product.distributorId = item.distId;
        product.qty = item.qty;
        products.push(product);
      });

      dispatch(
        addToCartCheckboxProduct(
          itemCount,
          products,
          0,
          attributesObject,
          false,
          vid
        )
      );
    } else {
      console.info("firstDist", firstDist, vid);

      dispatch(
        getDeliveryOptions(
          priceState.prices.find((inv) => inv.distributorId == firstDistId)
            .distributorId,
          priceState.code,
          numberOfItems,
          priceState.itemid,
          attributesObject,
          quoteMode,
          vid
        )
      );
    }
  };

  const handleSetQuantityInput = (e) => {
    const value = Number(e.target.value);
    if (value > 0 && String(value).length <= 9)
      setNumberOfItems(Number(e.target.value));
  };

  const renderPerUnitText = () => {
    if (perUnitState) {
      return (
        <strong className="add-to-cart-box--per-unit-text">
          {perUnitState}
        </strong>
      );
    } else return null;
  };

  return (
    <React.Fragment>
      <div id="addToCardGrid">
        {/* <div id="pickupShipInfo"></div> */}

        <div>
          {/* <div className="buy-box-qty-price-container">
            

            <div className="buy-box-price-wrapper"
            >
              <div id="buyBoxPrice">
                {isProductDetailsLoading ? (
                  <Loading className="add-to-cart-box--price-loading" />
                ) : (
                  <FormattedNumber
                    value={price / priceConvert}
                    style="currency"
                    currency={currency}
                  />
                )}

                
              </div>
              <div className="offe">40% off applied at checkout</div>
              {renderPerUnitText()}
            </div>
          </div> */}

          {/* <div className="row">
            <div className="col-xs-12">
              <div id="buyBoxItemInfo2">
                <GrandTotalCheckBoxItems price={price} />
              </div>
              <div id="buyBoxItemInfo3"></div>
            </div>
          </div> */}

          <div>
            <div className="addToCardBoxWrapper">
              <WishListBarNew
                data={props.data}
                productUnavailable={props.productUnavailable}
                price={price}
              />
              {props.productUnavailable === false ? (
                <div
                  id="buyBoxAddToCartBtn"
                  className={inStock ? "" : "out-of-stock"}
                >
                  <div
                    className={`addToCartBtn${shouldWiggle ? " wiggle" : ""}`}
                    title={translate("js.item.addtocart")}
                    onClick={() => handleAddToCart()}
                  >
                    
                    
                      <span>{translate("js.item.addtocart")} </span>
                  </div>
                  {requestingAddToCartState ? (
                    <Loading className="addToCartLoading" />
                  ) : null}
                </div>
              ) : (
                <p style={{ margin: "20px 0" }}>
                  SORRY, THIS PRODUCT IS CURRENTLY UNAVAILABLE
                </p>
              )}

             

                      <div
                id="buyBoxQuoteBtn"
                className={`add-to-order${inStock ? "" : " active"}`}
              >
                <div
                  className="addToCartBtn"
                  title="Add to Order"
                  onClick={() => handleAddToCart(true)}
                >
                  <div>
                    <span>Add to Order</span>
                  </div>
                  <div>
                    <i className="material-icons add-icon">description</i>
                  </div>
                </div>
              </div>
               {/* <div id="buyBoxEnquiryBtn">
                <div
                  id="enquiry-204"
                  className="addToCartBtn sendEnquiryBtn"
                  title={translate("js.item.enquiry")}
                  onClick={handleEnquiryModalOpenClicked}
                >
                  <div>{translate("js.item.enquiry")}</div>
                  <div>
                    <span>
                      <i className="material-icons add-icon">mail_outline</i>
                    </span>
                  </div>
                </div>
              </div>  */}

              {/* {isMobileState && (
                <WishListBarMobile
                  data={props.data}
                  productUnavailable={props.productUnavailable}
                  price={price}
                />
              )} */}


              {!inStock && (
                <React.Fragment>
                  <div className="add-to-cart-stock-status">
                    The supplier may still be in progress updating the inventory
                    for this product. Click the Chat button below to chat with
                    the supplier to confirm availability.
                  </div>
                   <NotifyOnReStock
                      supplier={{
                        stock: priceState.invs[0].instock,
                        code: priceState.code,
                        itemid: priceState.itemid
                      }}
                      renderedInsideAddToCartBox={true}
                    /> 
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
        {/* <ChatTheSeller storeSellerData={props.storeInfo.storeSellerData} /> */}
      </div>
    </React.Fragment>
  );
};

export default AddToCartBox;
