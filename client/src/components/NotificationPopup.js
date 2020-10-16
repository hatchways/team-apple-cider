import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  dashboardNotifications: {
    left: "0",
    top: "0",
    transform: "translate(-50%,-20%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "4rem",
    position: "absolute",
    width: "12rem",
  },

  notificationsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderTop: "3px solid black",
    backgroundColor: "white",
    width: "100%",
    padding: "1rem",
  },

  arrow: {
    width: "0",
    height: "0",
    borderStyle: "solid",
    borderWidth: "0 6px 6px 6px",
    borderColor: "transparent transparent black transparent",
  },
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
