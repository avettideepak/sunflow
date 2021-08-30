import React, { useState, useContext } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import ItemCard from "./components/ItemCard";
import Slider from "react-slick";
import { I18nContext } from "../../../../i18n";
import CheckBoxAddon from "./CheckBoxAddon";
import classes from "./CheckBoxAddons.module.css";

import {
  updateSelectedCheckboxItemsQty,
  fetchingCheckboxItemPriceInventory
} from "../../../../redux/actions/productAction";

const Accessories = () => {
  const dispatch = useDispatch();

  const { translate } = useContext(I18nContext);

  const accessoriesState = useSelector(
    state => state.productReducer.checkboxItems,
    shallowEqual
  );

  // const addItem = ()

  const handleSelect = (id, title, imageUrl, price, qty, type, event) => {
    const item = {
      id: id,
      title: title,
      imageUrl: imageUrl,
      qty: qty,
      price: price
    };
    let mode = "remove";
    if (event.target.checked) mode = "add";
    if (type === "update") mode = "update";

    // dispatch(updateSelectedCheckboxItems(item, mode));
    dispatch(fetchingCheckboxItemPriceInventory(item, mode));
  };

  const handleQtyChange = (id, qty, event) => {
    dispatch(updateSelectedCheckboxItemsQty(id, qty));
  };

  if (accessoriesState.length > 0) {
    // return (
    //   <div className="recently-viewed-items-container">
    //     <h1
    //       className="no-select recently-viewed-title"
    //       onClick={() => setRecentlyViewedCollapsed(!recentlyViewedCollapsed)}
    //     >
    //       {/* {translate("accessories.title")} */}
    //       Addons
    //       <i className="material-icons">
    //         keyboard_arrow_{recentlyViewedCollapsed ? "down" : "up"}
    //       </i>
    //     </h1>
    //     <Slider {...settings}>
    //       {accessoriesState.map(item => (
    //         <div key={item.id} className="owl-item col-xs-12">
    //           <ItemCard {...item} />
    //         </div>
    //       ))}
    //     </Slider>
    //   </div>
    // );
    return (
      <div className={classes.wrapper}>
        <div className={classes.headerWrapper}>
          <span className={classes.headerTitle}>Extras</span>
          <span className={classes.headerSub}>Optional</span>
        </div>

        {accessoriesState.map(item => (
          <CheckBoxAddon
            key={item.id}
            item={item}
            select={handleSelect}
            changeQty={handleQtyChange}
          />
        ))}
      </div>

      //   {accessoriesState.map(item => (
      //     <div className={classes.checkboxWrapper} key={item.id}>
      //       {/* <input id={item.id} className={classes.cBox} type="checkbox" onChange={() => setChecked(checked => !checked)}></input> */}
      //       {/* <input id={item.id} className={classes.cBox} type="checkbox" onChange={event => handleClickOnProductCard(item.id, item.title, item.imageUrl, item.price)}></input> */}
      //       <input
      //         className={classes.checkbox}
      //         id={item.id}
      //         type="checkbox"
      //         onChange={event =>
      //           handleSelect(
      //             item.id,
      //             item.title,
      //             item.imageUrl,
      //             item.price,
      //             event
      //           )
      //         }
      //       ></input>
      //       <label className={classes.label} for={item.id}>
      //         <span>{item.title}</span>
      //         <span className={classes.price}>
      //           ${parseFloat(item.price).toFixed(2)}
      //         </span>
      //         <input type="text" value="1" onChange={handleQtyChange}></input>
      //       </label>
      //     </div>
      //   ))}
      // </div>
    );
  } else {
    return null;
  }
};

export default Accessories;
