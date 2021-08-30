import React, { useState, useEffect, useContext } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Link } from "gatsby";
import "./Styles/ItemCard_Static.css";

const ItemCard = props => { 

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );
  return (
    <>
     <div class="MuiGrid-root item-card-container MuiGrid-container">
   <div className="MuiGrid-root item-card-item MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-sm-6 MuiGrid-grid-md-4 MuiGrid-grid-lg-3">
      <div className="home-item--wrapper">
         <div className="home-item" style={{ cursor: "pointer"}}>
         <div className="item-card-image">
            <figure className="item-card-figure"><Link to="/deals/50-off-on-new-collection-ainv9xbtp0"><img src="https://ik.imagekit.io/ofb/dev/store/20180522154/assets/items/largeimages/AINV9XBTP0.jpg?tr=ar-1-1,dpr-2,r-20,pr-true,f-auto,w-200" class="figure" alt="50% Off on Men's Jackets" srcset="https://ik.imagekit.io/ofb/dev/store/20180522154/assets/items/largeimages/AINV9XBTP0.jpg?tr=ar-1-1,dpr-2,r-20,pr-true,f-auto,w-200 992w, https://ik.imagekit.io/ofb/dev/store/20180522154/assets/items/largeimages/AINV9XBTP0.jpg?tr=ar-1-1,dpr-2,r-20,pr-true,f-auto,w-340 768w, https://ik.imagekit.io/ofb/dev/store/20180522154/assets/items/largeimages/AINV9XBTP0.jpg?tr=ar-1-1,dpr-2,r-20,pr-true,f-auto,w-170 500w" /></Link></figure>
         </div>
         <Link to="/deals/50-off-on-new-collection-ainv9xbtp0">
         <div className="item-card-regular">
            <div className="product-title10" title="50% Off on Men's Jackets">50% Off on Men's Jackets</div>
         </div>
         </Link>
      </div>
   </div>
</div>
<div className="MuiGrid-root item-card-item MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-sm-6 MuiGrid-grid-md-4 MuiGrid-grid-lg-3">
   <div className="home-item--wrapper">
      <div className="home-item" style={{ cursor: "pointer"}}>
      <div className="item-card-image">
         <figure className="item-card-figure"><Link to="/deals/special-offer-50off-ain3lmctp0"><img src="https://ik.imagekit.io/ofb/mall/AIN3LMCTP0_pBdm_HWM5.jpg?updatedAt=1626882844766?tr=ar-1-1,dpr-2,r-20,pr-true,f-auto,w-200" class="figure" alt="Special Offer 50% Off On Cocktail Dresses" srcset="https://ik.imagekit.io/ofb/mall/AIN3LMCTP0_pBdm_HWM5.jpg?updatedAt=1626882844766?tr=ar-1-1,dpr-2,r-20,pr-true,f-auto,w-200 992w, https://ik.imagekit.io/ofb/mall/AIN3LMCTP0_pBdm_HWM5.jpg?updatedAt=1626882844766?tr=ar-1-1,dpr-2,r-20,pr-true,f-auto,w-340 768w, https://ik.imagekit.io/ofb/mall/AIN3LMCTP0_pBdm_HWM5.jpg?updatedAt=1626882844766?tr=ar-1-1,dpr-2,r-20,pr-true,f-auto,w-170 500w" /></Link></figure>
      </div>
      <Link to="/deals/special-offer-50off-ain3lmctp0">
      <div className="item-card-regular">
         <div className="product-title10" title="Special Offer 50% Off On Cocktail Dresses">Special Offer 50% Off On Cocktail Dresses</div>
      </div>
      </Link>
   </div>
</div>
</div>
<div className="MuiGrid-root item-card-item MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-sm-6 MuiGrid-grid-md-4 MuiGrid-grid-lg-3">
   <div className="home-item--wrapper">
      <div className="home-item" style={{ cursor: "pointer"}}>
      <div className="item-card-image">
         <figure className="item-card-figure"><Link to="/deals/upto-40-off-ainawbdtp0"><img src="https://ik.imagekit.io/ofb/dev/store/20180522154/assets/items/largeimages/AINAWBDTP0.jpg?tr=ar-1-1,dpr-2,r-20,pr-true,f-auto,w-200" class="figure" alt="Up to 40% Off On Women's Wear" srcset="https://ik.imagekit.io/ofb/dev/store/20180522154/assets/items/largeimages/AINAWBDTP0.jpg?tr=ar-1-1,dpr-2,r-20,pr-true,f-auto,w-200 992w, https://ik.imagekit.io/ofb/dev/store/20180522154/assets/items/largeimages/AINAWBDTP0.jpg?tr=ar-1-1,dpr-2,r-20,pr-true,f-auto,w-340 768w, https://ik.imagekit.io/ofb/dev/store/20180522154/assets/items/largeimages/AINAWBDTP0.jpg?tr=ar-1-1,dpr-2,r-20,pr-true,f-auto,w-170 500w" /></Link></figure>
      </div>
      <Link to="/deals/upto-40-off-ainawbdtp0">
      <div className="item-card-regular">
         <div className="product-title10" title="Up to 40% Off On Women's Wear">Up to 40% Off On Women's Wear</div>
      </div>
      </Link>
   </div>
</div>
</div>
<div className="MuiGrid-root item-card-item MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-sm-6 MuiGrid-grid-md-4 MuiGrid-grid-lg-3">
   <div className="home-item--wrapper">
      <div className="home-item" style={{ cursor: "pointer"}}>
      <div className="item-card-image">
         <figure className="item-card-figure"><Link to="/deals/upto-50-off-on-new-arrival-ainh81etp0"><img src="https://ik.imagekit.io/ofb/dev/store/20180522154/assets/items/largeimages/AINH81ETP0.jpg?tr=ar-1-1,dpr-2,r-20,pr-true,f-auto,w-200" class="figure" alt="Up to 50% Off On Jackets" srcset="https://ik.imagekit.io/ofb/dev/store/20180522154/assets/items/largeimages/AINH81ETP0.jpg?tr=ar-1-1,dpr-2,r-20,pr-true,f-auto,w-200 992w, https://ik.imagekit.io/ofb/dev/store/20180522154/assets/items/largeimages/AINH81ETP0.jpg?tr=ar-1-1,dpr-2,r-20,pr-true,f-auto,w-340 768w, https://ik.imagekit.io/ofb/dev/store/20180522154/assets/items/largeimages/AINH81ETP0.jpg?tr=ar-1-1,dpr-2,r-20,pr-true,f-auto,w-170 500w" /></Link></figure>
      </div>
      <Link to="/deals/upto-50-off-on-new-arrival-ainh81etp0"> <div className="item-card-regular">
         <div className="product-title10" title="Up to 50% Off On Jackets">Up to 50% Off On Jackets</div>
      </div></Link>
   </div>
</div>
</div>
</div>
    </>
  );
};

export default ItemCard;
