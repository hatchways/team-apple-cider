import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

import Header from "components/Header";
import AddItem from "components/AddItem";
import ShoppingLists from "components/ShoppingLists";

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
  const classes = useStyles();
  return (
    <Box className={classes.dashContainer}>
      <Header />
      <Box className={classes.bodyContainer}>
        <AddItem />
        <ShoppingLists />
      </Box>
    </Box>
  );
};

export default Dashboard;
