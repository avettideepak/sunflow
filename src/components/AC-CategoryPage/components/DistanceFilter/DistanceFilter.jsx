import React, { useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import "rc-slider/assets/index.css";

import classes from "./DistanceFilter.module.css";

const DistanceFilter = ({ loading }) => {
  const userLocationState = useSelector(
    state => state.userLocationReducer,
    shallowEqual
  );

  const distanceState = useSelector(
    state => state.categoryReducer.distance,
    shallowEqual
  );

  const handleOpenModalToChangeDistance = () => {
    const button = document.getElementById("locationChangeBtn");
    button.click();
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div
          className={classes.innerWrapper}
          onClick={handleOpenModalToChangeDistance}
        >
          <div className={classes.locationAndSliderWrapper}>
            <div className={classes.userLocation}>
              <i className="material-icons">my_location</i>&nbsp;
            </div>
          </div>
          <div className={classes.distanceText}>
            {distanceState === 9999
              ? `Displaying products from suppliers all around the world`
              : `Displaying products from suppliers within ${distanceState} KM of ${userLocationState.city}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistanceFilter;
