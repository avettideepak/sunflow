/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React, { useContext, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Link } from "gatsby";
// core components
import Slider from "./Slider";
import SliderMobile from "./Slider_Mobile";
import StaticContent from "@components/AC-StaticPages/StaticContent.jsx";
import ServicesBox from "./Services/ServicesBox";
import ServicesBoxMobile from "./Services/ServicesBox_Mobile";
import VistorInfo from "./Services/VistorInfo";
import FeaturedPromotions from "./FeaturedPromotions/FeaturedPromotions";
import NavMenuHome from "./NavMenuHome";
import Collections from "./Collections/Collections";
import FeaturedSellers from "./FeaturedSellers.jsx";
import Events from "./Events";
import Explore from "./Explore";
import WhatsNew from "./WhatsNew/Whats";
import NavMenu from "../AC-Header/NavMenu";

import { I18nContext } from "@/i18n/index";


function Main(props) {
  const dispatch = useDispatch();
  const { langCode } = useContext(I18nContext);

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  const navCatsState = useSelector(
    state => state.menuReducer.navCats,
    shallowEqual
  );

  console.log("propssssssssssss", props)

  if (props.component === "staticContent") {
    return (
      <React.Fragment>
        <div id="bd">
          <StaticContent />
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        {/*TESTING*/}
        <div id="bd">
          <div className="item">
            <div style={{ padding: "unset" }}>
              <div id="slide">
                <div className="slideshow-container">
                  {isMobileState ? <SliderMobile /> : <Slider />}
                </div>
              </div>
            </div>


            {isMobileState ? <ServicesBoxMobile /> : <ServicesBox />}
             
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Main;
