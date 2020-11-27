import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    dashboardNotifications: {
        left: "0",
        top: "0",
        transform: "translate(-50%,-22.9%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "4rem",
        position: "absolute",
        width: "12rem"
    },
    notificationsContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderTop: "2px solid #DF1B1B",
        backgroundColor: "white",
        width: "100%",
        padding: "1rem",
        boxShadow: "0px 5px 10px 1px #f4f4f4"
    },
    arrow: {
        width: "0",
        height: "0",
        borderStyle: "solid",
        borderWidth: "0 6px 6px 6px",
        borderColor: "transparent transparent #DF1B1B transparent"
    }
}));

const NotificationPopup = () => {
    const classes = useStyles();

    return (
        <Box className={classes.dashboardNotifications}>
            <Box className={classes.arrow}></Box>
            <Box className={classes.notificationsContainer}>
                <Typography>New price!</Typography>
                <Typography>New price!</Typography>
                <Typography>New price!</Typography>
                <Typography>New price!</Typography>
            </Box>
        </Box>
    );
};

export default NotificationPopup;
