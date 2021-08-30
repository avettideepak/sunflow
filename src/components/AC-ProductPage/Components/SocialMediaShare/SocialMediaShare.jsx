import React from "react";
import { PROJECT_LINK } from "../../../../project-config";

const SocialMediaShare = () => {
  return (
    <div
      id="socialGrid"
      style={{
        justifySelf: "flex-end",
        display: "flex"
      }}
    >
      <img
        style={{ width: "30px", height: "30px", marginRight: "10px" }}
        src={PROJECT_LINK + "/store/20180521148/images/ig.png"}
      />

      <img
        style={{ width: "30px", height: "30px", marginRight: "10px" }}
        src={PROJECT_LINK + "/store/20180521148/images/fb.png"}
      />

      <img
        style={{ width: "30px", height: "30px", marginRight: "10px" }}
        src={PROJECT_LINK + "/store/20180521148/images/pi.png"}
      />

      <img
        style={{ width: "30px", height: "30px", marginRight: "0px" }}
        src={PROJECT_LINK + "/store/20180521148/images/tw.png"}
      />
    </div>
  );
};

export default SocialMediaShare;
