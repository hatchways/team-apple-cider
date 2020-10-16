import React, { useState } from "react";

import { Box, Typography, Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import logo from "img/logo.png";

import Notifications from "components/Notifications";
import ProfileMenu from "components/ProfileMenu";

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    padding: theme.spacing(1),
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
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(6),
    display: "flex",
    alignItems: "center",
  },
  link: {
    margin: theme.spacing(3),
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
    height: "1.8rem",
    padding: theme.spacing(1),
    marginLeft: theme.spacing(5),
    marginRight: "auto",
  },
}));

const Header = (props) => {
  const { setSelectedPage } = props;
  const classes = useStyles();

  const handleTabChange = (event, newValue) => {
    setSelectedPage(newValue);
  };

  return (
    <Box className={classes.headerContainer}>
      <img className={classes.logo} src={logo} alt="logo" />
      <Box className={classes.linkContainer}>
        <Tabs
          value={setSelectedPage}
          onChange={handleTabChange}
          aria-label="page select"
        >
          <Tab label="Shopping Lists" />
          <Tab label="Friends" />
        </Tabs>
        <Box to="/notifications" className={classes.link}>
          <Typography>Notifications</Typography>
          <Box className={classes.notificationIcon} />
          <Notifications />
        </Box>
      </Box>
      <ProfileMenu />
    </Box>
  );
};

export default Header;
