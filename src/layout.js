/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React, { useState, useEffect } from "react";
import { useLocation } from "@reach/router";
import PropTypes from "prop-types";
import { useStaticQuery, graphql, withPrefix } from "gatsby";

import { Provider } from "react-redux";
import { I18nContextProvider } from "./i18n/index";
import { IntlProvider } from "react-intl";

import configureStore from "./redux/index.js";

import MailchimpSub from "./components/AC-Modals/MailchimpSub";
import MenuTopBar from "./components/AC-Header/MenuTopBar";
import Compare from "./components/AC-Header/Compare";

import Common from "./shared/components/Common";
import Footer from "./components/AC-Footer/Footer";

import "@assets/css/googleFonts.css";
import "@assets/css/menu.css";
import "@assets/css/minified.css";

import "@assets/css/avetti.css";
import "@assets/css/mailchimp.css";

import "@assets/css/style.css";
import "@assets/css/b2b2c.css";
import "@assets/css/purgeignore.css";

// import LocationBar from "./components/AC-Location/LocationBar";
import PromotionComponent from "./components/AC-Advertising/PromotionComponent";
import CookieDialog from "./components/AC-Cookie/CookieDialog";

export const store = configureStore();

const Layout = ({ children }) => {
  const location = useLocation();
  const [cookie, setCookie] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      let cookieRule = JSON.parse(localStorage.getItem("cookieAcceptance"));
      if (cookieRule && cookieRule.isAccept) {
        setCookie(false);
      } else {
        setCookie(true);
      }
    }
  }, []);

  const cookieAccept = () => {
    if (typeof window !== "undefined") {
      let consent = {
        date: new Date(),
        consent: "Manage-Cookie: ON",
        isAccept: true
      };
      localStorage.setItem("cookieAcceptance", JSON.stringify(consent));
      setCookie(false);
    }
  };

  const data = useStaticQuery(graphql`
  query MenuQuery {
    allAvettiMenu {
      nodes {
        childs {
          cid
          name
          URL
          description
          image
          thumbnail
          vid
          childs {
            cid
            description
            image
            metadescription
            name
            vid
            URL
            thumbnail
          }
        }
      }
    }
      allAvettiCategory(filter: { url: { in: "stores" } }) {
        nodes {
          name

          items {
            id
            title
            code
            desc
            properties {
              lng
              lat
              
            }
          }
        }
      }
    }
  `);

  return (
    <I18nContextProvider>
      <IntlProvider locale={"en"}>
        <Provider store={store}>
          <Common />
          <div>
            <MenuTopBar
              data={data.allAvettiMenu.nodes[0].childs}
              brands={data.allAvettiCategory.nodes[0].itemsFirstPage}
            />
            {/* <LocationBar /> */}
            <PromotionComponent />
            <Compare />
          </div>

          {children}
          <MailchimpSub />
          {cookie && !location.pathname.includes("cookies") && (
            <CookieDialog acceptCookieCloseDialog={cookieAccept} />
          )}

          <Footer />
        </Provider>
      </IntlProvider>
    </I18nContextProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
