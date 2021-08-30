/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React from "react";

export default function ReviewStarMaker(props) {
  const starMaker = text => {
    let number = Number(text);
    let test = [];
    let item = props.item;
    for (let i = 0; i < 5; i++) {
      if (number <= i) {
        test.push(
          <i
            key={i}
            className={
              item
                ? "product-review-start-font material-icons"
                : "material-icons"
            }
          >
            star_border
          </i>
        );
      } else {
        test.push(
          <i
            key={i}
            className={
              item
                ? "product-review-start-font material-icons"
                : "material-icons"
            }
          >
            star
          </i>
        );
      }
    }

    return test;
  };
  return <>{starMaker(props.text)}</>;
}
