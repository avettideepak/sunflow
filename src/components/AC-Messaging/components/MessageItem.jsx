import React from "react";
import { useDispatch } from "react-redux";
import { messageContentRequestAction } from "../../../redux/actions/messagingActions.js";

export default function MessageItem({ message }) {
  const dispatch = useDispatch();
  message.isRead = message.isRead == "true";
  const { msgId, target, isRead, supplier, isItem, msgSubject } = message;

  const renderMailIcon = () => {
    return (
      <i className={`material-icons${isRead ? `-outlined` : ``}`}>
        {isRead ? `drafts` : `email`}
      </i>
    );
  };

  const handleMessageItemClicked = targetId => {
    let isItemMessage = isItem === "true";
    console.info("clicked", targetId, isItemMessage);
    dispatch(
      messageContentRequestAction({ [Date.now()]: targetId }, isItemMessage)
    );
  };

  return (
    <React.Fragment>
      <tr
        key={msgId}
        className={`message-item--row${isRead ? `` : ` unread`}`}
        onClick={() => handleMessageItemClicked(target)}
      >
        <td className="message-item__icon message-item--column">
          {renderMailIcon()}
          <span className="message-item__unread-counter"></span>
        </td>
        <td className="message-item__from message-item--column">{supplier}</td>
        <td className="message-item__subject message-item--column">
          {msgSubject}
        </td>
        <td className="message-item__date message-item--column">
          {new Date().toLocaleDateString()}
        </td>
      </tr>
    </React.Fragment>
  );
}
