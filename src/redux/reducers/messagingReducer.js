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

const initialState = {
  messageImageUrl: null,
  messageContentExpanded: false,
  targetId: "",
  isItemMessage: "",
  messageContentLoading: false,
  messageContentData: [],
  userMessagesLoading: false,
  userMessages: [],
  errorMessage: ""
};

const messagingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case MESSAGE_CONTENT_REQUEST:
      return {
        ...state,
        messageContentLoading: true,
        messageContentExpanded: true,
        targetId: payload.targetId,
        isItemMessage: payload.isItemMessage
      };
    case MESSAGE_CONTENT_SUCCESS:
      return {
        ...state,
        messageContentExpanded: true,
        messageContentLoading: false,
        messageContentData: payload
      };
    case MESSAGE_CONTENT_FAILURE:
      return {
        ...state,
        errorMessage: payload,
        messageContentData: []
      };
    case MESSAGE_CONTENT_CLOSE:
      return {
        ...state,
        messageContentExpanded: false
      };
    case USER_MESSAGES_REQUEST:
      return {
        ...state,
        userMessagesLoading: true
      };
    case USER_MESSAGES_SUCCESS:
      return {
        ...state,
        userMessagesLoading: false,
        userMessages: payload
      };
    case USER_MESSAGES_FAILURE:
      return {
        ...state,
        userMessagesLoading: false,
        userMessages: [],
        errorMessage: payload
      };

    case MESSAGE_IMAGE_URL_REQUEST:
      return {
        ...state,
        messageImageUrl: payload
      };
    default:
      return state;
  }
};

export default messagingReducer;
