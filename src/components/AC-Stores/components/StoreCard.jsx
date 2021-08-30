import React, { useState } from "react";
import { Link } from "gatsby";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import MallMapModal from "../../AC-MallMap/MallMapModal/MallMapModal";

import {
  PROJECT_LINK,
  IS_PUBLISHED,
  PREVIEW,
  LINK_DISTRIBUTION
} from "../../../project-config";
import ReviewStarMaker from "../../../functions/ReviewStarMaker.jsx";
import htmldecoder from "../../../functions/htmldecoder";
import { toggleCompare } from "../../AC-Header/Compare.jsx";
import {
  deleteCompareItem,
  toggleCompareAction,
  fetchComparedItemDetails,
  deleteComparedItemsDetails
} from "../../../redux/actions/compareActions";

import { getDistanceBetweenTwoCoords } from "../../../functions/Utilities";

import { I18nContext } from "../../../i18n/index";
import classes from "./Styles/StoreCard.module.css";
import { setSelectedStoreToViewOnTheMapAction } from "../../../redux/actions/storesAction";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});


const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});


const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const StoreCard = props => {
  const dispatch = useDispatch();
  const { langCode } = React.useContext(I18nContext);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const userLocation = useSelector(
    state => state.userLocationReducer,
    shallowEqual
  );

  const {
    id,
    title,
    desc,
    currency_sign,
    image,
    itemLargeImage,
    price,
    url
  } = props.itemCard;

  const storeProps = props.itemCard.properties;
  const tel = "(705) 722-0333";

  const getHref = (text, type) => {
    if (type == "phone") {
      let num = text.replace(/[^a-zA-Z0-9 ]/g, "");
      return "tel:" + num.replace(/\s/g, "");
    } else if (type == "email") return "mailto:" + text;
    else return null;
  };


  const renderStoreFeatures = () => {

    let statusClassArray = ["activeFlag", "inactiveFlag", "inactiveFlag", "inactiveFlag"];

    if (storeProps && storeProps.itemtype == "Level 004") {
      statusClassArray = ["activeFlag", "activeFlag", "activeFlag", "activeFlag"]
    }

    else if (storeProps && storeProps.itemtype == "Level 003") {
      statusClassArray = ["activeFlag", "activeFlag", "activeFlag", "inactiveFlag"]
    }

    else if (storeProps && storeProps.itemtype == "Level 002") {
      statusClassArray = ["activeFlag", "activeFlag", "inactiveFlag", "inactiveFlag"]
    }

    return (
      <div className={classes.storeFeaturesWrapper}>
        <i title={statusClassArray[0] == "activeFlag" && "Store Information Available"} className={`${classes.info} ${statusClassArray[0]} material-icons-outlined`}>
          info
        </i>
        <i title={statusClassArray[1] == "activeFlag" && "Weelky Deals Flyer Available"} className={`${classes.explore} ${statusClassArray[1]} material-icons-outlined`}>
          explore
        </i>
        <i title={ statusClassArray[2] == "activeFlag" && "Weelky Deals Available"}  className={`${classes.offer} ${statusClassArray[2]} material-icons-outlined`}>
          local_offer
        </i>
        <i title={statusClassArray[3] == "activeFlag" && "Shopping Available"}  className={`${classes.shopping} ${statusClassArray[3]} material-icons-outlined`}>
          shopping_basket
        </i>
      </div>
    )

  }

  const handleStoreItemLocationIconClicked = () => {
    dispatch(setSelectedStoreToViewOnTheMapAction(props.itemCard));
  };

  const getDistance = props => {
    let storeLat,
      storeLng,
      lat,
      lng = null;

    if (props.lat && props.lng && userLocation.lat && userLocation.lng) {
      storeLat = parseFloat(props.lat);
      storeLng = parseFloat(props.lng);
      lat = userLocation.lat;
      lng = userLocation.lng;
    }

    if (storeLat != null && storeLng != null && lat != null && lng != null)
      return (
        getDistanceBetweenTwoCoords(storeLat, storeLng, lat, lng).toFixed() +
        " Km"
      );
  };

  console.info("Store Card", props.itemCard);
  console.info("Store Props", storeProps);

  let imageUrl =
    "https://ik.imagekit.io/ofb/dev" +
    "/" +
    itemLargeImage;
  let storeName = title.replace(/ /g, "-").toLowerCase();
  return (
    <>
      <div className={classes.wrapper}>
        {renderStoreFeatures()}
        <div className={classes.imageWrapper}>
          <Link
            to={
              langCode !== "en"
                ? "/" + langCode + "/stores/" + storeName
                : "/stores/" + storeName
            }
          >
            <img
              src={imageUrl}
              className="img-responsive"
              alt={`${title} Image`}
            />
          </Link>

        </div>
        <div className={classes.titleWrapper}>
          <div className={classes.flex}>
            <span className={classes.title} title={title}>
              {title}
            </span>
            {/* <span
              className={classes.distance}
              onClick={handleStoreItemLocationIconClicked}>
              <i className="material-icons">turned_in_not</i>
            </span> */}
            <MallMapModal
              vendorId={storeProps.Created_By_Supplier}
              linkTextActive={false}
              linkText={false}
              icon={true}
            />
          </div>

          {/* {storeProps.LineAddress1 ? (
          <span className={classes.addressSpan} title={storeProps.LineAddress1}>
            {storeProps.LineAddress1}
          </span>
        ) : (
          <span></span>
        )} */}

          {/* <span className={classes.addressSpan}>
          <b>{storeProps.City ? storeProps.City + ", " : null}</b>
          <b>{storeProps.ProvinceAbv ? storeProps.ProvinceAbv + " " : null}</b>
          <b>{storeProps.PostalCode ? storeProps.PostalCode : null}</b>
        </span> */}
          {/* {props.renderedBy === "sellers-page" && (
          <div
            onClick={handleStoreItemLocationIconClicked}
            className={classes.storeItemLocationIcon}
          >
            <i className="material-icons">location_on</i> Show on the map
          </div>
        )} */}
          {/* <span className={classes.withIcon}>
          {storeProps.Phone ? (
            <>
              <i className="material-icons">phone</i>
              <a
                className={classes.phone}
                href={getHref(storeProps.Phone, "phone")}
              >
                {storeProps.Phone}
              </a>
            </>
          ) : null}
        </span> */}
          {/* <span className={classes.withIcon}>
          {storeProps.Email ? (
            <>
              <i className="material-icons">email</i>
              <a
                className={classes.phone}
                href={getHref(storeProps.Email, "email")}
              >
                {storeProps.Email}
              </a>
            </>
          ) : null}
        </span> */}
        </div>
      </div>
      {/* <div className={classes.levels}><i className="material-icons">location_on</i> {storeProps && storeProps.itemtype || "Level 001"}</div> */}

    </>
  );
};

export default StoreCard;
