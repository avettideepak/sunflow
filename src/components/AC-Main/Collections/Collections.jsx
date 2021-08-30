import React, { useState, useEffect, useContext } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { fetchCollectionAction } from "@/redux/actions/collectionsAction"; 
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Grid from "@material-ui/core/Grid";
import { I18nContext } from "@/i18n";
import { LINK_DISTRIBUTION, VID, PREVIEW } from "@/project-config";

import classes from "./Collections.module.css";
import { navigate } from "gatsby";

function Collections() {
  const dipatch = useDispatch();
  const { translate, langCode } = useContext(I18nContext);
  const navCatsState = useSelector(
    state => state.menuReducer.navCats,
    shallowEqual
  );

  const collectionsState = useSelector(
    state => state.collectionsReducer.collections,
    shallowEqual
  );

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  const distanceState = useSelector(
    state => state.categoryReducer.distance,
    shallowEqual
  );

  const userLocationState = useSelector(
    state => state.userLocationReducer,
    shallowEqual
  );

  useEffect(() => {
    console.info("borop", navCatsState);
    if (
      navCatsState &&
      navCatsState.childs &&
      navCatsState.childs[0] &&
      Object.keys(collectionsState).length == 0
    ) {
      const { cid, name: cat, URL } = navCatsState.childs[0];
      dipatch(fetchCollectionAction(cat, URL, cid, langCode));
    }
  }, [navCatsState]);

  const handleCollectionCardClicked = (URL, facet) => {
    navigate(
      `${PREVIEW}/${URL.replace(
        "shop/",
        ""
      )}/collections/${facet.text.toLowerCase()}`
    );
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1600 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 1600, min: 1360 },
      items: 5
    },
    mdDesktop: {
      breakpoint: { max: 1360, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 768, min: 520 },
      items: 2
    },
    xsMobile: {
      breakpoint: { max: 520, min: 0 },
      items: 1
    }
  };

  const renderPlaceholderCards = () => {
    return (
      <Carousel
        swipeable={false}
        draggable={true}
        showDots={false}
        responsive={responsive}
        ssr={false} // means to render carousel on server-side.
        infinite={true}
        autoPlay={isMobileState ? true : false}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["mobile", "xsMobile"]}
        // deviceType={this.props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {Array(6)
          .fill(0, 0, 6)
          .map((v, i) => (
            <Grid key={i} item className="item-card-item" xs={12}>
              <div
                className="placeholder-item-card-wrapper"
                style={{ boxShadow: "0px 0px 1px 0px #c8c8c8" }}
              >
                <div
                  style={{
                    backgroundColor: "#fff",
                    height: "400px"
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
      </Carousel>
    );
  };

  const renderLocation = () => {
    if (userLocationState.city != userLocationState.state) {
      return `${userLocationState.city}, ${userLocationState.state}`;
    } else {
      return `${userLocationState.city}, ${userLocationState.country}`;
    }
  };

  const handleChangeBtnClicked = () => {
    const button = document.getElementById("locationChangeBtn");
    button.click();
  };

  const renderCollectionCards = (isLoading, collectionsFacets, cat, URL) => {
    return (
      <div>
        <div className="header-container">
          <h4 className="local">
            {cat.slice(0, -1)} Collection{" "}
            <span>
              Within <b>{distanceState} KM</b> of {renderLocation()}
            </span>{" "}
            <span
              onClick={handleChangeBtnClicked}
              className="itemsShow-changeBtn"
            >
              Change
            </span>
          </h4>
          {!isLoading && collectionsFacets.facetValues.length > 0 ? (
            <Carousel
              swipeable={true}
              draggable={true}
              showDots={false}
              responsive={responsive}
              ssr={false} // means to render carousel on server-side.
              infinite={true}
              autoPlay={isMobileState ? true : false}
              autoPlaySpeed={3000}
              keyBoardControl={true}
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["mobile", "xsMobile"]}
              // deviceType={this.props.deviceType}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {collectionsFacets.facetValues
                .filter(facet => facet.count > 0)
                .map(facet => (
                  <div
                    key={cat}
                    onClick={() => handleCollectionCardClicked(URL, facet)}
                    className={classes.collectionCard + " no-select"}
                  >
                    <img
                      className={classes.collectionCardImg}
                      src={`${LINK_DISTRIBUTION}/store/${VID}/assets/images/collections/${facet.text.replace(
                        "/",
                        "-"
                      )}.jpg`}
                      alt={facet.text}
                    ></img>
                    <span className={classes.collectionText}>{facet.text}</span>
                  </div>
                ))}
            </Carousel>
          ) : (
            renderPlaceholderCards()
          )}
        </div>
      </div>
    );
  };

  const renderCollections = () => {
    let cids = Object.keys(collectionsState);
    for (let cid of cids) {
      const collectionsOfCid = collectionsState[cid];
      const { loading, cat, URL } = collectionsOfCid;
      if (
        collectionsOfCid &&
        collectionsOfCid[2] &&
        collectionsOfCid[2].facets &&
        collectionsOfCid[2].facets[2] &&
        collectionsOfCid[2].facets[2].Other
      ) {
        let otherFacets =
          collectionsOfCid[2].facets[2] && collectionsOfCid[2].facets[2].Other;

        let collectionsFacets = otherFacets.find(
          facet => facet.name === "Collections"
        );

        console.info("borop", collectionsFacets);

        if (collectionsFacets && collectionsFacets.facetValues) {
          return renderCollectionCards(loading, collectionsFacets, cat, URL);
        }
      }
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>{renderCollections()}</div>
    </div>
  );
}

export default Collections;
