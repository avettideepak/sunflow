require("es6-promise").polyfill();
require("isomorphic-fetch");
const queryString = require("query-string");

exports.onPreInit = () => console.log("Loaded Avetti-Source-Hasura-Plugin");

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions;

  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins;

  // plugin code goes here...
  // Convert the options object into a query string
  const apiOptions = queryString.stringify(configOptions);
  // Join apiOptions with the Pixabay API URL

  const hasuraDataProcess = async resultPromise => {
    var graphql = JSON.stringify({
      query: `{
  suppliers {
    address
    brand
    city
    created_at
    state
    location
    company_name
    phone_number
    description
    id
    facebook
    instagram
    pinterest
    postal_code
    province
    country
    supplier_vendorId
    twitter
    values
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
  supplier_pickup_locations {
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
  supplier_shipping_information {
    instructions
    id
    range
    shipping_type
    supplier_vendorId
    updated_at
  }
}
`,
      variables: {}
    });

    await fetch("https://graphqldev.avetti.ca/v1/graphql", {
      method: "POST",
      headers: {
        "X-Hasura-Admin-Secret": "demo1234",
        "Content-Type": "application/json"
      },
      body: graphql,
      redirect: "follow"
    })
      .then(response => response.json())
      .then(result => {
        console.error(
          "************************************************************************************",
          Object.keys(result.data)
        );

        Object.keys(result.data).map(dd =>
          result.data[dd].map((ddItem, index) => {
            if (dd === "suppliers") {
              if (
                Object.keys(ddItem).includes("description") &&
                ddItem.description !== null &&
                Object.keys(ddItem.description).includes("blocks") &&
                ddItem.description.blocks.length > 0
              ) {
                ddItem.description = ddItem.description.blocks
                  .map(l => l.text)
                  .join("\n\n");
              }
            }
            return createNode(processData(ddItem, dd, index));
          })
        );
      })
      .then(() => resultPromise())
      .catch(error => console.log("HASURA ERROR", error));
  };

  // Gatsby expects sourceNodes to return a promise
  const processData = (data, name, index) => {
    const nodeId = createNodeId(`${name}-${index}-hasura`);
    const nodeContent = JSON.stringify(data);
    const nodeData = Object.assign({}, data, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `${name}Hasura`,
        content: nodeContent,
        contentDigest: createContentDigest(data)
      }
    });
    return nodeData;
  };

  await new Promise((res, rej) => {
    hasuraDataProcess(res);
  });

  return;
};
