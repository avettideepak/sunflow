/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React from "react";

import Layout from "../layout";
import SEO from "../functions/seo";
import StoresGatsby from "../components/AC-Stores/Stores.jsx";
import { graphql } from "gatsby";
import { Router } from "@reach/router";

const IndexPage = ({
  data,
  pageContext = { pageCount: 1, currentPage: 1, url: "stores" }
}) => {
  console.info("Sellers Here data--", pageContext);
  console.error("AVETTI MENU", data.allAvettiMenu);
  let navCategory = data.allAvettiMenu.edges[0].node.childs.filter(chil =>
    chil.URL.includes("stores")
  )[0];

  return (
    <Layout>
      <SEO title="Stores" />
      <StoresGatsby
        default
        data={data.allAvettiCategory.nodes[0]}
        pageContext={pageContext}
        navCategory={navCategory}
        supplier={data.allSuppliersHasura.nodes}
      />
    </Layout>
  );
};

export const query = graphql`
  query StoresGraphl {
    allAvettiMenu {
      edges {
        node {
          name
          childs {
            name
            description
            cid
            URL
            description
            image
            metadescription
            metakeywords
            position
            thumbnail
            vid
            properties {
              propname
              propvalue
            }
            childs {
              cid
              description
              image
              metadescription
              name
              vid
              URL
              thumbnail
            }
          }
        }
      }
    }
    allAvettiCategory(filter: { url: { eq: "stores" } }) {
      nodes {
        cid
        url
        name
        meta {
          metadescription
          metakeywords
        }
        image
        itemsCount
        numberOfPages
        description
        items {
          id
          title
          code
          desc
          currency_sign
          image
          itemLargeImage
          price {
            value {
              integer
              decimal
            }
          }
          url
          properties {
            lng
            lat
            Website
            UPC
            Sys_Package_Price_Enabled
            Sys_Num_Images
            Supplier_Item_Code
            ProvinceAbv
            Province
            Phone
            
            LineAddress1
            Email
            Created_By_Supplier
            Country
            City
            itemtype

            createtime
          }
        }
        facets {
          Other {
            name
            title
            facetValues {
              count
              name
              removeText
              text
              value
            }
          }
          Price {
            count
            removeText
            text
            value
          }
          Reviews {
            count
            removeText
            text
            value
          }
        }
      }
    }
    allSuppliersHasura {
      nodes {
        supplier_vendorId
        company_name
        location
        city
        province
        country
        brand
        file {
          file_path
        }
        shipping_information {
          range
          shipping_type
          supplier_vendorId
        }
        pickup_locations {
          address_place
          latitude
          longitude
          pickup_location_name
        }
      }
    }
  }
`;

export default IndexPage;
