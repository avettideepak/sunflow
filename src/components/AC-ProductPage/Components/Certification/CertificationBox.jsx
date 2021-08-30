import React from "react";

const CertificationBox = () => {
  return (
    <div id="certGrid" className="info">
      <div id="downloads-wrapper">
        <div className="Info_download">Information Downloads</div>
      </div>

      <div className="sr-only Info_download"></div>
      <div
        className="sr-only certInfo"
        style={{
          height: "60px"
        }}
      ></div>
    </div>
  );
};

export default CertificationBox;
