import React from "react";
import classes from "../Styles/RatingSnapshot.module.css";

const RatingSnapshot = ({
  avgRating,
  amountOfReviews,
  starFilter,
  setStarFilter,
  renderedInsidePopup,
  reviewsContainerRef
}) => {
  const handleRatingMeterClicked = starIndex => {
    if (starFilter.includes(starIndex)) {
      setStarFilter([...starFilter.filter(star => star != starIndex)]);
    } else {
      setStarFilter([...starFilter, starIndex]);
    }

    if (renderedInsidePopup) {
      if (typeof window !== undefined) {
        window.scrollTo(0, reviewsContainerRef.current.offsetTop);
      }
    }
  };
  return (
    <div className={classes.ratingSnapshot}>
      <table className={classes.ratingSnapshotTable}>
        <tbody>
          {Object.keys(avgRating).includes("countOfEachStar") &&
            Object.keys(avgRating.countOfEachStar).length > 0 &&
            [...Array(5)].map((_, i) => {
              let starIndex = 5 - i;

              let percent =
                (avgRating.countOfEachStar[starIndex] * 100) / amountOfReviews;
              let ratingMeterClasses = [];
              ratingMeterClasses.push(classes.ratingMeter);
              if (starFilter.includes(starIndex))
                ratingMeterClasses.push(classes.ratingMeterFiltered);

              console.info("ratingMeterClasses", ratingMeterClasses);
              return (
                <tr key={i}>
                  <td className={classes.meterColumnLabel}>
                    {`${starIndex} `}
                    <i className="material-icons star-icon">star</i>
                  </td>
                  <td className={classes.meterColumn}>
                    <div
                      onClick={() => {
                        if (avgRating.countOfEachStar[starIndex] > 0) {
                          handleRatingMeterClicked(starIndex);
                        }
                      }}
                      className={ratingMeterClasses.join(" ")}
                    >
                      <div
                        style={{ width: `${percent}%` }}
                        className={classes.ratingMeterFilled}
                      >
                        <label
                          className={classes.percentLabel}
                        >{`${percent.toFixed(1)}%`}</label>
                      </div>
                    </div>
                  </td>
                  <td>{`${avgRating.countOfEachStar[starIndex]}`}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default RatingSnapshot;
