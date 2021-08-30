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
  const newArrivalsLink = `https://bdqapreview.balodana.com/preview/updateditems.ajx?vid=20180730431&vidarray=20180730431,20180522154&type=item&since=2020-04-27`;
  const apiUrl = iid =>
    `https://bdqapreview.balodana.com/preview/uservices/1.0.2/product/20180730431/iid/${iid}/lang/en/`;

  const newArrivals = await fetch(newArrivalsLink)
    .then(res => res.json())
    .catch(err => console.error(err));

  // Gatsby expects sourceNodes to return a promise
  const processData = data => {
    const nodeId = createNodeId(`${data.itemId}-newArrival`);
    const nodeContent = JSON.stringify(data);
    const nodeData = Object.assign({}, data, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `AvettiNewArrivals`,
        content: nodeContent,
        contentDigest: createContentDigest(data)
      }
    });
    return nodeData;
  };
  function wait(ms, value) {
    return new Promise(resolve => setTimeout(resolve, ms, value));
  }

  if (newArrivals.__Result) {
    return await Promise.all(
      newArrivals.__Result.map(async productInitial => {
        console.warn("NewArriVALS", productInitial.itemid);
        await fetch(apiUrl(productInitial.itemid))
          .then(res => res.json())
          .then(json => {
            return wait(1000, processData(json.__Result[0]));
          })
          .then(nodedata => Promise.resolve(createNode(nodedata)))
          .catch(err => Promise.reject(console.error(err)));
      })
    );
  } else {
    return;
  }
};
