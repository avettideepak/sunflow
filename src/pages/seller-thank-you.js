/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React from "react";

import Layout from "../layout";
import SEO from "../functions/seo";

import StaticContent from "../components/AC-StaticPages/StaticContent";

const sellerThanks = () => {
  return (
    <Layout>
      <SEO title="Thank You" />
      <StaticContent />
    </Layout>
  );
};

export default sellerThanks;
