/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
const buttonsMappingGatsby = facets => {
  /* This function is mapping facets buttons */

  console.info("facets", facets);
  function toObject(names, values) {
    var result = {};
    for (var i = 0; i < names.length; i++) result[names[i]] = values[i];
    return result;
  }

  let dynamicButtonTemp = {};
  if (facets.length > 2) {
    facets &&
      facets[2] &&
      facets[2].Other &&
      facets[2].Other.map(other => {
        let name = other.name;

        const arrayIndex = [];
        let value = other.facetValues
          .filter((value, index) => {
            if (value.count > 0) {
              arrayIndex.push(index);
              return true;
            } else {
              return false;
            }
          })
          .map(value => true);
        value = toObject(arrayIndex, value);
        dynamicButtonTemp[name] = { ...value };
      });
  }

  let priceIndexValues = [];
  let priceValue =
    facets &&
    facets[0] &&
    facets[0].Price &&
    facets[0].Price.filter((price, index) => {
      if (price.count > 0) {
        priceIndexValues.push(index);
        return true;
      } else {
        return false;
      }
    }).map(price => true);
  priceValue = toObject(priceIndexValues, priceValue);

  let reviewIndexValues = [];
  let reviewValue =
    facets &&
    facets[1] &&
    facets[1].Reviews &&
    facets[1].Reviews.filter((review, index) => {
      if (review.count > 0) {
        reviewIndexValues.push(index);
        return true;
      } else {
        return false;
      }
    }).map(review => {
      return true;
    });

  reviewValue = toObject(reviewIndexValues, reviewValue);

  let staticFacetsButtonsTemp = {
    Price: {
      ...priceValue
    },
    Reviews: {
      ...reviewValue
    }
  };

  return {
    ...staticFacetsButtonsTemp,
    ...dynamicButtonTemp
  };
};
export default buttonsMappingGatsby;
