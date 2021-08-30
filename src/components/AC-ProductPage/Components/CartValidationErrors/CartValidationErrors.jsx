import React, { useContext } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { setAddToCartValidationErrors } from "../../../../redux/actions/productAction";
import { I18nContext } from "../../../../i18n";
import classes from "./Styles/CartValidationErrors.module.css";

const CartValidationErrors = () => {
  const dispatch = useDispatch();

  const { translate } = useContext(I18nContext);

  const validationErrorsState = useSelector(
    state => state.productReducer.itemDetail.cartValidationErrors,
    shallowEqual
  );

  const handleModalClose = () => {
    dispatch(setAddToCartValidationErrors([]));
  };

  if (validationErrorsState && validationErrorsState.length > 0) {
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
            <h6>{translate("cartValidation.followingIsRequired")}</h6>
            <div className={classes.errTextWrapper}>
              {validationErrorsState.map((err, index) => (
                <p key={index} className={classes.errText}>
                  {err}
                </p>
              ))}
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
