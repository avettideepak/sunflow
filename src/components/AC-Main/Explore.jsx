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
      <div className="browseCat-container" style={{ marginTop: "90px" }}>
        <div style={{
          background : "url('https://ik.imagekit.io/ofb/mall/Mask_Group_4_2x_-_Copy_ekqhHGMYDl.png')",
          height : "380px",
          backgroundPosition: "top",
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div className="exploremain">
          <div className="exploremain-left">
            <img src="https://ik.imagekit.io/ofb/mall/maplocation_-_uUQiD8C"/>
          </div>
          <div className="exploremain-right">
            <h1>Explore the Mall</h1>
            <p>Browse through the stores, dining options, services and more by category. Explore all four levels of the mall with an amazing interactive 3D mall map.</p>
            <button><Link to="/interactive-mall-map">View Map</Link></button>
          </div>
          </div>
        </div>
        
      </div>


    </>
  );
}
