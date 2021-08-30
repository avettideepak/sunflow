import React from "react";
import {
  handleSortBySelectChange,
  sortByParamsChangeState
} from "@/redux/actions/facetActions.js";
import { useSelector, shallowEqual } from "react-redux";
import { useDispatch } from "react-redux";

import { I18nContext } from "@/i18n/index";

export default function SortBy({anchor,toggleDrawer}) {
  const { translate } = React.useContext(I18nContext);

  const dispatch = useDispatch();
  const filterUrlState = useSelector(state => state.facetReducer.filterUrl);

  const sortByParamsState = useSelector(
    state => state.facetReducer.sortByParams,
    shallowEqual
  );

  const urlFilterParamsState = useSelector(
    state => state.facetReducer.urlFilterParams,
    shallowEqual
  );
  const categoryItemsState = useSelector(
    state => state.categoryReducer.categoryItems,
    shallowEqual
  );

  const handleSelectChange = value => {    
    let filterUrl = filterUrlState;
    let plainUrl = "";
    let params = "";

    plainUrl = filterUrl.replace(new RegExp("&sortci=\\w*%20\\w*", "g"), "");

    let url = plainUrl;
    if (value !== "Sort By") {
      url = `${plainUrl}${value}`;
    } else {
      value = "";
    }

    if (urlFilterParamsState.includes("sortci")) {
      params =
        urlFilterParamsState.replace(
          new RegExp("&sortci=\\w*%20\\w*", "g"),
          ""
        ) + value;
    } else {
      params = urlFilterParamsState + value;
    }

    dispatch(handleSortBySelectChange(url, params));
    dispatch(sortByParamsChangeState(value));
    toggleDrawer(anchor,false)
  };

  return (
    <React.Fragment>
      {categoryItemsState.length > 0 ? (
        <div className="SortBtMobile">
          <ul>
            <li className="sortbyName">{translate("js.category.sortby")}</li>
            <li onClick={e => handleSelectChange("&sortci=stitle%20asc")}><i className="im im-icon-A-Z"></i> {translate("js.category.sortby.atoz")}</li>
            <li onClick={e => handleSelectChange("&sortci=newest%20desc")}><i className="im im-icon-Add-Bag"></i> {translate("js.category.sortby.new")}</li>
            <li onClick={e => handleSelectChange("&sortci=price%20desc")}><i className="im im-icon-Turn-Down"></i> {translate("js.category.sortby.hightolow")}</li>
            <li onClick={e => handleSelectChange("&sortci=price%20asc")}><i className="im im-icon-Turn-Up"></i> {translate("js.category.sortby.lowtohigh")}</li>
            <li onClick={e => handleSelectChange("&sortci=topsellers%20asc")}><i className="im im-icon-Full-Cart"></i> {translate("js.category.sortby.popular")}</li>
            <li onClick={e => handleSelectChange("&sortci=orderscount%20asc")}><i className="im im-icon-Reverbnation"></i> {translate("js.category.sortby.bestsell")}</li>
            {/* <li onClick={e => handleSelectChange("&sortci=averagereview%20asc")}><i className="im im-icon-Reverbnation"></i> {translate("js.category.sortby.rating")}</li> */}
          </ul>
        </div>
      ) : null}
    </React.Fragment>
  );
}
