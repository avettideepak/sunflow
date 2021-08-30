import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  messageContentCloseAction,
  fetchMessageContentFromId,
  messageImageUrlAction
} from "../../../redux/actions/messagingActions.js";
import { mockMessageData } from "../data/mock_message_data.js";
import Messages from "./Messages.jsx";
import "../Styles/MessageContent.css";

export default function MessageContent() {
  const dispatch = useDispatch();

  const fileUploadInput = useRef(null);

  const messageContentDataState = useSelector(
    state => state.messagingReducer.messageContentData,
    shallowEqual
  );
  const messageContentExpandedState = useSelector(
    state => state.messagingReducer.messageContentExpanded,
    shallowEqual
  );

  const messageContentLoadingState = useSelector(
    state => state.messagingReducer.messageContentLoading,
    shallowEqual
  );

  const targetIdState = useSelector(
    state => state.messagingReducer.targetId,
    shallowEqual
  );

  const isItemMessageState = useSelector(
    state => state.messagingReducer.isItemMessage,
    shallowEqual
  );

  const messageImageUrlState = useSelector(
    state => state.messagingReducer.messageImageUrl,
    shallowEqual
  );

  useEffect(() => {
    if (messageContentExpandedState) {
      document.querySelector("html").setAttribute("aria-hidden", "true");
    } else {
      document.querySelector("html").setAttribute("aria-hidden", "false");
    }
  }, [messageContentExpandedState]);

  const escKeyPressed = e => {
    if (e.keyCode === 27) {
      dispatch(messageImageUrlAction(null));
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", escKeyPressed, false);
  }, []);

  useEffect(() => {
    console.info("target ID state", targetIdState);
    let targetId = targetIdState && targetIdState[Object.keys(targetIdState)];
    if (targetId && targetId !== "") {
      dispatch(fetchMessageContentFromId(targetId, mockMessageData));
    }
  }, [targetIdState]);

  const [input, setInput] = useState("");

  const handleInputChange = e => {
    setInput(e.target.value);
  };

  const renderifItemMessage = () => {
    if (isItemMessageState) {
      let productUrl = messageContentDataState[0].quote_url;
      let itemTitle = messageContentDataState[0].itemTitle;
      return (
        <div className="message-content-product-info">
          <p>
            Product:{" "}
            <a className="message-content-product-link" href={productUrl}>
              {itemTitle}
            </a>
          </p>
        </div>
      );
    } else {
      return null;
    }
  };

  const onImageSelect = e => {
    console.info("image", e.target.files[0]);
  };

  const renderEnlargedImage = () => {
    if (messageImageUrlState) {
      return (
        <div
          className="message-enlarged-image-container"
          onClick={() => {
            dispatch(messageImageUrlAction(null));
          }}
        >
          <div className="message-enlarged-image-wrapper">
            <div className="image-and-icon-container">
              <img
                onClick={e => e.stopPropagation()}
                src={messageImageUrlState}
                className="message-enlarged-image"
              />
              <i
                onClick={() => dispatch(messageImageUrlAction(null))}
                className="no-select material-icons"
              >
                close
              </i>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  if (!messageContentLoadingState && messageContentExpandedState) {
    let subject =
      messageContentDataState &&
      messageContentDataState[0] &&
      messageContentDataState[0].subject;

    let supplier =
      messageContentDataState &&
      messageContentDataState[0] &&
      messageContentDataState[0].supplier;

    return (
      <div className="message-content-container">
        {renderEnlargedImage()}
        <div className="message-content-wrapper">
          <div className="message-content-from-wrapper">
            <div className="message-content-from-image-container">
              <div className="message-content-from-image-wrapper">
                <div className="message-content-from-image"></div>
                <div className="message-content-from-supplier">
                  <p>{supplier}</p>
                </div>
                <div className="no-select message-content-close-icon">
                  <i
                    className="material-icons"
                    onClick={() => dispatch(messageContentCloseAction())}
                  >
                    close
                  </i>
                </div>
              </div>
            </div>
          </div>
          <div className="message-content-header">
            <h1
              className="message-content__title"
              dangerouslySetInnerHTML={{ __html: subject }}
            ></h1>
          </div>
          {renderifItemMessage()}
          <div className="message-content__content scroll-bar-thin-style">
            <Messages />
          </div>
          <div className="message-content__actions">
            <div className="message-content__actions--input-section">
              <textarea
                placeholder="Enter your message..."
                onChange={e => handleInputChange(e)}
                className="scroll-bar-thin-style message-message-content__actions--input"
                value={input}
              />
            </div>
            <div className="message-content__actions-icons">
              <i
                className="no-select material-icons message-content-add-image-icon"
                onClick={() => {
                  fileUploadInput.current.click();
                }}
              >
                add_photo_alternate
                <input
                  ref={fileUploadInput}
                  className="message-content-file-input"
                  type="file"
                  name="myImage"
                  onChange={e => onImageSelect(e)}
                />
              </i>
              <i className="no-select material-icons message-content-send-icon">
                send
              </i>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
