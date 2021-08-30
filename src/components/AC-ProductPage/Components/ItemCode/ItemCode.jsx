import React from "react";

import { I18nContext } from "../../../../i18n/index";

const ItemCode = ({ code }) => {
  const { translate } = React.useContext(I18nContext);

  return (
    <div className="col-xs-121" style={{ paddingRight: "15px", display:"inline-flex" }}>
      <p
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          fontSize: "13px",
          color: "#242424"
        }}
      >
        {translate("vm.itemTemplate.code")}: &nbsp;
        <span style={{ fontWeight: "400" }}>{code}</span>
      </p>
    </div>
  );
};

export default ItemCode;
