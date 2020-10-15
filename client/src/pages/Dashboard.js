import React from "react";

import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import Header from "components/Header";
import AddItem from "components/AddItem";

import "css/Dashboard.css";

const dashPageStyle = (theme) => ({
  dashContainer: {
    margin: theme.spacing.unit * 2,
  },
});

const Dashboard = () => {
  return (
    <div>
      <Header />
      <AddItem />
    </div>
  );
};

export default withStyles(dashPageStyle)(Dashboard);
