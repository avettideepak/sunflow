/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import classes from "./VistorInfo.module.css";

function VistorInfo() {
  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );
  return (
    <div className={classes.mallsearchWrapper}>
      <div className={classes.vis}>
        <div className={classes.visHead}>
          <h3>Visitor Info and Services</h3>
        </div>
        <p className={classes.visPara}>
          Explore our range of services to make your experience a pleasurable one
        </p>
        <div className={classes.visIcons}>
          <div className={classes.visIcon}>
            <img src="https://ik.imagekit.io/ofb/mall/wifi_1_Fq53gsHT4.svg" />
            <p>Free Wifi</p>
          </div>
          <div className={classes.visIcon}>
            <img src="https://ik.imagekit.io/ofb/mall/Valet_parking_eBReohyST.svg" />
            <p>Vallet Parking</p>
          </div>
          <div className={classes.visIcon}>
            <img src="https://ik.imagekit.io/ofb/mall/charging_PXqiPyCHo.svg" />
            <p>Charging Stations</p>
          </div>
          <div className={classes.visIcon}>
            <img src="https://ik.imagekit.io/ofb/mall/Parking_sXHAUgPXQ.svg" />
            <p>Free Parking</p>
          </div>
          <div className={classes.visIcon}>
            <img src="https://ik.imagekit.io/ofb/mall/Path_514_BHrnS2HoK.svg" />
            <p>Gift Cards</p>
          </div>
        </div>
      </div>

      <div className={classes.visBtn}>
        <button>Know More</button>
      </div>

    </div>
  );
};

export default VistorInfo;
