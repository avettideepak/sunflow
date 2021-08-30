const fs = require("fs");
const path = require("path");
const queryString = require("query-string");

const listOfPreviewProducts = require("../../preBuildData/previewProducts/list.json");
const newProductList = require("../../preBuildData/listPreview.json");

exports.onPreInit = () => console.log("Loaded Avetti-Source-Preview-Plugin");

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
  const processData = data => {
    console.warn("PREVIEW PRODUCTS", data[0].id);
    const nodeId = createNodeId(`${data[0].id}`);
    const nodeContent = JSON.stringify(data);
    const nodeData = Object.assign({}, data, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `AvettiProductPreview`,
        content: nodeContent,
        contentDigest: createContentDigest(data)
      }
    });
    return nodeData;
  };

  //////////////////////////////////////////////////

  await Promise.all(
    Object.values(listOfPreviewProducts).map(async (code, index) => {
      return new Promise((ress, rejj) => {
        const fileData = fs.readFileSync(
          path.resolve(
            __dirname,
            `../../preBuildData/previewProducts/${code}.json`
          ),
          "UTF8",
          (err, data) => {
            return data;
          }
        );
        let jsonFileData = JSON.parse(fileData);
        if (
          jsonFileData &&
          jsonFileData.priceInvData &&
          jsonFileData.priceInvData.__Success &&
          jsonFileData.priceInvData.__Success === "true" &&
          Object.keys(jsonFileData).includes("supplierData") &&
          Object.keys(jsonFileData.supplierData).includes("__Success") &&
          jsonFileData.supplierData.__Success === "true" &&
          jsonFileData.productData &&
          !jsonFileData["0"].properties.find(obj =>
            Object.keys(obj).some(key => key === "")
          )
        ) {
          createNode(processData(jsonFileData));
          ress();
        } else {
          rejj();
        }
      });
    })
  )
    .then(() =>
      console.info(
        "****************************ALLLL PREVIEW PRODUCTS FULLFILLED|||||||||||||||||||||||********************"
      )
    )
    .catch(err => console.error("PREVIEW PRODUT ERROR", err));

  return;
};
