/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React from "react";
// import { useSelector, shallowEqual } from "react-redux";

import Layout from "@/layout";
import SEO from "@/functions/seo";
import { useStaticQuery, graphql, withPrefix } from "gatsby";

// import Test from "../other/test";
// import StaticContent from "../components/AC-StaticPages/StaticContent";
import MallMapComponent from "../components/AC-MallMap/MallMap"


function MallMap () {

  const data = useStaticQuery(graphql`
  query supplierQuery {
      allSuppliersHasura {
        nodes {
          brand
          description
          city
          created_at
          state
          location
          company_name
          phone_number
          id
          facebook
          instagram
          pinterest
          postal_code
          province
          supplier_vendorId
          twitter
          website
          year
          url
        }
      }
    }
  `);

  const storeSellerData = data.allSuppliersHasura.nodes;

  return (
    <Layout>
      <SEO title="Mall Map" />
      <MallMapComponent storeSellerData={storeSellerData}/>
    </Layout>
  );
};

export default MallMap; 
