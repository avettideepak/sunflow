/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React from "react";

import Layout from "../layout";
import SEO from "../functions/seo";

import CompareItems from "../components/AC-Compare/CompareItems";

const compareItems = () => {
  return (
    <Layout>
      <SEO title="Compare Items" />
      <CompareItems />
    </Layout>
  );
};

export default compareItems;
