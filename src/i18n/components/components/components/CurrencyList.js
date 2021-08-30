/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React from "react";

import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { currencyList, I18nContext } from "../../../index";

const LanguageList = ({ changeCurrency }) => {
  const { currency } = React.useContext(I18nContext);
  const [currencyState, setCurrencyState] = React.useState({
    currency: ""
  });
  const [currenciesState, setCurrenciesState] = React.useState([]);

  const handleChange = lang => event => {
    setCurrencyState({
      currency: event.target.value[0]
    });
    changeCurrency(event.target.value);
  };

  React.useEffect(() => {
    let tempArray = [];
    currencyList.map(cur => {
      tempArray = [
        ...tempArray,
        { code: cur.code, rate: cur.conversionRate, default: cur.def }
      ];
    });
    setCurrenciesState(tempArray);
  }, []);

  return (
    <FormControl style={{ minWidth: "200px" }}>
      <Select
        native
        value={currencyState.currency}
        onChange={handleChange("age")}
        name="age"
        inputProps={{
          id: "age-native-required"
        }}
        style={{ minWidth: "200px", minHeight: "25px" }}
      >
        <option value={currency}>{currency}</option>
        {currenciesState.length > 0
          ? currenciesState.map((cur, index) => {
              if (currency !== cur.code) {
                return (
                  <option key={index} value={[cur.code, cur.rate]}>
                    {cur.code}
                  </option>
                );
              }
            })
          : null}
      </Select>
    </FormControl>
  );
};

export default LanguageList;
