import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import FollowersFollowing from "../components/ProfileList";
import ProfileList from "../components/ProfileList";
import UserContext from "contexts/UserContext";
import { Filter } from "@material-ui/icons";
import { Switch, Route, Link } from "react-router-dom";

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
    let newFollowingsList = [...followings];
    newFollowingsList.push(person);
    setFollowings(newFollowingsList);
  };
  const handleUnfollow = (person) => {
    let newFollowingsList = [...followings];
    newFollowingsList = newFollowingsList.filter(
      (following) => following.id != person.id
    );
    setFollowings(newFollowingsList);
  };

  const getProfileListDisplay = () => {
    let list = [];
    if (selectedPage === 0) list = followers;
    else if (selectedPage === 1) list = followings;
    else if (selectedPage === 2) list = explore;
    return <ProfileList {...{ list, followings, toggleFollow }} />;
  };

  const tabs = ["followers", "following", "explore"];

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
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            disableRipple
            className={classes.tab}
            label={tab}
            component={Link}
            to={`/friends/${tab}`}
          />
        ))}
      </Tabs>
      <Box className={classes.tabsContainer}>
        <Switch>
          {tabs.map((tab, index) => (
            <Route
              key={index}
              exact
              path={`/friends/${tab}`}
              render={getProfileListDisplay}
            />
          ))}
        </Switch>
      </Box>
    </Box>
  );
};

export default Friends;
