import React  from "react";
import { useSelector, shallowEqual } from "react-redux";

import encodeConverter from "../../../../functions/htmldecoder";
import Grid from "@material-ui/core/Grid";

import { PROJECT_LINK } from "../../../../project-config";
import { useLocation } from "@reach/router";
import CategoryBreadcrumb from "../../../AC-Breadcrumb/CategoryBreadcrumb.jsx";
import { htmlDecode } from "../../../../functions/htmldecoder";
import SubCatFacet from "@components/AC-Facets/subCatFacet/subCatFacet"

import classes from "./Styles/CategoryHeader_Static.module.css";

export default function CategoryHeader({ data, width }) {
  const location = useLocation();
  const categoryImageState = data.image;
  const imageKit = "https://ik.imagekit.io/bossrevolution/b2cstartermarketplace";
  console.info("borop data", data,width);

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  return (
    <React.Fragment>
      <div
        className="sub-nav-wrapper"
        // style={
        //   width
        //     ? {
        //         background: `url(${PROJECT_LINK}/store${data.image})`,
        //         width: "100%",
        //       }
        //     : {
        //         background: `url(${PROJECT_LINK}/store${data.image})`, 
        //       }
        // }
      >
        <div className="sub-nav-menu">
          <div className="sub-nav-title-desc-wrapper">
            <Grid container justify="space-between" alignItems="center">
              <Grid item xs={12}>
                <h2
                  style={{ backgroundColor: "transparent" }}
                  className="sub-nav-menu-title"
                  dangerouslySetInnerHTML={{
                    __html: htmlDecode(data.description),
                  }}
                ></h2>
                <p className="sub-nav-menu-desc">Shop from a wide variety of products, ranging from clothing, home furnishing, electronics, books etc. Take advantage of the Click & Collect service available at your favourite store and enjoy special promotions on most products.</p>
                {
                  !isMobileState && <SubCatFacet/>
                }
              </Grid>
            </Grid>
          </div>
        </div>
        {/* <CategoryBreadcrumb /> */}
      </div>
    </React.Fragment>
  );
}
