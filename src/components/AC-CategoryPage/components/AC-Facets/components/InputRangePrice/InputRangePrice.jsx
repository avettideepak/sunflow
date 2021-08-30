import React, { useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useDispatch } from "react-redux";
import InputRange from "react-input-range";
import Loading from "../../../AC-Loading/Loading.jsx";
import {
  sliderMoving,
  handleFacetFilterParams
} from "../../../../redux/actions/facetActions.js";

export default function InputRangePrice(props) {
  const dispatch = useDispatch();

  const valueState = useSelector(
    state => state.facetReducer.sliders.price.value,
    shallowEqual
  );
  const [value, setValue] = useState(valueState);

  const minmaxValueState = useSelector(
    state => state.facetReducer.sliders.price.minmaxValue,
    shallowEqual
  );

  const filterUrlState = useSelector(
    state => state.facetReducer.filterUrl,
    shallowEqual
  );
  const sliderCompleated = (min, max) => {
    dispatch(
      handleFacetFilterParams(
        "[" + min + " TO " + max + "]",

        "price",
        "slider",
        filterUrlState
      )
    );
    dispatch(sliderMoving(min, max, "price"));
  };

  if (value != "") {
    return (
      <React.Fragment>
        <InputRange
          draggableTrack
          minValue={minmaxValueState.min}
          maxValue={minmaxValueState.max}
          value={value}
          onChange={value => setValue(value)}
          onChangeComplete={() => {
            sliderCompleated(value.min, value.max);
          }}
        />
      </React.Fragment>
    );
  } else {
    return <Loading />;
  }
}
