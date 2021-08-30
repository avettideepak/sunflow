import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { makeStyles, withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
// import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

//Components
import MapComponent from '@components/AC-MallMap/MapComponent/MapComponent';

//Actions
import { selectedStoreMap } from "@/redux/actions/mainActions";

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const useStyles = makeStyles({
    viewOnMapBtn: {
        color: "#242424",
        background: "none",
        padding: "0",
        margin: "0px 0",
        fontWeight: "600",
        fontSize: "13px"
    },
    mallMapModalWrapper: {
        "& aside": {
            display: "none"
        },
        "& .main_map": {
            width: "100%"
        }
    }
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

// const DialogActions = withStyles((theme) => ({
//     root: {
//         margin: 0,
//         padding: theme.spacing(1),
//     },
// }))(MuiDialogActions);

export default function MallMapModal({ vendorId, linkTextActive, linkText, icon }) {

    const [open, setOpen] = React.useState(false);

    const classes = useStyles();
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
        if (vendorId != "") {
            dispatch(selectedStoreMap(vendorId))
        }
    };
    const handleClose = () => {
        setOpen(false);
        dispatch(selectedStoreMap(null))
    };

    return (
        <div className="viewOnMapBtnmain">
            {
                linkTextActive != false && (
                    <button className={classes.viewOnMapBtn} onClick={handleClickOpen}>
                        {linkText}
                    </button>
                )
            }
            {
                icon == true && (
                    <button className={classes.viewOnMapBtn} onClick={handleClickOpen}>
                        <i title="View store on mall map" className="material-icons">location_on</i>
                    </button>
                )
            }

            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth={true}
                maxWidth={"md"}
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Mall Map
                </DialogTitle>
                <DialogContent
                    dividers
                    className={classes.mallMapModalWrapper}
                >
                    <MapComponent />
                </DialogContent>
                {/* <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Save changes
                    </Button>
                </DialogActions> */}
            </Dialog>
        </div>
    );
}