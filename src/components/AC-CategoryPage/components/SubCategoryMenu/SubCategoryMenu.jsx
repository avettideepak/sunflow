import React, { useContext } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Link } from "gatsby";
import { PREVIEW } from "../../../../project-config.js";

import { I18nContext } from "../../../../i18n/index";
import {
  fetchCategoryFromRender,
  changeCategoryName
} from "../../../../redux/actions/categoryActions";
import "./SubCategoryMenu.css";
import { useLocation } from "@reach/router";

const SubCategoryMenu = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { langCode, translate } = useContext(I18nContext);

  const [showMoreOptions, setShowMoreOptions] = React.useState(false);

  const [expandedSubNavs, setExpandedSubNavs] = React.useState([]);

  const navCats = useSelector(state => state.menuReducer.navCats, shallowEqual);

  const categoryParentsNameState = useSelector(
    state => state.categoryReducer.parents,
    shallowEqual
  );

  const handleCategoryChange = (cid, cat, parents, longdesc) => {
    /*  const category = navCats.childs.filter(c => {
      let name = c.name;
      if (name.includes("&amp;")) {
        name = name.replace("&amp;", "&");
      }

      return name === cat;
    })[0];

    console.info("handleCatChange2", cid, cat, parents, category);

    dispatch(changeCategoryName(cat, parents, longdesc));
    dispatch(fetchCategoryFromRender(cid, cat, parents, "", category)); */
  };

  const handleExpandIconClicked = url => {
    if (expandedSubNavs.includes(url))
      setExpandedSubNavs([...expandedSubNavs.filter(nav => nav !== url)]);
    else setExpandedSubNavs([...expandedSubNavs, url]);
  };

  const renderChildsOfSub = (childs, expanded) => {
    if (childs.length > 0) {
      return (
        <div className={`sub-nav-childs-wrapper${expanded ? ` expanded` : ``}`}>
          {childs.map(child => {
            let tempUrl = child.URL;
            let langTemp = tempUrl.includes(langCode) ? "" : `${langCode}/`;
            let catName = child.name.replace("&amp;", "&");
            let _expanded = expandedSubNavs.includes(child.URL);
            let haveChilds = child.childs.length > 0;

            return (
              <div className="sub-nav-child-wrapper" key={child.cid}>
                <div className="sub-nav-child-icon-link-wrapper">
                  {renderExpandIcon(child.URL, haveChilds)}
                  <Link
                    to={
                      langCode !== "en"
                        ? PREVIEW + "/" + langTemp + tempUrl
                        : PREVIEW + "/" + tempUrl
                    }
                  >
                    {catName}
                  </Link>
                </div>
                {renderChildsOfSub(child.childs, _expanded)}
              </div>
            );
          })}
        </div>
      );
    } else {
      return null;
    }
  };

  const renderExpandIcon = (URL, haveChilds) => {
    if (haveChilds) {
      return (
        <i
          onClick={() => handleExpandIconClicked(URL)}
          className="material-icons sub-nav-child-toggle-icon no-select"
        >
          {expandedSubNavs.includes(URL) ? `remove` : `add`}
        </i>
      );
    } else {
      return <i className="placeholder-icon no-select"></i>;
    }
  };

  const currentCategoryChilds = navCats.childs.find(cat =>
    location.pathname.toLowerCase().includes(cat.URL)
  ).childs;

  console.info(expandedSubNavs);

  if (!location.pathname.includes("search")) {
    if (currentCategoryChilds.length > 0) {
      const subcategory = currentCategoryChilds;
      return (
        <div className="subcategory-container">
          <h4 className="widget-title">Categories</h4>
          {Object.keys(subcategory).length > 0 ? (
            <ul className="category-childs-list">
              {Object.keys(subcategory).length > 0 &&
                subcategory
                  .slice(0, 5)
                  .map(({ name, URL, cid, longdesc, childs }) => {
                    URL = URL.replace("SLighting/", "");

                    let tempUrl = URL;
                    let langTemp = tempUrl.includes(langCode)
                      ? ""
                      : `${langCode}/`;

                    let catName = name.replace("&amp;", "&");
                    let parents = [
                      ...categoryParentsNameState,
                      [catName, cid, URL]
                    ];
                    let expanded = expandedSubNavs.includes(URL);
                    let haveChilds = childs.length > 0;

                    return (
                      <li key={cid} className="sub-menu-list">
                        <div className="sub-nav-child-icon-link-wrapper">
                          {renderExpandIcon(URL, haveChilds)}
                          <Link
                            onClick={() =>
                              handleCategoryChange(
                                cid,
                                catName,
                                parents,
                                longdesc
                              )
                            }
                            to={
                              langCode !== "en"
                                ? PREVIEW + "/" + langTemp + tempUrl
                                : PREVIEW + "/" + tempUrl
                            }
                          >
                            {catName}
                          </Link>
                        </div>
                        {renderChildsOfSub(childs, expanded)}
                      </li>
                    );
                  })}
              {Object.keys(subcategory).length > 5 &&
                showMoreOptions &&
                subcategory
                  .slice(5, subcategory.length)
                  .map(({ name, URL, cid, longdesc, childs }) => {
                    URL = URL.replace("SLighting/", "");

                    let tempUrl = URL;
                    let langTemp = tempUrl.includes(langCode)
                      ? ""
                      : `${langCode}/`;

                    let catName = name.replace("&amp;", "&");
                    let parents = [
                      ...categoryParentsNameState,
                      [catName, cid, URL]
                    ];

                    let expanded = expandedSubNavs.includes(URL);
                    let haveChilds = childs.length > 0;

                    return (
                      <li key={cid} className="sub-menu-list">
                        <div className="sub-nav-child-icon-link-wrapper">
                          {renderExpandIcon(URL, haveChilds)}
                          <Link
                            onClick={() =>
                              handleCategoryChange(
                                cid,
                                catName,
                                parents,
                                longdesc
                              )
                            }
                            to={
                              langCode !== "en"
                                ? PREVIEW + "/" + langTemp + tempUrl
                                : PREVIEW + "/" + tempUrl
                            }
                          >
                            {catName}
                          </Link>
                        </div>
                        {renderChildsOfSub(childs, expanded)}
                      </li>
                    );
                  })}
            </ul>
          ) : null}

          {Object.keys(subcategory).length > 5 ? (
            <button
              className="subcategory-show-more-button"
              onClick={() => setShowMoreOptions(!showMoreOptions)}
            >
              {showMoreOptions ? "LESS..." : "MORE..."}
              <i className="material-icons subcategory-show-more-icon">
                {showMoreOptions ? `keyboard_arrow_up` : `keyboard_arrow_down`}
              </i>
            </button>
          ) : null}
        </div>
      );
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export default SubCategoryMenu;
