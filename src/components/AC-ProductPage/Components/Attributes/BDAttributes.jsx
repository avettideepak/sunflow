import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { usePrevious } from "../../../../functions/Utilities";
import {
  GET_ATTIRIBUTE_LINK,
  GET_PRICE_INVENTORY
} from "../../../../redux/links";
import {
  changeProductAttributesAction,
  fetchingProductPriceInventory,
  fetchingProductRequestSaga,
  unMountProductPageAction,
  fetchMainProductSkusAndSkuIds,
  reFetchProductInitialState,
  setAttributesDetailsAction,
  setProductSwitchImageAction,
  changeProductCheckboxAttributesAction,
  setProductCheckboxAttributesPriceInventoryRecordAction,
  setAttributeCheckboxFlagAction
} from "../../../../redux/actions/productAction";
import "./Styles/Attributes.css";
import { I18nContext } from "../../../../i18n/index";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import InputIncrement from "./InputIncrement";
import { FormattedNumber } from "react-intl";

export default function Attributes() {
  const dispatch = useDispatch();
  const { langCode, currency, priceConvert } = useContext(I18nContext);

  const [langState, setLangState] = useState(langCode);

  useEffect(() => {
    if (langCode) {
      setLangState(langCode);
      setCounter(0);
      setAttributeJson([]);
      console.info("counter", counter);
    }
  }, [langCode]);

  const {
    skus: currentItemSkusState,
    mainProductSkuIds,
    mainProductSkus,
    attributes: attributesState,
    itemId: itemIdState,
    mainitemid: mainItemIdState,
    code: itemCodeState
  } = useSelector(state => state.productReducer.itemDetail, shallowEqual);

  const productInitialIdState = useSelector(
    state => state.productReducer.productInitial.id,
    shallowEqual
  );

  const checkBoxItemsState = useSelector(
    state => state.productReducer.checkboxItems,
    shallowEqual
  );

  const selectedProductAttributesState = useSelector(
    state => state.productReducer.selectedProductAttributes,
    shallowEqual
  );

  const selectedProductCheckBoxAttributesState = useSelector(
    state => state.productReducer.selectedProductCheckboxAttributes,
    shallowEqual
  );

  const selectedProudctCheckboxPriceInventoryState = useSelector(
    state =>
      state.productReducer.selectedProductCheckboxAttributes.priceInventory,
    shallowEqual
  );

  const previousStockCounts = usePrevious(
    selectedProudctCheckboxPriceInventoryState
  );

  const mainProductPriceInventoryState = useSelector(
    state => state.productReducer.priceInventory,
    shallowEqual
  );

  const mainProductInventoryQty =
    mainProductPriceInventoryState &&
    mainProductPriceInventoryState.invs &&
    mainProductPriceInventoryState.invs[0] &&
    mainProductPriceInventoryState.invs[0].instock;

  const productAttributeCheckboxFlagState = useSelector(
    state => state.productReducer.productAttributeCheckboxFlag,
    shallowEqual
  );

  const [input, setInput] = useState({});

  const [attributeJson, setAttributeJson] = useState([]);
  const [skuEnabledAttrIds, setSkuEnabledAttrIds] = useState([]);

  const [counter, setCounter] = useState(0);

  const [mainAttribute, setMainAttribute] = useState(null);

  const [availableOtherOptions, setAvailableOtherOptions] = useState({});

  const [
    mainAttributeidWithCombinations,
    setMainAttributeidWithCombinations
  ] = useState({});

  useEffect(() => {
    console.info("Attribute MOUNTED", attributeJson);

    return () => {
      console.info("Attribute WILL UNMOUNT", attributeJson);
      dispatch(unMountProductPageAction());
      setAttributeJson([]);
      setCounter(0);
    };
  }, []);

  useEffect(() => {
    if (!itemCodeState) {
      setAttributeJson([]);
      setCounter(0);
    }
  }, [itemCodeState]);

  /* Compare productInitialState Id to currentItemId, refetch the productInitialState if they are differnet */
  useEffect(() => {
    if (productInitialIdState && itemIdState) {
      if (productInitialIdState != itemIdState) {
        console.info("refetch initial state", itemIdState);
        dispatch(reFetchProductInitialState("", itemIdState));
      }
    }
  }, [itemIdState]);

  /* Need to get the mainitem's skus and skuids */
  useEffect(() => {
    console.info(
      "attr test2",
      mainProductSkus,
      mainItemIdState,
      itemIdState,
      attributeJson
    );
    if (mainProductSkus === undefined) {
      if (mainItemIdState && mainItemIdState != 0) {
        console.info("attr test3", mainItemIdState);
        dispatch(fetchMainProductSkusAndSkuIds(mainItemIdState));
      }
    }

    return () => {};
  }, [mainItemIdState]);

  console.info("attr test4", mainProductSkus);

  if (attributeJson.length > 0) {
    let reducedAttr = attributeJson.reduce((arr, attr) => {
      attr.options.forEach(opt => {
        arr.push({ code: opt.code, optinid: opt.optionid });
      });
      return arr;
    }, []);

    console.info("attr reduced", reducedAttr);
  }

  /* Ends here */

  // If the loaded product is the main item, get the first child product
  /*  useEffect(() => {
    if (
      skuidsState &&
      skuidsState.length > 0 &&
      mainItemIdState == 0 &&
      attributeJson &&
      attributeJson.length > 0
    ) {
      let firstSkuId = skuidsState[0];
      console.info("fetching product again");
      dispatch(fetchingProductRequestSaga(firstSkuId));
      dispatch(fetchingProductPriceInventory(firstSkuId));

      let filteredSkus = skusState.filter(sku => sku.skuid == firstSkuId);
      console.info("filteredSkus", filteredSkus);
      let objs = {};
      for (let filteredSku of filteredSkus) {
        let selectedAttribute = attributeJson.filter(
          attr => attr.attributeid == filteredSku.attributeid
        )[0];

        console.info(
          "selectedAttribute",
          filteredSku,
          attributeJson,
          selectedAttribute
        );

        let selectedOption = selectedAttribute.options.filter(
          option => option.optionid == filteredSku.optionid
        )[0];

        const { attributeid, optionid, choice, color, ddtext } = selectedOption;

        let obj = {
          attributeid,
          optionid,
          choice,
          color,
          ddtext,
          firstSkuId // The flag that it was triggered on initial load of the main product page
        };
        objs[attributeid] = {};
        objs[attributeid] = obj;
      }

      if (Object.keys(objs).length > 0) {
        let tempAttributes = { ...selectedProductAttributesState };
        if (
          Object.keys(tempAttributes).includes(String(itemIdState)) === false
        ) {
          tempAttributes = { ...tempAttributes, [itemIdState]: {} };
        }

        dispatch(
          changeProductAttributesAction({
            ...tempAttributes,
            [itemIdState]: {
              ...tempAttributes[itemIdState],
              ...objs
            }
          })
        );
      }
    }
  }, [itemIdState, attributeJson]); */

  useEffect(() => {
    if (
      selectedProductAttributesState &&
      selectedProductAttributesState[mainItemIdState || itemIdState] &&
      Object.keys(
        selectedProductAttributesState[mainItemIdState || itemIdState]
      ).length > 0 &&
      mainProductSkus &&
      mainProductSkus.length > 0
    ) {
      let selectedProductAttributeIdsAndOptionsIds = Object.values(
        selectedProductAttributesState[mainItemIdState || itemIdState]
      );
      let wantedSkuId;

      // Should filter out the non sku enabled attributes
      selectedProductAttributeIdsAndOptionsIds = selectedProductAttributeIdsAndOptionsIds.filter(
        attr => skuEnabledAttrIds.includes(attr.attributeid)
      );
      console.info("selected5", selectedProductAttributeIdsAndOptionsIds);

      let proceed = true;

      if (
        Object.keys(mainAttributeidWithCombinations).length > 0 &&
        selectedProductAttributeIdsAndOptionsIds.length > 0 &&
        selectedProductAttributeIdsAndOptionsIds.some(
          item => item.attributeid == mainAttribute
        )
      ) {
        wantedSkuId = mainAttributeidWithCombinations[mainAttribute].filter(
          attr => {
            return (
              attr.mainOptionId ==
              selectedProductAttributeIdsAndOptionsIds.filter(
                item => item.attributeid == mainAttribute
              )[0].optionid
            );
          }
        );
      } else {
        proceed = false;
      }

      console.info("proceed", proceed, wantedSkuId, mainAttribute);

      if (proceed) {
        // Filter available other options
        let mainAttributeOptionId = selectedProductAttributeIdsAndOptionsIds.filter(
          attr => attr.attributeid == mainAttribute
        )[0].optionid;

        let filteredAttrs = mainAttributeidWithCombinations[
          mainAttribute
        ].filter(item => item.mainOptionId == mainAttributeOptionId);

        console.info("filteredAttrs", filteredAttrs);

        // Find available options for the given main attribute (color for instance is  the main attribute for most products in b2b2c)
        let tempAvailableOptions = {};
        for (let filteredAttr of filteredAttrs) {
          console.info("mainatt - filteredAttr", filteredAttr);
          let keys = Object.keys(filteredAttr);
          for (let key of keys) {
            let value = filteredAttr[key];
            if (key != "mainOptionId" && key != "skuid") {
              if (!tempAvailableOptions.hasOwnProperty(key)) {
                tempAvailableOptions[key] = [];
              }
              tempAvailableOptions[key] = [...tempAvailableOptions[key], value];
            }
          }
        }
        console.info("mainatt - temp available options", tempAvailableOptions);
        // set available other options here
        setAvailableOtherOptions(availableOtherOptions => {
          if (
            !availableOtherOptions.hasOwnProperty(
              mainItemIdState || itemIdState
            )
          ) {
            availableOtherOptions[mainItemIdState || itemIdState] = [];
          }
          return {
            ...availableOtherOptions,
            [mainItemIdState || itemIdState]: {
              ...availableOtherOptions[mainItemIdState || itemIdState],
              ...tempAvailableOptions
            }
          };
        });

        console.info(
          "mainatt - available other item state",
          availableOtherOptions
        );

        for (let selectedAttribute of selectedProductAttributeIdsAndOptionsIds) {
          const { attributeid, optionid } = selectedAttribute;
          if (attributeid != mainAttribute) {
            wantedSkuId = wantedSkuId.filter(
              item => item[attributeid] === optionid
            )[0];
          }
        }

        console.info("proceed444", wantedSkuId);
        if (wantedSkuId.length == 1) {
          console.info("proceed555", wantedSkuId);
          wantedSkuId = wantedSkuId[0];
        }

        console.info(
          "selectedProductAttributeIdsAndOptionsIds",
          selectedProductAttributeIdsAndOptionsIds,
          wantedSkuId
        );
        if (wantedSkuId && wantedSkuId.skuid) {
          dispatch(fetchingProductRequestSaga(wantedSkuId.skuid));
          dispatch(fetchingProductPriceInventory(wantedSkuId.skuid));
        }
      }
    }
  }, [selectedProductAttributesState]);

  useEffect(() => {
    if (
      selectedProductCheckBoxAttributesState &&
      selectedProductCheckBoxAttributesState[mainItemIdState || itemIdState] &&
      selectedProductCheckBoxAttributesState[mainItemIdState || itemIdState]
        .length > 0 &&
      mainProductSkus &&
      mainProductSkus.length > 0
    ) {
      console.info("borop mainSkus", mainProductSkus);
    }
  }, [selectedProductCheckBoxAttributesState]);

  // get the all possible attributes and their options
  useEffect(() => {
    if (
      attributesState &&
      attributesState.length > 0 &&
      attributeJson.length == 0 &&
      mainProductSkus
    ) {
      if (attributesState.length === 1) {
        dispatch(setAttributeCheckboxFlagAction(true));
      }

      console.info("counter", counter);
      setCounter(counter + 1);
      console.info("attributes", attributesState);
      let tempArr = [];
      let tempSkuEnabledAttrs = [];
      let mainAttrIsSet = false;

      if (counter === 0) {
        for (let attribute of attributesState) {
          let isSkuEnabled = false;
          if (!isNonSkuEnabledAttribute(attribute.attributeid)) {
            isSkuEnabled = true;

            if (mainAttrIsSet === false) {
              setMainAttribute(attribute.attributeid);
              mainAttrIsSet = true;
            }
          }
          console.info("counter fetching");
          fetch(GET_ATTIRIBUTE_LINK(attribute.attributeid, langState))
            .then(res => res.json())
            .then(json => {
              let jsonResult = json.__Result[0];
              jsonResult.position = attribute.position;
              jsonResult.skuEnabled = isSkuEnabled;

              tempArr = [...tempArr, jsonResult];
              if (isSkuEnabled)
                tempSkuEnabledAttrs = [
                  ...tempSkuEnabledAttrs,
                  attribute.attributeid
                ];
              if (tempArr.length === attributesState.length) {
                tempArr.sort((a, b) => a.position - b.position);
                setAttributeJson(tempArr);
                dispatch(setAttributesDetailsAction(tempArr));

                setSkuEnabledAttrIds(tempSkuEnabledAttrs);
              }
            })
            .catch(err => console.error(err));
        }

        if (mainItemIdState != 0 && currentItemSkusState.length > 0) {
          let selectedAttributesObj = {};
          currentItemSkusState.forEach(sku => {
            selectedAttributesObj[sku.attributeid] = {
              attributeid: sku.attributeid,
              optionid: sku.optionid
            };
          });

          console.info("selectedAttributesObj", selectedAttributesObj);

          selectedAttributesObj = {
            [mainItemIdState]: { ...selectedAttributesObj }
          };

          handleMappingInitialSelectedAttributesToReduxState(
            selectedAttributesObj
          );
        }
      }
    }
  }, [attributesState, mainProductSkus]);

  console.info("mainAttr", mainAttribute, skuEnabledAttrIds);
  // Filtering all possible attributeid and optionid combinations
  useEffect(() => {
    if (mainProductSkus && mainProductSkus.length > 0) {
      if (mainAttribute) {
        console.info(
          "setMainAttr3",
          mainProductSkus,
          mainAttribute,
          mainItemIdState
        );
        let tempMainAttributeCombinations = {};

        if (
          Object.keys(tempMainAttributeCombinations).includes(
            String(mainAttribute)
          ) === false
        ) {
          tempMainAttributeCombinations[mainAttribute] = [];
        }

        mainProductSkus.forEach(sku => {
          const { attributeid, optionid, skuid } = sku;

          if (attributeid == mainAttribute) {
            tempMainAttributeCombinations[mainAttribute] = [
              ...tempMainAttributeCombinations[mainAttribute],
              { mainOptionId: optionid, skuid }
            ];
          }
        });

        mainProductSkus.forEach(sku => {
          const { attributeid, optionid, skuid } = sku;

          if (attributeid != mainAttribute) {
            let foundAtIndex = -1;
            foundAtIndex = tempMainAttributeCombinations[
              mainAttribute
            ].findIndex(item => item.skuid == skuid);

            tempMainAttributeCombinations[mainAttribute][foundAtIndex] = {
              ...tempMainAttributeCombinations[mainAttribute][foundAtIndex],
              [attributeid]: optionid
            };
          }
        });

        setMainAttributeidWithCombinations(tempMainAttributeCombinations);
      }
    }
  }, [mainProductSkus, mainAttribute]);

  console.info(
    "mainAttributeidWithCombinations",
    mainAttributeidWithCombinations
  );
  /* 
  console.info("tempFilteredAttributes", filteredAttributeJson); */
  console.info("attributeJson", attributeJson);

  const handleSettingSelectedAttributesToReduxState = obj => {
    console.info("attr obj", obj);
    let tempAttributes = { ...selectedProductAttributesState };
    let itemId = mainItemIdState || itemIdState;
    if (Object.keys(tempAttributes).includes(String(itemId)) === false) {
      tempAttributes = { ...tempAttributes, [itemId]: {} };
    }
    dispatch(
      changeProductAttributesAction({
        ...tempAttributes,
        [itemId]: {
          ...tempAttributes[itemId],
          [obj.attributeid]: obj
        }
      })
    );
  };

  const handleSettingSelectedCheckboxAttributesToReduxState = (
    obj,
    radioBtn
  ) => {
    let tempAttributes = { ...selectedProductCheckBoxAttributesState };
    let attributeid = obj.attributeid;
    if (Object.keys(tempAttributes).includes(String(attributeid)) === false) {
      tempAttributes = { ...tempAttributes, [attributeid]: [] };
    }

    if (radioBtn) {
      dispatch(
        changeProductCheckboxAttributesAction({
          ...tempAttributes,
          [attributeid]: [obj.optionid]
        })
      );
    } else {
      if (obj.checked) {
        dispatch(
          changeProductCheckboxAttributesAction({
            ...tempAttributes,
            [attributeid]: [...tempAttributes[attributeid], obj.optionid]
          })
        );
      } else {
        dispatch(
          changeProductCheckboxAttributesAction({
            ...tempAttributes,
            [attributeid]: [
              ...tempAttributes[attributeid].filter(id => id != obj.optionid)
            ]
          })
        );
      }
    }
  };

  const handleMappingInitialSelectedAttributesToReduxState = obj => {
    dispatch(changeProductAttributesAction(obj));
  };

  const isNonSkuEnabledAttribute = attrId => {
    if (mainProductSkus && mainProductSkus.length > 0) {
      if (!mainProductSkus.some(sku => sku.attributeid == attrId)) return true;
      else return false;
    } else {
      return true;
    }
  };

  const handleAttributeOptionClicked = obj => {
    handleSettingSelectedAttributesToReduxState(obj);
  };

  const handleAttributeCheckboxChecked = (obj, radioBtn) => {
    handleSettingSelectedCheckboxAttributesToReduxState(obj, radioBtn);
  };

  const handleAttributeOptionSelected = (e, options, switchimage) => {
    const { value } = e.target;
    console.info("borop change", switchimage, switchimage == "true");
    // set product switch image flag to be used by image carousel
    dispatch(setProductSwitchImageAction(switchimage == "true"));

    if (value == -1) {
      if (mainItemIdState != 0) {
        dispatch(fetchingProductRequestSaga(mainItemIdState));
        dispatch(fetchingProductPriceInventory(mainItemIdState));

        handleMappingInitialSelectedAttributesToReduxState({
          [mainItemIdState]: {}
        });
      }

      return;
    }

    const { optionid, ddtext, choice, color, attributeid } = options.filter(
      (v, index) => index == value
    )[0];

    handleSettingSelectedAttributesToReduxState({
      attributeid,
      optionid,
      choice,
      color,
      ddtext
    });
  };

  const onBlurMapLocalStateToReduxState = attr => {
    const { attributeid } = attr;
    handleSettingSelectedAttributesToReduxState(attr);
  };

  const handleTextInputChange = (e, attr) => {
    e.persist();
    const { attributeid } = attr;
    const { name, value } = e.target;

    attr.value = value;

    setInput(input => {
      return {
        ...input,
        [attributeid]: attr
      };
    });
  };

  console.info("selectedAttributeOptions", selectedProductAttributesState);

  const renderAttributeOptions = attr => {
    const { attributeid, format } = attr;
    if (attributeid == mainAttribute) {
      // attributeid - 34160
      return renderMainAttributeOptions(attr);
    } else if (
      attributeid &&
      attributeid != "" &&
      attributeid != mainAttribute
    ) {
      // attributeid - 34161
      return renderAttributeOtherOptions(attr);
    } else {
      return null;
    }
  };

  const renderAttributes = () => {
    console.info("length", attributeJson, attributeJson.length);
    if (attributeJson.length > 0) {
      return attributeJson.map(attr => {
        const DATANAME = attr.dataname.toLowerCase();

        let dataname = DATANAME.includes("-")
          ? DATANAME.split("-")[1]
          : DATANAME;
        attr.dataname = dataname;
        const { attributeid } = attr;

        return (
          <div
            key={attributeid}
            className={`attribute-wrapper attribute-${dataname}${
              productAttributeCheckboxFlagState ? " checkbox-flag" : ""
            }`}
          >
            {renderAttributeOptionsHeader(attr)}

            {renderAttributeOptions(attr)}
          </div>
        );
      });
    } else {
      return null;
    }
  };

  const renderAttributeOtherFormatC = (dataname, options, attributeid) => {
    let availableOptions = mainAttributeidWithCombinations[
      mainAttribute
    ].reduce((a, c) => {
      a.push(c[attributeid]);
      return a;
    }, []);
    options = options.filter(option =>
      availableOptions.includes(option.optionid)
    );

    return (
      <div className={`attribute-option-main`}>
        {options.map(option => {
          const { optionid, ddtext, choice, color, attributeid } = option;
          let itemId = mainItemIdState || itemIdState;
          const isActiveOption =
            optionid ===
            (selectedProductAttributesState[itemId] &&
              selectedProductAttributesState[itemId][attributeid] &&
              selectedProductAttributesState[itemId][attributeid].optionid);

          return (
            <div
              className={`attribute-option-image-wrapper${
                isActiveOption ? ` active` : ``
              }`}
              key={optionid}
              onClick={() =>
                handleAttributeOptionClicked({
                  attributeid,
                  optionid,
                  choice,
                  color,
                  ddtext
                })
              }
            >
              <div
                className={`attribute-option-image${
                  isActiveOption ? ` active` : ``
                }`}
                title={ddtext}
                style={{
                  height: "50px",
                  width: "50px",
                  backgroundColor: color,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundImage: color.includes(".")
                    ? `url(https://slpreview.sociallighting.com/preview/store/20180521148/assets/images/attributes/${color})`
                    : `url(https://slpreview.sociallighting.com/preview/store/20180521148/assets/images/attributes/no-image.png)`,
                  backgroundSize: "cover"
                }}
              >
                {dataname == "amount" ? (
                  <span className="no-select attribute-option-span">
                    {ddtext}
                  </span>
                ) : (
                  ""
                )}
              </div>
              {option.available == false ? (
                <div className="attribute-option-tooltip">
                  <span>{`Not available for the selected ${option.secondAttributeScreenName}`}</span>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  };

  // Render text attribute input field
  const renderAttributeOtherFormatText = attr => {
    const { attributeid, dataname } = attr;
    let itemId = mainItemIdState || itemIdState;
    if (
      mainItemIdState &&
      selectedProductAttributesState &&
      selectedProductAttributesState[itemId]
    ) {
      let value =
        selectedProductAttributesState[itemId] &&
        selectedProductAttributesState[itemId][attributeid];

      if (!value) {
        attr.value = "";
        handleSettingSelectedAttributesToReduxState(attr);
        setInput(input => {
          return {
            ...input,
            [attributeid]: attr
          };
        });
      }
    }
    return (
      <textarea
        name={dataname}
        onBlur={() => onBlurMapLocalStateToReduxState(attr)}
        onChange={e => handleTextInputChange(e, attr)}
        placeholder="Enter your message here..."
        className="attribute-option-textarea-field"
      />
    );
  };

  // Render as dropdown list
  const renderAttributeOtherSelectOptions = attr => {
    let selectedOptionIndex = -1;

    let {
      options,
      attributeid,
      skuEnabled,
      defvalue,
      dropname,
      switchimage
    } = attr;

    console.info("is select option non sku enabled", skuEnabled);

    // Check if the option exists for the given main attribute
    if (
      skuEnabled &&
      attributesState &&
      attributesState.length > 0 &&
      selectedProductAttributesState &&
      selectedProductAttributesState[mainItemIdState || itemIdState] &&
      Object.keys(
        selectedProductAttributesState[mainItemIdState || itemIdState]
      ).length > 0
    ) {
      console.info(
        "selectedAttributes",
        selectedProductAttributesState[mainItemIdState || itemIdState],
        attributesState
      );

      console.info(
        "is select option non sku enabled -- ",
        isNonSkuEnabledAttribute(attributeid),
        mainItemIdState,
        mainProductSkus
      );

      let attributeIds = attributesState.reduce((arr, item) => {
        arr.push(item.attributeid);
        return arr;
      }, []);

      // Filter selected attributes
      let selectedAttributes = {};
      console.info("attributeIds", attributeIds);

      let keys = Object.keys(
        selectedProductAttributesState[mainItemIdState || itemIdState]
      );

      for (let key of keys) {
        let item =
          selectedProductAttributesState[mainItemIdState || itemIdState][key];
        selectedAttributes[item.attributeid] = {} = item.optionid;
      }

      console.info(
        "selectedAttributes - mainAttr",
        mainAttributeidWithCombinations,
        selectedAttributes
      );

      // Get the position of the attributeid
      let posAttributeId = attributesState.find(
        attr => attr.attributeid == attributeid
      ).position;

      console.info("selectedAttributes - POS", posAttributeId, attributeid);
      let AttributeIdWithThePreviousPosition = "";

      let notFound = true;

      let i = posAttributeId;

      while (notFound) {
        let found = attributesState.find(attr => attr.position == i - 1);

        if (found) {
          notFound = false;

          AttributeIdWithThePreviousPosition = found.attributeid;
        } else {
          i -= -1;
        }
      }

      /*   let AttributeIdWithThePreviousPosition = attributesState.find(
        attr => attr.position == posAttributeId - 1
      ).attributeid; */

      console.info(
        "AttributeIdWithThePreviousPosition",
        AttributeIdWithThePreviousPosition,
        selectedAttributes
      );

      let availableOptions = mainAttributeidWithCombinations[
        mainAttribute
      ].filter(item => {
        if (AttributeIdWithThePreviousPosition == mainAttribute)
          return (
            item.mainOptionId ==
            selectedAttributes[AttributeIdWithThePreviousPosition]
          );
        else
          return (
            item[AttributeIdWithThePreviousPosition] ==
            selectedAttributes[AttributeIdWithThePreviousPosition]
          );
      });

      availableOptions = availableOptions.reduce((tempArr, option, index) => {
        tempArr.push(option[attributeid]);
        return tempArr;
      }, []);

      console.info("availableOptions", availableOptions);
      // Add available object to option to flag it is available for the preceding attribute
      options = options.map(option => {
        return (option = {
          ...option,
          available: availableOptions.includes(option.optionid)
        });
      });

      console.info(
        "selectedAttributes - -AVAILABLE",
        availableOptions,
        options
      );
    }

    if (
      selectedProductAttributesState &&
      selectedProductAttributesState[mainItemIdState || itemIdState] &&
      selectedProductAttributesState[mainItemIdState || itemIdState][
        attributeid
      ]
    ) {
      let selectedOption = {};
      options.forEach((item, index) => {
        if (
          item.optionid ==
          selectedProductAttributesState[mainItemIdState || itemIdState][
            attributeid
          ].optionid
        ) {
          selectedOptionIndex = index;
          selectedOption = item;
        }
      });

      // If option is not available, select the first available one.
      if (selectedOption.available == false) {
        console.info("first available one");
        dispatch(
          changeProductAttributesAction({
            ...selectedProductAttributesState,
            [mainItemIdState]: {
              ...selectedProductAttributesState[mainItemIdState],
              [attributeid]: options.find(option => option.available == true)
            }
          })
        );
      }
    }

    let result = (
      <div className="attribute-option-select-wrapper">
        <select
          value={selectedOptionIndex}
          className="attribute-option--select"
          onChange={e => handleAttributeOptionSelected(e, options, switchimage)}
        >
          <option value={-1} key={-1}>
            {dropname}
          </option>
          {options.map((option, index) => {
            let itemid = mainItemIdState || itemIdState;
            const { optionid, ddtext, attributeid } = option;
            let availableOption =
              availableOtherOptions &&
              availableOtherOptions[itemid] &&
              availableOtherOptions[itemid][attributeid] &&
              availableOtherOptions[itemid][attributeid].includes(optionid);

            const isActiveOption =
              optionid ===
              (selectedProductAttributesState[itemid] &&
                selectedProductAttributesState[itemid][attributeid] &&
                selectedProductAttributesState[itemid][attributeid].optionid);

            console.info("isActiveOption", isActiveOption);
            console.info(
              "option.available",
              availableOtherOptions,
              option,
              availableOption
            );

            return (
              <option
                style={{
                  color:
                    !skuEnabled || option.available || availableOption
                      ? "#000"
                      : "#bbb",
                  display: option.available ? "" : !skuEnabled ? "" : "none"
                }}
                key={index}
                value={index}
              >
                {ddtext}
              </option>
            );
          })}
        </select>
      </div>
    );
    return result;
  };

  const renderAttributeOtherOptionsBasedOnFormat = attr => {
    const { format, dataname, options, attributeid } = attr;
    console.info("Format", attr);

    if (format == "D") {
      console.info("Format", format);
      return renderAttributeOtherSelectOptions(attr);
    } else if (format == "C") {
      return renderAttributeOtherFormatC(dataname, options, attributeid);
    } else if (format === "" && options.length === 0) {
      return renderAttributeOtherFormatText(attr);
    } else {
      return renderAttributeOtherSelectOptions(attr);
    }
  };

  const renderAttributeOtherOptions = attr => {
    let { dataname, screenname, prompt } = attr;
    dataname = dataname.includes("-") ? dataname.split("-")[1] : dataname;

    return (
      <div style={{ width: "100%" }} className={`attribute-option-${dataname}`}>
        {productAttributeCheckboxFlagState &&
          renderAttributeOptionsHeader(attr)}

        {renderAttributeOtherOptionsBasedOnFormat(attr)}
      </div>
    );
  };

  const handleCheckBoxChecked = (
    e,
    checked,
    attributeid,
    optionid,
    radioBtn
  ) => {
    console.info("borop check", e, checked, attributeid, optionid);
    let obj = { checked, attributeid, optionid };
    if (checked && selectedProudctCheckboxPriceInventoryState) {
      let skuid = mainProductSkus.find(obj => obj.optionid === optionid).skuid;
      if (
        !Object.keys(selectedProudctCheckboxPriceInventoryState).includes(
          String(optionid)
        )
      ) {
        fetch(
          GET_PRICE_INVENTORY.replace("$PRODUCT", skuid).replace(
            "$LANGUAGE",
            langState
          )
        )
          .then(res => res.json())
          .then(json => {
            console.info("borop variant price record", json);
            json.__Result[0].qty = 1;
            dispatch(
              setProductCheckboxAttributesPriceInventoryRecordAction({
                [optionid]: json.__Result[0]
              })
            );
          })
          .catch(err =>
            console.error("error fetching variant price inventory", err)
          );
      }
    }
    handleAttributeCheckboxChecked(obj, radioBtn);
  };

  const renderCheckBoxAttributes = (attr, options) => {
    const { dropname, prompt, switchimage } = attr;

    const defaultValue =
      selectedProductAttributesState[mainItemIdState] &&
      selectedProductAttributesState[mainItemIdState][attr.attributeid] &&
      selectedProductAttributesState[mainItemIdState][attr.attributeid]
        .optionid;

    /*   let defaultValueIndex = -1;

    if (defaultValue) {
      defaultValueIndex = options.forEach((option, index) => {
        if (option.optionid == defaultValue) return index;
      });
    }
 */

    const renderAsCheckboxes = (attr, options) => {
      return options.map((option, index) => {
        const { optionid, ddtext, attributeid } = option;

        let ddTextKgToLbs = "";

        if (ddtext.includes(" kg")) {
          ddTextKgToLbs = Number(ddtext.split(" ")[0]);

          ddTextKgToLbs *= 2.205;

          ddTextKgToLbs = ` (${ddTextKgToLbs.toFixed(2)} lb)`;
        }

        console.info("borop ddtext", ddtext, ddTextKgToLbs);

        let checked =
          selectedProductCheckBoxAttributesState &&
          selectedProductCheckBoxAttributesState[attributeid] &&
          selectedProductCheckBoxAttributesState[attributeid].includes(
            optionid
          );

        let invRecord =
          selectedProudctCheckboxPriceInventoryState &&
          selectedProudctCheckboxPriceInventoryState[optionid] &&
          selectedProudctCheckboxPriceInventoryState[optionid].invs &&
          selectedProudctCheckboxPriceInventoryState[optionid].invs[0];

        let stock = invRecord && invRecord.instock;
        let previousStock =
          previousStockCounts &&
          previousStockCounts[optionid] &&
          previousStockCounts[optionid].invs &&
          previousStockCounts[optionid].invs[0].instock;

        console.info("borop6", previousStock);

        let price =
          selectedProudctCheckboxPriceInventoryState &&
          selectedProudctCheckboxPriceInventoryState[optionid] &&
          selectedProudctCheckboxPriceInventoryState[optionid].prices &&
          selectedProudctCheckboxPriceInventoryState[optionid].prices.length >
            0 &&
          Object.keys(
            selectedProudctCheckboxPriceInventoryState[optionid].prices[0]
          ).includes("price_1") &&
          selectedProudctCheckboxPriceInventoryState[optionid].prices[0]
            .price_1;

        return (
          <div key={optionid} className="attribute-checkbox-wrapper">
            <FormControlLabel
              disabled={stock === 0 && mainProductInventoryQty > 0}
              className="attribute-control-label"
              control={
                <Checkbox
                  className="attribute-checkbox"
                  onChange={(e, checked) =>
                    handleCheckBoxChecked(e, checked, attributeid, optionid)
                  }
                  value={`${optionid}`}
                  color="primary"
                ></Checkbox>
              }
              label={
                <FormattedNumber
                  value={price / priceConvert}
                  style="currency"
                  currency={currency}
                >
                  {value => {
                    if (price) return `${ddtext}${ddTextKgToLbs} - ${value}`;

                    return `${ddtext}${ddTextKgToLbs}`;
                  }}
                </FormattedNumber>
              }
            />
            {stock === 0 && !previousStock && mainProductInventoryQty > 0 && (
              <div className="attribute-out-of-stock">Out of stock</div>
            )}
            {stock === 0 && previousStock > 0 && (
              <div className="attribute-out-of-stock">
                You've got the last one
              </div>
            )}
            {stock > 0 && checked && (
              <InputIncrement stock={stock} optionid={optionid} />
            )}
          </div>
        );
      });
    };

    const renderAsRadioButtons = (attr, options) => {
      return (
        <div key={attr.attributeid} className="attribute-radiobuttons-wrapper">
          <RadioGroup
            aria-label={attr.prompt}
            className="attribute-radiobuttons-group"
          >
            {options.map((option, index) => {
              const { optionid, ddtext, attributeid } = option;
              let ddTextKgToLbs = "";

              if (ddtext.includes(" kg")) {
                ddTextKgToLbs = Number(ddtext.split(" ")[0]);

                ddTextKgToLbs *= 2.205;

                ddTextKgToLbs = ` (${ddTextKgToLbs.toFixed(2)} lb)`;
              }

              let checked =
                selectedProductCheckBoxAttributesState &&
                selectedProductCheckBoxAttributesState[attributeid] &&
                selectedProductCheckBoxAttributesState[attributeid].includes(
                  optionid
                );

              let invRecord =
                selectedProudctCheckboxPriceInventoryState &&
                selectedProudctCheckboxPriceInventoryState[optionid] &&
                selectedProudctCheckboxPriceInventoryState[optionid].invs &&
                selectedProudctCheckboxPriceInventoryState[optionid].invs[0];

              let stock = invRecord && invRecord.instock;
              let previousStock =
                previousStockCounts &&
                previousStockCounts[optionid] &&
                previousStockCounts[optionid].invs &&
                previousStockCounts[optionid].invs[0].instock;
              let price =
                selectedProudctCheckboxPriceInventoryState &&
                selectedProudctCheckboxPriceInventoryState[optionid] &&
                selectedProudctCheckboxPriceInventoryState[optionid].prices &&
                selectedProudctCheckboxPriceInventoryState[optionid].prices
                  .length > 0 &&
                Object.keys(
                  selectedProudctCheckboxPriceInventoryState[optionid].prices[0]
                ).includes("price_1") &&
                selectedProudctCheckboxPriceInventoryState[optionid].prices[0]
                  .price_1;

              return (
                <div key={optionid} className="attribute-radiobuttons-wrapper">
                  <FormControlLabel
                    value={`${optionid}`}
                    control={
                      <Radio
                        className="attribute-radioBtn"
                        onChange={(e, checked) =>
                          handleCheckBoxChecked(
                            e,
                            checked,
                            attributeid,
                            optionid,
                            true
                          )
                        }
                      />
                    }
                    label={
                      <FormattedNumber
                        value={price / priceConvert}
                        style="currency"
                        currency={currency}
                      >
                        {value => {
                          if (price)
                            return `${ddtext}${ddTextKgToLbs} - ${value}`;

                          return `${ddtext}${ddTextKgToLbs}`;
                        }}
                      </FormattedNumber>
                    }
                  />
                  {stock === 0 && !previousStock && (
                    <div className="attribute-out-of-stock">
                      Out of stock - select another item
                    </div>
                  )}
                  {stock === 0 && previousStock > 0 && (
                    <div className="attribute-out-of-stock">
                      You've got the last one
                    </div>
                  )}
                  {/*   {stock > 0 && checked && (
                    <InputIncrement stock={stock} optionid={optionid} />
                  )} */}
                </div>
              );
            })}
          </RadioGroup>
        </div>
      );
    };

    return (
      <div
        className={`attribute-option-select-wrapper checkbox-flag scroll-bar-thin-style`}
      >
        {checkBoxItemsState.length > 0
          ? renderAsRadioButtons(attr, options)
          : renderAsCheckboxes(attr, options)}
      </div>
    );
  };

  const renderMainAttributeOptions = attr => {
    let {
      dataname,
      options,
      screenname,
      format,
      dropname,
      prompt,
      switchimage
    } = attr;
    console.info("main attr options", attr, mainAttribute);
    dataname = dataname.includes("-") ? dataname.split("-")[1] : dataname;

    let filteredMainOptionIds = [];
    if (Object.keys(mainAttributeidWithCombinations).length > 0) {
      mainAttributeidWithCombinations[mainAttribute].forEach(item => {
        if (filteredMainOptionIds.includes(item.mainOptionId) === false) {
          filteredMainOptionIds.push(item.mainOptionId);
        }
      });
    }

    console.info(
      "filteredMainOptionIds",
      mainAttributeidWithCombinations,
      filteredMainOptionIds,
      mainAttributeidWithCombinations[mainAttribute]
    );

    if (!isNonSkuEnabledAttribute(mainAttribute)) {
      options = options.filter(option => {
        return filteredMainOptionIds.includes(option.optionid);
      });
    }

    if (
      attributesState &&
      attributesState.length > 0 &&
      mainAttributeidWithCombinations &&
      selectedProductAttributesState &&
      selectedProductAttributesState[mainItemIdState] &&
      Object.keys(selectedProductAttributesState[mainItemIdState]).length > 0
    ) {
      console.info("main options", options, attributesState);

      let positionOfMainAttr = attributesState.find(
        attr => attr.attributeid == mainAttribute
      ).position;

      console.info("TEST position of main attr", positionOfMainAttr);
      // Should get the next attribute that is sku enabled and not the main attr
      if (
        attributeJson.some(
          attr => attr.skuEnabled && attr.attributeid != mainAttribute
        )
      ) {
        let attributeIdThatComesAfterTheMain = attributesState.findIndex(
          attr => attr.attributeid != mainAttribute
        ).attributeid;

        if (
          selectedProductAttributesState[mainItemIdState][
            attributeIdThatComesAfterTheMain
          ] &&
          selectedProductAttributesState[mainItemIdState][
            attributeIdThatComesAfterTheMain
          ].optionid
        ) {
          let secondAttribuAttributeId =
            selectedProductAttributesState[mainItemIdState][
              attributeIdThatComesAfterTheMain
            ].attributeid;

          console.info(
            "main options combinations",
            mainAttributeidWithCombinations,
            secondAttribuAttributeId
          );

          let selectedSecondAttributeOptionId =
            selectedProductAttributesState[mainItemIdState][
              secondAttribuAttributeId
            ].optionid;

          let availableMainAttributeOptionIdsForTheSecondAttribuAttributeId = mainAttributeidWithCombinations[
            mainAttribute
          ].reduce((arr, attr) => {
            if (
              attr[secondAttribuAttributeId] == selectedSecondAttributeOptionId
            ) {
              arr.push(attr.mainOptionId);
            }
            return arr;
          }, []);

          console.info(
            "main options filtered",
            availableMainAttributeOptionIdsForTheSecondAttribuAttributeId
          );

          // Get the second attribute's screenname to use for the tooltip
          let secondAttributeScreenName = attributeJson.reduce(
            (screenname, attr) => {
              if (attr.attributeid == secondAttribuAttributeId) {
                screenname = attr.screenname;
              }
              return screenname;
            },
            ""
          );

          console.info("screenname", secondAttributeScreenName, attributeJson);

          // Flag if the main attribute available for the selected second attribute.
          options = options.map(option => {
            return (option = {
              ...option,
              available: availableMainAttributeOptionIdsForTheSecondAttribuAttributeId.includes(
                option.optionid
              ),
              secondAttributeScreenName: secondAttributeScreenName
            });
          });
        }
      }
    }

    // if there is only one attribute, render as checkboxes
    if (productAttributeCheckboxFlagState) {
      return renderCheckBoxAttributes(attr, options);
    }

    if (format == "D" || format == "R") {
      const { dropname, prompt } = attr;
      const defaultValue =
        selectedProductAttributesState[mainItemIdState] &&
        selectedProductAttributesState[mainItemIdState][attr.attributeid] &&
        selectedProductAttributesState[mainItemIdState][attr.attributeid]
          .optionid;

      /*   let defaultValueIndex = -1;

      if (defaultValue) {
        defaultValueIndex = options.forEach((option, index) => {
          if (option.optionid == defaultValue) return index;
        });
      } */

      return (
        <div
          className="attribute-option-select-wrapper"
          style={{ width: "100%" }}
        >
          <select
            defaultValue={defaultValue}
            className="attribute-option--select"
            onChange={e =>
              handleAttributeOptionSelected(e, options, switchimage)
            }
          >
            <option value={-1}>{dropname}</option>
            {options.map((option, index) => {
              if (mainItemIdState && mainItemIdState != 0) {
                let disabledOption = availableOtherOptions[mainItemIdState];
              }
              const { optionid, ddtext, attributeid } = option;

              return (
                <option style={{ color: "#000" }} key={index} value={index}>
                  {ddtext}
                </option>
              );
            })}
          </select>
        </div>
      );
    }

    return (
      <div className={`attribute-option-main`}>
        {options.map(option => {
          let optionDisabled = "";
          if (option.available == false) {
            optionDisabled = " disabled";
          }
          const { optionid, ddtext, choice, color, attributeid } = option;
          let itemId = mainItemIdState || itemIdState;
          const isActiveOption =
            optionid ===
            (selectedProductAttributesState[itemId] &&
              selectedProductAttributesState[itemId][attributeid] &&
              selectedProductAttributesState[itemId][attributeid].optionid);

          console.info("isActiveOption", isActiveOption);

          return (
            <div
              className={`attribute-option-image-wrapper${
                isActiveOption ? ` active` : ``
              }${optionDisabled}`}
              key={optionid}
              onClick={() =>
                handleAttributeOptionClicked({
                  attributeid,
                  optionid,
                  choice,
                  color,
                  ddtext
                })
              }
            >
              <div
                className={`attribute-option-image${
                  isActiveOption ? ` active` : ``
                }${optionDisabled}`}
                title={ddtext}
                style={{
                  height: "52px",
                  width: "52px",
                  backgroundColor: color,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundImage: color.includes(".")
                    ? `url(https://slpreview.sociallighting.com/preview/store/20180521148/assets/images/attributes/${color})`
                    : `url(https://slpreview.sociallighting.com/preview/store/20180521148/assets/images/attributes/no-image.png)`,
                  backgroundSize: "cover"
                }}
              >
                {dataname == "amount" ? (
                  <span className="no-select attribute-option-span">
                    {ddtext}
                  </span>
                ) : (
                  ""
                )}
              </div>
              {option.available == false ? (
                <div className="attribute-option-tooltip">
                  <span>{`Not available for the selected ${option.secondAttributeScreenName}`}</span>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  };

  const renderAttributeOptionsHeader = attr => {
    let { prompt, attributeid } = attr;
    console.info("attr header", attr);
    let itemId = mainItemIdState || itemIdState;
    let selectedColorText =
      (selectedProductAttributesState[itemId] &&
        selectedProductAttributesState[itemId][attributeid] &&
        selectedProductAttributesState[itemId][attributeid].ddtext) ||
      "";
    //let headerAction = screenname.includes("Request") ? `Enter` : "Select";
    return (
      <div className="attribute-option-header">
        <h4 className="attribute-option-title">
          {`${prompt}: `}{" "}
          <span style={{ fontWeight: "normal" }}>{selectedColorText}</span>
        </h4>
      </div>
    );
  };

  if (
    attributesState &&
    attributesState.length > 0 &&
    mainProductInventoryQty > 0
  ) {
    return (
      <div className={"col-xs-12 attributes-container"}>
        <div className={`attributes-wrapper`}>{renderAttributes()}</div>
      </div>
    );
  } else {
    return null;
  }
}
