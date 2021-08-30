import React from "react";

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
  facetImageGenerator,
}) => {
  let code = other.code;
  let name = other.name;
  let facetTitle = other.title.replace("ic_", "").replace(/[_]/g, " ").trim();

  if (facetTitle === "Sellers") {
    facetTitle = translate("Stores");
  }
  let numberOfFacetsValuesWithCountMoreThanZero = other.facetValues.filter(
    (f) => f.count > 0
  ).length;

  let isActive = activeFacetTitles.some((t) => t === name);

  let isViewMoreActive = activeShowMoreFacets.some((t) => t === name);
  if (numberOfFacetsValuesWithCountMoreThanZero > 0) {
    return (
      <div key={index} className="facetTitleWrapper ccc">
        {Object.keys(buttonsState[name]).length > 0 ? (
          <h3
            role="button"
            aria-expanded={isActive}
            data-facettitle={other.name}
            onClick={(e) => handleFacetTitleClick(e, other.name, isActive)}
            className={
              Object.values(buttonsState[name]).some((k) => k === false)
                ? "facet-has-checked-option facetTitle"
                : "facetTitle"
            }
          >
            {facetTitle.replace("ic ", "")}
            {renderFacetToggleIcon(isActive)}
          </h3>
        ) : null}

        <div
          aria-expanded={isActive}
          className={`${
            isActive
              ? "facetFilterWrapper scroll-bar-thin-style active"
              : "facetFilterWrapper scroll-bar-thin-style"
          } ${isViewMoreActive ? "view-more-active" : ""}`}
        >
          <div className={isActive ? "priceFacet open" : "priceFacet"}>
            {other.facetValues.map((subother, index) => {
              let facetValueCode = subother.code;
              if (subother.count > 0) {
                return (
                  <div key={subother.value} className="facetFilterContent">
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
                              cursor: "not-allowed",
                            }
                      }
                    >
                      <label
                        className={
                          buttonsState[name][index] === false
                            ? "checkmark-box checked"
                            : "checkmark-box"
                        }
                      ></label>

                      {
                        // renders an Image if there is any for specific facets like FINISH facet
                        facetImageGenerator(facetTitle, subother.text)
                      }
                      <span
                        className="productTextV"
                        dangerouslySetInnerHTML={{ __html: subother.text }}
                      ></span>
                      <span className="productCount">({subother.count})</span>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>

        <div
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
        </div>
      </div>
    );
  } else return null;
};

export default OtherFacets;
