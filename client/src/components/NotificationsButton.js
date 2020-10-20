import React from "react";
import { Box, Typography, Button, ClickAwayListener } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NotificationPopup from "components/NotificationPopup";

const useStyles = makeStyles((theme) => ({
  parentContainer: {
    position: "relative",
  },
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
    padding: "5px 18px",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  defaultButtonText: {
    textTransform: "none",
    textShadow: "none",
  },
  selectedButtontext: {
    textTransform: "none",
    textShadow: "0 0 0.01px black",
  },
}));

const NotificationsButton = (props) => {
  const { notificationsOpen, setNotificationsOpen } = props;
  const classes = useStyles();
  const handleClickAway = () => setNotificationsOpen(false);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box className={classes.parentContainer}>
        <Button
          className={classes.notificationButton}
          disableRipple
          onClick={() => setNotificationsOpen((cur) => !cur)}
        >
          <Typography
            className={
              Boolean(notificationsOpen)
                ? classes.selectedButtontext
                : classes.defaultButtonText
            }
          >
            Notifications
          </Typography>
          <Box className={classes.notificationIcon} />
        </Button>
        {Boolean(notificationsOpen) && <NotificationPopup {...props} />}
      </Box>
    </ClickAwayListener>
  );
};

export default NotificationsButton;
