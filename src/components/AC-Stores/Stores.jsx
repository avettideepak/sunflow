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
import "../../assets/css/menu.css";

import Map from "../AC-Map/ReactMap";
import CategoryHeader from "./components/StoreCategoryHeaderGatsby";
import Facets from "../AC-Facets/Facets.jsx";
import Facets_Mobile from "../AC-Facets/Facets_Mobile.jsx";
import StoreItems from "./components/StoreItemsGatsby";
import Loading from "../AC-Loading/Loading.jsx";
import { I18nContext } from "../../i18n";
import FacetBreadcrumb from "../AC-Breadcrumb/BDFacetBreadcrumb.jsx";
import classes from "../AC-CategoryPage/styles/Category_Static.module.css";

import {
  dispatchScroolPage,
  nextPage
} from "../../redux/actions/paginationActions.js";
import {
  gatsbyFetchCategory,
  backToCategoryNormalize,
  fetchCategoryFromDirectUrl
} from "../../redux/actions/categoryActions.js";
import { setCategoryNavCatAction } from "../../redux/actions/menuActions";
import { fetchUserData } from "../../redux/actions/loginActions";

function StoresGatsby({ data, pageContext, navCategory, supplier }) {
  console.log("Sellers Here PAGE", data, pageContext, supplier);

  const { translate } = useContext(I18nContext);
  const [filterButtonClicked, setFilterButtonClicked] = useState(false);

  const backButtonState = useSelector(
    state => state.categoryReducer.backButton,
    shallowEqual
  );

  const storesState = useSelector(
    state => state.storeReducer.stores,
    shallowEqual
  );

  const languageState = useSelector(
    state => state.mainReducer.lang,
    shallowEqual
  );

  const userLocationState = useSelector(
    state => state.userLocationReducer,
    shallowEqual
  );
  console.info("borop store data", data, navCategory, supplier);

  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== undefined) window.scrollTo(0, 0);

    dispatch(setCategoryNavCatAction(navCategory));
    if (!userLocationState.lat && !userLocationState.lng) {
      dispatch(fetchUserData());
    }
  }, []);

  const initialLoadState = useSelector(
    state => state.mainReducer.initialLoad,
    shallowEqual
  );

  useEffect(() => {
    if (!initialLoadState) {
      console.info("Sellers Here-- ", showDynamicState, backButtonState);

      if (showDynamicState) {
        dispatch(fetchCategoryFromDirectUrl());
      } else if (!backButtonState || storesState === undefined) {
        dispatch(gatsbyFetchCategory(data, pageContext));
      } else {
        dispatch(backToCategoryNormalize());
      }
    }
  }, [initialLoadState]);

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

  const showDynamicState = useSelector(
    state => state.categoryReducer.showDynamic,
    shallowEqual
  );

  const facetsState = useSelector(
    state => state.facetReducer.facets,
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
      console.error("End of the pagea");
    }
  };

  // const [filterButtonClicked, setFilterButtonClicked] = useState(false);

  const handleFilterButtonClicked = () => {
    document.getElementById("___gatsby").setAttribute("aria-hidden", true);
    setFilterButtonClicked(true);
  };

  const handleFacetContentCloseIconClicked = () => {
    document.getElementById("___gatsby").setAttribute("aria-hidden", false);
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

  const renderMobileFacets = <Facets data={data} renderedBy="stores" />;

  const myRef = useRef(null);

  // useLayoutEffect(() => {
  //   if (typeof window !== undefined) {
  //     if (!loadingBottom && scroolPageState - currentPageState < 4) {
  //       let handleOnScroll = () => {
  //         if (!loading) {
  //           let scrollTop =
  //             (document.documentElement &&
  //               document.documentElement.scrollTop) ||
  //             document.body.scrollTop;
  //           let scrollHeight = myRef.current.offsetTop;
  //           let clientHeight =
  //             document.documentElement.clientHeight || window.innerHeight;
  //           let scrolledToBottom =
  //             Math.ceil(scrollTop + clientHeight) >= scrollHeight;

  //           if (scrolledToBottom) {
  //             handleNextPage(scroolPageState + 1);
  //           }
  //         }
  //       };

  //       window.addEventListener("scroll", handleOnScroll);

  //       // returned function will be called on component unmount
  //       return () => {
  //         window.removeEventListener("scroll", handleOnScroll);
  //       };
  //     }
  //   }
  // });

  return (
    // Regular Layout
    <div>
      <div className="main">
        {/* <CategoryHeader data={data} /> */}
        {/* <div
          style={{
            width: "90%",
            margin: "0 auto",
            marginTop: "20px",
            direction: "ltr"
          }}
        >
          <Map supplier={supplier} />
        </div> */}
        <div className="row">
          <div className="category-container-supplier">
            <Grid container justify="space-between">
              <Grid item xs={12} className="grid-store-items-container"> 
              <h1 className="storeDirectory">Store Directory</h1>
                {/* <Grid item xs={3}>
                {!isMobileState ? renderMobileFacets : renderFacets}
              </Grid> */}
              <Grid item xs={12} className="">
                <Grid container justify="space-around" alignItems="center">
                    <Grid item xs={12} style={{ margin: "0 1%" }}>
                    <FacetBreadcrumb data={data} />
                  </Grid>
                  <Grid item xs={12}>
                    {typeof window !== undefined &&
                    typeof XMLHttpRequest !== undefined ? (
                      <StoreItems data={data} pageContext={pageContext} />
                    ) : null}
                    {/* {loadingBottom ? <Loading /> : null}
                    <div ref={myRef} /> */}
                  </Grid>
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

export default StoresGatsby;
