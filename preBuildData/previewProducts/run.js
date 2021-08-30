const path = require("path");
const fs = require("fs");
const { readdirSync, readFileSync, writeFileSync } = require("fs");

const run = async res => {
  await fs.writeFileSync(
    path.resolve(__dirname, "./list.json"),
    JSON.stringify({}),
    { flag: "w" },
    err => {
      if (err) throw err;
      console.log("LIST UPDATED");
    }
  );
  await readdirSync(path.resolve(__dirname, "./"))
    .filter(filePath => filePath.match(/.*\.json$/))
    .filter(function (name) {
      return !name.startsWith("list");
    })
    .reduce(async (acc, r) => {
      let product = require("./" + r);
      return acc.then(() => {
        return new Promise(async (ress, rejj) => {
          let tempData = JSON.parse(
            readFileSync(path.resolve(__dirname, "./list.json"), "UTF-8")
          );
          if (!Object.keys(tempData).includes(product.url)) {
            tempData = { ...tempData, [product.url]: product[0].id };
            writeFileSync(
              path.resolve(__dirname, "./list.json"),
              JSON.stringify(tempData),
              { flag: "w" }
            );
            ress();
          } else {
            ress();
          }
        }).catch(err => console.error(err));
      });
    }, Promise.resolve());
  console.error("Product List Checked");
  res();
};

module.exports = run;
