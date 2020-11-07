import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Button, Menu, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Dropzone from "react-dropzone";
import UserContext from "contexts/UserContext";
import ProfilePhotoPlaceholder from "components/ProfilePhotoPlaceholder";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  profileMenuContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(6),
  },
  profileMenuDropdown: {
    position: "relative",
  },
  profileIcon: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    height: "3.5rem",
    width: "3.5rem",
    borderRadius: "100%",
    cursor: "pointer",
  },
  profileButtonText: {
    textTransform: "none",
  },
}));

const ProfileMenu = (props) => {
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [userIcon, setUserIcon] = useState(null);
  const classes = useStyles();
  const value = useContext(UserContext);
  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = (e) => {
    value.handleLogout();
    props.history.push("/");
  };

  const uploadProfilePicture = async () => {
    const auth = await (await fetch("/auth/status")).json();
    const userId = auth.data.user_id;
    await fetch(`/profiles/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ photo: imageURL }),
    });
  };

  const retrieveUserIcon = async () => {
    const auth = await (await fetch("/auth/status")).json();
    const userId = auth.data.user_id;
    const user = await (await fetch(`/profiles/${userId}`)).json();
    setUserIcon(user.photo);
    setLoading(false);
  };

  useEffect(() => {
    retrieveUserIcon();
  }, []);

  useEffect(() => {
    const updateUserPhoto = async () => {
      if (imageURL) {
        await uploadProfilePicture();
        retrieveUserIcon();
      }
    };
    updateUserPhoto();
  }, [imageURL]);

  const goToUserProfile = async () => {
    const auth = await (await fetch("/auth/status")).json();
    const userId = auth.data.user_id;
    props.history.push(`/profile/${userId}`);
  };

  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          // convert image file to base64 string
          let src = reader.result;
          setImageURL(src);
        },
        false
      );
      if (file) reader.readAsDataURL(file);
    });
  };

  return (
    <Box className={classes.profileMenuContainer}>
      <Dropzone onDrop={onDrop} accept="image/*">
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {userIcon ? (
              <Fade timeout={1000} in={!loading}>
                <img
                  className={classes.profileIcon}
                  src={userIcon}
                  alt={"profile pic"}
                />
              </Fade>
            ) : (
              <ProfilePhotoPlaceholder {...{ loading }} />
            )}
          </div>
        )}
      </Dropzone>
      <Button onClick={handleClick}>
        <Typography className={classes.profileButtonText}>Profile</Typography>
      </Button>
      <Menu
        anchorEl={anchorEl}
        className={classes.profileMenuDropdown}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        <MenuItem onClick={goToUserProfile}>Go to profile</MenuItem>
      </Menu>
    </Box>
  );
};

export default withRouter(ProfileMenu);
