import React, { useState, useEffect, useContext } from "react";
import { useSelector, shallowEqual } from "react-redux";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import {
  browserInfo,
  chromeNotifications,
  safariNotifications,
  unsubscribeFromTopic,
  checkRemotePermission
} from "../../../../functions/notifications";
import { I18nContext } from "../../../../i18n/index";
import image_en from "../../../../assets/img/notification-images/chrome_activate_notifications_en.png";
import image_es from "../../../../assets/img/notification-images/chrome_activate_notifications_es.png";
import image_fr from "../../../../assets/img/notification-images/chrome_activate_notifications_fr.png";
import image_zh from "../../../../assets/img/notification-images/chrome_activate_notifications_zh.png";
import image_vi from "../../../../assets/img/notification-images/chrome_activate_notifications_vi.png";
import image_ar from "../../../../assets/img/notification-images/chrome_activate_notifications_ar.png";
import image_tr from "../../../../assets/img/notification-images/chrome_activate_notifications_tr.png";
import opera_image_en from "../../../../assets/img/notification-images/opera_activate_notifications_en.png";
import opera_image_es from "../../../../assets/img/notification-images/opera_activate_notifications_es.png";
import opera_image_fr from "../../../../assets/img/notification-images/opera_activate_notifications_fr.png";
import opera_image_zh from "../../../../assets/img/notification-images/opera_activate_notifications_zh.png";
import opera_image_vi from "../../../../assets/img/notification-images/opera_activate_notifications_vi.png";
import opera_image_tr from "../../../../assets/img/notification-images/opera_activate_notifications_tr.png";
import firefox_image_en from "../../../../assets/img/notification-images/firefox_activate_notifications_en.png";
import firefox_image_es from "../../../../assets/img/notification-images/firefox_activate_notifications_es.png";
import firefox_image_fr from "../../../../assets/img/notification-images/firefox_activate_notifications_fr.png";
import firefox_image_zh from "../../../../assets/img/notification-images/firefox_activate_notifications_zh.png";
import firefox_image_vi from "../../../../assets/img/notification-images/firefox_activate_notifications_vi.png";
import firefox_image_ar from "../../../../assets/img/notification-images/firefox_activate_notifications_ar.png";
import firefox_image_tr from "../../../../assets/img/notification-images/firefox_activate_notifications_tr.png";
import safari_image_en from "../../../../assets/img/notification-images/chrome_activate_notifications_en.png";
import safari_image_es from "../../../../assets/img/notification-images/chrome_activate_notifications_es.png";
import safari_image_fr from "../../../../assets/img/notification-images/chrome_activate_notifications_fr.png";
import safari_image_zh from "../../../../assets/img/notification-images/chrome_activate_notifications_zh.png";
import safari_image_vi from "../../../../assets/img/notification-images/chrome_activate_notifications_vi.png";
import safari_image_ar from "../../../../assets/img/notification-images/chrome_activate_notifications_ar.png";
import safari_image_tr from "../../../../assets/img/notification-images/chrome_activate_notifications_tr.png";
import DialogContent from "@material-ui/core/DialogContent";
import "./Styles/NotificationRequest.css";

export default function NotificationRequest() {
  const { langCode, translate } = useContext(I18nContext);
  const LOCAL_STORAGE_SUBSCRIBED_ITEMS_ARRAY = "store.subscribedItems";
  const LOCAL_STORAGE_NOTIFICATION_PROMT = "store.notificationPromt";
  const [openModalState, setOpenModalState] = useState(false);
  const [notificationDecision, setNotificationDecision] = useState(null);
  const [subscribedItemsState, setSubscribedItemsState] = useState([]);
  const [openModalMessage, setOpenModalMessage] = useState(false);
  const [userSubscribed, setUserSubscribed] = useState(false);
  const [
    openModalActivateNotification,
    setModalActivateNotification
  ] = useState(false);

  const [isRtl, setIsRtl] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      if (navigator.language === "ar") {
        setIsRtl(true);
      }
    }
  }, []);

  const languageState = useSelector(
    state => state.mainReducer.lang,
    shallowEqual
  );
  const ItemCodeState = useSelector(
    state => state.productReducer.itemDetail.code,
    shallowEqual
  );

  useEffect(() => {
    if (typeof localStorage !== undefined) {
      let storedSubscribedListString = localStorage.getItem(
        LOCAL_STORAGE_SUBSCRIBED_ITEMS_ARRAY || []
      );
      let storedSubscribedListObject = JSON.parse(storedSubscribedListString);
      if (storedSubscribedListObject)
        setSubscribedItemsState([...storedSubscribedListObject]);
    }
  }, []);

  useEffect(() => {
    if (typeof localStorage !== undefined) {
      localStorage.setItem(
        LOCAL_STORAGE_SUBSCRIBED_ITEMS_ARRAY,
        JSON.stringify(subscribedItemsState)
      );
    }
  }, [subscribedItemsState]);

  useEffect(() => {
    if (typeof window !== undefined) {
      setNotificationDecision(
        browserInfo().name !== "safari" ? Notification.permission : "default"
      );
      if (
        notificationDecision === "granted" ||
        notificationDecision === "denied"
      ) {
        setOpenModalState(false);
      }
    }
  }, [notificationDecision]);
  const [childDivStyle, setChildDivStyle] = useState({});

  useEffect(() => {
    if (typeof window !== undefined) {
      if (browserInfo().name === "chrome") {
        childDivStyle = {
          display: "flex",
          alignItems: "center",
          position: "absolute",
          left: !isRtl
            ? browserInfo().os === "mac"
              ? "25rem"
              : "15rem"
            : null,
          right: isRtl
            ? browserInfo().os === "mac"
              ? "25rem"
              : "15rem"
            : null,
          top: "9rem"
        };
      } else if (browserInfo().name === "opera") {
        childDivStyle = {
          display: "flex",
          alignItems: "center",
          position: "absolute",
          left: browserInfo().os === "mac" ? "18rem" : "8rem",
          top: "10rem"
        };
      } else if (browserInfo().name === "firefox") {
        childDivStyle = {
          display: "flex",
          alignItems: "center",
          position: "absolute",
          left: browserInfo().os === "mac" ? "40rem" : "30rem",
          top: "8rem"
        };
      } else if (browserInfo().name === "safari") {
        childDivStyle = {
          display: "flex",
          alignItems: "center",
          position: "absolute",
          right: "5rem",
          top: "9rem"
        };
      }
    }
  }, []);

  const thankYouModalStyle = {
    padding: "4rem",
    background: "white"
  };
  const imageStyle = {
    width: "28rem",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    marginTop: "1rem"
  };

  const handleLocalStorage = itemState => {
    if (subscribedItemsState.some(item => item === itemState)) {
      let tempArr = subscribedItemsState.filter(item => item !== itemState);
      setSubscribedItemsState([...tempArr]);
    } else {
      setSubscribedItemsState([...subscribedItemsState, itemState]);
    }
  };

  const isItemSubscribed =
    subscribedItemsState.length > 0
      ? subscribedItemsState.some(item => item === ItemCodeState)
      : false;

  const handleModalWindow = () => {
    if (typeof window !== undefined) {
      if (notificationDecision === "default") {
        setOpenModalState(false);
        if (browserInfo().name === "safari") {
          safariNotifications("price_alert", ItemCodeState);
          if (
            checkRemotePermission(
              window.safari.pushNotification.permission(
                process.env.REACT_APP_APPLE_PUSH_IDENTITY
              )
            ) === "granted"
          ) {
            setNotificationDecision("granted");
            console.log("GRANTED MODAL");
            handleLocalStorage(ItemCodeState);
            setOpenModalState(false);
            //setOpenModalThankYou(true);
          } else if (
            checkRemotePermission(
              window.safari.pushNotification.permission(
                process.env.REACT_APP_APPLE_PUSH_IDENTITY
              )
            ) === "denied"
          ) {
            setNotificationDecision("denied");
            console.log("DENIED MODAL");
          } else if (
            checkRemotePermission(
              window.safari.pushNotification.permission(
                process.env.REACT_APP_APPLE_PUSH_IDENTITY
              )
            ) === "default"
          ) {
            console.log("DEFAULT MODAL");
          } else {
            console.log("MODAL MODAL");
          }
        } else {
          Notification.requestPermission().then(
            result => {
              chromeNotifications("price_alert", ItemCodeState);
              setNotificationDecision("granted");
              handleLocalStorage(ItemCodeState);
              setUserSubscribed(true);
              console.info("Notification state", notificationDecision);
              setOpenModalMessage(true);
            },
            error =>
              error.PERMISSION_DENIED ? setNotificationDecision("denied") : null
          );
        }
      } else if (notificationDecision === "denied") {
        setModalActivateNotification(true);
        console.info("Permission denied. Modal closed");
      } else if (notificationDecision === "granted") {
        if (isItemSubscribed) {
          setOpenModalState(false);
          handleLocalStorage(ItemCodeState);
          setUserSubscribed(false);
          setOpenModalMessage(true);
          console.info("Unsubscribed");
          unsubscribeFromTopic("price_alert", ItemCodeState);
        } else {
          console.info("Subscribed");
          setUserSubscribed(true);
          setOpenModalState(false);
          setOpenModalMessage(true);
          handleLocalStorage(ItemCodeState);
          chromeNotifications("price_alert", ItemCodeState);
          console.info("Permission granted Modal closed");
        }
      } else {
        setOpenModalState(false);
        console.info("Permission granted/blocked. Modal closed");
      }
    }
  };

  const notificationIconStyle = {
    fontSize: "2.3rem",
    color: isItemSubscribed ? "mediumseagreen" : null,
    display:
      typeof window !== undefined &&
      browserInfo().device === "mobile" &&
      browserInfo().name === "safari"
        ? "none"
        : "block"
  };
  const handleTheRightImg = lang => {
    if (typeof window !== undefined) {
      if (browserInfo().name === "chrome") {
        switch (lang) {
          case "en":
            return image_en;
          case "es":
            return image_es;
          case "fr":
            return image_fr;
          case "zh":
            return image_zh;
          case "vi":
            return image_vi;
          case "ar":
            return image_ar;
          case "tr":
            return image_tr;
          default:
            return image_en;
        }
      } else if (browserInfo().name === "opera") {
        switch (lang) {
          case "en":
            return opera_image_en;
          case "es":
            return opera_image_es;
          case "fr":
            return opera_image_fr;
          case "zh":
            return opera_image_zh;
          case "vi":
            return opera_image_vi;
          case "ar":
            // opera does not support arabic UI
            return opera_image_en;
          case "tr":
            return opera_image_tr;
          default:
            return opera_image_en;
        }
      } else if (browserInfo().name === "firefox") {
        switch (lang) {
          case "en":
            return firefox_image_en;
          case "es":
            return firefox_image_es;
          case "fr":
            return firefox_image_fr;
          case "zh":
            return firefox_image_zh;
          case "vi":
            return firefox_image_vi;
          case "ar":
            return firefox_image_ar;
          case "tr":
            return firefox_image_tr;
          default:
            return firefox_image_en;
        }
      } else if (browserInfo().name === "safari") {
        switch (lang) {
          case "en":
            return safari_image_en;
          case "es":
            return safari_image_es;
          case "fr":
            return safari_image_fr;
          case "zh":
            return safari_image_zh;
          case "vi":
            return safari_image_vi;
          case "ar":
            return safari_image_ar;
          case "tr":
            return safari_image_tr;
          default:
            return safari_image_en;
        }
      } else {
        switch (lang) {
          case "en":
            return image_en;
          case "es":
            return image_es;
          case "fr":
            return image_fr;
          case "zh":
            return image_zh;
          case "vi":
            return image_vi;
          case "ar":
            return image_ar;
          case "tr":
            return image_tr;
          default:
            return image_en;
        }
      }
    }
  };

  const noThanksButtonHandler = () => {
    setOpenModalState(false);
    if (typeof localStorage !== undefined) {
      localStorage.setItem(
        LOCAL_STORAGE_NOTIFICATION_PROMT,
        JSON.stringify({ value: false, timestamp: Date.now() })
      );
    }
  };

  const subscribtionHandler = () => {
    if (notificationDecision === "default") {
      setOpenModalState(true);
    } else {
      handleModalWindow();
    }
  };

  return (
    <React.Fragment>
      <p style={{ cursor: "pointer" }}>
        {notificationDecision !== "denied" ? (
          <i
            className={
              isItemSubscribed ? "material-icons" : "material-icons-outlined"
            }
            style={notificationIconStyle}
            onClick={subscribtionHandler}
          >
            {isItemSubscribed ? "notifications_active" : "notifications"}
          </i>
        ) : (
          <i
            className="material-icons-outlined"
            style={{ fontSize: "2.3rem" }}
            onClick={subscribtionHandler}
          >
            notifications_off
          </i>
        )}
      </p>
      {/* <div style={parentDivStyle} onClick={handleModalWindow}>
        <div style={childDivStyle}>
          <div style={arrowDivStyle}></div>
          <div style={textDivStyle}>
            <span>
              <h3>{translate("modal.notifications.clickallow")}</h3>
            </span>
            <span>{translate("modal.notifications.clickallowlong")}</span>
          </div>
        </div>
      </div> */}
      <div
        className="popover-dialog"
        style={{ display: openModalState ? "block" : "none" }}
      >
        <div className="row flex" style={{ alignItems: "center" }}>
          <div className="col-md-2">
            <i
              className="material-icons"
              style={{ fontSize: "4rem", color: "#BBB" }}
            >
              notifications
            </i>
          </div>
          <div className="col-md-10">
            <p style={{ fontSize: "1.1rem", color: "#666" }}>
              {translate("modal.notifications.clickallowlong")}
            </p>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-8">
            <Button
              color="primary"
              size="large"
              style={{ float: "right", color: "#1165f1" }}
              onClick={noThanksButtonHandler}
            >
              {translate("modal.notifications.nothanks")}
            </Button>
          </div>
          <div className="col-md-4">
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleModalWindow}
              style={{ float: "right", backgroundColor: "#1165f1" }}
            >
              {translate("modal.notifications.allowbutton")}
            </Button>
          </div>
        </div>
        <br />
      </div>

      <Dialog
        open={openModalMessage}
        onClose={() => setOpenModalMessage(false)}
      >
        <MuiDialogTitle
          disableTypography
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div>
            {userSubscribed ? (
              <h3>{translate("modal.notifications.pricealerton")} </h3>
            ) : (
              <h3>{translate("modal.notifications.pricealertoff")} </h3>
            )}
          </div>
          <div>
            <IconButton
              aria-label="close"
              onClick={() => setOpenModalMessage(false)}
            >
              <i className="material-icons">close</i>
            </IconButton>
          </div>
        </MuiDialogTitle>
        <DialogContent>
          {userSubscribed ? (
            translate("modal.notifications.wewillnotifyyou")
          ) : (
            <div></div>
          )}
        </DialogContent>
      </Dialog>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        open={openModalActivateNotification}
        onClose={() => setModalActivateNotification(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={openModalActivateNotification}>
          <div>
            <div className="modal-title-wrapper">
              <i
                onClick={() => setModalActivateNotification(false)}
                className="material-icons"
              >
                close
              </i>
            </div>
            <div style={thankYouModalStyle}>
              <h2 id="transition-modal-title">
                {translate("modal.notifications.activate")}
              </h2>
              <div>
                <img
                  src={handleTheRightImg(languageState)}
                  style={imageStyle}
                  alt=""
                ></img>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
