const fs = require("fs");
const path = require("path");

/* const run = async (res) => { */
fs.readdirSync(path.resolve(__dirname, "../../preBuildData/categories"))
  .filter(filePath => filePath.match(/.*\.json$/))
  .filter(name => {
    if (["list.json", "run", "zaytung"].includes(name)) {
      return false;
    } else {
      return true;
    }
  })
  .map(r => {
    //let product = require("./" + r);

    try {
      fs.unlinkSync(
        path.resolve(__dirname, `../../preBuildData/categories/${r}`)
      );
      console.error("CATEGORY ", r, " DELETED");
    } catch (err) {
      console.error("Category couldn't deleted", err);
    }
  });

fs.writeFile(
  path.resolve(__dirname, "../../preBuildData/categories/list.json"),
  JSON.stringify({}),
  { flag: "w" },
  err => {
    if (err) console.error(err);
    else console.error("CATEGORIES REFRESHED");
  }
);

fs.readdirSync(path.resolve(__dirname, "../../preBuildData/stores"))
  .filter(filePath => filePath.match(/.*\.json$/))
  .filter(name => {
    if (["list.json", "run", "zaytung"].includes(name)) {
      return false;
    } else {
      return true;
    }
  })
  .map(r => {
    //let product = require("./" + r);

    try {
      fs.unlinkSync(path.resolve(__dirname, `../../preBuildData/stores/${r}`));
      console.error("STORES ", r, " DELETED");
    } catch (err) {
      console.error("Store couldn't deleted", err);
    }
  });

fs.writeFile(
  path.resolve(__dirname, "../../preBuildData/stores/list.json"),
  JSON.stringify({}),
  { flag: "w" },
  err => {
    if (err) console.error(err);
    else console.error("STORES REFRESHED");
  }
);

//MENU DELETE
try {
  fs.unlinkSync(path.resolve(__dirname, `../../preBuildData/menu.json`));
  console.error("MENU DELETED");
} catch (err) {
  console.error("Menu couldn't deleted", err);
}

//STORE LIST DELETE
try {
  fs.unlinkSync(path.resolve(__dirname, `../../preBuildData/stores.json`));
  console.error("STORE LIST DELETED");
} catch (err) {
  console.error("Store List couldn't deleted", err);
}

console.info(
  "****************************ALLLL INCREMENT DELETE SCRIPTS FINISHED|||||||||||||||||||||||********************"
);

/* .then(() => {
      res();
    });
}; 

module.exports = run;
*/
