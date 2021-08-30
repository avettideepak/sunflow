import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  TwitterShareButton,
  FacebookShareButton,
  EmailShareButton,
  LineShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  WhatsappShareButton,
  WeiboShareButton,
  TwitterIcon,
  FacebookIcon,
  EmailIcon,
  LineIcon,
  LinkedinIcon,
  PinterestIcon,
  WhatsappIcon
} from "react-share";

import classes from "./Styles/ShareButtons.module.css";
import { useLocation } from "@reach/router";

const BUTTON_SIZE = 40;

const ShareButtons = props => {
  const location = useLocation();
  const { title, imageUrl } = props;
  const [productUrl, setProductUrl] = useState(location.href);
  console.warn("URL IS HERER", location.href);

  return (
    <div className={classes.wrapper}>
      <EmailShareButton
        separator={" "}
        className="share-button"
        url={productUrl}
        subject={`This ${title} Awesome`}
        body={`Check this ${title}.`}
      >
        {/* <EmailIcon size={BUTTON_SIZE} round={true} /> */}
        <i className="fa fa-envelope shareIcons"></i>
      </EmailShareButton>
      <TwitterShareButton
        className="share-button"
        url={productUrl}
        title={`Check this ${title}.`}
        hashtags={["Avetti", "DemoStore", "B2B", "ecommerce"]}
      >
        {/* <TwitterIcon size={BUTTON_SIZE} round={true} /> */}
        <i className="fa fa-twitter shareIcons"></i>
      </TwitterShareButton>
      <FacebookShareButton
        className="share-button"
        url={productUrl}
        quote={`Check this ${title}.`}
        hashtags={["Avetti", "DemoStore", "B2B", "ecommerce"]}
      >
        {/* <FacebookIcon size={BUTTON_SIZE} round={true} /> */}
        <i className="fa fa-facebook-f shareIcons"></i>
      </FacebookShareButton>
      <LinkedinShareButton
        className="share-button"
        url={productUrl}
        title={`This ${title} Awesome`}
        summary={`Check this ${title}.`}
        source={`Avetti Demo Store`}
      >
        {/* <LinkedinIcon size={BUTTON_SIZE} round={true} /> */}
        <i className="fa fa-linkedin shareIcons"></i>
      </LinkedinShareButton>
      <PinterestShareButton
        className="share-button"
        url={productUrl}
        description={`Check this ${title}.`}
        media={imageUrl}
      >
        {/* <PinterestIcon size={BUTTON_SIZE} round={true} /> */}
        <i className="fa fa-pinterest-p shareIcons"></i>
      </PinterestShareButton>

      {/* <LineShareButton
        className="share-button"
        url={productUrl}
        title={`This ${title} Awesome`}
        description={`Check this ${title}.`}
      >
        <LineIcon size={BUTTON_SIZE} round={true} />
      </LineShareButton> */}
      <WhatsappShareButton
        separator={" "}
        className="share-button"
        url={productUrl}
        title={`Check this ${title}.`}
      >
        {/* <WhatsappIcon size={BUTTON_SIZE} round={true} /> */}
        <i className="fa fa-whatsapp shareIcons"></i>
      </WhatsappShareButton>
    </div>
  );
};

export default ShareButtons;
