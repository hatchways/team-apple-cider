import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ProfileHeader from "components/ProfileHeader";
import { Class } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  dashContainer: {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    minHeight: "100vh",
    display: "flex",
    backgroundColor: "white",
    flexDirection: "column",
  },
  bodyContainer: {
    flex: "1",
    backgroundColor: "#f8f8f8",
  },
}));

const Profile = () => {
  const [selectedPage, setSelectedPage] = useState(0);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const classes = useStyles();

  return (
    <Box className={classes.dashContainer}>
      <ProfileHeader
        {...{
          selectedPage,
          setSelectedPage,
          notificationsOpen,
          setNotificationsOpen,
        }}
      />
      <Box className={classes.bodyContainer}>Hi</Box>
    </Box>
  );
};

export default Profile;
