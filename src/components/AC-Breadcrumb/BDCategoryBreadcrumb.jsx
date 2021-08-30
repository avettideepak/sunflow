import React, { useContext } from "react"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { PREVIEW } from "../../project-config.js"
import { Link } from "gatsby"

import {
  fetchCategoryFromRender,
  changeCategoryName,
} from "../../redux/actions/categoryActions"

import { I18nContext } from "../../i18n/index"
import classes from "./Styles/BDCategoryBreadcrumb.module.css"

const CategoryBreadcrumb = () => {
  const dispatch = useDispatch()
  const { langCode, translate } = useContext(I18nContext)

  const navCatsState = useSelector(
    state => state.menuReducer.navCats,
    shallowEqual
  )

  const categoryParentsNameState = useSelector(
    state => state.categoryReducer.parents,
    shallowEqual
  )

  const handleBreadCrumbClicked = (cid, cat, parents) => {
    let category = navCatsState
    // console.info("ozanabba", cid, cat, parents);
    for (let parent of parents) {
      category = category.childs.filter(c => {
        if (c.cid === parent[1]) {
          /*parent's cid equals cid */
          return true
        }
      })[0]
    }

    dispatch(changeCategoryName(cat, parents))
    dispatch(fetchCategoryFromRender(cid, cat, parents, "", category))
  }

  return (
    <div className={classes.breadcrumbs}>
      <ol
        className={classes.breadcrumbsOl}
        vocab="https://schema.org/"
        typeof="BreadcrumbList"
      >
        <li
          property="itemListElement"
          typeof="ListItem"
          style={{ color: "#a5a5a5" }}
        >
          <Link
            className="text-link"
            to={langCode === "en" ? `/` : `/${langCode}`}
            property="item"
            typeof="WebPage"
          >
            <span property="name">{`Home / `}</span>
          </Link>
          <meta property="position" content="1"></meta>
        </li>
        {categoryParentsNameState.length > 0
          ? categoryParentsNameState.map((parent, index) => {
              let anotherArray = []
              for (let i = 0; i <= index; i++) {
                anotherArray.push(categoryParentsNameState[i])
              }
              // console.error("MON---", categoryParentsNameState[index][2]);
              return (
                <li
                  style={{ marginLeft: "3px" }}
                  property="itemListElement"
                  typeof="ListItem"
                >
                  <Link
                    key={index}
                    className="text-link"
                    to={
                      PREVIEW === ""
                        ? "/" + categoryParentsNameState[index][2]
                        : PREVIEW + "/" + categoryParentsNameState[index][2]
                    }
                    onClick={e =>
                      handleBreadCrumbClicked(
                        parent[1],
                        parent[0],
                        anotherArray
                      )
                    }
                    property="item"
                    typeof="WebPage"
                  >
                    <span
                      // className={
                      //   index == categoryParentsNameState.length - 1
                      //     ? "final_look last_breadcrumb "
                      //     : "home_look"
                      // }
                      property="name"
                      dangerouslySetInnerHTML={{ __html: parent[0] }}
                    ></span>
                    {index == categoryParentsNameState.length - 1 ? "" : " / "}
                  </Link>
                  <meta property="position" content={index + 2}></meta>
                </li>
              )
            })
          : null}
      </ol>
    </div>
  )
}

export default CategoryBreadcrumb
