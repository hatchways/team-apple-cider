import React, { useState } from "react";
import { Box, Typography, Tabs,Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import FollowersFollowing from '../components/ProfileList'
import rose from '../img/roseBarron.png';
import david from '../img/davidRichardson.png'
import christine from '../img/christineSmith.png'
import jennifer from '../img/jenniferFordham.png'
import rebbeca from  '../img/rebbecaSchindler.png'
import ProfileList from "../components/ProfileList";

const useStyles = makeStyles((theme) => ({
  h1:{
    textAlign:'center',
    fontSize:'1.5rem',
    marginTop:theme.spacing(10),
    marginBottom:theme.spacing(6),
    fontWeight:'bold'
  },
  tabs: {
    maxWidth:'800px',
    width:'60%',
    margin:'0 auto',
  },
  tab:{
    width:'50%',
    maxWidth:'none'
  },
  tabsContainer:{
    maxWidth:'800px',
    width:'60%',
    margin:'0 auto',
    backgroundColor:'white'
  }
  
}));

const Friends = (props) => {
  const classes = useStyles();
  const [selectedPage, setSelectedPage] = useState(0);
  const [followersList, setFollowers]=useState(
    [
    {name:'David Richardson', img:david,},
    {name:'Christine Smith', img:christine,},
    {name:'Jennifer Fordham', img:jennifer,},
    {name:'Rebbeca Schindler', img:rebbeca,}
    ])
  const [followingsList, setFollowings]=useState(
    [
    {name:'Rose Barron', img:rose},
    ])
  const handleTabChange = (e, newValue) => {
    setSelectedPage(newValue);
  }
  const toggleFollow = (person) => {
    followingsList.includes(person) ? handleUnfollow(person) : handleFollow(person);
  }
  const handleFollow=(person)=>{
    const newFollowingsList=[...followingsList]
    newFollowingsList.push(person)
    setFollowings(newFollowingsList)
  }
  const handleUnfollow=(person)=>{
    const newFollowingsList=[...followingsList]
    newFollowingsList.pop(person)
    setFollowings(newFollowingsList)
  }
  return (
    <Box className={classes.friendsContainer}>
      <Typography variant={"h1"} className={classes.h1}>Friends</Typography>
      <Tabs
        className={classes.tabs}
        value={selectedPage}
        onChange={handleTabChange}
      >
        <Tab
        disableRipple 
        className={classes.tab}
        label="followers">
        </Tab>
        <Tab
        disableRipple 
        className={classes.tab}
        label="following">
        </Tab>
      </Tabs>
      <Box className={classes.tabsContainer}>
        {selectedPage==0 ? 
        <ProfileList
        list={followersList}
        toggleFollow={toggleFollow}
        buttonText={'follow'}
        />:
        <ProfileList
        list={followingsList}
        toggleFollow={toggleFollow}
        buttonText={'unfollow'}
        />
        }
      </Box>
    </Box>
  );
};

export default Friends;
