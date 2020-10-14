import React from "react";

import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const dashPageStyle = (theme) => ({
  dashContainer: {
    margin: theme.spacing.unit * 2,
  },
});

const Dashboard = () => {
  return (
    <div>
      <Typography>{"Dashboard"}</Typography>
    </div>
  );
};

export default withStyles(dashPageStyle)(Dashboard);
