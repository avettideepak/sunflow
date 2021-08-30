const { readdirSync, appendFile } = require("fs");

readdirSync("./")
  .filter(filePath => filePath.match(/.*\.json$/))
  .filter(function (name) {
    return !name.startsWith("list");
  })
  .map(r => {
    let product = require("./" + r);
    // product["0"].properties.forEach(obj => console.error(Object.keys(obj)));

    // UPC missing
    /* if (
      product["0"].properties.find(obj =>
        Object.keys(obj).some(key => key === "")
      )
    ) {
      console.error(product["0"].id);
    } */

    // missing supplier data
    // console.error(product.supplierData);
    /*  if (!product.supplierData) {
      console.error(product["0"].id);
    } */

    if (!product.productData) {
      console.error(product["0"].id);
    }
    // missing price

    // console.error(product.priceInvData.__Result);
    if (!(product && product.priceInvData)) {
      console.error(product["0"].id);
    }

    /* if (!product.priceInvData) {
      console.error(product["0"].id);
    } */
  });
