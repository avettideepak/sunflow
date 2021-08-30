/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React from "react";
import ReactDOM from "react-dom";
import "./styles/Backdrop.css";

const Backdrop = props => {
  return ReactDOM.createPortal(
    <div
      className={props.noclass ? "" : "backdrop"}
      onClick={props.onClick}
      style={
        props.dropDownList == true
          ? { background: "rgba(0, 0, 0, 0)" }
          : { background: "rgba(0, 0, 0, 0.75)" }
      }
    ></div>,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrop;
