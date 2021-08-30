import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import classes from "./Styles/ConfirmDeliveryOptions.module.css";
import { confirmActions } from "../../../../../../redux/types";
import Options from "./Components/Options";

const ConfirmDeliveryOptions = () => {
  const dispatch = useDispatch();

  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  const showConfirmState = useSelector(
    state => state.confirmReducer.showConfirm,
    shallowEqual
  );

  const confirmMessage = useSelector(
    state => state.confirmReducer.confirmMessage,
    shallowEqual
  );

  const handleYesButtonClicked = () => {
    dispatch({ type: confirmActions.CONFIRM_YES });
  };

  const handleNoButtonClicked = () => {
    dispatch({ type: confirmActions.CONFIRM_NO });
  };

  useEffect(() => {
    return () => {
      //   dispatch(confirmActions.CONFIRM_NO);
    };
  }, []);

  if (showConfirmState && confirmMessage) {
    const { title, note, cancel, ok, options } = confirmMessage.__Result;
    return (
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <div className={classes.head}>
            <h6>{title}</h6>
          </div>
          <div className={classes.body}>
            <Options {...{ options, setButtonsDisabled }} />
            <p>{note}</p>
            <div className={classes.buttons}>
              <button
                onClick={handleNoButtonClicked}
                className={classes.buttonNo}
              >
                {cancel}
              </button>
              <button
                onClick={handleYesButtonClicked}
                className={classes.buttonYes}
              >
                {ok}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ConfirmDeliveryOptions;
