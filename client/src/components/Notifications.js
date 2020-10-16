import React, { useState } from "react";
import { Box, Typography, Menu } from "@material-ui/core";
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

const Notifications = (props) => {
  const { notificationsOpen, setNotificationsOpen } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = (e) => setAnchorEl(null);
  const classes = useStyles();
  return (
    <Menu
      className={classes.dashboardNotifications}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      onClick={handleClick}
    >
      <Box className={classes.arrow}></Box>
      <Box className={classes.notificationsContainer}>
        <Typography>New price!</Typography>
        <Typography>New price!</Typography>
        <Typography>New price!</Typography>
        <Typography>New price!</Typography>
      </Box>
    </Menu>
  );
};

export default Notifications;
