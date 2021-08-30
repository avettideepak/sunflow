import React from "react";
import Message from "./Message.jsx";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { messageImageUrlAction } from "../../../redux/actions/messagingActions.js";

export default function Messages() {
  const dispatch = useDispatch();

  const messageContentDataState = useSelector(
    state => state.messagingReducer.messageContentData,
    shallowEqual
  );

  const handleImageClicked = url => {
    dispatch(messageImageUrlAction(url));
  };

  if (messageContentDataState.length > 0) {
    return messageContentDataState.map(message => {
      return (
        <Message
          key={message.id}
          message={message}
          handleImageClicked={handleImageClicked}
        />
      );
    });
  } else {
    return (
      <div>
        <p>No messages to show</p>
      </div>
    );
  }
}
