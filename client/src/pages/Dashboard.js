import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Header from "components/Header";
import ShoppingLists from "pages/ShoppingLists";
import Friends from "pages/Friends";
import { Switch, Route } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  dashContainer: {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  bodyContainer: {
    flex: "1",
    backgroundColor: "#f8f8f8",
  },
}));

const Dashboard = () => {
  const [selectedPage, setSelectedPage] = useState(0);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const classes = useStyles();

  return (
    <Box className={classes.dashContainer}>
      <Header
        {...{
          selectedPage,
          setSelectedPage,
          notificationsOpen,
          setNotificationsOpen,
        }}
      />
      <Box className={classes.bodyContainer}>
        {/* {selectedPage === 0 && <ShoppingLists />}
        {selectedPage === 1 && <Friends />} */}
        <Switch>
          <Route exact path="/dashboard" component={ShoppingLists}/> 
          <Route exact path="/dashboard/friends" component={Friends}/> 
        </Switch>
      </Box>
    </Box>
  );
};

export default Dashboard;
