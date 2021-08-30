import React from "react";

import { VID } from "../../../../project-config.js";

import noImage from "../../../../assets/img/no-image.jpg";
import kc from "../../../../assets/img/kidsClothing.jpg";
import wc from "../../../../assets/img/womensClothing.jpg";
import mc from "../../../../assets/img/mensClothing.jpg";

const OtherFacets = ({
  other,
  index,
  renderViewMoreButton,
  handleFacet,
  translate,
  handleFacetTitleClick,
  renderFacetToggleIcon,
  activeFacetTitles,
  activeShowMoreFacets,
  buttonsState,
  facetImageGenerator
}) => {
  let code = other.code;
  let name = other.name;
  let facetTitle = other.title.replace("ic_", "").replace(/[_]/g, " ").trim();

  if (facetTitle === "Sellers") {
    facetTitle = translate("Stores");
  }
  let numberOfFacetsValuesWithCountMoreThanZero = other.facetValues.filter(
    f => f.count > 0
  ).length;

  let isActive = activeFacetTitles.some(t => t === name);

  let isViewMoreActive = activeShowMoreFacets.some(t => t === name);
  if (numberOfFacetsValuesWithCountMoreThanZero > 0) {
    return (
      <div key={index} className="productLineWrapperMain mobiledisplymosfed">
        {/* {Object.keys(buttonsState[name]).length > 0 ? (
          <h1
            role="button"
            aria-expanded={isActive}
            data-facettitle={other.name}
            onClick={e => handleFacetTitleClick(e, other.name, isActive)}
            className={
              Object.values(buttonsState[name]).some(k => k === false)
                ? "facet-has-checked-option facetTitle"
                : "facetTitle"
            }
          >
            {facetTitle.replace("ic ", "")}
            {renderFacetToggleIcon(isActive)}
          </h1>
        ) : null} */}

        <div
          aria-expanded={isActive}
          className={`${
            isActive
              ? "productLineWrapper active"
              : "productLineWrapper"
          } ${isViewMoreActive ? "view-more-active" : ""}`}
        >
          <div className={isActive ? "productLine open" : "productLine"}>
            {other.facetValues.map((subother, index) => {
              let facetValueCode = subother.code;
              if (subother.count > 0) {
                return (
                  <div key={subother.value} className="productLineFacets">
                    <div
                      onClick={() =>
                        handleFacet(
                          subother.value,
                          index,
                          name,
                          buttonsState[name][index],
                          { [facetTitle]: subother.text },
                          code,
                          facetValueCode
                        )
                      }
                      key={subother.value}
                      name={subother.value}
                      style={
                        subother.count > 0
                          ? { opacity: "1", cursor: "pointer" }
                          : {
                              opacity: "0.6",
                              cursor: "not-allowed"
                            }
                      }
                      className={
                        buttonsState[name][index] === false
                          ? "facet-box selected"
                          : "facet-box"
                      }
                    >
                      {/* <label
                        className={
                          buttonsState[name][index] === false
                            ? "checkmark-box checked"
                            : "checkmark-box"
                        }
                      ></label> */}

                      {
                        // renders an Image if there is any for specific facets like FINISH facet
                        // facetImageGenerator(facetTitle, subother.text)
                      }


                      
                      <div className="productLineFacetsImgWrapper">

                      { subother.text === "Bedding" ?  <img
                        src="https://demofurnituremarketplace.avetti.io/preview/store/20180522154/assets/items/largeimages/AINE36HTC0.jpg"  width="70px" style={{
                          marginBottom : "10px"
                        }} className="img-responsive" alt={`${subother.text} Image`} /> : null  }

                      { subother.text === "Beds" ?  <img
                        src="https://demofurnituremarketplace.avetti.io/preview/store/20180522154/assets/items/largeimages/AIN4QTHAF0.jpg"  width="70px" style={{
                          marginBottom : "10px"
                        }} className="img-responsive" alt={`${subother.text} Image`} /> : null  }

{ subother.text === "Dining" ?  <img
                        src="https://demofurnituremarketplace.avetti.io/preview/store/20180522154/assets/items/largeimages/AINYLK8GK0.jpg"  width="70px" style={{
                          marginBottom : "10px"
                        }} className="img-responsive" alt={`${subother.text} Image`} /> : null  }

                      { subother.text === "Seating" ?  <img
                        src="https://demofurnituremarketplace.avetti.io/preview/store/20180522154/assets/items/largeimages/AIN3NT4JM2.jpg?tr=ar-1-1,dpr-2,r-20,pr-true,f-auto,w-200"  width="70px" style={{
                          marginBottom : "10px"
                        }} className="img-responsive" alt={`${subother.text} Image`} /> : null  }

{ subother.text === "Showpieces" ?  <img
                        src="https://demofurnituremarketplace.avetti.io/preview/store/20180522154/assets/items/largeimages/AIN1T77Y60.jpg"  width="70px" style={{
                          marginBottom : "10px"
                        }} className="img-responsive" alt={`${subother.text} Image`} /> : null  }

                      { subother.text === "Sofa" ?  <img
                        src="https://demofurnituremarketplace.avetti.io/preview/store/20180522154/assets/items/largeimages/AINI6XL8Z0.jpg"  width="70px" style={{
                          marginBottom : "10px"
                        }} className="img-responsive" alt={`${subother.text} Image`} /> : null  }


                      { subother.text === "Storage" ?  <img
                        src="https://demofurnituremarketplace.avetti.io/preview/store/20180522154/assets/items/largeimages/AIN71BBUX2.jpg"  width="70px" style={{
                          marginBottom : "10px"
                        }} className="img-responsive" alt={`${subother.text} Image`} /> : null  }

{ subother.text === "Tables" ?  <img
                        src="https://demofurnituremarketplace.avetti.io/preview/store/20180522154/assets/items/largeimages/AIN71BBUX2.jpg"  width="70px" style={{
                          marginBottom : "10px"
                        }} className="img-responsive" alt={`${subother.text} Image`} /> : null  }

{ subother.text === "Wall Art" ?  <img
                        src="https://demofurnituremarketplace.avetti.io/preview/store/20180522154/assets/items/largeimages/AIN71BBUX2.jpg"  width="70px" style={{
                          marginBottom : "10px"
                        }} className="img-responsive" alt={`${subother.text} Image`} /> : null  }

{ subother.text === "Bathroom" ?  <img
                        src="https://demofurnituremarketplace.avetti.io/preview/store/20180522154/assets/items/largeimages/AIN71BBUX2.jpg"  width="70px" style={{
                          marginBottom : "10px"
                        }} className="img-responsive" alt={`${subother.text} Image`} /> : null  }


                        
                      </div>
                      <div
                        className="productText"
                        dangerouslySetInnerHTML={{ __html: subother.text }} 
                      ></div>
                      {/* <span className="productCount">({subother.count})</span> */}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>

        {/* <div
          className={`view-more-button-wrapper ${
            isViewMoreActive ? "view-more-active" : ""
          }`}
        >
          {renderViewMoreButton(
            numberOfFacetsValuesWithCountMoreThanZero,
            isActive,
            isViewMoreActive,
            other.name
          )}
        </div> */}
      </div>
    );
  } else return null;
};

export default OtherFacets;
