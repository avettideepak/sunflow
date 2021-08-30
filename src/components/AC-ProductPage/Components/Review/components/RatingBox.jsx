import React, { useContext } from "react";
import classes from "../Styles/RatingBox.module.css";
import { I18nContext } from "../../../../../i18n";

const RatingBox = ({
  avgRating,
  amountOfReviews,
  range,
  renderTotalReviewsCount
}) => {
  const { translate } = useContext(I18nContext);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.avgWrapper}>
          <label className={classes.averageRatingLabel}>
            {Object.keys(avgRating).includes("avgRating") &&
              avgRating.avgRating.toFixed(1)}
          </label>
        </div>
        <div className={classes.rangeWrapper}>
          <label className={classes.rangeLabel}>{`${translate(
            "js.item.review.outof"
          )} ${range}`}</label>
        </div>
      </div>
    </div>
  );
};

export default RatingBox;
