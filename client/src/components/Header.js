import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ProfileMenu from "components/ProfileMenu";
import HeaderTabs from "components/HeaderTabs";
import logo from "img/logo.png";

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    padding: theme.spacing(1),
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    boxSizing: "border-box",
  },
  logo: {
    height: "1.8rem",
    padding: theme.spacing(1),
    marginLeft: theme.spacing(5),
    marginRight: "auto",
  },
}));

const Header = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.headerContainer}>
      <img className={classes.logo} src={logo} alt="logo" />
      <HeaderTabs {...props} />
      <ProfileMenu />
    </Box>
  );
};

export default Header;
