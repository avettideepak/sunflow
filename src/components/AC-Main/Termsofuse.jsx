import React from "react";
import MobileStepper from "@material-ui/core/MobileStepper";

import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { PROJECT_LINK, VID } from "@/project-config";
import { I18nContext } from "@/i18n/index";
import MenuTop from "../AC-Header/MenuTopBarComingSoon";
import FooterComingSoon from "../AC-Footer/FooterComingSoon";




// import sdfsdf from "../header/SearchHelper";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Slider = () => {
  const { langCode } = React.useContext(I18nContext);

  let imgName = `slider$NUM_${langCode}.jpg`;
  const images = require.context("../assets/img/sliderComingSoon/", true);

  let img1 = images("./" + imgName.replace("$NUM", "1"));
  // let img2 = images("./" + imgName.replace("$NUM", "2"));
  // let img3 = images("./" + imgName.replace("$NUM", "3"));
  // let img4 = images("./" + imgName.replace("$NUM", "4"));

  const [activeStep, setActiveStep] = React.useState(0);
  const tutorialSteps = [
    {
      label: "",
      imgPath: img1
    }
    // },
    // {
    //   label: "",
    //   imgPath: img2
    // },
    // {
    //   label: "",
    //   imgPath: img3
    // },
    // {
    //   label: "",
    //   imgPath: img4
    // }
  ];
  const maxSteps = tutorialSteps.length;
  
  const handleStepChange = step => {
    setActiveStep(step);
  };

  return (
    <>
      <MenuTop />
      <AutoPlaySwipeableViews
        axis={"x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tutorialSteps.map((step, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img
                style={{
                  width: "100%",
                  height: "535px"
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="dots"
        activeStep={activeStep}
        nextButton=""
        backButton=""
        style={{
          transform: "translateY(-30px)",
          position: "absolute",
          background: "transparent",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          width: "100%"
        }}
      />

        <FooterComingSoon />
    </>
  );
};

export default Slider;
