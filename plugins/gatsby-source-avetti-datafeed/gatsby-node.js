const fs = require("fs");
const fetch = require("node-fetch");
const queryString = require("query-string");

exports.onPreInit = () =>
  console.log("Loaded Avetti-Source-Category-Custom-Plugin");

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

  const GET_UPDATE_ITEMS = date =>
    `https://preview.open4business.io/preview/uservices/1.0.2/updated-products/20180522154/vidarray/20180521148,20180522154/type/item/since/${date}`;

  const dataFeed = await fetch(GET_UPDATE_ITEMS("2020-05-01"))
    .then(res => res.json())
    .catch(err => console.error(err));

  // Gatsby expects sourceNodes to return a promise
  const processData = data => {
    const nodeId = createNodeId(`${data.itemid}-dataFeed`);
    const nodeContent = JSON.stringify(data);
    const nodeData = Object.assign({}, data, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `AvettiDataFeed`,
        content: nodeContent,
        contentDigest: createContentDigest(data)
      }
    });
    return nodeData;
  };

  return await Promise.all(
    dataFeed.__Result.map(node =>
      Promise.resolve(createNode(processData(node)))
    )
  );
};
