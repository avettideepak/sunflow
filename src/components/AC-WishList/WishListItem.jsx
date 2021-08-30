import React, { useEffect, useContext } from "react"
import { Link } from "gatsby"
import { useSelector, shallowEqual } from "react-redux"
import { useDispatch } from "react-redux"
import LazyLoad from "react-lazyload"

import { PROJECT_LINK } from "../../project-config"

import {
  toggleWishListAction,
  addFunctionWishList,
} from "../../redux/actions/wishListActions.js"

import { FormattedNumber } from "react-intl"

import { I18nContext } from "../../i18n/index"

export default function WishListItem(props) {
  const dispatch = useDispatch()
  const { translate, currency, priceConvert } = useContext(I18nContext)

  const wishListState = useSelector(
    (state) => state.wishListReducer.wishlist,
    shallowEqual
  )

  const toggleWish = (e, id, title, desc, currency_sign, image, price, url) => {
    e.preventDefault()
    dispatch(
      toggleWishListAction(
        id,
        title,
        desc,
        currency_sign,
        image,
        price,
        url,
        wishListState
      )
    )
  }

  useEffect(() => {
    if (typeof localStorage !== undefined) {
      let storedWishListString = localStorage.getItem("wishList")
      let storedWishListObject = JSON.parse(storedWishListString)
      if (storedWishListObject != null)
        dispatch(addFunctionWishList([...storedWishListObject]))
    }
  }, [])

  useEffect(() => {
    if (typeof localStorage !== undefined) {
      localStorage.setItem("wishList", JSON.stringify(wishListState))
    }
  }, [wishListState])

  return (
    <React.Fragment>
      <div
        className="main-wishlist"
        style={{ backgroundColor: "white", position: "relative" }}
      >
        <span
          style={{
            color: "black",
            fontSize: "30px",
            fontWeight: "normal",
            cursor: "pointer",
            width: "20px",
            right: "0px",
            top: "0px",
            position: "absolute",
            zIndex: "10000",
          }}
          onClick={() => props.close()}
        >
          ×
        </span>
        <form name="wishlist">
          <div
            id="tableWish"
            className="col-lg-12 col-12"
            style={{ overflowX: "auto", paddingTop: "25px" }}
          >
            <table className="twint table">
              <thead className="wishlist-table-header">
                <tr className="wishlist-header-row">
                  <th
                    style={{
                      fontWeight: 700,
                      fontSize: "17px !important",
                      letterSpacing: "1px",
                      textAlign: "left",
                    }}
                  >
                    {translate("js.header.wishlist.product")}
                  </th>
                  <th
                    style={{
                      fontWeight: 700,
                      fontSize: "17px !important",
                      letterSpacing: "1px",
                    }}
                  >
                    {translate("js.header.wishlist.code")}
                  </th>
                  <th
                    style={{
                      fontWeight: 700,
                      fontSize: "17px !important",
                      letterSpacing: "1px",
                    }}
                  >
                    {translate("js.header.wishlist.price")}
                  </th>
                </tr>
              </thead>

              <tbody className="wishlist-table-body">
                {wishListState.map(
                  ({ id, title, desc, currency_sign, image, price, url }) => {
                    let description = desc && desc.replace('\\"', '"')
                    return (
                      <tr className="wishlist-table-row">
                        <td className="wishlist-column-product">
                          <div className="item_img">
                            <Link to={"/" + url}>
                              <img
                                className="img-wish"
                                id="js-item-cimage-201464"
                                style={{ height: "50px" }}
                                src={image}
                                alt={`${title} Image`}
                              />
                            </Link>
                          </div>
                          <div className="item-desc">
                            <p style={{ textAlign: "left" }}>
                              <Link to={url}>{description}</Link>
                              <br />
                            </p>
                          </div>
                        </td>
                        <td className="ac wishlist-column-code">
                          <p>{id}</p>
                        </td>
                        <td
                          style={{ position: "relative" }}
                          className="wishlist-column-price"
                        >
                          <p
                            style={{
                              fontWeight: "600",
                              whiteSpace: "nowrap",
                            }}
                          >
                            <FormattedNumber
                              value={
                                Number(
                                  `${price.value.integer}.${price.value.decimal}`
                                ) / priceConvert
                              }
                              style="currency"
                              currency={currency}
                            />
                          </p>
                          <div
                            title={translate("button.DELETE")}
                            className="remove-text"
                            onClick={(e) =>
                              toggleWish(
                                e,
                                id,
                                title,
                                desc,
                                currency_sign,
                                image,
                                price,
                                url
                              )
                            }
                            style={{
                              cursor: "pointer",
                              position: "relative",
                            }}
                          >
                            <i id={id} className="material-icons">
                              delete_forever
                            </i>
                          </div>
                        </td>
                      </tr>
                    )
                  }
                )}
              </tbody>
              {wishListState.length == 0 ? (
                <React.Fragment>
                  <tbody>
                    <tr>
                      <td>
                        <div className="item-desc">
                          <p
                            style={{
                              textAlign: "left",
                              color: "black",
                              fontWeight: "900",
                            }}
                          >
                            <p> {translate("js.header.wishlist.noitems")}</p>
                            <br />
                          </p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </React.Fragment>
              ) : null}

              <tfoot>
                <tr>
                  <td className="ac " colSpan={5}>
                    <div className="col-md-12" />
                    <div></div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </form>
      </div>
    </React.Fragment>
  )
}
