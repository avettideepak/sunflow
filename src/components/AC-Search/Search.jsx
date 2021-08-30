import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { PREVIEW } from "../../project-config.js";

import Category from "../AC-CategoryPage/Category";

import {
  fetchCategoryFromDirectUrl,
  fetchCategoryFromRender,
  changeKeyword,
  changeCategoryName
} from "../../redux/actions/categoryActions.js";

import { I18nContext } from "../../i18n";
import { useLocation } from "@reach/router";

export default function Search() {
  const { translate, langCode } = useContext(I18nContext);
  const dispatch = useDispatch();
  const location = useLocation();
  const navCategoryState = useSelector(
    state => state.menuReducer.navCategory,
    shallowEqual
  );

  let keyword = location.pathname;
  if (location.pathname.includes("search/"))
    keyword = location.pathname.split(`search/`)[1];

  useEffect(() => {
    dispatch(changeKeyword(keyword));
    // dispatch(changeCategoryName(keyword, [], "search", ""));
    dispatch(fetchCategoryFromDirectUrl());
  }, [keyword]);

  return <Category />;
}
