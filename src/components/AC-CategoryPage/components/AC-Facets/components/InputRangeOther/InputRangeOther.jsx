import React, { useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useDispatch } from "react-redux";
import InputRange from "react-input-range";
import Loading from "../../../AC-Loading/Loading.jsx";
import {
  sliderMoving,
  handleFacetFilterParams
} from "../../../../redux/actions/facetActions.js";

export default function InputRangeOther(props) {
  const dispatch = useDispatch();
  const valueState = useSelector(
    state => state.facetReducer.sliders[props.facetName].value,
    shallowEqual
  );
  const facetState = useSelector(
    state =>
      state.facetReducer.facets[2].Other.filter(name => {
        if (name.name == props.facetName) {
          return true;
        } else {
          return false;
        }
      })[0].facetValues,
    shallowEqual
  );
  const [value, setValue] = useState(valueState);

  const minmaxValueState = useSelector(
    state => state.facetReducer.sliders[props.facetName].minmaxValue,
    shallowEqual
  );

  const filterUrlState = useSelector(
    state => state.facetReducer.filterUrl,
    shallowEqual
  );
  const sliderCompleated = (min, max) => {
    dispatch(
      handleFacetFilterParams(
        [
          ...facetState
            .filter(price => {
              if (price.count > 0 && price.text != "null") {
                return true;
              } else {
                return false;
              }
            })
            .map(pricefilter => {
              return pricefilter.text;
            })
        ].filter(fil => {
          if (fil >= min && fil <= max) {
            return true;
          } else {
            return false;
          }
        }),
        props.facetName,
        "slider",
        filterUrlState
      )
    );
    dispatch(sliderMoving(min, max, props.facetName));
  };

  if (value != "") {
    return (
      <>
        <InputRange
          draggableTrack
          minValue={minmaxValueState.min}
          maxValue={minmaxValueState.max}
          formatLabel={value => {
            if (props.facetName == "Carat") {
              return value.toFixed(2);
            } else {
              return value.toFixed(1);
            }
          }}
          value={value}
          onChange={value => setValue(value)}
          onChangeComplete={() => {
            sliderCompleated(value.min, value.max);
          }}
          step={props.facetName == "Carat" ? 0.01 : 0.1}
        />
      </>
    );
  } else {
    return <Loading />;
  }
}
