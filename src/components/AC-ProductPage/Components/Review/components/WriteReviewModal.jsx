import React, { useState, useEffect, useContext, useRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  setHTMLElementFixedPosition,
  getBase64
} from "../../../../../functions/Utilities";
import { htmlDecode } from "../../../../../functions/htmldecoder";
import EventListener from "../../../../AC-UtilityComponents/EventListener";
import classes from "../Styles/WriteReviewModal.module.css";
import {
  setReviewModalStateAction,
  reFetchProductInitialState
} from "../../../../../redux/actions/productAction";
import { I18nContext } from "../../../../../i18n";
import { ITEM_REVIEW } from "../../../../../redux/links";
import { VID, PREVIEW } from "../../../../../project-config";

import CSSLoading from "../../../../AC-Loading/CSSLoading";

export const WriteReviewModal = () => {
  const { translate, langCode } = useContext(I18nContext);
  const dispatch = useDispatch();

  const [reviewJsonResponse, setReviewJsonResponse] = useState({});
  const [reviewValidation, setReviewValidation] = useState([]);

  const userLoggedInState = useSelector(
    state => state.loginReducer.loginName,
    shallowEqual
  );

  const productLinkState = useSelector(
    state => state.productReducer.productInitial.productLink,
    shallowEqual
  );

  const reviewsModalOpenState = useSelector(
    state => state.productReducer.reviewsModalOpen,
    shallowEqual
  );

  const productInitialTitleState = useSelector(
    state => state.productReducer.productInitial.title,
    shallowEqual
  );

  const itemDetailState = useSelector(
    state => state.productReducer.itemDetail,
    shallowEqual
  );

  const [uploadedImgBase64, setUploadedImgBase64] = useState("");
  const [imageBeingUploaded, setImageBeingUploaded] = useState(false);

  const titleInputRef = useRef();
  const detailsInputRef = useRef();
  const fileUploadRef = useRef();
  const reviewFormRef = useRef();

  const [ratingState, setRatingState] = useState({
    ratingSet: false,
    rating: 0
  });

  useEffect(() => {
    if (reviewsModalOpenState) {
      setHTMLElementFixedPosition(reviewsModalOpenState);
    }
    return () => {
      setHTMLElementFixedPosition(false);
      setReviewJsonResponse({});
      setUploadedImgBase64("");
      setRatingState({
        ratingSet: false,
        rating: 0
      });
    };
  }, [reviewsModalOpenState]);

  const handleRatingMouseEnter = rating => {
    if (!ratingState.ratingSet)
      setRatingState({ ratingSet: false, rating: rating });
  };

  const handleRatingMouseLeave = () => {
    if (!ratingState.ratingSet) setRatingState({ ratingSet: false, rating: 0 });
  };

  const handleRatingClicked = rating => {
    setRatingState({ ratingSet: true, rating: rating });
  };

  const renderRatingInputs = () => {
    let result = (
      <div className={classes.ratingInputContainer}>
        {[...Array(5)].map((_, i) => (
          <i
            key={i}
            onClick={() => handleRatingClicked(i + 1)}
            onMouseEnter={() => handleRatingMouseEnter(i + 1)}
            onMouseLeave={() => handleRatingMouseLeave()}
            className="material-icons star-icon"
          >
            {i + 1 <= ratingState.rating ? `star` : `star_border`}
          </i>
        ))}
      </div>
    );

    return result;
  };

  const handleUploadedImageRemoveIconClicked = () => {
    if (
      fileUploadRef &&
      fileUploadRef.current &&
      fileUploadRef.current.files &&
      fileUploadRef.current.files[0]
    ) {
      fileUploadRef.current.value = "";
      handleImageUploadFileChange();
      console.info("remove icon clicked", fileUploadRef.current.files);
    } else {
      handleImageUploadFileChange();
    }
  };

  const handleLoginBtnClicked = () => {
    dispatch(setReviewModalStateAction(false));
    const btn = document.getElementById("login-icon-btn");
    if (btn) btn.click();
  };

  const handleImageUploadFileChange = event => {
    const file = event && event.target && event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageBeingUploaded(true);
      getBase64(file, setUploadedImgBase64);
    } else {
      setUploadedImgBase64("");
      return;
    }

    console.info("file", file, uploadedImgBase64);
  };

  useEffect(() => {
    if (uploadedImgBase64)
      setTimeout(() => {
        setImageBeingUploaded(false);
      }, 250);
  }, [uploadedImgBase64]);

  console.info("file 1", fileUploadRef);

  console.info("file base64", uploadedImgBase64);

  const renderUploadedFileImage = () => {
    console.info("imageBeingUploaded", imageBeingUploaded);
    if (imageBeingUploaded || uploadedImgBase64) {
      return (
        <div className={classes.uploadedImageContainer}>
          <div className={classes.uploadedImageWrapper}>
            {imageBeingUploaded ? (
              <CSSLoading></CSSLoading>
            ) : (
              <img src={uploadedImgBase64} alt="image uploaded" />
            )}
            {uploadedImgBase64 && !imageBeingUploaded ? (
              <i
                onClick={handleUploadedImageRemoveIconClicked}
                className={`material-icons ${classes.uploadedImageRemoveIcon}`}
              >
                close
              </i>
            ) : null}
          </div>
        </div>
      );
    }
    return <button className={classes.fileUploadButton}></button>;
  };

  const renderErrors = () => {
    let result = [];
    if (reviewValidation.length > 0) {
    }
    result.push(
      reviewValidation.map(error => (
        <p className={classes.errorText}>{error}</p>
      ))
    );
    if (
      reviewJsonResponse &&
      reviewJsonResponse.__Result &&
      reviewJsonResponse.__Result.errors.length > 0
    ) {
      result.push(
        reviewJsonResponse.__Result.errors.map(error => (
          <p className={classes.errorText}>{error}</p>
        ))
      );
    }

    if (
      reviewJsonResponse &&
      reviewJsonResponse.__Success &&
      reviewJsonResponse.__Success == "true"
    ) {
      result = (
        <p className={classes.successText}>Review submited successfully</p>
      );
    }
    return result;
  };

  const keyDownHandler = event => {
    if (event.keyCode == 27) {
      console.info("key pressed");
      dispatch(setReviewModalStateAction(false));
    }
  };

  const emptyTheForm = () => {
    titleInputRef.current.value = "";
    detailsInputRef.current.value = "";

    setUploadedImgBase64("");
  };

  const handleSubmitReview = () => {
    console.info("review response", reviewJsonResponse);

    if (ratingState.rating == 0) {
      let ratingErrorText = translate("review.errRatingIsRequired");
      setReviewValidation([
        ...reviewValidation.filter(error => error != ratingErrorText),
        ratingErrorText
      ]);
      return;
    }

    setReviewValidation([]);
    let form = new FormData(reviewFormRef.current);

    form.append("itemid", itemDetailState.itemid);
    form.append("action", "add");
    form.append("itemcode", itemDetailState.code);
    form.append("svid", VID);
    form.append("ivid", itemDetailState.vendorid);
    form.append("rating", ratingState.rating);

    fetch(ITEM_REVIEW, {
      method: "POST",
      body: form,
      headers: {
        Accept: "*/*",
        credentials: "same-origin"
      },
      mimeType: "multipart/form-data"
    })
      .then(res => res.json())
      .then(data => {
        setReviewJsonResponse(data);
        if (data && data.__Success == "true") {
          dispatch(reFetchProductInitialState(productLinkState));
          emptyTheForm();
        }
        // setMessageStatus(statusText);
      })
      .catch(err => console.error(err));
  };

  if (reviewsModalOpenState) {
    if (userLoggedInState) {
      return (
        <form
          ref={reviewFormRef}
          name="reviewForm"
          onSubmit={e => e.preventDefault()}
        >
          <EventListener
            eventName="keydown"
            eventFunc={keyDownHandler}
          ></EventListener>
          <div
            className={classes.container}
            onClick={() => {
              dispatch(setReviewModalStateAction(false));
            }}
          >
            <div
              className={classes.wrapper}
              onClick={event => event.stopPropagation()}
            >
              <div className={classes.title}>
                <h3>{translate("review.modalTitle")}</h3>
                <i
                  onClick={() => dispatch(setReviewModalStateAction(false))}
                  className="material-icons"
                >
                  close
                </i>
              </div>
              <div className={classes.itemTitle}>
                <img
                  src={
                    itemDetailState.image3 +
                    "?tr=w-50,h-50,dpr-2,pr-true,f-auto"
                  }
                  alt={itemDetailState.shortdesc}
                ></img>
                <h6
                  dangerouslySetInnerHTML={{
                    __html: htmlDecode(productInitialTitleState)
                  }}
                ></h6>
              </div>

              <div className={classes.reviewTitle}>
                <h4>{translate("review.inputTitle")}</h4>
                <input
                  name="title"
                  ref={titleInputRef}
                  type="text"
                  className={classes.input}
                />
              </div>
              <div className={classes.reviewDetails}>
                <h4>{translate("review.inputDetails")}</h4>
                <textarea
                  name="details"
                  ref={detailsInputRef}
                  type="text"
                  className={classes.input}
                />
              </div>
              <div className={classes.rating}>
                <h4>
                  {translate("review.inputRating")}
                  {ratingState.ratingSet
                    ? ` (${`${ratingState.rating} out of 5)`}`
                    : ``}
                </h4>
                {renderRatingInputs()}
              </div>
              <div className={classes.fileUpload}>
                <p className={classes.fileUploadDescriptionText}>
                  {translate("review.uploadOptionalText")}
                </p>
                <div className={classes.fileUploadContainer}>
                  <div
                    onClick={() => {
                      if (!uploadedImgBase64) fileUploadRef.current.click();
                    }}
                    className={classes.fileUploadWrapper}
                  >
                    {renderUploadedFileImage()}
                  </div>
                </div>
                <input
                  style={{ display: "none" }}
                  onChange={handleImageUploadFileChange}
                  name="img_upload_file"
                  className={classes.fileUploadInput}
                  ref={fileUploadRef}
                  type="file"
                  accept="image/png, image/jpeg,image/jpg"
                />
                <input name="image" type="hidden" value="img_upload_file" />
                <input
                  type="hidden"
                  name="base64Image"
                  id="base64Image"
                  value=""
                />
              </div>
              <div className={classes.submit}>
                <small>{translate("review.submitTerms")}</small>
                <button onClick={handleSubmitReview} className={classes.button}>
                  {translate("review.inputPostButton")}
                </button>
              </div>
              <div className={classes.errorWrapper}>{renderErrors()}</div>
            </div>
          </div>
        </form>
      );
    } else {
      return (
        <div
          className={classes.container}
          onClick={() => {
            dispatch(setReviewModalStateAction(false));
          }}
        >
          <EventListener
            eventName="keydown"
            eventFunc={keyDownHandler}
          ></EventListener>
          <div
            className={classes.wrapper}
            onClick={event => event.stopPropagation()}
          >
            <div className={classes.title}>
              <h6>{translate("review.loginToWrite")}</h6>
              <i
                onClick={() => dispatch(setReviewModalStateAction(false))}
                className="material-icons"
              >
                close
              </i>
            </div>
            <div className={classes.submit}>
              <button
                onClick={handleLoginBtnClicked}
                className={classes.button}
              >
                {translate("review.login")}
              </button>
            </div>
          </div>
        </div>
      );
    }
  } else {
    return null;
  }
};
