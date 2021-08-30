import React from "react"
import { useSelector, shallowEqual } from "react-redux"
import noItemsImg from "../../../../assets/img/noitems.png"
import { Link } from "gatsby"
import classes from "./Styles/NoItems.module.css"
import Loading from "../../../AC-Loading/Loading"

export default function NoItems() {
  const noItemFoundState = useSelector(
    (state) => state.categoryReducer.noItemFound,
    shallowEqual
  )

  return (
    <React.Fragment>
      <div className={classes.NoItems}>
        {noItemFoundState ? (
          <Link to="/" className={classes["no-items-link"]}>
            <img src={noItemsImg} style={{ width: "100%" }} />
          </Link>
        ) : (
          <Loading />
        )}
      </div>
    </React.Fragment>
  )
}
