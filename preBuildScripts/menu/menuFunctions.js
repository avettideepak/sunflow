const fs = require("fs");
const path = require("path");

const writeMenuToFile = async (data, location) => {
  await fs.writeFileSync(
    path.resolve(__dirname, `../../preBuildData/${location}.json`),
    JSON.stringify(data),
    { flag: "w" },
    err => {
      if (err) throw err;
      console.log(`${location} Data written to file`);
    }
  );
};

module.exports = { writeMenuToFile };
