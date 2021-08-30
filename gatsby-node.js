/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */

const path = require("path");

exports.createPages = async ({ actions, graphql, reporter }) => {
  const productsPreview = graphql(`
    query MyQuery {
      allAvettiProductPreview {
        nodes {
          url
        }
      }
    }
  `)
    .then(result => {
      if (result.errors) {
        Promise.reject(result.errors);
      }

      // Create product pages
      result.data.allAvettiProductPreview.nodes.forEach(node => {
        console.info("URL::::", node.url.replace("product/", ""));
        actions.createPage({
          path: `/${node.url.replace("product/", "")}`,
          component: require.resolve("./src/templates/productPreview.js"),
          context: {
            url: node.url
          }
        });
      });
    })
    .catch(err => console.error("error productsPreview graphql", err));

  const categories = graphql(`
    query MyQuery {
      allAvettiCategory {
        nodes {
          url
          numberOfPages
          cid
          page
        }
      }
    }
  `).then(async result => {
    if (result.errors) {
      Promise.reject(result.errors);
    }
    // Create product pages
    result.data.allAvettiCategory.nodes.forEach(async node => {
      const pageCount =
        Number(node.numberOfPages) > 0 ? Number(node.numberOfPages) : 1;
      console.info("::CAT::", node.url);
      if (pageCount > 0) {
        actions.createPage({
          path: `/${node.url}`,
          component: require.resolve("./src/templates/category.js"),
          context: {
            pageCount,
            currentPage: node.page,
            url: node.url,
            cid: node.cid
          }
        });
      } /* else {
        actions.createPage({
          path: `/${node.url}`,
          component: require.resolve("./src/templates/categoryNoItem.js"),
          context: {
            pageCount,
            currentPage: 1,
            url: node.url,
            cid: node.cid,
            type: node.type
          }
        });
      } */
    });
  });

  const categoriesStore = graphql(`
    query MyQueryStore {
      allAvettiCategoryStore {
        nodes {
          page
          url
          numberOfPages
          Created_By_Supplier
        }
      }
    }
  `).then(async result => {
    if (result.errors) {
      Promise.reject(result.errors);
    }
    // Create product pages
    result.data.allAvettiCategoryStore.nodes.forEach(async node => {
      const pageCount =
        Number(node.numberOfPages) > 0 ? Number(node.numberOfPages) : 1;
      console.info("::STORE::", node.url);
      if (pageCount > 0) {
        actions.createPage({
          path: `/${node.url}`,
          component: require.resolve("./src/templates/categoryStore.js"),
          context: {
            pageCount,
            currentPage: node.page,
            url: node.url,
            cid: node.cid,
            Created_By_Supplier: node.Created_By_Supplier
          }
        });
      }
    });
  });

  return Promise.all([productsPreview, categories, categoriesStore]);
};
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  // Only update the `/app` page.
  /*   if (page.path.match(/^\/shop/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = "/shop/*"

    // Update the page.
    createPage(page)
  } */
  if (page.path.match(/^\/stores/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = "/stores/*";

    // Update the page.
    createPage(page);
  }
  if (page.path.match(/^\/preview/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = "/preview/*";

    // Update the page.
    createPage(page);
  }
  if (page.path.match(/^\/search/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = "/search/*";

    // Update the page.
    createPage(page);
  }
  if (page.path === `/`) {
    page.matchPath = `/*`;
    createPage(page);
  }
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /bad-module/,
            use: loaders.null()
          }
        ]
      }
    });
  }
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, `src`),
        "@assets": path.resolve(__dirname, `src/assets`),
        "@components": path.resolve(__dirname, `src/components`)
      }
    }
  });
};
