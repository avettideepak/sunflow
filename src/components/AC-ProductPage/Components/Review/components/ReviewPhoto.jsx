import React, { useState, useEffect, useRef } from "react";
import RatingStars from "./RatingStars";
import classes from "../Styles/ReviewPhoto.module.css";
import { setHTMLElementFixedPosition } from "../../../../../functions/Utilities";
import { STORE_LINK } from "../../../../../project-config";

const ReviewPhoto = ({
  review,
  amountOfReviews,
  renderedBy,
  reviewsWithImages
}) => {
  const [reviewModalState, setReviewModalState] = useState({
    open: false,
    galleryView: false
  });

  const [reviewState, setReviewState] = useState({});

  const modalRef = useRef();

  useEffect(() => {
    if (reviewModalState.open == false) {
      setReviewModalState({ ...reviewModalState, galleryView: false });
      setReviewState({
        review: review,
        reviewIndex: reviewsWithImages.findIndex(
          reviewWithImage => reviewWithImage.reviewid == review.reviewid
        )
      });
    } else if (reviewModalState.open == true) {
      console.info("review modal open", reviewModalState.open);
      setHTMLElementFixedPosition(true);
      modalRef.current.focus();
    }

    return () => {
      console.info("review unmount", renderedBy);
      setHTMLElementFixedPosition(false);
    };
  }, [reviewModalState.open]);

  const handleKeyPressed = event => {
    console.info("key down modal");
    const keyPressed = event.keyCode;
    if (keyPressed == 27) {
      console.info("key pressed");
      closeReviewModal();
    } else if (keyPressed == 37 && reviewState.reviewIndex > 0) {
      setReviewState({
        review: reviewsWithImages[reviewState.reviewIndex - 1],
        reviewIndex: reviewState.reviewIndex - 1
      });
    } else if (
      keyPressed == 39 &&
      reviewState.reviewIndex < reviewsWithImages.length - 1
    ) {
      setReviewState({
        review: reviewsWithImages[reviewState.reviewIndex + 1],
        reviewIndex: reviewState.reviewIndex + 1
      });
    }
  };

  const closeReviewModal = () => {
    setReviewModalState({ ...reviewModalState, open: false });
  };

  const toggleReviewModal = () => {
    setReviewModalState({
      ...reviewModalState,
      open: !reviewModalState.open
    });
  };

  const handleGalleryViewClicked = () => {
    setReviewModalState({ ...reviewModalState, galleryView: true });
  };

  const renderGalleryView = () => {
    if (reviewModalState.galleryView) {
      return (
        <div className={classes.galleryViewPhotosWrapper}>
          {reviewsWithImages.map((_review, index) => (
            <div className={classes.container}>
              <div
                className={classes.wrapper}
                onClick={() => {
                  setReviewState({ review: _review, reviewIndex: index });
                  setReviewModalState({
                    ...reviewModalState,
                    galleryView: false
                  });
                }}
              >
                <img
                  className={classes.reviewImage}
                  src={STORE_LINK + _review.image}
                  alt={`uploaded image for ${_review.title}`}
                />
              </div>
            </div>
          ))}
        </div>
      );
    } else return null;
  };

  console.info("reviews with images", reviewsWithImages);

  const renderModalGalleryViewButton = () => {
    if (renderedBy == "horizontalScrolling") {
      return (
        <div
          className={classes.photoModalGalleryViewContainer}
          onClick={handleGalleryViewClicked}
        >
          <i className="material-icons">apps</i>
          <span>View All Images</span>
        </div>
      );
    } else {
      return null;
    }
  };

  const handleArrowClicked = reviewIndex => {
    setReviewState({
      review: reviewsWithImages[reviewIndex],
      reviewIndex: reviewIndex
    });
    console.info("arrow clicked", reviewIndex, reviewState);
  };

  const renderReviewBody = () => {
    if (!reviewModalState.galleryView) {
      console.info("reviewIndex", reviewState.reviewIndex);
      return (
        <div className={classes.photoModalBody}>
          <div className={classes.photoModalImageContainer}>
            <div className={classes.photoModalImageWrapper}>
              <div className={classes.photoModalImageBox}>
                <img
                  className={classes.photoModalImage}
                  src={STORE_LINK + reviewState.review.image}
                  alt={`Uploaded picture of ${reviewState.review.title}`}
                />
              </div>
            </div>

            <div className={classes.photoModalImageArrowsWrapper}>
              <div
                onClick={() => handleArrowClicked(reviewState.reviewIndex - 1)}
                style={{ display: reviewState.reviewIndex == 0 ? "none" : "" }}
                className={`${classes.photoModalImageArrowLeft}`}
              >
                <i className="material-icons no-select">arrow_back_ios</i>
              </div>
              <div
                onClick={() => handleArrowClicked(reviewState.reviewIndex + 1)}
                style={{
                  display:
                    reviewState.reviewIndex == reviewsWithImages.length - 1
                      ? "none"
                      : ""
                }}
                className={classes.photoModalImageArrowRight}
              >
                <i className="material-icons no-select">arrow_forward_ios</i>
              </div>
            </div>
          </div>
          <div className={classes.photoModalReviewContainer}>
            <div className={classes.review}>
              <div className={classes.reviewTitle}>
                <RatingStars
                  amountOfReviews={amountOfReviews}
                  isReview={true}
                  rating={Number(reviewState.review.rating)}
                />
                <p className={classes.reviewedBy}>
                  {`Reviewed by `}
                  <b style={{ textTransform: "capitalize" }}>
                    {reviewState.review.author.toLowerCase()}
                  </b>
                  {` on ${reviewState.review.date.replace(
                    /(\d)(?=\s)/g,
                    "$&,"
                  )}`}
                </p>
              </div>
              <div className={classes.reviewContent}>
                <label
                  style={{ fontWeight: "bold", fontSize: "16px" }}
                  dangerouslySetInnerHTML={{ __html: reviewState.review.title }}
                ></label>

                <p
                  className={classes.reviewDetails}
                  dangerouslySetInnerHTML={{
                    __html: reviewState.review.details
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  if (reviewState && reviewState.review) {
    return (
      <React.Fragment>
        {reviewModalState.open ? (
          <div
            ref={modalRef}
            tabIndex={0}
            onKeyDown={handleKeyPressed}
            onClick={toggleReviewModal}
            className={classes.photoModalContainer}
            open={reviewModalState.open}
          >
            <div
              className={classes.photoModalWrapper}
              onClick={event => event.stopPropagation()}
            >
              <div className={classes.photoModalHeader}>
                {renderModalGalleryViewButton()}
                <i onClick={toggleReviewModal} className="material-icons">
                  close
                </i>
              </div>
              <div className={classes.photoModalBodyContainer}>
                {renderGalleryView()}
                {renderReviewBody()}
              </div>
            </div>
          </div>
        ) : null}
        <div className={classes.container} renderedby={renderedBy}>
          <div className={classes.wrapper} onClick={toggleReviewModal}>
            <img
              className={classes.reviewImage}
              src={STORE_LINK + review.image}
              alt={`uploaded image for ${review.title}`}
            />
          </div>
        </div>
      </React.Fragment>
    );
  } else return null;
};

export default ReviewPhoto;
