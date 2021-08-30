/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";

import FooterContentFunc from "./footerContent";
import AnchorElement from "../../functions/AnchorElement.jsx";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

import { I18nContext } from "../../i18n/index";
function Footer() {
  const data = useStaticQuery(graphql`
    query {
      Logo: file(relativePath: { eq: "Logonew.png" }) {
        childImageSharp {
          fixed(width: 230) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  `);

  const { translate } = React.useContext(I18nContext);

  const langState = useSelector(state => state.mainReducer.lang, shallowEqual);

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  const loginNameState = useSelector(
    state => state.loginReducer.loginName,
    shallowEqual
  );

  const [footerContent, setFooterContent] = useState({});

  useEffect(() => {
    setFooterContent(FooterContentFunc(langState, loginNameState));
    return () => {
      setFooterContent({});
    };
  }, [langState]);

  const [activeFooterSection, setActiveFooterSection] = useState("");

  const renderLinks = arrContent => {
    return arrContent.map((content, i) => (
      <li {...content.parent.attributes} key={i}>
        {content.children.map((childContent, i) => {
          return <AnchorElement {...childContent} key={i} />;
        })}
      </li>
    ));
  };

  
  if (footerContent && Object.keys(footerContent).length > 0) {
    if (isMobileState) {
      const handleOnClickFooterSection = e => {
        const { target: clickedFooterSectionTarget } = e.target.dataset;
        setActiveFooterSection(
          activeFooterSection !== clickedFooterSectionTarget &&
          clickedFooterSectionTarget
        );

        console.info(
          "activeFooterSection",
          activeFooterSection,
          clickedFooterSectionTarget
        );
      };

      const handleWhatIconToDisplay = footerSectionName => {
        return activeFooterSection === footerSectionName
          ? `remove_circle`
          : `add_circle`;
      };
      return (
        <footer id="footer">
          <div className="new-footer" style={{ maxWidth: "100%" }}>
            <div className="columns " style={{ maxWidth: "100%" }}>
              <div className="footer_Line">
                <div>
                  <div className="footerLogo pull-left">
                    <Img
                      fixed={data.Logo.childImageSharp.fixed}
                      alt="Avetti eCommerce Logo"
                    />
                  </div>
                </div>
              </div>
              {/* Mobile Version */}
              
              
            </div>
          </div>
        </footer>
      );
    } else {
      return (
        <footer id="footer">
          <div>
            <div className="fo">
              <div className="fo-left">
                <h1>We would love to<br/> hear from you</h1>
                <ul>
                  <li><img src="https://ik.imagekit.io/ofb/sunflow/phone-alt_ahszklOAL.png"/> 705-252-8814</li>
                  <li><img src="https://ik.imagekit.io/ofb/sunflow/envelope_RFcIMOz2br.png"/>info@sunflow.ca</li>
                </ul>
                <p>
                Sales office</p>
                <div className="mapb"><img src="https://ik.imagekit.io/ofb/sunflow/Rectangle_5_SmmlxzkC9.png?updatedAt=1630048473990" /></div>
                  
                  <span>30 Quarry Ridge Rd, L4M 7G1 - Barrie
                  </span>
              </div>
              <div className="fo-right" id="contactForm">
              <h1>Get a quote</h1>
              <p>Fill in the form and one of our specialists will get back to you.</p>
                <div className="fornf">
                  <div className="fornfL">
                    <label>First Name</label>
                    <input type="text" placeholder="Your first name" />
                  </div>
                  <div className="fornfR">
                    <label>Last Name</label>
                    <input type="text" placeholder="Your last name" />
                  </div>
                </div>  
                <div className="fornf1">
                  <div className="fornfL1">
                    <label>EMAIL</label>
                    <input type="text" placeholder="Your email address" />
                  </div>
                  <div className="fornfR1">
                    <label>PHONE</label>
                    <input type="text" placeholder="Your phone" />
                  </div>
                </div>  
                <div className="fornf2">
                  <div className="fornfL2">
                    <label>How do you want to be contacted?</label>
                    <select>
                      <option>By email</option>
                      </select>
                  </div>
                </div>  
                <div className="fornf3">
                  <div className="fornfL3">
                    <label>MESSAGE</label>
                    <input type="text" placeholder="Leave your message" />
                  </div>
                </div> 

                <span>SEND <img src="https://ik.imagekit.io/ofb/sunflow/arrow-right_QHxNy1I718.png?updatedAt=1630049327061" /></span>           

              </div>
            </div>
          </div>
        </footer>
      );
    }
  } else {
    return null;
  }
}

export default Footer;
