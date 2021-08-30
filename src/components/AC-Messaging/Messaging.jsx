import React from "react";
import MessageBox from "./components/MessageBox.jsx";
import "./Styles/Messaging.css";

export default function Messaging() {
  return (
    <div className="messaging-container">
      <div className="messaging-wrapper">
        <h1>Messages</h1>
        <MessageBox />
      </div>
    </div>
  );
}
