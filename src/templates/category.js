/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React from "react";
import { graphql } from "gatsby";
import Layout from "../layout";
import CategoryPage from "../components/AC-CategoryPage/Category_Static";

import SEO from "../functions/seo";
import { SOLE_PROJECT_LINK } from "../project-config";

export const query = graphql`
  query MyQuery2($url: String) {
    allAvettiMenu {
      edges {
        node {
          name
          childs {
            name
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
    allAvettiCategory(filter: { url: { eq: $url } }) {
      nodes {
        cid
        page
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
            ItemLevel
            Store_Hrs
            LineAddress1
            Email
            Created_By_Supplier
            Country
            City           
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
        description
        location
        city
        province
        country
        brand
        phone_number 
        file {
          file_path
        }
        shipping_information {
          shipping_type
          id
          instructions
          range
          supplier_vendorId
        }
        pickup_locations {
          id
          latitude
          longitude
          address_place
          pickup_location_name
          supplier_vendorId
        }
      }
    }
  }
`;
const Category = ({ data, pageContext }) => {
  const name = data.allAvettiCategory.nodes[0].name;
  const meta = data.allAvettiCategory.nodes[0].meta;
  const image = data.allAvettiCategory.nodes[0].image;
  // console.info("DATA HERE", data.allAvettiCategory.nodes[0]);
  const imageUrl = `https://bdqapreview.balodana.com/preview/store/${image}`;
  const navCategory = data.allAvettiMenu.edges[0].node.childs.filter(
    chil =>
      chil.URL.replace("shop/", "") === data.allAvettiCategory.nodes[0].url
  )[0];

  return (
    <Layout>
      <SEO
        description={data.allAvettiCategory.nodes[0].meta.metadescription}
        lang={"en"}
        title={name}
        pathname={data.allAvettiCategory.nodes[0].url}
        meta={[
          {
            name: `og:image`,
            content: imageUrl
          },
          {
            name: `og:image:secure_url`,
            content: imageUrl
          },
          {
            name: `twitter:image`,
            content: imageUrl
          },
          {
            name: `metakeywords`,
            content: meta.metakeywords
          },
          {
            name: `og:url`,
            content: `${SOLE_PROJECT_LINK}/${data.allAvettiCategory.nodes[0].url}`
          }
        ]}
      />
      {data.allAvettiCategory.nodes[0].name === "Sellers" ? null : (
        <CategoryPage
          data={data.allAvettiCategory.nodes[0]}
          pageContext={pageContext}
          navCategory={navCategory}
          supplier={data.allSuppliersHasura.nodes}
        />
      )}
    </Layout>
  );
};

export default Category;
