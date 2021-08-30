/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React from "react";
import { Helmet } from "react-helmet";

const HelmetSeo = ({ title = "", desc = "", cid = "" }) => {
  if (cid == "search") {
    title = "Search: " + title;
  }
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={desc} />
    </Helmet>
  );
};

export default HelmetSeo;
