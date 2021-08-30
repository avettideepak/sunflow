import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { I18nContext } from "@/i18n/index";
import StoreMap from "../../../../assets/img/Storemap.svg";
import classes from "./style/SupplierInfo.module.css"

const SupplierInfo = ({ storeInfo }) => {
    const { translate } = React.useContext(I18nContext);

    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const supplierInfo = useSelector(
        state => state.productReducer.supplierInfo,
        shallowEqual
    );

    const loginNameState = useSelector(
        state => state.loginReducer.loginName,
        shallowEqual
    );

    const [supplierInfoData, setSupplierInfoData] = React.useState(null);

    useEffect(() => {
        if (supplierInfo && supplierInfo.length > 0) {
            setSupplierInfoData(supplierInfo[0])
        }

    }, [supplierInfo]);

    console.log("supplierInfoData", supplierInfoData, storeInfo.storeSellerData)

    const isMobileState = useSelector(
        state => state.mainReducer.isMobile,
        shallowEqual
    );

    return (
        <>
        <div className="product-details-specs-container">
                  <div className="SupplierInfo">
                    <div class="suppl">Supplier Info</div> 
                    <div className="storeMap" onClick={handleClickOpen}><img src={StoreMap} />View Store Location</div>
                  </div>
                </div>

                <div>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby={storeInfo.storeSellerData.brand}
        aria-describedby={storeInfo.storeSellerData.brand}
      >
        <DialogTitle id="alert-dialog-title">{storeInfo.storeSellerData.brand}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <div class="mapouter_product">
                    <div class="gmap_canvas_product">
                        {storeInfo && storeInfo.storeSellerData &&
                            Object.keys(storeInfo.storeSellerData).includes("location") &&
                            storeInfo.storeSellerData.location != "" ? (
                            <iframe class="gmap_iframe_product" width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src={`https://maps.google.com/maps?hl=en&q=${storeInfo.storeSellerData.location}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}></iframe>
                        )
                            :
                            null
                        }
                    </div>
                </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
        <div className={classes.container}>
            {/* <h2>Supplier Details</h2> */}
            <div className={classes.wrapper_main}>
                {/* <div class="mapouter_product">
                    <div class="gmap_canvas_product">
                        {storeInfo && storeInfo.storeSellerData &&
                            Object.keys(storeInfo.storeSellerData).includes("location") &&
                            storeInfo.storeSellerData.location != "" ? (
                            <iframe class="gmap_iframe_product" width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src={`https://maps.google.com/maps?hl=en&q=${storeInfo.storeSellerData.location}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}></iframe>
                        )
                            :
                            null
                        }
                    </div>
                </div> */}
                {/* <div className={classes.row}>
                    <div className={classes.prop}>Code</div>
                    <div className={classes.value}>{supplierInfoData && supplierInfoData.code}</div>
                </div>
                <div className={classes.row}>
                    <div className={classes.prop}>Item Id</div>
                    <div className={classes.value}>{supplierInfoData && supplierInfoData.itemid}</div>
                </div> */}
                {/* <h4 className={classes.com_title}>Video</h4>
                <div className={classes.video}>
                     <iframe src="https://www.youtube.com/embed/u5RvDg8uFv0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div> */}
                {/* <h4 className={classes.com_title}>Manufacturer Address</h4> */}
                {/* {
                    supplierInfoData &&
                    supplierInfoData.distributorOrder.length > 0 &&
                    Object.keys(supplierInfoData.distributorOrder[0]).map((props, index) => {
                        if (props == "address" || props == "city" || props == "country" || props == "name" || props == "postal_code" || props == "primaryDomain" || props == "region") {
                            console.log("supplierInfoData22", supplierInfoData)
                            if (supplierInfoData.distributorOrder[0][props] != "") {
                                return (
                                    <div key={props} className={classes.row}>
                                        <div className={classes.prop}>{props == "address" ? (<i className="material-icons">location_on</i>) : null}
                                            {props == "city" ? (<i className="material-icons">location_city</i>) : null}
                                            {props == "country" ? (<i className="material-icons">local_airport</i>) : null}

                                            {props == "name" ? (<i className="material-icons">account_circle</i>) : null}
                                            {props == "postal_code" ? (<i className="material-icons">local_convenience_store</i>) : null}
                                            {props == "primaryDomain" ? (<i className="material-icons">desktop_mac</i>) : null}
                                            {props == "region" ? (<i className="material-icons">person_pin_circle</i>) : null}
                                            {props.replace("_", "").replace("primaryDomain", "Website")}</div>
                                        <div className={classes.value}>{supplierInfoData.distributorOrder[0][props].replace("Barrie", "İstanbul").replace("CANADA", "Turkey").replace("ONTARIO", "Çekmeköy").replace("previewdev.open4business.io", "http://www.abaklihali.com/").replace("ABAKLI-SUPPLIER", "ABAKLI").replace("AHMET-SUPPLIER", "AHMET").replace("OTIAD-SUPPLIER", "OTIAD")}</div>
                                    </div>
                                )
                            }

                        }
                    })
                } */}
                {/* <div class="mapouter_product">
                    <div class="gmap_canvas_product">
                        {storeInfo && storeInfo.storeSellerData &&
                            Object.keys(storeInfo.storeSellerData).includes("location") &&
                            storeInfo.storeSellerData.location != "" ? (
                            <iframe class="gmap_iframe_product" width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src={`https://maps.google.com/maps?hl=en&q=${storeInfo.storeSellerData.location}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}></iframe>
                        )
                            :
                            null
                        }
                    </div>
                </div> */}
                {
                    storeInfo &&
                    storeInfo.storeSellerData &&
                    <>
                            
                        <div className={classes.row}>
                            <div className={classes.prop}><i className="material-icons">account_circle</i></div>
                            <div className={classes.value}>{storeInfo.storeSellerData.brand}</div>
                        </div>
                        <div className={classes.row}>
                            <div className={classes.prop}><i className="material-icons">call</i></div>
                            <div className={classes.value}>{storeInfo.storeSellerData.phone_number}</div>
                        </div>
                        <div className={classes.row}>
                            <div className={classes.prop}><i className="material-icons">location_on</i></div>
                            <div className={classes.value}>{storeInfo.storeSellerData.location}</div>
                        </div>
                        {/* <div className={classes.row}>
                            <div className={classes.prop}><i className="material-icons">location_city</i></div>
                            <div className={classes.value}>{storeInfo.storeSellerData.city}</div>
                        </div> */}
                        {/* <div className={classes.row}>
                            <div className={classes.prop}><i className="material-icons">person_pin_circle</i></div>
                            <div className={classes.value}>{storeInfo.storeSellerData.province}</div>
                        </div> */}
                        {/* <div className={classes.row}>
                            <div className={classes.prop}><i className="material-icons">local_airport</i></div>
                            <div className={classes.value}>{storeInfo.storeSellerData.country}</div>
                        </div> */}

                        
                        {/* <div className={classes.row}>
                            <div className={classes.prop}><i className="material-icons">local_convenience_store</i></div>
                            <div className={classes.value}>{storeInfo.storeSellerData.postal_code}</div>
                        </div> */}
                        <div className={classes.row}>
                            <div className={classes.prop}><i className="material-icons">language</i></div>
                            {storeInfo.storeSellerData.website}
                        </div>
                    </>
                }
                {/* {
                    supplierInfoData &&
                    supplierInfoData.distributorOrder.length > 0 &&
                    supplierInfoData.distributorOrder.map((supplierData) => {
                        console.log("supplierInfoData11", supplierData)
                        Object.keys(supplierData).map((props, index) => {
                            if (props) {
                                console.log("supplierInfoData22", supplierData[props])
                                return (
                                    <div key={props} className={classes.row}>
                                        <div className={classes.prop}>{props}</div>
                                        <div className={classes.value}>{supplierData[props]}</div>
                                    </div>
                                )
                            }
                        })
                    })
                } */}
            </div>
            <div className={classes.supimg}> { storeInfo.storeSellerData.brand == "Matalan" ? <img src="https://ik.imagekit.io/ofb/dev/store/20180522154/assets/items/largeimages/AINGMX54L0.jpg"/> : null}
            { storeInfo.storeSellerData.brand == "Jakamen" ? <img src="https://ik.imagekit.io/ofb/dev/store/20180522154/assets/items/largeimages/AINPTJMNU0.jpg"/> : null}
            { storeInfo.storeSellerData.brand == "Elak" ? <img src="https://ik.imagekit.io/ofb/dev/store/20180522154/assets/items/largeimages/AIN7VU8I20.jpg"/> : null}
            { storeInfo.storeSellerData.brand == "Giordano" ? <img src="https://ik.imagekit.io/ofb/dev/store/20180522154/assets/items/largeimages/AIN14BX9B0.jpg"/> : null}
             </div>
        </div >
        </>
    );
};

export default SupplierInfo;
