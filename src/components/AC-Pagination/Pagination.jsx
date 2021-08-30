import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useDispatch } from "react-redux";

import {
  dispatchCurrentPage,
  nextPage
} from "../../redux/actions/paginationActions.js";

import { I18nContext } from "../../i18n/index";

export default function Pagination(props) {
  const dispatch = useDispatch();
  const { translate } = React.useContext(I18nContext);

  const pagesState = useSelector(
    state => state.categoryReducer.pages,
    shallowEqual
  );
  const currentPageState = useSelector(
    state => state.categoryReducer.currentPage,
    shallowEqual
  );
  const scroolPageState = useSelector(
    state => state.categoryReducer.scroolPage,
    shallowEqual
  );

  const cidState = useSelector(
    state => state.categoryReducer.cidN,
    shallowEqual
  );

  const loadingState = useSelector(
    state => state.categoryReducer.loading,
    shallowEqual
  );

  const renderFirstAndLastButtons = (
    <React.Fragment>
      <li className="first buttonPageLeft" onClick={() => handleNextPage(1)}>
        {translate("js.category.pagination.first")}
      </li>
      <li className="prev" onClick={() => handleNextPage(currentPageState - 1)}>
        {`< ${translate("js.category.pagination.previous")}`}
      </li>
    </React.Fragment>
  );

  const handleNextPage = page => {
    if (scroolPageState < pagesState.length || page != 0) {
      dispatch(dispatchCurrentPage(page));
      dispatch(nextPage(page, cidState, false));
    } else {
      console.info("End of the page");
    }
  };

  return (
    <React.Fragment>
      {!loadingState && pagesState.length > 1 ? (
        <div
          style={{ float: "right", width: "auto", fontSize: "15px" }}
          className="pagination-container"
        >
          <ul id="pagination" className="pagination">
            {currentPageState > 1 ? renderFirstAndLastButtons : null}

            {pagesState.map(page => {
              if (
                page <= currentPageState + 5 &&
                page >= currentPageState - 5
              ) {
                return (
                  <li
                    key={page}
                    className={currentPageState == page ? "selected" : ""}
                    onClick={() => handleNextPage(page)}
                    style={
                      currentPageState == 1 && page == 1
                        ? { borderLeft: "unset" }
                        : null
                    }
                  >
                    {page}
                  </li>
                );
              }
            })}

            {currentPageState == pagesState[pagesState.length - 1] ? null : (
              <React.Fragment>
                <li
                  className="next"
                  onClick={() => handleNextPage(currentPageState + 1)}
                >
                  {`${translate("js.category.pagination.next")} >`}
                </li>
                <li
                  className="last"
                  onClick={() => handleNextPage(pagesState.length)}
                >
                  {translate("js.category.pagination.last")}
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      ) : null}
    </React.Fragment>
  );
}
