import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";

import { I18nContext } from "../../i18n/index";

const NumberOfItems = ({ data }) => {
  const { translate } = React.useContext(I18nContext);
  const [numberOfItems, setNumberOfItems] = useState(Number(data.itemsCount));

  const loadingState = useSelector(
    state => state.categoryReducer.loading,
    shallowEqual
  );

  const breadState = useSelector(
    state => state.facetReducer.bread,
    shallowEqual
  );
  const numberOfItemsState = useSelector(
    state => state.categoryReducer.numberOfItems,
    shallowEqual
  );

  const showDynamicState = useSelector(
    state => state.categoryReducer.showDynamic,
    shallowEqual
  );

  useEffect(() => {
    if (showDynamicState) {
      setNumberOfItems(numberOfItemsState);
    } else {
      setNumberOfItems(Number(data.itemsCount));
    }
  }, [showDynamicState, numberOfItemsState]);

  return (
    <React.Fragment>
      {!loadingState ? (
        <div className="dataCount">
          <b>{numberOfItems}</b>
          {numberOfItems > 1
            ? ` ${translate("js.category.productsfound")}`
            : ` ${translate("js.category.productfound")}`}
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default NumberOfItems;
