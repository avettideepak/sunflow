import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import { LINK_DISTRIBUTION } from "../../../../../../project-config";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
    CustomLeftArrow,
    CustomRightArrow
  } from "./CustomArrows";
import classes from "./ReviewsCarousel.module.css";

const ReviewsCarousel = () => {

    const reviewsState = useSelector(
        state => state.productReducer.productInitial.reviews,
        shallowEqual
    );

    let reviews = reviewsState.filter(review => review.image !== "");

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5,
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        },
    };
    
    console.log("REVIEW STATE",reviews)


    return (
        <div className={classes.wrapper}>
            {reviews.length > 0  
            ? <span className={classes.carouselTitle}>CUSTOMER PHOTOS</span> 
            : null
        }
            
            <Carousel 
              responsive={responsive}
              swipeable={true}
              draggable={true}
              infinite={true}
              customLeftArrow={<CustomLeftArrow />}
              customRightArrow={<CustomRightArrow />}
              // customRightArrow={<span style={{position: "absolute",
              //   right: "10%"}}>RIGHT</span>}
            >
                {reviews.map(review => (
                    <div 
                        className={classes.imgWrapper}
                        style={{background: `url(${LINK_DISTRIBUTION}/store${review.image})`}}
                    >
                    </div>
                ))}

            </Carousel>
        </div>
    )
}

export default ReviewsCarousel;