const fs = require("fs");
const path = require("path");

const { pagingUrlSeller } = require("../misc/links.js");

const writeStoresToFile = async data => {
  await fs.writeFileSync(
    path.resolve(__dirname, `../../preBuildData/stores.json`),
    JSON.stringify(data),
    { flag: "wx" },
    err => {
      if (err) throw err;
      console.log("STORES Data written to file");
    }
  );
};

const fetchHerePagination = async (dat, res, rej) => {
  console.info("HERE WE ARE|||||||||||||||||||||", dat);
  if (dat !== undefined) {
    return await fetch(pagingUrlSeller(dat.cid, dat.number))
      .then(res => res.text())
      .then(text => JSON.parse(text))
      .then(result => {
        return res(result);
      })
      .catch(err => rej(console.error(err)));
  } else {
    rej(console.error("UNDEFINED"));
  }
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
              else resolve(console.error("STORE PRODUCT DATA WROTEN"));
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
              else resolve(console.error("STORE PRODUCT DATA WROTEN"));
            }
          );
        }
      );
    })
  ]);
};

const writeStoresCategoriesToFile = async data => {
  let tempData = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, "../../preBuildData/stores/list.json")
    )
  );
  tempData = {
    ...tempData,
    [`${data.name.split(" ").join("-")}-page-${data.page}`]: data.numberOfPages
  };

  await fs.writeFileSync(
    path.resolve(__dirname, "../../preBuildData/stores/list.json"),
    JSON.stringify(tempData),
    { flag: "w" },
    err => {
      if (err) throw err;
      console.log("Stores Data written to file");
    }
  );

  await fs.writeFileSync(
    path.resolve(
      __dirname,
      `../../preBuildData/stores/${data.name.split(" ").join("-")}-page-${
        data.page
      }.json`
    ),
    JSON.stringify(data),
    { flag: "wx" },
    err => {
      if (err) throw err;
      console.log("Stores Category Data written to file");
    }
  );
};

module.exports = {
  fetchHerePagination,
  promiseFile,
  writeStoresCategoriesToFile,
  writeStoresToFile
};
