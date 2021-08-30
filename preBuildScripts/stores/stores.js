const fs = require("fs");
const path = require("path");

const {
  fetchHerePagination,
  promiseFile,
  writeStoresCategoriesToFile,
  writeStoresToFile
} = require("./storesFunctions.js");

const { promiseFileNew } = require("../categories/categoryFunctions.js");

const { setTimeStore, setTime } = require("../misc/commonFunctions.js");
const { categoryUrlSeller } = require("../misc/links.js");

const run = async res => {
  const listOfStores = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, "../../preBuildData/stores/list.json"),
      "UTF8",
      (err, data) => {
        return data;
      }
    )
  );

  const storesState = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, "../../preBuildData/stores.json"),
      "UTF8",
      (err, data) => {
        return data;
      }
    )
  );

  const fetchNeedStores = storesState.filter(store => {
    if (
      Object.keys(listOfStores).some(l =>
        l.includes(store.title.split(" ").join("-"))
      )
    ) {
      return false;
    } else {
      return true;
    }
  });

  const storesStateFetch = () =>
    fetchNeedStores.reduce((accumulatorPromise, cat, index) => {
      return accumulatorPromise.then(() => {
        return new Promise(async (resRes, rejRej) => {
          await fetch(
            categoryUrlSeller(
              cat.title
                .split(" ")
                .map(l => {
                  if (cat.title == "So JAM Good") {
                    if (l === "JAM") return "JAM";
                  }
                  if (l.toLowerCase() === "4m") {
                    return "4M";
                  } else if (l !== "") {
                    let storeTitle =
                      l.charAt(0).toUpperCase() + l.slice(1).toLowerCase();
                    return storeTitle;
                  }
                  return l;
                })
                .join("%20")
                .replace("’", "")
            )
          )
            .then(res => res.json())
            .then(async json => {
              if (Number(json[0].numOfPages) > 1) {
                const result = await Promise.all(
                  Array.from({ length: Number(json[0].numOfPages) })
                    .map((t, index) => index + 1)
                    .map(async number => {
                      if (number !== 1) {
                        return await setTime(
                          (res, rej) =>
                            fetchHerePagination(
                              { cid: cat.title, number },
                              res,
                              rej
                            ),
                          number
                        );
                      } else {
                        return [];
                      }
                    })
                )
                  .then(postData => {
                    return { json, postData };
                  })
                  .catch(err =>
                    console.warn("HELLO", cat.title, "|||***|||", err)
                  );

                return result;
              } else {
                return { json, postData: [] };
              }
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

              let tempObjOther = [];
              let templatePage = {
                cid: 72181,
                Created_By_Supplier: cat.properties.Created_By_Supplier,
                name: cat.title,
                meta: {
                  metadescription: cat.metadescription,
                  metakeywords: cat.metakeywords
                },
                image: cat.image,
                thumbnail: cat.thumbnail,
                description: cat.desc,
                longdesc: cat.desc,
                numberOfPages: json[0].numOfPages,
                itemsCount: json[4].itemsCount,
                facets: json[2].facets
              };
              postData
                .filter(res => (res.length > 0 ? true : false))
                .map((array, index) => {
                  let tempPage = {
                    ...templatePage,
                    page: index + 2,
                    url:
                      `stores/${cat.title.replace(/ /g, "-").toLowerCase()}` +
                      `/${index + 2}`,
                    items: array[1].items
                  };
                  tempObjOther = [...tempObjOther, tempPage];
                });

              let catData = {
                page: 1,
                cid: 72181,
                url: `stores/${cat.title.replace(/ /g, "-").toLowerCase()}`,
                Created_By_Supplier: cat.properties.Created_By_Supplier,
                name: cat.title,
                meta: {
                  metadescription: cat.desc,
                  metakeywords: cat.desc
                },
                image: cat.image,
                thumbnail: cat.image,
                description: cat.desc,
                longdesc: cat.desc,
                numberOfPages: json[0].numOfPages,
                items: json[1].items,
                itemsCount: json[4].itemsCount,
                facets: json[2].facets
              };
              tempObjOther = [catData, ...tempObjOther];

              //PRODUCT FETCH STARTS
              const pageUrls = {};
              const pageIds = [].concat.apply(
                [],
                tempObjOther.map(page => {
                  return page.items.map(product => {
                    pageUrls[product.id] = product.url;
                    return product.id;
                  });
                })
              );

              const fetchList = pageIds.filter(ids => {
                if (productData.some(id => id === ids)) {
                  return false;
                } else {
                  return true;
                }
              });

              //PRODUCT FETCH ENDS

              return {
                a: tempObjOther,
                b: fetchList,
                c: pageUrls
              };
            })
            .then(async ({ a, b, c }) => {
              await promiseFile(b, c);

              return a;
            })
            .then(async nodedata => {
              console.log("#############################", nodedata.length);
              await Promise.all(
                nodedata.map(node => {
                  return new Promise((res, rej) => {
                    writeStoresCategoriesToFile(node)
                      .then(() => {
                        res();
                      })
                      .catch(err => rej(err));
                  });
                })
              );
            })
            .then(() => resRes())
            .catch(err => {
              console.error(err);
              rejRej();
            });
        });
      });
    }, Promise.resolve());

  await new Promise((resChain, rejChain) => {
    storesStateFetch()
      .then(() => resChain())
      .catch(err => rejChain(err));
  });

  await new Promise((resChain, rejChain) => {
    Object.keys(listOfStores)
      .reduce((acc, cat, index) => {
        return acc.then(() => {
          return new Promise(async (reso, reje) => {
            console.error("GAQQQ", cat);
            const catData = JSON.parse(
              fs.readFileSync(
                path.resolve(
                  __dirname,
                  `../../preBuildData/stores/${cat}.json`
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

            const itemIds = [
              ...catData.items.map(item => {
                pageUrls[item.id] = item.url;
                return item.id;
              })
            ];

            fetchList = itemIds.filter(ids => {
              if (productData.some(id => id === ids)) {
                return false;
              } else {
                return true;
              }
            });

            await new Promise((resolve, reject) => {
              promiseFileNew(fetchList, pageUrls, resolve);
            }).then(() => reso());
          });
        });
      }, Promise.resolve())

      .then(() => resChain())
      .catch(err => console.error(err));
  })
    .then(() => {
      console.info(
        "****************************ALLLL STORES FULLFILLED|||||||||||||||||||||||********************"
      );
    })
    .then(() => {
      res();
    })
    .catch(err => console.error("PROMISE ALL STORES ERROR", err));
};

module.exports = run;
