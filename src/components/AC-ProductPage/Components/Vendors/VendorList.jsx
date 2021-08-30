import React from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import {
  getDeliveryOptions,
  addToLocalMiniCart
} from "../../../../redux/actions/productAction";

import { I18nContext } from "../../../../i18n/index";
import { FormattedNumber } from "react-intl";

import "./Styles/VendorList.css";

const VendorList = ({ handleEnquiryModalOpenClicked }) => {
  const dispatch = useDispatch();
  const { translate, currency, priceConvert } = React.useContext(I18nContext);

  const [supplierState, setSupplierState] = React.useState([]);
  const [addToCartNumber, setAddToCartNumber] = React.useState({});
  const [supplierPrice, setSupplierPrice] = React.useState({});
  const [price, setPrice] = React.useState(0);
  const [selectedDropdownValues, setSelectedDropdownValues] = React.useState({
    name: "--all--",
    city: "--all--",
    distid: "--all--"
  });

  const priceState = useSelector(
    state => state.productReducer.priceInventory,
    shallowEqual
  );

  const skuPriceState = useSelector(
    state => state.productReducer.skuPrice,
    shallowEqual
  );

  React.useEffect(() => {
    if (Object.keys(skuPriceState).length > 0) {
      setPrice(skuPriceState.prices[0].price_1);
    } else if (Object.keys(priceState).length > 0) {
      setPrice(priceState.prices[0].price_1);
    }
  }, [priceState, skuPriceState]);

  const supplierInfoState = useSelector(
    state => state.productReducer.supplierInfo,
    shallowEqual
  );
  const priceInventoryState = useSelector(
    state => state.productReducer.priceInventory,
    shallowEqual
  );

  const mainItemIdState = useSelector(
    state => state.productReducer.itemDetail.mainitemid,
    shallowEqual
  );

  const selectedProductAttributesState = useSelector(
    state => state.productReducer.selectedProductAttributes,
    shallowEqual
  );

  const currencyState = useSelector(
    state => state.mainReducer.currency,
    shallowEqual
  );

  const productInitialStateFromFetchTitle = useSelector(
    state => state.productReducer.productInitial.title,
    shallowEqual
  );

  React.useEffect(() => {
    if (supplierInfoState.length > 0) {
      let supp = [...supplierInfoState[0].distributorOrder];
      supp.shift();
      setSupplierState(supp);

      let countStarter = {};
      supplierInfoState[0].distributorOrder.map(sup => {
        countStarter = { ...countStarter, [sup.distid]: 1 };
      });
      setAddToCartNumber(countStarter);
    }
  }, [supplierInfoState]);

  React.useEffect(() => {
    if (Object.keys(priceInventoryState).length > 0) {
      let tempPrices = {};
      priceInventoryState.prices.map(supp => {
        tempPrices = { ...tempPrices, [supp.distributorId]: supp.listprice };
      });
      setSupplierPrice(tempPrices);
    }
  }, [priceInventoryState]);

  const handleAddToCart = distributorId => {
    let attributesObject = null;
    if (
      mainItemIdState &&
      mainItemIdState != 0 &&
      selectedProductAttributesState &&
      selectedProductAttributesState.length > 0
    ) {
      attributesObject = selectedProductAttributesState[mainItemIdState];
    }
    dispatch(
      getDeliveryOptions(
        distributorId,
        supplierInfoState[0].code,
        addToCartNumber[distributorId],
        supplierInfoState[0].itemid,
        attributesObject
      )
    );
  };

  const handleAddToQuote = distributorId => {
    let attributesObject = null;
    if (
      mainItemIdState &&
      mainItemIdState !== 0 &&
      selectedProductAttributesState
    ) {
      if (selectedProductAttributesState.hasOwnProperty(mainItemIdState)) {
        attributesObject = selectedProductAttributesState[mainItemIdState];
      }
    }

    let supplierName = supplierInfoState[0].distributorOrder.filter(
      dist => dist.distid == distributorId
    ).name;

    dispatch(
      getDeliveryOptions(
        distributorId,
        supplierInfoState[0].code,
        addToCartNumber[distributorId],
        supplierInfoState[0].itemid,
        attributesObject,
        true
      )
    );

    dispatch(
      addToLocalMiniCart(
        productInitialStateFromFetchTitle,
        price,
        addToCartNumber[distributorId],
        supplierName
      )
    );
  };

  const onVarientsDropdownChange = (event, key) => {
    const { value } = event.target;
    if (value == "--all--") {
      // console.info(supplierInfoState);
      setSupplierState(supplierInfoState[0].distributorOrder);
    } else {
      setSupplierState(supplierState.filter(sup => sup[key] == value));
    }
    setSelectedDropdownValues({ ...selectedDropdownValues, [key]: value });
    console.info(selectedDropdownValues);
  };

  if (supplierState.length > 0) {
    return (
      <div className="col-xs-12" style={{ backgroundColor: "white" }}>
        <div className="also-available-wrapper">
          <h2 className="also-available-header">
            {translate("js.item.alsoavailable")}
          </h2>
          <div
            style={{ paddingTop: "7px" }}
            className="itemDistributors"
            id="js-item-distributors-294311"
          >
            <table
              id="myTable"
              border="1"
              className="table table-bordered table-striped ddtf-processed"
            >
              <thead>
                <tr>
                  <th>
                    <div style={{ display: "none" }}>
                      {translate("js.item.seller")}
                    </div>
                    <select
                      onChange={event =>
                        onVarientsDropdownChange(event, "name")
                      }
                      className="form-control varients_dropdown"
                    >
                      <option value="--all--">
                        {translate("js.item.seller")}
                      </option>
                      {supplierInfoState.length > 0
                        ? supplierState.map((sup, index) => (
                            <option
                              selected={
                                selectedDropdownValues["name"] == sup.name
                              }
                              key={index}
                              value={sup.name}
                            >
                              {sup.name}
                            </option>
                          ))
                        : null}
                    </select>
                  </th>
                  <th>
                    <div style={{ display: "none" }}>
                      {translate("js.item.location")}
                    </div>
                    <select
                      onChange={event =>
                        onVarientsDropdownChange(event, "city")
                      }
                      className="form-control varients_dropdown"
                    >
                      <option value="--all--">
                        {translate("js.item.location")}
                      </option>
                      {supplierInfoState.length > 0
                        ? supplierState.map((sup, index) => (
                            <option
                              selected={
                                selectedDropdownValues["city"] == sup.city
                              }
                              key={index}
                              value={sup.city}
                            >
                              {sup.city}
                            </option>
                          ))
                        : null}
                    </select>
                  </th>
                  <th>Seller Rating </th>
                  <th>
                    <div style={{ display: "none" }}>
                      {translate("js.item.price")}
                    </div>
                    <select
                      onChange={event =>
                        onVarientsDropdownChange(event, "distid")
                      }
                      className="form-control varients_dropdown"
                    >
                      <option value="--all--">
                        {translate("js.item.price")}
                      </option>
                      {supplierInfoState.length > 0
                        ? supplierState.map(sup => {
                            console.info("price", supplierPrice);

                            return (
                              <FormattedNumber
                                value={supplierPrice[sup.distid] / priceConvert}
                                style="currency"
                                currency={currency}
                                children={result => (
                                  <option
                                    selected={
                                      selectedDropdownValues["distid"] ==
                                      sup.distid
                                    }
                                    value={sup.distid}
                                  >
                                    {result}
                                  </option>
                                )}
                              ></FormattedNumber>
                            );
                          })
                        : null}
                    </select>
                  </th>
                  <th>{translate("js.item.quantity")}</th>
                  <th>{translate("js.item.cart")}</th>
                  <th>{translate("js.item.quote")}</th>
                  <th>{translate("js.item.enquiry")}</th>
                </tr>
              </thead>
              <tbody>
                {supplierInfoState.length > 0
                  ? supplierState.map(sup => (
                      <tr key={sup.distid}>
                        <td>{sup.name}</td>
                        <td>{sup.city}</td>
                        <td>
                          <div className="dist-item-rating-206 text-center">
                            <i className="material-icons">star_border</i>
                            <i className="material-icons">star_border</i>
                            <i className="material-icons">star_border</i>
                            <i className="material-icons">star_border</i>
                            <i className="material-icons">star_border</i>
                            <br />
                            <div className="distReviewCount">
                              0 {translate("js.item.reviews")}
                            </div>
                          </div>
                        </td>
                        <td>
                          <FormattedNumber
                            value={supplierPrice[sup.distid] / priceConvert}
                            style="currency"
                            currency={currency}
                          />
                          {/* <span className="symbol">
                            {currencyState.sign && currencyState.sign}
                          </span>
                          <span className="dollars">
                            {supplierPrice[sup.distid]}
                          </span>
                  {currencyState.code && currencyState.code}*/}
                        </td>
                        <td>
                          <div className="qtyControlsBox">
                            <div className="qtyControlsBtns">
                              <div className="qtyControlsPlus">
                                <span
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    setAddToCartNumber({
                                      ...addToCartNumber,
                                      [sup.distid]:
                                        addToCartNumber[sup.distid] + 1
                                    })
                                  }
                                >
                                  +
                                </span>
                              </div>
                              <div className="qtyControlsMinus">
                                <span
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    if (addToCartNumber[sup.distid] - 1 > 0) {
                                      setAddToCartNumber({
                                        ...addToCartNumber,
                                        [sup.distid]:
                                          addToCartNumber[sup.distid] - 1
                                      });
                                    }
                                  }}
                                >
                                  -
                                </span>
                              </div>
                            </div>
                            <input
                              id="qtybox-dist-206"
                              className="qtyControlsInput"
                              type="text"
                              value={addToCartNumber[sup.distid]}
                              onChange={e =>
                                setAddToCartNumber({
                                  ...addToCartNumber,
                                  [sup.distid]: Number(e.target.value)
                                })
                              }
                            />
                            <div className="clearfix"></div>
                          </div>
                        </td>
                        <td>
                          <div
                            className="addToCartBtn cartBtn"
                            title={translate("js.item.addtocart")}
                            onClick={() => handleAddToCart(sup.distid)}
                          >
                            <span>
                              <i className="material-icons add-icon">
                                add_shopping_cart
                              </i>
                            </span>
                          </div>
                        </td>
                        <td>
                          <div
                            className="addToCartBtn"
                            title={translate("js.item.addtoquote")}
                            onClick={() => handleAddToQuote(sup.distid)}
                          >
                            <span>
                              <i className="material-icons add-icon">
                                description
                              </i>
                            </span>
                          </div>
                        </td>
                        <td>
                          <div
                            id="enquiry-206"
                            className="addToCartBtn sendEnquiryBtn"
                            title={translate("js.item.enquiry")}
                            onClick={() => handleEnquiryModalOpenClicked()}
                          >
                            <span>
                              <i className="material-icons add-icon">
                                mail_outline
                              </i>
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default VendorList;
