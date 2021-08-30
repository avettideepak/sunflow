import React, { useState, useContext } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import ItemCard from "./components/ItemCard";
import Slider from "react-slick";
import { I18nContext } from "../../../../i18n";

const Accessories = () => {
  const dispatch = useDispatch();

  const { translate } = useContext(I18nContext);

  const [recentlyViewedCollapsed, setRecentlyViewedCollapsed] = useState(true);

  const accessoriesState = useSelector(
    state => state.productReducer.accessories,
    shallowEqual
  );

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: isMobileState ? 2 : 6,
    slidesToScroll: 1,
    prevArrow: <></>,
    nextArrow: <></>
  };

  if (accessoriesState.length > 0) {
    return (
      <div className="recently-viewed-items-container">
        <h1
          className="no-select recently-viewed-title"
          onClick={() => setRecentlyViewedCollapsed(!recentlyViewedCollapsed)}
        >
          {translate("accessories.title")}
          <i className="material-icons">
            keyboard_arrow_{recentlyViewedCollapsed ? "down" : "up"}
          </i>
        </h1>
        <Slider {...settings}>
          {accessoriesState.map(item => (
            <div key={item.id} className="owl-item col-xs-12">
              <ItemCard {...item} />
            </div>
          ))}
        </Slider>
      </div>
    );
  } else {
    return null;
  }
};

export default Accessories;
