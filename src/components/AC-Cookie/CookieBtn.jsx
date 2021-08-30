import React from "react";
import "./styles/CookieBtn.css";

function CookieBtn(props) {
  return (
    <button className="Button Success" onClick={props.click}>
      {props.children}
    </button>
  );
}

export default CookieBtn;
