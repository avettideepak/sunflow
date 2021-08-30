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
      <div key={index} className="facetTitleWrapper ccc dropdownn" style={Object.keys(buttonsState[name]).length > 0 ? null : {display:"none"}}>
        <ul>
        {Object.keys(buttonsState[name]).length > 0 ? (
          <li
            className="facetTitle"
          >
            {facetTitle.replace("ic ", "")}
            {renderFacetToggleIcon(isActive)}

            <ul className="dropdown">
            {other.facetValues.map((subother, index) => {
              let facetValueCode = subother.code;
              if (subother.count > 0) {
                return (
                  <li key={subother.value} className="facetFilterContent">
                    <a
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
                    </a>
                  </li>
                );
              }
            })}
          </ul>
          </li>
        ) : null}

          

        </ul>
      </div>
    );
  } else return null;
};

export default OtherFacets;
