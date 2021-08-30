import React, { useState, useEffect, useContext } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { PROJECT_LINK, PREVIEW, VID } from "../../project-config";
import useWindowDimensions from "../../functions/useWindowDimensions";
import { FormattedNumber } from "react-intl";
import Button from "@material-ui/core/Button";
import "./Styles/MiniCart.css";

import { I18nContext } from "../../i18n";
import { useLocation } from "@reach/router";
import { handleDeleteProductFromBasket } from "./handleDeleteProductFromBasket";
import Loading from "../AC-Loading/Loading";

export default function MiniCart({ close }) {
  const dispatch = useDispatch();
  const { translate, currency, priceConvert, langCode } = useContext(
    I18nContext
  );
  const location = useLocation();
  const { height, width } = useWindowDimensions();
  const [isLocal, setisLocal] = useState("");

  const [quotesExpanded, setQuotesExpanded] = useState(true);

  const basketLoadingState = useSelector(
    state => state.sessionReducer.basketLoading,
    shallowEqual
  );

  const suppliersBasketState = useSelector(
    state => state.sessionReducer.suppliersBasket,
    shallowEqual
  );

  const mainSuppliersBasket = useSelector(
    state => state.sessionReducer.basket,
    shallowEqual
  );
  const basketQuoteProductsState = useSelector(
    state => state.sessionReducer.basket.quoteproducts,
    shallowEqual
  );
  const totalPriceProductsState = useSelector(
    state => state.sessionReducer.basket.totalPriceProducts,
    shallowEqual
  );

  const totalPriceQuoteProductsState = useSelector(
    state => state.sessionReducer.basket.totalPriceQuoteProducts,
    shallowEqual
  );

  const languageState = useSelector(
    state => state.mainReducer.lang,
    shallowEqual
  );

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  const vidMain = "20210607181";

  useEffect(() => {
    let languageParam =
      languageState == "en" ? `&ml=${languageState}` : `&iu=${languageState}`;
    if (location.host.includes("localhost")) {
      setisLocal(`${PROJECT_LINK}/basket.html?vid=${vidMain}${languageParam}`);
    } else {
      setisLocal(`${PREVIEW}/basket.html?vid=${vidMain}${languageParam}`);
    }
  }, []);

  const getUrlToCheckBoxOfTheSupplier = vid => {
    let languageParam =
      languageState == "en" ? `&ml=${languageState}` : `&iu=${languageState}`;
    if (location.host.includes("localhost")) {
      return `${PROJECT_LINK}/basket.html?vid=${vidMain}${languageParam}`;
    } else {
      return `${PREVIEW}/basket.html?vid=${vidMain}${languageParam}`;
    }
  };

  const handleDeleteItemFromBasket = (event, vid, id, dispatch) => {
    event.stopPropagation();
    handleDeleteProductFromBasket(suppliersBasketState[vid], vid, id, dispatch);
  };

  const handleEditIconClicked = (event, quoteBasket, vendorid = null) => {
    event.stopPropagation();
    let urlToBasket = isLocal;

    if (vendorid) {
      urlToBasket = getUrlToCheckBoxOfTheSupplier(vendorid);
    }

    if (basketQuoteProductsState.length > 0) {
      window.open(
        urlToBasket + quoteBasket ? "&groupmode=quote" : "&groupmode=checkout",
        "_blank"
      );
    } else {
      location.replace(urlToBasket);
    }
  };

  const renderProductImage = (itemCode, title) => {
    return (
      <div className="minicart-product-image-wrapper">
        <img
          className="minicart-product-image"
          src={`https://ik.imagekit.io/ofb/dev/store/20180522154/assets/items/largeimages/${itemCode}.jpg?tr=w-80,h-80,dpr-2,pr-true,f-auto`}
          alt={`${title}`}
        />
      </div>
    );
  };

  const renderMainSupplierBasket = () => {
    if (
      mainSuppliersBasket &&
      mainSuppliersBasket.products &&
      mainSuppliersBasket.products.length > 0
    ) {
      const handleCheckoutBtnClicked = () => {
        const win = window.open(isLocal + "&groupmode=checkout", "_blank");
        win.focus();
      };

      return (
        <React.Fragment>
          <ul className="cd-cart-items" onClick={e => e.stopPropagation()}>
            <div className="cart-supplier-wrapper">
              {/*   <h1 className="minicart-main-supplier-title">OTIAD</h1> */}
              {mainSuppliersBasket.products.map(
                (
                  { imageurl, title, price, qty, distName, itemid, itemcode },
                  index
                ) => {
                  return (
                    <li key={itemid}>
                      {renderProductImage(itemcode, title)}
                      <p className="minicart-item-distname">
                        {distName}
                        <i
                          onClick={event => handleEditIconClicked(event, true)}
                          className="material-icons minicart-item-edit-icon"
                        >
                          edit
                        </i>
                      </p>
                      <p>{title.replace("&quot;", '"')}</p>
                      <p>
                          <FormattedNumber
                            value={price / priceConvert}
                            style="currency"
                            currency={"USD"}
                            children={result => <b>{result}</b>}
                          />
                        </p>
                      <p>Quantity : {qty}</p>
                      
                      <div className="cd-price">
                        
                      </div>
                    </li>
                  );
                }
              )}
              <div className="mini-cart-supplier-total">
                <p>
                  <b>
                    {translate("vm.myaccounthome_total")}
                    <span>
                      <FormattedNumber
                        value={
                          mainSuppliersBasket.totalPriceProducts / priceConvert
                        }
                        style="currency"
                        currency={"USD"}
                      />
                    </span>
                  </b>
                </p>
                <div className="supplier-checkout-btn-wrapper">
                  <span
                    onClick={() => handleCheckoutBtnClicked()}
                    className="supplier-checkout-btn"
                  >
                    {translate("ContinuetoCheckout")}
                  </span>
                </div>
              </div>
            </div>
          </ul>
        </React.Fragment>
      );
    }
  };

  const renderSuppliersProducts = keyVid => {
    let totalPriceForTheSupplier = suppliersBasketState[keyVid].products.reduce(
      (a, { price, qty }) => {
        a += price * qty;
        return a;
      },
      0
    );

    const handleSupplierCheckOutBtnClicked = () => {
      const win = window.open(
        getUrlToCheckBoxOfTheSupplier(keyVid) + "&groupmode=checkout",
        "_blank"
      );
      win.focus();
    };

    const handleAttributeTextRender = attributes => {
      let attributeText = "";
      if (attributes && attributes.length > 0) {
        attributeText = "-";
        attributeText += attributes.reduce((a, c) => {
          a += ` ${c.ddText}`;
          return a;
        }, "");
      }
      return attributeText;
    };

    return (
      <React.Fragment>
        {suppliersBasketState[keyVid].products.map(
          ({
            imageurl,
            title,
            price,
            qty,
            distName,
            vendorid,
            itemid,
            itemcode,
            attributes,
            id
          }) => {
            return (
              <li key={itemid}>
                {renderProductImage(itemcode, title)}
                <div className="mini-cart-icon-title-wrapper">
                  <p>
                    {title.replace("&quot;", '"')}{" "}
                    <span className="minit-cart-attribute">
                      {handleAttributeTextRender(attributes)}
                    </span>
                  </p>
                  {/* <i
                    title="Remove"
                    style={{ float: "right" }}
                    onClick={event =>
                      handleDeleteItemFromBasket(event, vendorid, id, dispatch)
                    }
                    className={`material-icons-outlined minicart-item-edit-icon${
                      isMobileState ? " mobile" : ""
                    }`}
                  >
                    delete
                  </i> */}
                </div>
                <div className="mini-cart-icon-title-wrapper">
                  Quantity : {qty}
                </div>
                <div className="mini-cart-icon-title-wrapper">
                   Price :  <FormattedNumber
                      value={price / priceConvert}
                      style="currency"
                      currency={"USD"}
                      children={result => <span>{result}</span>}
                    />
                </div>
              </li>
            );
          }
        )}
        <div className="mini-cart-supplier-total">
          <p>
            <b>
              {translate("vm.myaccounthome_total")}
              <span>
                <FormattedNumber
                  value={totalPriceForTheSupplier / priceConvert}
                  style="currency"
                  currency={"USD"}
                />
              </span>
            </b>
          </p>
          <div className="supplier-checkout-btn-wrapper">
            <span
              onClick={() => handleSupplierCheckOutBtnClicked()}
              className="supplier-checkout-btn"
            >
              {translate("ContinuetoCheckout")}
            </span>
          </div>
        </div>
      </React.Fragment>
    );
  };

  const renderQuoteRequests = () => {
    if (basketQuoteProductsState.length > 0) {
      return (
        <React.Fragment>
          <div
            style={{
              backgroundColor: "#000000",
              color: "white",
              cursor: "pointer"
            }}
            onClick={event => {
              event.stopPropagation();
              setQuotesExpanded(!quotesExpanded);
            }}
          >
            <h6 className="minicart-title">
              {translate("QuoteRequests")}
              <i
                className="material-icons"
                style={{ cursor: "pointer", fontSize: "24px", marginRight: "10px" }}
              >
                keyboard_arrow_down
              </i>
            </h6>
          </div>
          <div
            className={`quote-requests-wrapper${
              quotesExpanded ? ` expanded` : ``
            }`}
          >
            {basketQuoteProductsState.map(
              ({ imageurl, title, price, qty, distName }, index) => {
                return (
                  <li>
                    <p className="minicart-item-distname">
                      {distName}
                      <i
                        onClick={event => handleEditIconClicked(event, true)}
                        className="material-icons minicart-item-edit-icon"
                      >
                        edit
                      </i>
                    </p>
                    <p>{title.replace("&quot;", '"')}</p>
                    <p className="currency-p">
                        <b style={{ float: "right" }}>{qty}</b>
                        <FormattedNumber
                          value={price / priceConvert}
                          style="currency"
                          currency={"USD"}
                          children={result => <b>{result}</b>}
                        />
                      </p>
                    <div className="cd-price">
                      
                    </div>
                  </li>
                );
              }
            )}
            {renderTotalPriceSection(true)}
            <div className="continue-check text-center">
              <span>
                <Button
                  onClick={event => event.stopPropagation()}
                  target={basketQuoteProductsState.length > 0 ? "_blank" : ""}
                  href={isLocal + "&groupmode=quote"}
                  style={{
                    borderRadius: 0
                  }}
                  variant="contained"
                  color="primary"
                  className={"checkout-btn active"}
                >
                  {translate("Continue")}
                </Button>
              </span>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return null;
    }
  };

  const renderMiniCartContent = () => {
    return (
      <React.Fragment>
        {suppliersBasketState &&
        Object.keys(suppliersBasketState).length === 0 &&
        mainSuppliersBasket &&
        mainSuppliersBasket.products &&
        mainSuppliersBasket.products.length === 0 ? (
          <span className="minicart-count">{translate("Emptycart")}</span>
        ) : null}

        <ul className="cd-cart-items" onClick={e => e.stopPropagation()}>
          {Object.keys(suppliersBasketState).length > 0
            ? Object.keys(suppliersBasketState).map((keyVid, index) => {
                return (
                  <div key={keyVid} className="cart-supplier-wrapper">
                    <p className="minicart-item-distname">
                      {suppliersBasketState[keyVid].marketpaceName}
                    </p>
                    {renderSuppliersProducts(keyVid)}
                  </div>
                );
              })
            : null}
          {renderMainSupplierBasket()}
          {/*         {basketQuoteProductsState.length > 0
            ? renderTotalPriceSection()
            : null}
          {basketQuoteProductsState.length > 0 ? renderCheckoutButton() : null}
          {renderQuoteRequests()} */}
        </ul>
      </React.Fragment>
    );
  };

  const renderTotalPriceSection = (renderForQuote = false) => {
    if (suppliersBasketState.length > 0 && !renderForQuote) {
      return (
        <div
          className="cd-cart-total"
          style={{
            backgroundColor: "#4e4e4e",
            color: "white",
            position: basketQuoteProductsState.length === 0 ? "fixed" : ""
          }}
        >
          <p>
            <b>
              {translate("vm.myaccounthome_total")}
              <span>
                <FormattedNumber
                  value={totalPriceProductsState / priceConvert}
                  style="currency"
                  currency={"USD"}
                />
              </span>
            </b>
          </p>
        </div>
      );
    } else if (basketQuoteProductsState.length > 0 && renderForQuote) {
      return (
        <div
          className={"cd-cart-total quote"}
          style={{ backgroundColor: "#4e4e4e", color: "white" }}
        >
          <p>
            <b>
              {translate("vm.myaccounthome_total")}
              <span>
                <FormattedNumber
                  value={totalPriceQuoteProductsState / priceConvert}
                  style="currency"
                  currency={"USD"}
                />
              </span>
            </b>
          </p>
        </div>
      );
    } else {
      return null;
    }
  };

  const renderCheckoutButton = () => {
    return (
      <div className="continue-check text-center">
        <span>
          <Button
            onClick={event => event.stopPropagation()}
            target={basketQuoteProductsState.length > 0 ? "_blank" : ""}
            href={isLocal + "&groupmode=checkout"}
            style={{
              borderRadius: 0
            }}
            variant="contained"
            color="primary"
            className={
              "checkout-btn" +
              `${suppliersBasketState.length > 0 ? " active" : ""}`
            }
            disabled={suppliersBasketState.length !== 0 ? false : true}
          >
            {suppliersBasketState.length !== 0
              ? translate("ContinuetoCheckout")
              : translate("Continue")}
          </Button>
        </span>
      </div>
    );
  };

  const renderBasketLoading = () => {
    if (basketLoadingState) {
      return (
        <div
          onClick={e => e.stopPropagation()}
          className="minicart-loading-container"
        >
          <Loading className="minicart-updating-loading" />
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div
      style={isMobileState ? { width: width } : { width: "350px" }}
      className={langCode === "ar" ? "rtl" : ""}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: height,
          justifyContent: "space-between",
          backgroundColor: "white"
        }}
      >
        {renderBasketLoading()}
        <div>
          <div style={{ backgroundColor: "#f1f1f1", color: "#000" }}>
            <h6 className="minicart-title">
              {translate("ShoppingCart")}
              <i
                className="material-icons"
                onClick={() => close()}
                style={{ cursor: "pointer", fontSize: "20px" }}
              >
                close
              </i>
            </h6>
          </div>

          <div
            className={`${
              basketQuoteProductsState.length === 0 ? "no-quote " : ""
            }minicat-content-wrapper${
              isMobileState ? " scroll-bar-thin-style" : ""
            }`}
          >
            {renderMiniCartContent()}
          </div>
          {/*      {basketQuoteProductsState.length === 0
              ? renderTotalPriceSection()
              : null} */}
        </div>
        {/*       {basketQuoteProductsState.length === 0
            ? renderCheckoutButton()
            : null} */}
      </div>
    </div>
  );
}
