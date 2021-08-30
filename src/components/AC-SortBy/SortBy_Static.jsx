import React from "react";
import {
  handleSortBySelectChange,
  sortByParamsChangeState
} from "../../redux/actions/facetActions.js";
import { useSelector, shallowEqual } from "react-redux";
import { useDispatch } from "react-redux";

import { I18nContext } from "../../i18n/index";

export default function SortBy() {
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
  };

  return (
    <React.Fragment>
      {categoryItemsState && categoryItemsState.length > 0 ? (
        <div>
          <select
            aria-label="Sort By"
            id="sortby"
            className="form-control sort-decoration"
            name="sortby"
            onChange={e => handleSelectChange(e.target.value)}
            value={
              urlFilterParamsState.includes(sortByParamsState)
                ? sortByParamsState
                : "Sort By"
            }
          >
            <option>{translate("js.category.sortby")}</option>
            <option value="&sortci=stitle%20asc">
              {translate("js.category.sortby.atoz")}
            </option>
            <option value="&sortci=newest%20desc">
              {translate("js.category.sortby.new")}
            </option>
            <option value="&sortci=price%20asc">
              {translate("js.category.sortby.lowtohigh")}
            </option>
            <option value="&sortci=price%20desc">
              {translate("js.category.sortby.hightolow")}
            </option>
            <option value="&sortci=topsellers%20asc">
              {translate("js.category.sortby.popular")}
            </option>
            <option value="&sortci=orderscount%20desc">
              {translate("js.category.sortby.bestsell")}
            </option>
            {/* <option value="&sortci=averagereview%20desc">
              {translate("js.category.sortby.rating")}
            </option> */}
          </select>
        </div>
      ) : null}
    </React.Fragment>
  );
}
