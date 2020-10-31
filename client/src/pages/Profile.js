import React, { useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ProfileHeader from "components/ProfileHeader";
import ListsDisplay from "components/ListsDisplay";
import profile_photo_1 from "img/profile_photo_1.png";
import profile_photo_2 from "img/profile_photo_2.png";
import profile_photo_3 from "img/profile_photo_3.png";
import profile_photo_4 from "img/profile_photo_4.png";
import profile_photo_5 from "img/profile_photo_5.png";

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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  profileContainer: {
    display: "flex",
    alignItems: "start",
    justifyContent: "center",
    flexDirection: "column",
    width: "fit-content",
  },
  profileTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  profilePhoto: {
    borderRadius: "100%",
    height: "7rem",
    margin: theme.spacing(2),
  },
  userName: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  listsDisplay: {
    margin: theme.spacing(2),
  },
}));

const Profile = (props) => {
  const [selectedPage, setSelectedPage] = useState(0);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const classes = useStyles();

  // Demo user
  const user = {
    name: "David Richardson",
    img: profile_photo_2,
  };

  // const user = null;

  // TODO: Header and dashContainer are very similar to the ones found in Dashboard.js,
  //       so they could be their own components and have the differing content passed
  //       to them as children
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
      <Box className={classes.bodyContainer}>
        <Box className={classes.profileContainer}>
          <Box className={classes.profileTitle}>
            <img
              className={classes.profilePhoto}
              src={user && user.img}
              alt="profile-pic"
            />
            <Typography className={classes.userName}>{user.name}</Typography>
          </Box>
          <ListsDisplay {...{ user }} className={classes.listsDisplay} />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
