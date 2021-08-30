import React, { useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { toggleWishListAction } from "../../../../redux/actions/wishListActions.js";

import ItemCard from "../ItemCard/ItemCard.jsx";

export default function CategoryItems({ isMobileState }) {
  const dispatch = useDispatch();
  const categoryItems = useSelector(
    state => state.categoryReducer.categoryItems,
    shallowEqual
  );

  const wishListState = useSelector(
    state => state.wishListReducer.wishlist,
    shallowEqual
  );

  const itemsAreBeingFetchedState = useSelector(
    state => state.facetReducer.itemsAreBeingFetched,
    shallowEqual
  );

  const toggleWish = (
    e,
    id,
    code,
    title,
    desc,
    currency_sign,
    image,
    price,
    url
  ) => {
    e.preventDefault();
    dispatch(
      toggleWishListAction(
        id,
        title,
        code,
        desc,
        currency_sign,
        image,
        price,
        url,
        wishListState
      )
    );
  };

  if (itemsAreBeingFetchedState) {
    return renderPlaceholderCategoryItems();
  } else {
    return renderCategoryItems(categoryItems, toggleWish, wishListState);
  }
}

const renderCategoryItems = (categoryItems, toggleWish, wishListState) => {
  return (
    <Grid container className="item-card-container">
      {categoryItems &&
        categoryItems.map((item, index) => {
          return (
            <Grid
              item
              className="item-card-item"
              xs={6}
              sm={6}
              md={4}
              lg={3}
              key={index}
            >
              <ItemCard
                itemCard={item}
                key={item.id}
                toggleWish={toggleWish}
                wishListState={wishListState}
              />
            </Grid>
          );
        })}
    </Grid>
    // <div className="item-card-container">
    //   {categoryItems.map(item => {
    //     return (
    //       <div
    //         className="item-card-item"
    //         key={item.id}
    //       >
    //         <ItemCard
    //           itemCard={item}
    //           key={item.id}
    //           toggleWish={toggleWish}
    //           wishListState={wishListState}
    //         />
    //       </div>
    //     );
    //   })}
    // </div>
  );
};

export const renderPlaceholderCategoryItems = () => {
  return (
    <Grid container className="item-card-container">
      {Array(8)
        .fill(0, 0, 8)
        .map((_, index) => (
          <Grid
            key={index}
            item
            className="item-card-item"
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <div
              className="placeholder-item-card-wrapper"
              style={{ boxShadow: "0px 0px 1px 0px #c8c8c8" }}
            >
              <div
                style={{
                  backgroundColor: "#fff",
                  height: "260px"
                }}
              ></div>
              <div>
                <div
                  style={{
                    backgroundColor: "#f5f5f5",
                    height: "40px"
                  }}
                ></div>
              </div>
            </div>
          </Grid>
        ))}
    </Grid>
  );
};
