import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import FollowersFollowing from "../components/ProfileList";
import ProfileList from "../components/ProfileList";
import UserContext from "contexts/UserContext";
import { Filter } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  friendsContainer: {
    width: "100%",
  },
  h1: {
    textAlign: "center",
    fontSize: "1.5rem",
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(6),
    fontWeight: "bold",
  },
  tabs: {
    maxWidth: "800px",
    width: "60%",
    margin: "0 auto",
  },
  tab: {
    width: "33.33333%",
    maxWidth: "none",
  },
  tabsContainer: {
    maxWidth: "800px",
    width: "60%",
    margin: "0 auto",
    backgroundColor: "white",
  },
}));

const Friends = (props) => {
  const classes = useStyles();
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [explore, setExplore] = useState([]);
  const [selectedPage, setSelectedPage] = useState(0);
  const { userId } = useContext(UserContext);

  const getFollowers = async () => {
    const response = await fetch("/followers");
    const json = await response.json();
    console.log(json);
    setFollowers(json);
  };

  const getExplore = async () => {
    const response = await fetch("/profiles");
    const json = await response.json();
    const exploreUsers = json.filter((listUser) => listUser.id !== userId);
    setExplore(exploreUsers);
  };

  useEffect(() => {
    getFollowers();
    getExplore();
  }, []);

  const handleTabChange = (e, newValue) => {
    setSelectedPage(newValue);
  };
  const toggleFollow = (person) => {
    followings.includes(person) ? handleUnfollow(person) : handleFollow(person);
  };
  const handleFollow = (person) => {
    const newFollowingsList = [...followings];
    newFollowingsList.push(person);
    setFollowings(newFollowingsList);
  };
  const handleUnfollow = (person) => {
    const newFollowingsList = [...followings];
    newFollowingsList.pop(person);
    setFollowings(newFollowingsList);
  };
  return (
    <Box className={classes.friendsContainer}>
      <Typography variant={"h1"} className={classes.h1}>
        Friends
      </Typography>
      <Tabs
        className={classes.tabs}
        value={selectedPage}
        onChange={handleTabChange}
      >
        <Tab disableRipple className={classes.tab} label="followers"></Tab>
        <Tab disableRipple className={classes.tab} label="following"></Tab>
        <Tab disableRipple className={classes.tab} label="explore"></Tab>
      </Tabs>
      <Box className={classes.tabsContainer}>
        {selectedPage == 0 && (
          <ProfileList
            list={followers}
            followings={followings}
            toggleFollow={toggleFollow}
          />
        )}

        {selectedPage == 1 && (
          <ProfileList
            list={followings}
            followings={followings}
            toggleFollow={toggleFollow}
          />
        )}
        {selectedPage == 2 && (
          <ProfileList
            list={explore}
            followings={followings}
            toggleFollow={toggleFollow}
          />
        )}
      </Box>
    </Box>
  );
};

export default Friends;
