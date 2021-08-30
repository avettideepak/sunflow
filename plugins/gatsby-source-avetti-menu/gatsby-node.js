const fs = require("fs");
const path = require("path");
const queryString = require("query-string");
const menuData = require("../../preBuildData/menu.json");

exports.onPreInit = () =>
  console.log("Loaded Avetti-Source-Category-Menu-Plugin");

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

  const menuDataProcess = async (func, result) => {
    await result(func(processData(menuData)));
  };

  // Gatsby expects sourceNodes to return a promise
  const processData = data => {
    const nodeId = createNodeId(`${data.itemId}-menu`);
    const nodeContent = JSON.stringify(data);
    const nodeData = Object.assign({}, data, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `AvettiMenu`,
        content: nodeContent,
        contentDigest: createContentDigest(data)
      }
    });
    return nodeData;
  };

  await new Promise((res, rej) => {
    createNode(processData(menuData));
    res();
  });
  return;
};
