import React, { useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import htmldecoder from "../../../../../functions/htmldecoder";
import {
  populateAccessoryModal,
  fetchingModalProductRequestSaga,
  fetchingAccessoryPriceInventory
} from "../../../../../redux/actions/productAction";

import { I18nContext } from "../../../../../i18n/index";
import "./Styles/ItemCard.css";
import PriceTag from "../../../../../shared/components/PriceTag/PriceTag";

const ItemCard = props => {
  const dispatch = useDispatch();
  const { langCode, currency, translate, priceConvert } = React.useContext(
    I18nContext
  );

  const [moreActive, setMoreActive] = useState(false);

  const { id, code, title, image, price } = props;

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  let imageUrl = `https://s3.ca-central-1.amazonaws.com/demob2b2cs3.avetti.ca/store/20180522154/assets/items/images/${code}.jpg`;

  const handleClickOnProductCard = (id, title, imageUrl, price) => {
    dispatch(fetchingModalProductRequestSaga(id));
    dispatch(fetchingAccessoryPriceInventory(id));
    dispatch(populateAccessoryModal({ title, imageUrl, price }));
  };

  return (
    <div
      className={`home-item${isMobileState ? ` mobile` : ``}${
        moreActive ? ` more-active` : ``
      }`}
      style={{ cursor: "pointer" }}
      onClick={event => handleClickOnProductCard(id, title, imageUrl, price)}
    >
      <div className={`item-card-image${isMobileState ? ` mobile` : ``}`}>
        <figure className="item-card-figure">
          <span
            className="figure"
            style={{ backgroundImage: `url(${imageUrl})` }}
          ></span>
        </figure>
      </div>

      <div className={`item-card-regular${isMobileState ? ` mobile` : ``}`}>
        <div
          className="product-title"
          dangerouslySetInnerHTML={{
            __html: htmldecoder(title)
          }}
        ></div>
        <div
          className="product-price"
          style={langCode == "ar" ? { left: "10px", right: "unset" } : {}}
        >
          <PriceTag
            value={{
              integer: price.split(".")[0] || 0,
              decimal: price.split(".")[1] || 0
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
