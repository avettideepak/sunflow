

/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import classes from "./VistorInfo.module.css";

function WhatsNew() {
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

        <div className="browseCat-container" style={{ marginTop: "30px" }}>
          <h1 className="browseCat">What's Happening!</h1>


          <div className="whatsnew-main">
            <div className="whatsnew-Shop">
              <div style={{
                background: url('https://ik.imagekit.io/ofb/mall/Group_353_-_Copy_FLGVAVjFw.png')
              }}><button className="whatsnew-shop-button">Shop</button></div>
              <div>
                <div className="whatsnew-shop-info">
                  <img src="https://ik.imagekit.io/ofb/mall/Group_18-2_-_Copy_qrXLpMMwN.svg" />
                  <span>10th June</span>
                </div>
                <div className="whatsnew-shop-desc">
                  <h1>Lorem Ipsum Dolor</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <button>Know More</button>
                </div>
              </div>
            </div>
            <div className="whatsnew-Shop">
              <div style={{
                background: url('https://ik.imagekit.io/ofb/mall/Group_353_-_Copy_FLGVAVjFw.png')
              }}><button className="whatsnew-shop-button">Shop</button></div>
              <div>
                <div className="whatsnew-shop-info">
                  <img src="https://ik.imagekit.io/ofb/mall/Group_18-2_-_Copy_qrXLpMMwN.svg" />
                  <span>10th June</span>
                </div>
                <div className="whatsnew-shop-desc">
                  <h1>Lorem Ipsum Dolor</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <button>Know More</button>
                </div>
              </div>
            </div>
            <div className="whatsnew-Shop">
              <div style={{
                background: url('https://ik.imagekit.io/ofb/mall/Group_353_-_Copy_FLGVAVjFw.png')
              }}><button className="whatsnew-shop-button">Shop</button></div>
              <div>
                <div className="whatsnew-shop-info">
                  <img src="https://ik.imagekit.io/ofb/mall/Group_18-2_-_Copy_qrXLpMMwN.svg" />
                  <span>10th June</span>
                </div>
                <div className="whatsnew-shop-desc">
                  <h1>Lorem Ipsum Dolor</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <button>Know More</button>
                </div>
              </div>
            </div>
          </div>



        </div>



      </div>



    </div>
  );
};

export default WhatsNew;


