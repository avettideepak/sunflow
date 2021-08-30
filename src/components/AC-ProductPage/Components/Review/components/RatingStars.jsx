import React, { useContext } from "react";
import classes from "../Styles/RatingStars.module.css";
import { I18nContext } from "../../../../../i18n";

const RatingStars = ({
  rating,
  amountOfReviews,
  isReview,
  renderTotalReviewsCount
}) => {
  const { translate } = useContext(I18nContext);

  const renderStarBasedOnAvgRating = i => {
    if (i <= rating) return `star`;
    else if (i - 0.5 == rating) return `star_half`;
    else return `star_border`;
  };
  return (
    <React.Fragment>
      <div className={classes.ratingStars}>
        {[...Array(5)].map((_, i) => (
          <i key={i} className="material-icons star-icon">
            {isReview
              ? i + 1 <= rating
                ? `star`
                : `star_border`
              : renderStarBasedOnAvgRating(i + 1)}
          </i>
        ))}
      </div>

      {renderTotalReviewsCount ? (
        <div className={classes.totalReviewsWrapper}>
          <small className={classes.reviewCount}>
            <b>{amountOfReviews}</b>
            {amountOfReviews == 1
              ? ` ${translate("js.item.review")}`
              : ` ${translate("js.item.reviews")}`}
          </small>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default RatingStars;
