import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import classes from "./NotifyOnReStock.module.css";
import { NOTIFY_ON_RESTOCK } from "../../redux/links";
import { VID } from "../../project-config";

const NotifyOnReStock = ({ supplier, renderedInsideAddToCartBox }) => {
  const dispatch = useDispatch();

  const [input, setInput] = useState({ email: "", inputBoxVisible: false });
  const [response, setResponse] = useState("");

  useEffect(() => {
    return () => {
      setInput({});
      setResponse("");
    };
  }, []);

  const { stock, code, itemid } = supplier;
  //const { code, itemid } = product;

  const supplierInfoState = useSelector(
    state => state.productReducer.supplierInfo,
    shallowEqual
  );

  const firstDist = supplierInfoState[0].distributorOrder[0];

  const vid = firstDist.supplier_store_vid;

  const securityTokenState = useSelector(
    state => state.loginReducer.securityToken,
    shallowEqual
  );

  const vendorIdState = useSelector(
    state => state.productReducer.itemDetail.vendorId,
    shallowEqual
  );

  const handleInputChanged = e => {
    const { value, name } = e.target;

    setInput(input => {
      return { ...input, [name]: value };
    });
  };

  const handleNotifyOnReStockClicked = () => {
    setInput({ ...input, inputBoxVisible: true });
  };

  const closeInputBox = () => setInput({ ...input, inputBoxVisible: false });

  const handleSubmit = e => {
    e.preventDefault();
    let form = new FormData();

    form.append("vid", vid);
    form.append("ic", code);
    form.append("iid", itemid);
    form.append("secutirytoken", securityTokenState);
    form.append("mode", "save");
    form.append("nmemail", input.email);

    fetch(NOTIFY_ON_RESTOCK, {
      method: "POST",
      body: form,
      headers: {
        Accept: "*/*",
        credentials: "same-origin"
      },
      mimeType: "multipart/form-data",
      data: form
    })
      .then(res => res.json())
      .then(json => {
        console.info("notify borop", json);
        setResponse(json);
      })
      .catch(err => {
        console.error("error notify on restock", err.message);
      });
  };

  const renderInputBox = () => {
    if (input.inputBoxVisible) {
      return (
        <div className={classes.inputContainer} onClick={closeInputBox}>
          <div
            className={classes.inputWrapper}
            onClick={e => e.stopPropagation()}
          >
            <i
              onClick={closeInputBox}
              className={`material-icons ${classes.closeIcon}`}
            >
              close
            </i>
            <input
              placeholder="Email"
              className={classes.input}
              name="email"
              type="email"
              onChange={e => handleInputChanged(e)}
              value={input.email}
              required
            />
            <span onClick={handleSubmit} className={classes.submitBtn}>
              Notify Me
            </span>

            {response && (
              <span className={classes.message}>
                {response.__Message}{" "}
                {response.__Message.includes("Please login") ? (
                  <span
                    className={classes.loginBtn}
                    onClick={() =>
                      document.getElementById("login-icon-btn").click()
                    }
                  >
                    Login
                  </span>
                ) : null}
              </span>
            )}
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  if (stock === 0)
    return (
      <React.Fragment>
        {renderInputBox()}
        <div
          style={{ marginLeft: renderedInsideAddToCartBox ? "0" : "" }}
          onClick={() => handleNotifyOnReStockClicked()}
          className={classes.wrapper}
        >
          Notify when in stock
        </div>
      </React.Fragment>
    );
  else return null;
};

export default NotifyOnReStock;
