import React, { useState, useEffect, useContext } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import { CATEGORY_FETCH_LINK } from "@/redux/links.js";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { PROJECT_LINK } from "@/project-config";
import ItemCard from "../AC-CategoryPage/components/ItemCard/ItemCard";
import Grid from "@material-ui/core/Grid";


import { toggleWishListAction } from "@/redux/actions/wishListActions";

import { I18nContext } from "@/i18n";

function FeaturedCategories() {
  const { langCode } = useContext(I18nContext);

  const dispatch = useDispatch();

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  const distanceState = useSelector(
    state => state.categoryReducer.distance,
    shallowEqual
  );

  const geoLocationState = useSelector(
    state => state.geoLocationReducer.geoLocation,
    shallowEqual
  );

  const userInfoState = useSelector(
    state => state.loginReducer.userInfo,
    shallowEqual
  );

  const [items1, setItems1] = useState([]);

  const featuredState = "59523";

  useEffect(() => {
    if (featuredState != "") {
      let firstUrl = CATEGORY_FETCH_LINK(featuredState, langCode);

      fetch(firstUrl)
        .then(data => data.json())
        .then(json => {
          setItems1(json[1].items);
        });
    }
  }, [featuredState]);

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
      items: 1
    },
    xsMobile: {
      breakpoint: { max: 520, min: 0 },
      items: 1
    }
  };

  const wishListState = useSelector(
    state => state.wishListReducer.wishlist,
    shallowEqual
  );

  const toggleWish = (e, id, title, desc, currency_sign, image, price, url) => {
    e.preventDefault();
    dispatch(
      toggleWishListAction(
        id,
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

  const renderLocation = () => {
    if (geoLocationState.city != geoLocationState.state) {
      return `${geoLocationState.city}, ${geoLocationState.state}`;
    } else {
      return `${geoLocationState.city || userInfoState.city}, ${
        geoLocationState.country || userInfoState.countryName
      }`;
    }
  };

  const handleChangeBtnClicked = () => {
    const button = document.getElementById("locationChangeBtn");
    button.click();
  };

  const renderPlaceholderCards = () => {
    return (
      <Carousel
        swipeable={false}
        draggable={true}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
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
            <Grid item className="item-card-item" xs={12}>
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

  const isLoading = !items1.length > 0;

  console.log("Siva", isLoading);

  return (
    <div>
      <div className="header-container">
        <h4 className="fe">
          Featured Products Within <b>{distanceState} KM</b>{" "}
          <span>of {renderLocation()}</span>{" "}
          <span
            onClick={handleChangeBtnClicked}
            className="itemsShow-changeBtn"
          >
            Change
          </span>
        </h4>
        {!isLoading ? (
          <Carousel
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={isMobileState ? true : false}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            transitionDuration={500}
          >
            {items1.map(item => (
              <div key={item.id} className="owl-item item-card-itemFeatured">
                <ItemCard
                  key={item.id}
                  itemCard={item}
                  toggleWish={toggleWish}
                  wishListState={wishListState}
                  teaserInfo={item}
                  codeInfo={item}
                />
              </div>
            ))}
          </Carousel>
        ) : (
          renderPlaceholderCards()
        )}
      </div>
    </div>
  );
}

export default FeaturedCategories;
