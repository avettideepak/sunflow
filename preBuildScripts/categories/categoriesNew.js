const fs = require("fs");
const path = require("path");

const { menuUrl, categoryUrl } = require("../misc/links.js");
const {
  fetchHerePagination,
  promiseFileNew,
  promiseFile,
  writeCategoryToFile
} = require("./categoryFunctions.js");
const { setTime, setTimeFree } = require("../misc/commonFunctions.js");

const run = async res => {
  const listOfCategories = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, "../../preBuildData/categories/list.json"),
      "UTF8",
      (err, data) => {
        return data;
      }
    )
  );

  const navCats = await JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, "../../preBuildData/menu.json"),
      "UTF8",
      (err, data) => {
        return data;
      }
    )
  );

  await Promise.all(
    navCats.childs.map(async (cat, iii) => {
      if (!Object.keys(listOfCategories).includes(cat.cid)) {
        await fetch(categoryUrl(cat.cid))
          .then(res => res.json())
          .then(async json => {
            const result = await Promise.all(
              Array.from({ length: Number(json[0].numOfPages) })
                .map((t, index) => index + 1)
                .map(async number => {
                  if (number !== 1) {
                    return await setTime(
                      (res, rej) =>
                        fetchHerePagination({ cid: cat.cid, number }, res, rej),
                      number
                    );
                  } else {
                    return [];
                  }
                })
            )
              .then(postData => {
                return { postData, json };
              })
              .catch(err => console.error("HELLO", cat.cid, "|||***|||", err));

            return result;
          })
          .then(async ({ json, postData }) => {
            const productData = JSON.parse(
              fs.readFileSync(
                path.resolve(__dirname, "../../preBuildData/list.json"),
                "UTF8",
                (err, data) => {
                  return data;
                }
              )
            );

            const tempObjOther = {};

            postData
              .filter(res => (res.length > 0 ? true : false))
              .map((array, index) => {
                tempObjOther[index + 2] = array[1].items;
              });

            let catData = {
              cid: cat.cid,
              url: cat.URL.replace("shop/", ""),
              name: cat.name,
              meta: {
                metadescription: cat.metadescription,
                metakeywords: cat.metakeywords
              },
              image: cat.image,
              thumbnail: cat.thumbnail,
              description: cat.description,
              longdesc: cat.longdesc,
              numberOfPages: json[0].numOfPages,
              itemsFirstPage: json[1].items,
              otherPages: tempObjOther,
              itemsCount: json[4].itemsCount,
              facets: json[2].facets
            };

            let fetchList;
            let pageUrls = {};

            //PRODUCT FETCH STARTS

            const pageIds = [].concat.apply(
              [],
              Object.keys(catData.otherPages).map(page => {
                return catData.otherPages[page].map(pageId => {
                  pageUrls[pageId.id] = pageId.url;
                  return pageId.id;
                });
              })
            );
            const firstPageIds = [
              ...catData.itemsFirstPage.map(item => {
                pageUrls[item.id] = item.url;
                return item.id;
              })
            ];

            const merged = [...pageIds, ...firstPageIds];

            fetchList = merged.filter(ids => {
              if (productData.some(id => id === ids)) {
                return false;
              } else {
                return true;
              }
            });
            console.error("PRODUCT LIST ", fetchList);

            //PRODUCT FETCH ENDS

            return {
              a: catData,
              b: fetchList,
              c: pageUrls
            };
          })
          .then(async ({ a, b, c }) => {
            await promiseFile(b, c);

            return a;
          })
          .then(nodedata => writeCategoryToFile(nodedata))
          .then(() => Promise.resolve())
          .catch(err =>
            Promise.reject(console.error("CAT ERROR HERE********", err))
          );
      } else {
        const catData = JSON.parse(
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
        const productData = JSON.parse(
          fs.readFileSync(
            path.resolve(__dirname, "../../preBuildData/list.json"),
            "UTF8",
            (err, data) => {
              return data;
            }
          )
        );

        let fetchList;
        let pageUrls = {};

        //PRODUCT FETCH STARTS

        const pageIds = [].concat.apply(
          [],
          Object.keys(catData.otherPages).map(page => {
            return catData.otherPages[page].map(pageId => {
              pageUrls[pageId.id] = pageId.url;
              return pageId.id;
            });
          })
        );
        const firstPageIds = [
          ...catData.itemsFirstPage.map(item => {
            pageUrls[item.id] = item.url;
            return item.id;
          })
        ];

        const merged = [...pageIds, ...firstPageIds];

        fetchList = merged.filter(ids => {
          if (productData.some(id => id === ids)) {
            return false;
          } else {
            return true;
          }
        });

        new Promise((resolve, reject) => {
          setTimeout(
            () => promiseFileNew(fetchList, pageUrls, resolve),
            75 * (iii + 1)
          );
        }).then(() => Promise.resolve());
      }
    })
  )
    .then(() => {
      setTimeout(() => {
        res();
      }, 2000);
    })
    .then(() =>
      console.info(
        "****************************ALLLL CATEGORIES FULLFILLED|||||||||||||||||||||||********************"
      )
    )
    .catch(err => console.error("PROMISE ALL CATEGORIES ERROR", err));
};

module.exports = run;
