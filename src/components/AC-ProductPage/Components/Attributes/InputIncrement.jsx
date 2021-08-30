import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import classes from "./Styles/InputIncrement.module.css";
import { setAttributeCheckboxQtyAction } from "../../../../redux/actions/productAction";

const InputIncrement = ({ optionid, stock }) => {
  const dispatch = useDispatch();

  const currentQuantityState = useSelector(
    state =>
      state.productReducer.selectedProductCheckboxAttributes.priceInventory[
        optionid
      ].qty,
    shallowEqual
  );

  const decrementBtnClicked = () => {
    if (currentQuantityState === 1) {
      return;
    }
    let currentQty = currentQuantityState * 1;
    dispatch(
      setAttributeCheckboxQtyAction({ optionid: optionid, qty: currentQty - 1 })
    );
  };
  const incrementBtnClicked = () => {
    if (stock <= currentQuantityState) {
      return;
    }
    let currentQty = currentQuantityState * 1;
    dispatch(
      setAttributeCheckboxQtyAction({ optionid: optionid, qty: currentQty + 1 })
    );
  };

  const handleInputChange = e => {
    const { value } = e.target;

    if (isNaN(value) || value > stock || value < 0) {
      return;
    }

    dispatch(
      setAttributeCheckboxQtyAction({ optionid: optionid, qty: Number(value) })
    );
  };

  const handleOnBlurInput = e => {
    const { value } = e.target;

    console.info("value borop", value);
    if (value <= 0) {
      dispatch(setAttributeCheckboxQtyAction({ optionid: optionid, qty: 1 }));
    }
  };

  const renderInputField = () => {
    if (stock > 5) {
      return (
        <input
          onBlur={handleOnBlurInput}
          size={String(currentQuantityState).length || 1}
          className={classes.currentQtyInput}
          onChange={handleInputChange}
          value={currentQuantityState}
        ></input>
      );
    } else
      return (
        <span className={[classes.currentQuantity, classes.btn].join(" ")}>
          {currentQuantityState}
        </span>
      );
  };

  return (
    <div className={classes.container}>
      <span
        aria-disabled={currentQuantityState === 1}
        onClick={decrementBtnClicked}
        className={[classes.decrementBtn, classes.btn, "no-select"].join(" ")}
      >
        -
      </span>
      {renderInputField()}
      <span
        aria-disabled={stock <= currentQuantityState}
        onClick={incrementBtnClicked}
        className={[classes.incrementBtn, classes.btn, "no-select"].join(" ")}
      >
        +
      </span>

      <span className={classes.stockCounter}>{stock} in stock</span>
    </div>
  );
};

export default InputIncrement;
