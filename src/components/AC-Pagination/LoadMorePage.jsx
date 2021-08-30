import React from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import classes from "./Styles/LoadMorePage.module.css";
import { SET_LOAD_MORE_PAGE } from "../../redux/types";
import {
  nextPage,
  dispatchScroolPage
} from "../../redux/actions/paginationActions";

const LoadMorePage = () => {
  const dispatch = useDispatch();

  const loadMorePageState = useSelector(
    state => state.categoryReducer.loadMorePage,
    shallowEqual
  );
  const loadingBottomState = useSelector(
    state => state.categoryReducer.loadingBottom,
    shallowEqual
  );
  const cidState = useSelector(
    state => state.categoryReducer.cidN,
    shallowEqual
  );

  const pagesState = useSelector(
    state => state.categoryReducer.pages,
    shallowEqual
  );

  const scroolPageState = useSelector(
    state => state.categoryReducer.scroolPage,
    shallowEqual
  );

  if (loadMorePageState || loadingBottomState) {
    return null;
  }

  const handleNextPage = page => {
    if (scroolPageState < pagesState.length || page != 0) {
      dispatch(dispatchScroolPage(page));
      dispatch(nextPage(page, cidState, true));
    } else {
      console.info("End of the page");
    }
  };

  const handleLoadMoreClicked = () => {
    dispatch({ type: SET_LOAD_MORE_PAGE, payload: true });

    handleNextPage(scroolPageState + 1);
  };
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <span
          onClick={handleLoadMoreClicked}
          className={[classes.btn, "no-select"].join(" ")}
        >
          Load More...
        </span>
      </div>
    </div>
  );
};

export default LoadMorePage;
