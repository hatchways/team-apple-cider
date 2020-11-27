import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    listsTitle: {
        fontWeight: "bold",
        margin: "2rem 0"
    }
}));

const ListsDisplayTitle = (props) => {
    const { demo, profile, lists } = props;
    const classes = useStyles();

    const getListsUserText = (profile) => {
        if (!profile || profile.name === undefined) return "My Shopping Lists:";
        else if (profile.name[profile.name.length - 1] === "s")
            return `${profile.name}' Shopping Lists:`;
        else return `${profile.name}'s Shopping Lists:`;
    };

    const getEmptyListText = (profile) => {
        if (!profile || profile.name === undefined)
            return "Click the plus icon to make your first list";
        else return `${profile.name} does not have any public lists`;
    };

    return (
        <Typography variant="h5" className={classes.listsTitle}>
            {demo
                ? "Create your first list:"
                : lists.length !== 0
                ? getListsUserText(profile)
                : getEmptyListText(profile)}
        </Typography>
    );
};

export default ListsDisplayTitle;
