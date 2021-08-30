/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React from "react";

const groupOtherFacets = other => {
  let name = other.title;
  if (name === "specP_Initial_Lumens") {
    let divideValue = 0;

    console.info("name", other);

    let initialLumens =
      other &&
      other.facetValues
        .filter(lumen => lumen.count > 0)
        .sort((a, b) => a.value - b.value);

    console.info("initial lumens", initialLumens);

    let initailLumenValues = initialLumens.map(lumen => lumen.value);
    console.info("Initial Lumen Values", initailLumenValues);

    let minInitalLumenValue = Math.min(...initailLumenValues);
    let maxInitialLumenValue = Math.max(...initailLumenValues);

    console.info("max and min", minInitalLumenValue, maxInitialLumenValue);

    let differenceBetweenMaxAndMin = maxInitialLumenValue - minInitalLumenValue;
    if (differenceBetweenMaxAndMin < 10000) {
      divideValue = 3;
    } else {
      divideValue = 5;
    }
    let initialLumenValuesWithCountAndChunk = {};
    const chunk = (arr, size) => {
      console.info(arr, size);

      return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => {
        return arr
          .map(item => {
            return { value: item.value, count: item.count };
          })
          .slice(i * size, i * size + size);
      });
    };

    let chunkedInitialLumenValues = chunk(
      initialLumens,
      initialLumens.length / divideValue
    );

    console.info("sortedInitialLumenValues", chunkedInitialLumenValues);

    // initialLumens.filter(lumen => {});
    // TODO: Implement the state to match the chunked array
    return (
      <React.Fragment>
        <div key={other.title}>
          {Object.keys(buttonsState[name]).length > 0 ? (
            <h4>Sort by {other.title}</h4>
          ) : null}
          {other.facetValues.filter(subother => {
            if (subother.count > 0) {
              return true;
            } else {
              return false;
            }
          }).length > 4 ? (
            <input
              type="text"
              placeholder="Filter By:"
              onChange={e =>
                handleFacet(e, other.title, index, buttonsState[name][index])
              }
            />
          ) : null}

          <ul
            className="priceFacet"
            style={{ maxHeight: "190px" }}
            style={
              other.facetValues.filter(subother => {
                if (subother.count > 0) {
                  return true;
                } else {
                  return false;
                }
              }).length > 4
                ? { overflow: "auto" }
                : {}
            }
          >
            {chunkedInitialLumenValues.map((subother, index) => {
              console.info("subother", subother);

              let checkBoxText = `${subother[0].value} - ${
                subother[subother.length - 1].value
              }`;
              let checkBoxValue = subother.reduce((a, item) => {
                return a + `&${name}=${item.value}`;
              }, "");
              console.info("checkBoxValue", checkBoxValue);
              let chunkProductCount = chunkedInitialLumenValues[index].reduce(
                (a, i) => {
                  return a + i.count;
                },
                0
              );

              if (subother.length > 0) {
                return (
                  <div key={subother[index].value}>
                    <li
                      onClick={() =>
                        handleFacet(subother.value, index, "ic_" + name)
                      }
                      key={subother.value}
                      name={subother.value}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "baseline"
                      }}
                      style={
                        subother.count > 0
                          ? { opacity: "1", cursor: "pointer" }
                          : {
                              opacity: "0.6",
                              cursor: "not-allowed"
                            }
                      }
                    >
                      <input
                        type="checkbox"
                        name={checkBoxText}
                        value={checkBoxValue}
                        style={{
                          width: "13px",
                          height: "13px",
                          margin: "5px",
                          minWidth: "13px"
                        }}
                        checked={buttonsState[name][index] ? false : true}
                        disabled={subother.length > 0 ? false : true}
                      />
                      {checkBoxText}
                      <span className="productCount">{chunkProductCount}</span>
                    </li>
                  </div>
                );
              }
            })}
          </ul>
        </div>
        <hr />
      </React.Fragment>
    );
  }
};

export default groupOtherFacets;
