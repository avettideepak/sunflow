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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 'auto',
    padding: '0px 25px',
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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { translate, langCode } = useContext(I18nContext);

  return (
    <>
      <div className="whiteBg">
        <div className="container-fluid">
          <div className={classes.root}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              //className={classes.tabs}
              classes={{
                indicator: classes.indicator,
                tabs: classes.tabs,
                wrapper: classes.wrapper
              }}
            >
              <Tab label="- Our Story" {...a11yProps(0)} />
              <Tab label="- Solar" {...a11yProps(1)} />
              <Tab label="- Roofing" {...a11yProps(2)} />
              <Tab label="- Windows & Door" {...a11yProps(3)} />
              <Tab label="- Insulation" {...a11yProps(4)} />
            </Tabs>
            <TabPanel className="tabpan" value={value} index={0}>
              <Grid container spacing={3}>
                <Grid item xs={5}>
                  <img className="tabimg" src="https://ik.imagekit.io/ofb/sunflow/Photo_DzIhV3OKO.png?updatedAt=1630048472378" />
                </Grid>
                <Grid item xs={7} className="maintab">
                  <h1>Sunflow’s story</h1>
                  <p>We are committed to quality in our products, in our process, in our staff and most importantly, in our work. Serving Barrie, Simcoe County and surrounding areas, the SunFlow Roofing team wants to raise the bar for the roofing industry by holding ourselves to the highest possible standard. You may be able to get a better price, but you will not be able to get better quality. We’ve got you covered.</p>
                  <p>Our slogan is Clients for Life because of how we feel about our clients and our work.</p>
                  <div className="tabi"><img src="https://ik.imagekit.io/ofb/sunflow/Hearts_logo_1_ewEYsbtZvsd.png?updatedAt=1630048464780" /></div>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel className="tabpan" value={value} index={1}>
              <Grid container spacing={3}>
                <Grid item xs={5}>
                  <img className="tabimg" src="https://ik.imagekit.io/ofb/sunflow/Photo__1__0068EAakd.png?updatedAt=1630048469212" />
                </Grid>
                <Grid item xs={7} className="maintab">
                  <h1>Sunflow Solar</h1>
                  <p>Sunflow initially started out as a solar company back in 2012.  My first interest in solar was back when I was 10 years old. I remember clearly, my grandfather and I  walking and discussing how solar was the energy answer for the future. I didn’t think much about it at the time.  It came as no surprise to me that 25 years later I would establish myself in the solar industry with the birth of Sunflow Solar.</p>

                  <p>The success of Sunflow Solar has been attributed to using high quality products and attracting high quality installers and a team effort. I originally started working from home and ended up having 6 dealerships across Ontario and became one of the largest residential solar companies in Canada. It has always been about the customer first, giving them high quality products, services and the best warranty.</p>
                  <span>Learn more about Sunflow Solar <img src="https://ik.imagekit.io/ofb/sunflow/arrow-right_QHxNy1I718.png?updatedAt=1630049327061" /></span>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel className="tabpan" value={value} index={2}>
              <Grid container spacing={3}>
                <Grid item xs={5}>
                  <img className="tabimg" src="https://ik.imagekit.io/ofb/sunflow/Photo__2__so6BqYwBeq.png?updatedAt=1630048469973" />
                </Grid>
                <Grid item xs={7} className="maintab">
                  <h1>Sunflow Roofing</h1>
                  <p>I wanted to change to way homeowners felt about the roofing industry.</p>

                  <p> I came into the roofing industry honestly, realizing that customers would need a new roof before solar was installed. Quite frankly, I was frustrated and disappointed with the inconsistency within most of the roofing industry. I wanted to change the way homeowners felt about the roofing industry. I provide higher quality products, services and lifetime warranties on all of my roofing services resulting in a consistent and trustworthy experience for the homeowner. I understand that when customers are thinking about purchasing a new roof, they need a company that they can trust. Trust is among our core values and beliefs.</p>
                  <span>Learn more about Sunflow Roofing <img src="https://ik.imagekit.io/ofb/sunflow/arrow-right_QHxNy1I718.png?updatedAt=1630049327061" /></span>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel className="tabpan" value={value} index={3}>
              <Grid container spacing={3}>
                <Grid item xs={5}>
                  <img className="tabimg" src="https://ik.imagekit.io/ofb/sunflow/Photo__3__-xx4JMZHN.png?updatedAt=1630048470885" />
                </Grid>
                <Grid item xs={7} className="maintab">
                  <h1>Sunflow
                    Windows & Doors</h1>
                  <p>SunFlow windows & doors excites me because it is something that beautifies the home. I love being a part of the transformation when our clients install new windows and doors. It changes the look of their home and it changes something inside them as well.  All projects are unique and special, just like the homeowners. My journey in finding the best manufacturer was arduous, I visited 18 manufacturers throughout Ontario and partnered up with the highest quality window and door manufacturer. I would love the opportunity to show you first hand our quality in our entire selection of windows and doors packages. We have access to many brands and styles. Our price is always competitive and our quality/value is the best in the business.</p>
                  <span>Learn more about Sunflow Windows & Doors <img src="https://ik.imagekit.io/ofb/sunflow/arrow-right_QHxNy1I718.png?updatedAt=1630049327061" /></span>
                </Grid>

              </Grid>            </TabPanel>
            <TabPanel className="tabpan" value={value} index={4}>
              <Grid container spacing={3}>
                <Grid item xs={5}>
                  <img className="tabimg" src="https://ik.imagekit.io/ofb/sunflow/Photo__4__hY8u_1rJlp.png?updatedAt=1630048471692" />
                </Grid>
                <Grid item xs={7} className="maintab">
                  <h1>Sunflow Insulations</h1>
                  <p>Saving money with solar, windows, doors and proper insulation is a big deal to Sunflow. We added insulation to our list of services because of the amount of customers complaining about ice damming and long icicles; they wanted to know if we could help them out. Also, being a solar company we love the fact that we can lower your utility costs and make your home more energy efficient. Topping up your attic insulation also makes sleeping more comfortable. You have less draft in the winter and stay cooler in the summer. Owning and running a home is a huge responsibility. Home maintenance isn’t fun and it can be stressful. At Sunflow Insulations we want to take that stress away. For most jobs we are in and out of your house in a day. </p>
                  <span>Learn more about Sunflow Insulations <img src="https://ik.imagekit.io/ofb/sunflow/arrow-right_QHxNy1I718.png?updatedAt=1630049327061" /></span>
                </Grid>
              </Grid>
            </TabPanel>
          </div>
        </div>
      </div>


    </>
  );
};

export default ServicesBox;
