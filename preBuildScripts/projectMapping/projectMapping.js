const fs = require("fs");
const path = require("path");

const run = async res => {
  let projectTree = {};
  const categories = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, "../../preBuildData/menu.json"),
      "UTF8",
      (err, data) => {
        return data;
      }
    )
  );

  categories.childs
    .filter(f => f.name !== "Sellers")
    .map(async cat => {
      let catData = await JSON.parse(
        fs.readFileSync(
          path.resolve(
            __dirname,
            `../../preBuildData/categories/${cat.cid}.json`
          ),
          "UTF8",
          (err, data) => {
            return data;
          }
        )
      );

      projectTree[cat.URL.replace("shop/", "")] = {
        url: cat.URL.replace("shop/", "")
      };

      let firstPageProducts = [...catData.itemsFirstPage.map(p => p.url)];

      let otherPagesProducts = [];

      Object.keys(catData.otherPages).map(other => {
        otherPagesProducts = [
          ...otherPagesProducts,
          ...catData.otherPages[other].map(p => p.url.replace("product/", ""))
        ];
      });

      projectTree[cat.URL.replace("shop/", "")].products = [
        ...firstPageProducts,
        ...otherPagesProducts
      ];

      await fs.writeFile(
        path.resolve(__dirname, "../../preBuildData/projectTree.json"),
        JSON.stringify(projectTree),
        { flag: "w" },
        err => {
          if (err) throw err;
          console.log("Project TREE Data written to file");
        }
      );

      console.info(
        "****************************ALLLL PREVIEW PRODUCTS FULLFILLED|||||||||||||||||||||||********************"
      );

      res();
    });
};

module.exports = run;
