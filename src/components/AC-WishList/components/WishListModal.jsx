import React, { useEffect, useContext } from "react"
import { useSelector, shallowEqual, useDispatch } from "react-redux"

import { PROJECT_LINK, PREVIEW } from "../../../project-config"
import Modal from "../../../shared/components/UIElements/Modal"
import classes from "../Styles/WishList.module.css"
import { toggleWishListAction } from "../../../redux/actions/wishListActions.js"
import { FormattedNumber } from "react-intl"
import { I18nContext } from "../../../i18n/index"
import { Link, navigate } from "gatsby"

export default function WishListModal(props) {
  const dispatch = useDispatch()
  const { translate, priceConvert, currency, langCode } = useContext(
    I18nContext
  )

  const wishListState = useSelector(
    (state) => state.wishListReducer.wishlist,
    shallowEqual
  )

  useEffect(() => {
    // add event listener for keydown once the component is mounted
    document.addEventListener("keydown", escKeyPressed, false)
  }, [])

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

  const escKeyPressed = (e) => {
    if (e.keyCode === 27) {
      props.close()
    }
  }

  const handleClickOnProductCard = (event, url) => {
    console.info(`URL:${url}`)

    if (url.substring(0, 5).includes(`${langCode}/`)) {
      url = url.replace(`${langCode}`, "")
    }
    if (url.includes("/product/")) {
      url = url.replace("/product/", "")
    } else {
      url = url.replace("product/", "")
    }

    const shouldIncludeSlash = () => {
      if (url.charAt(0) == "/") {
        return ""
      } else {
        return "/"
      }
    }

    props.close()
    navigate(
      langCode !== "en"
        ? PREVIEW + "/" + langCode + shouldIncludeSlash() + url
        : PREVIEW + shouldIncludeSlash(url) + url
    )
  }

  return (
    <Modal
      className="main-wishlist"
      show={props.show}
      onCancel={props.close}
      noHeader
      noFooter
    >
      <form name="wishlist">
        <i
          className={classes.wishlistIconClose + " material-icons"}
          onClick={props.close}
        >
          close
        </i>
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

            <tbody className="wishlist-table-body scroll-bar-thin-style">
              {wishListState.map(
                ({ id, title, desc, currency_sign, image, price, url }) => {
                  url = url.replace("product/", "")
                  let description = desc && desc.replace('\\"', '"')
                  return (
                    <tr key={id} className="wishlist-table-row">
                      <td className={classes[`wishlist-column-product`]}>
                        <div
                          className="item_img"
                          onClick={(event) =>
                            handleClickOnProductCard(event, url)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            className="img-wish"
                            id="js-item-cimage-201464"
                            style={{ height: "50px" }}
                            src={image}
                            alt={`${title} Image`}
                          />
                        </div>
                        <div className="item-desc">
                          <p style={{ textAlign: "left" }}>
                            <a href={PROJECT_LINK + "/" + url}>{description}</a>
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
    </Modal>
  )
}
