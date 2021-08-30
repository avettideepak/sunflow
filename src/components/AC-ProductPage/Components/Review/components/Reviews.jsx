import React, { useState, useEffect, useRef } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import RatingSnapshot from "./RatingSnapshot";
import RatingBox from "./RatingBox";
import ReviewPhoto from "./ReviewPhoto";
import RatingStars from "./RatingStars";
import ReviewPhotosHorizontalScrolling from "./ReviewPhotosHorizontalScrolling";
import { setReviewModalStateAction } from "../../../../../redux/actions/productAction";
import { I18nContext } from "../../../../../i18n/index";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


import classes from "../Styles/Reviews.module.css";

export const Reviews = ({
  avgRating,
  setAvgRating,
  starFilter,
  setStarFilter,
  reviewsContainerRef,
  setReviewsWithImages,
  reviewsWithImages
}) => {
  const dispatch = useDispatch();

  const { translate } = React.useContext(I18nContext);

  const reviewsState = useSelector(
    state => state.productReducer.productInitial.reviews,
    shallowEqual
  );

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1600 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 1600, min: 1360 },
      items: 1
    },
    mdDesktop: {
      breakpoint: { max: 1360, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 1
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

  const [filteredReviewsState, setFilteredReviewsState] = useState([]);

  useEffect(() => {
    if (reviewsState && reviewsState.length > 0) {
      let avg =
        reviewsState.reduce((acc, review) => acc + Number(review.rating), 0) /
        reviewsState.length;
      let tempCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      let totalValue = 0;
      for (let review of reviewsState) {
        tempCount[review.rating] = tempCount[review.rating] + 1;
      }

      for (let key of Object.keys(tempCount)) {
        totalValue = totalValue + tempCount[key] * Number(key);
      }

      setAvgRating({
        avgRating: Math.round(avg * 2) / 2,
        countOfEachStar: tempCount,
        totalValue: totalValue
      });

      if (starFilter) {
        if (starFilter.length == 0) {
          setFilteredReviewsState([...reviewsState]);
        } else {
          setFilteredReviewsState([
            ...reviewsState.filter(review =>
              starFilter.some(star => star == review.rating)
            )
          ]);
        }
      }
    }
  }, [reviewsState]);

  useEffect(() => {
    if (reviewsState && reviewsState.length > 0) {
      if (starFilter.length == 0) {
        setFilteredReviewsState([...reviewsState]);
      } else {
        setFilteredReviewsState([
          ...reviewsState.filter(review =>
            starFilter.some(star => star == review.rating)
          )
        ]);
      }
      console.info("starFilter", starFilter, reviewsState);
    }
  }, [starFilter]);

  if (reviewsState && reviewsState.length > 0) {
    return (
      <div
        ref={reviewsContainerRef}
        id="reviewsContainer"
        className={classes.container}
      >
        <div className={classes.wrapper}>
          <h1 className={classes.title}>
            {translate("js.item.reviews")}
            {/* <i
              onClick={() => {
                if (typeof window !== undefined) {
                  window.scrollTo(0, 0);
                }
              }}
              title="Scroll back to top"
              className="material-icons"
            >
              arrow_upward
            </i> */}
            
          </h1>
          <div className={classes.ratingSideContainer}>
            {/* <div className={classes.ratingSide}>
              <div className={classes.reviewStarAndBoxWrapper}>
                <RatingBox
                  avgRating={avgRating}
                  amountOfReviews={reviewsState.length}
                  range={5}
                  renderTotalReviewsCount={true}
                />
                <div className={classes.ratingStarsWrapper}>
                  <RatingStars
                    amountOfReviews={reviewsState.length}
                    isReview={false}
                    rating={avgRating.avgRating}
                    renderTotalReviewsCount={true}
                  />
                  <div className={classes.reviewLinksContainer}>
                    <div className="reviews-links">
                      <a
                        onClick={() =>
                          dispatch(setReviewModalStateAction(true))
                        }
                        style={{ paddingLeft: "5px" }}
                      >
                        <span>{translate("js.item.review.write")}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <RatingSnapshot
                avgRating={avgRating}
                amountOfReviews={reviewsState.length}
                starFilter={starFilter}
                setStarFilter={setStarFilter}
              />
              <ReviewPhotosHorizontalScrolling
                reviews={reviewsState}
                setReviewsWithImages={setReviewsWithImages}
                reviewsWithImages={reviewsWithImages}
              />
            </div> */}

            <div className={classes.reviews + " scroll-bar-thin-style"}>
            <Carousel
                swipeable={true}
                draggable={true}
                showDots={true}
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
              >
              {filteredReviewsState &&
                filteredReviewsState.map((review, index) => {
                  return (
                    <div
                      key={review.id}
                      className="owl-item item-card-itemFeatured"
                    >
                    <div className={classes.review} key={index}>
                      <div className={classes.reviewTitle}>
                        <RatingStars
                          amountOfReviews={reviewsState.length}
                          isReview={true}
                          rating={Number(review.rating)}
                        />
                       
                      </div>
                      <div className={classes.reviewContent}>
                        {/* <label
                          style={{ fontWeight: "bold", fontSize: "16px" }}
                          dangerouslySetInnerHTML={{ __html: review.title }}
                        ></label> */}

                        <p
                          className={classes.reviewDetails}
                          dangerouslySetInnerHTML={{ __html: review.details }}
                        ></p>

                        <p className={classes.reviewedBy}>
                          {/* {`${translate("review.reviewedBy")} `} */}
                          
                           - {review.author.toLowerCase()}
                         
                          {/* {` ${translate(
                            "js.item.onDate"
                          )} ${review.date.replace(/(\d)(?=\s)/g, "$&,")}`} */}
                        </p>
                        {/* {review.image ? (
                          <ReviewPhoto
                            amountOfReviews={reviewsState.length}
                            review={review}
                            reviewsWithImages={reviewsWithImages}
                          />
                        ) : null} */}

                      </div>
                    </div>
                    </div>
                  );
                })}
                </Carousel>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Reviews;
