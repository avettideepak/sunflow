import React from "react";
import { useDispatch } from "react-redux";

import { sendGoogleToken } from "../../../redux/actions/googleLoginActions";
import GoogleLogin from "react-google-login";
import classes from "../Styles/Login.module.css";

const GoogleSSO = ({ handle, redirect }) => {
  const dispatch = useDispatch();
  const responseGoogle = response => {
    console.log(response);
    // "if success"
    if (Object.keys(response).some(res => res === "tokenId")) {
      console.log("Works");
      dispatch(sendGoogleToken(response.tokenId));
      // 1 - Dispatch an action to do the POST to ssoautologin.ajx
      // 2 - Parameters are vid and id_token
      // let id_token = googleUser.getAuthResponse().id_token
      // 3 - on success, update UI and states to have user signed in
      // We get status data back
      handle();
      redirect();
    } else {
      console.log("Issues with google sign on");
    }
  };

  return (
    <GoogleLogin
      className={classes.googleSSO}
      clientId="869278932328-iaugcactjcnunb3u7hnlch0pcm8ob0aa.apps.googleusercontent.com"
      buttonText="Sign in with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleSSO;
