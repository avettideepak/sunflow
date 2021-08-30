/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import { I18nContext } from "../i18n/index";
export default function AnchorElement({ attributes, ...props }) {
  const data = useStaticQuery(graphql`
    query {
      Facebook: file(relativePath: { eq: "Facebook.png" }) {
        childImageSharp {
          fixed(width: 30, height: 30) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
      Linkedin: file(relativePath: { eq: "Linkedin.png" }) {
        childImageSharp {
          fixed(width: 30, height: 30) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
      Instagram: file(relativePath: { eq: "instagram.png" }) {
        childImageSharp {
          fixed(width: 30, height: 30) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
      Twitter: file(relativePath: { eq: "Twitter.png" }) {
        childImageSharp {
          fixed(width: 30, height: 30) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  `);

  const { translate } = React.useContext(I18nContext);
  const renderInnerHTML = () => {
    return props.image ? (
      <Img fixed={data[props.image].childImageSharp.fixed} alt={props.image} />
    ) : (
      translate(props.text)
    );
  };
  if (attributes.to) {
    return <Link {...attributes}>{renderInnerHTML()}</Link>;
  }
  return <a {...attributes}>{renderInnerHTML()}</a>;
}
