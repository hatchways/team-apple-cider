import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Zoom from "@material-ui/core/Zoom";

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
    transition: "border-radius 1s, border-color 1s",
  },
  "@keyframes spin": {
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" },
  },
  "@keyframes color-shift": {
    from: { border: "1px dashed #eee" },
    to: { border: "1px dashed grey" },
  },
  loadingPhoto: {
    animation: "$spin 1000ms infinite linear",
    borderTop: "1px solid #ccc",
    borderRight: "1px solid #ccc",
    borderBottom: "1px solid #ccc",
    borderLeft: "1px solid #DF1B1B",
    borderRadius: "50%",
  },
  photoFound: {
    animation: "$spin 1000ms 2 linear",
    border: "1px solid #fff",
    borderRadius: "50%",
  },
  noPhotoFound: {
    animation: "$spin 1000ms 1 linear, $color-shift 1000ms 1 ease-out",
    animationFillMode: "forwards",
    borderRadius: "1rem",
  },
  profileIcon: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    height: "100%",
    width: "100%",
    borderRadius: "100%",
    cursor: "pointer",
  },
  placeholderText: {
    fontSize: "0.6rem",
    textAlign: "center",
  },
}));

const ProfilePhotoPlaceholder = (props) => {
  const { loading, userIcon } = props;
  console.log(loading);
  const classes = useStyles();
  return (
    <Box
      className={`${classes.placeholderBox} ${
        loading
          ? classes.loadingPhoto
          : userIcon
          ? classes.photoFound
          : classes.noPhotoFound
      }`}
    >
      <Zoom
        timeout={1000}
        in={!loading}
        style={{ transitionDelay: userIcon ? 1000 : 0 }}
      >
        {userIcon ? (
          <img
            className={classes.profileIcon}
            src={userIcon}
            alt={"profile pic"}
          />
        ) : (
          <Typography className={classes.placeholderText}>
            Add a profile photo
          </Typography>
        )}
      </Zoom>
    </Box>
  );
};

export default ProfilePhotoPlaceholder;
