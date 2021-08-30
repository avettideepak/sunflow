import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Whatsapp from "../../../../assets/icons/social/watsappstore.png";
import Linkedin from "../../../../assets/icons/social/Linkedinstore.png";
import Messenger from "../../../../assets/icons/social/MessengerStore.png";

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2)
  },
  enquire: {
    display: "flex",
    justifyContent: "center",
    "& li": {
      padding: "0px 15px",
      "& img": {
        height: "28px",
        width: "28px",
        marginRight: "10px"
      },
      "& a": {
        color: "#555",
        display: "flex",
        alignItems: "center"
      }
    }
  },
  enquireAnimation: {
    background: "transparent",
    border: "1px solid #19b453",
    "& ::before": {
      transition: "transform 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86)",
      content: ""
    }
  }
}));

export default function ChatTheSeller({ storeSellerData }) {
  const classes = useStyles();

  const [isEnquired, setIsEnquired] = React.useState(false);
  const handleEnquire = event => {
    event.stopPropagation();
    setIsEnquired(true);
  };

  const handleEnquireClose = event => {
    event.stopPropagation();
    setIsEnquired(false);
  };
  console.info("storeSellerData", storeSellerData);
  // if (storeSellerData && storeSellerData.facebook)
    return (
      <div className="contact-seller-section">
        <div
          className={
            isEnquired
              ? `enquireAnimation verified-badge with-tip`
              : `verified-badge with-tip`
          }
          onClick={handleEnquire}
        >
          {isEnquired ? (
            <ul className={classes.enquire}>
              {/* {storeSellerData && storeSellerData.facebook ? (
                <li onClick={handleEnquireClose}>
                  <a
                    href={`https://m.me/${
                      storeSellerData.facebook.split("facebook.com/")[1]
                    }`}
                    target="_blank"
                  >
                    <img src={Messenger} alt="Social icon" />
                  </a>
                </li>
              ) : null} */}
                <li onClick={handleEnquireClose}>
                  <a href="https://wa.me/6472155895" target="_blank">
                    <img src={Whatsapp} alt="Social icon" />
                  </a>
                </li>
                {/* <li onClick={handleEnquireClose}>
                  <a
                    href="https://www.linkedin.com/company/avetti-com-corporation"
                    target="_blank"
                  >
                    <img src={Linkedin} alt="Social icon" />
                  </a>
                </li> */}
            </ul>
          ) : (
            <span>
              <i class="material-icons">chat</i> Request Quote or Send Enquiry
            </span>
          )}
        </div>
      </div>
    );
  // else return null;
}
