import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";

import StoreCard from "./StoreCard";
import Loading from "../../AC-Loading/CSSLoading";
import NoItems from "../../AC-CategoryPage/components/NoItems/NoItems_Static";
import StoreMap from "./StoreMap";

export default function StoreItemsGatsby({ data, pageContext }) {
  const dispatch = useDispatch();

  const [storesState, setStoresState] = useState([]);

  useEffect(() => {
    console.error("STORES STATE", storesState);
  }, [storesState]);
  const storeItemsAreLoading = useSelector(
    state => state.storeReducer.loading,
    shallowEqual
  );

  const storesItemsState = useSelector(
    state => state.storeReducer.stores,
    shallowEqual
  );

  const showDynamicState = useSelector(
    state => state.categoryReducer.showDynamic,
    shallowEqual
  );

  useEffect(() => {
    setStoresState(storesItemsState);
  }, [showDynamicState, storesState, storeItemsAreLoading]);

  if (storeItemsAreLoading) {
    return <Loading />;
  } else if (storesState && storesState.length === 0) {
    return <NoItems />;
  } else {
    return (
      <Grid container className="item-card-container">
        <StoreMap />
        {storesState &&
          storesState.map(item => {
            return (
              <Grid
                item
                className="item-card-item-regular"
                xs={6}
                sm={6}
                md={4}
                lg={3}
                key={item.id}
              >
                <StoreCard
                  renderedBy={"sellers-page"}
                  itemCard={item}
                  key={item.id}
                />
              </Grid>
            );
          })}
      </Grid>
    );
  }
}

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
