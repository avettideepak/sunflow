import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function CSSLoading() {

  const classes = useStyles();

  return (
    <div className="loader-container">
      <div className={classes.root} style={{
        display : "flex",
        justifyContent : "center",
        alignContent : "center"
    }}>
        <CircularProgress />
      </div>
    </div>
  );
}
