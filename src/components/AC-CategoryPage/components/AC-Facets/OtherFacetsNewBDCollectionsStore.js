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
      <div key={index} className="productLineWrapperMain storeFactesWrapper mobiledisplymosfed">
        <div
          aria-expanded={isActive}
          className={`${isActive
              ? "productLineWrapper active"
              : "productLineWrapper"
            } ${isViewMoreActive ? "view-more-active" : ""}`}
        >
          <ul className={isActive ? "productLine productLineStore open" : "productLine productLineStore"}>
            {other.facetValues.map((subother, index) => {
              let facetValueCode = subother.code;
              if (subother.count > 0) {
                return (
                  <li key={subother.value} className="productLineFacets newfacetline">
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

                      <div className="productLineFacetsImgWrapper  cat-wrap-img-store">

                        {subother.text === "Metal" ? <img
                          src="https://ndb2c-preview.avetti.io/preview/store/20210308781/images/Metal.webp" width="140px" style={{
                            marginBottom: "10px"
                          }} className="img-responsive" alt={`${subother.text} Image`} /> : null}

                        {subother.text === "Wood" ? <img
                          src="https://ndb2c-preview.avetti.io/preview/store/20210308781/images/Wood.webp" width="140px" style={{
                            marginBottom: "10px"
                          }} className="img-responsive" alt={`${subother.text} Image`} /> : null}

                        {subother.text === "Fabric" ? <img
                          src="https://ndb2c-preview.avetti.io/preview/store/20210308781/images/Fabric.webp" width="140px" style={{
                            marginBottom: "10px"
                          }} className="img-responsive" alt={`${subother.text} Image`} /> : null}

                        {subother.text === "Chenille" ? <img
                          src="https://ndb2c-preview.avetti.io/preview/store/20210308781/images/Chenille.webp" width="140px" style={{
                            marginBottom: "10px"
                          }} className="img-responsive" alt={`${subother.text} Image`} /> : null}

                        {subother.text === "Cotton / Cotton Blend" ? <img
                          src="https://ndb2c-preview.avetti.io/preview/store/20210308781/images/Cotton.webp" width="140px" style={{
                            marginBottom: "10px"
                          }} className="img-responsive" alt={`${subother.text} Image`} /> : null}

                        {subother.text === "Sofa" ? <img
                          src="https://ndb2c-preview.avetti.io/preview/store/20210308781/images/Sofa.webp" width="140px" style={{
                            marginBottom: "10px"
                          }} className="img-responsive" alt={`${subother.text} Image`} /> : null}


                        {subother.text === "Polyester / Polyester Blend" ? <img
                          src="https://ndb2c-preview.avetti.io/preview/store/20210308781/images/Polyester.webp" width="140px" style={{
                            marginBottom: "10px"
                          }} className="img-responsive" alt={`${subother.text} Image`} /> : null}

                        {subother.text === "Microfiber / Microsuede" ? <img
                          src="https://ndb2c-preview.avetti.io/preview/store/20210308781/images/Microfiber.webp" width="140px" style={{
                            marginBottom: "10px"
                          }} className="img-responsive" alt={`${subother.text} Image`} /> : null}

                        {subother.text === "Stone" ? <img
                          src="https://ndb2c-preview.avetti.io/preview/store/20210308781/images/Stone.webp" width="140px" style={{
                            marginBottom: "10px"
                          }} className="img-responsive" alt={`${subother.text} Image`} /> : null}

                        {/* <div class="middle">
                          <div class="text"><img src="https://ii1.pepperfry.com/images/svg/clip-slider-check.svg" width="30px" height="30px" /></div>
                        </div> */}

                      </div>
                      <div
                        className="productText newfonttext"
                        style={{color:"#555"}}
                        dangerouslySetInnerHTML={{ __html: subother.text }}
                      ></div>
                      {/* <span className="productCount">({subother.count})</span> */}
                    </div>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    );
  } else return null;
};

export default OtherFacets;
