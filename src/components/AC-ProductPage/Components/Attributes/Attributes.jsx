import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { GET_ATTIRIBUTE_LINK } from "../../../../redux/links";
import {
  changeProductAttributesAction,
  fetchingProductPriceInventory,
  fetchingProductRequestSaga,
  unMountProductPageAction
} from "../../../../redux/actions/productAction";
import "./Styles/Attributes.css";
//test
import { I18nContext } from "../../../../i18n/index";

export default function Attributes() {
  const dispatch = useDispatch();
  const { langCode } = useContext(I18nContext);

  const {
    skuids: skuidsState,
    skus: skusState,
    attributes: attributesState,
    itemId: itemIdState,
    mainitemid: mainItemIdState
  } = useSelector(state => state.productReducer.itemDetail, shallowEqual);

  const selectedProductAttributesState = useSelector(
    state => state.productReducer.selectedProductAttributes,
    shallowEqual
  );

  const [input, setInput] = useState({});

  const [attributeJson, setAttributeJson] = useState([]);

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
    };
  }, []);

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

        console.info("GIRDI4", objs);
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
      skusState &&
      skusState.length > 0
    ) {
      console.info(
        "GIRDI3",
        Object.values(
          selectedProductAttributesState[mainItemIdState || itemIdState]
        )
      );
      let selectedProductAttributeIdsAndOptionsIds = Object.values(
        selectedProductAttributesState[mainItemIdState || itemIdState]
      );
      let wantedSkuId;

      console.info("selected5", selectedProductAttributeIdsAndOptionsIds);
      let proceed = true;

      if (Object.keys(mainAttributeidWithCombinations).length > 0) {
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

      console.info("proceed", proceed, wantedSkuId);

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

        if (wantedSkuId.length == 1) {
          console.info("girdi555", wantedSkuId);
          wantedSkuId = wantedSkuId[0];
        }

        console.info(
          "selectedProductAttributeIdsAndOptionsIds",
          selectedProductAttributeIdsAndOptionsIds,
          wantedSkuId
        );
        if (wantedSkuId && wantedSkuId.skuid) {
          console.info("girdi5", wantedSkuId);
          dispatch(fetchingProductRequestSaga(wantedSkuId.skuid));
          dispatch(fetchingProductPriceInventory(wantedSkuId.skuid));
        }
      }
    }
  }, [selectedProductAttributesState]);

  // get the all possible attributes and their options
  useEffect(() => {
    if (
      attributesState &&
      attributesState.length > 0 &&
      mainItemIdState == 0 &&
      attributeJson.length == 0
    ) {
      console.info("counter", counter);
      setCounter(counter + 1);
      console.info("attributes", attributesState);
      let tempArr = [];

      if (counter === 0) {
        setMainAttribute(attributesState[0].attributeid);
        for (let attribute of attributesState) {
          console.info("counter fetching");
          fetch(
            GET_ATTIRIBUTE_LINK.replace(
              `$ATTIRIBUTEREPLACE`,
              attribute.attributeid
            ).replace("$LANGUAGE", langCode)
          )
            .then(res => res.json())
            .then(json => {
              let jsonResult = json.__Result[0];
              jsonResult.position = attribute.position;

              tempArr = [...tempArr, jsonResult];
              if (tempArr.length === attributesState.length) {
                tempArr.sort((a, b) => a.position - b.position);
                setAttributeJson(tempArr);
              }
            })
            .catch(err => console.error(err));
        }
      }
    }
  }, [attributesState]);
  console.info("mainAttr", mainAttribute);
  // Filtering all possible attributeid and optionid combinations
  useEffect(() => {
    if (skusState && skusState.length > 0 && mainItemIdState == 0) {
      if (mainAttribute) {
        let tempMainAttributeCombinations = {};

        if (
          Object.keys(tempMainAttributeCombinations).includes(
            String(mainAttribute)
          ) === false
        ) {
          tempMainAttributeCombinations[mainAttribute] = [];
        }

        skusState.forEach((sku, index) => {
          const { attributeid, optionid, skuid } = sku;

          if (attributeid == mainAttribute) {
            tempMainAttributeCombinations[mainAttribute] = [
              ...tempMainAttributeCombinations[mainAttribute],
              { mainOptionId: optionid, skuid }
            ];
          } else {
            let foundAtIndex = -1;
            let combinationOption = tempMainAttributeCombinations[
              mainAttribute
            ].find((item, index) => {
              // find where the mainOptionId is with the skuid matches to option combination
              if (item.skuid == skuid) {
                foundAtIndex = index;
                return true;
              } else {
                return false;
              }
            });

            console.info("tempMain Combination", combinationOption);
            tempMainAttributeCombinations[mainAttribute][foundAtIndex] = {
              ...tempMainAttributeCombinations[mainAttribute][foundAtIndex],
              [attributeid]: optionid
            };
          }
        });

        console.info(
          "tempMainAttributeCombinations",
          tempMainAttributeCombinations
        );
        setMainAttributeidWithCombinations(tempMainAttributeCombinations);
      }
    }
  }, [skusState, mainAttribute]);
  /* 
  console.info("tempFilteredAttributes", filteredAttributeJson); */
  console.info("attributeJson", attributeJson);

  const handleSettingSelectedAttributesToReduxState = obj => {
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

  const isNonSkuEnabledProduct = (pMainItemId, arrSkuIds) => {
    if (pMainItemId == 0 && arrSkuIds.length == 0) {
      return true;
    }
    return false;
  };

  const handleAttributeOptionClicked = obj => {
    handleSettingSelectedAttributesToReduxState(obj);
  };

  const handleAttributeOptionSelected = (e, options) => {
    const { value } = e.target;

    if (value == -1) {
      dispatch(fetchingProductRequestSaga(mainItemIdState));
      dispatch(fetchingProductPriceInventory(mainItemIdState));
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
    handleSettingSelectedAttributesToReduxState(input[attributeid]);
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
            className={`attribute-wrapper attribute-${dataname}`}
          >
            {renderAttributeOptions(attr)}
          </div>
        );
      });
    } else {
      return null;
    }
  };

  const renderAttributeOtherFormatC = (dataname, options, attributeid) => {
    options.map((option, index) => {
      if (mainItemIdState && mainItemIdState != 0) {
        let disabledOption = availableOtherOptions[mainItemIdState];
      }
      const { optionid, ddtext, choice, color, attributeid } = option;
      const isActiveOption =
        optionid ===
        (selectedProductAttributesState[mainItemIdState] &&
          selectedProductAttributesState[mainItemIdState][attributeid] &&
          selectedProductAttributesState[mainItemIdState][attributeid]
            .optionid);

      console.info("isActiveOption", isActiveOption);

      return (
        <div
          className={`attribute-option-image-wrapper${
            isActiveOption ? ` active` : ``
          }`}
          key={optionid}
          onClick={() =>
            handleAttributeOptionClicked(dataname, {
              attributeid,
              optionid,
              choice,
              color,
              ddtext
            })
          }
        >
          <label>{ddtext}</label>
        </div>
      );
    });
  };

  // Render text attribute input field
  const renderAttributeOtherFormatText = attr => {
    const { attributeid, dataname } = attr;

    if (
      mainItemIdState &&
      selectedProductAttributesState &&
      selectedProductAttributesState[mainItemIdState]
    ) {
      let value =
        selectedProductAttributesState[mainItemIdState] &&
        selectedProductAttributesState[mainItemIdState][attributeid];

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
  const renderAttributeOtherSelectOptions = (
    dataname,
    options,
    attributeid
  ) => {
    let selectedOptionIndex = -1;

    // Check if the option exists for the given main attribute
    if (
      attributesState &&
      attributesState.length > 0 &&
      selectedProductAttributesState &&
      selectedProductAttributesState[mainItemIdState] &&
      Object.keys(selectedProductAttributesState[mainItemIdState]).length > 0
    ) {
      console.info(
        "selectedAttributes",
        selectedProductAttributesState[mainItemIdState]
      );

      let attributeIds = attributesState.reduce((arr, item) => {
        arr.push(item.attributeid);
        return arr;
      }, []);

      // Filter selected attributes
      let selectedAttributes = {};
      console.info("attributeIds", attributeIds);

      let keys = Object.keys(selectedProductAttributesState[mainItemIdState]);

      for (let key of keys) {
        let item = selectedProductAttributesState[mainItemIdState][key];
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

      console.info("selectedAttributes - POS", posAttributeId);

      let AttributeIdWithThePreviousPosition = attributesState.find(
        attr => attr.position == posAttributeId - 1
      ).attributeid;

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
      selectedProductAttributesState[mainItemIdState] &&
      selectedProductAttributesState[mainItemIdState][attributeid]
    ) {
      let selectedOption = {};
      options.forEach((item, index) => {
        if (
          item.optionid ==
          selectedProductAttributesState[mainItemIdState][attributeid].optionid
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
          onChange={e => handleAttributeOptionSelected(e, options)}
        >
          {options.map((option, index) => {
            if (mainItemIdState && mainItemIdState != 0) {
              let disabledOption = availableOtherOptions[mainItemIdState];
            }
            const { optionid, ddtext, attributeid } = option;
            const isActiveOption =
              optionid ===
              (selectedProductAttributesState[mainItemIdState] &&
                selectedProductAttributesState[mainItemIdState][attributeid] &&
                selectedProductAttributesState[mainItemIdState][attributeid]
                  .optionid);

            console.info("isActiveOption", isActiveOption);
            return (
              <option
                style={{ color: option.available ? "#000" : "#bbb" }}
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
    console.info("Format", result);
    return result;
  };

  const renderAttributeOtherOptionsBasedOnFormat = attr => {
    const { format, dataname, options, attributeid } = attr;
    console.info("Format", attr);

    if (format == "D") {
      console.info("Format", format);
      return renderAttributeOtherSelectOptions(dataname, options, attributeid);
    } else if (format == "C") {
      return renderAttributeOtherFormatC(dataname, options, attributeid);
    } else if (format === "" && options.length === 0) {
      return renderAttributeOtherFormatText(attr);
    }
  };

  const renderAttributeOtherOptions = attr => {
    let { dataname, screenname } = attr;
    dataname = dataname.includes("-") ? dataname.split("-")[1] : dataname;

    return (
      <div className={`attribute-option-${dataname}`}>
        {renderAttributeOptionsHeader(screenname)}

        {renderAttributeOtherOptionsBasedOnFormat(attr)}
      </div>
    );
  };

  const renderMainAttributeOptions = attr => {
    let { dataname, options, screenname, format } = attr;
    console.info("main attr options", attr);
    dataname = dataname.includes("-") ? dataname.split("-")[1] : dataname;

    console.info("mainAttrCombinations", mainAttributeidWithCombinations);
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
      filteredMainOptionIds,
      mainAttributeidWithCombinations[mainAttribute]
    );

    if (!isNonSkuEnabledProduct(mainItemIdState, skuidsState)) {
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
      console.info("main options", options);

      let attributeIdThatComesAfterTheMain = attributesState.find(
        attr => attr.position == 2
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

    if (format == "D") {
      const { dropname } = attr;

      return (
        <div className="attribute-option-select-wrapper">
          {renderAttributeOptionsHeader(screenname)}
          <select
            className="attribute-option--select"
            onChange={e => handleAttributeOptionSelected(e, options)}
          >
            <option value={-1}>{dropname}</option>
            {options.map((option, index) => {
              if (mainItemIdState && mainItemIdState != 0) {
                let disabledOption = availableOtherOptions[mainItemIdState];
              }
              const { optionid, ddtext, attributeid } = option;
              const isActiveOption =
                optionid ===
                (selectedProductAttributesState[mainItemIdState] &&
                  selectedProductAttributesState[mainItemIdState][
                    attributeid
                  ] &&
                  selectedProductAttributesState[mainItemIdState][attributeid]
                    .optionid);

              console.info("isActiveOption", isActiveOption);
              return (
                <option
                  selected={isActiveOption}
                  style={{ color: "#000" }}
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
    }

    return (
      <div className={`attribute-option-main`}>
        {renderAttributeOptionsHeader(screenname)}
        {options.map(option => {
          const { optionid, ddtext, choice, color, attributeid } = option;
          const isActiveOption =
            optionid ===
            (selectedProductAttributesState[mainItemIdState] &&
              selectedProductAttributesState[mainItemIdState][attributeid] &&
              selectedProductAttributesState[mainItemIdState][attributeid]
                .optionid);

          return (
            <div
              className={`attribute-option-image-wrapper${
                isActiveOption ? ` active` : ``
              }${option.available ? `` : ` disabled`}`}
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
                }${option.available ? `` : ` disabled`}`}
                title={ddtext}
                style={{
                  height: "52px",
                  width: "52px",
                  backgroundColor: ddtext.toLowerCase(),
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
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

  const renderAttributeOptionsHeader = screenname => {
    console.info("screenname", screenname);
    let selectedColorText =
      (selectedProductAttributesState[itemIdState] &&
        selectedProductAttributesState[itemIdState][screenname] &&
        selectedProductAttributesState[itemIdState][screenname].ddtext) ||
      "";
    let headerAction = screenname.includes("Request") ? `Enter` : "Select";
    return (
      <div className="attribute-option-header">
        <h4 className="attribute-option-title">{`${headerAction} ${screenname}: ${selectedColorText}`}</h4>
      </div>
    );
  };

  return (
    <div className="col-xs-12 attributes-container">
      <div className="attributes-wrapper">{renderAttributes()}</div>
    </div>
  );
}
