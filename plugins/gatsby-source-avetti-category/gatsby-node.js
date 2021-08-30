const fs = require("fs");
const path = require("path");
const queryString = require("query-string");
const listOfCat = require("../../preBuildData/categories/list.json");

exports.onPreInit = () => console.log("Loaded Avetti-Source-Category-Plugin");

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
  const processData = (data, name = "Category") => {
    console.error("CID||||", data.cid);
    const nodeId = createNodeId(`${data.cid}${data.page}${name}`);
    const nodeContent = JSON.stringify(data);
    const nodeData = Object.assign({}, data, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `AvettiCategory`,
        content: nodeContent,
        contentDigest: createContentDigest(data)
      }
    });
    return nodeData;
  };

  const processDataMulti = (data, name = "MultiCat") => {
    console.error("CODE||***||", data.code);
    const nodeId = createNodeId(`${data.code}${name}`);
    const nodeContent = JSON.stringify(data);
    const nodeData = Object.assign({}, data, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `AvettiMultiValueCategory`,
        content: nodeContent,
        contentDigest: createContentDigest(data)
      }
    });
    return nodeData;
  };

  let multiValueCatData = [];

  const rendermultiValueProp = data => {
    if (
      data.facets &&
      data.facets.length > 2 &&
      data.facets[2].Other &&
      data.page === 1
    ) {
      data.facets[2].Other.map(l => {
        if (l.name === "Category") {
          l.facetValues.map(value => {
            if (value.count > 0) {
              let tempValue = value;
              tempValue.url = data.url;
              tempValue.cid = data.cid;
              tempValue.cat = data.name;
              multiValueCatData.push(value);
            }
          });
        }
      });
    }
  };

  console.error("CATEGORIES LENGTH", Object.keys(listOfCat).length);
  await Promise.all(
    Object.keys(listOfCat).map(async (cat, index) => {
      return new Promise((ress, rejj) => {
        const fileData = fs.readFileSync(
          path.resolve(__dirname, `../../preBuildData/categories/${cat}.json`),
          "UTF8",
          (err, data) => {
            return data;
          }
        );

        let tempJson = JSON.parse(fileData);
        rendermultiValueProp(tempJson);
        createNode(processData(tempJson));
        ress();
      });
    })
  );
  await Promise.all(
    multiValueCatData.map(async (value, index) => {
      return new Promise((ress, rejj) => {
        createNode(processDataMulti(value));
        ress();
      });
    })
  )
    .then(() =>
      console.info(
        "****************************ALLLL CATEGORIES FULLFILLED|||||||||||||||||||||||********************"
      )
    )
    .catch(err => console.error("CATEGORIES ERROR", err));

  return;
};
