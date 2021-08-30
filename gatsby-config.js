/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
require("dotenv").config({
  path: `.env`
});

module.exports = {
  siteMetadata: {
    title: `Shopping Mall & Entertainment`,
    description: `Shopping Mall & Entertainment`,
    author: `@avetti`,
    siteUrl: `https://mall-preview.avetti.io/`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/img`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#217730`,
        theme_color: `#217730`,
        display: `minimal-ui`,
        icon: `src/assets/img/fav.jpg` // This path is relative to the root of the site.
      }
    },
    `gatsby-plugin-sass`,
    {
      resolve: "gatsby-source-avetti-hasura"
    },

    /* { resolve: "gatsby-source-avetti-datafeed" } */

    {
      resolve: "gatsby-source-avetti-category"
    },
    { resolve: "gatsby-source-avetti-store-category" },
    { resolve: `gatsby-source-avetti-menu` },
    {
      resolve: "gatsby-source-avetti-preview"
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        develop: true, // Enable while using `gatsby develop`
        purgeOnly: [
          "/avetti.css",
          "/main.css",
          "/minified.css",
          "/style.css",
          "/b2b2c.css",
          "/products-ac.css"
        ] // Purge only these files/folders
      }
    },
    // {
    //   resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
    //   options: {
    //     devMode: true,
    //     analyzerPort: "3001",
    //     defaultSizes: "gzip"
    //   }
    // }
    /* {
      resolve: "gatsby-plugin-csv-feed",
      options: {
        // Options to pass to `json2csv` parser for all feeds (optional)
        parserOptions: {},
        // Feeds
        feeds: [
          {
            query: `
              {
                allAvettiDataFeed {
                  edges {
                    node {
                      id
                      itemcode
                      itemid
                      last_updated
                      seourl
                    }
                  }
                }
              }
            `,
            serialize: ({ query: { allAvettiDataFeed } }) => {
              return allAvettiDataFeed.edges.map(edge => {
                const node = Object.assign({}, edge.node);
                return {
                  ID: node.id,
                  "Item Code": node.itemcode,
                  "Item ID": node.itemid,
                  "Last Updated Time": node.last_updated,
                  "Final URL": `https://preview.open4business.io/${node.seourl}`
                };
              });
            },
            output: "/product-feed.csv",
            // Options to pass to `json2csv` parser for this feed (optional)
            parserOptions: {}
          }
        ]
      }
    } */
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
};
