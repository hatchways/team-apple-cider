import React, { useState } from "react";
import { Box, Typography, Button, Menu, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import icon from "img/icon.png";

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
    borderRadius: "100%",
  },
  profileButtonText: {
    textTransform: "none",
  },
}));

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box className={classes.profileMenuContainer}>
      <img className={classes.profileIcon} src={icon} alt="profile" />
      <Button onClick={handleClick}>
        <Typography className={classes.profileButtonText}>Profile</Typography>
      </Button>
      <Menu
        anchorEl={anchorEl}
        className={classes.profileMenuDropdown}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>Logout</MenuItem>
        <MenuItem>Go to profile</MenuItem>
      </Menu>
    </Box>
  );
};

export default ProfileMenu;
