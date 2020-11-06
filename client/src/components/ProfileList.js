import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemAvatar,
  Avatar,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  list: {
    padding: "0",
  },
  listItem: {
    padding: "20px 25px",
  },
  unFollowButton: {
    borderRadius: "10rem",
    backgroundColor: "#DF1B1B",
    color: "white",
    width: "6rem",
    height: "2rem",
    fontSize: "0.6rem",
  },
}));
const ProfileList = (props) => {
  const classes = useStyles();
  const { list, toggleFollow, buttonText, followings } = props;
  return (
    <List aria-label="followers list" className={classes.list}>
      {list.length > 0 &&
        list.map((person) => {
          return (
            <Fragment>
              <ListItem className={classes.listItem}>
                <ListItemAvatar>
                  <Avatar alt={person.name} src={person.photo} />
                </ListItemAvatar>
                <ListItemText>{person.name}</ListItemText>
                <Button
                  className={classes.unFollowButton}
                  variant="contained"
                  onClick={() => toggleFollow(person)}
                >
                  {followings.includes(person) ? "unfollow" : "follow"}
                </Button>
              </ListItem>
              <Divider />
            </Fragment>
          );
        })}
    </List>
  );
};

export default ProfileList;
