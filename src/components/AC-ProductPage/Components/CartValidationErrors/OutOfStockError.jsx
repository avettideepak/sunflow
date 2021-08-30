import React, { useContext } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { setProductOutOfStockError } from "../../../../redux/actions/productAction";
import { I18nContext } from "../../../../i18n";
import classes from "./Styles/OutOfStockError.module.css";
import { setHandlerAction } from "../../../../redux/actions/handlersAction";

const CartValidationErrors = () => {
  const dispatch = useDispatch();

  const { translate } = useContext(I18nContext);

  const productOutOfStockErrorState = useSelector(
    state => state.productReducer.itemDetail.productOutOfStockError,
    shallowEqual
  );

  const handleModalClose = () => {
    dispatch(setProductOutOfStockError(false));
  };

  const handleClickHereBtnClicked = () => {
    dispatch(setProductOutOfStockError(false));
    dispatch(setHandlerAction({ name: "notifyModalOpen", value: true }));
  };

  if (productOutOfStockErrorState) {
    return (
      <div className={classes.container} onClick={handleModalClose}>
        <div
          className={classes.wrapper}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <div className={classes.head}>
            <h4>{translate("cartValidation.problemAddingToCart")}</h4>
            <i className="material-icons" onClick={handleModalClose}>
              close
            </i>
          </div>
          <div className={classes.body}>
            <div className={classes.errTextWrapper}>
              Sorry, this product is currently out of stock.{" "}
              {/* Click{" "}
              <b
                onClick={handleClickHereBtnClicked}
                className={classes.clickHereBtn}
              >
                here
              </b>{" "}
              if you would like to be notified when the product is in stock
              again. */}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default CartValidationErrors;
