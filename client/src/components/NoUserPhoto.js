import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  placeholderBox: {
    height: "3.5rem",
    width: "3.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px dashed black",
    borderRadius: "1rem",
    cursor: "pointer",
    margin: theme.spacing(0, 2),
  },
  placeholderText: {
    fontSize: "0.6rem",
    textAlign: "center",
  },
}));

const NoUserPhoto = () => {
  const classes = useStyles();
  return (
    <Box className={classes.placeholderBox}>
      <Typography className={classes.placeholderText}>
        Add a profile photo
      </Typography>
    </Box>
  );
};

export default NoUserPhoto;
