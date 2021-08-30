import React, { useEffect, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";

import htmldecoder from "../../../../functions/htmldecoder";

import { I18nContext } from "../../../../i18n/index";
import "./Styles/OtherInfoTab.css";


import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>{children}</div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
}));

const OtherInfoTab = ({ longDesc, properties }) => {
  const { translate } = React.useContext(I18nContext);

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };


  return (
    <div
      className="product-details-specs-container"
      style={{ backgroundColor: "white" }}
    >
      <h3 className="products-desc">
        {translate("js.item.productdetails")}
      </h3>

      <div id="description" className="otherDesktop">
              {longDesc && Object.keys(longDesc).map((desc, index) => {
                if (longDesc[desc] !== "") {
                  return (
                    <p
                      key={index}
                      dangerouslySetInnerHTML={{
                        __html: htmldecoder(longDesc[desc])
                      }}
                    />
                  );
                }
              })}
            </div>


            <h3 className="products-desc">
            {translate("js.item.specifications")}
      </h3>

      <div id="Specifi">
              {properties && properties.length > 0 ? (
                <div className="specs-list">
                  {/* <table className="table table-striped">
                  <tbody>
                    {properties
                      ? properties
                          .slice(0, properties.length / 2)

                          .map(property => {
                            return (
                              <tr key={property.propname}>
                                <th>
                                  <strong>
                                    {property.propname.split("_").join(" ")}
                                  </strong>
                                </th>
                                <td>{property.propvalue}</td>
                              </tr>
                            );
                          })
                      : null}
                  </tbody>
                </table> */}

                  <table className="table table-striped">
                    <tbody>
                      {properties
                        ? properties
                          .slice(properties.length / 2, properties.length)
                          .map(property => {
                            return (
                              <tr key={property.propname}>
                                <th>
                                  <strong>
                                    {property.propname.split("_").join(" ")}
                                  </strong>
                                </th>
                                <td>{property.propvalue}</td>
                              </tr>
                            );
                          })
                        : null}
                    </tbody>
                  </table>
                </div>
              ) : (
                <h3>There is no {translate("js.item.specifications")} to show</h3>
              )}
            </div>

      

    </div>
  );
};

export default OtherInfoTab;
