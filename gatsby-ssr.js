/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
const React = require("react");
const { Helmet } = require("react-helmet");

exports.onRenderBody = (
  { setHeadComponents, setHtmlAttributes, setBodyAttributes },
  pluginOptions
) => {
  const helmet = Helmet.renderStatic();
  setHtmlAttributes(helmet.htmlAttributes.toComponent());
  setBodyAttributes(helmet.bodyAttributes.toComponent());
  setHeadComponents([
    helmet.title.toComponent(),
    helmet.link.toComponent(),
    helmet.meta.toComponent(),
    helmet.noscript.toComponent(),
    helmet.script.toComponent(),
    helmet.style.toComponent()
  ]);
};

exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  /**
   * @type {any[]} headComponents
   */
  const headComponents = getHeadComponents();

  headComponents.sort((a, b) => {
    if (a.type === b.type || (a.type !== "style" && b.type !== "style")) {
      return 0;
    }

    if (a.type === "style") {
      return 1;
    } else if (b.type === "style") {
      return -1;
    }

    return 0;
  });

  headComponents.forEach(head => {
    if (head.props && head.props["data-react-helmet"]) {
      head.props["property"] = head.props["name"];
      delete head.props["name"];
      delete head.props["data-react-helmet"];
    }
  });

  replaceHeadComponents(headComponents);
};

/* exports.onPreRenderHTML = ({ replaceHeadComponents, getHeadComponents }) => {
  const headComponents = getHeadComponents();
  console.log(headComponents);
  headComponents.sort((a, b) => {
    if (a.props && a.props["data-react-helmet"]) {
      return 0;
    }
    return 1;
  });
  headComponents.forEach((head) => {
    if (head.props && head.props["data-react-helmet"]) {
      delete head.props["data-react-helmet"];
    }
  });

  replaceHeadComponents(headComponents);
}; */
