import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ProfileTopBar from "components/ProfileTopBar";
import ListsDisplay from "components/ListsDisplay";

const useStyles = makeStyles((theme) => ({
  profileContainer: {
    display: "flex",
    alignItems: "start",
    justifyContent: "center",
    flexDirection: "column",
    width: "fit-content",
    margin: theme.spacing(4),
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
  const [profile, setProfile] = useState({});
  const [error, setError] = useState({});

  // TODO: Get both following/followed booleans from backend
  const [following, setFollowing] = useState(false);
  const followingYou = true;

  const classes = useStyles();
  const id = parseInt(props.match.params.id);

  useEffect(() => {
    const updateProfile = async () => {
      const response = await fetch(`/profiles/${id}`);
      if (response.status === 200) {
        const newProfile = await response.json();
        setError(false);
        // TODO: seperate call for followers/following counts
        // TODO: seperate call for public lists
        setProfile(newProfile);
      } else setError(true);
    };
    updateProfile();
  }, [id]);

  const toggleFollow = () => setFollowing((cur) => !cur);

  if (error) return <Typography>Profile link not valid</Typography>;
  else
    return (
      <Box className={classes.profileContainer}>
        <ProfileTopBar
          {...{ profile, following, toggleFollow, followingYou }}
        />
        <ListsDisplay {...{ profile }} className={classes.listsDisplay} />
      </Box>
    );
};

export default ProfileDisplay;
