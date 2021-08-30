import React, { useEffect, useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { toggleWishListAction } from "../../../../redux/actions/wishListActions.js";
import { useLocation } from "@reach/router";

import ItemCard from "../ItemCard/ItemCard_Static";
import ItemCardPages from "../ItemCard/ItemCard_Static_Pages";
import classes from "./CategoryItems_Static.module.css";
import Loading from "../../../AC-Loading/Loading.jsx";

const CategoryItems = ({ data, pageContext, supplier }) => {
  const location = useLocation();

  const dispatch = useDispatch();
  const [categoryItems, setCategoryItems] = useState(data.items);

  useEffect(() => {
    if (typeof window !== undefined) window.scrollTo(0, 0);
  }, []);

  const loading = useSelector(
    state => state.categoryReducer.loading,
    shallowEqual
  );
  const breadState = useSelector(
    state => state.facetReducer.bread,
    shallowEqual
  );
  const urlFilterParamsState = useSelector(
    state => state.facetReducer.urlFilterParams,
    shallowEqual
  );

  const clientSideCategoryItemState = useSelector(
    state => state.categoryReducer.categoryItems,
    shallowEqual
  );

  const backButtonState = useSelector(
    state => state.categoryReducer.backButton,
    shallowEqual
  );

  const scroolPageState = useSelector(
    state => state.categoryReducer.scroolPage,
    shallowEqual
  );

  const currentPageState = useSelector(
    state => state.categoryReducer.currentPage,
    shallowEqual
  );

  const itemsFetchedState = useSelector(
    state => state.categoryReducer.itemsFetched,
    shallowEqual
  );

  const showDynamicState = useSelector(
    state => state.categoryReducer.showDynamic,
    shallowEqual
  );

  useEffect(() => {
    console.log("HELLO ERROR 1");
    if (showDynamicState || breadState.length > 0) {
      console.log("HELLO ERROR 2", clientSideCategoryItemState);
      setCategoryItems(clientSideCategoryItemState);
    } else if (!showDynamicState && scroolPageState !== currentPageState) {
      console.log("HELLO ERROR 3");

      setCategoryItems(clientSideCategoryItemState);
    } else {
      console.log("HELLO ERROR 4");

      setCategoryItems(data.items);
    }
  }, [
    breadState,
    clientSideCategoryItemState,
    urlFilterParamsState,
    scroolPageState,
    showDynamicState
  ]);

  const wishListState = useSelector(
    state => state.wishListReducer.wishlist,
    shallowEqual
  );
  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
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
        code,
        title,
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
    return renderCategoryItems(
      categoryItems,
      toggleWish,
      wishListState,
      supplier,
      pageContext
    );
  }
};

const renderCategoryItems = (
  categoryItems,
  toggleWish,
  wishListState,
  supplier,
  pageContext
) => {
  if (categoryItems && categoryItems.length > 0) {
    return (
      <Grid container className="item-card-container">
        {categoryItems &&
          categoryItems.map((item, index) => {
            let supplierData =
              Object.keys(item).includes("properties") &&
                Object.keys(item.properties).includes("Created_By_Supplier")
                ? supplier.filter(
                  sup =>
                    sup.supplier_vendorId ===
                    item.properties.Created_By_Supplier
                )
                : [];

            if (supplierData.length == 0 && supplier.length == 1) {
              supplierData = supplier
            }

            return (
              <>
                {typeof window !== undefined && (!window.location.pathname.includes("/deals") && !window.location.pathname.includes("/dining") && !window.location.pathname.includes("/entertainment")) ?
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
                      supplier={supplierData}
                    />
                  </Grid> :
                  <Grid
                    item
                    className="item-card-item"
                    xs={6}
                    sm={6}
                    md={4}
                    lg={3}
                    key={index}
                  >
                    <ItemCardPages
                      itemCard={item}
                      key={item.id}
                      toggleWish={toggleWish}
                      wishListState={wishListState}
                      supplier={supplierData}

                    />
                  </Grid>
                }
              </>
            );
          })}
      </Grid>
    );
  } else {
    return (
      <Grid container className="item-card-container">
        <Grid item className="item-card-item" lg={12}>
          {
            pageContext.url && !pageContext.url.includes("stores") && (
              <h3 style={{ textAlign: "center" }}>
                {/* Sorry, this seller doesn't have any products in the marketplace yet.
            Please try again later. */}
                No Data Found
              </h3>
            )

          }

        </Grid>
      </Grid>
    );
  }
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

export default CategoryItems;
