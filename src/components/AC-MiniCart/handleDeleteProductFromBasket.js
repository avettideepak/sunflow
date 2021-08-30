import { BASKET_UPDATE } from "../../redux/links";
import { REQUEST_BASKET_AFTER_BASKET_UPDATE } from "../../redux/types";
import { setBasketLoadingAfterUpdate } from "../../redux/actions/basketActions";

export const handleDeleteProductFromBasket = (
  suppliersBasket,
  vid,
  id,
  dispatch
) => {
  let form = new FormData();

  const vidMain = "20210607181";

  form.append("_targetupdateBasket", `basket.html?vid=${vidMain}`);
  form.append("mode", "updateBasket");
  form.append("itemscount", suppliersBasket.products.length);
  form.append("c", suppliersBasket.products[0].currencyid);

  suppliersBasket.products.forEach((product, index) => {
    form.append(`basketItems[${index}].itemId`, product.itemid);
    form.append(`basketItems[${index}].vendorId`, vid);
    form.append(`basketItems[${index}].itemToProcess`, true);
    form.append(`basketItems[${index}].editMode`, true);
    form.append(`basketItems[${index}].basketItemId`, product.id);
    //form.append(`basketItems[${index}].distributorId`, null)
    //form.append(`basketItems[${index}].inventoryHistoryId`, null)
    form.append(`basketItems[${index}].oldCompCode`, product.compCode);
    form.append(`basketItems[${index}].removal`, false);

    product.attributes.forEach((attribute, attrIndex) => {
      const { attributeId, attype, optionId, value } = attribute;
      form.append(
        `basketItems[${index}].attributes[${attrIndex}].attributeId`,
        attributeId
      );
      form.append(
        `basketItems[${index}].attributes[${attrIndex}].attype`,
        attype
      );
      form.append(
        `basketItems[${index}].attributes[${attrIndex}].optionId`,
        optionId
      );
      form.append(
        `basketItems[${index}].attributes[${attrIndex}].value`,
        value
      );
    });

    form.append(
      `basketItems[${index}].quantity`,
      id === product.id ? 0 : product.qty
    );
  });

  form.append("orderType", "P");
  form.append("_targetcheckout", `checkout.html?vid=${vidMain}`);

  dispatch(setBasketLoadingAfterUpdate(true));

  fetch(BASKET_UPDATE(vid), {
    method: "POST",
    body: form,
    headers: {
      Accept: "*/*",
      credentials: "same-origin"
    },
    mimeType: "multipart/form-data",
    data: form
  })
    .then(res => {
      dispatch({ type: REQUEST_BASKET_AFTER_BASKET_UPDATE });
    })
    .catch(err => {
      console.error("basket update failed", err.message);
      dispatch(setBasketLoadingAfterUpdate(false));
    });
};
