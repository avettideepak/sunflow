import React from "react"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import classes from "../Styles/GrandTotalCheckBoxItems.module.css"
import { I18nContext } from "../../../../../i18n/index"

import { FormattedNumber } from "react-intl"

const GrandTotalCheckBoxItems = ({ price }) => {
  const dispatch = useDispatch()
  const { translate, currency, priceConvert } = React.useContext(I18nContext)

  const selectedCheckBoxItemsState = useSelector(
    (state) => state.productReducer.selectedCheckboxItems,
    shallowEqual
  )

  const selectedProductCheckboxAttributesPriceInventoryState = useSelector(
    (state) =>
      state.productReducer.selectedProductCheckboxAttributes.priceInventory,
    shallowEqual
  )

  const selectedProductCheckboxAttributesState = useSelector(
    (state) => state.productReducer.selectedProductCheckboxAttributes,
    shallowEqual
  )

  const productCheckboxAttributeIdState = useSelector(
    (state) => state.productReducer.itemDetail.attributes,
    shallowEqual
  )

  const attributeId =
    productCheckboxAttributeIdState &&
    productCheckboxAttributeIdState[0] &&
    productCheckboxAttributeIdState[0].attributeid

  const calculateGrandTotal = () => {
    let total = 0

    if (selectedCheckBoxItemsState && selectedCheckBoxItemsState.length > 0) {
      total += price
      // add total price of selected optional additions to the total
      total += selectedCheckBoxItemsState.reduce((a, c) => {
        a += Number(c.price) * c.qty
        return a
      }, 0)
    }

    let keys = Object.keys(selectedProductCheckboxAttributesPriceInventoryState)

    for (let key of keys) {
      if (productCheckboxAttributeIdState) {
        let selectedProductIds =
          selectedProductCheckboxAttributesState &&
          selectedProductCheckboxAttributesState[attributeId]
        if (selectedProductIds && selectedProductIds.length > 0) {
          console.info(
            "borop selected ids",

            selectedProductCheckboxAttributesPriceInventoryState[key].itemid
          )

          if (
            selectedProductIds.some((id) => id == key) &&
            selectedProductCheckboxAttributesPriceInventoryState[key].invs[0]
              .instock > 0
          ) {
            total +=
              selectedProductCheckboxAttributesPriceInventoryState[key]
                .prices[0].price_1 *
              selectedProductCheckboxAttributesPriceInventoryState[key].qty
          }
        }
      }
    }

    return total / priceConvert
  }

  if (
    (Object.keys(selectedProductCheckboxAttributesPriceInventoryState).length >
      0 &&
      selectedProductCheckboxAttributesState &&
      selectedProductCheckboxAttributesState[attributeId] &&
      selectedProductCheckboxAttributesState[attributeId].length > 0) ||
    (selectedCheckBoxItemsState && selectedCheckBoxItemsState.length > 0)
  ) {
    let grandTotal = calculateGrandTotal()
    return (
      <div
        style={{ display: grandTotal === 0 ? "none" : "" }}
        className={classes.contaier}
      >
        <p>Grand Total:</p>
        <FormattedNumber
          value={grandTotal}
          style="currency"
          currency={currency}
        />
      </div>
    )
  } else {
    return null
  }
}

export default GrandTotalCheckBoxItems
