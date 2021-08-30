/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  useLayoutEffect
} from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { useLocation } from "@reach/router";

import Grid from "@material-ui/core/Grid";

import CategoryItems from "./components/CategoryItems/BDCategoryItems";
import Facets from "./components/AC-Facets/BDFacets";
import Pagination from "./components/BDPagination";
import PaginationRegular from "../AC-Pagination/BDPagination";
import Map from "../AC-Map/ReactMap";

import NumberOfItems from "./components/NumberOfItems";
import Loading from "../AC-Loading/Loading.jsx";
import FacetBreadcrumb from "../AC-Breadcrumb/BDFacetBreadcrumb.jsx";
import SortBy from "./components/SortBy";
import Facets_Mobile from "../AC-Facets/Facets_Mobile.jsx";

import classes from "./styles/BDCategory.module.css";

import {
  dispatchScroolPage,
  nextPage
} from "../../redux/actions/paginationActions.js";
import { I18nContext } from "../../i18n";

import CategoryHeader from "./components/CategoryHeader/BDCategoryHeader";
import {
  gatsbyFetchCategory,
  backToCategoryNormalize,
  fetchCategoryFromDirectUrl
} from "../../redux/actions/categoryActions.js";

function CategorySellers({ data, pageContext, navCategory }) {
  const { translate } = useContext(I18nContext);
  const [filterButtonClicked, setFilterButtonClicked] = useState(false);

  const backButtonState = useSelector(
    state => state.categoryReducer.backButton,
    shallowEqual
  );

  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCategoryNavCatAction(navCategory));
  }, []);

  const showDynamicState = useSelector(
    state => state.categoryReducer.showDynamic,
    shallowEqual
  );

  useEffect(() => {
    if (showDynamicState) {
      dispatch(fetchCategoryFromDirectUrl());
    } else if (!backButtonState) {
      dispatch(gatsbyFetchCategory(data, pageContext));
    } else {
      dispatch(backToCategoryNormalize());
    }
  }, []);

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

  const noItemFoundState = useSelector(
    state => state.categoryReducer.noItemFound,
    shallowEqual
  );

  const loading = useSelector(
    state => state.categoryReducer.loading,
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

  const [isServerSide, setIsServerSide] = useState(true);

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

  const numberOfItemState = useSelector(
    state => state.categoryReducer.numberOfItems,
    shallowEqual
  );

  const numberOfItemsGridSizes = {
    xs: numberOfItemState === 0 ? 12 : 6,
    sm: numberOfItemState === 0 ? 12 : 6,
    md: numberOfItemState === 0 ? 12 : 3
  };

  useEffect(() => {
    let tempCategory;
    if (clientSideCategoryItemState.length > 0) {
      tempCategory = clientSideCategoryItemState;
    } else {
      tempCategory = [{ id: "" }];
    }
    if (
      (breadState.length > 0 || urlFilterParamsState !== "") &&
      tempCategory[0].id !== ""
    ) {
      setIsServerSide(false);
    } else if (breadState.length === 0) {
      setIsServerSide(true);
    }
  }, [breadState, clientSideCategoryItemState, urlFilterParamsState]);

  const handleNextPage = page => {
    if (scroolPageState < pagesState.length || page != 0) {
      dispatch(dispatchScroolPage(page));
      dispatch(nextPage(page, cidState, true));
    } else {
      console.error("End of the pagea");
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
        className={classes.mobileFilterBtn}
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

  const renderMobileFacets = <Facets data={data} />;

  const myRef = useRef(null);

  useLayoutEffect(() => {
    if (typeof window !== undefined) {
      if (!loadingBottom && scroolPageState - currentPageState < 4) {
        let handleOnScroll = () => {
          if (!loading) {
            let scrollTop =
              (document.documentElement &&
                document.documentElement.scrollTop) ||
              document.body.scrollTop;
            let scrollHeight = myRef.current.offsetTop;
            let clientHeight =
              document.documentElement.clientHeight || window.innerHeight;
            let scrolledToBottom =
              Math.ceil(scrollTop + clientHeight) >= scrollHeight;

            if (scrolledToBottom) {
              handleNextPage(scroolPageState + 1);
            }
          }
        };

        window.addEventListener("scroll", handleOnScroll);

        // returned function will be called on component unmount
        return () => {
          window.removeEventListener("scroll", handleOnScroll);
        };
      }
    }
  });

  return (
    // Regular Layout
    <div id="">
      <div className="main">
        <CategoryHeader data={data} />
        <div
          style={{
            width: "90%",
            margin: "0 auto",
            marginTop: "20px",
            direction: "ltr"
          }}
        >
          {/* <Map /> */}
        </div>
        <div className="row">
          <div className="category-container">
            <Grid container justify="space-between" alignItems="center">
              {/* <Grid item xs={12} className="grid-store-items-container"> */}
              <Grid item xs={12} className="">
                <Grid container justify="space-around" alignItems="center">
                  <Grid item xs={12}>
                    <CategoryItems data={data} pageContext={pageContext} />
                    {loadingBottom ? <Loading /> : null}
                    <div ref={myRef} />
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

export default CategorySellers;
