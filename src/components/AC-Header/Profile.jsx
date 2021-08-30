/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React, { useState, useContext } from "react";
import { Link } from "gatsby";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { VID, PROJECT_LINK, PREVIEW } from "../../project-config.js";
import ProfileIcon from "@assets/img/icons/profile.png";
import Modal from "@/shared/components/UIElements/Modal";
import Drawer from "@material-ui/core/Drawer";
import LazyLoad from "react-lazyload";
import Login from "@components/AC-LoginBox/Login";
import { I18nContext } from "@/i18n";

import { handleLogout } from "@/redux/actions/loginActions.js";

export default function Profile({ modalOpenedByIcon, setModalOpened }) {
  const dispatch = useDispatch();
  const { langCode, translate } = useContext(I18nContext);
  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );
  const [Loginstate, LoginsetState] = useState({
    top1: false,
    left1: false,
    bottom1: false,
    right1: false
  });

  const [AfterLoginstate, AfterLoginsetState] = useState({
    top1: false,
    left1: false,
    bottom1: false,
    right1: false
  });

  const toggleDrawerLogin = (side, open) => event => {
    if (event.key === "Tab" || event.key === "Shift") {
      return;
    }

    LoginsetState({ ...Loginstate, [side]: open });
  };

  const toggleDrawerAfterLogin = (side, open) => event => {
    if (event.key === "Tab" || event.key === "Shift") {
      return;
    }

    AfterLoginsetState({ ...AfterLoginstate, [side]: open });
  };

  const sideListLogin = side => (
    <div role="presentation">
      <Login />
    </div>
  );

  const securityTokenState = useSelector(
    state => state.loginReducer.securityToken,
    shallowEqual
  );
  const loginNameState = useSelector(
    state => state.loginReducer.loginName,
    shallowEqual
  );

  const languageState = useSelector(
    state => state.mainReducer.lang,
    shallowEqual
  );

  const logout = e => {
    e.preventDefault();
    dispatch(handleLogout(securityTokenState));
  };

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(modalOpenedByIcon);
  }, [modalOpenedByIcon]);

  React.useEffect(() => {
    setModalOpened(open);
  }, [open]);

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return loginNameState != "" ? (
    <LazyLoad height={18} offset={100} debounce={300} fadein={true}>
      <div
        className="icon-wrapper"
        onClick={
          langCode === "ar"
            ? toggleDrawerAfterLogin("left", true)
            : toggleDrawerAfterLogin("right", true)
        }
      >
        {/* <i className="material-icons-outlined">account_circle</i> */}
        <img
          src={ProfileIcon}
          alt="Profile"
          className="img-responsive iconInfo3"
        />
      </div>
      <div
        id="login-icon-btn"
        className="login-text-container"
        onClick={
          langCode === "ar"
            ? toggleDrawerAfterLogin("left", true)
            : toggleDrawerAfterLogin("right", true)
        }
      >
        <span
          className="icon-action-text icon-action-text-loggedin"
          onClick={
            langCode === "ar"
              ? toggleDrawerAfterLogin("left", true)
              : toggleDrawerAfterLogin("right", true)
          }
          title={loginNameState}
        >
          {loginNameState}
        </span>
      </div>

      <Drawer
        className="loginState"
        anchor={langCode === "ar" ? "left" : "right"}
        open={langCode === "ar" ? AfterLoginstate.left : AfterLoginstate.right}
        onClose={
          langCode === "ar"
            ? toggleDrawerAfterLogin("left", false)
            : toggleDrawerAfterLogin("right", false)
        }
      >
        <div className={langCode == "ar" ? "inner arabic" : "inner"}>
          <div style={{ backgroundColor: "#f1f1f1", color: "#000" }}>
            <h6 className="minicart-title CustomerLogin">
              {" "}
              My Account
              <i
                onClick={
                  langCode === "ar"
                    ? toggleDrawerAfterLogin("left", false)
                    : toggleDrawerAfterLogin("right", false)
                }
                className="material-icons"
              >
                close
              </i>
            </h6>
          </div>
          <ul className="user-profile-dropdown">
            <a
              href={`${PROJECT_LINK}/myaccount.html?mode=vieworder&vid=${VID}&iu=${languageState}`}
            >
              <li className="myaccount-box">
                <i className="material-icons">visibility</i>{" "}
                {translate("jsp.header_vieworders")}
              </li>
            </a>
            <a
              href={`${PROJECT_LINK}/myaccount.html?mode=changepassword&vid=${VID}&iu=${languageState}`}
            >
              <li className="myaccount-box">
                <i className="material-icons">vpn_key</i>{" "}
                {translate("jsp.header_changepassword")}
              </li>
            </a>
            <a
              href={`${PROJECT_LINK}/myaccount.html?mode=activities&vid=${VID}&iu=${languageState}`}
            >
              <li className="myaccount-box">
                <i className="material-icons">notifications</i>{" "}
                {translate("jsp.header_notifications")}
              </li>
            </a>
            <a
              href={`${PROJECT_LINK}/myaccount.html?mode=billingaddress&vid=${VID}&iu=${languageState}`}
            >
              <li className="myaccount-box">
                <i className="material-icons">store_mall_directory</i>{" "}
                {translate("jsp.header_billingaddress")}
              </li>
            </a>
            <a
              href={`${PROJECT_LINK}/myaccount.html?mode=shippingaddress&vid=${VID}&iu=${languageState}`}
            >
              <li className="myaccount-box">
                <i className="material-icons">local_shipping</i>{" "}
                {translate("jsp.header_shippingaddress")}
              </li>
            </a>
            <a href="javascript:void(0);">
              <li className="myaccount-box">
                <form name="logoutPopup" onSubmit={logout} autoComplete="on">
                  <button type="submit">
                    <i className="material-icons">power_settings_new</i>{" "}
                    {translate("jsp.header_logout")}
                  </button>
                </form>
              </li>
            </a>
          </ul>
        </div>
      </Drawer>

      {/* <Modal
        className="fim-dropdown sign-display display-signin"
        show={open}
        onCancel={handleClickAway}
        style={{ zIndex: "9999" }}
        dropDownList={true}
        noClass
        noHeader
        noFooter
      >
        
      </Modal> */}
    </LazyLoad>
  ) : (
    <>
      <div
        className="icon-wrapper"
        onClick={
          langCode === "ar"
            ? toggleDrawerLogin("left", true)
            : toggleDrawerLogin("right", true)
        }
        id="login-icon-btn"
      >

{
                      isMobileState ? 
                      
                      <i className="im im-icon-Male-2 mobileicons"></i>
                       : <img
                       src={ProfileIcon}
                       alt="Profile"
                       className="img-responsive iconInfo3"
                     />
                    }

        
        <div
        className="login-text-container"
      >
        <span className="icon-action-text">Login / Signup</span>
      </div>
      </div>
      <Drawer
        className="loginState"
        anchor={langCode === "ar" ? "left" : "right"}
        open={langCode === "ar" ? Loginstate.left : Loginstate.right}
        onClose={
          langCode === "ar"
            ? toggleDrawerLogin("left", false)
            : toggleDrawerLogin("right", false)
        }
      >
        <div style={{ backgroundColor: "#f1f1f1", color: "#000" }}>
          <h6 className="minicart-title CustomerLogin">
            {translate("CustomerLogin")}
            <i
              onClick={
                langCode === "ar"
                  ? toggleDrawerLogin("left", false)
                  : toggleDrawerLogin("right", false)
              }
              className="material-icons"
            >
              close
            </i>
          </h6>
        </div>
        {langCode === "ar" ? sideListLogin("left") : sideListLogin("right")}
      </Drawer>
    </>
  );
}
