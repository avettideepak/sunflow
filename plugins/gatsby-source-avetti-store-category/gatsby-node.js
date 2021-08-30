const fs = require("fs");
const path = require("path");
const queryString = require("query-string");
const listOfCat = require("../../preBuildData/stores/list.json");
const storesState = require("../../preBuildData/stores.json");

exports.onPreInit = () =>
  console.log("Loaded Avetti-Source-Store-Category-Plugin");

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

  // Gatsby expects sourceNodes to return a promise
  const processData = (data, name = "Store") => {
    console.warn("CID||||", data.name, data.cid);
    const nodeId = createNodeId(`${data.name}${data.page}${name}`);
    const nodeContent = JSON.stringify(data);
    const nodeData = Object.assign({}, data, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `AvettiCategoryStore`,
        content: nodeContent,
        contentDigest: createContentDigest(data)
      }
    });
    return nodeData;
  };

  await Promise.all(
    Object.keys(listOfCat).map(async (cat, index) => {
      return new Promise((ress, rejj) => {
        const fileData = fs.readFileSync(
          path.resolve(__dirname, `../../preBuildData/stores/${cat}.json`),
          "UTF8",
          (err, data) => {
            return data;
          }
        );
        createNode(processData(JSON.parse(fileData)));
        ress();
      });
    })
  )
    .then(() =>
      console.info(
        "****************************ALLLL STORES FULLFILLED|||||||||||||||||||||||********************"
      )
    )
    .catch(err => console.error("STORES ERROR", err));

  return;
};
