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
      <div key={index} className="productLineWrapperMain">
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
          <div className={isActive ? "productLine3 open" : "productLine3"}>
            {other.facetValues.map((subother, index) => {
              let facetValueCode = subother.code;
              if (subother.count > 0) {
                return (
                  <div key={subother.value} className="sellerSocialLine3">
                    <div
                      key={subother.value}
                      name={subother.value}>
                        <a style={{
                              color: "#ad2310"
                        }}>
                        {/* <i class="fas fa-couch"></i> */}

                      <span
                        dangerouslySetInnerHTML={{ __html: subother.text }} 
                      ></span></a>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>

        
      </div>
    );
  } else return null;
};

export default OtherFacets;
