/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
const mapDynamicFacetSliders = json => {
  let finalSliderObject = {};

  if (
    json[2].facets &&
    json[2].facets.Other &&
    json[2].facets.Other.length > 0
  ) {
    let sliderNamesArray = json[2].facets[2].Other.filter(carat => {
      if (
        carat.name == "LD_Carat" ||
        carat.name == "LD_Table" ||
        carat.name == "LD_Depth"
      ) {
        return true;
      } else {
        return false;
      }
    }).map(cat => cat.name);

    if (sliderNamesArray.length > 0) {
      sliderNamesArray.map(slider => {
        finalSliderObject = {
          ...finalSliderObject,
          [slider]: {
            minmaxValue: {
              min: Number(
                json[2].facets[2].Other.filter(carat => {
                  if (carat.name == slider) {
                    return true;
                  } else {
                    return false;
                  }
                })[0]
                  .facetValues.filter(price => {
                    if (price.count > 0 && price.text != "null") {
                      return true;
                    } else {
                      return false;
                    }
                  })
                  .map(pricefilter => pricefilter.text)[0]
              ),
              max: Number(
                json[2].facets[2].Other.filter(carat => {
                  if (carat.name == slider) {
                    return true;
                  } else {
                    return false;
                  }
                })[0]
                  .facetValues.filter(price => {
                    if (price.count > 0 && price.text != "null") {
                      return true;
                    } else {
                      return false;
                    }
                  })
                  .map(pricefilter => pricefilter.text)
                  .slice(-1)[0]
              )
            },
            value: {
              min: Number(
                json[2].facets[2].Other.filter(carat => {
                  if (carat.name == slider) {
                    return true;
                  } else {
                    return false;
                  }
                })[0]
                  .facetValues.filter(price => {
                    if (price.count > 0 && price.text != "null") {
                      return true;
                    } else {
                      return false;
                    }
                  })
                  .map(pricefilter => pricefilter.text)[0]
              ),
              max: Number(
                json[2].facets[2].Other.filter(carat => {
                  if (carat.name == slider) {
                    return true;
                  } else {
                    return false;
                  }
                })[0]
                  .facetValues.filter(price => {
                    if (price.count > 0 && price.text != "null") {
                      return true;
                    } else {
                      return false;
                    }
                  })
                  .map(pricefilter => pricefilter.text)
                  .slice(-1)[0]
              )
            }
          }
        };
      });
    }

    return finalSliderObject;
  }
  return {};
};

export default mapDynamicFacetSliders;
