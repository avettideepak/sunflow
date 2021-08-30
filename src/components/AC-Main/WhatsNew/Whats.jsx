

/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import classes from "./WhatsNew.module.css";
import { Link } from "gatsby";

function WhatsNew() {
  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );
  return (
    <div className={classes.mallsearchWrapper}>
      <div className={classes.vis}>
        <div className={classes.visHead}>
          <h3>What's New!</h3>
        </div>

         

          <div className={classes.whatsnewMain}>
            <div className={classes.whatsnewShop}>
              <div className={classes.whatsnewShopImage}>
                <img src="https://ik.imagekit.io/ofb/mall/Group_353_-_Copy_FLGVAVjFw.png" />
                <button className={classes.whatsnewShopButton}>
                    <Link style={{color:"#fff"}} to="/shopping/mens">Shop</Link>
                </button>
              </div>
              <div>
                <div className={classes.whatsnewShopInfo}>
                  <img src="https://ik.imagekit.io/ofb/mall/Group_18-2_-_Copy_qrXLpMMwN.svg" />
                  <span>01 Jul - 04 Sep 2021</span>
                </div>
                <div className={classes.whatsnewShopDesc}>
                  <h1>Matalan</h1>
                  <p>Shop our summer sale and enjoy up to 50% off on selected items.</p>
                  <button>
                  <Link to="/shopping/mens">Know More</Link>
                  </button>
                </div>
              </div>
            </div>
            <div className={classes.whatsnewShop}>
              <div className={classes.whatsnewShopImage}>
                <img src="https://ik.imagekit.io/ofb/mall/Group_354_2x_-_Copy_4TTGwwPzm.png" />
                <button className={classes.whatsnewShopButton}>
                  <Link style={{color:"#fff"}} to="/entertainment">Entertainment</Link>
                </button>
              </div>
              <div>
                <div className={classes.whatsnewShopInfo}>
                  <img src="https://ik.imagekit.io/ofb/mall/Group_18-2_-_Copy_qrXLpMMwN.svg" />
                  <span>01 Jul - 04 Sep 2021</span>
                </div>
                <div className={classes.whatsnewShopDesc}>
                  <h1>Buy one, get one free</h1>
                  <p>Buy a card online and get the other one for free to enjoy a variety of rides and major attractions at Fabyland.</p>
                  <button>
                    <Link to="/entertainment">Know More</Link>
                  </button>
                </div>
              </div>
            </div>
            <div className={classes.whatsnewShop}>
              <div className={classes.whatsnewShopImage}>
                <img src="https://ik.imagekit.io/ofb/mall/Group_355_-_Copy_zx1q5zoGv.png" />
                <button className={classes.whatsnewShopButton}><Link style={{color:"#fff"}} to="/entertainment">Entertainment</Link></button>
              </div>
              <div>
                <div className={classes.whatsnewShopInfo}>
                  <img src="https://ik.imagekit.io/ofb/mall/Group_18-2_-_Copy_qrXLpMMwN.svg" />
                  <span>01 Jul - 04 Sep 2021</span>
                </div>
                <div className={classes.whatsnewShopDesc}>
                  <h1>Novo Cinemas</h1>
                  <p>Get your ticket for half the price when booking online through the Shopping Mall site!</p>
                  <button><Link to="/entertainment">Know More</Link></button>
                </div>
              </div>
            </div>
          </div>



       


          </div>
    </div>
  );
};

export default WhatsNew;


