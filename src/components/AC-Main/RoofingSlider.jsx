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
          background : "url('https://ik.imagekit.io/ofb/sunflow/roofing_GEF-jry0n.jpg')",
          minHeight : "750px",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
            <div className="sliderBtns">
              <h1><strong>Life time</strong> roof  <br/>
              at 1/2 the cost</h1>
              <span>We are committed to quality, in our products, in our process, in our staff and most importantly, in our work. SunFlow Roofing team wants to raise the bar for the roofing industry by holding themselves to the highest possible standard. You may be able to get a better price, but you will not be able to get better quality. </span>
              
              <button className="QuoteProject">Quote your roofing project <img src="https://ik.imagekit.io/ofb/sunflow/arrow-right__1__0R1vFalHhy.png" /></button>

              <h2>How can we help you?</h2>
              <ul>
                <li><Link to="/solar">Solar</Link></li>
                <li><Link to="/roofing">Roofing</Link></li>
                <li><Link to="/windows-doors">Windows & Doors</Link></li>
                <li><Link to="/insulation">Insulation</Link></li>                
              </ul>      
            </div>            
          </div>
      </div>
      
    </>
  );
};

export default Slider;
