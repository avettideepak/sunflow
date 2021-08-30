import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import { Link } from "gatsby";

import {
  PROJECT_LINK,
  PREVIEW,
  LINK_DISTRIBUTION
} from "@/project-config";

export default function Events() {

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );


  return (
    <>
      <div className="browseCat-container">
        <h1 className="browseCat">What's Happening!</h1>

        <p>Get involved with events, competitions and activities at Shopping Mall!</p>
        <button><Link to="/events">View Events</Link></button>
        <div className="lineblack"></div>
        <div><Link to="/shopping/mens"><img src="https://ik.imagekit.io/ofb/mall/Deals_Banner_1_bFB7KDMu8.png" style={{ width: "100%" }} /></Link></div>
        <div className="lineblack"></div>
      </div>


    </>
  );
}
