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
      <div className="mobilereviewLeft">
        {[...Array(5)].map((_, i) => (
          <i key={i} className="material-icons star-icon">
            {renderStarBasedOnAvgRating(i + 1)}
          </i>
        ))}
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
        <div>
          <div>
            <div className="mobilereview">
              <a href="#reviewsContainer" id="review-link">
                {renderRatingStars(avgRating.avgRating)}{" "}
                <span className="mobilereviewRight">{`${reviewsState.length}`}</span>
                {renderRatingSnapshot()}
              </a>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    return null;
  }
};

export default ReviewBar;
