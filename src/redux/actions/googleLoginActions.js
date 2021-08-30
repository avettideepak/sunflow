/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import {
  GOOGLE_LOGIN_REQUEST,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAILURE
} from "../types.js";

import { SEND_GOOGLE_TOKEN } from "../links.js";
import { VID } from "../../project-config.js";
import { fetchLogin } from "./loginActions.js";

export const googleLoginSuccess = () => ({
  type: GOOGLE_LOGIN_SUCCESS
});

export const googleLoginFailure = data => ({
  type: GOOGLE_LOGIN_FAILURE,
  payload: data
});

export const sendGoogleToken = token => {
  return dispatch => {
    var form = new FormData();
    form.append("vid", VID);
    form.append("gtoken", token);
    fetch(SEND_GOOGLE_TOKEN, {
      // fetch("https://bdadmin3qa.avetti.io/ssoautologin.ajx", {
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
      .then(json => {
        if (json.status) {
          dispatch(googleLoginSuccess());
          dispatch(fetchLogin());
        }
      })
      .catch(error => dispatch(googleLoginFailure(error)));
  };
};
