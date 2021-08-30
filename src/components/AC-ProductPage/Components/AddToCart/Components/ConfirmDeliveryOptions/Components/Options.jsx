import React, { useEffect, useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import classes from "./Styles/Options.module.css";

const Options = ({ options, setButtonsDisabled }) => {
  const [radioButtonValue, setRadioButtonValue] = useState("-1");

  useEffect(() => {
    if (options) {
      if (options.length > 0) {
        setButtonsDisabled(true);
      } else {
        setButtonsDisabled(false);
      }
    }
  }, [options]);

  const handleChange = e => {
    const { value } = e.target;
    setRadioButtonValue(value);
  };

  console.info("radio", radioButtonValue);

  if (options.length > 0) {
    return (
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="options"
              value={radioButtonValue}
              onChange={handleChange}
            >
              {options.map(option => {
                return (
                  <FormControlLabel
                    key={option.optionid}
                    value={String(option.optionid)}
                    control={<Radio />}
                    label={option.option}
                    className={classes.radioButton}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Options;
