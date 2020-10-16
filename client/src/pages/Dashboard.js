import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

import Header from "components/Header";
import ShoppingLists from "pages/ShoppingLists";

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

const Dashboard = (props) => {
  const [selectedPage, setSelectedPage] = useState(0);
  const [notificationsOpen, setNotificationsOpen] = useState(0);
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
        {selectedPage === 0 && [<ShoppingLists />]}
        {selectedPage === 1 && [<div>friends page</div>]}
      </Box>
    </Box>
  );
};

export default Dashboard;
