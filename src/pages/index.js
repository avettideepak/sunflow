/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React from "react";

import Main from "../components/AC-Main/Main";

import Layout from "../layout";
import SEO from "../functions/seo";
import Product from "../components/AC-ProductPage/ProductPage";
import { staticContents } from "../components/AC-StaticPages/StaticRoutes.js";

import { Router } from "@reach/router";
import StaticContent from "../components/AC-StaticPages/StaticContent";
//8
const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Router>
      <Main path={"/"} />
      {staticContents.map(sta => {
        return <StaticContent path={`/${sta[1]}`} />;
      })}
      <Product dynamic={true} default />
    </Router>
  </Layout>
);

export default IndexPage;
