import React from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Link, useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

import "./FeaturedPromotions.css";

// import Image1 from "@assets/img/slider/1.jpg";
// import Image2 from "@assets/img/slider/2.jpg";
// import Image3 from "@assets/img/slider/3.jpg";
// import Image4 from "@assets/img/slider/4.jpg";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const FeaturedPromotions = () => {
  const data = useStaticQuery(graphql`
    query {
      Image1: file(relativePath: { eq: "slider/1.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 550) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      Image2: file(relativePath: { eq: "slider/2.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 550) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      Image3: file(relativePath: { eq: "slider/3.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 550) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      Image4: file(relativePath: { eq: "slider/4.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 550) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  const navCatsState = useSelector(
    state => state.menuReducer.navCats,
    shallowEqual
  );

  return (
    <div
      style={{
        marginTop: "4%"
      }}
    >
      <div className="newsletter-wrapper">
        <div className="newsletter-content">
          <h3>
            Take Your Business <br />
            Online and Start <br />
            Expanding. It's free!
          </h3>
          <span className="cafe-button">
            <Link to={"/seller-registration"}>Seller Sign Up</Link>
          </span>
        </div>

        <div className="mailchimp-wrapper">
          <Carousel
            additionalTransfrom={0}
            arrows={false}
            autoPlay
            autoPlaySpeed={4000}
            centerMode={false}
            className=""
            containerClass="container"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1024
                },
                items: 1
              },
              mobile: {
                breakpoint: {
                  max: 464,
                  min: 0
                },
                items: 1
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 464
                },
                items: 1
              }
            }}
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            <Img fluid={data.Image1.childImageSharp.fluid} />
            <Img fluid={data.Image2.childImageSharp.fluid} />
            <Img fluid={data.Image3.childImageSharp.fluid} />
            <Img fluid={data.Image4.childImageSharp.fluid} />
          </Carousel>
        </div>
      </div>

      {/* <Link
            to={
              lang !== "en"
                ? PREVIEW + `/${lang}` + "/shop/laptops"
                : PREVIEW + "/shop/laptops"
            }
            onClick={() =>
              handleCategoryChange(
                "432307",
                "Laptops",
                ["Laptops", "432307"],
                "Laptops"
              )
            }
          ></Link>
            
            
              <h3 className="cafe-banner-title">
              >
              
                
                
              
          </Link> */}
    </div>
  );
};

export default FeaturedPromotions;
