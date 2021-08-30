import React, { useState, useEffect } from "react"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { addRecentItems } from "../../redux/actions/recentlyViewedItemsActions.js"
import Grid from "@material-ui/core/Grid"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import ItemCard from "../AC-CategoryPage/components/ItemCard/ItemCard.jsx"
import { toggleWishListAction } from "../../redux/actions/wishListActions.js"
import { I18nContext } from "../../i18n/index"
const RecentlyViewedItems = () => {
  const { translate } = React.useContext(I18nContext)

  const RECENT_VIEW_ITEMS_LOCALSTORE_KEY = `recentViewItems`

  const dispatch = useDispatch()

  const recentViewItemsState = useSelector(
    (state) => state.recentlyViewedItemsReducer.recentlyViewedItemsList,
    shallowEqual
  )

  const [recentViewItemsFiltered, setRecentViewItemsFiltered] = useState([])

  const [recentlyViewedCollapsed, setRecentlyViewedCollapsed] = useState(true)

  const isMobileState = useSelector(
    (state) => state.mainReducer.isMobile,
    shallowEqual
  )

  const wishListState = useSelector(
    (state) => state.wishListReducer.wishlist,
    shallowEqual
  )

  // recently viewed items
  useEffect(() => {
    if (typeof localStorage !== undefined) {
      let storedRecentItemsString = localStorage.getItem(
        RECENT_VIEW_ITEMS_LOCALSTORE_KEY
      )
      let storedRecentItemsObject = JSON.parse(storedRecentItemsString)

      if (storedRecentItemsObject != null)
        dispatch(addRecentItems([...storedRecentItemsObject]))
    }
  }, [])

  useEffect(() => {
    if (typeof localStorage !== undefined) {
      console.info("--faf", recentViewItemsState)
      localStorage.setItem(
        RECENT_VIEW_ITEMS_LOCALSTORE_KEY,
        JSON.stringify(recentViewItemsState)
      )
      setRecentViewItemsFiltered([
        ...recentViewItemsState.reverse().filter((v, i) => i != 0),
      ])
    }
  }, [recentViewItemsState])

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

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1600 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 1600, min: 1360 },
      items: 5,
    },
    mdDesktop: {
      breakpoint: { max: 1360, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 768, min: 520 },
      items: 2,
    },
    xsMobile: {
      breakpoint: { max: 520, min: 0 },
      items: 1,
    },
  }

  const renderPlaceholderCards = () => {
    return (
      <Carousel
        swipeable={false}
        draggable={true}
        showDots={false}
        responsive={responsive}
        ssr={false} // means to render carousel on server-side.
        infinite={true}
        autoPlay={isMobileState ? true : false}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["mobile", "xsMobile"]}
        // deviceType={this.props.deviceType}
        dotListClass="custom-dot-list-style"
      >
        {Array(6)
          .fill(0, 0, 6)
          .map((v, i) => (
            <Grid
              item
              className="item-card-item"
              xs={12}
              style={{ padding: "0 15px" }}
            >
              <div
                className="placeholder-item-card-wrapper"
                style={{ boxShadow: "0px 0px 1px 0px #c8c8c8" }}
              >
                <div
                  style={{
                    backgroundColor: "#fff",
                    height: "260px",
                  }}
                ></div>
                <div>
                  <div
                    style={{
                      backgroundColor: "#f5f5f5",
                      height: "40px",
                    }}
                  ></div>
                </div>
              </div>
            </Grid>
          ))}
      </Carousel>
    )
  }

  return (
    <div className="recently-viewed-items-container">
      {recentViewItemsState.length > 1 ? (
        <React.Fragment>
          <h1
            className="no-select recently-viewed-title"
            onClick={() => setRecentlyViewedCollapsed(!recentlyViewedCollapsed)}
          >
            {translate("recentlyViewed.title")}
            <i className="material-icons">
              keyboard_arrow_{recentlyViewedCollapsed ? "down" : "up"}
            </i>
          </h1>
          <div
            className={`recently-viewed-items-wrapper${
              recentlyViewedCollapsed ? ` active` : ``
            }`}
            aria-expanded={recentlyViewedCollapsed}
          >
            {recentViewItemsFiltered.map((item) => (
              <div key={item.id} className="owl-item col-xs-12">
                <ItemCard
                  key={item.id}
                  itemCard={item}
                  toggleWish={toggleWish}
                  wishListState={wishListState}
                />
              </div>
            ))}
          </div>
        </React.Fragment>
      ) : null}
    </div>
  )
}

export default RecentlyViewedItems
