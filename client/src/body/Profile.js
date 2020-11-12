import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ProfileTopBar from "components/ProfileTopBar";
import ListsDisplay from "components/ListsDisplay";
import { handleFollow, handleUnfollow } from "fetch/following";

const useStyles = makeStyles((theme) => ({
  profileContainer: {
    display: "flex",
    alignItems: "start",
    justifyContent: "center",
    flexDirection: "column",
    width: "fit-content",
    margin: theme.spacing(8),
  },
  centerPageContainer: {
    height: "40rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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

const Profile = (props) => {
  const [profile, setProfile] = useState({});
  const [error, setError] = useState({});
  const [relation, setRelation] = useState({
    following: null,
    follows_back: null,
  });
  const [loaded, setLoaded] = useState(false);
  const classes = useStyles();
  const id = parseInt(props.match.params.id);

  const updateProfile = async () => {
    const newProfile = await (await fetch(`/profiles/${id}`)).json();
    if (!("error" in newProfile)) {
      setError(false);
      setProfile(newProfile);
      getRelation();
      setLoaded(true);
    } else {
      setError(true);
      setLoaded(true);
    }
  };

  useEffect(() => {
    updateProfile();
  }, [id]);

  const getRelation = async () => {
    const relation = await (await fetch(`/follower_relation/${id}`)).json();
    setRelation(relation);
  };

  const toggleFollow = async () => {
    if (relation.following) handleUnfollow(profile, updateProfile);
    else handleFollow(profile, updateProfile);
  };

  if (!loaded)
    return (
      <Box className={classes.centerPageContainer}>
        <CircularProgress className={classes.spinner} />
      </Box>
    );
  else if (error)
    return (
      <Box className={classes.centerPageContainer}>
        <Typography>Profile link not valid</Typography>
      </Box>
    );
  else
    return (
      <Box className={classes.profileContainer}>
        <ProfileTopBar {...{ profile, toggleFollow, relation }} />
        <ListsDisplay
          {...{ profile, loaded }}
          className={classes.listsDisplay}
        />
      </Box>
    );
};

export default Profile;
