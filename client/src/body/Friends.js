import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import FollowersFollowing from "../components/ProfileList";
import ProfileList from "../components/ProfileList";
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

  const getFollowersFollowings = async (allProfiles, type) => {
    const userList = await (await fetch(`/${type}`)).json();
    const idList = userList.map((user) => user.id);
    const profiles = allProfiles.filter((profile) =>
      idList.includes(profile.id)
    );
    if (type === "followers") setFollowers(profiles);
    else if (type === "followings") setFollowings(profiles);
  };

  const getAllProfiles = async () => {
    const allProfiles = await (await fetch("/profiles")).json();
    const auth = await (await fetch("/auth/status")).json();
    const userId = auth.data.user_id;
    return allProfiles.filter((listUser) => listUser.id !== userId);
  };

  const tabs = ["followers", "following", "explore"];

  const resetTab = (path) => {
    if (path.match(`/friends/${tabs[0]}`)) setSelectedPage(0);
    else if (path.match(`/friends/${tabs[1]}`)) setSelectedPage(1);
    else if (path.match(`/friends/${tabs[2]}`)) setSelectedPage(2);
  };

  const resetLists = async () => {
    const allProfiles = await getAllProfiles();
    await getFollowersFollowings(allProfiles, "followers");
    await getFollowersFollowings(allProfiles, "followings");
    setExplore(allProfiles);
  };

  useEffect(() => {
    resetLists();
    resetTab(window.location.pathname);
  }, []);

  const handleTabChange = (e, newValue) => {
    setSelectedPage(newValue);
  };
  const toggleFollow = (person) => {
    followings.includes(person) ? handleUnfollow(person) : handleFollow(person);
  };
  const handleFollow = async (person) => {
    await fetch(`/followers/${person.id}`, {
      method: "POST",
    });
    resetLists();
  };
  const handleUnfollow = async (person) => {
    await fetch(`/followers/${person.id}`, {
      method: "DELETE",
    });
    resetLists();
  };

  const getProfileListDisplay = () => {
    let list = [];
    if (selectedPage === 0) list = followers;
    else if (selectedPage === 1) list = followings;
    else if (selectedPage === 2) list = explore;
    return <ProfileList {...{ list, followings, toggleFollow }} />;
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
