import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  body: {
    flex: "1",
    backgroundColor: "#f8f8f8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Body = (props) => {
  const classes = useStyles();
  return <Box className={classes.body}>{props.children}</Box>;
};

export default Body;
