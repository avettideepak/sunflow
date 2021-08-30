/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React from "react";
import { useSelector, shallowEqual } from "react-redux";

import LanguageOption from "./components/LanguageOption";
import LanguageList from "./components/LanguageList";
import CurrencyList from "./components/CurrencyList";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

const LanguageStepper = ({
  translations,
  langCode,
  changeLang,
  changeLangNew,
  changeCurrency,
  entryState,
  close,
  mapCountryList
}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const countryCodeState = useSelector(
    state => state.mainReducer.country,
    shallowEqual
  );
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  function getSteps() {
    return [
      [
        "",
        <LanguageOption
          countryCode={countryCodeState}
          changeLang={changeLang}
          entryState={entryState}
          translations={Object.keys(translations)}
          langCode={langCode}
          mapCountryList={mapCountryList}
          close={close}
        />
      ],
      ["Language", <LanguageList changeLang={changeLangNew} />],
      ["Currency", <CurrencyList changeCurrency={changeCurrency} />]
    ];
  }

  const steps = getSteps();

  const getStepContent = step => {
    switch (step) {
      case 0:
        return Object.keys(translations).map(lang => {
          return (
            <LanguageOption
              lang={lang}
              countryCode={countryCodeState}
              key={lang}
              changeLang={changeLang}
              entryState={entryState}
            />
          );
        });
      case 1:
        return <LanguageList changeLang={changeLangNew} />;
      case 2:
        return <CurrencyList changeCurrency={changeCurrency} />;
      default:
        return "Unknown step";
    }
  };

  return (
    <div style={{ width: "200px" }}>
      <IconButton
        aria-label="close"
        onClick={close}
        style={
          langCode !== "ar"
            ? {
                position: "absolute",
                right: "18px",
                top: "18px"
              }
            : {
                position: "absolute",
                left: "18px",
                top: "18px"
              }
        }
      >
        <CloseIcon />
      </IconButton>
      <Stepper
        style={{
          padding: "0"
        }}
        nonLinear={false}
        orientation="vertical"
        connector={false}
        id="stepper"
      >
        {steps.map((label, index) => (
          <>
            <StepLabel>{label[0]}</StepLabel>

            <Typography
              style={{
                display: "flex",
                flexWrap: "wrap"
              }}
            >
              {label[1]}
            </Typography>
          </>
        ))}
      </Stepper>
    </div>
  );
};

export default LanguageStepper;
