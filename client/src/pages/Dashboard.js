import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Header from "components/Header";
import AddItem from "components/AddItem";

const dashPageStyle = (theme) => ({
  dashContainer: {
    margin: theme.spacing.unit * 1,
  },
});

const Dashboard = (props) => {
  const { classes } = props;
  return (
    <div className={classes.dashContainer}>
      <Header />
      <AddItem />
    </div>
  );
};

export default withStyles(dashPageStyle)(Dashboard);
