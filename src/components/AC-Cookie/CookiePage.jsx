import React, { useEffect } from "react";
import "./styles/CookiePage.css";
import { Link } from "gatsby";
import { useState } from "react";
import FTbtn from "./FTbtn";
import icon from "../../assets/img/link-icon.png";

export default function CookiePageComponent(props) {
  const [onState, setOnState] = useState(true);

  useState(() => {
    if (typeof window !== "undefined") {
      let cookieRule = JSON.parse(localStorage.getItem("cookieAcceptance"));
      if (cookieRule && cookieRule.isAccept) {
        setOnState(true);
      } else if (cookieRule && cookieRule.isAccept === false) {
        setOnState(false);
      }
    }
  }, []);

  const toggleHandler = () => {
    setOnState(!onState);
  };

  const saveLocalStorageHandler = () => {
    if (typeof window !== "undefined") {
      if (onState) {
        let consent = {
          date: new Date(),
          consent: "Manage-Cookie: ON",
          isAccept: true
        };
        localStorage.setItem("cookieAcceptance", JSON.stringify(consent));
      } else {
        let consent = {
          date: new Date(),
          consent: "Manage-Cookie: OFF",
          isAccept: false
        };
        localStorage.setItem("cookieAcceptance", JSON.stringify(consent));
      }
    }
  };

  return (
    <div className="cookiePage">
      <h1>Manage Cookies</h1>
      <div className="first-para">
        <p>
          You can use this page to manage which cookies are set on your browser
          or mobile device, but if you disable cookies, some parts this website
          may not function as some cookies are essential.
        </p>
        <br />
        <p style={{ fontWeight: "bold" }}>
          To disable cookies used by this website for personalised advertising
          you will need to follow all steps below.
        </p>
      </div>

      <hr />

      <h2>Step 1: Advertising based on your use of our site</h2>

      <div style={{ display: "block" }}>
        <fieldset className="step1-field">
          <div className="step1-div1">
            <span>
              <span className="step1-span1">
                We help you see advertisements with products and services that
                are relevant to you, based on your characteristics, your online
                activity and your interests
              </span>
              <div className="step1-div1-div1">
                <strong>
                  If you turn this off, you will still see the SAME number of
                  advertisements but they may be less relevant
                </strong>
                &nbsp; You may continue to see ads that are targeted to you
                based on other information.
              </div>
            </span>

            <span style={{ width: "60%" }}>
              <FTbtn onState={onState} toggle={toggleHandler} />
            </span>
          </div>
        </fieldset>
      </div>

      <p>
        By clicking the button below you are accepting cookies in accordance
        with our Cookie Policy
      </p>

      <div className="step1-acceptBtn">
        <Link to="/">
          <button className="fixedBtn" onClick={saveLocalStorageHandler}>
            Accept & save settings
          </button>
        </Link>
      </div>

      <hr />

      <h2>Step 2: Ads based on your online activity</h2>
      <div className="step2-first-para">
        <p>
          Third party cookies are used on our website to serve you with ads to
          remind you of the products you have seen on our site. You may see
          these advertisements on other sites that you visit. You can opt out of
          our use of these cookies using the options below.
        </p>
      </div>
      <p>
        <strong>
          Follow the links below for each site's policies and instructions to
          opt out:
        </strong>
      </p>
      <p>You will need to make these changes on every browser you use.</p>

      <table className="step2-table">
        <tbody>
          <tr>
            <th
              className="table__cell-heading"
              scope="row"
              style={{ width: "180px" }}
            >
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
              >
                <u style={{ color: "#0D7680" }}>Google Doubleclick</u>
                <img
                  src={icon}
                  style={{ marginLeft: "1px", width: "10px" }}
                ></img>
              </a>

              <a
                href="https://support.google.com/ads/answer/2662922?hl=en-GB"
                target="_blank"
              >
                <u style={{ color: "#0D7680" }}>Manage Cookies</u>
                <img
                  src={icon}
                  style={{ marginLeft: "1px", width: "10px" }}
                ></img>
              </a>
            </th>
            <td className="table__cell-content">
              Google is our main advertising platform and is also used by some
              advertisers to buy adverts that appear on our Sites.
            </td>
          </tr>
          <tr>
            <th className="table__cell-heading" scope="row">
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
              >
                <u style={{ color: "#0D7680" }}>Google</u>
                <img
                  src={icon}
                  style={{ marginLeft: "1px", width: "10px" }}
                ></img>
              </a>
              <br />
              <a
                href="https://support.google.com/ads/answer/2662922?hl=en-GB"
                target="_blank"
              >
                <u style={{ color: "#0D7680" }}>Manage Cookies</u>
                <img
                  src={icon}
                  style={{ marginLeft: "1px", width: "10px" }}
                ></img>
              </a>
            </th>
            <td className="table__cell-content">
              Advertising systems that some advertisers use to buy adverts on
              our Sites.
            </td>
          </tr>

          <tr>
            <th className="table__cell-heading" scope="row"></th>
            <td className="table__cell-content"></td>
          </tr>
        </tbody>
      </table>

      <br />

      <hr />

      <h2>
        Step 3: Third party cookies that help us deliver other functionality
      </h2>

      <p>
        We also use third party cookies to optimize marketing performance and to
        measure the effectiveness of our advertising on other websites. This
        might include:
      </p>
      <br />
      <ul className="step3-third-party-list">
        <li>
          <a
            href="https://policies.google.com/technologies/cookies?hl=en"
            target="_blank"
          >
            <u style={{ color: "#0D7680" }}>Google</u>
            <img src={icon} style={{ marginLeft: "1px", width: "10px" }}></img>
          </a>{" "}
          -{" "}
          <a
            href="https://adssettings.google.com/authenticated"
            target="_blank"
          >
            <u style={{ color: "#0D7680" }}>
              Manage Cookies with Google Ad Settings
            </u>
            <img src={icon} style={{ marginLeft: "1px", width: "10px" }}></img>
          </a>
        </li>
        <li>
          <a
            href="https://help.twitter.com/en/rules-and-policies/twitter-cookies"
            target="_blank"
          >
            <u style={{ color: "#0D7680" }}>Twitter</u>
            <img src={icon} style={{ marginLeft: "1px", width: "10px" }}></img>
          </a>{" "}
          -{" "}
          <a href="https://optout.aboutads.info/?c=2&lang=EN" target="_blank">
            <u style={{ color: "#0D7680" }}>
              Manage Cookies with Your Ad Choices
            </u>
            <img src={icon} style={{ marginLeft: "1px", width: "10px" }}></img>
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/policy/cookies/" target="_blank">
            <u style={{ color: "#0D7680" }}>Facebook</u>
            <img src={icon} style={{ marginLeft: "1px", width: "10px" }}></img>
          </a>{" "}
          -{" "}
          <a
            href="https://adssettings.google.com/authenticated"
            target="_blank"
          >
            <u style={{ color: "#0D7680" }}>
              Manage Cookies with Your Ad Choices
            </u>
            <img src={icon} style={{ marginLeft: "1px", width: "10px" }}></img>
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/legal/cookie-policy"
            target="_blank"
          >
            <u style={{ color: "#0D7680" }}>LinkedIn</u>
            <img src={icon} style={{ marginLeft: "1px", width: "10px" }}></img>
          </a>{" "}
          -{" "}
          <a
            href="https://www.linkedin.com/legal/l/cookie-table"
            target="_blank"
          >
            <u style={{ color: "#0D7680" }}>
              Manage Cookies with LinkedIn Cookie Table
            </u>
            <img src={icon} style={{ marginLeft: "1px", width: "10px" }}></img>
          </a>
        </li>
      </ul>
    </div>
  );
}
