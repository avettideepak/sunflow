/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import WindowsDoorsSlider from "../AC-Main/WindowsDoorsSlider";
import ServicesBox from "../AC-Main/Services/ServicesBox";



function WindowsDoorsSliders() {

 

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  

  return (
    <>
      <WindowsDoorsSlider />
      <ServicesBox />
    </>
  );
};

export default WindowsDoorsSliders;
