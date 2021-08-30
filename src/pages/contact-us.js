/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React from "react";
// import { useSelector, shallowEqual } from "react-redux";

import Layout from "@/layout";
import SEO from "@/functions/seo";

// import Test from "../other/test";
// import StaticContent from "../components/AC-StaticPages/StaticContent";
import ContactUs from "../components/AC-ContactUs/ContactUs"


function contactUs () {

  return (
    <Layout>
      <SEO title="Contact Us" />
      <ContactUs/>
    </Layout>
  );
};

export default contactUs;
