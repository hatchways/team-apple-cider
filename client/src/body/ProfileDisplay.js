import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ProfileTopBar from "components/ProfileTopBar";
import ListsDisplay from "components/ListsDisplay";
import profile_photo_1 from "img/profile_photo_1.png";
import profile_photo_2 from "img/profile_photo_2.png";
import profile_photo_3 from "img/profile_photo_3.png";
import profile_photo_4 from "img/profile_photo_4.png";
import profile_photo_5 from "img/profile_photo_5.png";

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
  const [user, setUser] = useState({});
  const [following, setFollowing] = useState(false);
  const followingYou = true;
  const classes = useStyles();
  const id = parseInt(props.match.params.id);

  useEffect(() => {
    switch (id) {
      case 1:
        setUser({
          name: "Ayana Howarth",
          img: profile_photo_1,
          followers: 154,
          following: 73,
        });
        break;
      case 2:
        setUser({
          name: "Dan Lewis",
          img: profile_photo_2,
          followers: 154,
          following: 193,
        });
        break;
      case 3:
        setUser({
          name: "Mary Klein",
          img: profile_photo_3,
          followers: 254,
          following: 323,
        });
        break;
      case 4:
        setUser({
          name: "Uzma Holding",
          img: profile_photo_4,
          followers: 164,
          following: 3,
        });
        break;
      case 5:
        setUser({
          name: "Alexia Grant",
          img: profile_photo_5,
          followers: 323,
          following: 135,
        });
        break;
      default:
        break;
    }
  }, [id]);

  const toggleFollow = () => setFollowing((cur) => !cur);

  if (user.name === undefined)
    return <Typography>Profile link not valid</Typography>;
  else
    return (
      <Box className={classes.profileContainer}>
        <ProfileTopBar {...{ user, following, toggleFollow, followingYou }} />
        <ListsDisplay {...{ user }} className={classes.listsDisplay} />
      </Box>
    );
};

export default ProfileDisplay;
