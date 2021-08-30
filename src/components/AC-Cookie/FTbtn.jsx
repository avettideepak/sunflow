import React, { useContext } from "react";
import "./styles/FTbtn.css";

function FTbtn(props) {
  let switch1;
  let switch2;

  if (props.onState) {
    switch1 = "switch1-on";
    switch2 = "switch2-off";
  } else {
    switch1 = "switch1-off";
    switch2 = "switch2-on";
  }

  return (
    <div className="outBox">
      <label onClick={props.toggle}>
        <span className={switch1}>On</span>
      </label>

      <label onClick={props.toggle}>
        <span className={switch2}>Off</span>
      </label>
    </div>
  );
}

export default FTbtn;
