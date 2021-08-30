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
                <Link to="/"><img className="arroebuttonleft" src="https://ik.imagekit.io/ofb/sunflow/Button_b863My_-4I.png" /></Link>
                <img className="tabimgs" src="https://ik.imagekit.io/ofb/sunflow/Photo__1__0068EAakd.png?updatedAt=1630048469212" />
                  <Link to="/roofing"><img className="arroebutton" src="https://ik.imagekit.io/ofb/sunflow/Button_b863My_-4I.png" /></Link>
                </Grid>
                <Grid item xs={12} className="maintab">
                  <h1>Sunflow Solar</h1>
                  <p>Sunflow initially started out as a solar company back in 2012.  My first interest in solar was back when I was 10 years old. I remember clearly, my grandfather and I  walking and discussing how solar was the energy answer for the future. I didn’t think much about it at the time.  It came as no surprise to me that 25 years later I would establish myself in the solar industry with the birth of Sunflow Solar.</p>

                  <p>The success of Sunflow Solar has been attributed to using high quality products and attracting high quality installers and a team effort. I originally started working from home and ended up having 6 dealerships across Ontario and became one of the largest residential solar companies in Canada. It has always been about the customer first, giving them high quality products, services and the best warranty.</p>
                  <span>Learn more about Sunflow Solar <img src="https://ik.imagekit.io/ofb/sunflow/arrow-right_QHxNy1I718.png?updatedAt=1630049327061" /></span>
                </Grid>
              </Grid>            
          </div>
        </div>
      </div>


    </>
  );
};

export default ServicesBox;
