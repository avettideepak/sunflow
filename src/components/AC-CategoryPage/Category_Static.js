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
import VisitorInfo from "@components/AC-Main/Services/VistorInfo"
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import DealsBanner from "../../assets/img/banners/catalog.jpg";
import PdfLink from "../../assets/img/banners/wellmade-inc-catalog-1.pdf";
import Grid from "@material-ui/core/Grid";
import StoreSnapshot from "../AC-Stores/components/StoreSnapshot";
import CategoryItems from "./components/CategoryItems/CategoryItems_Static";
import Facets from "../AC-Facets/FacetsHorizontal";
import Pagination_Static from "../AC-Pagination/Pagination_Static.jsx";
import Pagination from "../AC-Pagination/Pagination.jsx";
import Matalan from "./components/ItemCard/ItemCard_Static_matalan";
import NumberOfItems from "../AC-Pagination/NumberOfItems_Static";
import Loading from "../AC-Loading/Loading.jsx";
import FacetBreadcrumb from "../AC-Breadcrumb/BDFacetBreadcrumb.jsx";
import SortBy from "../AC-SortBy/SortBy_Static";
import SortByMobile from "../AC-SortBy/SortByMobile";
import Facets_Mobile from "../AC-Facets/Facets_Mobile.jsx";
import classes from "./styles/Category_Static.module.css";
import CategoryBreadcrumbNew from "../AC-Breadcrumb/CategoryBreadcrumbNew";
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import SortSVG from "@assets/img/Sort_SVG.png";
import FilterSVG from "@assets/img/Filter_SVG.png";

import {
  dispatchScroolPage,
  nextPage,
  nextPageGatsby,
  nextPageScrool
} from "../../redux/actions/paginationActions.js";
import { I18nContext } from "../../i18n";

import CategoryHeader from "./components/CategoryHeader/CategoryHeader_Static.jsx";
import {
  gatsbyFetchCategory,
  backToCategoryNormalize,
  fetchCategoryFromDirectUrl,
  fetchingCategorySuccess,
  fetchingCategoryFailure,
  showDynamicAction
} from "../../redux/actions/categoryActions.js";
import StoreCategoryHeader from "../AC-Stores/components/StoreCategoryHeaderStore";
import { setCategoryNavCatAction } from "../../redux/actions/menuActions";
import NoItems from "./components/NoItems/NoItems_Static";
import { renderPlaceholderCategoryItems } from "./components/CategoryItems/CategoryItems";
import { handleScroolPosition } from "../../redux/actions/mainActions";
import {
  fetchingFilterFailure,
  fetchingFilterRequest,
  fetchingFilterSuccess,
  newFilterFacet
} from "../../redux/actions/facetActions";
import {
  CATEGORY_FETCH_LINK,
  CATEGORY_PAGING_FETCH_LINK
} from "../../redux/links";
import buttonsMapping from "../../functions/buttonsMappingGatsby";
import mapDynamicFacetSliders from "../../functions/mapDynamicFacetSliders";

function Category_Static({ data, pageContext, navCategory, supplier }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const backButtonState = useSelector(
    state => state.categoryReducer.backButton,
    shallowEqual
  );

  const [dealsData, setDealsData] = useState([]);
  const [supplierDealsData, setSupplierDealsData] = useState([]);
  const [trendingData, setTrendingData] = useState([]);


  console.log('123456', supplierDealsData);

  console.info("borop category data2", data, supplierDealsData, dealsData, trendingData, pageContext);

  useEffect(() => {
    let tempSupplierDealData = data && data.items.filter(item => item.properties.ITEM_TYPE == "2")
    let tempDealData = data && data.items.filter(item => item.properties.Deals_Property == "Deals")
    let tempTrendingData = data && data.items.filter(item => item.properties.Trending_Now == "Trending")
    setSupplierDealsData({ items: tempSupplierDealData })
    setDealsData({ items: tempDealData })
    setTrendingData({ items: tempTrendingData })
  }, [data])

  const showDynamicState = useSelector(
    state => state.categoryReducer.showDynamic,
    shallowEqual
  );

  const initialLoadState = useSelector(
    state => state.mainReducer.initialLoad,
    shallowEqual
  );

  const [categoryItems, setCategoryItems] = useState(data.items);

  useEffect(() => {
    if (typeof window !== undefined) window.scrollTo(0, 0);

    dispatch(setCategoryNavCatAction(navCategory));
  }, []);

  console.log("testttttttt", location)

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawerMobile = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  useEffect(() => {
    // if (!initialLoadState && location && !Object.keys(location.state).includes("cat")) {
    if (!initialLoadState && location) {
      if (!backButtonState) {
        dispatch(gatsbyFetchCategory(data, pageContext, data.url));
      } else {
        dispatch(backToCategoryNormalize());
      }

      if (showDynamicState && !backButtonState) {
        dispatch(fetchCategoryFromDirectUrl());
      }
    }
  }, [initialLoadState]);

  const filterUrlState = useSelector(
    state => state.facetReducer.filterUrl,
    shallowEqual
  );

  const cidState = useSelector(
    state => state.categoryReducer.cidN,
    shallowEqual
  );

  // useEffect(() => {
  //   if (Object.keys(location.state).includes("cat")) {
  //     console.log(
  //       "LOCATION 2021",
  //       location.state,
  //       `&${location.state.cat}`,
  //       `${filterUrlState}&${location.state.cat}`
  //     );
  //     dispatch(fetchingFilterRequest());
  //     fetch(location.state.url)
  //       .then(res => res.json())
  //       .then(json => {
  //         let tempages = [];
  //         for (let i = 1; i <= Number(json[0].numOfPages); i++) {
  //           tempages.push(i);
  //         }
  //         let numberOfItems = Number(json[4].itemsCount);
  //         let categoryItems = json[1].items.map(item => {
  //           const newObj = Object.assign({}, item);
  //           // update the new object
  //           let image = newObj.image;
  //           newObj.image = image.replace("thumbnails", "images");
  //           return newObj;
  //         });

  //         let priceButtonsTemp = buttonsMapping(json[2].facets);
  //         Object.keys(priceButtonsTemp.Category).map((l, index) => {
  //           if (index === 0) {
  //             priceButtonsTemp.Category[l] = false;
  //           }
  //         });
  //         let dynamicSlider = {};
  //         dynamicSlider = mapDynamicFacetSliders(json);

  //         // let filterUrl = url;
  //         dispatch(
  //           fetchingCategorySuccess(
  //             json,
  //             location.state.cid,
  //             location.state.cat,
  //             tempages,
  //             categoryItems,
  //             priceButtonsTemp,
  //             dynamicSlider,
  //             [],
  //             location.state.url,
  //             location.state.url,
  //             `&${location.state.cat}`,
  //             location.state.cid,
  //             numberOfItems
  //           )
  //         );
  //         dispatch(showDynamicAction(true));
  //       })
  //       .catch(error => {
  //         console.error("fetching filter failure", error);
  //         dispatch(fetchingCategoryFailure(error));
  //       });
  //   }
  // }, [location]);

  const { translate } = useContext(I18nContext);
  const [filterButtonClicked, setFilterButtonClicked] = useState(false);

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

  const breadState = useSelector(
    state => state.facetReducer.bread,
    shallowEqual
  );
  const urlFilterParamsState = useSelector(
    state => state.facetReducer.urlFilterParams,
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
  const itemsFetchedState = useSelector(
    state => state.categoryReducer.itemsFetched,
    shallowEqual
  );

  const facetsState = useSelector(
    state => state.facetReducer.facets,
    shallowEqual
  );

  const scState = useSelector(state => state.categoryReducer.sc, shallowEqual);
  const scPosState = useSelector(
    state => state.categoryReducer.scPos,
    shallowEqual
  );

  useEffect(() => {
    if (scState && scPosState > 0) {
      setTimeout(() => {
        window.scrollTo({
          top: Math.trunc(scPosState),
          left: 0
        });
        dispatch(nextPageScrool());
      }, 0);
    }
  }, [scState, scPosState]);

  const [nextPageState, setNextPageState] = useState([]);
  const [linkState, setLinkState] = useState({
    link: location.href,
    top: false
  });
  const fetchNextPageHandler = page => {
    let params = null;
    if (pageContext.url && pageContext.url.includes("stores")) {
      params = `Sellers=${data.name
        .split(" ")
        .map(l => {
          if (l == "JAM") {
            return "JAM";
          } else if (l.toLowerCase() === "4m") {
            return "4M";
          } else if (l !== "") {
            let storeTitle =
              l.charAt(0).toUpperCase() + l.slice(1).toLowerCase();
            return storeTitle;
          }
          return l;
        })
        .join("%20")
        .replace("’", "")}`;
    }
    return new Promise((res, rej) => {
      fetch(CATEGORY_PAGING_FETCH_LINK(data.cid, "en", page, params))
        .then(res => res.json())
        .then(json => {
          console.log("FETCH NEXT PAGE", data, pageContext, page, params);
          setNextPageState(json[1].items);
          setLinkState({ link: location.href, top: true });
          res();
        })
        .catch(err => rej(err));
    });
  };

  useEffect(() => {
    if (
      currentPageState &&
      !showDynamicState &&
      pageContext.pageCount > pageContext.currentPage
    ) {
      fetchNextPageHandler(pageContext.currentPage + 1);
    }

    dispatch(dispatchScroolPage(pageContext.currentPage, true));
  }, [currentPageState, cidState]);

  const handleNextPage = (e, page) => {
    let position = 0;
    if (e !== "") {
      position = window.pageYOffset;
    }
    if (
      scroolPageState < pagesState.length &&
      page !== 0 &&
      (breadState.length > 0 || urlFilterParamsState !== "")
    ) {
      dispatch(dispatchScroolPage(page));
      dispatch(nextPage(page, cidState, true));
    } else if (
      scroolPageState < pagesState.length &&
      page !== 0 &&
      breadState.length == 0
    ) {
      if (pageContext.pageCount > page) {
        fetchNextPageHandler(page + 1);
      }
      setLinkState({ link: location.href, top: false });
      dispatch(dispatchScroolPage(page));
      dispatch(nextPageGatsby(nextPageState, position));
    } else {
      console.info("End of the pagea");
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
      <button
        className={classes.mobileFilterBtn}
        onClick={() => handleFilterButtonClicked()}
      >
        {/* <i className="material-icons">filter_list</i> */}
        <img className="sortimgcss" src={FilterSVG} />
        {translate("mobile_facets.filterButtonText")}
      </button>
      <Facets_Mobile
        filterButtonClicked={filterButtonClicked}
        handleFacetContentCloseIconClicked={handleFacetContentCloseIconClicked}
      />
    </React.Fragment>
  );

  const renderFacets = <Facets data={data} />;

  const myRef = useRef(null);

  // useLayoutEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const scroolState = () => {
  //       let pageoffset = 0;
  //       if (typeof window !== "undefined") {
  //         pageoffset = window.pageYOffset;
  //       }
  //       dispatch(handleScroolPosition(pageoffset));
  //     };

  //     if (!loadingBottom && scroolPageState - currentPageState <= 2) {
  //       let handleOnScroll = () => {
  //         scroolState();
  //         if (!loading && myRef.current) {
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
  //             handleNextPage("", scroolPageState + 1);
  //           }
  //         }
  //       };

  //       window.addEventListener("scroll", handleOnScroll);

  //       // returned function will be called on component unmount
  //       return () => {
  //         window.removeEventListener("scroll", handleOnScroll);
  //       };
  //     } else {
  //       if (typeof window !== "undefined") {
  //         window.addEventListener("scroll", scroolState);
  //       }
  //       // returned function will be called on component unmount
  //       return () => {
  //         if (typeof window !== "undefined") {
  //           window.removeEventListener("scroll", scroolState);
  //         }
  //       };
  //     }
  //   }
  // });

  console.log("suppliersupplier", supplier)

  const renderHeader = () => {
    if (location.pathname.includes("stores")) {
      return (
        <StoreCategoryHeader
          data={data}
          storeSellerData={supplier.length > 0 ? supplier[0] : undefined}
          pickupLocData={
            supplier.length > 0 ? supplier[0].pickup_locations : undefined
          }
          supplierShippingInfo={
            supplier.length > 0 ? supplier[0].shipping_information : undefined
          }
          sellerHaveNoProducts={categoryItems && categoryItems.length === 0}
        />
      );
    } else {
      return <CategoryHeader data={data} />;
    }
  };

  if (
    noItemFoundState &&
    cidState !== "search" &&
    !location.pathname.includes("stores")
  ) {
    return (
      <div id="" style={{
        background: "#fff"
      }}>
        <div className="main">
          <div className="row">
            <div className="category-container">
              {renderHeader()}
            </div></div>
          <div className="row">
            <div className="category-container">
              <NoItems />
              <div ref={myRef} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderCategoryContent = () => {
    // if (categoryItems && categoryItems.length > 0) {
    if (categoryItems) {
      return (
        <>
          {/*   <DistanceFilter /> */}
          <CategoryBreadcrumbNew />
          <Grid container justify="space-between" alignItems="center">

            <Grid item xs={12} sm={12} md={12}>
              {renderHeader()}
            </Grid></Grid>
          <div className="row">
            <div className="category-container testtttttt">



              <Grid container justify="space-between" alignItems="center">
                {
                  data && data.description == "Giordano" && (
                    <div style={{ backgroundColor: "#494949", width: "100%", height: isMobileState ? "auto" : "76px" }}>
                      <div className="mf-banner-large">
                        <div className="col-md-5 col-sm-12 col-xs-12 col-banner-large-content">
                          <img src={DealsBanner} style={{ width: "100%", height: "76px", objectFit: "cover" }} alt="" />
                        </div>
                        <div className="col-md-5 col-sm-6 col-xs-12 col-banner-image">
                          <div className="banner-slogan">Click here to download This Week's Deals.</div>
                        </div>
                        <div className="col-md-2 col-sm-6 col-xs-12 col-banner-price">
                          <div className="banner-price">
                            <Link target="_blank" className="link" href={PdfLink}>Download</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }


                {
                  data && data.description == "Elak" && (
                    <div style={{ backgroundColor: "#494949", width: "100%", height: isMobileState ? "auto" : "76px" }}>
                      <div className="mf-banner-large">
                        <div className="col-md-5 col-sm-12 col-xs-12 col-banner-large-content">
                          <img src={DealsBanner} style={{ width: "100%", height: "76px", objectFit: "cover" }} alt="" />
                        </div>
                        <div className="col-md-5 col-sm-6 col-xs-12 col-banner-image">
                          <div className="banner-slogan">Click here to download This Week's Deals.</div>
                        </div>
                        <div className="col-md-2 col-sm-6 col-xs-12 col-banner-price">
                          <div className="banner-price">
                            <Link target="_blank" className="link" href={PdfLink}>Download</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }


                {
                  data && data.description == "Matalan" && (
                    <div style={{ backgroundColor: "#494949", width: "100%", height: isMobileState ? "auto" : "76px" }}>
                      <div className="mf-banner-large">
                        <div className="col-md-5 col-sm-12 col-xs-12 col-banner-large-content">
                          <img src={DealsBanner} style={{ width: "100%", height: "76px", objectFit: "cover" }} alt="" />
                        </div>
                        <div className="col-md-5 col-sm-6 col-xs-12 col-banner-image">
                          <div className="banner-slogan">Click here to download This Week's Deals.</div>
                        </div>
                        <div className="col-md-2 col-sm-6 col-xs-12 col-banner-price">
                          <div className="banner-price">
                            <Link target="_blank" className="link" href={PdfLink}>Download</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }

                {/* {
                  dealsData.items && dealsData.items.length > 0 && (
                    <Grid item xs={12} style={{ background: "#fff", padding: "10px 0 0" }} >
                      <h3 className="dealsHeader">Today Deals</h3>
                      <CategoryItems
                        data={dealsData}
                        pageContext={pageContext}
                        supplier={supplier}
                      />
                      <div className="store-divider"></div>
                    </Grid>
                  )
                } */}

                      {
                        typeof window !== undefined &&
                        (window.location.pathname.includes("/stores/matalan")) && (
                          <>
                          <Grid item xs={12} style={{ background: "#fff", padding: "10px 0 0" }} >
                            <h3 className="dealsHeader">This Week's Deals</h3>
                            <Matalan />
                          </Grid>
                          </>
                        )}


                {/* {
                  supplierDealsData.items && supplierDealsData.items.length > 0 && (
                    <Grid item xs={12} style={{ background: "#fff", padding: "10px 0 0" }} >
                      <h3 className="dealsHeader">Today Deals</h3>
                      <CategoryItems
                        data={supplierDealsData}
                        pageContext={pageContext}
                        supplier={supplier}
                      />
                      <div className="store-divider"></div>
                    </Grid>
                  )
                } */}

{
                        typeof window !== undefined &&
                        (window.location.pathname.includes("/stores/matalan")) && (

                          <Grid item xs={12} style={{ background: "#fff", padding: "10px 0 0" }} >
                            <h3 className="dealsHeader">Shop Now & Pickup in Store</h3>
                          </Grid>
)}


                {categoryItems.length > 0 && typeof window !== undefined && (!window.location.pathname.includes("/deals") && !window.location.pathname.includes("/dining") && !window.location.pathname.includes("/entertainment") && !window.location.pathname.includes("/stores/giordano") && !window.location.pathname.includes("/stores/elak")) ?
                  <Grid
                    item
                    xs={6}
                    sm={4}
                    md={4}
                    lg={12}
                    className="grid-facets-container"
                  >
                    {!isMobileState ? renderFacets : null}
                  </Grid> :
                  null
                }
                <Grid
                  item
                  xs={6}
                  sm={8}
                  md={8}
                  lg={12}
                  className="grid-category-items-container"
                >
                  <Grid container justify="space-around" alignItems="center">
                    <Grid item xs={12} style={{ margin: "0 0%" }}>
                      <FacetBreadcrumb data={data} />
                    </Grid>
                    {
                      isMobileState && (
                        <div className="applyandcancel">
                          <div className="applyandcancelRight">
                            <div>
                              {['bottom'].map((anchor) => (
                                <React.Fragment key={anchor}>
                                  <Button className="sortByBtn" onClick={toggleDrawerMobile(anchor, true)}><img className="sortimgcss" src={SortSVG} />
                                    Sort By
                                  </Button>
                                  <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawerMobile(anchor, false)}>
                                    {isMobileState ? <SortByMobile anchor={anchor} toggleDrawer={toggleDrawerMobile(anchor, false)} /> : null}
                                  </Drawer>
                                </React.Fragment>
                              ))}
                            </div>

                          </div>
                          <div className="applyandcancelLeft">
                            {isMobileState ? renderMobileFacets : null}
                          </div>
                        </div>
                      )
                    }

                    {
                      !isMobileState && categoryItems.length > 0 &&
                      typeof window !== undefined &&
                      (!window.location.pathname.includes("/deals") &&
                        !window.location.pathname.includes("/dining") &&
                        !window.location.pathname.includes("/entertainment") &&
                        !window.location.pathname.includes("/stores/giordano") &&
                        !window.location.pathname.includes("/stores/elak")) && (
                        <Grid
                          className="pagination-container"
                          item
                          xs={12}
                          style={{
                            backgroundColor: "#fff",
                            padding: "5px 20px",
                            // marginBottom: "10%"
                          }}
                          justify="space-between"
                          alignItems="center"
                        >
                          <Grid item md={2} {...numberOfItemsGridSizes}>
                            <NumberOfItems data={data} />
                          </Grid>
                          <Grid item xs={6} sm={6} md={2}>
                            <SortBy />
                          </Grid>
                        </Grid>
                      )
                    }

                    {/* <Grid
                      className="pagination-container"
                      item
                      xs={12}
                      style={{
                        backgroundColor: "#fff",
                        padding: "10px",
                        marginBottom: "10%"
                      }}
                    >

                      <Grid container justify="space-around" alignItems="center">


                        <Grid item xs={6} sm={6} md={3}>
                          <SortBy />
                        </Grid>
                        <Grid item {...numberOfItemsGridSizes}>
                          <NumberOfItems data={data} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          {showDynamicState &&
                            (breadState.length > 0 ||
                              urlFilterParamsState !== "") ? (
                            <Pagination data={data} />
                          ) : (
                            <Pagination_Static
                              data={data}
                              pageContext={pageContext}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Grid> */}


                    {/* {
                      trendingData.items && trendingData.items.length > 0 && (
                        <Grid item xs={12} style={{ background: "#fff", padding: "10px 0 0" }} >
                          <h3 className="trendingHeader">Trending Now</h3>
                          <CategoryItems
                            data={trendingData}
                            pageContext={pageContext}
                            supplier={supplier} 
                          />
                          <div className="store-divider"></div>
                        </Grid>
                      )
                    } */}



                    <Grid item xs={12} style={{ background: "#fff", padding: "10px" }} >

                      {
                        typeof window !== undefined &&
                        (window.location.pathname.includes("/stores/giordano")) && (
                          <h3 className="dealsHeader">This Week's Deals</h3>
                        )}

                      

                      {
                        typeof window !== undefined &&
                        (!window.location.pathname.includes("/stores/elak")) && (
                          <CategoryItems
                            data={data}
                            pageContext={pageContext}
                            supplier={supplier}
                          />)}



                      {/* {loadingBottom ? <Loading /> : null} */}
                      <div ref={myRef} />
                      {/* {!loadingBottom &&
                        scroolPageState - currentPageState > 2 &&
                        pagesState.length > scroolPageState ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          <button
                            style={{
                              backgroundColor: "#fff",
                              borderRadius: "0",
                              boxShadow: "none",
                              fontWeight: "400",
                              textTransform: "uppercase",
                              letterSpacing: "1px",
                              lineHeight: "1.42857143",
                              padding: "8px 25px",
                              fontSize: "13px",
                              color: "#222",
                              border: "1px solid #222"
                            }}
                            onClick={e => handleNextPage(e, scroolPageState + 1)}
                          >
                            More Items
                          </button>
                        </div>
                      ) : null} */}
                    </Grid>
                    <Grid item xs={12} sm={12} alignItems="center" justify="space-between">
                      {showDynamicState &&
                        (breadState.length > 0 ||
                          urlFilterParamsState !== "") ? (
                        <Pagination data={data} />
                      ) : (
                        <Pagination_Static
                          data={data}
                          pageContext={pageContext}
                        />
                      )}
                    </Grid>
                    <Grid item xs={12} sm={12} alignItems="center" justify="space-between">
                      <VisitorInfo />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
        </>
      );
    } else return null;
  };

  if ((loading && showDynamicState) || initialLoadState) {
    return (
      <div id="" style={{
        background: "#fff"
      }}>
        <div className="main">


          <Loading className="loadingCategory" />

          <div className="row">
            <div className="category-container">
              {/*    <DistanceFilter loading={loading} /> */}
              <Grid container justify="space-between" alignItems="center">
                {/* <Grid
                  item
                  xs={6}
                  sm={4}
                  md={4}
                  lg={3}
                  className="grid-facets-container"
                ></Grid> */}
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
                    {/* {renderHeader()} */}
                    <Grid item xs={12} style={{ margin: "0 1%" }}></Grid>
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
                        <Grid item {...numberOfItemsGridSizes}></Grid>
                        <Grid item xs={6} sm={6} md={3}></Grid>
                        <Grid item xs={12} sm={12} md={6}></Grid>
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
      // Regular Layout

      <div id="" style={{
        background: "#fff"
      }}>
        <div className="main">


          {renderCategoryContent()}

          {/* {
            location.pathname.includes("stores") && (
              <StoreSnapshot
                data={data}
                storeSellerData={supplier.length > 0 ? supplier[0] : undefined}
                pickupLocData={
                  supplier.length > 0 ? supplier[0].pickup_locations : undefined
                }
                supplierShippingInfo={
                  supplier.length > 0 ? supplier[0].shipping_information : undefined
                }
                sellerHaveNoProducts={categoryItems && categoryItems.length === 0}
              />
            )
          } */}
          {/* {
            location.pathname.includes("stores") && (
              <div style={{ width: "85%", margin: "0 auto 10px" }}>
                <img src={storeQuote} style={{ width: "100%" }} />
              </div>

            )
          } */}

        </div>
      </div>
    );
  }
}

export default Category_Static;
