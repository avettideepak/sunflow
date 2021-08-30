import React, { useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";

import StoreCard from "./StoreCard";
import StoreMap from "./StoreMap";

export default function StoreItems() {
  const dispatch = useDispatch();

  const storesState = useSelector(
    state => state.storeReducer.stores,
    shallowEqual
  );

  const storeItemsAreLoading = useSelector(
    state => state.categoryReducer.loading,
    shallowEqual
  );

  if (storeItemsAreLoading) {
    return null; //renderPlaceholderCategoryItems();
  } else {
    return <React.Fragment>{renderStoreItems(storesState)}</React.Fragment>;
  }
}

const renderStoreItems = items => {
  return (
    <Grid container className="item-card-container">
      {items.map(item => {
        return (
          <Grid
            item
            className="item-card-item dd"
            xs={6}
            sm={6}
            md={4}
            lg={3}
            key={item.id}
          >
            <StoreCard itemCard={item} key={item.id} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export const renderPlaceholderCategoryItems = () => {
  return (
    <Grid container className="item-card-container">
      {Array(8)
        .fill(0, 0, 8)
        .map(_ => (
          <Grid item className="item-card-item" xs={12} sm={6} md={4} lg={3}>
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
