import React, { useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { PROJECT_LINK } from "../../../project-config";

import classes from "../Styles/SelectedStoreDetails.module.css";

const SelectedStoreDetails = ({
  collapsed,
  setCollapsed,
  setDirectionsRequested
}) => {
  const dispatch = useDispatch();

  const selectedStoreToViewOnTheMapState = useSelector(
    state => state.storeReducer.selectedStoreToViewOnTheMap,
    shallowEqual
  );
  const imageKit = "https://ik.imagekit.io/bossrevolution/b2cstartermarketplace";

  if (selectedStoreToViewOnTheMapState) {
    const { title, image, properties } = selectedStoreToViewOnTheMapState;
    const {
      LineAddress1,
      City,
      ProvinceAbv,
      ZIPCode,
      Website,
      Phone
    } = properties;
    return (
      <div className={classes.container}>
        <div
          onClick={() => setCollapsed(!collapsed)}
          className={`${classes.collapseBtn}`}
          title={collapsed ? "expand" : "collapse"}
        >
          <i className="material-icons">
            {collapsed ? "chevron_right" : "chevron_left"}
          </i>
        </div>

        <div className={classes.wrapper}>
          <div className={classes.storeImage}>
            <img src={`${imageKit}/${title.replace(" ", "-").toLowerCase()}.jpg`} alt={title} />
          </div>
          <div className={classes.title}>{title}</div>
          {/* <div className={classes.directionsBtn}>
            <i className="material-icons-outlined">directions_car</i>
            <span
              className={classes.direction}
              onClick={() => {
                setDirectionsRequested(true);
                setCollapsed(true);
              }}
            >
              Directions
            </span>
          </div> */}
          <div className={classes.storeDetailsWrapper}>
            <div className={classes.addressWrapper}>
              <i className="material-icons-outlined">location_on</i>
              <div className={classes.address}>
                {LineAddress1}, {City}, {ProvinceAbv} {ZIPCode}
              </div>
            </div>
            {Website && (
              <div className={classes.websiteWrapper}>
                <i className="material-icons-outlined">public</i>
                <a href={Website} target="_blank" className={classes.website}>
                  {Website.replace("https://www.", "").replace("com/", "com")}
                </a>
              </div>
            )}
            <div className={classes.phoneWrapper}>
              <i className="material-icons">phone</i>
              <div className={classes.phone}>{Phone}</div>
            </div>
            <div className={classes.phoneWrapper}>
              <i className="material-icons-outlined">directions_car</i>
              <div className={classes.phone} onClick={() => {
                setDirectionsRequested(true);
                setCollapsed(true);
              }}>Directions</div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default SelectedStoreDetails;
