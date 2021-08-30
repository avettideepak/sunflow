import React from "react";

const QuickSpecification = () => {
  return (
    <div id="specGrid">
      <fieldset
        style={{
          borderBottom: "solid 1px #cdcdcd"
        }}
      >
        <h4
          style={{
            textDecoration: "underline",
            marginTop: "5px",
            fontWeight: "600"
          }}
        >
          Quick Specification
        </h4>
        <div
          className="quick-specs-list"
          style={{
            margin: "10px 0"
          }}
          id="quick-specs"
        >
          <div className="spec-wrapper">
            <span className="quick-specname">Installed measurements: : </span>
            <span className="quick-specvalue" id="qs-specM_Format_Fixture">
              D5-1/2" x H51"
            </span>
          </div>
          <div className="spec-wrapper">
            <span className="quick-specname">LAMPING: </span>
            <span className="quick-specvalue" id="qs-specT_Lamping">
              Medium Base
            </span>
          </div>
          <div className="spec-wrapper">
            <span className="quick-specname">FINISH: </span>
            <span className="quick-specvalue" id="qs-specI_Finish">
              Grecian Bronze
            </span>
          </div>
          <div className="spec-wrapper">
            <span className="quick-specname">NUMBER OF BULBS / LIGHTS: </span>
            <span
              className="quick-specvalue"
              id="qs-specT_Number_of_Bulb_Lights"
            >
              1
            </span>
          </div>
          <div className="spec-wrapper">
            <span className="quick-specname">CERTIFICATION TYPE: </span>
            <span className="quick-specvalue" id="qs-specC_Certification_Type">
              cULus
            </span>
          </div>
          <div className="spec-wrapper">
            <span className="quick-specname">TYPE: </span>
            <span className="quick-specvalue" id="qs-specI_Type_Fixture">
              Incandescent
            </span>
          </div>
          <div className="spec-wrapper">
            <span className="quick-specname">MAX WATTAGE: </span>
            <span className="quick-specvalue" id="qs-specP_Max_Wattage">
              60 W
            </span>
          </div>
          <div className="spec-wrapper">
            <span className="quick-specname">VOLTAGE: </span>
            <span className="quick-specvalue" id="qs-specP_Voltage">
              120 V
            </span>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default QuickSpecification;
