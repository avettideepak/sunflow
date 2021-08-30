const fs = require("fs");
const path = require("path");
const {
  apiUrlNew,
  productUrl,
  supplierUrl,
  priceInventoryUrl
} = require("../misc/links.js");

function wait(ms, value) {
  return new Promise(resolve => setTimeout(resolve, ms, value));
}

const writePreviewProductToFile = async (dat, json, productFinalData) => {
  await fs.readFile(
    path.resolve(__dirname, "../../preBuildData/previewProducts/list.json"),
    (err, fileData) => {
      let tempData = JSON.parse(fileData);
      tempData = { ...tempData, [dat.loc]: json[0].id };
      console.error("YOYOYOYOYO", tempData);
      fs.writeFile(
        path.resolve(__dirname, "../../preBuildData/previewProducts/list.json"),
        JSON.stringify(tempData),
        { flag: "w" },
        err => {
          if (err) throw err;
          console.log("Preview Product Data written to file");
        }
      );
    }
  );

  await fs.writeFileSync(
    path.resolve(
      __dirname,
      `../../preBuildData/previewProducts/${json[0].id}.json`
    ),
    JSON.stringify(productFinalData),
    { flag: "wx" },
    err => {
      if (err) throw err;
      console.log("Preview Product Data written to file");
    }
  );
};

const fetchHere = async (dat, res, rej, listOfURL) => {
  let listObj = listOfURL;
  console.error("PREVIEW IS HERE", apiUrlNew(dat));
  await fetch(apiUrlNew(dat))
    .then(res => res.json())
    .then(async json => {
      const productData = await fetch(productUrl(dat))
        .then(res => res.json())
        .catch(err => console.error(err));
      const supplierData = await fetch(supplierUrl(dat))
        .then(res => res.json())
        .catch(err => console.error(err));
      const priceInvData = await fetch(priceInventoryUrl(dat))
        .then(res => res.json())
        .catch(err => console.error(err));

      const productFinalData = {
        ...json,
        url: listObj[dat],
        productData,
        supplierData,
        priceInvData
      };
      console.info("FINAL COUNTDOWN", listObj[dat]);

      return { dat: { loc: listObj[dat] }, json, productFinalData };
    })
    .then(async ({ dat, json, productFinalData }) => {
      await writePreviewProductToFile(dat, json, productFinalData);
    })
    .then(() => res())
    .catch(err => rej(console.error(err)));
};

module.exports = { wait, fetchHere };
