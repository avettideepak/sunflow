import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Footer from "../../AC-Footer/Footer.jsx";

import StoreCategoryHeader from "./StoreCategoryHeader";
import CategoryItems from "../../AC-CategoryPage/components/CategoryItems/CategoryItems.jsx";
import Facets from "../../AC-Facets/Facets.jsx";
import Pagination from "../../AC-Pagination/Pagination.jsx";
import NumberOfItems from "../../AC-Pagination/NumberofItems.jsx";
import Loading from "../../AC-Loading/Loading.jsx";
import FacetBreadcrumb from "../../AC-Breadcrumb/FacetBreadcrumb.jsx";
import Async from "react-code-splitting";
import SortBy from "../../AC-SortBy/SortBy.jsx";
import Facets_Mobile from "../../AC-Facets/Facets_Mobile.jsx";
import { renderPlaceholderCategoryItems } from "../../AC-CategoryPage/components/CategoryItems/CategoryItems.jsx";

import {
  dispatchScroolPage,
  nextPage
} from "../../../redux/actions/paginationActions.js";

import { I18nContext } from "../../../i18n";

const SubCategoryMenu = () => (
  <Async
    load={import(
      "../../AC-CategoryPage/components/SubCategoryMenu/SubCategoryMenu.jsx"
    )}
  />
);

function StoreProducts() {
  const [filterButtonClicked, setFilterButtonClicked] = useState(false);
  const { translate } = useContext(I18nContext);
  const dispatch = useDispatch();

  const loading = useSelector(
    state => state.categoryReducer.loading,
    shallowEqual
  );

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  const loadingBottom = useSelector(
    state => state.categoryReducer.loadingBottom,
    shallowEqual
  );

  const renderHeader = () => {
    return <StoreCategoryHeader />;
  };

  const pagesState = useSelector(
    state => state.categoryReducer.pages,
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

  const handleNextPage = page => {
    if (scroolPageState < pagesState.length || page != 0) {
      dispatch(dispatchScroolPage(page));
      dispatch(nextPage(page, cidState, true));
    } else {
      console.log("End of the pagea");
    }
  };

  const handleFilterButtonClicked = () => {
    document.getElementById("root").setAttribute("aria-hidden", true);
    setFilterButtonClicked(true);
  };

  const handleFacetContentCloseIconClicked = () => {
    document.getElementById("root").setAttribute("aria-hidden", false);
    setFilterButtonClicked(false);
  };

  const renderFacets = (
    <React.Fragment>
      <button
        className="mobile-filter-button"
        onClick={() => handleFilterButtonClicked()}
      >
        {translate("mobile_facets.filterButtonText")}
        <i className="material-icons">filter_list</i>
      </button>
      <Facets_Mobile
        filterButtonClicked={filterButtonClicked}
        handleFacetContentCloseIconClicked={handleFacetContentCloseIconClicked}
      />
    </React.Fragment>
  );

  const renderMobileFacets = <Facets />;

  useEffect(() => {
    if (typeof window !== undefined) {
      window.addEventListener("scroll", handleOnScroll);

      // returned function will be called on component unmount
      return () => {
        window.removeEventListener("scroll", handleOnScroll);
      };
    }
  }, [scroolPageState]);

  let handleOnScroll = () => {
    if (typeof window !== undefined) {
      var scrollTop =
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;
      var scrollHeight =
        (document.documentElement && document.documentElement.scrollHeight) ||
        document.body.scrollHeight;
      var clientHeight =
        document.documentElement.clientHeight || window.innerHeight;
      var scrolledToBottom =
        Math.ceil(scrollTop + clientHeight) >= scrollHeight;

      if (scrolledToBottom) {
        handleNextPage(scroolPageState + 1);
      }
    }
  };

  if (loading) {
    return (
      <div id="bd">
        <div className="main">
          {renderHeader()}
          <div className="row">
            <div className="category-container">
              <Grid container justify="space-between" alignItems="center">
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={4}
                  lg={3}
                  className="grid-facets-container"
                >
                  {/*<SubCategoryMenu />*/}
                  {!isMobileState ? renderMobileFacets : renderFacets}
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={8}
                  md={8}
                  lg={9}
                  className="grid-category-items-container"
                >
                  <Grid container justify="space-around" alignItems="center">
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
                      <Grid
                        container
                        justify="space-around"
                        alignItems="center"
                      >
                        <Grid item xs={6} sm={6} md={3}>
                          <NumberOfItems />
                        </Grid>
                        <Grid item xs={6} sm={6} md={3}>
                          <SortBy />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <Pagination />
                        </Grid>
                      </Grid>
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
      <div id="bd">
        <div className="main">
          {renderHeader()}

          <div className="row">
            <div className="category-container">
              <Grid container justify="space-between" alignItems="center">
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={4}
                  lg={3}
                  className="grid-facets-container"
                >
                  {/*       <SubCategoryMenu /> */}
                  {!isMobileState ? renderMobileFacets : renderFacets}
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={8}
                  md={8}
                  lg={9}
                  className="grid-category-items-container"
                >
                  <Grid container justify="space-around" alignItems="center">
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
                      <Grid
                        container
                        justify="space-around"
                        alignItems="center"
                      >
                        <Grid item xs={6} sm={6} md={3}>
                          <NumberOfItems />
                        </Grid>
                        <Grid item xs={6} sm={6} md={3}>
                          <SortBy />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <Pagination />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <CategoryItems />
                      {loadingBottom ? <Loading /> : null}
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

export default StoreProducts;
