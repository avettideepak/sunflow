/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import React from "react";
import { graphql } from "gatsby";
import Layout from "../layout";
import SEO from "../functions/seo";
import ProductPage from "../components/AC-ProductPage/ProductPage";
import { SOLE_PROJECT_LINK } from "../project-config";

export const query = graphql`
  query MyQueryPreview($url: String) {
    allAvettiProductPreview(filter: { url: { eq: $url } }) {
      nodes {
        url
        _0 {
          id
          breadcrumbs {
            name
            url
          }
        }
        productData {
          _xResult {
            code
            itemId
            title
            shortdesc
            longdesc
            longdesc2
            longdesc3
            longdesc4
            properties {
              propname
              propvalue
              propnumber
            }
            hiddenProperties {
              propname
              propvalue
            }
            
            mainitemid
            
            
            vendorId
          }
        }
        supplierData {
          _xResult {
            distributorOrder {
              name
              desc
              rating
              city
              supplier_vid
              supplier_store_vid
            }
          }
        }
        priceInvData {
          _xResult {
            prices {
              price_1
              listprice
              distributorId
            }
            code
            itemid
          }
        }
      }
    }
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
    allSupplierPickupLocationsHasura {
      nodes {
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
    allSupplierShippingInformationHasura {
      nodes {
        instructions
        id
        range
        shipping_type
        supplier_vendorId
        updated_at
      }
    }
  }
`;
const product = ({ data }) => {
  let vendorId =
    data.allAvettiProductPreview.nodes[0].supplierData._xResult[0]
      .distributorOrder[0] &&
    data.allAvettiProductPreview.nodes[0].supplierData._xResult[0]
      .distributorOrder[0].supplier_vid;
  console.info("data55", data, vendorId);

  const { productData } = data.allAvettiProductPreview.nodes[0];
  const code = productData._xResult[0].code;
  const imageUrl = `https://ik.imagekit.io/ofb/store/20180522154/assets/items/largeimages/${code}.jpg?tr=ar-1-1,dpr-2,f-auto,w-300`;

  const storeSellerData = data.allSuppliersHasura.nodes.find(
    sel => sel.supplier_vendorId === vendorId
  );

  const pickupLocData = data.allSupplierPickupLocationsHasura.nodes.find(
    pic => pic.supplier_vendorId === vendorId
  );
  const supplierShippingInfo = data.allSupplierShippingInformationHasura.nodes.filter(
    pic => pic.supplier_vendorId === vendorId
  );

  let storeInfo = {
    storeSellerData,
    pickupLocData,
    supplierShippingInfo,
    vendorId
  };
  console.info("data55", storeInfo);

  return (
    <Layout>
      <SEO
        description={productData._xResult[0].shortdesc}
        lang={"en"}
        title={productData._xResult[0].title}
        code={code}
        pathname={data.allAvettiProductPreview.nodes[0].url}
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
            name: `og:url`,
            content: `${SOLE_PROJECT_LINK}/${
              data.allAvettiProductPreview.nodes[0].url.includes("product")
                ? data.allAvettiProductPreview.nodes[0].url.replace(
                    "product/",
                    ""
                  )
                : data.allAvettiProductPreview.nodes[0].url
            }`
          }
        ]}
      />
      <ProductPage
        data={data.allAvettiProductPreview.nodes[0]}
        storeInfo={storeInfo}
      />
    </Layout>
  );
};

export default product;
