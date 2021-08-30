/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import PropTypes from "prop-types";

export default function HTML({ htmlAttributes, ...props }) {
  const renderedChildren = renderToStaticMarkup(<Root {...props} />);
  return (
    <html
      {...htmlAttributes}
      dangerouslySetInnerHTML={{
        __html: `
<!---------------------------------------
    Copyright 2020 Avetti.com Corporation - All Rights Reserved.
    This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20) that is accessible at https://www.avetticommerce.com/license 
---------------------------------------->
				${renderedChildren}
			`
      }}
    />
  );
}

const Root = props => (
  <React.Fragment>
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      {props.headComponents}
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://listeo.pro/wp-content/themes/listeo/css/icons.css"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <script defer src="/geoLocation.js" />
      {/* Calendly link widget begin */}
      <link
        href="https://assets.calendly.com/assets/external/widget.css"
        rel="stylesheet"
      />
      <script
        src="https://assets.calendly.com/assets/external/widget.js"
        type="text/javascript"
      ></script>
      {/* Calendly link widget end  */}
    </head>
    <body {...props.bodyAttributes}>
      {props.preBodyComponents}
      <div id="backdrop-hook"></div>
      <div id="modal-hook"></div>
      <div
        key={`body`}
        id="___gatsby"
        dangerouslySetInnerHTML={{ __html: props.body }}
      />
      {props.postBodyComponents}
      <footer>
        <script
          defer
          src="https://sdk.mixmax.com/v2.0.0/widgets.umd.min.js"
        ></script>
        <script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDLzx_lFSnCjNFzbmCvIjwcq5YE2YAXt_w&libraries=places"
          async
        ></script>
        <script
          src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"
          async
          defer
        ></script>
        <script
          type="text/javascript"
          id="hs-script-loader"
          async
          defer
          src="//js.hs-scripts.com/1766433.js"
        ></script>
        <script
          defer
          charSet="utf-8"
          type="text/javascript"
          src="//js.hsforms.net/forms/shell.js"
        ></script>
      </footer>
    </body>
  </React.Fragment>
);

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array
};
