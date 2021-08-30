import React, { useState, useEffect } from "react"
import Dialog from "@material-ui/core/Dialog"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import withMobileDialog from "@material-ui/core/withMobileDialog"
import Mailchimp from "react-mailchimp-form"
import Img from "../../assets/img/sub.jpg"
import Logo from "../../assets/img/demoLogo.png"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
//import { chromeNotifications, safariNotifications } from "../../billing-address.js";
import { I18nContext } from "../../i18n/index"

const MailchimpSub = (props) => {
  const { translate } = React.useContext(I18nContext)
  const [openState, setOpenState] = useState(false)

  const [subscribe, setSubscribeState] = useState(
    typeof localStorage !== undefined &&
      localStorage.getItem("amIsubscribed") === "false"
      ? false
      : true
  )

  const handleClose = () => setOpenState(false)

  const { fullScreen } = props

  useEffect(() => {
    if (typeof localStorage !== undefined) {
      localStorage.setItem("amIsubscribed", subscribe)
      setSubscribeState(subscribe)
    }
  }, [subscribe])

  useEffect(() => {
    let mouseY
    document.addEventListener("mousemove", (e) => (mouseY = e.clientY))
    if (typeof localStorage !== undefined && "safari" in window) {
      document.body.addEventListener("mouseleave", (e) => {
        if (mouseY < 100) {
          if (
            typeof localStorage !== undefined &&
            localStorage.getItem("submodaldate")
          ) {
            if (
              new Date() - new Date(localStorage.getItem("submodaldate")) >
              6000000000
            ) {
              //      setOpenState(true);
              localStorage.setItem("submodaldate", new Date())
            }
          } else {
            localStorage.setItem("submodaldate", new Date())
          }
        }
      })
    } else {
      document.addEventListener("mouseleave", (e) => {
        if (mouseY < 100) {
          if (
            typeof localStorage !== undefined &&
            localStorage.getItem("submodaldate")
          ) {
            if (
              new Date() - new Date(localStorage.getItem("submodaldate")) >
              6000000000
            ) {
              //     setOpenState(true);

              localStorage.setItem("submodaldate", new Date())
            }
          } else {
            if (typeof localStorage !== undefined) {
              localStorage.setItem("submodaldate", new Date())
            }
          }
        }
      })
    }
  }, [])

  /* const handleSubscritionLogic = () => {
    setSubscribeState(!subscribe);
    return "safari" in window ? safariNotifications() : chromeNotifications();
  }; */

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={openState}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        className="subscribe-dialog"
        maxWidth="lg"
      >
        <IconButton
          aria-label="Close"
          className="modal-close-btn"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <div className="subscribe-modal-wrapper">
          <div className="subscribe-modal-image">
            <img src={Img} alt="img" />
          </div>
          <div className="subscribe-modal-content">
            <img src={Logo} alt="img" />

            <div className="subsribe-text">
              <span>{translate("mailchimpSub.gladYouHere")}</span>
              {/*  WE'RE GLAD YOU'RE HERE! */}
              <span>{translate("mailchimpSub.subOurNewsLetter")}</span>
              {/* Subscribe for our newsletter*/}
              <span>{translate(`mailchimpSub.promoCodeFor`)}</span>
              {/* & we'll email you a promo code for */}
              <span className="subscribe-10-off">
                {translate(`mailchimpSub.nextPurchase`)}
              </span>
              {/* 10% off your next purchase! */}
              <span> {translate(`mailchimpSub.enterEmail`)}</span>
              {/* Enter your email address below */}
            </div>

            <Mailchimp
              action="https://avetti.us3.list-manage.com/subscribe/post?u=da8315439c80632c2724f5038&amp;id=5082b0351b"
              fields={[
                {
                  name: "EMAIL",
                  placeholder: "Enter Your Email",
                  type: "email",
                  required: true,
                },
              ]}
              className="mailchimp-subscribe-modal"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={subscribe}
                  // onChange={() => {
                  //   handleChange("checkedB");
                  // }}
                  /* onClick={() => handleSubscritionLogic()} */
                  value="checkedB"
                  color="primary"
                />
              }
              label={translate(`mailchimpSub.sendMeNotifications`)} // Please send me notifications
            />
            <button /* onClick={() => handleSubscritionLogic()} */>
              CLICK ME
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default withMobileDialog({ breakpoint: "xs" })(MailchimpSub)
