/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import SolarSlider from "../AC-Main/SolarSlider";
import SliderMobileSolar from "../AC-Main/Slider_Mobile_Solar";
import ServicesBoxMobileSolar from "../AC-Main/Services/ServicesBox_Mobile_Solar";
import ServicesBox from "../AC-Main/Services/ServicesBox";





function Solar() {

 

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  

  return (
    <>
      
      {isMobileState ? <SliderMobileSolar /> : <SolarSlider /> }
      {isMobileState ? <ServicesBoxMobileSolar /> : <ServicesBox /> } 
    </>
  );
};

export default Solar;
