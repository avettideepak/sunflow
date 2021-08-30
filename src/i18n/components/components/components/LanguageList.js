/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React from "react";

import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { languageList, I18nContext } from "../../../index";

const LanguageList = ({ changeLang }) => {
  const { langCode } = React.useContext(I18nContext);
  const [languageState, setLanguageState] = React.useState({
    language: ""
  });
  const [languagesState, setLanguagesState] = React.useState([]);

  const handleChange = lang => event => {
    setLanguageState({
      language: event.target.value
    });
    changeLang(event.target.value);
  };

  React.useEffect(() => {
    setLanguageState({
      langCode
    });
  }, [langCode]);

  React.useEffect(() => {
    let tempArray = [];
    Object.keys(languageList).map(key => {
      tempArray = [...tempArray, [languageList[key].name, key]];
    });
    setLanguagesState(tempArray);
  }, []);

  return (
    <FormControl style={{ minWidth: "200px", marginBottom: "20px" }}>
      <Select
        native
        value={languageState.language}
        onChange={handleChange("age")}
        name="age"
        inputProps={{
          id: "age-native-required"
        }}
        style={{ minWidth: "200px", minHeight: "25px" }}
      >
        <option value={langCode}>{languageList[langCode].name}</option>
        {languagesState.length > 0
          ? languagesState.map((lang, index) => {
              if (lang[0] !== languageList[langCode].name) {
                return (
                  <option key={lang[1]} value={lang[1]}>
                    {lang[0]}
                  </option>
                );
              } else {
                return null;
              }
            })
          : null}
      </Select>
    </FormControl>
  );
};

export default LanguageList;
