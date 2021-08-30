/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Grid from "@material-ui/core/Grid";

import CategoryItems from "@components/AC-CategoryPage/components/CategoryItems/CategoryItems.jsx";
import Facets from "@/components/AC-Facets/FacetsHorizontal";
import Pagination from "@components/AC-Pagination/Pagination.jsx";
import NumberOfItems from "@/components/AC-Pagination/NumberofItems";
import Loading from "@components/AC-Loading/Loading.jsx";
import FacetBreadcrumb from "@components/AC-Breadcrumb/FacetBreadcrumb.jsx";
import Async from "react-code-splitting";
import SortBy from "@components/AC-SortBy/SortBy.jsx";
import Facets_Mobile from "@components/AC-Facets/Facets_Mobile.jsx";
import { renderPlaceholderCategoryItems } from "@components/AC-CategoryPage/components/CategoryItems/CategoryItems.jsx";
import NoItems from "@components/AC-CategoryPage/components/NoItems/NoItems";

import {
  dispatchScroolPage,
  nextPage
} from "@/redux/actions/paginationActions.js";
import { I18nContext } from "@/i18n";

import LoadMorePage from "@components/AC-Pagination/LoadMorePage.jsx";

const CategoryHeader = () => (
  <Async
    load={import(
      "@components/AC-CategoryPage/components/CategoryHeader/CategoryHeader.jsx"
    )}
  />
);

function Category(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { translate } = useContext(I18nContext);
  const [filterButtonClicked, setFilterButtonClicked] = useState(false);

  const dispatch = useDispatch();

  const loadingState = useSelector(
    state => state.categoryReducer.loading,
    shallowEqual
  );

  const catNameState = useSelector(
    state => state.categoryReducer.cat,
    shallowEqual
  );

  const loading = catNameState == "Sellers" ? true : loadingState; // On homepage we are requesting the sellers and if we switch to a cat page fast enough, it would display the stores for a second

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  const loadingBottom = useSelector(
    state => state.categoryReducer.loadingBottom,
    shallowEqual
  );

  const pagesState = useSelector(
    state => state.categoryReducer.pages,
    shallowEqual
  );

  const keywordState = useSelector(
    state => state.categoryReducer.keyword,
    shallowEqual
  );

  const loadMorePageState = useSelector(
    state => state.categoryReducer.loadMorePage,
    shallowEqual
  );

  const noItemFoundState = useSelector(
    state => state.categoryReducer.noItemFound,
    shallowEqual
  );

  const currentPageState = useSelector(
    state => state.categoryReducer.currentPage,
    shallowEqual
  );

  const scroolPageState = useSelector(
    state => state.categoryReducer.scroolPage,
    shallowEqual
  );

  const cidState = useSelector(
    state => state.categoryReducer.cidN,
    shallowEqual
  );

  const facetsState = useSelector(
    state => state.facetReducer.facets,
    shallowEqual
  );

  const numberOfItemState = useSelector(
    state => state.categoryReducer.numberOfItems,
    shallowEqual
  );

  const numberOfItemsGridSizes = {
    xs: numberOfItemState === 0 ? 12 : 6,
    sm: numberOfItemState === 0 ? 12 : 6,
    md: numberOfItemState === 0 ? 12 : 3
  };
  const handleNextPage = page => {
    if (scroolPageState < pagesState.length || page != 0) {
      dispatch(dispatchScroolPage(page));
      dispatch(nextPage(page, cidState, true));
    } else {
      console.info("End of the page");
    }
  };

  const handleFilterButtonClicked = () => {
    document.getElementById("___gatsby").setAttribute("aria-hidden", true);
    setFilterButtonClicked(true);
  };

  const handleFacetContentCloseIconClicked = () => {
    document.getElementById("___gatsby").setAttribute("aria-hidden", false);
    setFilterButtonClicked(false);
  };

  const renderMobileFacets = (
    <React.Fragment>
      <button onClick={() => handleFilterButtonClicked()}>
        {translate("mobile_facets.filterButtonText")}
        <i className="material-icons">filter_list</i>
      </button>
      <Facets_Mobile
        filterButtonClicked={filterButtonClicked}
        handleFacetContentCloseIconClicked={handleFacetContentCloseIconClicked}
      />
    </React.Fragment>
  );

  console.info("scroll page", scroolPageState);

  const renderFacets = <Facets />;

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("scroll", handleOnScroll);
    }, 200);

    // returned function will be called on component unmount
    return () => {
      window.removeEventListener("scroll", handleOnScroll);
    };
  }, [scroolPageState]);

  console.info("LOADING", loading);

  let handleOnScroll = () => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom =
      Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom && !loading && loadMorePageState) {
      handleNextPage(scroolPageState + 1);
    }
  };

  if (noItemFoundState && cidState === "search") {
    return (
      <div id="">
        <div className="main">
          <CategoryHeader />

          <div className="row">
            <div className="category-container">
              <h2 className="category-no-item-found-header">
                {`There were no results found for "${keywordState.replace(
                  /%20/g,
                  " "
                )}". Please refine
                your search and try again`}
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (false) {
    return (
      <div id="">
        <div className="main">


          <Loading />

          <div className="row">
            <div className="category-container">
              {/*    <DistanceFilter loading={loading} /> */}
              <Grid container justify="space-between" alignItems="center">
                {/* <Grid
                  item
                  xs={6}
                  sm={4}
                  md={4}
                  lg={12}
                  className="grid-facets-container"
                >
                  <SubCategoryMenu />
                  {isMobileState ? renderMobileFacets : renderFacets}
                </Grid> */}
                <Grid
                  item
                  xs={6}
                  sm={8}
                  md={8}
                  lg={12}
                  className={`grid-category-items-container${facetsState && facetsState.length == 0 ? " no-facets" : ""
                    }`}
                >
                  <Grid container justify="space-around" alignItems="center">

                    {/* <CategoryHeader /> */}
                    <Grid item xs={12} style={{ margin: "0 1%" }}>
                      <FacetBreadcrumb />
                    </Grid>
                    <Grid
                      className="pagination-container"
                      item
                      xs={12}
                      style={{
                        backgroundColor: "#f5f5f5",
                        padding: "10px",
                        margin: "0 1%"
                      }}
                    >
                      {/* <Grid
                        container
                        justify="space-around"
                        alignItems="center"
                      >
                        <Grid item {...numberOfItemsGridSizes}>
                          <NumberOfItems />
                        </Grid>
                        <Grid item xs={6} sm={6} md={3}>
                          <SortBy />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <Pagination />
                        </Grid>
                      </Grid> */}
                    </Grid>
                    <Grid item xs={12}>
                      {renderPlaceholderCategoryItems()}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div id="">
        <div className="main">

          <CategoryHeader />
          {/* render map component if it's stores category TEST*/}
          {/* {window.location.pathname.includes("shop/stores") ? <Map /> : null} */}
          <div className="row">
            <div className="category-container">
              {/*   <DistanceFilter /> */}
              <Grid container justify="space-between" alignItems="center">
                <Grid
                  item
                  xs={numberOfItemState !== 0 ? 6 : 12}
                  sm={numberOfItemState !== 0 ? 8 : 12}
                  md={numberOfItemState !== 0 ? 8 : 12}
                  // lg={numberOfItemState !== 0 ? 9 : 12}
                  lg={12}
                  className="grid-category-items-container"
                >
                  <Grid container justify="space-around" alignItems="center">
                    {/* <CategoryHeader /> */}
                    <Grid
                      style={{ display: numberOfItemState === 0 ? "none" : "" }}
                      item
                      xs={6}
                      sm={4}
                      md={4}
                      lg={12}
                      className="grid-facets-container"
                    >
                      {/*  <SubCategoryMenu /> */}

                      {isMobileState ? renderMobileFacets : renderFacets}
                    </Grid>
                    <Grid item xs={12} style={{ margin: "0 1%" }}>
                      <FacetBreadcrumb />
                    </Grid>
                    {/* <Grid
                      className="pagination-container"
                      item
                      xs={12}
                      style={{
                        backgroundColor: "#f5f5f5",
                        padding: "10px",
                        margin: "0 1%"
                      }}
                    >
                      <Grid
                        container
                        justify="space-around"
                        alignItems="center"
                      >
                        <Grid item {...numberOfItemsGridSizes}>
                          <NumberOfItems />
                        </Grid>
                        <Grid item xs={6} sm={6} md={3}>
                          <SortBy />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <Pagination />
                        </Grid>
                      </Grid>
                    </Grid> */}
                    <Grid item xs={12}>
                      <CategoryItems />
                      {/* <LoadMorePage />
                      {loadingBottom ? <Loading /> : null} */}
                    </Grid>
                    <Grid item xs={12} sm={12} alignItems="center" justify="space-between">
                      <Pagination />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Category;
