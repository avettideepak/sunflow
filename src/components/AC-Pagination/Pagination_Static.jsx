import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "gatsby";
import {
  dispatchCurrentPage,
  nextPage
} from "../../redux/actions/paginationActions.js";

import { I18nContext } from "../../i18n/index";
import classes from "./Styles/Pagination.module.css";

const Pagination = ({ data, pageContext }) => {
  const dispatch = useDispatch();
  const { translate } = React.useContext(I18nContext);
  const pagesState = Array.from({ length: pageContext.pageCount }).map(
    (i, index) => index + 1
  );

  const currentPageState = pageContext.currentPage;

  const scroolPageState = useSelector(
    state => state.categoryReducer.scroolPage,
    shallowEqual
  );

  const cidState = data.cid;

  const loadingState = useSelector(
    state => state.categoryReducer.loading,
    shallowEqual
  );

  const renderFirstAndLastButtons = (
    <React.Fragment>
      <Link to={"/" + data.url.replace(`${currentPageState}`, "")}>
        <span className={`${classes.paginationBtn} ${classes.first} buttonPageLeft`}>
          {translate("js.category.pagination.first")}
        </span>
      </Link>
      <Link
        to={
          currentPageState > 2
            ? "/" +
              data.url.replace(`${currentPageState}`, "") +
              (currentPageState - 1) +
              "/"
            : "/" + data.url.replace(`${currentPageState}`, "")
        }
      >
        <span className={`${classes.paginationBtn} ${classes.prev}`}>
          <i className="material-icons view-more-icon">keyboard_arrow_left</i>
        </span>
      </Link>
    </React.Fragment>
  );

  const handleNextPage = page => {
    if (scroolPageState < pagesState.length || page != 0) {
      dispatch(dispatchCurrentPage(page));
      dispatch(nextPage(page, cidState, false));
    } else {
      console.error("End of the page");
    }
  };

  return (
    <React.Fragment>
      {!loadingState && pagesState.length > 1 ? (
        <div
          className="pagination-container"
        >
          <div id="pagination" className={classes.pagination}>
            {currentPageState > 1 ? renderFirstAndLastButtons : null}

            {pagesState.map(page => {
              if (
                page <= currentPageState + 5 &&
                page >= currentPageState - 5
              ) {
                return (
                  <Link
                    key={page}
                    to={
                      currentPageState !== 1
                        ? "/" +
                          data.url.replace(`${currentPageState}`, "") +
                          `${page === 1 ? "" : page + "/"}`
                        : "/" +
                          data.url +
                          "/" +
                          `${page !== 1 ? page + "/" : ""}`
                    }
                  >
                    <span
                      key={page}
                      className={`${classes.paginationBtn} ${
                        currentPageState == page ? classes.selected : ""
                      }`}
                      style={
                        currentPageState == 1 && page == 1
                          ? { borderLeft: "unset" }
                          : null
                      }
                    >
                      {page}
                    </span>
                  </Link>
                );
              }
            })}

            {currentPageState == pagesState[pagesState.length - 1] ? null : (
              <React.Fragment>
                <Link
                  to={
                    currentPageState !== 1
                      ? "/" +
                        data.url.replace(`${currentPageState}`, "") +
                        (currentPageState + 1) +
                        "/"
                      : "/" +
                        data.url.replace(`${currentPageState}`, "") +
                        "/" +
                        (currentPageState + 1) +
                        "/"
                  }
                >
                  <span className={`${classes.paginationBtn} ${classes.next}`}>
                    <i className="material-icons view-more-icon">
                      keyboard_arrow_right
                    </i>
                  </span>
                </Link>
                <Link
                  to={
                    currentPageState !== 1
                      ? "/" +
                        data.url.replace(`${currentPageState}`, "") +
                        pageContext.pageCount +
                        "/"
                      : "/" +
                        data.url.replace(`${currentPageState}`, "") +
                        "/" +
                        pageContext.pageCount +
                        "/"
                  }
                >
                  <span className={`${classes.paginationBtn} ${classes.last}`}>
                    {translate("js.category.pagination.last")}
                  </span>
                </Link>
              </React.Fragment>
            )}
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default Pagination;
