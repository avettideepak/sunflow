/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React, { useContext, useState, useEffect } from "react";
import { FormattedNumber } from "react-intl";
import { I18nContext } from "../../../i18n/index";
const PriceTag = props => {
  const { currency, priceConvert } = React.useContext(I18nContext);
  const [priceState, setPriceState] = useState(0);

  useEffect(() => {
    if (props.value.integer && props.value.decimal) {
      setPriceState(
        // Number(props.value.integer + "." + props.value.decimal) / priceConvert
        Number(props.value.integer + "." + props.value.decimal)
      );
    }
  }, [props]);

  return <FormattedNumber value={priceState} style="currency" currency="USD" />;
};

export default PriceTag;
