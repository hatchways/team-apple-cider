import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  friends: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "10rem",
  },
}));

const Friends = () => {
  const classes = useStyles();

  return <Box className={classes.friends}>(Friends Placeholder)</Box>;
};

export default Friends;
