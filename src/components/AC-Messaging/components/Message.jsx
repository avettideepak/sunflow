import React from "react";

import "../Styles/Message.css";

export default function Message({ message, handleImageClicked }) {
  let tempWebsiteUrlToDisplayImages = `https://bdadmin3.avetti.ca/preview/store/`;
  let isSender = message.type === "Sent";
  let from = "";
  let images = message.images;
  console.info("message", images);

  const renderImages = () => {
    if (images.length > 0) {
      return (
        <div className="message-images-wrapper">
          {images.map(image => {
            return (
              <img
                onClick={e => handleImageClicked(e.target.src)}
                className="message-image"
                src={image}
              ></img>
            );
          })}
        </div>
      );
    } else {
      return null;
    }
  };

  if (isSender) {
    from = `${message.from_firstname} ${message.from_lastname}`;
  } else {
    from = message.supplier;
  }
  return (
    <React.Fragment>
      <div className={`messaging__message-container`}>
        <div
          className={`messaging__message-wrapper  ${
            isSender
              ? `messaging__message--sent`
              : `messaging__message--received`
          }`}
        >
          {/*  <div className="messaging__message--from">{from}</div> */}
          <div className="messaging__message--content">{message.content}</div>
          {renderImages()}
          <div className="messaging__message--date">
            {new Date(
              `${message.messageDate}T${message.messageTime}`
            ).toLocaleTimeString({}, { timeStyle: "short" })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
