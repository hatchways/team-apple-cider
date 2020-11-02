import React from "react";
import { Box, Typography, Button, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FollowBackIcon from "@material-ui/icons/Autorenew";

const useStyles = makeStyles((theme) => ({
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
}));

const ProfileTopBar = (props) => {
  const { user, following, toggleFollow, followingYou } = props;
  const classes = useStyles();
  return (
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
              {user.followers} Followers
            </Typography>
            <Typography className={classes.followerText}>
              {user.following} Following
            </Typography>
          </Box>
          <Box className={classes.buttonContainer}>
            <Button className={classes.followButton} onClick={toggleFollow}>
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
  );
};

export default ProfileTopBar;
