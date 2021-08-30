import React, { useEffect } from "react";
import MessageList from "./MessageList.jsx";
import MessageContent from "./MessageContent.jsx";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { mockMessageList } from "../data/mock_message_data.js";
import { fetchUserMessages } from "../../../redux/actions/messagingActions.js";
import "../Styles/MessageBox.css";

export default function MessageBox() {
  const dispatch = useDispatch();

  const userMessagesLoadingState = useSelector(
    state => state.messagingReducer.userMessagesLoading,
    shallowEqual
  );

  useEffect(() => {
    dispatch(fetchUserMessages(0, mockMessageList));
  }, []);

  const ViewOrdersSection = (
    <h6 className="messaging-view-orders-section">
      <span>View Orders</span> if you need to message the Seller
    </h6>
  );

  const MessageBox = (
    <React.Fragment>
      <MessageContent />
      <div className="message-box-container">
        <div className="message-box-wrapper">
          <table className="message-box-table">
            <thead className="message-box-table-header">
              <tr>
                <th></th>
                <th>From</th>
                <th>Subject</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody className="message-box-table-body">
              <MessageList />
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );

  if (userMessagesLoadingState) {
    return ViewOrdersSection;
  } else {
    return MessageBox;
  }
}
