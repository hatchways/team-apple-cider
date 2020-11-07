import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
      {!loading && (
        <Typography className={classes.placeholderText}>
          Add a profile photo
        </Typography>
      )}
    </Box>
  );
};

export default ProfilePhotoPlaceholder;
