import React from "react";

import Grid from "@material-ui/core/Grid";

import CategoryBreadcrumb from "../../AC-Breadcrumb/CategoryBreadcrumb.jsx";
import { htmlDecode } from "../../../functions/htmldecoder";

export default function StoreCategoryHeaderGatsby({ data }) {
  const categoryImageState = data.image;
  const imageKit = "https://ik.imagekit.io/bossrevolution/b2cstartermarketplace";
  return (
    <React.Fragment>
      <div
        className="sub-nav-wrapper"
        style={{
          background: `url(${imageKit}/store.jpg)`
        }}
      >
        <div className="sub-nav-menu" style={{
              paddingLeft: "5%"
        }}>
          <div className="sub-nav-title-desc-wrapper">
            <Grid container justify="space-between" alignItems="center">
              <Grid item xs={12}>
                <h2
                  style={{ backgroundColor: "transparent" }}
                  className="sub-nav-menu-title"
                  dangerouslySetInnerHTML={{
                    __html: htmlDecode(data.description.replace("Our Store","Our Stores"))
                  }}
                ></h2>
              </Grid>
            </Grid>
          </div>
        </div>
        <CategoryBreadcrumb />
      </div>
    </React.Fragment>
  );
}
