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
          background : "url('https://ik.imagekit.io/ofb/sunflow/solar_1__bXXAKCNIff.jpg')",
          minHeight : "750px",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
            <div className="sliderBtns">
              <h1>The future <br/>
              can be  <strong>bright</strong></h1>
              <span>With rising hydro costs and further strain on our planet, it’s time to make a big change, one home at a time. Forward thinking homeowners want freedom from the grid. Our team is comprised of environmental agents, engineers, investment consultants, home renovation specialists and master electricians.</span>
              
              <button className="QuoteProject">Quote your solar project <img src="https://ik.imagekit.io/ofb/sunflow/arrow-right__1__0R1vFalHhy.png" /></button>

              <h2>How can we help you?</h2>
              <ul>
                <li className="menuactive"><Link to="/solar">Solar</Link></li>
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
