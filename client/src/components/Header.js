import React from "react";

import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Link } from "react-router-dom";

import logo from "img/logo.png";
import icon from "img/icon.png";

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    padding: theme.spacing.unit * 1,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    boxSizing: "border-box",
  },
  dashboardHeader: {
    height: "auto",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    boxSizing: "border-box",
  },
  linkContainer: {
    marginLeft: theme.spacing.unit * 6,
    marginRight: theme.spacing.unit * 6,
    display: "flex",
  },
  link: {
    margin: theme.spacing.unit * 3,
    textDecoration: "none",
    color: "black",
    position: "relative",
    padding: "5px 18px",
  },
  notificationIcon: {
    top: "0",
    right: "0",
    height: "10px",
    width: "10px",
    backgroundColor: "#35d554",
    borderRadius: "100%",
    position: "absolute",
  },
  logo: {
    height: "2rem",
    padding: theme.spacing.unit * 1,
    marginLeft: theme.spacing.unit * 3,
    marginRight: "auto",
  },
  profileContainer: {
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing.unit * 6,
    marginRight: theme.spacing.unit * 6,
  },
  profileIcon: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    height: "3.5rem",
    borderRadius: "100%",
  },
}));

const Header = (props) => {
  const classes = useStyles();
  return (
    <Box className={classes.headerContainer}>
      <img className={classes.logo} src={logo} alt="logo" />
      <Box className={classes.linkContainer}>
        <Link to="/shopping" className={classes.link}>
          <Typography>Shopping Lists</Typography>
        </Link>
        <Link to="/friends" className={classes.link}>
          <Typography>Friends</Typography>
        </Link>
        <Link to="/notifications" className={classes.link}>
          <Typography>Notifications</Typography>
          <Box className={classes.notificationIcon} />
        </Link>
      </Box>
      <Box className={classes.profileContainer}>
        <img className={classes.profileIcon} src={icon} alt="profile" />
        <Typography>Profile</Typography>
      </Box>
    </Box>
  );
};

export default Header;
