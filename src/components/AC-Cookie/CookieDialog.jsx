import React from "react";
import CookieBtn from "./CookieBtn";
import { Link } from "gatsby";

function CookieDialog(props) {
  return (
    <div className="cookie-dialog">
      <p>
        We use cookies for a number of reasons, such as keeping our site
        reliable and secure, remembering your settings, personalising content
        and ads, providing social media features so you can login and share
        content, and to analyse how our site is used. &nbsp;
        <Link to={"/cookies"}>
          <u style={{ color: "rgb(213, 213, 213)" }}>Manage Cookies</u>
        </Link>
      </p>
      <div className="cookie-button">
        <CookieBtn click={props.acceptCookieCloseDialog}>Accept</CookieBtn>
      </div>
    </div>
  );
}

export default CookieDialog;
