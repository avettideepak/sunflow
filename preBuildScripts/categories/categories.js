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

  const catsAndChildCatsJoined = navCats.childs.reduce((a, c) => {
    a.push(c);
    if (c.childs.length > 0) {
      a.push(...c.childs);

      c.childs.forEach(trdLvl => {
        if (trdLvl.childs.length > 0) {
          a.push(...trdLvl.childs);

          trdLvl.childs.forEach(frdLvl => {
            if (frdLvl.childs.length > 0) {
              a.push(...frdLvl.childs);
              frdLvl.childs.forEach(fifLvl => {
                if (fifLvl.childs.length > 0) {
                  a.push(...fifLvl.childs);
                  fifLvl.childs.forEach(sixLvl => {
                    if (sixLvl.childs.length > 0) {
                      a.push(...sixLvl.childs);
                      sixLvl.childs.forEach(sevLvl => {
                        if (sevLvl.childs.length > 0) {
                          a.push(...sevLvl.childs);
                          sevLvl.childs.forEach(eigLvl => {
                            if (eigLvl.childs.length > 0) {
                              a.push(...eigLvl.childs);
                              eigLvl.childs.forEach(ninLvl => {
                                if (ninLvl.childs.length > 0) {
                                  a.push(...ninLvl.childs);
                                }
                              });
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
    return a;
  }, []);

  let unfetchedCats = catsAndChildCatsJoined.filter(cat => {
    if (
      !Object.keys(listOfCategories).some(l => l.includes(cat.cid)) &&
      !cat.URL.includes("store.html?vid=") &&
      Number(cat.cid) !== 479246
    ) {
      return true;
    } else {
      return false;
    }
  });

  const readyCat = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, `../../preBuildData/categories/list.json`),
      "UTF8",
      (err, data) => {
        return data;
      }
    )
  );

  const unfetchedCatsFetch = () =>
    unfetchedCats.reduce((accumulatorPromise, cat, index) => {
      return accumulatorPromise.then(() => {
        return new Promise(async (resRes, rejRej) => {
          console.error("HELLO *********", categoryUrl(cat.cid));
          await fetch(categoryUrl(cat.cid))
            .then(res => res.json())
            .then(async json => {
              const result = await new Promise(async (resChain, rejChain) => {
                return await Array.from({ length: Number(json[0].numOfPages) })
                  .map((t, index) => index + 1)
                  .slice(1)
                  .reduce(async (acc, number) => {
                    return acc.then(real =>
                      fetchHerePagination({ cid: cat.cid, number }, real)
                    );
                  }, Promise.resolve())
                  .then(dd => {
                    return resChain(dd);
                  })
                  .catch(err => rejChain(err));
              })
                .then(postData => {
                  console.error("HELLO 1", postData);
                  if (postData === undefined) {
                    postData = [];
                  }

                  console.error("HELLO 2", postData);
                  return { postData, json };
                })
                .catch(err =>
                  console.error("HELLO", cat.cid, "|||***|||", err)
                );
              return result;
            })
            .then(async data => {
              console.error("HELLO 3", data.postData);
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
                cid: cat.cid,
                name: cat.name,
                meta: {
                  metadescription: cat.metadescription,
                  metakeywords: cat.metakeywords
                },
                image: cat.image,
                thumbnail: cat.thumbnail,
                description: cat.description,
                longdesc: cat.longdesc,
                numberOfPages:
                  typeof data.json !== "undefined"
                    ? data.json[0].numOfPages
                    : 0,
                itemsCount:
                  typeof data.json !== "undefined"
                    ? data.json[4].itemsCount
                    : 0,
                facets:
                  typeof data.json !== "undefined" ? data.json[2].facets : 0
              };
              data.postData
                .filter(res => (res.length > 0 ? true : false))
                .map((array, index) => {
                  let tempPage = {
                    ...templatePage,
                    page: index + 2,
                    url: cat.URL.replace("shop/", "") + `/${index + 2}`,
                    items: array[1].items
                  };
                  tempObjOther = [...tempObjOther, tempPage];
                });

              let catData = {
                page: 1,
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
                numberOfPages:
                  typeof data.json !== "undefined"
                    ? data.json[0].numOfPages
                    : 0,
                items:
                  typeof data.json !== "undefined" ? data.json[1].items : 0,
                itemsCount:
                  typeof data.json !== "undefined"
                    ? data.json[4].itemsCount
                    : 0,
                facets:
                  typeof data.json !== "undefined" ? data.json[2].facets : 0
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
              console.log(
                nodedata[0].cid,
                "#############!!!!!!!!!!!!!!!################",
                nodedata.length
              );
              await Promise.all(
                nodedata.map(node => {
                  return new Promise((res, rej) => {
                    writeCategoryToFile(node)
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
    unfetchedCatsFetch()
      .then(() => resChain())
      .catch(err => rejChain(err));
  });

  await new Promise((resChain, rejChain) => {
    Object.keys(readyCat)
      .reduce((acc, cat, index) => {
        return acc.then(() => {
          return new Promise(async (reso, reje) => {
            const catData = JSON.parse(
              fs.readFileSync(
                path.resolve(
                  __dirname,
                  `../../preBuildData/categories/${cat}.json`
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
        "****************************ALLLL CATEGORIES FULLFILLED|||||||||||||||||||||||********************"
      );
    })
    .then(() => {
      res();
    })
    .catch(err => console.error("PROMISE ALL CATEGORIES ERROR", err));
};

module.exports = run;
