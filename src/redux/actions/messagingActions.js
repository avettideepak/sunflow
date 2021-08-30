/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import {
  MESSAGE_CONTENT_REQUEST,
  MESSAGE_CONTENT_CLOSE,
  MESSAGE_CONTENT_SUCCESS,
  MESSAGE_CONTENT_FAILURE,
  USER_MESSAGES_REQUEST,
  USER_MESSAGES_SUCCESS,
  USER_MESSAGES_FAILURE,
  MESSAGE_IMAGE_URL_REQUEST
} from "../types.js";

export const messageContentRequestAction = (targetId, isItemMessage) => {
  console.info(targetId);
  return {
    type: MESSAGE_CONTENT_REQUEST,
    payload: { targetId, isItemMessage }
  };
};

export const messageContentCloseAction = payload => ({
  type: MESSAGE_CONTENT_CLOSE,
  payload: payload
});

const messageContentSuccessAction = payload => ({
  type: MESSAGE_CONTENT_SUCCESS,
  payload: payload
});

const messageContentFailureAction = err => ({
  type: MESSAGE_CONTENT_FAILURE,
  payload: err
});

const userMessagesRequestAction = () => ({
  type: USER_MESSAGES_REQUEST
});

const userMessagesSuccessAction = payload => ({
  type: USER_MESSAGES_SUCCESS,
  payload: payload
});

const userMessagesFailureAction = err => ({
  type: USER_MESSAGES_FAILURE,
  payload: err
});

export const messageImageUrlAction = url => ({
  type: MESSAGE_IMAGE_URL_REQUEST,
  payload: url
});

export const fetchMessageContentFromId = (targetId, dataSource) => {
  return dispatch => {
    let message = dataSource.__Result.filter(data => data.target === targetId);
    if (message) dispatch(messageContentSuccessAction(message));
    else dispatch(messageContentFailureAction("Can't find the message."));
  };
};

export const fetchUserMessages = (userId, dataSource) => {
  return dispatch => {
    dispatch(userMessagesRequestAction());
    let userMessages = dataSource;
    if (userMessages) dispatch(userMessagesSuccessAction(userMessages));
    else dispatch(userMessagesFailureAction("Can't find user messages"));
  };
};
