import React, { useState, useEffect, useContext } from "react";
import classes from "../Styles/MoreShare.module.css";
import { PREVIEW } from "../../../../../project-config.js";
import { I18nContext } from "../../../../../i18n/index.js";
import { useLocation } from "@reach/router";

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

export default function MoreShare({
  moreActive,
  setMoreActive,
  compareClicked,
  wishlistClicked,
  id,
  url,
  title,
  imageUrl,
  isItemWishlisted
}) {
  const location = useLocation();
  const [wishlistState, setWishlistState] = useState(false);

  useEffect(() => {
    setWishlistState(isItemWishlisted);
  }, [isItemWishlisted]);
  const { translate, langCode } = useContext(I18nContext);

  const [productUrl, setProductUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    url = url.replace("product/", "");
    console.info("url", url);
    let langCodePart = langCode == "en" ? "" : `/${langCode}`;

    setProductUrl(location.origin + "/" + url);
  }, []);

  const handleCopyToClipboard = event => {
    event.stopPropagation();

    console.info(event.target);

    let textField = document.createElement("textarea");
    textField.innerText = productUrl;
    document.body.appendChild(textField);
    textField.select();
    textField.setSelectionRange(0, 99999);
    document.execCommand("copy");
    textField.remove();
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const handleMoreShareClicked = event => {
    console.info("clicked");
    event.stopPropagation();
    setMoreActive(true);
  };

  const renderTheMoreWindow = () => {
    return (
      <div
        style={langCode == "ar" ? { right: "0", left: "unset" } : {}}
        className={`no-select ${classes.moreWindow}${
          moreActive ? ` ` + classes.active : ``
        }`}
      >
        <li
          onClick={event => compareClicked(event, id)}
          className={`${classes.moreWindowListItem}`}
        >
          <i className="material-icons">compare_arrows</i>
          <p>{translate(`compare.compare_title`)}</p>
        </li>
        <li
          onClick={event => {
            wishlistClicked(event, id);
            setWishlistState(!wishlistState);
          }}
          className={`${classes.moreWindowListItem}`}
        >
          <i className="material-icons">
            {wishlistState ? "favorite" : "favorite_border"}
          </i>

          <p>{translate(`moreShare.addToWishList`)}</p>
        </li>
        <li
          className={`${classes.moreWindowListItem} ${classes.moreWindowListItemicons}`}
        >
          <EmailShareButton
            separator={" "}
            className="share-button"
            url={productUrl}
            subject={`This ${title} Awesome`}
            body={`Check this ${title}.`}
          >
            <EmailIcon size={25} round={true} />
          </EmailShareButton>
          <TwitterShareButton
            className="share-button"
            url={productUrl}
            title={`Check this ${title}.`}
            hashtags={["Avetti", "DemoStore", "B2B", "ecommerce"]}
          >
            <TwitterIcon size={25} round={true} />
          </TwitterShareButton>
          <FacebookShareButton
            className="share-button"
            url={productUrl}
            quote={`Check this ${title}.`}
            hashtags={["Avetti", "DemoStore", "B2B", "ecommerce"]}
          >
            <FacebookIcon size={25} round={true} />
          </FacebookShareButton>
          <LinkedinShareButton
            className="share-button"
            url={productUrl}
            title={`This ${title} Awesome`}
            summary={`Check this ${title}.`}
            source={`Avetti Demo Store`}
          >
            <LinkedinIcon size={25} round={true} />
          </LinkedinShareButton>
        </li>
        <li
          className={`${classes.moreWindowListItem} ${classes.moreWindowListItemicons}`}
        >
          <PinterestShareButton
            className="share-button"
            url={productUrl}
            description={`Check this ${title}.`}
            media={imageUrl}
          >
            <PinterestIcon size={25} round={true} />
          </PinterestShareButton>

          <LineShareButton
            className="share-button"
            url={productUrl}
            title={`This ${title} Awesome`}
            description={`Check this ${title}.`}
          >
            <LineIcon size={25} round={true} />
          </LineShareButton>
          <WhatsappShareButton
            separator={" "}
            className="share-button"
            url={productUrl}
            title={`Check this ${title}.`}
          >
            <WhatsappIcon size={25} round={true} />
          </WhatsappShareButton>
        </li>
        <div className={classes.seperator}></div>
        <li
          onClick={event => handleCopyToClipboard(event)}
          className={`${classes.moreWindowListItem}`}
        >
          <i className="material-icons">link</i>
          <p>
            {copied
              ? translate(`moreShare.copiedToClipboard`)
              : translate(`moreShare.copyToClipboard`)}
          </p>
        </li>
      </div>
    );
  };

  const renderTheBackDrop = () => {
    return (
      moreActive && (
        <div
          onClick={event => {
            console.info("clicked", moreActive);
            event.stopPropagation();
            setMoreActive(false);
          }}
          className={classes.backdrop}
        ></div>
      )
    );
  };

  return (
    <React.Fragment>
      {renderTheBackDrop()}

      <div
        className={classes.container}
        onClick={event => handleMoreShareClicked(event)}
      >
        <i
          className={`no-select material-icons ${classes.moreBtn}${
            moreActive ? ` ` + classes.moreBtnActive : ``
          }`}
        >
          more_horiz
        </i>
        {renderTheMoreWindow()}
      </div>
    </React.Fragment>
  );
}
