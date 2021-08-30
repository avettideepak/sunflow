import React from "react";

const AccessoryItem = props => {
  console.info("accessory", props);
  return (
    <div>
      <h1>TEST {props.id}</h1>
    </div>
  );
};

export default AccessoryItem;
