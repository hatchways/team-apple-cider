import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  placeholderBox: {
    marginTop: theme.spacing(0.3),
    marginBottom: theme.spacing(0.3),
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
  "@keyframes spin": {
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" },
  },
  loadingPhoto: {
    animation: "$spin 1000ms infinite linear",
    borderTop: "1px solid #ccc",
    borderRight: "1px solid #ccc",
    borderBottom: "1px solid #ccc",
    borderLeft: "1px solid #DF1B1B",
    borderRadius: "50%",
  },
  noPhotoFound: {
    animation: "none",
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
