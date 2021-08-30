import React from "react";

import { VID } from "@/project-config.js";

// import noImage from "../../../../assets/img/no-image.jpg";
// import kc from "../../../../assets/img/kidsClothing.jpg";
// import wc from "../../../../assets/img/womensClothing.jpg";
// import mc from "../../../../assets/img/mensClothing.jpg";

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
                <div
                    aria-expanded={isActive}
                    className={`${isActive
                        ? "productLineWrapper active"
                        : "productLineWrapper"
                        } ${isViewMoreActive ? "view-more-active" : ""}`}
                >
                    <ul className={isActive ? "productLine open" : "productLine"}>
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

                                            <div className="productLineFacetsImgWrapper cat-wrap-img">

                                                {
                                                    subother.text !== "" ? 
                                                    <img
                                                        alt={`${subother.text} Image`} 
                                                        src={`https://ndb2c-preview.avetti.io/preview/store/20180522154/images/${subother.text.replace(" ","_")}.jpg`} 
                                                        className="img-responsive" 
                                                        alt={`${subother.text} Image`} 
                                                    />
                                                        :
                                                    null
                                                }

                                                {/* <div class="middle">
                                                    <div class="text"><img src="https://ii1.pepperfry.com/images/svg/clip-slider-check.svg" width="30px" height="30px" /></div>
                                                </div> */}

                                            </div>
                                            <div
                                                className="productText newfonttext"
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
