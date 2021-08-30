/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React from "react";
import { graphql } from "gatsby";
import Layout from "../layout";
import CategoryPage from "../components/AC-CategoryPage/Category_Static";
import CategorySellersPage from "../components/AC-Stores/Stores.jsx";

import SEO from "../functions/seo";
import { SOLE_PROJECT_LINK } from "../project-config";

export const query = graphql`
  query MyQuery2Store($url: [String], $Created_By_Supplier: String) {
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
    allAvettiCategoryStore(filter: { url: { in: $url } }) {
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
            UPC
            Deals_Property
            Trending_Now 
            Sys_Num_Images
            Supplier_Item_Code
            ITEM_TYPE
            Created_By_Supplier
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
    suppliersHasura(supplier_vendorId: { eq: $Created_By_Supplier }) {
      brand
      city
      description
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
      country
      supplier_vendorId
      twitter
      website
      year
      url
      file {
        file_path
      }
      shipping_information {
        instructions
        id
        range
        shipping_type
        supplier_vendorId
        updated_at
      }
      pickup_locations {
        additional_information
        address_place
        id
        latitude
        longitude
        pickup_location_name
        supplier_vendorId
        time
        updated_at
      }
    }
  }
`;
const categoryStore = ({ data, pageContext }) => {
  const name = data.allAvettiCategoryStore.nodes[0].name;
  const meta = data.allAvettiCategoryStore.nodes[0].meta;
  const image = data.allAvettiCategoryStore.nodes[0].image;

  const imageUrl = `${image.replace("/images", "/largeimages")}`;

  const navCategory = data.allAvettiMenu.edges[0].node.childs.filter(
    chil => chil.cid === data.allAvettiCategoryStore.nodes[0].cid
  )[0];

  return (
    <Layout>
      <SEO
        description={data.allAvettiCategoryStore.nodes[0].meta.metadescription}
        lang={"en"}
        title={name}
        pathname={data.allAvettiCategoryStore.nodes[0].url}
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
            content: `${SOLE_PROJECT_LINK}/${data.allAvettiCategoryStore.nodes[0].url}`
          }
        ]}
      />
      {data.allAvettiCategoryStore.nodes[0].name === "Sellers" ? (
        <CategorySellersPage
          data={data.allAvettiCategoryStore.nodes[0]}
          pageContext={pageContext}
          navCategory={data.allAvettiMenu.edges[0].node.childs.find(
            chil => chil.name === "Sellers"
          )}
          supplier={data.suppliersHasura !== null ? [data.suppliersHasura] : []}
        />
      ) : (
        <CategoryPage
          data={data.allAvettiCategoryStore.nodes[0]}
          pageContext={pageContext}
          navCategory={navCategory}
          supplier={data.suppliersHasura !== null ? [data.suppliersHasura] : []}
        />
      )}
    </Layout>
  );
};

export default categoryStore;
