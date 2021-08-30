const fs = require("fs");
const path = require("path");

const { pagingUrl } = require("../misc/links.js");

const fetchHerePagination = async (dat, acc = []) => {
  console.info("HERE WE ARE|||||||||||||||||||||", dat);
  return new Promise(async (resFet, rejFet) => {
    await fetch(pagingUrl(dat.cid, dat.number))
      .then(res => res.text())
      .then(text => JSON.parse(text))
      .then(result => {
        return resFet([...acc, result]);
      })
      .catch(err => rejFet(console.error(err)));
  });
};

const promiseFile = async (b, c) => {
  return await Promise.all([
    new Promise(function (resolve, reject) {
      fs.readFile(
        path.resolve(__dirname, "../../preBuildData/listPreview.json"),
        "UTF8",
        (err, fileData) => {
          let tempData = JSON.parse(fileData);
          tempData = [...tempData, ...b];
          fs.writeFile(
            path.resolve(__dirname, "../../preBuildData/listPreview.json"),
            JSON.stringify(tempData),
            { flag: "w" },
            err => {
              if (err) reject(err);
              else resolve(console.error("CAT PRODUCT DATA WROTEN"));
            }
          );
        }
      );
    }),
    new Promise(function (resolve, reject) {
      fs.readFile(
        path.resolve(__dirname, "../../preBuildData/listUrl.json"),
        "UTF8",
        (err, fileData) => {
          let tempData = JSON.parse(fileData);
          tempData = { ...tempData, ...c };
          fs.writeFile(
            path.resolve(__dirname, "../../preBuildData/listUrl.json"),
            JSON.stringify(tempData),
            { flag: "w" },
            err => {
              console.info("HELLO WORLD");
              if (err) reject(err);
              else resolve(console.error("CAT PRODUCT DATA WROTEN"));
            }
          );
        }
      );
    })
  ]);
};

const promiseFileNew = async (b, c, resolveTop) => {
  return Promise.all([
    new Promise(function (resolve, reject) {
      let tempData = JSON.parse(
        fs.readFileSync(
          path.resolve(__dirname, "../../preBuildData/listPreview.json"),
          "UTF8"
        )
      );
      tempData = [...tempData, ...b];
      fs.writeFileSync(
        path.resolve(__dirname, "../../preBuildData/listPreview.json"),
        JSON.stringify(tempData),
        { flag: "w" }
      );
      console.log("DATA WRITTEN 1");
      resolve();
    }),
    new Promise(function (resolve, reject) {
      let tempData = JSON.parse(
        fs.readFileSync(
          path.resolve(__dirname, "../../preBuildData/listUrl.json"),
          "UTF8"
        )
      );
      tempData = { ...tempData, ...c };

      fs.writeFileSync(
        path.resolve(__dirname, "../../preBuildData/listUrl.json"),
        JSON.stringify(tempData),
        { flag: "w" }
      );
      console.log("DATA WRITTEN 2");

      resolve();
    })
  ]).then(() => resolveTop());
};

const writeCategoryToFile = async (data, param = "") => {
  let tempData = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, "../../preBuildData/categories/list.json")
    )
  );
  tempData = {
    ...tempData,
    [`${data.cid}-page-${data.page}`]: data.numberOfPages
  };

  await fs.writeFileSync(
    path.resolve(__dirname, "../../preBuildData/categories/list.json"),
    JSON.stringify(tempData),
    { flag: "w" },
    err => {
      if (err) throw err;
      console.log("Category Data written to file");
    }
  );

  await fs.writeFileSync(
    path.resolve(
      __dirname,
      `../../preBuildData/categories/${data.cid}-page-${data.page}.json`
    ),
    JSON.stringify(data),
    { flag: "wx" },
    err => {
      if (err) throw err;
      console.log("Category Data written to file");
    }
  );
};

module.exports = {
  fetchHerePagination,
  promiseFile,
  promiseFileNew,
  writeCategoryToFile
};
