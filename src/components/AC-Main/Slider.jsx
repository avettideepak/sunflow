import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useStaticQuery, graphql } from "gatsby";
import { Link, PREVIEW } from "gatsby";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

import { I18nContext } from "@/i18n/index";
// import sdfsdf from "../header/SearchHelper";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Slider = () => {
  const data = useStaticQuery(graphql`
    query {
      img2: file(relativePath: { eq: "slider/main.png" }) {
        childImageSharp {
          fluid(maxWidth: 1600) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  const { langCode } = React.useContext(I18nContext);

  const navCatsState = useSelector(
    state => state.menuReducer.navCats,
    shallowEqual
  );

  return (
    <>
      {/* <div id="homeBanner">
        <img src="https://ik.imagekit.io/bossrevolution/homepagelibrary/home-carousel-1920x500-1.jpg?tr=w-1400,h-500" />
      </div> */}

      <div>
        <div style={{
          background : "url('https://ik.imagekit.io/ofb/sunflow/Rectangle-6_1__T5GAn5hpF.png')",
          minHeight : "750px",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
            <div className="sliderBtns">
              <h1>We got<br/>
              you <strong>covered</strong></h1>
              <p>Thank you for the opportunity to quote on your new project you will love the results. </p>
              <span>The success of Sunflow has been attributed to using high quality products and attracting high quality installers and a team effort. It has always been about the customer first, giving them high quality products, services and the best warranty. Sunflow may not be a family business but it sure does feel that way.</span>

              <h2>How can we help you?</h2>
              <ul>
                <li>Solar</li>
                <li>Roofing</li>
                <li>Windows & Doors</li>
                <li>Insulation</li>
                
              </ul>      
            </div>            
          </div>
      </div>
      
    </>
  );
};

export default Slider;
