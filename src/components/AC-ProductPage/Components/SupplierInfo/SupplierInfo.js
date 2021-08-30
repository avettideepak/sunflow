import React, { useEffect, useState, useRef, useLayoutEffect } from "react";

import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { I18nContext } from "@/i18n/index";

import classes from "./style/SupplierInfo.module.css";


const SupplierInfo = ({ storeInfo }) => {
  const { translate } = React.useContext(I18nContext);

  const supplierInfo = useSelector(
    state => state.productReducer.supplierInfo,
    shallowEqual
  );

  const [supplierInfoData, setSupplierInfoData] = React.useState(null);

  useEffect(() => {
    if (supplierInfo && supplierInfo.length > 0) {
      setSupplierInfoData(supplierInfo[0]);
    }
  }, [supplierInfo]);

  console.log("supplierInfoData", supplierInfoData, storeInfo);

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  const loginNameState = useSelector(
    state => state.loginReducer.loginName,
    shallowEqual
  );

  const handleLogin = () => {
    document.getElementById("login-icon-btn").click();
  };

  return (
    <div className={classes.container}>
      <h2>Manufacturer Details</h2>
      <div className={classes.wrapper}>
        {/* <div class="mapouter_product">
                    <div class="gmap_canvas_product">
                        { storeInfo && storeInfo.storeSellerData &&
                            Object.keys(storeInfo.storeSellerData).includes("location") &&
                            storeInfo.storeSellerData.location != "" ? (
                                <iframe class="gmap_iframe_product" width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src={`https://maps.google.com/maps?width=600&height=400&hl=en&q=${storeInfo.storeSellerData.location}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}></iframe>
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
        {/* {
                    supplierInfoData &&
                    supplierInfoData.distributorOrder.length > 0 &&
                    Object.keys(supplierInfoData.distributorOrder[0]).map((props, index) => {
                        if (props == "address" || props == "city" || props == "country" || props == "name" || props == "postal_code" || props == "primaryDomain" || props == "region") {
                            // console.log("supplierInfoData22", supplierInfoData.distributorOrder[0][props])
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
                

        <div className={classes.supplier_wrapper}>
          <div className={classes.supplier_inner_1}>
            <div className={classes.sup_logo}>
              <img src={`https://ik.imagekit.io/ofb/dev/store/${storeInfo.storeSellerData.file.file_path}`} style={{ maxWidth: "100%" }} />
            </div>
            <div className={classes.sup_add}>
              <h4>{storeInfo.storeSellerData.company_name}</h4>
              <p>{storeInfo.storeSellerData.location}</p>
              <p>
                {storeInfo.storeSellerData.country.replace("Canada", "Turkey")}, Pincode -{" "}
                {storeInfo.storeSellerData.postal_code}
              </p>
            </div>
          </div>
          <div className={classes.supplier_inner_2}>
            <div className={classes.sup_contact}>
              <a href="#">View more details</a>
            </div>
            <div className={classes.sup_icons}>
              {loginNameState == "" ? (
                <React.Fragment>
                  <button onClick={handleLogin}>
                    <i class="material-icons">phone</i>
                  </button>
                  <button onClick={handleLogin}>
                    <i class="material-icons">sms</i>
                  </button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <a href={`tel:${storeInfo.storeSellerData?.phone_number}`}>
                    <i class="material-icons">phone</i>
                  </a>
                  <a href={`sms:${storeInfo.storeSellerData?.phone_number}`}>
                    <i class="material-icons">sms</i>
                  </a>
                </React.Fragment>
              )}
              <a target="_blank" href={storeInfo.storeSellerData?.facebook}>
                <i class="material-icons">local_post_office</i>
              </a>
            </div>
          </div>
          {/* <div className={classes.more_details}>
            <a href="#">View more details</a>
          </div> */}
        </div>

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
    </div>
  );
};

export default SupplierInfo;
