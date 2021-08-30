/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React, { useState, useEffect, useContext } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Link } from "gatsby";
import { PREVIEW, PROJECT_LINK, VID } from "@/project-config.js";
import Async from "react-code-splitting";
import { I18nContext } from "@/i18n/index";
import { setHTMLElementFixedPosition } from "@/functions/Utilities.js";
import SearchBarMobile from "@components/AC-Search/components/SearchBarMobile";
import LogoMobileWhite from "@assets/img/demoLogo_mobile_white.png";
import { selectedStoreMap } from "@/redux/actions/mainActions"
import "./Styles/header.css";
import "./Styles/NavMenu.css";

export default function NavMenu({ data }) {

  const { langCode, translate } = useContext(I18nContext);

  const dispatch = useDispatch();

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  const currentScreenWidthState = useSelector(
    state => state.mainReducer.currentScreenWidth,
    shallowEqual
  );

  const navCatsState = useSelector(
    state => state.menuReducer.navCats,
    shallowEqual
  );

  const languageState = useSelector(
    state => state.mainReducer.lang,
    shallowEqual
  );

  const [navMenuOpen, setNavMenuOpen] = useState(false);

  const toggleDrawer = () => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setNavMenuOpen(!navMenuOpen);
  };

  useEffect(() => {
    setHTMLElementFixedPosition(navMenuOpen);
    return () => {
      setHTMLElementFixedPosition(false);
    };
  }, [navMenuOpen]);

  const handleCategoryChange = (cid, cat, parents, longdesc) => {
    // let catName = cat;
    if (isMobileState) {
      setNavMenuOpen(!navMenuOpen);
    }

    dispatch(selectedStoreMap(null))
    /*   console.info("handleCatChange", cid, cat, parents);
    if (cat.includes("&amp;")) {
      catName = cat.replace("&amp;", "&");
    }

    const category = navCatsState.childs.filter(c => {
      let name = c.name;
      if (name.includes("&amp;")) {
        name = name.replace("&amp;", "&");
      }

      return name.toLowerCase() === catName.toLowerCase();
    });
    //dispatch(changeCategoryName(catName));

    if (cid != "72167" && cid != "72165") {
      // 432381 - stores // cat//Stores
      // dispatch(fetchCategoryFromRender(cid, catName, parents, "", category[0]));
    } */
  };

  const renderNavLinks = () => {
    return data.map(cat => {
      let catName = cat.description;
      let arrURL = cat.URL.split(`/`);
      let lastURL = arrURL[arrURL.length - 1];
      let className = `navlink-${lastURL}`;
      let tempUrl = cat.URL.replace("shop/", "").replace("contact", "contact-us");
      let langTemp = tempUrl.includes(langCode) ? "" : `${langCode}/`;

      return (
        <li key={cat.cid} className="has-dropdown megamenu">
          {
            catName == "Shopping" ? (
              <a
                style={{
                  color: "#242424"
                }}
                href="javscript:void(0)"
                className="menuCat category-menu"
                onClick={() => handleCategoryChange()}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: catName.replace("Shopping","Shop"),
                  }}
                />
              </a>
            )
              :
              (
                <Link
                  style={{
                    color: "#242424"
                  }}
                  className="menuCat category-menu"
                  to={"/" + tempUrl.replace("mall-map","interactive-mall-map")}
                  onClick={() => handleCategoryChange()}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: catName,
                    }}
                  />
                </Link>
              )

          }

          {cat.childs.length > 0 ? (
            <ul
              className="sub-menu megamenu-wrapper flex"
              id={cat.description.replace(" ", "").replace(" ", "")}
            >
              {cat.childs.map((subcat) => (
                <li key={subcat.cid} className="hvr-col">
                  <Link
                    to={"/" + subcat.URL.replace("shop/", "")}
                    onClick={() => handleCategoryChange()}
                  >
                    <img src={`${PROJECT_LINK}/store${subcat.thumbnail}`} />
                    <p>{subcat.description}</p>
                  </Link>


                </li>
              )
              )}
            </ul>
          ) : (
            <></>
          )}
        </li>
      );
    });
  };

  const renderStoreLinks = stores => {
    return (
      <div className="navlink-sublinks-container">
        {stores.map((store, index) => {
          let storeLink = store.replace(/ /g, "-").toLowerCase();
          return (
            <Link
              className="icons-container"
              key={index}
              to={
                langCode !== "en"
                  ? PREVIEW + "/" + langCode + `/stores/${storeLink}`
                  : PREVIEW + `/stores/${storeLink}`
              }
            >
              {store}
            </Link>
          );
        })}
      </div>
    );
  };
  return (
    <nav className="categoryStructure">
      {isMobileState ? (
        <React.Fragment>
          <i
            open={navMenuOpen}
            className="material-icons mobile-nav-icon mobileDisplayy"
            onClick={toggleDrawer()}
          >
            <span></span>
          </i>
          <div className="mobile-nav-bar-container" open={navMenuOpen}>
            <div
              id="nav-menu-drawer"
              className={
                langCode === "ar"
                  ? "rtl nav-wrapper actual-nav scroll-bar-thin-style"
                  : "nav-wrapper actual-nav scroll-bar-thin-style"
              }
            >
              <div className="nav-content-wrapper">
                <div className="search-bar-container">
                  <div className="search-bar-wrapper">
                    <SearchBarMobile />
                  </div>
                </div>
                <ul className="staticMenu">
                  <li style={{ color: "#2aa841" }}>
                    <Link
                      onClick={() => {
                        if (isMobileState) {
                          setNavMenuOpen(!navMenuOpen);
                        }
                      }}
                      className="menuCat1"
                      to={"/"}
                    >
                      {translate("Home").toUpperCase()}
                    </Link>
                  </li>
                  {navCatsState.childs.map(cat => {
                    let catName = cat.name.replace("&amp;", "&").replace("Our Store", "Our Stores");
                    let tempUrl = cat.URL;
                    tempUrl = tempUrl;

                    tempUrl = tempUrl.replace(`${langCode}/shop`, "shop").replace("contact", "contact-us");
                    return (
                      <li key={cat.cid}>
                        <Link
                          onClick={() =>
                            handleCategoryChange(
                              cat.cid,
                              catName,
                              [[catName, cat.cid, cat.URL]],
                              cat.longdesc
                            )
                          }
                          className="menuCat"
                          style={{
                            textTransform:
                              catName != "by Brand" && catName != "by Style"
                                ? ""
                                : null
                          }}
                          to={"/" + tempUrl}
                        >
                          {console.info("tempUrl", tempUrl)}
                          <span
                            dangerouslySetInnerHTML={{
                              __html: catName.replace("Our Store", "Our Stores")
                            }}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <ul className="staticMenu">
                  <li>
                    <a href="https://www.avetticommerce.com/" target="_blank">
                      {translate("vm.footer_about").toUpperCase()}
                    </a>
                  </li>
                  <li>
                    <Link onClick={toggleDrawer()} to={"/login"}>
                      {translate("js.header.login").toUpperCase()}
                    </Link>
                  </li>
                  {/*  <li>
                    <a
                      href={`${PROJECT_LINK}/my-account.html?mode=customerinfo&vid=${VID}`}
                    >
                      {translate("js.header.login").toUpperCase()}
                    </a>
                </li> */}
                  <li>
                    <a
                      href={`${PROJECT_LINK}/basket.html?vid=${VID}&iu=${languageState}`}
                    >
                      {translate("js.header.cart").toUpperCase()}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`${PROJECT_LINK}/signin.html?vid=${VID}&mt=1&iu=${languageState}`}
                    >
                      {translate("Myfavourites").toUpperCase()}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <div className="nav-menu-content-desktop primary-nav menu-dark">
          <div className="ab">
            <ul className="menu-list nav-hover-1 sf-menu clear list-none">{renderNavLinks()}</ul>
          </div>
        </div>
      )}
    </nav>
  );
}
