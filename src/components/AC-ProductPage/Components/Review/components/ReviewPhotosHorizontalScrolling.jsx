import React, { useEffect, useContext } from "react";
import ReviewPhoto from "./ReviewPhoto";
import "../Styles/ReviewPhotosHorizontalScrolling.css";
import { I18nContext } from "../../../../../i18n";

const ReviewPhotosHorizontalScrolling = ({
  reviews,
  setReviewsWithImages,
  reviewsWithImages
}) => {
  const { translate } = useContext(I18nContext);
  console.info("reviews", reviews);
  let reviewsCopy = [...reviews];

  useEffect(() => {
    let reviewsWithImagesTemp = reviewsCopy.filter(review => review.image);
    if (reviewsWithImagesTemp.length > 0) {
      setReviewsWithImages([...reviewsWithImagesTemp]);
    }
  }, []);

  if (reviewsWithImages && reviewsWithImages.length > 0) {
    return (
      <div className="review-photos--container">
        <h5 className="review-photos--title">
          {translate("review.reviewerImages")}
        </h5>
        <div className="horizontal-scrolling">
          <ul className="hs full">
            {reviewsWithImages.map((review, index) => {
              return (
                <li className="item" key={index}>
                  <ReviewPhoto
                    review={review}
                    amountOfReviews={reviews.length}
                    renderedBy={"horizontalScrolling"}
                    reviewsWithImages={reviewsWithImages}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ReviewPhotosHorizontalScrolling;
