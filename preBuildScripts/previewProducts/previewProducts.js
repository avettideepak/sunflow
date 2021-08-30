const fs = require("fs");
const path = require("path");

const { fetchHere } = require("./previewProductFunctions.js");
const { setTimePreview } = require("../misc/commonFunctions.js");

const run = async res => {
  const listOfURL = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, "../../preBuildData/listUrl.json"),
      "UTF8",
      (err, data) => {
        return data;
      }
    )
  );

  const listOfPreviewProducts = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, "../../preBuildData/previewProducts/list.json"),
      "UTF8",
      (err, data) => {
        return data;
      }
    )
  );

  let newProductList = fs.readFileSync(
    path.resolve(__dirname, "../../preBuildData/listPreview.json"),
    "UTF8",
    (err, data) => {
      return data;
    }
  );

  let uniqueProductCodes = [...new Set(JSON.parse(newProductList))];
  console.error("UNIQUE 1", uniqueProductCodes.length);
  uniqueProductCodes = uniqueProductCodes.filter(uni => {
    if (Object.values(listOfPreviewProducts).includes(String(uni))) {
      return false;
    } else {
      return true;
    }
  });
  console.error("UNIQUE 2", uniqueProductCodes.length);

  await Promise.all(
    uniqueProductCodes.map(async (code, indexTemp) => {
      await setTimePreview(fetchHere, indexTemp, code, listOfURL);
    })
  )
    .then(() =>
      console.info(
        "****************************ALLLL PREVIEW PRODUCTS FULLFILLED|||||||||||||||||||||||********************"
      )
    )
    .then(() => res())
    .catch(err => console.error("PROMISE ALL PREVIEW PRODUCTS ERROR", err));
};

module.exports = run;
