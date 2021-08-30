/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React, { useState, useContext, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Link } from "gatsby";

import NavMenu from "./NavMenu.jsx";
import Popover from '@material-ui/core/Popover';
import Drawer from "@material-ui/core/Drawer";
import MiniCart from "@components/AC-MiniCart/MiniCart.jsx";

import Profile from "./Profile.jsx";
import { setHTMLElementFixedPosition } from "@/functions/Utilities.js";
import SearchBarMobile from "@components/AC-Search/components/SearchBarMobile";
import WishList from "@components/AC-WishList/components/WishListCustomModal.jsx";
import LanguageSelect from "@/i18n/components/LanguageSelect";
import { I18nContext } from "@/i18n/index";

import Async from "react-code-splitting";

import { fetchingMenuSuccess } from "@/redux/actions/menuActions.js";
import { handleMobileOrDesktop } from "@/redux/actions/mainActions.js";
import { FormattedNumber } from "react-intl";
import { updateBrandsGeolocation } from "@/redux/actions/geoLocationActions.js";
import logo from "@assets/img/Logo_head.png";
import Bag from "@assets/img/icons/Mask.png";
import Search from "@assets/img/icons/Search.png";
import { setMobileSearchBtnClicked } from "@/redux/actions/handlersAction.js";
const SearchBar = () => <Async load={import("./SearchHelper")} />;

export default function MenuTopBar({ data, brands }) {
  const dispatch = useDispatch();
  const { translate, currency, priceConvert } = useContext(I18nContext);
  const [searchFlag, setSearchFlag] = useState(false);

  useEffect(() => {
    const navCats = {
      name: "Shop",
      vid: "20210607181",
      cid: "520343",
      thumbnail: "No Image",
      image: "No Image",
      position: "1",
      description: "Shop",
      metadescription:
        "This is a Demo Item. This product demonstrates item options. As options on the right side of the Micro Vault Midi, as an entry-level portable storage solution, is ideally suited to plug into a laptop",
      metakeywords: "Lenovo IdeaPad S110 Golf Shirts Sony Micro Vault Midi 4GB",
      URL: "shop",
      childs: [...data]
    };
    dispatch(fetchingMenuSuccess(navCats));

    //BRANDS GEOLOCATION
    dispatch(updateBrandsGeolocation(brands));
  }, []);
  const langCode = useSelector(state => state.mainReducer.lang, shallowEqual);

  const [loginModalOpened, setLoginModalOpened] = useState(false);

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const suppliersBasketState = useSelector(
    state => state.sessionReducer.suppliersBasket,
    shallowEqual
  );

  const suppliersBasketCountState =
    suppliersBasketState &&
    Object.keys(suppliersBasketState).length > 0 &&
    Object.keys(suppliersBasketState).reduce((a, key) => {
      a += suppliersBasketState[key].products.length;
      return a;
    }, 0);

  /*  const basketState = useSelector(
    state => state.sessionReducer.basket,
    shallowEqual
  );

  const basketCountState = basketState && basketState.itemsCount;
 */
  const navCatsState = useSelector(
    state => state.menuReducer.navCats,
    shallowEqual
  );
  const languageState = useSelector(
    state => state.mainReducer.lang,
    shallowEqual
  );
  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  const loginNameState = useSelector(
    state => state.loginReducer.loginName,
    shallowEqual
  );

  //#region screen width listener starts
  let initialMobile;
  if (typeof window !== "undefined") {
    initialMobile = window.innerWidth;
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'basket-popover' : undefined;

  const [currentScreenWidth, setCurrentScreenWidth] = useState(initialMobile);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setCurrentScreenWidth(window.innerWidth);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  let isMobile;
  const mobileSize = 768;
  useEffect(() => {
    if (currentScreenWidth > mobileSize) {
      isMobile = false;
    } else {
      isMobile = true;
    }
    dispatch(handleMobileOrDesktop({ isMobile, currentScreenWidth }));
  }, [currentScreenWidth]);

  //#endregion screen width listener starts

  let name;

  const toggleDrawerMini = (side, open) => event => {
    if (event.key === "Tab" || event.key === "Shift") {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div role="presentation" onClick={toggleDrawerMini(side, false)}>
      <MiniCart close={() => toggleDrawerMini(side, false)} />
    </div>
  );

  const [navMenuOpen, setNavMenuOpen] = useState(false);

  const toggleDrawer = event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setNavMenuOpen(!navMenuOpen);
  };

  // const toggleDrawersearch = () => event => {
  //   if (
  //     event &&
  //     event.type === "keydown" &&
  //     (event.key === "Tab" || event.key === "Shift")
  //   ) {
  //     return;
  //   }

  //   setNavMenuOpen(!navMenuOpen);
  // };

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

  const handleOpenModalToChangeDistance = () => {
    const button = document.getElementById("locationChangeBtn");
    button.click();
  };

  const handleSearch = () => {
    setSearchFlag(prev => !prev)
  }

  const renderMyCartTextOrTheSumOfTheCart = () => {
    if (suppliersBasketCountState > 0) {
      let sumOfAllProducts = Object.keys(suppliersBasketState).reduce(
        (a, key) => {
          a += suppliersBasketState[key].products.reduce((acc, product) => {
            acc += product.price * product.qty;
            return acc;
          }, 0);
          return a;
        },
        0
      );

      return (
        <FormattedNumber
          value={sumOfAllProducts / priceConvert}
          style="currency"
          currency={currency}
        >
          {value => <b style={{ fontSize: "18px" }}>{value}</b>}
        </FormattedNumber>
      );
    }
    return translate("js.header.cart");
  };
  return (
    <>

      {/* <nav
        className="nav-extended"
        style={{ background: "none", boxShadow: "0px 0px 0px #00000057", padding: "0px 0px" }}
      >
        <div className="nav-wrapper">
          <div className="header-container" style={{ height: "auto" }}>
            {isMobileState ? (
              <React.Fragment>
                <div className="icon-container">
                  <div className="icon-wrapper">
                    <i
                      id="mobile-nav-icon"
                      open={navMenuOpen}
                      className="material-icons mobile-nav-icon"
                      onClick={() => {
                        toggleDrawer();
                      }}
                    >
                      <span></span>
                    </i>
                  </div>
                </div>
                <div className="mobile-nav-bar-outer-container">
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
                            <SearchBarMobile navMenuOpen={navMenuOpen} />
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

                          {data.map(cat => {
                            let catName = cat.description.replace("Our Store", "Our Stores");
                            let tempUrl = cat.URL;
                            tempUrl = tempUrl;

                            tempUrl = tempUrl.replace(
                              `${langCode}/shop`,
                              "shop"
                            );

                            tempUrl = tempUrl.replace(`shop`, "").replace("mall-map", "interactive-mall-map");
                            return (
                              <li key={cat.cid}>
                                <Link
                                  onClick={() =>
                                    handleCategoryChange(
                                      cat.cid,
                                      catName,
                                      [[catName, cat.cid, cat.URL]],
                                      ""
                                    )
                                  }
                                  className="menuCat"
                                  to={tempUrl}
                                >

                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: catName.replace("Shopping", "Shop")
                                    }}
                                  />
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                        <ul className="staticMenu">
                          <li>
                            <a
                              href="https://www.avetticommerce.com/"
                              target="_blank"
                            >
                              {translate("vm.footer_about").toUpperCase()}
                            </a>
                          </li>

                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ) : null}

            <div className="logo-container">
              <Link to={"/"} className="brand-logo logo-i">
                <div className="menu-logo-wrapper">
                  <img
                    src={logo}
                    className="img-responsive"
                    alt="Mall Marketplace Logo"
                  />
                </div>
              </Link>
            </div>

            
          </div>
        </div>
      </nav> */}

      {/* <div className="mainhead">
        <div className="header-container" style={{ height: "auto" }}>
         */}
        <div class="topBarInfo mainhead">
          <div class="topBarInfo-contaner">
            <div class="topBarInfoLeft">
            <div className="logo-container">
              <Link to={"/"} className="brand-logo logo-i">
                <div className="menu-logo-wrapper">
                  <img
                    src="https://ik.imagekit.io/ofb/sunflow/sunflow-solar-logo-white-2x-300x91_1_eoFc8evOaZ.png?updatedAt=1630048474361"
                    className="img-responsive"
                    alt="Mall Marketplace Logo"
                  />
                </div>
              </Link>
            </div>
              </div>
            <div class="topBarInfoRight">
              <ul>
                { isMobileState ? <li><Link href="#contactForm"><img src="https://ik.imagekit.io/ofb/sunflow/envelope_1GLoo24ja.png" /></Link></li> : 
                  
                  <li><Link href="#contactForm">Consult a specialist</Link></li>   }              
              </ul>
            </div></div></div>   


    </>
  );
}
