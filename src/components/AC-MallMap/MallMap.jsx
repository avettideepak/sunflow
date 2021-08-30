/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import classes from "./MallMap.module.css"
import mallMap from "../../assets/img/mallMap.png"
import zoom from "../../assets/img/zoom.png"
import plus from "../../assets/img/plus.png"
import minus from "../../assets/img/minus.png"
import MapComponent from "./MapComponent/MapComponent";

function MallMap({storeSellerData}) {

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  const loginNameState = useSelector(
    (state) => state.loginReducer.loginName,
    shallowEqual
  )

  let activeStores = ["20210528109","20210219712","20210528110"]

  const storeSellerDataFiltered = storeSellerData.filter(
    sel => {
      return activeStores.indexOf(sel.supplier_vendorId) !== -1;
    }
  );

  console.log("storeSellerDataFiltered",storeSellerDataFiltered)

  return (
    <div className={classes.mallsearchWrapper}>
      
      {/* <div className={classes.mallsearch}>
          <div className={classes.mallsearchInput}>
              <i className="material-icons">search</i>
              <input type="text" placeholder="Search for Shop or Brand"/>
          </div>
          <div className={classes.mallsearchSort}>
              <select style={{display:"block"}}>
                <option>Ground Floor</option>
                <option>First Floor</option>
                <option>Second Floor</option>
                <option>Third Floor</option>
              </select>
          </div>
      </div> */}
      <div className={classes.mallMap}>
        {/* <img className={classes.mallMapImg} src={`https://ik.imagekit.io/ofb/mall/Screenshot__219__2x_OzXrm1tL1v.png`} />
        <img className={classes.zoom} src={zoom} />
        <img className={classes.plus} src={plus} />
        <img className={classes.minus} src={minus} /> */}
        <MapComponent storeSellerDataFiltered={storeSellerDataFiltered}/>
      </div> 

      <div className={classes.vis}>
          <div className={classes.visHead}>
            <h3>Visitor Info and Services</h3>
          </div>
          <p className={classes.visPara}>
            Explore our range of services to make your experience a pleasurable one
          </p>
          <div className={classes.visIcons}>
            <div className={classes.visIcon}>
                <img src="https://ik.imagekit.io/ofb/mall/wifi_1_Fq53gsHT4.svg"/>
                <p>Free Wifi</p>
            </div>
            <div className={classes.visIcon}>
                <img src="https://ik.imagekit.io/ofb/mall/Valet_parking_eBReohyST.svg"/>
                <p>Vallet Parking</p>
            </div>
            <div className={classes.visIcon}>
                <img src="https://ik.imagekit.io/ofb/mall/charging_PXqiPyCHo.svg"/>
                <p>Charging Stations</p>
            </div>
            <div className={classes.visIcon}>
                <img src="https://ik.imagekit.io/ofb/mall/Parking_sXHAUgPXQ.svg"/>
                <p>Free Parking</p>
            </div>
            <div className={classes.visIcon}>
                <img src="https://ik.imagekit.io/ofb/mall/Path_514_BHrnS2HoK.svg"/>
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

export default MallMap;
