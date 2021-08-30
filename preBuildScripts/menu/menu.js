const fs = require("fs");
const path = require("path");

const { writeMenuToFile } = require("./menuFunctions.js");
const { setTime } = require("../misc/commonFunctions.js");
const { fetchHerePagination } = require("../stores/storesFunctions.js");

const { menuUrl, categoryUrl } = require("../misc/links.js");

const run = async res => {
  console.error("*********START MENU*************");

  await fetch(menuUrl)
    .then(res => res.json())
    .then(json => {
      writeMenuToFile(json, "menu");
      return json;
    })
    .then(a => {
      console.log("MENU WRITTEN ON FILE");
      return a;
    })
    .then(async navCats => {
      if (
        !fs.existsSync(
          path.resolve(__dirname, "../../preBuildData/stores.json")
        )
      ) {
        let storeCid = navCats.childs.filter(cat =>
          cat.URL.includes("stores")
        )[0].cid;
        await fetch(categoryUrl(storeCid))
          .then(res => res.json())
          .then(async json => {
            if (Number(json[0].numOfPages) > 1) {
              const result = await Promise.all(
                Array.from({ length: Number(json[0].numOfPages) })
                  .map((t, index) => index + 1)
                  .map(async number => {
                    if (number !== 1) {
                      return await setTime((res, rej) => {
                        return fetchHerePagination(
                          { cid: storeCid, number },
                          res,
                          rej
                        );
                      }, number);
                    } else {
                      return [];
                    }
                  })
              )
                .then(postData => {
                  let tempArryOther = [];

                  postData
                    .filter(res => (res.length > 0 ? true : false))
                    .map((array, index) => {
                      tempArryOther = [...tempArryOther, ...array[1].items];
                    });

                  console.error("TYPEOF", tempArryOther);
                  return { json: [...json[1].items, ...tempArryOther] };
                })
                .catch(err =>
                  console.warn("HELLO", storeCid, "|||***|||", err)
                );

              return result;
            } else {
              return { json: [...json[1].items] };
            }
          })
          .then(({ json }) => writeMenuToFile(json, "stores"))
          .then(() => console.log("STORE WRITTEN ON FILE"))
          .catch(err => console.error("fetching stores failed", err));
      } else {
        console.log("STORES ON FILE");
      }
    })
    .then(() => {
      console.error("*********ENDS MENU*************");

      res();
    })
    .catch(err => console.error("fetching menu failed", err));
};

module.exports = run;
