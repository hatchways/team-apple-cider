import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  friendsContainer: {
    width: "100%",
    margin: "10rem 0",
    display: "flex",
    justifyContent: "center",
  },
  textPlaceholder: {
    fontSize: "2rem",
  },
}));

const Friends = () => {
  const classes = useStyles();

  return (
    <Box className={classes.friendsContainer}>
      <Typography className={classes.textPlaceholder}>
        (Friends Page Placeholder)
      </Typography>
    </Box>
  );
};

export default Friends;
