import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    body: {
        flex: "1",
        backgroundColor: "#f9fbff",
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
    }
}));

const Body = (props) => {
    const classes = useStyles();
    return <Box className={classes.body}>{props.children}</Box>;
};

export default Body;
