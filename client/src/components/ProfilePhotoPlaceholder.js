import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  placeholderBox: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    height: "3.5rem",
    width: "3.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "1s",
  },
  loadingPhoto: {
    border: "1px solid grey",
    borderRadius: "50%",
  },
  noPhotoFound: {
    border: "1px dashed black",
    borderRadius: "1rem",
  },
  placeholderText: {
    fontSize: "0.6rem",
    textAlign: "center",
    transition: "11s",
  },
}));

const ProfilePhotoPlaceholder = (props) => {
  const { loading } = props;
  const classes = useStyles();
  return (
    <Box
      className={`${classes.placeholderBox} ${
        loading ? classes.loadingPhoto : classes.noPhotoFound
      }`}
    >
      <Fade timeout={1000} in={!loading}>
        <Typography className={classes.placeholderText}>
          Add a profile photo
        </Typography>
      </Fade>
    </Box>
  );
};

export default ProfilePhotoPlaceholder;
