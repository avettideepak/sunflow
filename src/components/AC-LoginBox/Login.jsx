import React, { useState, useEffect, useContext } from "react";

import { VID, PREVIEW, PROJECT_LINK } from "../../project-config.js";
import {
  LOGIN_SIGNIN_LINK,
  LOGIN_CHECK_LINK,
  LOGOUT_LINK
} from "../../redux/links.js";
import Loading from "../AC-Loading/Loading.jsx";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import GoogleLogin from "./components/GoogleSSO";

import Async from "react-code-splitting";
import { updateLoginInfo } from "../../redux/actions/loginActions.js";
import { I18nContext } from "../../i18n/index";
import classes from "./Styles/Login.module.css";
import { navigate, useLocation } from "@reach/router";

const Footer = () => <Async load={import("../AC-Footer/Footer.jsx")} />;

export default function Login() {
  const { langCode, translate } = useContext(I18nContext);
  const location = useLocation();

  const [loginFailed, setLoginFailed] = useState(null);
  const [isLogined, setisLogined] = useState(false);
  const [loginInfo, setloginInfo] = useState();
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();

  const languageState = useSelector(
    state => state.mainReducer.lang,
    shallowEqual
  );

  const redirectHandler = () => {
    if (location.pathname.includes("login")) {
      navigate("/");
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function handleSubmit(event) {
    event.preventDefault();
    setisLoading(true);
    var form = new FormData();
    form.append("doSubmit", "Log In");
    form.append("capchacount", "0");
    form.append("loginInput", event.target.email.value);
    form.append("login", event.target.email.value);
    form.append("password", event.target.password.value);
    form.append("logSubmit", "Log In");
    fetch(LOGIN_SIGNIN_LINK.replace("$LANGUAGE", langCode), {
      method: "POST",
      body: form,
      headers: {
        Accept: "*/*",
        credentials: "same-origin"
      },
      mimeType: "multipart/form-data",
      data: form
    })
      .then(res => {
        console.info("deneme", res);
      })
      .then(res => res.json())
      .then(json => console.info("TEST FORM", json))

      // It parses the output
      .catch(function (error) {
        console.log("error---", error);
      })
      .then(() => {
        fetch(LOGIN_CHECK_LINK, {
          headers: {
            Accept: "*/*"
          }
        })
          .then(res => res.json())
          .then(json => {
            sessionStorage.setItem("UserData", JSON.stringify(json.__Result));
            dispatch(updateLoginInfo(json.__Result));
            setloginInfo(json.__Result);
            setisLoading(false);
            if (json.__Success === "true") {
              setLoginFailed(false);
            } else setLoginFailed(true);
          });
      });
  }

  const fetchJson = async url => {
    const response = await fetch(url, {
      headers: {
        Accept: "*/*"
      }
    });
    return response.json();
  };

  function logout(event) {
    event.preventDefault();
    setisLoading(true);
    var form = new FormData();
    form.append("securitytoken", loginInfo.securitytoken);

    fetch(LOGOUT_LINK, {
      method: "POST",
      body: form,
      headers: {
        Accept: "*/*",
        credentials: "same-origin"
      },
      mimeType: "multipart/form-data",
      data: form
    })
      .then(res => res.json())
      .then(json => console.log("TEST FORM", json))

      // It parses the output
      .catch(function (error) {
        console.log("error---", error);
      })
      .then(() => {
        fetchJson(LOGIN_CHECK_LINK).then(json => {
          sessionStorage.setItem("UserData", JSON.stringify(json.__Result));
          if (json.__Result.loggedin == true) {
            setloginInfo(json.__Result);
          } else {
            setloginInfo(json.__Result);
          }
        });
      })
      .then(() => {
        setisLoading(false);
      });
  }

  useEffect(() => {
    if (loginInfo != undefined) {
      if (loginInfo.loggedin == true) {
        setisLogined(true);
      } else {
        setisLogined(false);
      }
    }
  }, [loginInfo]);

  useEffect(() => {
    fetchJson(LOGIN_CHECK_LINK).then(json => {
      sessionStorage.setItem("UserData", JSON.stringify(json.__Result));

      if (json.__Result.loggedin == true) {
        setloginInfo(json.__Result);
      }
    });
  }, []);

  if (isLoading) {
    return (
      <div>
        <div>
          <div>
            <Loading />
          </div>
        </div>
      </div>
    );
  } else if (!isLogined) {
    return (
      <React.Fragment>
        <div id="bd">
          <div
            className="row"
            style={{
              marginBottom: "0px",
              height: "100%"
            }}
          >
            <div className={classes.loginWrapper} id="loginBox">
              <div>
                <form
                  name="loginPopup"
                  onSubmit={handleSubmit}
                  autoComplete="on"
                >
                  <div
                    className="error-text"
                    id="login_error"
                    style={{ display: "block" }}
                  />
                  <div>
                    <div
                      className={`col l12 m12 s12 ${classes.loginInputContainer}`}
                    >
                      <div>
                        <input
                          id="email"
                          className="ml-input"
                          name="loginInput"
                          type="email"
                          required=""
                          placeholder={translate("EnteryourEmail")}
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className={`col l12 m12 s12 ${classes.loginInputContainer}`}
                  >
                    <div>
                      <input
                        id="password"
                        className="ml-input"
                        name="password"
                        type="password"
                        required=""
                        placeholder={translate("EnterYourPassword")}
                        autoComplete="on"
                      />
                    </div>
                  </div>

                  <div className="clearfix " />

                  <div
                    className="loginButtons"
                    style={{
                      paddingRight: "0px"
                    }}
                  >
                    {/*<span>
                  <a
                    href="https://c10in1.avetti.ca/preview/forgot_password.html?vid=20190607423&amp;mt=3"
                    className="view-cart title-link text-uppercase"
                  >
                    Forgot Password?{" "}
                    <i className="material-icons arrowposs">navigate_next</i>
                  </a>
                </span>
                <Button color="primary">
                  Login 
                </Button>*/}

                    <button
                      type="submit"
                      className="btn waves-effect waves-light btn-light-dark"
                      style={{
                        background: "rgb(102,102,102)",
                        width: "100%",
                        margin: "10px 0px 20px 0px"
                      }}
                    >
                      {translate("Login")}
                    </button>
                    {loginFailed && (
                      <div style={{ color: "red", marginBottom: "10px" }}>
                        You have entered an invalid username or password.
                      </div>
                    )}
                    <div className={classes.googleSSOBtn}>
                      <GoogleLogin
                        handle={() => {}}
                        redirect={redirectHandler}
                      />
                    </div>
                    <div className="data-login">
                      <a
                        className={`services-right ${classes.forgotPasswordLink}`}
                        href={`${PREVIEW}/forgot_password.html?vid=${VID}&amp;mt=1&ml=${languageState}`}
                      >
                        {translate("ForgotPassword")}
                      </a>
                      <div className={`all_services ${classes.allServices}`}>
                        {" "}
                        {translate("Signupmessage")}
                      </div>

                      <div
                        className="login_registerbtn"
                        style={{ margin: "10px 0px" }}
                      >
                        <a
                          href={`${PREVIEW}/register.html?vid=${VID}&mt=1&ml=${languageState}`}
                          className="waves-effect waves-light btn cr-button"
                          style={{
                            background: "#000000",
                            width: "100%",
                            color: "white",
                            textTransform: "uppercase",
                            fontSize: "13px"
                          }}
                        >
                          {translate("CreateAccount")}
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      </React.Fragment>
    );
  } else {
    console.log(loginInfo);
    navigate(-1);
    return (
      <React.Fragment>
        <div id="bd">
          <div className="header-cart-2 z-depth-1">
            <h6>
              Welcome <b>{loginInfo.loginname}</b>
            </h6>
            <div className="login-box-inline actions text-center">
              <form name="logoutPopup" onSubmit={logout} autoComplete="on">
                <button
                  type="submit"
                  className="btn waves-effect waves-light btn-light-dark"
                >
                  {translate("jsp.header_logout")}
                </button>
              </form>
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      </React.Fragment>
    );
  }
}
