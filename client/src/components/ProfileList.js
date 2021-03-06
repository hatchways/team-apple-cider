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
    Typography
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    list: {
        padding: "0"
    },
    listItem: {
        padding: "20px 25px"
    },
    unFollowButton: {
        borderRadius: "10rem",
        backgroundColor: "#DF1B1B",
        color: "white",
        width: "6rem",
        height: "2rem",
        fontSize: "0.6rem"
    },
    emptyMessage: {
        padding: theme.spacing(4),
        textAlign: "center"
    }
}));
const ProfileList = (props) => {
    const classes = useStyles();
    const { list, toggleFollow, emptyMessage, followings } = props;
    return (
        <List aria-label="followers list" className={classes.list}>
            {list.length > 0 ? (
                list.map((person, index) => {
                    return (
                        <Fragment key={index}>
                            <ListItem className={classes.listItem}>
                                <ListItemAvatar>
                                    <Avatar
                                        alt={person.name}
                                        src={person.photo}
                                    />
                                </ListItemAvatar>
                                <ListItemText>
                                    <Link to={`/profile/${person.id}`}>
                                        {person.name}{" "}
                                    </Link>
                                </ListItemText>

                                <Button
                                    className={classes.unFollowButton}
                                    variant="contained"
                                    onClick={() => toggleFollow(person)}
                                >
                                    {followings.includes(person)
                                        ? "unfollow"
                                        : "follow"}
                                </Button>
                            </ListItem>
                            <Divider />
                        </Fragment>
                    );
                })
            ) : (
                <Typography className={classes.emptyMessage}>
                    {emptyMessage}
                </Typography>
            )}
        </List>
    );
};

export default ProfileList;
