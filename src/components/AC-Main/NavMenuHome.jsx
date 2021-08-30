import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import { Link } from "gatsby";

// import "./Styles/header.css";
// import "./Styles/NavMenu.css";
// import LazyImage from "../../shared/components/";

import navCatTemp from "./tempNavCats.json";

import {
  PROJECT_LINK,
  PREVIEW,
  LINK_DISTRIBUTION
} from "../../project-config";

export default function NavMenu() {

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  const navCats = useSelector(
    state => state.menuReducer.navCats,
    shallowEqual
  );

  return (
    <div className="browseCat-container" style={{ marginTop: "30px" }}>
      <h1 className="browseCat">Browse by Categories</h1>
      { navCats && navCats.childs &&
        navCats.childs.map((cat) => {
          return (
            <div key={cat.cid}>
              {cat.childs &&
                cat.childs.length > 0 &&
                (
                  <div
                    id={`HomeCategory-${cat.description
                      .replace(" ", "")
                      .replace(" ", "")}`}
                  >
                    {cat.childs.map((subcat) => {
                      if (subcat.childs.length > 0 ) {
                        if( subcat.description != "Complementary"){
                          return (
                            <div
                              key={subcat.cid}
                              className={`HomeCateg cate-${subcat.description}`}
                            >
                              <Link to={"/" + subcat.URL.replace("shop/", "")}>
                                <img
                                  className={`HomeC-${subcat.description}`}
                                  // src={`https://ik.imagekit.io/ofb/store/${subcat.image}?tr=w-200,h-200,dpr-2,pr-true,f-auto`}
                                  src={`${LINK_DISTRIBUTION}/store${subcat.image}`}
                                  alt={`${subcat.description}`}
                                  
                                />
                                {/* <p>{subcat.description}</p> */}
                              </Link>
                              <div class="HomeCateg-menu">
                                <p>{subcat.description}</p>
                                
                              </div>
  
                            </div>
                          )
                        }
                        
                      }
                    }
                    )}
                  </div>
                )}
            </div>
          );
        })}
    </div>
  );
}
