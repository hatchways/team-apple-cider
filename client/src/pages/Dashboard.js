import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Header from "components/Header";
import AddItem from "components/AddItem";

const useStyles = makeStyles((theme) => ({
  dashContainer: {
    margin: theme.spacing.unit * 1,
  },
}));

const Dashboard = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.dashContainer}>
      <Header />
      <AddItem />
    </div>
  );
};

export default Dashboard;
