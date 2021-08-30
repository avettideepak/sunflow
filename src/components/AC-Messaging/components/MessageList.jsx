import React from "react";
import MessageItem from "./MessageItem.jsx";
import "../Styles/MessageList.css";
import { useSelector, shallowEqual } from "react-redux";

export default function MessageList() {
  const userMessagesState = useSelector(
    state => state.messagingReducer.userMessages,
    shallowEqual
  );

  return (
    <React.Fragment>
      {userMessagesState.map(message => {
        return <MessageItem key={message.msgId} message={message} />;
      })}
    </React.Fragment>
  );
}
