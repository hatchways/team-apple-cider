import React from "react";
import { Box, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NotificationPopup from "components/NotificationPopup";

const useStyles = makeStyles((theme) => ({
  notificationIcon: {
    top: "0",
    right: "0",
    height: "10px",
    width: "10px",
    backgroundColor: "#35d554",
    borderRadius: "100%",
    position: "absolute",
  },
  notificationButton: {
    position: "relative",
    padding: "5px 18px",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  buttonText: {
    textTransform: "none",
  },
}));

const NotificationsButton = (props) => {
  const classes = useStyles();
  return (
    <Button className={classes.notificationButton} disableRipple>
      <Typography className={classes.buttonText}>Notifications</Typography>
      <Box className={classes.notificationIcon} />
      <NotificationPopup {...props} />
    </Button>
  );
};

export default NotificationsButton;
