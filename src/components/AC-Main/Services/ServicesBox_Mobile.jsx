import React, { useContext } from "react";
import { I18nContext } from "../../../i18n";
import { Link } from "gatsby";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 'auto',
    padding: '0px 0px',
  },
  tabs: {
    borderRight: `0px solid ${theme.palette.divider}`,
    justifyContent : 'left',    
    paddingTop: "50%",
  },
  tabpanel: {
    width: '-webkit-fill-available',
  },
  indicator: {
    display : 'none',
  },
  wrapper: {
    width: '100%',
    display: 'block',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    fontSize: '17px',
    textAlign: 'left',
    fontWeight: '400'
  }
}));


const ServicesBox = () => {

  const classes = useStyles();
  const { translate, langCode } = useContext(I18nContext);

  return (
    <>
      <div className="whiteBg">
        <div className="container-fluid">
          <div className={classes.root}>
              <Grid container spacing={3}>
                <Grid item xs={12} className="mobilegrid">
                  <img className="tabimgs" src="https://ik.imagekit.io/ofb/sunflow/mobileprofile_aNa4Ir6Sfv_.jpg" />
                  <Link to="/solar"><img className="arroebutton" src="https://ik.imagekit.io/ofb/sunflow/Button_b863My_-4I.png" /></Link>
                </Grid>
                <Grid item xs={12} className="maintab">
                  <h1>Sunflow’s story</h1>
                  <p>We are committed to quality in our products, in our process, in our staff and most importantly, in our work. Serving Barrie, Simcoe County and surrounding areas, the SunFlow Roofing team wants to raise the bar for the roofing industry by holding ourselves to the highest possible standard. You may be able to get a better price, but you will not be able to get better quality. We’ve got you covered.</p>
                  <p>Our slogan is Clients for Life because of how we feel about our clients and our work.</p>
                  <div className="tabi"><img src="https://ik.imagekit.io/ofb/sunflow/Hearts_logo_1_ewEYsbtZvsd.png?updatedAt=1630048464780" /></div>
                </Grid>
              </Grid>            
          </div>
        </div>
      </div>


    </>
  );
};

export default ServicesBox;
