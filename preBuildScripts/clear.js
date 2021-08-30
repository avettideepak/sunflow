const fs = require("fs");

const run = async res => {
  await fs.writeFileSync(
    "./preBuildData/list.json",
    JSON.stringify([]),
    { flag: "w" },
    err => {
      if (err) throw err;
      console.log("Product Data written to file 1");
    }
  );
  await fs.writeFileSync(
    "./preBuildData/listPreview.json",
    JSON.stringify([]),
    { flag: "w" },
    err => {
      if (err) throw err;
      console.log("Product Data written to file 2");
    }
  );
  await fs.writeFileSync(
    "./preBuildData/listUrl.json",
    JSON.stringify({}),
    { flag: "w" },
    err => {
      if (err) throw err;
      console.log("Product Data written to file 3");
    }
  );

  res();
};

module.exports = run;
