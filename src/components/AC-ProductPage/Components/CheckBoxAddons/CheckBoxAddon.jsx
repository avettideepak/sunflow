import React, { useEffect } from "react";
import { fetchingCheckboxItemPriceInventory } from "../../../../redux/actions/productAction";

import classes from "./CheckBoxAddons.module.css";

const CheckBoxAddon = props => {
  const [numberOfItems, setNumberOfItems] = React.useState(1);

  //
  const handleSetQuantityInput = (e, mode) => {
    let value = "";

    if (!mode) value = Number(e.target.value);
    else if (mode == "increment") {
      console.info("increment", numberOfItems, value);
      value = numberOfItems + 1;
    } else value = numberOfItems - 1;

    if (value > 0) {
      setNumberOfItems(value);
      props.select(
        props.item.id,
        props.item.title,
        props.item.imageUrl,
        props.item.price,
        value,
        "update",
        e
      );

      // const item = {
      //     id: props.item.id,
      //     title: props.item.title,
      //     imageUrl: props.item.imageUrl,
      //     qty: numberOfItems,
      //     price: props.item.price
      //   };
      //   let mode = "update";
      //   dispatch(fetchingCheckboxItemPriceInventory(item, mode));
    }
  };

  //   useEffect(() => {
  //     if(productState && productState2) {
  //         const item = {
  //             id: props.item.id,
  //             title: props.item.title,
  //             imageUrl: props.item.imageUrl,
  //             qty: numberOfItems,
  //             price: props.item.price
  //           };
  //           let mode = "update";
  //           dispatch(fetchingCheckboxItemPriceInventory(item, mode));
  //     }

  //   }, [numberOfItems,productState,productState2]);

  return (
    <div className={classes.checkboxWrapper} key={props.item.id}>
      {/* <input id={item.id} className={classes.cBox} type="checkbox" onChange={() => setChecked(checked => !checked)}></input> */}
      {/* <input id={item.id} className={classes.cBox} type="checkbox" onChange={event => handleClickOnProductCard(item.id, item.title, item.imageUrl, item.price)}></input> */}
      <input
        className={classes.checkbox}
        id={props.item.id}
        type="checkbox"
        onChange={event =>
          props.select(
            props.item.id,
            props.item.title,
            props.item.imageUrl,
            props.item.price,
            numberOfItems,
            null,
            event
          )
        }
      ></input>
      <label className={classes.label} htmlFor={props.item.id}>
        <span>{props.item.title}</span>
        <span className={classes.price}>
          ${parseFloat(props.item.price).toFixed(2)}
        </span>
      </label>

      <div className={classes.qtyWrapper}>
        <div
          className={classes.qtyControl}
          onClick={e => {
            if (numberOfItems - 1 > 0) {
              handleSetQuantityInput(e, "decrement");
            }
          }}
          style={{ cursor: "pointer" }}
        >
          <span>-</span>
        </div>

        <input
          size={String(numberOfItems).length}
          className={classes.qtyInput}
          type="text"
          value={numberOfItems}
          onChange={e => {
            handleSetQuantityInput(e);
          }}
        />
        <div
          className={classes.qtyControl}
          onClick={e => handleSetQuantityInput(e, "increment")}
          style={{ cursor: "pointer" }}
        >
          <span>+</span>
        </div>
      </div>
    </div>
  );
};

export default CheckBoxAddon;
