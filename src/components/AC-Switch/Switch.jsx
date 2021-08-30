import React, { useState } from "react";

export default function Switch({ switchLabel, onLabel, offLabel }) {
  const [switchState, setSwitchState] = useState(false);

  const toggleSwitch = () => {
    setSwitchState(!switchState);
  };

  return (
    <div className="switch-container">
      <div
        className="divLK"
        style={{
          display: "grid",
          gridTemplateColumns: "4fr 1fr 1fr 1fr",
          justifyItems: "center",
          alignItems: "baseline",
          cursor: "default"
        }}
      >
        <span style={{ justifySelf: "end" }}>{switchLabel}</span>
        <span
          className="lb-span"
          style={{
            fontWeight: "bold",
            color: switchState ? "rgb(90, 90, 90)" : "rgb(42, 168, 65)"
          }}
        >
          {onLabel}
        </span>
        <label className="switch switch_type1 l-k" role="switch">
          <input
            type="checkbox"
            className="switch_1toggle unit-toggle-system l-k"
            id="kl"
            checked={switchState}
            onClick={toggleSwitch}
          />
          <span className="switch__label l-k"></span>
        </label>
        <span
          className="kgs-span"
          style={{
            fontWeight: "bold",
            color: switchState ? "rgb(42, 168, 65)" : "rgb(90, 90, 90)"
          }}
        >
          {offLabel}
        </span>
      </div>
    </div>
  );
}
