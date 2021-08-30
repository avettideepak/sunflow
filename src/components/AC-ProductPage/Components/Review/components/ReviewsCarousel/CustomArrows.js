import * as React from "react";
import classes from "./ReviewsCarousel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";


const CustomLeftArrow = ({ onClick }) => (
  <span onClick={() => onClick()} className={classes.leftArrow} >
    <FontAwesomeIcon
        style={{ fontSize: "20px" }}
        icon={faChevronLeft}
    />
  </span>
);

const CustomRightArrow = ({ onClick }) => (
  <span onClick={() => onClick()} className={classes.rightArrow} >
    <FontAwesomeIcon
        style={{ fontSize: "20px" }}
        icon={faChevronRight}
    />
  </span>
);


const CustomButtonGroup = ({ next, previous, goToSlide, carouselState }) => {
  const { totalItems, currentSlide } = carouselState;
  return (
    <div className="custom-button-group">
      <div>Current slide is {currentSlide}</div>
      <button onClick={() => previous()}>Previous slide</button>
      <button onClick={() => next()}>Next slide</button>
      <button
        onClick={() => goToSlide(Math.floor(Math.random() * totalItems + 1))}
      >
        Go to a random slide
      </button>
    </div>
  );
};
const CustomButtonGroupAsArrows = ({ next, previous }) => {
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h4>These buttons can be positioned anywhere you want on the screen</h4>
      <button onClick={previous}>Prev</button>
      <button onClick={next}>Next</button>
    </div>
  );
};

export {
  CustomLeftArrow,
  CustomRightArrow,
  CustomButtonGroup,
  CustomButtonGroupAsArrows,
};