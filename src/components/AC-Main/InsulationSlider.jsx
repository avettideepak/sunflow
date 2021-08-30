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
          background : "url('https://ik.imagekit.io/ofb/sunflow/insulation__Txf5Q5dW.jpg')",
          minHeight : "750px",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
            <div className="sliderBtns">
              <h1>Top up your  <br/>
              <strong> insulation</strong></h1>
              <span>We respect our clients and take on the responsibility of informing and educating everyone on our products. Ice damming is a real safety issue and being able to top up insulation to prevent this from happening gives us the sense of a job well done. </span>
              
              <button className="QuoteProject">Quote your insulation project <img src="https://ik.imagekit.io/ofb/sunflow/arrow-right__1__0R1vFalHhy.png" /></button>

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
