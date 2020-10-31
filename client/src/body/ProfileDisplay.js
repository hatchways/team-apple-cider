import React, { useState } from "react";
import { Box, Typography, Button, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ListsDisplay from "components/ListsDisplay";
import profile_photo_1 from "img/profile_photo_1.png";
import profile_photo_2 from "img/profile_photo_2.png";
import profile_photo_3 from "img/profile_photo_3.png";
import profile_photo_4 from "img/profile_photo_4.png";
import profile_photo_5 from "img/profile_photo_5.png";
import FollowBackIcon from "@material-ui/icons/Autorenew";

const useStyles = makeStyles((theme) => ({
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
  },
  profilePhoto: {
    borderRadius: "100%",
    height: "7rem",
    margin: theme.spacing(2, 2, 2, 2),
  },
  profileTextContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
  },
  userName: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    margin: theme.spacing(0.5),
  },
  followerBox: {
    display: "flex",
    alignItems: "center",
  },
  followerTextContainer: {
    display: "flex",
    width: "fit-content",
    flexDirection: "column",
    margin: theme.spacing(0, 0.75),
  },
  followerText: {
    color: "grey",
    fontSize: "0.7rem",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "7rem",
  },
  followButton: {
    backgroundColor: "#DF1B1B",
    color: "white",
    width: "auto",
    height: "2rem",
    margin: theme.spacing(0.75, 1.25),
  },
  followBackIcon: {},
  listsDisplay: {
    margin: theme.spacing(2),
  },
}));

const ProfileDisplay = (props) => {
  const [following, setFollowing] = useState(false);
  const followingYou = true;
  const classes = useStyles();

  // Demo user
  const user = {
    name: "David Mayer Richardson",
    img: profile_photo_2,
  };

  return (
    <Box className={classes.profileContainer}>
      <Box className={classes.profileTopBar}>
        <img
          className={classes.profilePhoto}
          src={user && user.img}
          alt="profile-pic"
        />
        <Box className={classes.profileTextContainer}>
          <Typography className={classes.userName}>{user.name}</Typography>

          <Box className={classes.followerBox}>
            <Box className={classes.followerTextContainer}>
              <Typography className={classes.followerText}>
                5435 Followers
              </Typography>
              <Typography className={classes.followerText}>
                3253 Following
              </Typography>
            </Box>
            <Box className={classes.buttonContainer}>
              <Button
                className={classes.followButton}
                onClick={() => setFollowing((cur) => !cur)}
              >
                {following ? "unfollow" : "follow"}
              </Button>
            </Box>
            {following && followingYou && (
              <Tooltip title={`You and ${user.name} are following each other!`}>
                <FollowBackIcon className={classes.followBackIcon} />
              </Tooltip>
            )}
          </Box>
        </Box>
      </Box>
      <ListsDisplay {...{ user }} className={classes.listsDisplay} />
    </Box>
  );
};

export default ProfileDisplay;
