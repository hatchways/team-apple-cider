import React, { useState } from "react";
import { Box, Typography, Button } from "@material-ui/core";
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
  profileTopBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    "& > *:last-child": {
      marginRight: "50%",
    },
  },
  profilePhoto: {
    borderRadius: "100%",
    height: "7rem",
    margin: theme.spacing(2),
  },
  profileTextContainer: {
    display: "flex",
    flexDirection: "column",
  },
  userName: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  followerCount: {
    color: "grey",
  },
  followingCount: {
    color: "grey",
  },
  followButton: {
    backgroundColor: "#DF1B1B",
    color: "white",
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
          <Box className={classes.profileTopBar}>
            <img
              className={classes.profilePhoto}
              src={user && user.img}
              alt="profile-pic"
            />
            <Box className={classes.profileTextContainer}>
              <Typography className={classes.userName}>{user.name}</Typography>
              <Typography className={classes.followerCount}>
                5435 Followers
              </Typography>
              <Typography className={classes.followingCount}>
                3253 Following
              </Typography>
            </Box>
            <Button className={classes.followButton}>Follow</Button>
          </Box>
          <ListsDisplay {...{ user }} className={classes.listsDisplay} />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
