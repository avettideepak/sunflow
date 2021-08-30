import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { setReviewModalStateAction } from "../../../../redux/actions/productAction";
import RatingSnapshot from "./components/RatingSnapshot";
import { I18nContext } from "../../../../i18n/index";
import { WriteReviewModal } from "./components/WriteReviewModal";
import "./Styles/ReviewBar.css";

const ReviewBar = ({
  avgRating,
  starFilter,
  setStarFilter,
  reviewsContainerRef
}) => {
  const dispatch = useDispatch();

  const { translate } = React.useContext(I18nContext);

  const reviewsState = useSelector(
    state => state.productReducer.productInitial.reviews,
    shallowEqual
  );
  const renderRatingStars = (rating, noDropdown) => {
    const renderStarBasedOnAvgRating = i => {
      if (i <= rating) return `star`;
      else if (i - 0.5 == rating) return `star_half`;
      else return `star_border`;
    };
    return (
      <div className="review-bar-review-stars">
        {[...Array(5)].map((_, i) => (
          <i key={i} className="material-icons star-icon">
            {renderStarBasedOnAvgRating(i + 1)}
          </i>
        ))}
        {noDropdown ? null : (
          <i className="material-icons star-icon">arrow_drop_down</i>
        )}
      </div>
    );
  };

  const renderRatingSnapshot = () => {
    return (
      <div
        className="review-bar-rating-snapshot"
        onClick={() => {
          if (typeof window !== undefined) {
            window.scrollTo(0, reviewsContainerRef.current.offsetTop);
          }
        }}
      >
        <div className="review-bar-snapshot-avg-wrapper">
          {renderRatingStars(avgRating.avgRating, true)}
          <div
            className="review-points"
            style={{
              padding: "5px 0 5px 5px",
              fontWeight: "bold",
              fontSize: "16px"
            }}
          >
            {` ${avgRating.avgRating} `}
            <span>{translate("js.item.review.outof")} 5</span>
          </div>
        </div>
        <p
          style={{
            padding: "5px 0 5px 5px",
            fontWeight: "lighter",
            fontSize: "13px"
          }}
        >{`${reviewsState.length} ${
          reviewsState.length > 1
            ? translate("js.item.reviews")
            : translate("js.item.review")
        }`}</p>
        <div className="review-table-wrapper">
          <RatingSnapshot
            avgRating={avgRating}
            amountOfReviews={reviewsState.length}
            starFilter={starFilter}
            setStarFilter={setStarFilter}
            renderedInsidePopup={true}
            reviewsContainerRef={reviewsContainerRef}
          />
        </div>
      </div>
    );
  };

  if (reviewsState && reviewsState.length > 0) {
    return (
      <React.Fragment>
        <WriteReviewModal />
        <div id="reviewGrid">
          <div
            className="magnifier-preview"
            id="gallery-preview"
            
          >
            <li
              className="padding-b5 review-bar"
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px 0"
              }}
            >
              <div className="review-stars">
                <div className="review-stars-wrapper">
                  {renderRatingStars(avgRating.avgRating)}
                  {renderRatingSnapshot()}
                </div>
              </div>
              <div className="review-points" style={{ padding: "5px 0 0 5px" }}>
                {` ${avgRating.avgRating} `}
                <span>
                  {translate("js.item.review.outof")} 5{" "}
                  {`( ${reviewsState.length} )`}
                </span>
              </div>
              <div className="reviews-links">
                <a
                  href="#reviewsContainer"
                  id="review-link"
                  style={{ paddingLeft: "5px", paddingRight: "5px" }}
                >
                  <span>{translate("js.item.review.read")}</span>
                </a>
                <span>|</span>
                <a
                  onClick={() => dispatch(setReviewModalStateAction(true))}
                  style={{ paddingLeft: "5px" }}
                >
                  <span><i className="material-icons">edit</i></span>
                </a>
              </div>
            </li>
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <WriteReviewModal />
        <div id="reviewGrid">
          <div
            className="magnifier-preview"
            id="gallery-preview"
            
          >
            <li
              className="padding-b5 review-bar"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end"
              }}
            >
              <div className="review-stars">
                <div
                  className="review-stars-wrapper"
                  style={{ pointerEvents: "none" }}
                >
                  {renderRatingStars(avgRating.avgRating, true)}
                </div>
              </div>
              <div className="reviews-links" style={{ paddingLeft: "5px" }}>
                <a onClick={() => dispatch(setReviewModalStateAction(true))}>
                  <span><i className="material-icons">edit</i></span>
                </a>
              </div>
            </li>
          </div>
        </div>
      </React.Fragment>
    );
  }
};

export default ReviewBar;
